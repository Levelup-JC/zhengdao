'use client';

/**
 * MonthlyBarChart - 月度数据柱状图组件
 *
 * 展示12个月的有意义天数、无意义天数和未打卡天数的柱状图
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MonthlyBarChartProps {
  /** 打卡数据 */
  checkInData: Array<{ date: string; isMeaningful: boolean }>;
  /** 周期类型 */
  period?: '1y' | '6m';
}

interface MonthData {
  month: string;
  label: string;
  meaningfulDays: number;
  notMeaningfulDays: number;
  noCheckInDays: number;
  totalDays: number;
}

export function MonthlyBarChart({ checkInData, period = '1y' }: MonthlyBarChartProps) {
  // 按月统计数据
  const monthlyData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();

    // 初始化月度数据
    const months: MonthData[] = [];
    const monthCount = period === '1y' ? 12 : 6;
    const startOffset = period === '1y' ? 0 : 6; // 半年复盘显示7-12月或1-6月

    const monthLabels = period === '1y'
      ? ['一月', '二月', '三月', '四月', '五月', '六月',
         '七月', '八月', '九月', '十月', '十一月', '十二月']
      : ['七月', '八月', '九月', '十月', '十一月', '十二月'];

    for (let i = 0; i < monthCount; i++) {
      months.push({
        month: `${currentYear}-${String(startOffset + i + 1).padStart(2, '0')}`,
        label: monthLabels[i],
        meaningfulDays: 0,
        notMeaningfulDays: 0,
        noCheckInDays: 0,
        totalDays: new Date(currentYear, startOffset + i + 1, 0).getDate()
      });
    }

    // 统计每天的打卡数据
    checkInData.forEach((item) => {
      const date = new Date(item.date);
      if (date.getFullYear() !== currentYear) return;

      const monthIndex = date.getMonth();
      // 根据周期筛选月份
      const validMonths = period === '1y'
        ? Array.from({ length: 12 }, (_, i) => i)
        : Array.from({ length: 6 }, (_, i) => startOffset + i);

      if (validMonths.includes(monthIndex)) {
        const arrayIndex = period === '1y' ? monthIndex : monthIndex - startOffset;
        if (arrayIndex >= 0 && arrayIndex < months.length) {
          if (item.isMeaningful) {
            months[arrayIndex].meaningfulDays++;
          } else {
            months[arrayIndex].notMeaningfulDays++;
          }
        }
      }
    });

    // 计算未打卡天数
    months.forEach((month) => {
      month.noCheckInDays = month.totalDays - month.meaningfulDays - month.notMeaningfulDays;
    });

    return months;
  }, [checkInData]);

  // 计算Y轴最大值
  const maxValue = Math.max(
    ...monthlyData.map(m => Math.max(m.meaningfulDays, m.notMeaningfulDays, m.noCheckInDays))
  );

  return (
    <motion.div
      className="w-full bg-white border-2 border-black p-6"
      style={{ borderRadius: 0, backgroundColor: '#FFFEF2' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 标题 */}
      <motion.h3
        className="text-xl font-bold text-black mb-2"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        年度月度统计
      </motion.h3>

      <motion.p
        className="text-sm text-black/60 mb-6"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {period === '1y' ? '全年12个月的有意义天数、无意义天数和未打卡天数统计' : '近6个月的有意义天数、无意义天数和未打卡天数统计'}
      </motion.p>

      {/* 图例 */}
      <motion.div
        className="flex items-center justify-center gap-6 mb-6 text-sm"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{ backgroundColor: '#D43628' }}></div>
          <span className="text-black/70">有意义</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{ backgroundColor: '#E5E7EB' }}></div>
          <span className="text-black/70">无意义</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-black/20 bg-white"></div>
          <span className="text-black/70">未打卡</span>
        </div>
      </motion.div>

      {/* 柱状图容器 */}
      <div className="w-full overflow-x-auto">
        <div className="w-full">
          {/* Y轴刻度线和标签 */}
          <div className="relative h-64 mb-2">
            {[0, 25, 50, 75, 100].map((percent) => {
              const value = Math.round((maxValue * percent) / 100);
              return (
                <div
                  key={percent}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: `${100 - percent}%`, height: '1px' }}
                >
                  <div
                    className="w-12 text-xs text-black/50 text-right pr-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {value}
                  </div>
                  <div className="flex-1 border-t border-black/10"></div>
                </div>
              );
            })}

            {/* 柱状图 */}
            <div className="absolute inset-0 pl-14 flex gap-2">
              {monthlyData.map((month, index) => {
                const meaningfulHeight = (month.meaningfulDays / maxValue) * 100;
                const notMeaningfulHeight = (month.notMeaningfulDays / maxValue) * 100;
                const noCheckInHeight = (month.noCheckInDays / maxValue) * 100;

                return (
                  <motion.div
                    key={month.month}
                    className="flex-1 flex flex-col justify-end items-center gap-0.5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    {/* 柱子组 */}
                    <div className="w-full flex flex-col justify-end items-center">
                      {/* 有意义天数柱 */}
                      {month.meaningfulDays > 0 && (
                        <motion.div
                          className="w-full relative group"
                          style={{ height: `${meaningfulHeight}%`, backgroundColor: '#D43628' }}
                          initial={{ height: 0 }}
                          animate={{ height: `${meaningfulHeight}%` }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black whitespace-nowrap bg-white/80 px-1 rounded"
                               style={{ fontFamily: 'Georgia, serif' }}>
                            {month.meaningfulDays}
                          </div>
                        </motion.div>
                      )}

                      {/* 无意义天数柱 */}
                      {month.notMeaningfulDays > 0 && (
                        <motion.div
                          className="w-full relative group"
                          style={{ height: `${notMeaningfulHeight}%`, backgroundColor: '#E5E7EB' }}
                          initial={{ height: 0 }}
                          animate={{ height: `${notMeaningfulHeight}%` }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black whitespace-nowrap bg-white/80 px-1 rounded"
                               style={{ fontFamily: 'Georgia, serif' }}>
                            {month.notMeaningfulDays}
                          </div>
                        </motion.div>
                      )}

                      {/* 未打卡天数柱 */}
                      {month.noCheckInDays > 0 && (
                        <motion.div
                          className="w-full relative group border border-black/20 bg-white"
                          style={{ height: `${noCheckInHeight}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${noCheckInHeight}%` }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black whitespace-nowrap bg-white/80 px-1 rounded"
                               style={{ fontFamily: 'Georgia, serif' }}>
                            {month.noCheckInDays}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 月份标签 */}
                    <div
                      className="text-xs text-black/70 text-center mt-2 font-bold"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {month.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 响应式提示 */}
      <motion.div
        className="text-xs text-black/50 text-center mt-4"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        💡 柱状图显示各月份数据统计
      </motion.div>
    </motion.div>
  );
}
