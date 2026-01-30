'use client';

/**
 * 个人主页
 * 展示用户信息、人生目标、打卡记录和SBT成就
 */

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { UserInfo } from '@/components/profile/UserInfo';
import { GoalDisplay } from '@/components/profile/GoalDisplay';
import { CheckInTimeline } from '@/components/profile/CheckInTimeline';
import { SBTShowcase } from '@/components/profile/SBTShowcase';
import { ClaimSBTFlow } from '@/components/achievement/ClaimSBTFlow';
import { ProfileService } from '@/lib/profile-service';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { demoProfileData } from '@/lib/demo-data';
import { useUserAchievements } from '@/lib/hooks/useUserAchievements';

export default function ProfilePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { isSkipMode, demoAddress } = useSkipMode();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<Awaited<ReturnType<typeof ProfileService.getProfileData>> | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<'bnb' | 'solana'>('bnb');
  const { achievements } = useUserAchievements();

  /** 加载数据 */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 游客模式：直接使用预设的演示数据
        if (isSkipMode) {
          console.log('[ProfilePage] 游客模式，使用演示数据');
          setProfileData(demoProfileData);
        }
        // 真实用户：从数据库加载数据
        else if (address) {
          console.log('[ProfilePage] 加载用户数据:', address);
          const data = await ProfileService.getProfileData(address);
          setProfileData(data as any);
        }
      } catch (error) {
        console.error('[ProfilePage] 加载失败:', error);
        toast.error('加载数据失败');
      } finally {
        setLoading(false);
      }
    };

    // 只有在连接钱包或游客模式时才加载数据
    if (isConnected || isSkipMode) {
      loadData();
    }
  }, [address, isConnected, isSkipMode]);

  /** 打开SBT领取模态框 */
  const handleClaimSBT = (chain?: 'bnb' | 'solana') => {
    console.log('[ProfilePage] handleClaimSBT 被调用');
    console.log('[ProfilePage] 当前 achievements:', achievements);
    console.log('[ProfilePage] 传入的 chain:', chain);

    if (chain) {
      setSelectedChain(chain);
    }
    setShowClaimModal(true);
    console.log('[ProfilePage] showClaimModal 设置为 true');
  };

  /** 处理SBT领取成功 */
  const handleClaimSuccess = async (level: number, chain: 'bnb' | 'solana'): Promise<boolean> => {
    toast.success(`成功领取 Level ${level} SBT！`);
    setShowClaimModal(false);
    // 重新加载数据
    window.location.reload();
    return true;
  };

  /** 关闭模态框 */
  const handleCloseModal = () => {
    setShowClaimModal(false);
  };

  /** 如果未连接钱包且非游客模式 */
  if (!isConnected && !isSkipMode) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1
            className="text-3xl font-bold text-ink"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            请先连接钱包
          </h1>
          <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
            或返回首页选择体验模式
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-ink text-paper font-bold"
            style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF2] p-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <span className="text-xl">←</span>
          <span>返回</span>
        </button>

        {/* 头部 */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-bold text-ink"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            个人主页
          </h1>
          <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
            你的证道之旅
          </p>
        </div>

        {/* 用户信息 */}
        <UserInfo />

        {/* 统计摘要 */}
        {profileData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-paper border-2 border-ink/20 p-4 text-center">
              <div className="text-sm text-ink/60 mb-1">总打卡天数</div>
              <div className="text-2xl font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
                {profileData.totalCheckInDays}
              </div>
            </div>
            <div className="bg-paper border-2 border-ink/20 p-4 text-center">
              <div className="text-sm text-ink/60 mb-1">有意义天数</div>
              <div className="text-2xl font-bold text-seal" style={{ fontFamily: 'Georgia, serif' }}>
                {profileData.meaningfulDays}
              </div>
            </div>
            <div className="bg-paper border-2 border-ink/20 p-4 text-center">
              <div className="text-sm text-ink/60 mb-1">有意义率</div>
              <div className="text-xl font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
                {profileData.meaningfulRate}%
              </div>
            </div>
            <div className="bg-paper border-2 border-ink/20 p-4 text-center">
              <div className="text-sm text-ink/60 mb-1">连续打卡</div>
              <div className="text-2xl font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
                {profileData.currentStreak} 天
              </div>
            </div>
          </motion.div>
        )}

        {/* 人生目标 */}
        <GoalDisplay />

        {/* 打卡时间线 */}
        <CheckInTimeline limit={5} />

        {/* 挑战 - 即将推出 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-paper border-2 border-ink/20 p-6 text-center relative overflow-hidden"
        >
          {/* 即将推出标签 */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-bold bg-ink/10 text-ink/60 border-2 border-ink/30">
              即将推出
            </span>
          </div>

          {/* 标题 */}
          <h2
            className="text-2xl font-bold text-ink mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            挑战池
          </h2>

          {/* 描述 */}
          <p className="text-ink/60 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            入金参与挑战，完成打卡目标瓜分奖励池
          </p>

          {/* 功能预览 */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
            <div className="bg-white border border-ink/20 p-3">
              <div className="text-ink/60 mb-1">7天挑战</div>
              <div className="font-bold text-ink">0.1 BNB起</div>
            </div>
            <div className="bg-white border border-ink/20 p-3">
              <div className="text-ink/60 mb-1">30天挑战</div>
              <div className="font-bold text-ink">0.5 BNB起</div>
            </div>
            <div className="bg-white border border-ink/20 p-3">
              <div className="text-ink/60 mb-1">100天挑战</div>
              <div className="font-bold text-ink">1 BNB起</div>
            </div>
          </div>

          {/* 按钮链接 */}
          <button
            onClick={() => router.push('/coming-soon')}
            className="px-6 py-2 bg-ink/10 text-ink font-bold border-2 border-ink/30 hover:bg-ink/20 transition-colors"
            style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
          >
            了解更多
          </button>
        </motion.div>

        {/* SBT成就 */}
        <SBTShowcase onClaim={handleClaimSBT} />

        {/* 页脚 */}
        <footer className="pt-8 pb-4 text-center">
          <p
            className="text-xs text-ink/40"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            · 证道 ZhengDao ·
          </p>
        </footer>
      </div>

      {/* SBT领取模态框 */}
      <AnimatePresence>
        {showClaimModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white"
            >
              {achievements && achievements.length > 0 ? (
                <ClaimSBTFlow
                  level={{
                    level: achievements[0].currentLevel,
                    title: achievements[0].currentLevel === 1 ? '十一路奋斗者' :
                           achievements[0].currentLevel === 2 ? '笃行者' :
                           achievements[0].currentLevel === 3 ? '持久力王者' :
                           achievements[0].currentLevel === 4 ? '百里挑一' :
                           achievements[0].currentLevel === 5 ? '千里挑一' : '证道成圣',
                    titleEn: `Level ${achievements[0].currentLevel}`,
                    icon: achievements[0].currentLevel === 1 ? '🌱' :
                          achievements[0].currentLevel === 2 ? '🌿' :
                          achievements[0].currentLevel === 3 ? '🌳' :
                          achievements[0].currentLevel === 4 ? '🏆' :
                          achievements[0].currentLevel === 5 ? '👑' : '🌟',
                    requiredDays: achievements[0].currentLevel * 10,
                    primaryColor: '#D43628',
                    secondaryColor: '#F5E6D3',
                    keywords: [],
                    description: '',
                    rewardBonus: achievements[0].currentLevel * 10,
                  }}
                  days={achievements[0].totalCheckInDays}
                  chain={selectedChain}
                  onClaim={handleClaimSuccess}
                  onClose={handleCloseModal}
                />
              ) : (
                <div className="p-8 text-center">
                  <p className="text-lg mb-4">加载中...</p>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-ink text-paper"
                    style={{ borderRadius: 0 }}
                  >
                    关闭
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
