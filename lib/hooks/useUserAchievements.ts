'use client';

/**
 * useUserAchievements Hook
 * 获取用户的成就数据（BNB Chain 和 Solana）
 */

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ReflectionService } from '@/lib/storage';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { demoAchievements } from '@/lib/demo-data';

/** 成就数据接口 */
export interface AchievementData {
  /** 链名称 */
  chain: 'bnb' | 'solana';
  /** 当前等级 (1-6) */
  currentLevel: number;
  /** 总打卡天数 */
  totalCheckInDays: number;
  /** 各等级SBT是否已领取 */
  sbtClaimed: boolean[];
}

/** 返回值接口 */
export interface UseUserAchievementsReturn {
  /** 成就数据数组 */
  achievements: AchievementData[] | null;
  /** 是否正在加载 */
  loading: boolean;
}

/** SBT等级配置 */
export const LEVEL_CONFIG = [
  { level: 1, days: 7, title: '十一路奋斗者' },
  { level: 2, days: 30, title: '笃行者' },
  { level: 3, days: 100, title: '持久力王者' },
  { level: 4, days: 365, title: '百里挑一' },
  { level: 5, days: 1000, title: '千里挑一' },
  { level: 6, days: 3650, title: '证道成圣' },
];

/**
 * 根据打卡天数计算当前等级
 */
function calculateLevel(days: number): number {
  for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
    if (days >= LEVEL_CONFIG[i].days) {
      return LEVEL_CONFIG[i].level;
    }
  }
  return 1;
}

/**
 * Hook: 获取用户成就数据
 */
export function useUserAchievements(): UseUserAchievementsReturn {
  const { address } = useAccount();
  const { isSkipMode } = useSkipMode();
  const [achievements, setAchievements] = useState<AchievementData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      // 体验模式：直接返回虚拟成就数据
      if (isSkipMode) {
        console.log('[useUserAchievements] 体验模式，使用虚拟成就数据');
        setAchievements(demoAchievements);
        setLoading(false);
        return;
      }

      // 真实用户：从数据库加载
      if (!address) {
        setAchievements(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // 获取所有打卡记录
        const reflections = await ReflectionService.getAllReflections(address);
        const totalDays = reflections.length;

        // 计算当前等级
        const currentLevel = calculateLevel(totalDays);

        // 创建成就数据（目前只有BNB链，Solana暂时返回null）
        const achievementData: AchievementData[] = [
          {
            chain: 'bnb',
            currentLevel,
            totalCheckInDays: totalDays,
            sbtClaimed: new Array(7).fill(false), // TODO: 从数据库读取实际领取状态
          },
          // Solana暂时不显示，等TASK-07完成后再添加
          // {
          //   chain: 'solana',
          //   currentLevel,
          //   totalCheckInDays: totalDays,
          //   sbtClaimed: new Array(7).fill(false),
          // },
        ];

        setAchievements(achievementData);
      } catch (error) {
        console.error('[useUserAchievements] 加载失败:', error);
        setAchievements(null);
      } finally {
        setLoading(false);
      }
    }

    loadAchievements();
  }, [address, isSkipMode]);

  return { achievements, loading };
}
