'use client';

/**
 * SBT成就展示组件
 * 展示所有6个等级，可领取的显示领取按钮
 */

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUserAchievements } from '@/lib/hooks/useUserAchievements';
import { ReflectionService } from '@/lib/storage';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { demoReflections } from '@/lib/demo-data';
import {
  ACHIEVEMENT_LEVELS,
  getLevelIcon,
  getLevelSBTImage,
  getUnlockedLevels,
} from '@/lib/achievement-system';

interface SBTShowcaseProps {
  /** 点击回调 */
  onClaim?: () => void;
}

export function SBTShowcase({ onClaim }: SBTShowcaseProps) {
  const { address } = useAccount();
  const router = useRouter();
  const { isSkipMode } = useSkipMode();
  const { achievements, loading } = useUserAchievements();
  const [chain, setChain] = useState<'bnb' | 'solana'>('bnb');
  const [totalDays, setTotalDays] = useState(0);
  const [claimableLevels, setClaimableLevels] = useState<number[]>([]);

  // 计算总打卡天数
  useEffect(() => {
    const calculateTotalDays = async () => {
      const effectiveAddress = address || (isSkipMode ? 'demo' : '');
      if (!effectiveAddress) return;

      try {
        let reflections: typeof demoReflections;

        if (isSkipMode) {
          reflections = demoReflections;
        } else {
          reflections = await ReflectionService.getRecentReflections(effectiveAddress, 1000);
        }

        // 按日期去重，计算实际打卡天数
        const uniqueDates = new Set<string>();
        reflections.forEach(r => {
          uniqueDates.add(r.date);
        });

        setTotalDays(uniqueDates.size);

        // 获取已领取的等级
        const claimedLevels: number[] = [];
        if (achievements && achievements.length > 0) {
          achievements.forEach(achievement => {
            achievement.sbtClaimed.forEach((claimed, index) => {
              if (claimed && !claimedLevels.includes(index + 1)) {
                claimedLevels.push(index + 1);
              }
            });
          });
        }

        // 计算可领取的等级
        const unlocked = getUnlockedLevels(uniqueDates.size);
        const claimable: number[] = [];
        unlocked.forEach(level => {
          if (!claimedLevels.includes(level.level)) {
            claimable.push(level.level);
          }
        });
        setClaimableLevels(claimable);
      } catch (error) {
        console.error('[SBTShowcase] 计算天数失败:', error);
      }
    };

    calculateTotalDays();
  }, [address, isSkipMode, achievements]);

  const handleClaim = (level: number) => {
    router.push(`/achievements/claim?level=${level}`);
  };

  if (loading) {
    return (
      <div className="bg-paper border-2 border-ink/20 p-6">
        <div className="text-center text-ink/60">加载中...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* 标题和链切换 */}
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          SBT成就
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChain('bnb')}
            className={`px-3 py-1 text-sm font-bold transition-all ${
              chain === 'bnb'
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink border-2 border-ink'
            }`}
            style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
          >
            BNB Chain
          </button>
          <button
            onClick={() => setChain('solana')}
            className={`px-3 py-1 text-sm font-bold transition-all ${
              chain === 'solana'
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink border-2 border-ink'
            }`}
            style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
          >
            Solana
          </button>
        </div>
      </div>

      {/* 所有等级列表 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ACHIEVEMENT_LEVELS.map((levelInfo, index) => {
          const isUnlocked = totalDays >= levelInfo.requiredDays;
          const isClaimable = claimableLevels.includes(levelInfo.level);

          // 检查当前链是否已领取该等级（体验模式下没有成就数据）
          const currentChainAchievement = achievements?.find((a) => a.chain === chain);
          const isClaimed = currentChainAchievement?.sbtClaimed[levelInfo.level - 1];

          return (
            <motion.div
              key={levelInfo.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative group p-4 border-2 transition-all ${
                isUnlocked
                  ? 'border-seal/30 bg-white'
                  : 'border-ink/20 bg-paper opacity-60'
              }`}
              style={{ borderRadius: 0 }}
            >
              {/* 状态标签 */}
              <div className="absolute top-2 right-2">
                {isClaimed && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-green-100 text-green-700">
                    已领取
                  </span>
                )}
                {!isClaimed && isUnlocked && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-seal text-white">
                    可领取
                  </span>
                )}
                {!isUnlocked && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-ink/10 text-ink/60">
                    未解锁
                  </span>
                )}
              </div>

              {/* 等级图像 */}
              <div className="w-20 h-20 mb-3 flex items-center justify-center">
                <img
                  src={getLevelSBTImage(levelInfo.level)}
                  alt={`Level ${levelInfo.level}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 等级信息 */}
              <div className="text-center mb-3">
                <div className="text-xs text-ink/60 mb-1">Level {levelInfo.level}</div>
                <div
                  className="text-sm font-bold mb-1"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: isUnlocked ? levelInfo.primaryColor : '#9CA3AF',
                  }}
                >
                  {levelInfo.title}
                </div>
                <div className="text-xs text-ink/40">
                  需要 {levelInfo.requiredDays} 天
                </div>
                {totalDays < levelInfo.requiredDays && (
                  <div className="text-xs text-ink/30 mt-1">
                    还需 {levelInfo.requiredDays - totalDays} 天
                  </div>
                )}
              </div>

              {/* 按钮 */}
              {isClaimable && !isClaimed && (
                <button
                  onClick={() => handleClaim(levelInfo.level)}
                  className="w-full py-2 bg-seal text-paper text-sm font-bold hover:bg-seal/90 transition-colors"
                  style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
                >
                  领取
                </button>
              )}
              {isClaimed && (
                <button
                  disabled
                  className="w-full py-2 bg-green-100 text-green-700 text-sm font-bold"
                  style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
                >
                  已领取
                </button>
              )}
              {!isUnlocked && (
                <button
                  disabled
                  className="w-full py-2 bg-ink/10 text-ink/40 text-sm font-bold"
                  style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
                >
                  未解锁
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 提示文字 */}
      <div className="text-center text-xs text-ink/40" style={{ fontFamily: 'Georgia, serif' }}>
        点击可领取的等级按钮进入铸造页面
      </div>
    </motion.div>
  );
}
