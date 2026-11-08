/**
 * DeepSeek API 封装
 * 用于反思内容的结构化提取
 */

import { StructuredReflectionData } from './db';
import { describeDeepSeekFailure, parseReflectionJson } from './deepseek-error';

/**
 * DeepSeek API 配置
 * 支持官方 API 和硅基流动 API
 */
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

/**
 * AI 处理错误
 */
export class DeepSeekError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'DeepSeekError';
  }
}

/**
 * 系统 Prompt
 * 指导 AI 如何结构化提取反思内容
 */
const SYSTEM_PROMPT = `你是一个专业的复盘助手。请将用户的复盘内容整理成JSON格式。

要求：
1. gains（收获）和losses（损失）至少各提取2条
2. emotion（情绪）必须是以下4个之一：积极、平静、焦虑、疲惫
3. keywords（关键词）提取3-5个最重要的关键词
4. ideas（想法）提取1-3条

返回JSON格式，不要其他文字：
{
  "gains": ["学到了什么", "做到了什么"],
  "losses": ["浪费了什么", "犯了什么错"],
  "ideas": ["闪现的灵感", "新的想法"],
  "emotion": "积极",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}`;

/**
 * 调用 DeepSeek API 进行结构化提取。
 * 没有密钥、密钥无效或请求失败时抛出可读错误，不再静默换成演示数据。
 */
export async function processReflectionWithDeepSeek(content: string): Promise<StructuredReflectionData> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    const message = describeDeepSeekFailure({ hasApiKey: false });
    console.warn('[DeepSeek]', message);
    throw new DeepSeekError(message);
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const bodyText = await response.text();
      throw new DeepSeekError(
        describeDeepSeekFailure({
          hasApiKey: true,
          status: response.status,
          statusText: response.statusText,
          bodyText,
        }),
        response.status
      );
    }

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content;
    if (typeof result !== 'string' || !result.trim()) {
      throw new DeepSeekError('AI 没有返回可整理的内容，请稍后重试。');
    }

    let structuredData: StructuredReflectionData;
    try {
      structuredData = parseReflectionJson(result) as StructuredReflectionData;
    } catch (parseError) {
      throw new DeepSeekError(
        parseError instanceof Error
          ? parseError.message
          : 'AI 返回的内容不是有效 JSON，无法整理这次复盘。'
      );
    }

    if (
      !structuredData ||
      !Array.isArray(structuredData.gains) ||
      !Array.isArray(structuredData.losses) ||
      !structuredData.emotion
    ) {
      throw new DeepSeekError('AI 返回的数据缺少收获、损失或情绪，无法完成整理。');
    }

    structuredData.ideas = Array.isArray(structuredData.ideas) ? structuredData.ideas : [];
    structuredData.keywords = Array.isArray(structuredData.keywords) ? structuredData.keywords : [];

    console.log('[DeepSeek] AI处理成功:', structuredData);
    return structuredData;
  } catch (error) {
    if (error instanceof DeepSeekError) {
      console.error('[DeepSeek] API调用失败:', error.message);
      throw error;
    }

    const message = describeDeepSeekFailure({ hasApiKey: true, error });
    console.error('[DeepSeek] API调用失败:', error);
    throw new DeepSeekError(message);
  }
}

/**
 * 生成月度洞察报告
 * @param reflections 本月所有反思数据
 * @returns AI生成的洞察报告
 */
export async function generateMonthlyInsights(
  reflections: Array<{
    date: string;
    isMeaningful: boolean;
    structuredData: StructuredReflectionData;
  }>
): Promise<{
  summary: string;
  suggestions: string[];
}> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  // 如果没有API Key，使用Mock数据
  if (!apiKey) {
    console.warn('[DeepSeek] 未配置API Key，使用Mock月度报告');
    return getMockMonthlyInsights(reflections);
  }

  try {
    // 准备数据摘要
    const summary = reflections.map((r) => ({
      date: r.date,
      isMeaningful: r.isMeaningful,
      emotion: r.structuredData.emotion,
      keywords: r.structuredData.keywords.join(', '),
      gains: r.structuredData.gains.slice(0, 2).join('; '),
    }));

    const prompt = `基于以下复盘数据，生成月度洞察报告：

${JSON.stringify(summary, null, 2)}

请生成：
1. 总体评价（100字以内）
2. 3-5条改进建议

返回JSON格式：
{
  "summary": "总体评价",
  "suggestions": ["建议1", "建议2", "建议3"]
}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的成长教练，善于从日常反思中提炼洞察。',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
      // 15秒超时
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new DeepSeekError(`API请求失败: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log('[DeepSeek] 月度洞察生成成功:', result);
    return result;
  } catch (error) {
    console.error('[DeepSeek] 月度洞察生成失败，使用Mock数据:', error);
    return getMockMonthlyInsights(reflections);
  }
}

/**
 * Mock 月度洞察报告
 */
function getMockMonthlyInsights(
  reflections: Array<{ isMeaningful: boolean }>
): {
  summary: string;
  suggestions: string[];
} {
  const meaningfulCount = reflections.filter((r) => r.isMeaningful).length;
  const rate = Math.round((meaningfulCount / reflections.length) * 100);

  return {
    summary: `本月共复盘${reflections.length}天，其中有意义${meaningfulCount}天，占比${rate}%。整体表现${rate >= 70 ? '优秀' : rate >= 50 ? '良好' : '有待提升'}，情绪波动${rate >= 70 ? '稳定' : '较大'}。`,
    suggestions: [
      '保持早起习惯，提升早晨效率',
      '增加运动时间，改善身体状态',
      '减少社交媒体使用，专注深度工作',
      '定期回顾目标，及时调整方向',
      '培养冥想习惯，保持内心平静',
    ].slice(0, 3 + Math.floor(Math.random() * 3)),
  };
}
