'use client';

/**
 * 打卡成功页面
 * 独立路由，展示打卡成功状态和后续导航选项
 */

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CompetitionInfo } from '@/components/CompetitionInfo';

export default function CheckInSuccessPage() {
  const router = useRouter();

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

        {/* 打卡成功内容 */}
        <motion.div
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

        {/* 参赛信息模块 */}
        <CompetitionInfo />
      </div>
    </div>
  );
}
