'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
  PeriodSelector,
  StatsSummary,
  AIReviewSummary,
  GoalComparison,
  ProblemAnalysis,
  MonthlyBarChart,
} from '@/components/review';
import { CalendarStats } from '@/components/review/CalendarStats';
import {
  YesNoRatioChart,
  CheckInTrendChart,
  MeaningfulDaysTrend,
} from '@/components/charts';
import {
  getReviewStats,
  getGoalComparisonData,
  analyzeProblemMonths,
} from '@/lib/review-service';
import { aggregateMeaningfulDays } from '@/lib/chart-utils';

type PeriodType = '7d' | '30d' | '6m' | '1y';

export default function ReviewPeriodPage() {
  const router = useRouter();
  const { address } = useAccount();
  const params = useParams();
  const period = (params.period as PeriodType) || '7d';

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // 年度复盘专用状态
  const [goalData, setGoalData] = useState<any>(null);
  const [goalAnalysis, setGoalAnalysis] = useState('');
  const [problemAnalysis, setProblemAnalysis] = useState('');
  const [isYearlyAnalysisLoading, setIsYearlyAnalysisLoading] = useState(false);

  // 加载基础统计数据
  useEffect(() => {
    async function loadStats() {
      // 确保钱包地址存在且有效
      if (!address || address.length === 0) {
        console.log('[Review] 钱包地址未连接，跳过数据加载');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log('[Review] 开始加载复盘数据', { period, address });
        const reviewStats = await getReviewStats(period, address);
        console.log('[Review] 复盘数据加载成功', reviewStats);
        setStats(reviewStats);

        // 生成AI总结（通过API）
        setIsAiLoading(true);
        try {
          const response = await fetch('/api/review/ai-summary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              period,
              stats: reviewStats,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setAiSummary(data.summary);
          } else {
            console.error('AI总结生成失败:', await response.text());
            setAiSummary('暂时无法生成AI总结，请稍后再试。');
          }
        } catch (error) {
          console.error('AI总结生成失败:', error);
          setAiSummary('暂时无法生成AI总结，请稍后再试。');
        } finally {
          setIsAiLoading(false);
        }
      } catch (error) {
        console.error('加载复盘数据失败:', error);
        // 设置默认空数据，避免页面卡住
        setStats({
          totalDays: 0,
          yesDays: 0,
          noDays: 0,
          yesRatio: 0,
          totalWords: 0,
          avgWords: 0,
          meaningfulSummaries: [],
          dailyData: [],
        });
        setIsAiLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [period, address]);

  // 加载年度复盘专用数据
  useEffect(() => {
    async function loadYearlyData() {
      if (period !== '1y' || !address || address.length === 0) {
        console.log('[Review] 跳过年度复盘数据加载', { period, hasAddress: !!address });
        return;
      }

      setIsYearlyAnalysisLoading(true);
      try {
        console.log('[Review] 开始加载年度复盘数据', address);
        const comparisonData = await getGoalComparisonData(address);
        console.log('[Review] 年度复盘数据加载成功', comparisonData);
        setGoalData(comparisonData);

        // 生成目标对比分析（通过API）
        try {
          const goalResponse = await fetch('/api/review/goal-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              comparisonData,
            }),
          });

          if (goalResponse.ok) {
            const goalData = await goalResponse.json();
            setGoalAnalysis(goalData.analysis);
          } else {
            console.error('目标对比分析生成失败:', await goalResponse.text());
            setGoalAnalysis('暂时无法生成目标对比分析，请稍后再试。');
          }
        } catch (error) {
          console.error('目标对比分析生成失败:', error);
          setGoalAnalysis('暂时无法生成目标对比分析，请稍后再试。');
        }

        // 分析问题月份（通过API）
        const problemMonths = analyzeProblemMonths(comparisonData.monthlyData);
        try {
          const problemResponse = await fetch('/api/review/problem-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              problemMonths,
            }),
          });

          if (problemResponse.ok) {
            const problemData = await problemResponse.json();
            setProblemAnalysis(problemData.analysis);
          } else {
            console.error('问题分析报告生成失败:', await problemResponse.text());
            setProblemAnalysis('暂时无法生成问题分析报告，请稍后再试。');
          }
        } catch (error) {
          console.error('问题分析报告生成失败:', error);
          setProblemAnalysis('暂时无法生成问题分析报告，请稍后再试。');
        }
      } catch (error) {
        console.error('加载年度复盘数据失败:', error);
        // 设置默认空数据
        setGoalData({
          goals: [],
          yearlyStats: {
            totalDays: 0,
            meaningfulDays: 0,
            meaningfulRatio: 0,
          },
          monthlyData: [],
        });
      } finally {
        setIsYearlyAnalysisLoading(false);
      }
    }

    loadYearlyData();
  }, [period, address]);

  // 生成图表数据
  const generateChartData = () => {
    if (!stats) return null;

    // 是/否比例图数据
    const yesNoData = { yes: stats.yesDays, no: stats.noDays };

    // 有意义天数趋势数据
    const trendData = aggregateMeaningfulDays(
      // 这里需要传入完整的打卡数据，暂时使用mock数据
      [],
      period === '6m' || period === '1y' ? 'month' : 'week'
    );

    return { yesNoData, trendData };
  };

  const chartData = generateChartData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-black/20 border-t-[#D43628] rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <p className="text-black/60" style={{ fontFamily: 'Georgia, serif' }}>
                加载复盘数据...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const periodLabel: Record<string, string> = {
    '7d': '7日复盘',
    '30d': '30日复盘',
    '6m': '半年复盘',
    '1y': '年度复盘',
  };

  return (
    <div className="min-h-screen bg-[#FFFEF2] p-6">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/check-in')}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border-2 border-ink/30 text-ink font-bold hover:bg-ink/5 transition-colors"
          style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回打卡
        </motion.button>

        {/* 页面标题 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {periodLabel[period]}
          </h1>
          <p className="text-black/60" style={{ fontFamily: 'Georgia, serif' }}>
            回顾过去，展望未来
          </p>
        </motion.div>

        {/* 周期选择器 */}
        <PeriodSelector currentPeriod={period} />

        {/* 内容网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 统计摘要 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {stats && <StatsSummary {...stats} />}
          </motion.div>

          {/* 是/否比例图 */}
          {chartData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <YesNoRatioChart data={chartData.yesNoData} period={period} />
            </motion.div>
          )}

          {/* 日历视图 / 月度柱状图 */}
          {stats && stats.dailyData && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {period === '1y' ? (
                <MonthlyBarChart checkInData={stats.dailyData} />
              ) : (
                <CalendarStats period={period} checkInData={stats.dailyData} />
              )}
            </motion.div>
          )}

          {/* AI复盘总结 */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AIReviewSummary summary={aiSummary} isLoading={isAiLoading} />
          </motion.div>

          {/* 年度复盘专用：目标对比 */}
          {period === '1y' && goalData && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GoalComparison
                goals={goalData.goals}
                yearlyStats={goalData.yearlyStats}
                analysis={goalAnalysis}
                isLoading={isYearlyAnalysisLoading}
              />
            </motion.div>
          )}

          {/* 年度复盘专用：问题分析 */}
          {period === '1y' && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ProblemAnalysis
                problemMonths={analyzeProblemMonths(goalData?.monthlyData || [])}
                analysis={problemAnalysis}
                isLoading={isYearlyAnalysisLoading}
              />
            </motion.div>
          )}
        </div>

        {/* 提示信息 */}
        <motion.div
          className="mt-8 p-4 bg-black/5 border-2 border-black/20 text-center"
          style={{ borderRadius: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-black/70" style={{ fontFamily: 'Georgia, serif' }}>
            坚持打卡，让每一天都更有意义。复盘不是为了自责，而是为了成长。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
