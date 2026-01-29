/**
 * 演示数据内容模板库
 * 包含50+个真实场景的反思内容模板
 */

import { ContentTemplate, EmotionType, InterestType } from '@/types/demo-data';

/**
 * 工作主题模板
 */
const WORK_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'work',
    style: 'detailed',
    template: '今天深度工作了8小时，完成了{task}项目，感觉非常充实。在使用{technology}的过程中，学到了{skill}技巧，这对后续工作很有帮助。和团队讨论了{topic}，大家的意见很一致，项目推进很顺利。',
    defaultEmotion: '积极',
    keywords: ['工作', '效率', '团队', '项目', '技能'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '参与了{meeting_type}会议，提出了{number}个改进建议，团队采纳了{adopted}个。特别是关于{topic}的讨论，让我对{domain}有了新的认识。需要跟进{action_item}，确保落实到位。',
    defaultEmotion: '积极',
    keywords: ['会议', '协作', '沟通', '改进', '执行'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '今天在解决{problem}时遇到了一些困难，花了{hours}小时才找到原因。主要是{reason}导致的，以后要避免类似情况，需要{solution}。虽然过程曲折，但学到了很多。',
    defaultEmotion: '焦虑',
    keywords: ['问题', '解决', '学习', '改进', '耐心'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '完成了{task}的阶段性成果，得到了{role}的认可。接下来的计划是{plan}，预计在{timeframe}内完成。需要协调{resources}资源，确保项目按时交付。',
    defaultEmotion: '积极',
    keywords: ['成果', '认可', '计划', '协调', '交付'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '今天的工作效率不太高，主要原因有{reason1}、{reason2}。感觉有点疲惫，需要调整工作节奏。明天要重点关注{priority}，避免被{distraction}分散注意力。',
    defaultEmotion: '疲惫',
    keywords: ['效率', '状态', '调整', '专注', '节奏'],
  },
  {
    theme: 'work',
    style: 'concise',
    template: '完成{task}，效率提升{percentage}%。',
    defaultEmotion: '积极',
    keywords: ['完成', '效率', '提升'],
  },
  {
    theme: 'work',
    style: 'concise',
    template: '学习{skill}，掌握核心概念。',
    defaultEmotion: '平静',
    keywords: ['学习', '进步', '技能'],
  },
  {
    theme: 'work',
    style: 'concise',
    template: '参与{project}讨论，提出{number}条建议。',
    defaultEmotion: '积极',
    keywords: ['讨论', '建议', '贡献'],
  },
];

/**
 * 健康主题模板
 */
const HEALTH_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'health',
    style: 'detailed',
    template: '今天进行了{exercise}，坚持了{duration}分钟。心率保持在{rate}，感觉{feeling}。运动后的能量提升很明显，工作效率也提高了。计划明天继续增加{intensity}。',
    defaultEmotion: '积极',
    keywords: ['运动', '健康', '坚持', '能量', '提升'],
  },
  {
    theme: 'health',
    style: 'detailed',
    template: '今天的饮食比较健康，早餐吃了{breakfast}，午餐是{lunch}，晚餐比较清淡{dinner}。感觉肠胃很舒服，精神状态也不错。要继续保持这种饮食习惯。',
    defaultEmotion: '平静',
    keywords: ['饮食', '健康', '习惯', '状态'],
  },
  {
    theme: 'health',
    style: 'detailed',
    template: '昨晚睡了{hours}小时，睡眠质量{quality}。今天早上醒来精神饱满，一整天都保持了良好的状态。规律的作息真的很重要，要继续坚持{bedtime}睡觉。',
    defaultEmotion: '积极',
    keywords: ['睡眠', '作息', '精神', '规律'],
  },
  {
    theme: 'health',
    style: 'detailed',
    template: '今天身体不太舒服，{symptom}。可能是{cause}导致的，需要{treatment}。健康是第一位的，不能忽视身体的信号。明天要休息调整一下。',
    defaultEmotion: '疲惫',
    keywords: ['健康', '休息', '调整', '身体'],
  },
  {
    theme: 'health',
    style: 'detailed',
    template: '尝试了{activity}，发现很有意思。虽然一开始{difficulty}，但坚持下来后{benefit}。这是一种很好的放松方式，可以加入日常的健身计划中。',
    defaultEmotion: '积极',
    keywords: ['尝试', '运动', '放松', '发现'],
  },
  {
    theme: 'health',
    style: 'concise',
    template: '晨跑{distance}公里，状态良好。',
    defaultEmotion: '积极',
    keywords: ['跑步', '运动', '健康'],
  },
  {
    theme: 'health',
    style: 'concise',
    template: '睡眠{hours}小时，精神充沛。',
    defaultEmotion: '积极',
    keywords: ['睡眠', '精神', '休息'],
  },
];

