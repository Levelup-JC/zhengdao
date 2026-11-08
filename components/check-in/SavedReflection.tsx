'use client';

/**
 * 已保存的每日三问内容。
 * 刷新后从 IndexedDB 读出并展示，避免只看到“已打卡”却看不到原文。
 */

import type { Reflection } from '@/lib/db';

interface SavedReflectionProps {
  reflection: Reflection;
}

function hasSummary(reflection: Reflection): boolean {
  const data = reflection.structuredData;
  if (!data) return false;
  return (
    data.gains.length > 0 ||
    data.losses.length > 0 ||
    data.ideas.length > 0 ||
    Boolean(data.emotion) ||
    data.keywords.length > 0
  );
}

export function SavedReflection({ reflection }: SavedReflectionProps) {
  const summaryReady = hasSummary(reflection);

  return (
    <div className="space-y-4 border-2 border-ink/20 bg-paper p-6 text-left">
      <div>
        <div className="text-sm font-bold text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
          今天的判断
        </div>
        <p className="text-ink" style={{ fontFamily: 'Georgia, serif' }}>
          {reflection.isMeaningful ? '有意义的一天' : '需要改进的一天'}
        </p>
      </div>

      <div>
        <div className="text-sm font-bold text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
          已保存的复盘
        </div>
        <p className="whitespace-pre-wrap text-ink leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
          {reflection.rawContent}
        </p>
      </div>

      {summaryReady ? (
        <div className="space-y-3">
          <div className="text-sm font-bold text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
            AI 整理
          </div>
          {reflection.structuredData.gains.length > 0 && (
            <div>
              <div className="text-sm font-bold text-ink/60">收获</div>
              <ul className="list-disc pl-5 text-ink">
                {reflection.structuredData.gains.map((item, index) => (
                  <li key={`gain-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {reflection.structuredData.losses.length > 0 && (
            <div>
              <div className="text-sm font-bold text-ink/60">损失</div>
              <ul className="list-disc pl-5 text-ink">
                {reflection.structuredData.losses.map((item, index) => (
                  <li key={`loss-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {reflection.structuredData.ideas.length > 0 && (
            <div>
              <div className="text-sm font-bold text-ink/60">想法</div>
              <ul className="list-disc pl-5 text-ink">
                {reflection.structuredData.ideas.map((item, index) => (
                  <li key={`idea-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {reflection.structuredData.emotion && (
            <p className="text-ink">情绪：{reflection.structuredData.emotion}</p>
          )}
          {reflection.structuredData.keywords.length > 0 && (
            <p className="text-ink">关键词：{reflection.structuredData.keywords.join('、')}</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-ink/70" style={{ fontFamily: 'Georgia, serif' }}>
          这次没有 AI 整理结果。上面是已保存的原文。
        </p>
      )}
    </div>
  );
}
