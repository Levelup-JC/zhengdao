'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useReadContract,
  useSwitchChain,
} from 'wagmi';
import { motion } from 'framer-motion';

import { BrandLogo } from '@/components/BrandLogo';
import { ZHENGDAO_ABI, ZHENGDAO_CONTRACT_ADDRESS } from '@/lib/contractABI';
import { ReflectionService } from '@/lib/storage';
import { OnboardingService } from '@/lib/onboarding-service';
import { useSkipMode } from '@/lib/context/SkipModeContext';

// Personal statistics interface
interface PersonalStats {
  totalCheckIns: number;
  meaningfulDays: number;
  meaningfulRate: number;
  currentStreak: number;
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDemoMode = searchParams.get('demo') === 'true';

  // Wallet hooks
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: connectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Skip mode hooks
  const { isSkipMode, demoAddress, enableSkipMode, disableSkipMode } = useSkipMode();

  // Local state
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [personalStats, setPersonalStats] = useState<PersonalStats>({
    totalCheckIns: 0,
    meaningfulDays: 0,
    meaningfulRate: 0,
    currentStreak: 0,
  });

  // Use effective address (real or skip mode)
  const effectiveAddress = address || demoAddress;

  // Calculate personal statistics from IndexedDB
  useEffect(() => {
    const calculateStats = async () => {
      if (!effectiveAddress) return;

      try {
        const allReflections = await ReflectionService.getAllReflections(effectiveAddress);

        // Calculate total check-ins
        const totalCheckIns = allReflections.length;

        // Calculate meaningful days
        const meaningfulDays = allReflections.filter((r) => r.isMeaningful).length;
        const meaningfulRate = totalCheckIns > 0 ? (meaningfulDays / totalCheckIns) * 100 : 0;

        // Calculate current streak (consecutive days)
        const sortedReflections = allReflections.sort((a, b) => b.date.localeCompare(a.date));
        let currentStreak = 0;
        const today = new Date();

        for (let i = 0; i < sortedReflections.length; i++) {
          const reflectionDate = new Date(sortedReflections[i].date);
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);

          if (reflectionDate.toDateString() === expectedDate.toDateString()) {
            currentStreak++;
          } else {
            break;
          }
        }

        setPersonalStats({
          totalCheckIns,
          meaningfulDays,
          meaningfulRate: Math.round(meaningfulRate),
          currentStreak,
        });
      } catch (error) {
        console.error('[HomePage] Failed to calculate personal stats:', error);
      }
    };

    calculateStats();
  }, [effectiveAddress]);

  // Handle check-in click - navigate to check-in page
  const handleCheckInClick = () => {
    router.push('/check-in');
  };

  // Handle wallet connect with network switch
  const handleConnectWallet = async () => {
    try {
      console.log('[HomePage] 开始连接钱包...');

      // 连接钱包
      await connect({ connector: connectors[0] });

      console.log('[HomePage] 钱包已连接，当前网络:', chain?.id, chain?.name);

      // 连接成功后，检查并切换到正确的网络（主网或测试网）
      const isTestnet = process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true';
      const BSC_CHAIN_ID = isTestnet ? 97 : 56; // 97 = 测试网, 56 = 主网
      const networkName = isTestnet ? 'BSC 测试网' : 'BSC 主网';

      // 给一点时间让状态更新
      await new Promise(resolve => setTimeout(resolve, 500));

      // 再次检查当前网络
      if (chain?.id !== BSC_CHAIN_ID) {
        console.log(`[HomePage] 当前不在 ${networkName}，尝试切换...`);
        toast.loading(`正在切换到 ${networkName}...`, { id: 'switch-network' });

        try {
          await switchChain?.({ chainId: BSC_CHAIN_ID });
          toast.success(`已切换到 ${networkName}`, { id: 'switch-network' });
          console.log(`[HomePage] 已切换到 ${networkName}`);
        } catch (switchError) {
          console.error('[HomePage] 切换网络失败:', switchError);
          toast.error(`请手动在钱包中切换到 ${networkName}`, { id: 'switch-network' });
        }
      } else {
        console.log(`[HomePage] 已在 ${networkName}`);
        toast.success(`已连接到 ${networkName}`, { id: 'switch-network' });
      }
    } catch (error) {
      console.error('[HomePage] 连接钱包失败:', error);
      toast.error('连接钱包失败，请重试');
    }
  };

  // Check onboarding status when wallet connects
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (effectiveAddress && isSkipMode) {
        setHasCompletedOnboarding(true);
        return;
      }

      if (address && isConnected) {
        try {
          const completed = await OnboardingService.hasCompletedOnboarding(address);
          setHasCompletedOnboarding(completed);

          // 不自动跳转，只显示提示
          if (!completed) {
            toast('建议先完成人生规划问卷，以获得更好的体验', { icon: '💡' });
          }
        } catch (error) {
          console.error('[HomePage] Failed to check onboarding status:', error);
        }
      }
    };

    checkOnboardingStatus();
  }, [address, isConnected, isSkipMode, effectiveAddress]);

  // Truncate address for display
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center relative">
      {/* ==================== 顶部标题 - 证道 ==================== */}
      <motion.div
        className="w-full pt-12 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-center font-serif font-bold text-ink" style={{ fontSize: '4rem', letterSpacing: '0.15em' }}>
          证道
        </h1>
      </motion.div>

      {/* ==================== 中间内容区域 ==================== */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6">
        {/* Logo展示 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="rounded-full overflow-hidden shadow-2xl"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/zhengdao-logo.png"
                alt="证道 ZhengDao"
                width={200}
                height={200}
                priority
                className="rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Slogan - 放大 */}
        <motion.p
          className="font-serif text-ink/70 text-center tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ fontSize: '1.25rem' }}
        >
          首个Web3成长变现应用
        </motion.p>
      </div>

      {/* ==================== 底部导航按钮 ==================== */}
      <motion.div
        className="w-full max-w-md px-6 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {/* 钱包连接区域 - 未连接时显示 */}
        {!isConnected && !isSkipMode && (
          <div className="space-y-3">
            <button
              onClick={handleConnectWallet}
              disabled={connectPending}
              className="w-full py-3 bg-ink text-paper font-bold font-serif hover:bg-ink/90 transition-colors"
              style={{ borderRadius: 0, opacity: connectPending ? 0.6 : 1 }}
            >
              {connectPending ? '连接中...' : '连接钱包'}
            </button>

            <button
              onClick={enableSkipMode}
              className="w-full py-3 bg-white text-ink font-bold border-2 border-ink font-serif hover:bg-ink/5 transition-colors"
              style={{ borderRadius: 0 }}
            >
              体验模式
            </button>
          </div>
        )}

        {/* 已连接/体验模式 - 显示开始打卡按钮 */}
        {(isConnected || isSkipMode) && (
          <div className="space-y-3">
            <button
              onClick={handleCheckInClick}
              className="w-full py-4 bg-ink text-paper font-bold font-serif hover:bg-ink/90 transition-colors text-lg"
              style={{ borderRadius: 0 }}
            >
              开始打卡
            </button>

            {/* 人生规划按钮 - 如果未完成人生规划 */}
            {!hasCompletedOnboarding && !isSkipMode && (
              <button
                onClick={() => router.push('/onboarding')}
                className="w-full py-3 bg-white text-ink font-bold border-2 border-ink font-serif hover:bg-ink/5 transition-colors"
                style={{ borderRadius: 0 }}
              >
                📋 人生规划问卷
              </button>
            )}

            {/* 状态显示 */}
            <div className="flex justify-between items-center p-4 border border-ink/20">
              <div>
                <p className="text-xs text-ink/60 font-serif">
                  {isSkipMode ? '体验模式' : '已连接'}
                </p>
                <p className="text-sm font-bold text-ink font-serif">
                  {isSkipMode ? 'Demo User' : truncateAddress(address || '')}
                </p>
              </div>

              <button
                onClick={() => {
                  if (isSkipMode) {
                    disableSkipMode();
                  } else {
                    disconnect();
                  }
                }}
                className="px-4 py-2 text-xs border border-ink text-ink font-serif hover:bg-ink/5 transition-colors"
                style={{ borderRadius: 0 }}
              >
                {isSkipMode ? '退出' : '断开'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}


export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
