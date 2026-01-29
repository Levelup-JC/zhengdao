/**
 * review-service.ts - 复盘服务
 *
 * 提供周期复盘的数据处理和AI总结功能
 */

import { CheckInData, filterDataByPeriod, calculateYesNoRatio, generateTrendData, aggregateMeaningfulDays } from './chart-utils';
import { db } from './db';
import { generateAIResponse } from './ai-service';

export interface ReviewStats {
  totalDays: number;
  yesDays: number;
  noDays: number;
  yesRatio: number;
  totalWords: number;
  avgWords: number;
  meaningfulSummaries: string[];
  dailyData: Array<{ date: string; isMeaningful: boolean }>;
}


/**
 * 获取指定周期的统计数据
 */
export async function getReviewStats(period: '7d' | '30d' | '6m' | '1y', walletAddress: string): Promise<ReviewStats> {
  // 从数据库获取所有反思数据
  const allReflections = await db.reflections
    .where('walletAddress')
    .equals(walletAddress)
    .toArray();

  // 转换为 CheckInData 格式
  const checkInData: CheckInData[] = allReflections.map(item => ({
    id: String(item.id || ''),
    date: item.date,
    meaningful: item.isMeaningful,
    originalText: item.rawContent,
    wordCount: item.rawContent.length,
    createdAt: item.createdAt.getTime(),
  }));

  // 根据周期筛选数据
  const filteredData = filterDataByPeriod(checkInData, period);

  // 计算是/否统计
  const { yes, no } = calculateYesNoRatio(filteredData);
  const totalDays = yes + no;
  const yesRatio = totalDays > 0 ? (yes / totalDays) * 100 : 0;

  // 计算字数统计
  const totalWords = filteredData.reduce((sum, item) => sum + item.wordCount, 0);
  const avgWords = totalDays > 0 ? Math.round(totalWords / totalDays) : 0;

  // 提取有意义日子的复盘摘要（取前5条）
  const meaningfulSummaries = filteredData
    .filter(item => item.meaningful)
    .slice(0, 5)
    .map(item => item.originalText);

  // 生成每日打卡数据（用于日历展示）
  const dailyData = filteredData.map(item => ({
    date: new Date(item.createdAt).toISOString().split('T')[0],
    isMeaningful: item.meaningful,
  }));

  return {
    totalDays,
    yesDays: yes,
    noDays: no,
    yesRatio,
    totalWords,
    avgWords,
    meaningfulSummaries,
    dailyData,
  };
}

/**
 * 生成 AI 周期总结
 */
