/**
 * 打卡服务
 * 封装每日打卡相关的业务逻辑
 * 使用 UTC+8 时区，确保一天只能打卡一次
 */

import { ReflectionService } from './storage';
import type { Reflection, StructuredReflectionData } from './db';
import { getTodayDateUTC8, isTodayUTC8 } from '@/lib/utils/date';

/**
 * 每日打卡数据接口
 */
export interface DailyCheckIn {
  /** 日期 YYYY-MM-DD */
  date: string;
  /** 是否有意义的一天 */
  meaningful: boolean;
  /** 用户原始文字 */
  originalText: string;
  /** AI整理 */
  aiSummary?: StructuredReflectionData;
  /** 照片URL列表（base64） */
  photos: string[];
  /** 时间戳 */
  timestamp: number;
}

/**
 * 打卡服务类
 */
export class CheckInService {
  /**
   * 保存打卡数据
   * 使用 UTC+8 时区，一天只能打卡一次
   * @param walletAddress 钱包地址
   * @param data 打卡数据
   * @param options 选项
   * @param options.skipDailyCheck 是否跳过每日打卡检查（体验模式使用）
   * @returns 保存的记录ID
   * @throws 如果今天已经打卡，抛出错误
   */
  static async saveCheckIn(
    walletAddress: string,
    data: Omit<DailyCheckIn, 'date' | 'timestamp'>,
    options?: { skipDailyCheck?: boolean }
  ): Promise<number> {
    try {
      const today = getTodayDateUTC8(); // 使用 UTC+8 时区的今天

      // 检查今天是否已经打卡（体验模式下跳过）
      if (!options?.skipDailyCheck) {
        const existing = await ReflectionService.getReflectionByDate(today, walletAddress);
        if (existing) {
          throw new Error('今天已经打过卡了，每天只能打卡一次');
        }
      }

      // 准备反思数据
      const reflectionData: Omit<Reflection, 'id' | 'createdAt' | 'updatedAt'> = {
        date: today,
        isMeaningful: data.meaningful,
        rawContent: data.originalText,
        structuredData: data.aiSummary || {
          gains: [],
          losses: [],
          ideas: [],
          emotion: '',
          keywords: [],
        },
        walletAddress,
      };

      // 保存反思数据
      const id = await ReflectionService.saveReflection(reflectionData);

      // TODO: 保存照片数据（可以扩展一个单独的 photos 表）
      if (data.photos && data.photos.length > 0) {
        console.log('[CheckInService] 照片数据:', data.photos.length, '张');
        // 这里可以扩展保存照片的逻辑
      }

      console.log('[CheckInService] 打卡已保存:', id);
      return id;
    } catch (error) {
      console.error('[CheckInService] 保存失败:', error);
      throw error;
    }
  }

  /**
   * 获取今日打卡数据（UTC+8）
   * @param walletAddress 钱包地址
   */
  static async getTodayCheckIn(walletAddress: string): Promise<Reflection | undefined> {
    try {
      const today = getTodayDateUTC8(); // 使用 UTC+8 时区的今天
      return await ReflectionService.getReflectionByDate(today, walletAddress);
    } catch (error) {
      console.error('[CheckInService] 获取今日打卡失败:', error);
      throw error;
    }
  }

  /**
   * 检查今日是否已打卡（UTC+8）
   * @param walletAddress 钱包地址
   */
  static async hasCheckedInToday(walletAddress: string): Promise<boolean> {
    try {
      const todayCheckIn = await this.getTodayCheckIn(walletAddress);
      return !!todayCheckIn;
    } catch (error) {
      console.error('[CheckInService] 检查打卡状态失败:', error);
      return false;
    }
  }

  /**
   * 删除打卡记录
   * @param id 记录ID
   * @param walletAddress 钱包地址（用于验证权限）
   */
  static async deleteCheckIn(id: number, walletAddress: string): Promise<void> {
    try {
      // 验证权限
      const reflection = await ReflectionService.getReflectionById(id);
      if (!reflection) {
        throw new Error('打卡记录不存在');
      }
      if (reflection.walletAddress !== walletAddress) {
        throw new Error('无权删除此打卡记录');
      }

      await ReflectionService.deleteReflection(id);
      console.log('[CheckInService] 打卡已删除:', id);
    } catch (error) {
      console.error('[CheckInService] 删除失败:', error);
      throw error;
    }
  }

  /**
   * 获取最近的打卡记录
   * @param walletAddress 钱包地址
   * @param limit 数量限制
   */
  static async getRecentCheckIns(
    walletAddress: string,
    limit: number = 10
  ): Promise<Reflection[]> {
    try {
      return await ReflectionService.getRecentReflections(walletAddress, limit);
    } catch (error) {
      console.error('[CheckInService] 获取最近打卡失败:', error);
      throw error;
    }
  }

  /**
   * 获取指定日期范围的打卡记录
   * @param walletAddress 钱包地址
   * @param startDate 开始日期 YYYY-MM-DD
   * @param endDate 结束日期 YYYY-MM-DD
   */
  static async getCheckInsByDateRange(
    walletAddress: string,
    startDate: string,
    endDate: string
  ): Promise<Reflection[]> {
    try {
      const allReflections = await ReflectionService.getAllReflections(walletAddress);
      return allReflections.filter(
        (r) => r.date >= startDate && r.date <= endDate
      );
    } catch (error) {
      console.error('[CheckInService] 获取日期范围打卡失败:', error);
      throw error;
    }
  }

  /**
   * 统计有意义的天数
   * 自动去重同一天的多条记录（只保留最新的一条）
   * @param walletAddress 钱包地址
   * @param startDate 开始日期 YYYY-MM-DD（可选）
   * @param endDate 结束日期 YYYY-MM-DD（可选）
   */
  static async getMeaningfulDaysStats(
    walletAddress: string,
    startDate?: string,
    endDate?: string
  ): Promise<{
    total: number;
    meaningful: number;
    ratio: number;
  }> {
    try {
      let reflections: Reflection[];

      if (startDate && endDate) {
        reflections = await this.getCheckInsByDateRange(walletAddress, startDate, endDate);
      } else {
        reflections = await ReflectionService.getAllReflections(walletAddress);
      }

      // 按日期去重，只保留每天最新的一条记录
      const latestByDate = new Map<string, Reflection>();
      reflections.forEach((r) => {
        const existing = latestByDate.get(r.date);
        if (!existing || r.id > existing.id) {
          latestByDate.set(r.date, r);
        }
      });

      const uniqueReflections = Array.from(latestByDate.values());
      const total = uniqueReflections.length;
      const meaningful = uniqueReflections.filter((r) => r.isMeaningful).length;
      const ratio = total > 0 ? Math.round((meaningful / total) * 100) : 0;

      return { total, meaningful, ratio };
    } catch (error) {
      console.error('[CheckInService] 统计有意义天数失败:', error);
      throw error;
    }
  }
}
