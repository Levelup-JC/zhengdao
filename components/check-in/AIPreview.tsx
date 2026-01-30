'use client';

/**
 * AI整理预览组件
 * 并排展示用户原文和AI整理后的版本
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StructuredReflectionData } from '@/lib/db';

interface AIPreviewProps {
  /** 用户原文 */
  originalText: string;
  /** AI整理数据 */
  structuredData: StructuredReflectionData;
  /** 确认回调 */
  onConfirm: () => void;
  /** 重新编辑回调 */
  onEdit: () => void;
  /** 保存中状态 */
  isSaving?: boolean;
}

export function AIPreview({
  originalText,
  structuredData,
  onConfirm,
  onEdit,
  isSaving = false,
}: AIPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h2
          className="text-3xl font-bold text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          AI整理结果
        </h2>
        <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
          请确认AI提取的关键信息
        </p>
      </div>

      {/* 并排展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 左侧：用户原文 */}
        <div className="space-y-3">
          <h3
            className="text-lg font-bold text-ink flex items-center gap-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span>你的原文</span>
          </h3>
          <div className="p-4 bg-paper border-2 border-ink/20 min-h-[200px]">
            <p className="text-ink/80 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              {originalText}
            </p>
          </div>
        </div>

        {/* 右侧：AI整理 */}
        <div className="space-y-3">
          <h3
            className="text-lg font-bold text-ink flex items-center gap-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span>AI整理</span>
          </h3>
          <div className="p-4 bg-paper border-2 border-seal min-h-[200px] space-y-4">
            {/* 收获 */}
            {structuredData.gains.length > 0 && (
              <div>
                <div className="text-sm font-bold text-ink/60 mb-2">收获</div>
                <ul className="space-y-1">
                  {structuredData.gains.map((item, index) => (
                    <li key={index} className="text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 损失 */}
            {structuredData.losses.length > 0 && (
              <div>
                <div className="text-sm font-bold text-ink/60 mb-2">损失</div>
                <ul className="space-y-1">
                  {structuredData.losses.map((item, index) => (
                    <li key={index} className="text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 想法 */}
            {structuredData.ideas.length > 0 && (
              <div>
                <div className="text-sm font-bold text-ink/60 mb-2">想法</div>
                <ul className="space-y-1">
                  {structuredData.ideas.map((item, index) => (
                    <li key={index} className="text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 情绪 */}
            {structuredData.emotion && (
              <div>
                <div className="text-sm font-bold text-ink/60 mb-2">情绪</div>
                <div className="text-sm text-ink">{structuredData.emotion}</div>
              </div>
            )}

            {/* 关键词 */}
            {structuredData.keywords.length > 0 && (
              <div>
                <div className="text-sm font-bold text-ink/60 mb-2">关键词</div>
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
        </div>
      </div>

      {/* 提示文字 */}
      <p className="text-xs text-center text-ink/40">
        如果AI整理有误，你可以点击"返回编辑"修改原文
      </p>

      {/* 按钮组 */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            console.log('[AIPreview] 返回编辑按钮被点击');
            onEdit();
          }}
          disabled={isSaving}
          className="flex-1 py-3 border-2 border-ink text-ink font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink/5 transition-colors"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          返回编辑
        </button>
        <button
          onClick={() => {
            console.log('[AIPreview] 确认保存按钮被点击, isSaving:', isSaving);
            if (!isSaving) {
              onConfirm();
            }
          }}
          disabled={isSaving}
          className="flex-1 py-3 bg-seal text-paper font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-seal/90 transition-colors"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          {isSaving ? '保存中...' : '确认保存'}
        </button>
      </div>

      {/* 导航按钮组 */}
      <div className="flex justify-center gap-2 pt-4 border-t-2 border-ink/10 flex-wrap">
        <a
          href="/check-in"
          className="px-3 py-1.5 text-xs border border-ink/30 text-ink/70 hover:border-ink hover:text-ink transition-colors"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          返回首页
        </a>
        <a
          href="/profile"
          className="px-3 py-1.5 text-xs border border-ink/30 text-ink/70 hover:border-ink hover:text-ink transition-colors"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          个人主页
        </a>
        <a
          href="/review"
          className="px-3 py-1.5 text-xs border border-ink/30 text-ink/70 hover:border-ink hover:text-ink transition-colors"
          style={{
            borderRadius: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          查看复盘
        </a>
      </div>
    </motion.div>
  );
}