export async function generateAIReviewSummary(
  period: '7d' | '30d' | '6m' | '1y',
  stats: ReviewStats
): Promise<string> {
  const periodLabels: Record<string, string> = {
    '7d': '7天',
    '30d': '30天',
    '6m': '半年',
    '1y': '一年',
  };

  const summariesText = stats.meaningfulSummaries
    .map((text, index) => `${index + 1}. ${text.slice(0, 150)}`)
    .join('\n\n');

  const prompt = `你是一个专业的成长记录助手。请整理用户${periodLabels[period]}的打卡记录。

**打卡数据：**
- 打卡天数: ${stats.totalDays}天
- 有意义天数: ${stats.yesDays}天
- 比例: ${stats.yesRatio.toFixed(1)}%

**用户复盘内容（有意义的日子）：**
${summariesText || '（暂无复盘内容）'}

**整理要求：**
1. 【优先】直接展示用户的原始复盘内容，按日期归类
2. 【次要】用1-2句话总结整体情况（基于实际数据，不要臆想）
3. 【格式】清晰易读，使用列表或分段
4. 【字数】如果内容少，就简短总结；如果内容多，可以详细整理
5. 【禁止】不要添加"建议你可以"、"鼓励你"这类泛泛而谈的内容
6. 【禁止】不要编造用户没有提到的具体建议或计划

**输出格式示例：**
## ${periodLabels[period]}打卡总结

✅ 总体情况：${stats.totalDays}天打卡，${stats.yesDays}天有意义

### 有意义的时刻
${stats.meaningfulSummaries.length > 0 ? '(直接引用用户原话，适当归类)' : '(暂无记录)'}

${stats.meaningfulSummaries.length > 0 ? summariesText : `${stats.totalDays > 0 ? '继续坚持记录，让每一天都更有意义。' : '开始记录你的生活吧！'}`}`;

  const aiResult = await generateAIResponse(prompt, 500);

  if (aiResult) {
    return aiResult;
  }

  // 降级文案 - 根据数据生成有意义的总结
  const ratio = stats.yesRatio;
  let trend = '';
  let encouragement = '';
  let suggestion = '';

  // 判断趋势
  if (ratio >= 80) {
    trend = '表现出色！';
    encouragement = '你的自律程度令人敬佩，继续保持这种积极的状态。';
    suggestion = '建议继续保持当前习惯，并尝试帮助身边的人一起成长。';
  } else if (ratio >= 60) {
    trend = '表现良好！';
    encouragement = '你大部分时间都过得很充实，已经形成了良好的自律习惯。';
    suggestion = '可以尝试分析那些"没有意义"的日子，找出共同的干扰因素并加以改进。';
  } else if (ratio >= 40) {
    trend = '仍有提升空间。';
    encouragement = '你正在努力坚持打卡，这是一个好的开始。';
    suggestion = '建议设定更具体的小目标，逐步提高"有意义天数"的比例。';
  } else {
    trend = '需要调整状态。';
    encouragement = '这阶段可能遇到了一些困难，没关系，每个低谷都是成长的机会。';
    suggestion = '建议回顾那些有意义的日子，找出是什么让你感觉良好，然后尝试复制。';
  }

  return `📊 **${periodLabels[period]}复盘总结**

在过去${periodLabels[period]}中，你共打卡${stats.totalDays}天，其中${stats.yesDays}天认为有意义，比例为${stats.yesRatio.toFixed(1)}%。

**总体评价：**${trend}
${encouragement}

**数据亮点：**
• 平均每天记录${stats.avgWords}字的复盘
• 有意义天数占比${stats.yesRatio.toFixed(1)}%
${stats.yesRatio >= 60 ? '• 已超过60%的有意义率，继续保持！' : '• 还有提升空间，加油！'}

**改进建议：**
${suggestion}

${stats.totalDays < 7 ? '💡 提示：打卡天数较少，建议坚持记录至少7天以获得更准确的复盘分析。' : ''}`;
}

/**
 * 获取目标对比数据（年度复盘专用）
 */
export async function getGoalComparisonData(walletAddress?: string) {
  // 获取用户设定的目标
  const goals = walletAddress
    ? await db.lifeGoals.where('walletAddress').equals(walletAddress).toArray()
    : await db.lifeGoals.toArray();

  // 获取当年的反思数据
  const currentYear = new Date().getFullYear();
  const allReflections = walletAddress
    ? await db.reflections.where('walletAddress').equals(walletAddress).toArray()
    : await db.reflections.toArray();

  const yearReflections = allReflections.filter(item => {
    const reflectionDate = new Date(item.date);
    return reflectionDate.getFullYear() === currentYear;
  });

  // 按日期去重，保留最后一条记录
  const dateMap = new Map<string, typeof allReflections[0]>();
  yearReflections.forEach(item => {
    dateMap.set(item.date, item);
  });
  const uniqueYearReflections = Array.from(dateMap.values());

  // 计算年度统计
  const totalDays = uniqueYearReflections.length;
  const meaningfulDays = uniqueYearReflections.filter(item => item.isMeaningful).length;
  const meaningfulRatio = totalDays > 0 ? (meaningfulDays / totalDays) * 100 : 0;

  // 按月聚合数据
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const monthReflections = uniqueYearReflections.filter(item => {
      const reflectionDate = new Date(item.date);
      return reflectionDate.getMonth() === index;
    });

    const monthTotal = monthReflections.length;
    const monthMeaningful = monthReflections.filter(item => item.isMeaningful).length;
    const monthRatio = monthTotal > 0 ? (monthMeaningful / monthTotal) * 100 : 0;

    return {
      month: `${index + 1}月`,
      total: monthTotal,
      meaningful: monthMeaningful,
      ratio: monthRatio,
    };
  });

  return {
    goals,
    yearlyStats: {
      totalDays,
      meaningfulDays,
      meaningfulRatio,
    },
    monthlyData,
  };
}

/**
 * 生成年度目标对比分析
 */
