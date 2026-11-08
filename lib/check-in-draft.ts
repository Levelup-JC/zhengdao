/**
 * 每日三问未提交草稿。
 * 刷新页面后从 localStorage 恢复当天、当前地址的填写内容。
 */

import type { StructuredReflectionData } from './db';

export type CheckInDraftStep = 'question' | 'input' | 'preview';

export interface CheckInDraft {
  date: string;
  walletAddress: string;
  step: CheckInDraftStep;
  isMeaningful: boolean | null;
  content: string;
  structuredData: StructuredReflectionData | null;
  aiError: string | null;
  updatedAt: number;
}

export interface DraftStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const DRAFT_PREFIX = 'zhengdao:check-in-draft:';

export function checkInDraftKey(walletAddress: string, date: string): string {
  return `${DRAFT_PREFIX}${walletAddress.toLowerCase()}:${date}`;
}

export function hasDraftContent(
  draft: Pick<CheckInDraft, 'isMeaningful' | 'content' | 'structuredData' | 'aiError'>
): boolean {
  return (
    draft.isMeaningful !== null ||
    draft.content.trim().length > 0 ||
    draft.structuredData !== null ||
    Boolean(draft.aiError)
  );
}

function isStructuredData(value: unknown): value is StructuredReflectionData {
  if (!value || typeof value !== 'object') return false;
  const data = value as StructuredReflectionData;
  return (
    Array.isArray(data.gains) &&
    Array.isArray(data.losses) &&
    Array.isArray(data.ideas) &&
    typeof data.emotion === 'string' &&
    Array.isArray(data.keywords)
  );
}

export function normalizeDraftStep(
  step: unknown,
  isMeaningful: boolean | null,
  structuredData: StructuredReflectionData | null
): CheckInDraftStep {
  if (isMeaningful === null) return 'question';
  if (step === 'preview' && structuredData) return 'preview';
  if (step === 'question') return 'question';
  return 'input';
}

export function parseCheckInDraft(
  raw: string | null,
  walletAddress: string,
  date: string
): CheckInDraft | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CheckInDraft>;
    if (typeof parsed.walletAddress !== 'string') return null;
    if (parsed.walletAddress.toLowerCase() !== walletAddress.toLowerCase()) return null;
    if (parsed.date !== date) return null;
    if (typeof parsed.content !== 'string') return null;

    const structuredData = isStructuredData(parsed.structuredData) ? parsed.structuredData : null;
    const isMeaningful = typeof parsed.isMeaningful === 'boolean' ? parsed.isMeaningful : null;
    const aiError = typeof parsed.aiError === 'string' && parsed.aiError.trim() ? parsed.aiError : null;
    const draft: CheckInDraft = {
      date,
      walletAddress,
      step: normalizeDraftStep(parsed.step, isMeaningful, structuredData),
      isMeaningful,
      content: parsed.content,
      structuredData,
      aiError,
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now(),
    };

    return hasDraftContent(draft) ? draft : null;
  } catch {
    return null;
  }
}

export function loadCheckInDraft(
  storage: Pick<DraftStorage, 'getItem'>,
  walletAddress: string,
  date: string
): CheckInDraft | null {
  return parseCheckInDraft(storage.getItem(checkInDraftKey(walletAddress, date)), walletAddress, date);
}

export function saveCheckInDraft(storage: DraftStorage, draft: CheckInDraft): void {
  const key = checkInDraftKey(draft.walletAddress, draft.date);
  if (!hasDraftContent(draft)) {
    storage.removeItem(key);
    return;
  }
  storage.setItem(key, JSON.stringify(draft));
}

export function clearCheckInDraft(
  storage: Pick<DraftStorage, 'removeItem'>,
  walletAddress: string,
  date: string
): void {
  storage.removeItem(checkInDraftKey(walletAddress, date));
}
