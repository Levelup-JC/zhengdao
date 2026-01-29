/**
 * 演示数据系统类型定义
 * 用于生成虚拟用户和历史数据，支持营销和推广场景
 */

import { Reflection, StructuredReflectionData, UserAchievement } from './achievement';

/**
 * 虚拟用户画像
 */
export interface DemoUserProfile {
  id: string; // 钱包地址（模拟）
  name: string; // 显示名称
  avatar: string; // 头像URL
  joinDate: Date; // 加入日期
  activityLevel: 'high' | 'medium' | 'low'; // 活跃度
  writingStyle: 'detailed' | 'concise' | 'balanced'; // 写作风格
  interests: InterestType[]; // 兴趣领域
  baseEmotion: EmotionType; // 基础情绪倾向
  personalityType: 'optimistic' | 'neutral' | 'pessimistic'; // 性格类型
  targetLevel: number; // 目标等级（1-6）
  currentLevel: number; // 当前等级
  checkInDays: number; // 当前打卡天数
}

/**
 * 兴趣领域类型
 */
export type InterestType =
  | 'work' // 工作
  | 'health' // 健康
  | 'wealth' // 财务
  | 'learning' // 学习
  | 'growth' // 成长
  | 'family' // 家庭
  | 'social'; // 社交

/**
 * 情绪类型
 */
export type EmotionType = '积极' | '平静' | '焦虑' | '疲惫';

/**
 * 内容主题
 */
export type ContentTheme =
  | 'work'
  | 'health'
  | 'finance'
  | 'learning'
  | 'social';

/**
 * 内容模板
 */
export interface ContentTemplate {
  theme: ContentTheme;
  style: 'detailed' | 'concise';
  template: string; // 包含占位符的模板
  defaultEmotion: EmotionType;
  keywords: string[];
}

/**
 * 演示数据生成配置
 */
export interface DemoDataConfig {
  userCount: number; // 用户数量（100-500）
  daysPerUser: number; // 每用户天数（30-90）
  levelDistribution: number[]; // 等级分布 [L1%, L2%, ..., L6%]
  emotionDistribution: Record<EmotionType, number>; // 情绪分布
  checkInProbability: number; // 打卡概率（0.6-0.9）
  meaningfulProbability: number; // 有意义概率（0.5-0.8）
  startDate: Date; // 开始日期
}

/**
 * 内容数据统计
 */
export interface ContentAnalytics {
  totalCheckIns: number; // 总打卡数
  uniqueUsers: number; // 活跃用户数
  emotionDistribution: Record<string, number>; // 情绪分布（百分比）
  keywordFrequency: Array<{ word: string; count: number }>; // 关键词频率
  averageWordCount: number; // 平均字数
  meaningfulRate: number; // 有意义率（百分比）
  dailyTrend: Array<{ date: string; count: number }>; // 日趋势
  weeklyTrend: Array<{ week: string; count: number }>; // 周趋势
  monthlyTrend: Array<{ month: string; count: number }>; // 月趋势
}

/**
 * 成就数据统计
 */
export interface AchievementAnalytics {
  totalUsers: number; // 总用户数
  levelDistribution: Record<number, number>; // 等级分布
  sbtClaimRate: number; // SBT领取率（百分比）
  averageLevel: number; // 平均等级
  averageCheckInDays: number; // 平均打卡天数
  topUsers: UserWithStats[]; // Top 10用户
  growthRate: number; // 增长率（百分比）
  newUsersThisWeek: number; // 本周新增用户
  newUsersThisMonth: number; // 本月新增用户
}

/**
 * 带统计信息的用户
 */
export interface UserWithStats extends DemoUserProfile {
  totalReflections: number; // 总反思数
  meaningfulCount: number; // 有意义天数
  meaningfulRate: number; // 有意义率
  lastActiveDate: Date; // 最后活跃日期
  favoriteEmotion: EmotionType; // 最常用情绪
  topKeywords: string[]; // 常用关键词
}

/**
 * 导出格式
 */
export type ExportFormat = 'json' | 'csv' | 'png';

/**
 * 导出数据
 */
export interface ExportData {
  reflections: Reflection[];
  achievements: UserAchievement[];
  analytics: {
    content: ContentAnalytics;
    achievement: AchievementAnalytics;
  };
  generatedAt: Date; // 生成时间
  config: DemoDataConfig; // 生成配置
}

/**
 * 等级定义
 */
export interface AchievementLevel {
  level: number; // 等级（1-6）
  name: string; // 等级名称
  nameEn: string; // 英文名称
  requiredDays: number; // 需要的天数
  description: string; // 描述
  color: string; // 代表颜色
}

/**
 * 情绪故事线事件
 */
export interface EmotionEvent {
  day: number; // 发生在第几天
  type: 'peak' | 'valley' | 'normal'; // 事件类型
  magnitude: number; // 影响幅度（-1到1）
}

/**
 * 生成进度
 */
export interface GenerationProgress {
  current: number; // 当前进度
  total: number; // 总数
  user: string; // 当前用户名称
  stage: 'users' | 'data' | 'saving'; // 当前阶段
}

/**
 * 数据质量指标
 */
export interface DataQualityMetrics {
  totalReflections: number;
  uniqueReflections: number; // 不重复的内容数
  duplicateRate: number; // 重复率（百分比）
  emotionVariety: number; // 情绪种类数
  keywordVariety: number; // 关键词种类数
  averageWordCount: number;
  qualityScore: number; // 质量评分（0-100）
}

/**
 * 默认演示数据配置
 */
export const DEFAULT_DEMO_CONFIG: DemoDataConfig = {
  userCount: 100,
  daysPerUser: 60,
  levelDistribution: [40, 25, 15, 10, 7, 3], // L1:40%, L2:25%, L3:15%, L4:10%, L5:7%, L6:3%
  emotionDistribution: {
    '积极': 50,
    '平静': 30,
    '焦虑': 12,
    '疲惫': 8
  },
  checkInProbability: 0.8,
  meaningfulProbability: 0.7,
  startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60天前
};
