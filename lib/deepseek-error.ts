/**
 * 每日三问 AI 失败时的用户可读文案。
 * 不发请求，方便在没有密钥或密钥错误时直接说明原因。
 */

export interface DeepSeekFailureInput {
  hasApiKey: boolean;
  status?: number;
  statusText?: string;
  bodyText?: string;
  error?: unknown;
}

export function extractProviderMessage(bodyText: string): string {
  const trimmed = bodyText.trim();
  if (!trimmed) return '';

  try {
    const parsed = JSON.parse(trimmed) as unknown;

    if (typeof parsed === 'string') return parsed;

    if (parsed && typeof parsed === 'object') {
      const record = parsed as {
        error?: unknown;
        message?: unknown;
      };

      if (typeof record.error === 'string') return record.error;
      if (typeof record.message === 'string') return record.message;

      if (record.error && typeof record.error === 'object') {
        const nested = record.error as { message?: unknown };
        if (typeof nested.message === 'string') return nested.message;
      }
    }
  } catch {
    // 保留原始文本。
  }

  return trimmed;
}

function isAuthFailure(status: number | undefined, detail: string, errorMessage: string): boolean {
  const combined = `${detail} ${errorMessage}`.toLowerCase();

  return (
    status === 401 ||
    status === 403 ||
    combined.includes('invalid api key') ||
    combined.includes('incorrect api key') ||
    combined.includes('unauthorized') ||
    combined.includes('authentication') ||
    combined.includes('invalid token') ||
    combined.includes('token expired')
  );
}

function isTimeout(error: unknown, detail: string, errorMessage: string): boolean {
  const name = error instanceof Error ? error.name : '';
  const combined = `${detail} ${errorMessage}`.toLowerCase();

  return (
    name === 'TimeoutError' ||
    name === 'AbortError' ||
    combined.includes('timeout') ||
    combined.includes('aborted') ||
    combined.includes('the operation was aborted')
  );
}

export function describeDeepSeekFailure(input: DeepSeekFailureInput): string {
  if (!input.hasApiKey) {
    return '未配置 DEEPSEEK_API_KEY，AI 无法整理这次复盘。请在环境变量中配置后重试。';
  }

  const detail = extractProviderMessage(input.bodyText || '');
  const errorMessage = input.error instanceof Error ? input.error.message : '';

  if (isAuthFailure(input.status, detail, errorMessage)) {
    return detail
      ? `DeepSeek 认证失败：API Key 无效、已过期或无权限。请检查 DEEPSEEK_API_KEY。原始信息: ${detail}`
      : 'DeepSeek 认证失败：API Key 无效、已过期或无权限。请检查 DEEPSEEK_API_KEY。';
  }

  if (isTimeout(input.error, detail, errorMessage)) {
    return 'AI 请求超时，请稍后重试。';
  }

  if (input.status) {
    const statusLabel = input.statusText
      ? `HTTP ${input.status} ${input.statusText}`
      : `HTTP ${input.status}`;
    return detail
      ? `DeepSeek 请求失败（${statusLabel}）：${detail}`
      : `DeepSeek 请求失败（${statusLabel}）。`;
  }

  if (errorMessage) {
    return `AI 处理失败：${errorMessage}`;
  }

  return 'AI 处理失败，请稍后重试。';
}

/** 去掉模型常见的 markdown 代码块后再解析 JSON。 */
export function parseReflectionJson(raw: string): unknown {
  const trimmed = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error('AI 返回的内容不是有效 JSON，无法整理这次复盘。');
  }
}
