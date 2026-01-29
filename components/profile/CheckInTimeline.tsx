'use client';

/**
 * 打卡时间线组件
 * 按日期倒序展示打卡记录，支持删除操作
 * 如果删除了今天的打卡，显示重新打卡按钮
 */

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { ReflectionService } from '@/lib/storage';
import { CheckInService } from '@/lib/check-in-service';
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { demoReflections } from '@/lib/demo-data';
import type { Reflection } from '@/lib/db';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getTodayDateUTC8, isTodayUTC8 } from '@/lib/utils/date';

interface CheckInTimelineProps {
  /** 限制数量 */
  limit?: number;
}

export function CheckInTimeline({ limit = 10 }: CheckInTimelineProps) {
  const { address } = useAccount();
  const router = useRouter();
  const { isSkipMode } = useSkipMode();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /** 加载打卡记录 */
  useEffect(() => {
    const loadReflections = async () => {
      setLoading(true);

      try {
        // 游客模式：使用演示数据
        if (isSkipMode) {
          console.log('[CheckInTimeline] 游客模式，使用演示数据');
          setReflections(demoReflections.slice(0, limit));
        }
        // 真实用户：从数据库加载
        else if (address) {
          const data = await ReflectionService.getRecentReflections(address, limit);
          setReflections(data);
        }
      } catch (error) {
        console.error('[CheckInTimeline] 加载失败:', error);
      } finally {
        setLoading(false);
      }
    };

    // 只有在连接钱包或游客模式时才加载
    if (address || isSkipMode) {
      loadReflections();
    } else {
      setLoading(false);
    }
  }, [address, limit, isSkipMode]);

  /** 删除打卡记录 */
  const handleDelete = async (id: number, date: string) => {
    if (!address) return;

    // 确认对话框
    const confirmed = window.confirm(
      `确定要删除 ${date} 的打卡记录吗？`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);

      // 删除记录
      await CheckInService.deleteCheckIn(id, address);

      // 重新加载列表
      const data = await ReflectionService.getRecentReflections(address, limit);
      setReflections(data);

      toast.success('打卡记录已删除');

      // 如果删除的是今天的记录，提示可以重新打卡
      if (isTodayUTC8(date)) {
        toast('今天可以重新打卡了', {
          icon: '✅',
          style: {
            borderRadius: '0',
            background: '#FFFEF2',
            color: '#1a1a2e',
          },
        });
      }
    } catch (error: any) {
      console.error('[CheckInTimeline] 删除失败:', error);
      toast.error(error.message || '删除失败，请重试');
    } finally {
      setDeletingId(null);
    }
  };

  /** 检查今天是否已打卡 */
  const hasCheckedToday = () => {
    if (isSkipMode) return false; // 游客模式总是可以打卡
    return reflections.some(r => isTodayUTC8(r.date));
  };

  /** 格式化日期 */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    // 始终显示具体日期
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric',
    });
  };

  /** 格式化星期 */
  const formatWeekday = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
  };

  if (loading) {
    return (
      <div className="bg-paper border-2 border-ink/20 p-6">
        <div className="text-center text-ink/60">加载中...</div>
      </div>
    );
  }

  if (reflections.length === 0) {
    return (
      <div className="bg-paper border-2 border-ink/20 p-6 text-center">
        <p className="text-ink/60 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          还没有打卡记录
        </p>
        <button
          onClick={() => router.push('/check-in')}
          className="px-6 py-2 bg-ink text-paper font-bold"
          style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
        >
          开始打卡
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* 标题 */}
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          打卡记录
        </h2>
        <button
          onClick={() => router.push('/analytics')}
          className="text-sm text-ink/60 hover:text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          查看全部
        </button>
      </div>

      {/* 时间线 */}
      <div className="space-y-3">
        {reflections.map((reflection, index) => {
          const isDeleting = deletingId === reflection.id;

          return (
            <motion.div
              key={reflection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-paper border-2 border-ink/20 p-4 hover:border-ink/40 transition-colors relative group"
            >
              <div
                className="flex gap-4 cursor-pointer"
                onClick={() => router.push('/analytics')}
              >
                {/* 日期 */}
                <div className="flex-shrink-0 text-center w-16">
                  <div className="text-xs text-ink/60 mb-1">
                    {formatWeekday(reflection.date)}
                  </div>
                  <div className="text-base font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
                    {formatDate(reflection.date)}
                  </div>
                </div>

                {/* 分隔线 */}
                <div className="w-px bg-ink/20 flex-shrink-0" />

                {/* 内容 */}
                <div className="flex-1 min-w-0 pr-8">
                  {/* 标签 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold ${
                        reflection.isMeaningful
                          ? 'bg-seal/20 text-seal'
                          : 'bg-ink/10 text-ink/60'
                      }`}
                    >
                      {reflection.isMeaningful ? '有意义' : '需改进'}
                    </span>
                    <span className="text-xs text-ink/40">
                      {reflection.rawContent.length} 字
                    </span>
                    {reflection.photos && reflection.photos.length > 0 && (
                      <span className="text-xs text-ink/40">
                        📷 {reflection.photos.length}
                      </span>
                    )}
                  </div>

                  {/* 照片预览 */}
                  {reflection.photos && reflection.photos.length > 0 && (
                    <div className="flex gap-2 mb-2 overflow-x-auto">
                      {reflection.photos.slice(0, 3).map((photo, photoIndex) => (
                        <div
                          key={`${reflection.id}-photo-${photoIndex}`}
                          className="flex-shrink-0 w-16 h-16 rounded border-2 border-ink/20 overflow-hidden cursor-pointer hover:border-seal transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 可以添加点击放大功能
                          }}
                        >
                          <img
                            src={`data:image/jpeg;base64,${photo}`}
                            alt={`Photo ${photoIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {reflection.photos.length > 3 && (
                        <div className="flex-shrink-0 w-16 h-16 rounded border-2 border-ink/20 bg-ink/5 flex items-center justify-center text-xs text-ink/60">
                          +{reflection.photos.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 摘要 */}
                  <p className="text-xs text-ink/80 leading-relaxed break-words">
                    {reflection.rawContent}
                  </p>

                  {/* 关键词 */}
                  {reflection.structuredData.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {reflection.structuredData.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={`${reflection.id}-${keyword}`}
                          className="text-xs text-ink/60"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 删除按钮 - 悬停时显示 */}
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(reflection.id, reflection.date);
                }}
                disabled={isDeleting}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="删除打卡记录"
              >
                {isDeleting ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