/**
 * 财务主题模板
 */
const FINANCE_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'finance',
    style: 'detailed',
    template: '今天复盘了投资组合，{performance}。特别是{stock}的表现，让我意识到{insight}。计划调整{strategy}，更加注重{aspect}。投资需要耐心和纪律。',
    defaultEmotion: '平静',
    keywords: ['投资', '理财', '复盘', '策略', '耐心'],
  },
  {
    theme: 'finance',
    style: 'detailed',
    template: '记录了今天的开支，总共{amount}元。主要花在{category}上。有些支出是必要的{necessary}，有些可以避免{avoidable}。以后要更加注意{budget}。',
    defaultEmotion: '平静',
    keywords: ['开支', '记账', '预算', '控制', '理财'],
  },
  {
    theme: 'finance',
    style: 'detailed',
    template: '坚持定投{investment}已经{period}了，今天看了一下收益{return}。虽然市场有波动，但坚持长期主义是正确的。继续定投，相信时间的复利力量。',
    defaultEmotion: '积极',
    keywords: ['定投', '长期', '坚持', '复利'],
  },
  {
    theme: 'finance',
    style: 'detailed',
    template: '学习了{financial_concept}，对{topic}有了更深的理解。理财不只是一时冲动，更需要系统性的规划。制定了{plan}，准备逐步实施。',
    defaultEmotion: '积极',
    keywords: ['学习', '理财', '规划', '知识'],
  },
  {
    theme: 'finance',
    style: 'concise',
    template: '定投{amount}元，坚持长期主义。',
    defaultEmotion: '平静',
    keywords: ['定投', '理财', '长期'],
  },
  {
    theme: 'finance',
    style: 'concise',
    template: '记录开支{amount}元，控制消费。',
    defaultEmotion: '平静',
    keywords: ['开支', '记账', '控制'],
  },
];

/**
 * 学习主题模板
 */
const LEARNING_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'learning',
    style: 'detailed',
    template: '学习了{course}的{chapter}章，掌握了{concept}。通过{practice}加深理解，准备明天应用在{project}中。学习是一辈子的事情，要保持好奇心。',
    defaultEmotion: '积极',
    keywords: ['学习', '进步', '知识', '应用', '成长'],
  },
  {
    theme: 'learning',
    style: 'detailed',
    template: '阅读了{book}的{part}部分，很有启发。特别是关于{topic}的论述，让我对{concept}有了新的认识。准备写一篇读后感，梳理思路。',
    defaultEmotion: '平静',
    keywords: ['阅读', '启发', '思考', '书'],
  },
  {
    theme: 'learning',
    style: 'detailed',
    template: '完成了{skill}的学习，达到了{level}水平。虽然过程中遇到了{difficulty}，但通过{method}克服了。下一步是{next_step}，继续精进。',
    defaultEmotion: '积极',
    keywords: ['完成', '技能', '进步', '克服', '精进'],
  },
  {
    theme: 'learning',
    style: 'detailed',
    template: '今天参加了{training}，讲师是{instructor}，讲得很精彩。学到了{number}个实用技巧，特别是{technique}非常实用。准备在工作中立即应用。',
    defaultEmotion: '积极',
    keywords: ['培训', '学习', '技巧', '应用'],
  },
  {
    theme: 'learning',
    style: 'detailed',
    template: '今天在{topic}上花了很多时间，但进步不明显。可能是{reason}导致的，需要改变{approach}。学习需要找到适合自己的方法，不能盲目努力。',
    defaultEmotion: '焦虑',
    keywords: ['学习', '方法', '调整', '反思'],
  },
  {
    theme: 'learning',
    style: 'concise',
    template: '学习{skill}，掌握核心概念。',
    defaultEmotion: '平静',
    keywords: ['学习', '进步', '技能'],
  },
  {
    theme: 'learning',
    style: 'concise',
    template: '阅读{pages}页，增长见识。',
    defaultEmotion: '平静',
    keywords: ['阅读', '学习', '知识'],
  },
];

