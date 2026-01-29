'use client';

import { motion } from 'framer-motion';
import { GoalProgressChart } from '../charts';

interface Goal {
  category: string;
  target: string;
  progress: number;
}

interface GoalComparisonProps {
  goals: Goal[];
  yearlyStats: {
    totalDays: number;
    meaningfulDays: number;
    meaningfulRatio: number;
  };
  analysis: string;
  isLoading?: boolean;
}

/**
 * GoalComparison - 目标对比（年度复盘专用）
 *
 * 对比年初设定的目标与实际完成情况
 */
export default function GoalComparison({ goals, yearlyStats, analysis, isLoading = false }: GoalComparisonProps) {
  // 为每个目标设定模拟进度（基于实际打卡情况）
  const goalsWithProgress = goals.map(goal => ({
    category: goal.category,
    target: goal.target,
    progress: Math.min(100, Math.round((yearlyStats.meaningfulRatio / 100) * 100)), // 简化计算
  }));

  return (
    <motion.div
      className="w-full bg-white border-2 border-black p-6"
      style={{ borderRadius: 0, backgroundColor: '#FFFEF2' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 标题 */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3
          className="text-xl font-bold text-black"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          目标达成度分析
        </h3>
      </motion.div>

      <motion.p
        className="text-sm text-black/60 mb-6"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        年初目标与实际完成情况对比
      </motion.p>

      {/* 年度统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="border-2 border-black/20 p-4 text-center"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-2xl font-bold mb-1 text-[#D43628]" style={{ fontFamily: 'Georgia, serif' }}>
            {yearlyStats.totalDays}
          </div>
          <div className="text-xs text-black/50" style={{ fontFamily: 'Georgia, serif' }}>
            打卡天数
          </div>
        </motion.div>

        <motion.div
          className="border-2 border-black/20 p-4 text-center bg-[#D43628]/10"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-lg font-bold mb-1 text-[#D43628]" style={{ fontFamily: 'Georgia, serif' }}>
            {yearlyStats.meaningfulRatio.toFixed(1)}%
          </div>
          <div className="text-xs text-black/50" style={{ fontFamily: 'Georgia, serif' }}>
            有意义天数比例
          </div>
        </motion.div>

        <motion.div
          className="border-2 border-black/20 p-4 text-center"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Georgia, serif', color: yearlyStats.meaningfulRatio >= 70 ? '#D43628' : '#1a1a2e' }}>
            {yearlyStats.meaningfulRatio >= 70 ? '优秀' : yearlyStats.meaningfulRatio >= 50 ? '良好' : '待提升'}
          </div>
          <div className="text-xs text-black/50" style={{ fontFamily: 'Georgia, serif' }}>
            整体评价
          </div>
        </motion.div>
      </div>

      {/* 目标进度展示 */}
      {goalsWithProgress.length > 0 && (
        <GoalProgressChart goals={goalsWithProgress} />
      )}

      {/* AI分析内容 */}
      <motion.div
        className={`
          mt-6 p-6 border-2 bg-black/5 relative
          ${isLoading ? 'border-black/20' : 'border-black/30'}
        `}
        style={{ borderRadius: 0, minHeight: '120px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {/* 加载状态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex gap-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="w-2 h-2 bg-black/30" style={{ borderRadius: '50%' }} />
              <div className="w-2 h-2 bg-black/30" style={{ borderRadius: '50%' }} />
              <div className="w-2 h-2 bg-black/30" style={{ borderRadius: '50%' }} />
            </motion.div>
          </div>
        )}

        {/* 分析内容 */}
        {!isLoading && (
          <div className="text-black leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Georgia, serif', fontSize: '15px' }}>
            {analysis || '暂无分析内容，请先完成人生规划问卷并积累更多打卡数据。'}
          </div>
        )}

        {/* 装饰元素 */}
        {!isLoading && analysis && (
          <motion.div
            className="absolute bottom-2 right-2 text-4xl opacity-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
          >
            🎯
          </motion.div>
        )}
      </motion.div>

      {/* 目标数量统计 */}
      {goalsWithProgress.length > 0 && (
        <motion.div
          className="mt-4 p-4 bg-black/5 border border-black/20 text-center"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-sm text-black/70" style={{ fontFamily: 'Georgia, serif' }}>
            年初设定 <span className="font-bold text-[#D43628]">{goalsWithProgress.length}</span> 个目标，
            已完成 <span className="font-bold text-[#D43628]">{goalsWithProgress.filter(g => g.progress >= 100).length}</span> 个
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
