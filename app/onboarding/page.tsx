'use client';

/**
 * 人生规划问卷页面
 * 用户首次进入时设置五年人生目标
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { WelcomeStep } from '@/components/onboarding/WelcomeStep';
import { WealthGoalStep } from '@/components/onboarding/WealthGoalStep';
import { HealthGoalStep } from '@/components/onboarding/HealthGoalStep';
import { FamilyGoalStep } from '@/components/onboarding/FamilyGoalStep';
import { OtherGoalStep } from '@/components/onboarding/OtherGoalStep';
import { ConfirmStep } from '@/components/onboarding/ConfirmStep';
import {
  OnboardingService,
  OnboardingStep,
  defaultOnboardingData,
} from '@/lib/onboarding-service';
import type { WealthGoal, HealthGoal, FamilyGoal, OtherGoal } from '@/lib/db';

export default function OnboardingPage() {
  const router = useRouter();
  const { address } = useAccount();

  // 当前步骤
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  // 问卷数据
  const [data, setData] = useState(defaultOnboardingData);

  // 保存状态
  const [isSaving, setIsSaving] = useState(false);

  /** 更新财富目标 */
  const updateWealthGoals = (goals: WealthGoal) => {
    setData({ ...data, wealthGoals: goals });
  };

  /** 更新健康目标 */
  const updateHealthGoals = (goals: HealthGoal) => {
    setData({ ...data, healthGoals: goals });
  };

  /** 更新家庭目标 */
  const updateFamilyGoals = (goals: FamilyGoal) => {
    setData({ ...data, familyGoals: goals });
  };

  /** 更新其他目标 */
  const updateOtherGoals = (goals: OtherGoal) => {
    setData({ ...data, otherGoals: goals });
  };

  /** 下一步 */
  const handleNext = () => {
    const steps: OnboardingStep[] = [
      'welcome',
      'wealth',
      'health',
      'family',
      'other',
      'confirm',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  /** 上一步 */
  const handlePrev = () => {
    const steps: OnboardingStep[] = [
      'welcome',
      'wealth',
      'health',
      'family',
      'other',
      'confirm',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  /** 确认提交 */
  const handleConfirm = async () => {
    // 验证数据完整性
    const isValid = OnboardingService.validateOnboardingData(data);
    if (!isValid) {
      toast.error('请完成所有目标选择');
      return;
    }

    if (!address) {
      toast.error('请先连接钱包');
      return;
    }

    setIsSaving(true);
    try {
      // 保存到数据库
      await OnboardingService.saveOnboardingData(address, data);

      toast.success('目标设定成功！开始你的证道之旅吧');

      // 延迟跳转到打卡页
      setTimeout(() => {
        router.push('/check-in');
      }, 1500);
    } catch (error) {
      console.error('[Onboarding] 保存失败:', error);
      toast.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  /** 重新开始 */
  const handleRestart = () => {
    // 重置数据
    setData(defaultOnboardingData);
    // 返回第一步
    setCurrentStep('welcome');
    toast.success('已重新开始，请重新选择目标');
  };

  return (
    <div className="min-h-screen bg-[#FFFEF2] p-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* 步骤指示器 */}
        <StepIndicator currentStep={currentStep} />

        {/* 步骤内容 */}
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <WelcomeStep key="welcome" onNext={handleNext} />
          )}

          {currentStep === 'wealth' && (
            <WealthGoalStep
              key="wealth"
              goals={data.wealthGoals}
              onChange={updateWealthGoals}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}

          {currentStep === 'health' && (
            <HealthGoalStep
              key="health"
              goals={data.healthGoals}
              onChange={updateHealthGoals}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}

          {currentStep === 'family' && (
            <FamilyGoalStep
              key="family"
              goals={data.familyGoals}
              onChange={updateFamilyGoals}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}

          {currentStep === 'other' && (
            <OtherGoalStep
              key="other"
              goals={data.otherGoals}
              onChange={updateOtherGoals}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}

          {currentStep === 'confirm' && (
            <ConfirmStep
              key="confirm"
              wealthGoals={data.wealthGoals}
              healthGoals={data.healthGoals}
              familyGoals={data.familyGoals}
              otherGoals={data.otherGoals}
              onPrev={handlePrev}
              onConfirm={handleConfirm}
              onRestart={handleRestart}
              isSaving={isSaving}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
