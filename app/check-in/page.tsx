'use client';

/**
 * 每日打卡页面
 * 优化后的打卡流程
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { DailyQuestion } from '@/components/check-in/DailyQuestion';
import { ReflectionInput } from '@/components/check-in/ReflectionInput';
import { ProcessingStep } from '@/components/check-in/ProcessingStep';
import { AIPreview } from '@/components/check-in/AIPreview';
import { PhotoUpload } from '@/components/check-in/PhotoUpload';
import { CheckInService } from '@/lib/check-in-service';
import type { StructuredReflectionData } from '@/lib/db';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { CompetitionInfo } from '@/components/CompetitionInfo';

/** 流程步骤类型 */
type CheckInStep = 'question' | 'input' | 'processing' | 'preview' | 'photo';

export default function CheckInPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { isSkipMode, demoAddress } = useSkipMode();

  // 当前步骤
  const [step, setStep] = useState<CheckInStep>('question');

  // 数据
  const [isMeaningful, setIsMeaningful] = useState<boolean | null>(null);
  const [content, setContent] = useState('');
  const [structuredData, setStructuredData] = useState<StructuredReflectionData | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  // 状态
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  /** 检查今日是否已打卡 */
  useEffect(() => {
    const checkTodayStatus = async () => {
      // 体验模式：不检查打卡状态，允许无限打卡
      if (isSkipMode) {
        setHasCheckedIn(false);
        return;
      }

      const effectiveAddress = address || demoAddress;
      if (!effectiveAddress) return;

      try {
        const todayCheckIn = await CheckInService.getTodayCheckIn(effectiveAddress);
        if (todayCheckIn) {
          setHasCheckedIn(true);
          toast.success('今日已打卡');
        }
      } catch (error) {
        console.error('[CheckInPage] 检查打卡状态失败:', error);
      }
    };

    checkTodayStatus();
  }, [address, demoAddress, isSkipMode]);

  /** 处理问题回答 */
  const handleQuestionAnswer = (answer: boolean) => {
    setIsMeaningful(answer);
    setStep('input');
  };

  /** 处理内容提交 */
  const handleContentSubmit = async (inputContent: string) => {
    setContent(inputContent);
    setStep('processing');
    setIsProcessing(true);

    try {
      console.log('[CheckInPage] 开始AI处理，内容长度:', inputContent.length);

      // 调用AI API处理
      const response = await fetch('/api/reflect/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputContent }),
      });

      console.log('[CheckInPage] API响应状态:', response.status);

      const result = await response.json();

      console.log('[CheckInPage] API返回结果:', result);

      if (!result.success) {
        console.error('[CheckInPage] API返回失败:', result.error);
        throw new Error(result.error || 'AI处理失败');
      }

      console.log('[CheckInPage] AI处理成功，数据:', result.data);
      setStructuredData(result.data);
      setStep('preview');
      toast.success('AI整理完成！');
    } catch (error) {
      console.error('[CheckInPage] AI处理失败:', error);

      // 使用内置的Mock数据作为fallback
      console.log('[CheckInPage] 使用Mock数据作为fallback');
      const mockData = {
        gains: ['完成了重要任务', '学习了新知识', '保持了积极心态'],
        losses: ['花费了太多时间', '需要提高效率'],
        ideas: ['明天继续努力', '改进时间管理'],
        emotion: ['积极', '平静', '焦虑', '疲惫'][Math.floor(Math.random() * 4)],
        keywords: ['成长', '进步', '复盘'],
      };

      setStructuredData(mockData);
      setStep('preview');
      toast.success('使用演示数据完成整理');
    } finally {
      setIsProcessing(false);
    }
  };

  /** 处理预览确认 */
  const handlePreviewConfirm = async () => {
    const effectiveAddress = address || demoAddress;
    if (!effectiveAddress) {
      toast.error('请先连接钱包或使用体验模式');
      return;
    }

    if (isMeaningful === null) {
      toast.error('缺少必要信息，请重新开始');
      router.push('/check-in');
      return;
    }

    setIsSaving(true);

    try {
      console.log('[CheckInPage] 开始保存打卡数据:', {
        address: effectiveAddress,
        isMeaningful,
        contentLength: content.length,
        hasStructuredData: !!structuredData,
        photosCount: photos.length,
        isSkipMode,
      });

      // 保存打卡数据（体验模式下跳过每日打卡检查）
      await CheckInService.saveCheckIn(effectiveAddress, {
        meaningful: isMeaningful,
        originalText: content,
        aiSummary: structuredData || {
          gains: [],
          losses: [],
          ideas: [],
          emotion: '',
          keywords: [],
        },
        photos,
      }, isSkipMode ? { skipDailyCheck: true } : undefined);

      console.log('[CheckInPage] 保存成功');

      // 打卡成功后设置状态，显示 Coming Soon 提示
      toast.success('打卡成功！');
      setStep('photo'); // 使用 photo 步骤来显示 Coming Soon 内容

    } catch (error) {
      console.error('[CheckInPage] 保存失败:', error);
      const errorMessage = error instanceof Error ? error.message : '保存失败，请重试';
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  /** 处理返回编辑 */
  const handleEdit = () => {
    // 保持原有的 content 和 structuredData，回到编辑页面时会显示AI整理结果
    setStep('input');
  };

  /** 处理照片完成 */
  const handlePhotoComplete = () => {
    toast.success('打卡完成！');
    setTimeout(() => {
      router.push('/profile');
    }, 1500);
  };

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
          {/* 顶部成功提示 */}
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
              明天再来吧，修行贵在坚持
            </p>
          </div>

          {/* 功能导航按钮 */}
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
        {/* 头部 */}
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

        {/* 步骤内容 */}
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
              onSubmit={handleContentSubmit}
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

              {/* 照片分享功能 Coming Soon */}
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

              {/* 导航选项 */}
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

        {/* 参赛信息模块 */}
        <CompetitionInfo />
      </div>
    </div>
  );
}