/**
 * 社交主题模板
 */
const SOCIAL_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'social',
    style: 'detailed',
    template: '和{relationship}进行了深度交流，讨论了{topic}。通过这次沟通，我们解决了{problem}，关系更加融洽。良好的沟通真的很重要。',
    defaultEmotion: '积极',
    keywords: ['沟通', '交流', '关系', '理解', '解决'],
  },
  {
    theme: 'social',
    style: 'detailed',
    template: '参加了{event}，认识了{number}个新朋友。大家在{topic}上有很多共同语言，交流很愉快。拓展人脉很有价值，要保持开放的心态。',
    defaultEmotion: '积极',
    keywords: ['社交', '朋友', '交流', '人脉'],
  },
  {
    theme: 'social',
    style: 'detailed',
    template: '今天和家人一起{activity}，很温馨的感觉。平时工作忙，很少有这样的{quality_time}。要更加珍惜和家人在一起的时光，平衡工作和生活。',
    defaultEmotion: '积极',
    keywords: ['家庭', '陪伴', '温馨', '平衡'],
  },
  {
    theme: 'social',
    style: 'detailed',
    template: '帮助{person}解决了{difficulty}，对方很感激。助人为乐是件快乐的事，也能加深彼此的情谊。继续做力所能及的善事。',
    defaultEmotion: '积极',
    keywords: ['帮助', '善事', '快乐', '友谊'],
  },
  {
    theme: 'social',
    style: 'detailed',
    template: '今天在{situation}中有些冲突，主要是{cause}导致的。后来通过{resolution}解决了。反思这次经历，需要{lesson}。人际关系需要用心经营。',
    defaultEmotion: '焦虑',
    keywords: ['冲突', '解决', '反思', '成长'],
  },
  {
    theme: 'social',
    style: 'concise',
    template: '陪伴家人，享受温馨时光。',
    defaultEmotion: '积极',
    keywords: ['家庭', '陪伴', '温馨'],
  },
  {
    theme: 'social',
    style: 'concise',
    template: '帮助朋友，增进友谊。',
    defaultEmotion: '平静',
    keywords: ['朋友', '帮助', '友谊'],
  },
];

/**
 * 成长主题模板
 */
