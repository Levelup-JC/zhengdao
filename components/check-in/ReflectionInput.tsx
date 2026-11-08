'use client';

/**
 * 文本复盘输入组件
 * 用户输入今日复盘内容
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StructuredReflectionData } from '@/lib/db';

interface ReflectionInputProps {
  /** 是否有意义的一天 */
  isMeaningful: boolean;
  /** 初始值 */
  initialValue?: string;
  /** AI整理的数据（如果有） */
  structuredData?: StructuredReflectionData | null;
  /** AI 失败时的可读原因 */
  aiError?: string | null;
  /** 提交回调 */
  onSubmit: (content: string) => void;
  /** AI 失败后仍保存原文 */
  onSaveWithoutAI?: (content: string) => void;
  /** 输入时同步草稿，刷新前不丢字 */
  onDraftChange?: (content: string) => void;
  /** 保存中 */
  isSaving?: boolean;
  /** 取消回调 */
  onCancel?: () => void;
}

export function ReflectionInput({
  isMeaningful,
  initialValue = '',
  structuredData = null,
  aiError = null,
  onSubmit,
  onSaveWithoutAI,
  isSaving = false,
  onDraftChange,
  onCancel,
}: ReflectionInputProps) {
  const [content, setContent] = useState(initialValue);

  /** 提交处理 */
  const handleSubmit = () => {
    const trimmedContent = content.trim();

    if (trimmedContent.length === 0) {
      return;
    }

    // 检查字数是否足够
    if (trimmedContent.length < 10) {
      alert('反思内容太短，请至少输入10个字');
      return;
    }

    onSubmit(trimmedContent);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h2
          className="text-3xl font-bold text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          请复盘你今天的一天
        </h2>
        <p
          className={`text-lg ${isMeaningful ? 'text-seal' : 'text-ink/60'}`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {isMeaningful ? '有意义的一天' : '需要改进的一天'}
        </p>
      </div>

      {/* 输入框 */}
      <div className="space-y-3">
        <label
          className="block text-sm font-bold text-ink/60"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          今日复盘内容
        </label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            onDraftChange?.(e.target.value);
          }}
          placeholder="记录今天的收获、遗憾、想法..."
          className="w-full h-64 p-4 border-2 border-ink/30 bg-paper text-ink leading-relaxed resize-none focus:border-seal focus:outline-none"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        />
        <div className="flex justify-between text-xs">
          <span className={content.trim().length < 10 ? 'text-red-500' : 'text-ink/40'}>
            {content.trim().length < 10 ? `还需 ${10 - content.trim().length} 字` : '字数符合要求'}
          </span>
          <span className={content.trim().length < 10 ? 'text-red-500 font-bold' : 'text-ink/40'}>
            {content.trim().length} / 10 字
          </span>
        </div>
      </div>

      {aiError && (
        <div className="border-2 border-red-700 bg-red-50 p-4" role="alert">
          <p className="text-sm font-bold text-red-800" style={{ fontFamily: 'Georgia, serif' }}>
            AI 整理失败
          </p>
          <p className="mt-2 text-sm text-red-900 whitespace-pre-wrap" style={{ fontFamily: 'Georgia, serif' }}>
            {aiError}
          </p>
        </div>
      )}

      {/* 引导提示 */}
      {content.length === 0 && !structuredData && (
        <div className="p-4 bg-ink/5 border border-ink/10">
          <p className="text-sm text-ink/60 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            复盘建议（至少10个字）：
          </p>
          <ul className="text-sm text-ink/60 space-y-1">
            <li>• 今天学到了什么？</li>
            <li>• 哪些事情做得好？哪些需要改进？</li>
            <li>• 有什么新的想法或灵感？</li>
            <li>• 情绪如何？为什么？</li>
          </ul>
        </div>
      )}

      {/* AI整理结果预览 */}
      {structuredData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-seal/5 border-2 border-seal/30"
        >
          <h3
            className="text-sm font-bold text-ink mb-3 flex items-center gap-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span>AI整理结果预览</span>
          </h3>
          <div className="space-y-3 text-sm">
            {/* 收获 */}
            {structuredData.gains.length > 0 && (
              <div>
                <div className="font-bold text-ink/60 mb-1">收获</div>
                <ul className="space-y-1">
                  {structuredData.gains.map((item, index) => (
                    <li key={index} className="text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 损失 */}
            {structuredData.losses.length > 0 && (
              <div>
                <div className="font-bold text-ink/60 mb-1">损失</div>
                <ul className="space-y-1">
                  {structuredData.losses.map((item, index) => (
                    <li key={index} className="text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 想法 */}
            {structuredData.ideas.length > 0 && (
              <div>
                <div className="font-bold text-ink/60 mb-1">想法</div>
                <ul className="space-y-1">
                  {structuredData.ideas.map((item, index) => (
                    <li key={index} className="text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 情绪 */}
            {structuredData.emotion && (
              <div>
                <div className="font-bold text-ink/60 mb-1">情绪</div>
                <div className="text-ink">{structuredData.emotion}</div>
              </div>
            )}

            {/* 关键词 */}
            {structuredData.keywords.length > 0 && (
              <div>
                <div className="font-bold text-ink/60 mb-1">关键词</div>
                <div className="flex flex-wrap gap-2">
                  {structuredData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-seal/10 border border-seal/30 text-xs font-bold text-ink"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* 按钮组 */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-3 border-2 border-ink text-ink font-bold"
            style={{
              borderRadius: 0,
              fontFamily: 'Georgia, serif',
            }}
          >
            取消
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={content.trim().length < 10 || isSaving}
          className="flex-1 py-3 bg-seal text-paper font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          {content.trim().length < 10 ? `还需${10 - content.trim().length}字` : '继续下一步'}
        </button>
      </div>
      {aiError && onSaveWithoutAI && (
        <button
          onClick={() => onSaveWithoutAI(content.trim())}
          disabled={content.trim().length < 10 || isSaving}
          className="w-full py-3 border-2 border-ink text-ink font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          {isSaving ? '保存中...' : '跳过 AI，保存原文'}
        </button>
      )}
    </motion.div>
  );
}
