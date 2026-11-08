/**
 * Gemini AI 服务 - Google Gemini API 封装
 *
 * 用途: 作为DeepSeek的备用AI服务
 * 当DeepSeek API调用失败时，自动切换到Gemini
 */

import https from 'https';

/**
 * Gemini AI 响应接口
 */
export interface GeminiResponse {
  content: string;
  model: string;
  provider: 'gemini';
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Gemini AI 服务错误类
 */
export class GeminiServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

/**
 * 调用 Gemini API
 *
 * @param prompt - 用户提示词
 * @param maxTokens - 最大生成token数，默认500
 * @returns Gemini AI 响应
 */
export async function callGeminiAPI(
  prompt: string,
  maxTokens: number = 500
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new GeminiServiceError('GEMINI_API_KEY 未配置');
  }

  // 使用 Gemini Pro 模型
  const model = 'gemini-pro';

  // Gemini API 使用不同的请求格式
  const requestBody = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `你是一个专业的成长教练，善于从日常反思中提炼洞察，帮助用户复盘和改进。\n\n${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: maxTokens,
      topK: 40,
      topP: 0.95,
    },
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(
            new GeminiServiceError(
              `Gemini API 请求失败: ${data}`,
              res.statusCode
            )
          );
          return;
        }

        try {
          const result = JSON.parse(data);

          // Gemini API 响应格式
          if (
            !result.candidates ||
            !result.candidates[0] ||
            !result.candidates[0].content ||
            !result.candidates[0].content.parts ||
            !result.candidates[0].content.parts[0]
          ) {
            reject(new GeminiServiceError('Gemini API 响应格式异常'));
            return;
          }

          const content = result.candidates[0].content.parts[0].text || '';
          const usage = result.usageMetadata
            ? {
                promptTokens: result.usageMetadata.promptTokenCount || 0,
                completionTokens: result.usageMetadata.candidatesTokenCount || 0,
                totalTokens: result.usageMetadata.totalTokenCount || 0,
              }
            : undefined;

          resolve({
            content,
            model,
            provider: 'gemini',
            usage,
          });
        } catch (parseError) {
          reject(
            new GeminiServiceError(
              `解析响应失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`
            )
          );
        }
      });
    });

    req.on('error', (error) => {
      reject(new GeminiServiceError(`Gemini API 网络错误: ${error.message}`));
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new GeminiServiceError('Gemini API 请求超时'));
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * 生成 Gemini AI 文本（便捷方法）
 *
 * @param prompt - 用户提示词
 * @param maxTokens - 最大生成token数
 * @returns 生成的文本内容
 */
export async function generateGeminiResponse(
  prompt: string,
  maxTokens?: number
): Promise<string> {
  try {
    const response = await callGeminiAPI(prompt, maxTokens);
    return response.content;
  } catch (error) {
    console.error('[Gemini Service] AI 生成失败:', error);
    throw error;
  }
}

/**
 * 检查 Gemini 服务是否可用
 *
 * @returns 是否配置了 Gemini API Key
 */
export function isGeminiServiceAvailable(): boolean {
  return !!process.env.GEMINI_API_KEY;
}
