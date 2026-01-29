'use client';

/**
 * 管理后台
 * 用于展示平台级别的统计数据和管理功能
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ReflectionService } from '@/lib/storage';
import { db } from '@/lib/db';
import { generateSeedData, clearSeedData } from '@/lib/seed-data-service';
import DataGeneratorPanel from '@/components/admin/DataGeneratorPanel';
import ContentAnalyticsDashboard from '@/components/admin/ContentAnalyticsDashboard';
import AchievementAnalyticsDashboard from '@/components/admin/AchievementAnalyticsDashboard';

// 硬编码的管理员密码
const ADMIN_PASSWORD = 'zhengdao2026';

interface PlatformStats {
  totalUsers: number;
  totalCheckIns: number;
  totalReflections: number;
  activeUsers7d: number;
  activeUsers30d: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState({ current: 0, total: 0, message: '' });
  const [demoWalletAddress, setDemoWalletAddress] = useState('demo-user-wallet');
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'achievement' | 'generator'>('overview');

  // 登录处理
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('登录成功');
      loadStats();
    } else {
      toast.error('密码错误');
    }
  };

  // 加载平台统计数据
  const loadStats = async () => {
    setLoading(true);
    try {
      // 从IndexedDB获取所有数据
      const allReflections = await db.reflections.toArray();
      const allGoals = await db.lifeGoals.toArray();

      // 获取唯一用户数（通过钱包地址去重）
      const uniqueAddresses = new Set(allReflections.map(r => r.walletAddress));
      const totalUsers = uniqueAddresses.size;

      // 获取过去7天的活跃用户
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentReflections7d = allReflections.filter(r => new Date(r.date) >= sevenDaysAgo);
      const activeUsers7d = new Set(recentReflections7d.map(r => r.walletAddress)).size;

      // 获取过去30天的活跃用户
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentReflections30d = allReflections.filter(r => new Date(r.date) >= thirtyDaysAgo);
      const activeUsers30d = new Set(recentReflections30d.map(r => r.walletAddress)).size;

      setStats({
        totalUsers,
        totalCheckIns: allReflections.length,
        totalReflections: allReflections.length,
        activeUsers7d,
        activeUsers30d,
      });
    } catch (error) {
      console.error('加载统计数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 一键生成演示数据
  const handleGenerateDemoData = async () => {
    if (generating) return;

    // 确认操作
    const confirmed = window.confirm(
      `确定要为地址 "${demoWalletAddress}" 生成过去60天的演示数据吗？\n\n` +
      `这将：\n` +
      `• 生成约 ${Math.round(60 * 0.8)} 条打卡记录（80%打卡率）\n` +
      `• 其中约 ${Math.round(60 * 0.8 * 0.7)} 条为"有意义的一天"（70%）\n` +
      `• 如果AI服务可用，会调用AI生成结构化数据\n\n` +
      `提示：生成过程可能需要1-2分钟，请耐心等待。`
    );

    if (!confirmed) return;

    setGenerating(true);
    setGenerateProgress({ current: 0, total: 60, message: '准备生成...' });

    try {
      const toastId = toast.loading('正在生成演示数据...', {
        duration: Infinity,
      });

      await generateSeedData({
        walletAddress: demoWalletAddress,
        days: 60,
        checkInProbability: 0.8,
        meaningfulProbability: 0.7,
        onProgress: (current, total, message) => {
          setGenerateProgress({ current, total, message });
          toast.loading(
            `生成中: ${current}/${total} (${Math.round((current / total) * 100)}%) - ${message}`,
            { id: toastId, duration: Infinity }
          );
        },
      });

      toast.success('演示数据生成成功！', { id: toastId });
      toast.success(`共生成约 ${Math.round(60 * 0.8)} 条打卡记录`);

      // 刷新统计数据
      await loadStats();
    } catch (error) {
      console.error('生成演示数据失败:', error);
      toast.error(`生成失败: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setGenerating(false);
      setGenerateProgress({ current: 0, total: 0, message: '' });
    }
  };

  // 清除演示数据
  const handleClearDemoData = async () => {
    if (generating) return;

    const confirmed = window.confirm(
      `确定要清除地址 "${demoWalletAddress}" 的所有演示数据吗？\n\n此操作不可恢复！`
    );

    if (!confirmed) return;

    try {
      toast.loading('正在清除数据...');
      await clearSeedData(demoWalletAddress);
      toast.success('数据已清除');

      // 刷新统计数据
      await loadStats();
    } catch (error) {
      console.error('清除数据失败:', error);
      toast.error(`清除失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // 未认证状态：显示登录表单
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-2 border-ink bg-white p-8" style={{ borderRadius: 0 }}>
            <h1 className="text-2xl font-bold text-ink mb-2 font-serif text-center">
              管理后台
            </h1>
            <p className="text-sm text-ink/60 mb-6 font-serif text-center">
              证道 ZhengDao - Platform Administration
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-2 font-serif">
                  管理员密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-ink focus:outline-none focus:border-seal font-serif"
                  style={{ borderRadius: 0 }}
                  placeholder="请输入密码"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-ink text-paper font-bold font-serif hover:bg-seal transition-colors"
                style={{ borderRadius: 0 }}
              >
                登录
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-ink/40 font-serif">
                提示：默认密码为 zhengdao2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 已认证状态：显示管理面板
  return (
    <div className="min-h-screen bg-paper">
      {/* 顶部导航 */}
      <div className="border-b-2 border-ink bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-ink font-serif">
              管理后台
            </h1>
            <p className="text-xs text-ink/60 font-serif">
              Platform Administration
            </p>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-xs border border-ink text-ink font-serif hover:bg-ink hover:text-paper transition-colors"
            style={{ borderRadius: 0 }}
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 标签导航 */}
        <div className="mb-6 border-b-2 border-ink">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-1 font-serif font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'text-seal border-b-2 border-seal'
                  : 'text-ink hover:text-seal'
              }`}
            >
              平台概览
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-2 px-1 font-serif font-bold transition-colors ${
                activeTab === 'content'
                  ? 'text-seal border-b-2 border-seal'
                  : 'text-ink hover:text-seal'
              }`}
            >
              内容数据
            </button>
            <button
              onClick={() => setActiveTab('achievement')}
              className={`pb-2 px-1 font-serif font-bold transition-colors ${
                activeTab === 'achievement'
                  ? 'text-seal border-b-2 border-seal'
                  : 'text-ink hover:text-seal'
              }`}
            >
              成就数据
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`pb-2 px-1 font-serif font-bold transition-colors ${
                activeTab === 'generator'
                  ? 'text-seal border-b-2 border-seal'
                  : 'text-ink hover:text-seal'
              }`}
            >
              数据生成器
            </button>
          </div>
        </div>

        {/* 标签内容 */}
        {activeTab === 'generator' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataGeneratorPanel />
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ContentAnalyticsDashboard />
          </motion.div>
        )}

        {activeTab === 'achievement' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AchievementAnalyticsDashboard />
          </motion.div>
        )}

        {/* 平台数据统计卡片（仅在概览标签显示） */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-bold text-ink mb-4 font-serif tracking-widest uppercase">
              平台数据概览
            </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-ink/60 font-serif">加载数据中...</p>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 总用户数 */}
              <div className="border-2 border-ink bg-white p-6">
                <div className="text-xs text-ink/60 mb-2 font-serif">总用户数</div>
                <motion.div
                  className="text-4xl font-bold text-ink font-serif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {stats.totalUsers}
                </motion.div>
              </div>

              {/* 总打卡次数 */}
              <div className="border-2 border-ink bg-white p-6">
                <div className="text-xs text-ink/60 mb-2 font-serif">总打卡次数</div>
                <motion.div
                  className="text-4xl font-bold text-ink font-serif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                >
                  {stats.totalCheckIns}
                </motion.div>
              </div>

              {/* DAU (7天活跃用户) */}
              <div className="border-2 border-ink bg-white p-6">
                <div className="text-xs text-ink/60 mb-2 font-serif">DAU (7天)</div>
                <motion.div
                  className="text-4xl font-bold text-ink font-serif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  {stats.activeUsers7d}
                </motion.div>
              </div>

              {/* MAU (30天活跃用户) */}
              <div className="border-2 border-ink bg-white p-6">
                <div className="text-xs text-ink/60 mb-2 font-serif">MAU (30天)</div>
                <motion.div
                  className="text-4xl font-bold text-ink font-serif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                >
                  {stats.activeUsers30d}
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-ink border-dashed">
              <p className="text-ink/60 font-serif">暂无数据</p>
            </div>
          )}
          </motion.div>
        )}

        {/* 管理功能区域（仅在概览标签显示） */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-ink mb-4 font-serif tracking-widest uppercase">
              管理功能
            </h2>

            <div className="space-y-4">
              {/* 进度显示 */}
              {generating && (
                <div className="mb-4 p-4 border-2 border-seal bg-seal/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-ink font-serif">生成进度</span>
                    <span className="text-sm text-ink/60 font-serif">
                      {generateProgress.current} / {generateProgress.total}
                    </span>
                  </div>
                  <div className="w-full bg-ink/10 h-2 mb-2">
                    <motion.div
                      className="bg-seal h-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(generateProgress.current / generateProgress.total) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-ink/60 font-serif">{generateProgress.message}</p>
                </div>
              )}

              {/* 按钮组 */}
              <div className="flex gap-4">
                <button
                  onClick={handleGenerateDemoData}
                  disabled={generating}
                  className="flex-1 px-6 py-3 bg-seal text-white font-bold font-serif hover:bg-seal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: 0 }}
                >
                  {generating ? '生成中...' : '生成演示数据'}
                </button>
                <button
                  onClick={handleClearDemoData}
                  disabled={generating}
                  className="px-6 py-3 border-2 border-ink text-ink font-bold font-serif hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: 0 }}
                >
                  清除数据
                </button>
              </div>
            </div>

            {/* 其他管理功能占位符 */}
            <div className="border-2 border-dashed border-ink/30 bg-ink/5 p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🚧</div>
                <p className="text-sm text-ink/60 font-serif">
                  更多管理功能正在开发中...
                </p>
              </div>
            </div>
        </motion.div>
        )}

        {/* 数据说明 */}
        <motion.div
          className="mt-8 p-4 border-l-4 border-seal bg-seal/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-ink/80 font-serif">
            <strong>数据说明：</strong>当前展示的数据来自本地 IndexedDB，仅供演示使用。
            生产环境应连接后端API获取真实平台数据。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
