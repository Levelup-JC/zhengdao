import { describeDeepSeekFailure, parseReflectionJson } from '@/lib/deepseek-error';
import {
  clearCheckInDraft,
  loadCheckInDraft,
  parseCheckInDraft,
  saveCheckInDraft,
  type CheckInDraft,
} from '@/lib/check-in-draft';

describe('每日三问 MVP', () => {
  test('没有 API Key 时返回明确文案', () => {
    const message = describeDeepSeekFailure({ hasApiKey: false });
    expect(message).toContain('DEEPSEEK_API_KEY');
    expect(message).toContain('无法整理');
  });

  test('错误 Key 的 401 响应会保留原始原因', () => {
    const message = describeDeepSeekFailure({
      hasApiKey: true,
      status: 401,
      statusText: 'Unauthorized',
      bodyText: JSON.stringify({ error: { message: 'Invalid API key' } }),
    });

    expect(message).toContain('认证失败');
    expect(message).toContain('Invalid API key');
  });

  test('刷新前的草稿可以按地址和日期恢复', () => {
    const storage = window.localStorage;
    storage.clear();

    const draft: CheckInDraft = {
      date: '2026-11-08',
      walletAddress: '0xABC',
      step: 'input',
      isMeaningful: true,
      content: '今天完成了每日三问的记录内容',
      structuredData: null,
      aiError: '未配置 DEEPSEEK_API_KEY，AI 无法整理这次复盘。',
      updatedAt: 1,
    };

    saveCheckInDraft(storage, draft);
    const loaded = loadCheckInDraft(storage, '0xabc', '2026-11-08');

    expect(loaded?.content).toBe(draft.content);
    expect(loaded?.isMeaningful).toBe(true);
    expect(loaded?.aiError).toContain('DEEPSEEK_API_KEY');

    clearCheckInDraft(storage, '0xABC', '2026-11-08');
    expect(loadCheckInDraft(storage, '0xABC', '2026-11-08')).toBeNull();
  });

  test('过期日期和未完成的 AI 处理不会恢复错内容', () => {
    const stale = JSON.stringify({
      date: '2020-01-01',
      walletAddress: '0xabc',
      step: 'input',
      isMeaningful: true,
      content: '这是昨天的旧草稿内容',
      structuredData: null,
      aiError: null,
    });
    expect(parseCheckInDraft(stale, '0xabc', '2026-11-08')).toBeNull();

    const processing = JSON.stringify({
      date: '2026-11-08',
      walletAddress: '0xabc',
      step: 'processing',
      isMeaningful: false,
      content: '刷新前正在处理的复盘内容',
      structuredData: null,
      aiError: null,
    });
    expect(parseCheckInDraft(processing, '0xabc', '2026-11-08')?.step).toBe('input');
  });

  test('模型用代码块包裹时仍能解析 JSON', () => {
    expect(parseReflectionJson('```json\n{"gains":["完成记录"]}\n```')).toEqual({
      gains: ['完成记录'],
    });
  });
});
