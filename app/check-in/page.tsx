'use client';

/**
 * 每日打卡页面
 * 优化后的打卡流程
 */

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { DailyQuestion } from '@/components/check-in/DailyQuestion';
import { ReflectionInput } from '@/components/check-in/ReflectionInput';
import { ProcessingStep } from '@/components/check-in/ProcessingStep';
import { AIPreview } from '@/components/check-in/AIPreview';
import { SavedReflection } from '@/components/check-in/SavedReflection';
import { CheckInService } from '@/lib/check-in-service';
import {
  clearCheckInDraft,
  loadCheckInDraft,
  saveCheckInDraft,
  type CheckInDraftStep,
} from '@/lib/check-in-draft';
import type { Reflection, StructuredReflectionData } from '@/lib/db';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { getTodayDateUTC8 } from '@/lib/utils/date';
import { CompetitionInfo } from '@/components/CompetitionInfo';

/** 流程步骤类型 */
type CheckInStep = 'question' | 'input' | 'processing' | 'preview' | 'photo';

const EMPTY_SUMMARY: StructuredReflectionData = {
  gains: [],
  losses: [],
  ideas: [],
  emotion: '',
  keywords: [],
};

export default function CheckInPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { isSkipMode, isSkipModeReady, demoAddress } = useSkipMode();

  // 当前步骤
  const [step, setStep] = useState<CheckInStep>('question');

  // 数据
  const [isMeaningful, setIsMeaningful] = useState<boolean | null>(null);
  const [content, setContent] = useState('');
  const [structuredData, setStructuredData] = useState<StructuredReflectionData | null>(null);
  const [photos] = useState<string[]>([]);
  const [aiError, setAiError] = useState<string | null>(null);
  const [savedReflection, setSavedReflection] = useState<Reflection | null>(null);

  // 状态
  const [isSaving, setIsSaving] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const restoredRef = useRef(false);

  const effectiveAddress = isSkipMode ? demoAddress : address;

  /** 恢复今日已保存记录，或恢复未提交草稿 */
  useEffect(() => {
    if (!isSkipModeReady) return;

    let cancelled = false;

    if (!isSkipMode && !isConnected) {
      restoredRef.current = true;
      setIsRestoring(false);
      return;
    }

    if (!effectiveAddress) return;

    restoredRef.current = false;
    setIsRestoring(true);

    const restore = async () => {
      const today = getTodayDateUTC8();

      try {
        const todayCheckIn = await CheckInService.getLatestTodayCheckIn(effectiveAddress);
        if (cancelled) return;

        if (todayCheckIn && !isSkipMode) {
          setSavedReflection(todayCheckIn);
          setHasCheckedIn(true);
          clearCheckInDraft(window.localStorage, effectiveAddress, today);
          return;
        }

        if (todayCheckIn) {
          setSavedReflection(todayCheckIn);
        }

        const draft = loadCheckInDraft(window.localStorage, effectiveAddress, today);
        if (cancelled) return;

        if (draft) {
          setIsMeaningful(draft.isMeaningful);
          setContent(draft.content);
          setStructuredData(draft.structuredData);
          setAiError(draft.aiError);
          setStep(draft.step);
          toast.success('已恢复上次填写的内容');
        }
      } catch (error) {
        console.error('[CheckInPage] 恢复打卡内容失败:', error);
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : '恢复已填内容失败');
        }
      } finally {
        if (!cancelled) {
          restoredRef.current = true;
          setIsRestoring(false);
        }
      }
    };

    restore();

    return () => {
      cancelled = true;
    };
  }, [effectiveAddress, isConnected, isSkipMode, isSkipModeReady]);

  /** 填写过程中持续保存草稿，刷新后还能回来 */
  useEffect(() => {
    if (!restoredRef.current || isRestoring || !effectiveAddress || hasCheckedIn) return;

    const draftStep: CheckInDraftStep =
      step === 'preview' ? 'preview' : step === 'question' ? 'question' : 'input';

    saveCheckInDraft(window.localStorage, {
      date: getTodayDateUTC8(),
      walletAddress: effectiveAddress,
      step: draftStep,
      isMeaningful,
      content,
      structuredData,
      aiError,
      updatedAt: Date.now(),
    });
  }, [aiError, content, effectiveAddress, hasCheckedIn, isMeaningful, isRestoring, step, structuredData]);

  /** 处理问题回答 */
  const handleQuestionAnswer = (answer: boolean) => {
    setIsMeaningful(answer);
    setStep('input');
  };

  /** 处理内容提交 */
  const handleContentSubmit = async (inputContent: string) => {
    setContent(inputContent);
    setAiError(null);
    setStep('processing');

    try {
      console.log('[CheckInPage] 开始AI处理，内容长度:', inputContent.length);

      const response = await fetch('/api/reflect/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputContent }),
      });

      console.log('[CheckInPage] API响应状态:', response.status);

      let result: { success?: boolean; data?: StructuredReflectionData; error?: string } | null = null;
      try {
        result = await response.json();
      } catch {
        throw new Error(`AI 服务返回了无法解析的结果（HTTP ${response.status}）。`);
      }

      console.log('[CheckInPage] API返回结果:', result);

      if (!response.ok || !result?.success || !result.data) {
        throw new Error(result?.error || `AI 处理失败（HTTP ${response.status}）。`);
      }

      console.log('[CheckInPage] AI处理成功，数据:', result.data);
      setStructuredData(result.data);
      setStep('preview');
      toast.success('AI整理完成！');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'AI 处理失败，请重试';
      console.error('[CheckInPage] AI处理失败:', error);
      setStructuredData(null);
      setAiError(message);
      setStep('input');
      toast.error(message);
    }
  };

  const persistCheckIn = async (originalText: string, summary: StructuredReflectionData) => {
    if (!effectiveAddress) {
      toast.error('请先连接钱包或使用体验模式');
      return;
    }

    if (isMeaningful === null) {
      toast.error('缺少必要信息，请重新开始');
      router.push('/check-in');
      return;
    }

    setContent(originalText);
    setIsSaving(true);

    try {
      console.log('[CheckInPage] 开始保存打卡数据:', {
        address: effectiveAddress,
        isMeaningful,
        contentLength: originalText.length,
        hasStructuredData: summary.gains.length > 0 || summary.losses.length > 0,
        photosCount: photos.length,
        isSkipMode,
      });

      await CheckInService.saveCheckIn(effectiveAddress, {
        meaningful: isMeaningful,
        originalText,
        aiSummary: summary,
        photos,
      }, isSkipMode ? { skipDailyCheck: true } : undefined);

      clearCheckInDraft(window.localStorage, effectiveAddress, getTodayDateUTC8());
      console.log('[CheckInPage] 保存成功');
      toast.success(aiError ? '已保存原文。这次没有 AI 整理结果。' : '打卡成功！');
      router.push('/check-in/success');
    } catch (error) {
      console.error('[CheckInPage] 保存失败:', error);
      const errorMessage = error instanceof Error ? error.message : '保存失败，请重试';
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  /** 处理预览确认 */
  const handlePreviewConfirm = async () => {
    await persistCheckIn(content, structuredData || EMPTY_SUMMARY);
  };

  /** AI 失败时仍保存用户原文，不把演示数据当成整理结果 */
  const handleSaveWithoutAI = async (originalText: string) => {
    await persistCheckIn(originalText, EMPTY_SUMMARY);
  };

  /** 处理返回编辑 */
  const handleEdit = () => {
    setStep('input');
  };

  if (!isSkipModeReady || (isRestoring && (isConnected || isSkipMode || Boolean(effectiveAddress)))) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] flex items-center justify-center p-6">
        <p className="text-ink/70" style={{ fontFamily: 'Georgia, serif' }}>
          正在恢复打卡内容...
        </p>
      </div>
    );
  }

  /** 如果未连接钱包且不在体验模式 */
  if (!isConnected && !isSkipMode) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1
            className="text-3xl font-bold text-ink"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            请先连接钱包或返回首页选择体验模式
          </h1>
          <button
            onClick={() => router.push('/profile')}
            className="px-6 py-3 bg-ink text-paper font-bold"
            style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }

  /** 如果今日已打卡 */
  if (hasCheckedIn) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="text-6xl text-ink"
            >
              ✓
            </motion.div>
            <h1
              className="text-3xl font-bold text-ink"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              今日已打卡
            </h1>
            <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
              今天填写的内容已经保存，刷新后仍在这里
            </p>
          </div>

          {savedReflection && <SavedReflection reflection={savedReflection} />}

          <div className="space-y-3">
            <button
              onClick={() => router.push('/profile')}
              className="w-full px-6 py-4 bg-ink text-paper font-bold text-lg hover:bg-ink/90 transition-colors"
              style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
            >
              个人主页
            </button>

            <button
              onClick={() => router.push('/review')}
              className="w-full px-6 py-4 bg-white text-ink font-bold text-lg border-2 border-ink hover:bg-ink/5 transition-colors"
              style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
            >
              复盘数据
            </button>

            <button
              onClick={() => router.push('/coming-soon')}
              className="w-full px-6 py-4 bg-white text-ink font-bold text-lg border-2 border-ink hover:bg-ink/5 transition-colors"
              style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
            >
              即将推出
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF2] p-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold text-ink mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            每日打卡
          </h1>
          <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
            吾日三省吾身
          </p>
        </div>

        {isSkipMode && savedReflection && (
          <div className="mb-8 space-y-3">
            <p className="text-center text-ink/70" style={{ fontFamily: 'Georgia, serif' }}>
              今天已经保存过的内容。体验模式可以继续再记一笔。
            </p>
            <SavedReflection reflection={savedReflection} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'question' && (
            <DailyQuestion key="question" onAnswer={handleQuestionAnswer} />
          )}

          {step === 'input' && (
            <ReflectionInput
              key="input"
              isMeaningful={isMeaningful!}
              initialValue={content}
              structuredData={structuredData}
              aiError={aiError}
              isSaving={isSaving}
              onSubmit={handleContentSubmit}
              onSaveWithoutAI={handleSaveWithoutAI}
              onDraftChange={setContent}
              onCancel={() => router.push('/profile')}
            />
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20"
            >
              <ProcessingStep />
            </motion.div>
          )}

          {step === 'preview' && structuredData && (
            <AIPreview
              key="preview"
              originalText={content}
              structuredData={structuredData}
              onConfirm={handlePreviewConfirm}
              onEdit={handleEdit}
              isSaving={isSaving}
            />
          )}

          {step === 'photo' && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="text-6xl text-ink"
                >
                  ✓
                </motion.div>
                <h2
                  className="text-3xl font-bold text-ink"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  打卡成功！
                </h2>
                <p className="text-ink/60">你的复盘已保存</p>
              </div>

              <div className="border-2 border-ink/20 bg-paper p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-6xl">📸</div>
                  <h3
                    className="text-2xl font-bold text-ink"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    照片分享功能
                  </h3>
                  <p className="text-ink/70" style={{ fontFamily: 'Georgia, serif' }}>
                    记录生活中的精彩瞬间，与朋友们分享你的成长历程
                  </p>
                  <div
                    className="inline-block px-6 py-3 bg-ink/10 text-ink font-bold border-2 border-ink/30"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Coming Soon
                  </div>
                  <p className="text-sm text-ink/50 mt-4" style={{ fontFamily: 'Georgia, serif' }}>
                    敬请期待更多精彩功能
                  </p>
                </motion.div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="w-full px-6 py-4 bg-ink text-paper font-bold text-lg hover:bg-ink/90 transition-colors"
                  style={{
                    borderRadius: 0,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  个人主页
                </button>

                <button
                  onClick={() => router.push('/review')}
                  className="w-full px-6 py-4 bg-white text-ink font-bold text-lg border-2 border-ink hover:bg-ink/5 transition-colors"
                  style={{
                    borderRadius: 0,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  复盘数据
                </button>

                <button
                  onClick={() => router.push('/coming-soon')}
                  className="w-full px-6 py-4 bg-white text-ink font-bold text-lg border-2 border-ink hover:bg-ink/5 transition-colors"
                  style={{
                    borderRadius: 0,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  查看即将推出的功能
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CompetitionInfo />
      </div>
    </div>
  );
}