const GROWTH_TEMPLATES: ContentTemplate[] = [
  {
    theme: 'work',
    style: 'detailed',
    template: '今天反思了自己的{aspect}，发现了{insight}。虽然不太容易接受，但这是成长的必经之路。下一步要{action}，持续改进。',
    defaultEmotion: '平静',
    keywords: ['反思', '成长', '自我认知', '改进'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '实现了{goal}，这是{period}以来一直努力的方向。虽然过程中有{challenge}，但最终克服了。这证明只要有决心，什么都可以实现。',
    defaultEmotion: '积极',
    keywords: ['目标', '实现', '努力', '成就'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '今天参加了{activity}，走出了舒适区。虽然一开始{nervous}，但完成后很有{achievement}。成长需要不断尝试新事物。',
    defaultEmotion: '积极',
    keywords: ['尝试', '突破', '舒适区', '成长'],
  },
  {
    theme: 'work',
    style: 'detailed',
    template: '复盘了{period}的进展，总体{evaluation}。亮点是{highlight}，需要改进的是{improve_area}。继续加油，相信自己。',
    defaultEmotion: '平静',
    keywords: ['复盘', '进展', '亮点', '改进'],
  },
  {
    theme: 'work',
    style: 'concise',
    template: '反思自我，发现不足。',
    defaultEmotion: '平静',
    keywords: ['反思', '成长', '改进'],
  },
  {
    theme: 'work',
    style: 'concise',
    template: '突破舒适区，获得成长。',
    defaultEmotion: '积极',
    keywords: ['突破', '成长', '进步'],
  },
];

/**
 * 所有模板
 */
export const CONTENT_TEMPLATES: ContentTemplate[] = [
  ...WORK_TEMPLATES,
  ...HEALTH_TEMPLATES,
  ...FINANCE_TEMPLATES,
  ...LEARNING_TEMPLATES,
  ...SOCIAL_TEMPLATES,
  ...GROWTH_TEMPLATES,
];

/**
 * 根据兴趣和写作风格选择模板
 */
export function selectTemplate(
  interests: InterestType[],
  style: 'detailed' | 'concise' | 'balanced'
): ContentTemplate {
  // 根据兴趣主题筛选
  const themeMap: Record<InterestType, 'work' | 'health' | 'finance' | 'learning' | 'social'> = {
    work: 'work',
    health: 'health',
    wealth: 'finance',
    learning: 'learning',
    growth: 'work',
    family: 'social',
    social: 'social',
  };

  // 随机选择一个兴趣
  const primaryInterest = interests[Math.floor(Math.random() * interests.length)];
  const theme = themeMap[primaryInterest] || 'work';

  // 筛选符合主题和风格的模板
  const matchingTemplates = CONTENT_TEMPLATES.filter(
    t => t.theme === theme && t.style === style
  );

  // 如果没有匹配的，返回默认模板
  if (matchingTemplates.length === 0) {
    return WORK_TEMPLATES[0];
  }

  // 随机返回一个
  return matchingTemplates[Math.floor(Math.random() * matchingTemplates.length)];
}

/**
 * 填充模板占位符
 */
export function fillTemplate(template: string): string {
  const replacements: Record<string, string[]> = {
    task: ['项目开发', '需求分析', '代码审查', '文档编写', '测试用例'],
    technology: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python'],
    skill: ['性能优化', '架构设计', '团队协作', '沟通技巧'],
    meeting_type: ['产品', '技术', '项目', '周会'],
    number: ['3', '5', '2', '4'],
    adopted: ['2', '3', '1'],
    topic: ['性能优化', '架构升级', '用户体验', '功能迭代'],
    domain: ['前端开发', '后端架构', '全栈开发', 'DevOps'],
    action_item: ['任务分配', '时间节点', '责任人'],
    problem: ['线上问题', 'bug修复', '兼容性问题'],
    hours: ['4', '5', '6'],
    reason: ['代码逻辑错误', '环境配置问题', '依赖版本冲突'],
    solution: ['增加单元测试', '完善文档', '规范流程'],
    percentage: ['20', '30', '15'],
    exercise: ['晨跑', '游泳', '瑜伽', '力量训练'],
    duration: ['30', '45', '60'],
    rate: ['130-140', '140-150'],
    feeling: ['很好', '不错', '有点累但很爽'],
    intensity: ['训练强度', '运动时长'],
    breakfast: ['燕麦粥', '鸡蛋', '牛奶'],
    lunch: ['米饭+蔬菜+鸡肉', '沙拉'],
    dinner: ['蔬菜汤', '水果'],
    sleep_hours: ['7', '8', '6'],
    quality: ['很好', '一般', '不太好'],
    bedtime: ['11点', '10点半'],
    symptom: ['头痛', '胃痛', '乏力'],
    cause: ['工作压力大', '作息不规律'],
    treatment: ['休息', '吃药', '调整作息'],
    activity: ['冥想', '太极', '普拉提'],
    exercise_difficulty: ['入门有点难', '动作不标准'],
    benefit: ['身心放松', '体能提升'],
    distance: ['3', '5'],
    stock: ['XX科技', 'YY基金'],
    performance: ['略有收益', '小幅亏损', '持平'],
    insight: ['风险控制的重要性', '长期持有的价值'],
    strategy: ['资产配置', '风险控制'],
    aspect: ['基本面分析', '技术分析'],
    amount: ['200', '300', '500'],
    category: ['餐饮', '交通', '购物'],
    necessary: ['必要的支出'],
    avoidable: ['冲动消费'],
    budget: ['月度预算', '消费计划'],
    investment: ['指数基金', '股票'],
    period: ['3个月', '半年', '1年'],
    return: ['5%', '8%', '-2%'],
    financial_concept: ['复利', '资产配置', '风险控制'],
    plan: ['投资计划', '理财方案'],
    course: ['TypeScript进阶', 'React实战', '算法设计'],
    chapter: ['第3', '第5', '第7'],
    concept: ['泛型编程', '函数式编程', '异步编程'],
    practice: ['练习项目', '实战应用'],
    project: ['工作项目', '个人项目'],
    book: ['《思考，快与慢》', '《原则》'],
    part: ['前半部分', '第一章'],
    learning_skill: ['Python', '机器学习', '数据分析'],
    level: ['入门', '中级', '高级'],
    learning_difficulty: ['概念难理解', '实践有挑战'],
    method: ['查阅资料', '请教专家', '反复练习'],
    next_step: ['深入学习', '实际应用'],
    training: ['技能培训', '管理课程'],
    instructor: ['王老师', '李老师'],
    event_number: ['5', '8', '10'],
    technique: ['时间管理法', '沟通技巧'],
    relationship: ['同事', '朋友', '家人'],
    social_problem: ['分歧', '误解'],
    event: ['行业沙龙', '技术交流会'],
    pages: ['30', '50', '20'],
    social_activity: ['吃饭', '看电影', '旅行'],
    quality_time: ['高质量陪伴时间'],
    person: ['同事', '朋友'],
    communication_difficulty: ['困难'],
    situation: ['团队会议', '项目讨论'],
    communication_cause: ['沟通不畅', '立场不同'],
    resolution: ['坦诚沟通', '寻求共识'],
    lesson: ['更好地表达', '控制情绪'],
    communication_aspect: ['沟通方式', '情绪管理'],
    self_insight: ['需要改进的地方', '潜在的盲点'],
    action: ['制定改进计划', '寻求反馈'],
    goal: ['月度目标', '季度目标'],
    goal_period: ['三个月', '半年'],
    challenge: ['时间紧张', '资源有限'],
    achievement: ['成就感', '收获'],
    nervous: ['紧张', '不确定'],
    evaluation: ['不错', '很好', '有待提升'],
    highlight: ['完成关键任务', '提升专业技能'],
    improve_area: ['时间管理', '沟通效率'],
  };

  let result = template;

  // 替换所有占位符
  Object.keys(replacements).forEach(key => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    const options = replacements[key];
    const value = options[Math.floor(Math.random() * options.length)];
    result = result.replace(regex, value);
  });

  return result;
}

/**
 * 获取情绪变化趋势（基于性格类型）
 */
export function generateEmotionTrend(
  days: number,
  personalityType: 'optimistic' | 'neutral' | 'pessimistic',
  baseEmotion: EmotionType
): EmotionType[] {
  const emotions: EmotionType[] = [];
  let currentValue = getEmotionValue(baseEmotion);

  // 性格基准值
  const personalityBase = {
    optimistic: 0.65,
    neutral: 0.5,
    pessimistic: 0.35,
  }[personalityType];

  // 定义事件节点（约每10-15天一个事件）
  const eventDays = new Set<number>();
  for (let i = 0; i < Math.floor(days / 12); i++) {
    eventDays.add(Math.floor(Math.random() * days));
  }

  for (let i = 0; i < days; i++) {
    if (eventDays.has(i)) {
      // 事件日：情绪大幅波动
      currentValue += (Math.random() - 0.5) * 0.8;
    } else {
      // 普通日：小幅波动
      currentValue += (Math.random() - 0.5) * 0.15;
    }

    // 回归性格基准
    currentValue = currentValue * 0.9 + personalityBase * 0.1;

    // 限制范围
    currentValue = Math.max(0, Math.min(1, currentValue));

    emotions.push(mapValueToEmotion(currentValue));
  }

  return emotions;
}

/**
 * 获取情绪值
 */
function getEmotionValue(emotion: EmotionType): number {
  switch (emotion) {
    case '积极':
      return 0.75;
    case '平静':
      return 0.5;
    case '焦虑':
      return 0.35;
    case '疲惫':
      return 0.15;
  }
}

/**
 * 将数值映射到情绪
 */
function mapValueToEmotion(value: number): EmotionType {
  if (value > 0.65) return '积极';
  if (value > 0.45) return '平静';
  if (value > 0.25) return '焦虑';
  return '疲惫';
}

/**
 * 生成关键词
 */
export function generateKeywords(
  interests: InterestType[],
  templateKeywords: string[]
): string[] {
  // 基础关键词池
  const baseKeywords = [
    '坚持', '反思', '成长', '进步', '提升', '改进',
    '学习', '实践', '效率', '平衡', '健康', '生活',
    '工作', '团队', '沟通', '协作', '目标', '计划',
  ];

  // 70%来自模板，30%来自基础池
  const fromTemplate = templateKeywords.slice(0, 3);
  const fromBase = baseKeywords.sort(() => Math.random() - 0.5).slice(0, 2);

  return [...fromTemplate, ...fromBase];
}