export async function generateGoalComparisonAnalysis(comparisonData: Awaited<ReturnType<typeof getGoalComparisonData>>): Promise<string> {
  const { goals, yearlyStats, monthlyData } = comparisonData;

  const goalsText = goals.map(goal => {
    const parts: string[] = [];
    if (goal.wealthGoals) {
      parts.push(`财富: 月收入${goal.wealthGoals.monthlyIncome}, 存款${goal.wealthGoals.savings}, 收益${goal.wealthGoals.investmentReturn}`);
    }
    if (goal.healthGoals) {
      parts.push(`健康: 运动${goal.healthGoals.exerciseFrequency}, 体重${goal.healthGoals.weightManagement}, 睡眠${goal.healthGoals.sleepQuality}`);
    }
    if (goal.familyGoals) {
      parts.push(`家庭: 陪伴${goal.familyGoals.familyTime}, 亲子${goal.familyGoals.parentChildRelationship}, 伴侣${goal.familyGoals.partnerRelationship}`);
    }
    if (goal.otherGoals) {
      parts.push(`其他: 学习${goal.otherGoals.learningGoals.join(', ')}, 社交${goal.otherGoals.socialGoals.join(', ')}, 兴趣${goal.otherGoals.hobbies.join(', ')}`);
    }
    return parts.map(p => `- ${p}`).join('\n');
  }).join('\n');

  const monthlyText = monthlyData
    .filter(m => m.total > 0)
    .map(m => `${m.month}: ${m.meaningful}/${m.total} (${m.ratio.toFixed(1)}%)`)
    .join('\n');

  const prompt = `用户年初设定的目标：
${goalsText || '未设定目标'}

实际完成情况：
- 打卡天数: ${yearlyStats.totalDays}/365
- 有意义天数比例: ${yearlyStats.meaningfulRatio.toFixed(1)}%
- 各月份数据:
${monthlyText || '暂无数据'}

请分析：
1. 目标达成度如何？
2. 哪个月份表现最好/最差？
3. 可能的原因是什么？
4. 给出具体的改进建议。

要求：
1. 语气温暖、积极向上
2. 字数控制在300字以内
3. 给出可操作的改进建议`;

  const aiResult = await generateAIResponse(prompt, 600);

  if (aiResult) {
    return aiResult;
  }

  // 降级文案
  return `今年你已打卡${yearlyStats.totalDays}天，有意义天数占比${yearlyStats.meaningfulRatio.toFixed(1)}%。${yearlyStats.meaningfulRatio >= 70 ? '整体表现优秀！' : '还有提升空间。'}继续坚持，让每一天都更有价值。`;
}

/**
 * 分析问题月份（年度复盘专用）
 */
export function analyzeProblemMonths(monthlyData: Array<{ month: string; total: number; meaningful: number; ratio: number }>) {
  // 找出有意义天数比例最低的3个月份
  const problemMonths = monthlyData
    .filter(m => m.total >= 3) // 至少有3次打卡
    .sort((a, b) => a.ratio - b.ratio)
    .slice(0, 3);

  return problemMonths;
}

/**
 * 生成问题分析报告
 */
export async function generateProblemAnalysis(
  problemMonths: Array<{ month: string; total: number; meaningful: number; ratio: number }>
): Promise<string> {
  if (problemMonths.length === 0) {
    return '目前数据不足，无法进行问题分析。继续积累打卡记录，系统将为你提供更有价值的分析。';
  }

  const problemText = problemMonths
    .map(m => `${m.month}: 有意义天数占比${m.ratio.toFixed(1)}%`)
    .join('\n');

  const prompt = `用户在某些月份的表现不太理想，请分析可能的原因并给出建议：

问题月份：
${problemText}

请分析：
1. 这些时间段可能发生了什么？
2. 可能的干扰因素是什么？
3. 如何避免类似情况？

要求：
1. 语气温暖、充满理解
2. 字数控制在200字以内
3. 给出实用的解决方案`;

  const aiResult = await generateAIResponse(prompt, 500);

  if (aiResult) {
    return aiResult;
  }

  // 降级文案
  return `注意到${problemMonths.map(m => m.month).join('、')}的表现有所下降。这是正常的波动，关键是要调整状态，重新找回节奏。建议回顾这些时间段，找出可能的干扰因素，制定应对策略。`;
}
