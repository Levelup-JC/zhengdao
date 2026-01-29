/**
 * 多用户数据生成引擎
 * 核心功能：生成逼真的多用户反思数据和成就数据
 */

import { db } from './db';
import {
  DemoUserProfile,
  DemoDataConfig,
  Reflection,
  EmotionType,
  StructuredReflectionData,
  GenerationProgress,
} from '@/types/demo-data';
import {
  generateDemoUsers,
  getCheckInProbability,
  getMeaningfulProbability,
} from './demo-user-profiles';
import {
  selectTemplate,
  fillTemplate,
  generateKeywords,
  generateEmotionTrend,
} from './demo-content-templates';

/**
 * 演示数据生成器
 */
export class DemoDataGenerator {
  private config: DemoDataConfig;
  private users: DemoUserProfile[] = [];
  private onProgress?: (progress: GenerationProgress) => void;

  constructor(config: DemoDataConfig) {
    this.config = config;
  }

  /**
   * 设置进度回调
   */
  setProgressCallback(callback: (progress: GenerationProgress) => void): void {
    this.onProgress = callback;
  }

  /**
   * 生成所有数据
   */
  async generateAll(): Promise<void> {
    // Step 1: 生成用户
    this.reportProgress({ current: 0, total: this.config.userCount, user: '创建用户...', stage: 'users' });
    this.users = generateDemoUsers(this.config.userCount, this.config.levelDistribution);

    // Step 2: 为每个用户生成数据
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      this.reportProgress({
        current: i + 1,
        total: this.users.length,
        user: user.name,
        stage: 'data',
      });

      const reflections = await this.generateUserData(user);

      // 批量保存（每10个用户一批）
      if ((i + 1) % 10 === 0 || i === this.users.length - 1) {
        await this.saveBatchData(reflections);
      }
    }

    // Step 3: 生成成就数据
    this.reportProgress({ current: 0, total: this.users.length, user: '生成成就数据...', stage: 'saving' });
    await this.generateAchievements();
  }

  /**
   * 为单个用户生成数据
   */
  async generateUserData(user: DemoUserProfile): Promise<Reflection[]> {
    const reflections: Reflection[] = [];
    const today = new Date();
    const emotionTrend = generateEmotionTrend(
      this.config.daysPerUser,
      user.personalityType,
      user.baseEmotion
    );

    // 倒推天数，生成历史数据
    for (let i = 0; i < this.config.daysPerUser; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // 根据活跃度决定是否打卡
      const checkInProb = getCheckInProbability(user.activityLevel);
      if (Math.random() > checkInProb) {
        continue; // 跳过未打卡的日子
      }

      // 生成单条反思
      const reflection = await this.generateOneReflection(user, date, emotionTrend[i]);
      reflections.push(reflection);
    }

    return reflections.reverse(); // 按时间正序
  }

  /**
   * 生成单条反思
   */
  private async generateOneReflection(
    user: DemoUserProfile,
    date: Date,
    emotion: EmotionType
  ): Promise<Reflection> {
    // 选择模板
    const template = selectTemplate(user.interests, user.writingStyle);

    // 填充模板内容
    const rawContent = fillTemplate(template.template);

    // 生成结构化数据
    const structuredData = this.generateStructuredData(user, rawContent, emotion);

    // 决定是否有意义
    const meaningfulProb = getMeaningfulProbability(user.personalityType);
    const isMeaningful = Math.random() < meaningfulProb;

    return {
      date: date.toISOString().split('T')[0],
      isMeaningful,
      rawContent,
      structuredData,
      walletAddress: user.id,
      createdAt: date,
      updatedAt: date,
    };
  }

  /**
   * 生成结构化数据
   */
  private generateStructuredData(
    user: DemoUserProfile,
    rawContent: string,
    emotion: EmotionType
  ): StructuredReflectionData {
    // 从模板获取关键词
    const template = selectTemplate(user.interests, user.writingStyle);
    const keywords = generateKeywords(user.interests, template.keywords);

    // 根据写作风格决定内容长度
    const gainsLength = user.writingStyle === 'detailed' ? 3 : 2;
    const lossesLength = user.writingStyle === 'detailed' ? 3 : 1;
    const ideasLength = 2;

    return {
      gains: this.generateList('gains', gainsLength, rawContent),
      losses: this.generateList('losses', lossesLength, rawContent),
      ideas: this.generateList('ideas', ideasLength, rawContent),
      emotion,
      keywords,
    };
  }

  /**
   * 生成列表项（收获/损失/想法）
   */
  private generateList(
    type: 'gains' | 'losses' | 'ideas',
    count: number,
    rawContent: string
  ): string[] {
    const templates = {
      gains: [
        '完成了重要任务',
        '学到了新知识',
        '提升了技能水平',
        '达成了阶段性目标',
        '获得了正向反馈',
        '保持了良好状态',
        '克服了困难挑战',
        '优化了工作流程',
      ],
      losses: [
        '花费了太多时间在琐事上',
        '情绪管理有待提升',
        '计划执行不够彻底',
        '专注力需要加强',
        '沟通效率可以更高',
        '休息时间不足',
        '运动量不够',
        '阅读时间偏少',
      ],
      ideas: [
        '尝试新的时间管理方法',
        '建立更有效的沟通机制',
        '优化日常工作流程',
        '增加运动和休息时间',
        '培养深度工作习惯',
        '定期复盘总结',
        '保持学习热情',
        '拓展社交圈子',
      ],
    };

    const options = templates[type];
    return options.sort(() => Math.random() - 0.5).slice(0, count);
  }

  /**
   * 批量保存数据
   */
  private async saveBatchData(reflections: Reflection[]): Promise<void> {
    try {
      await db.reflections.bulkAdd(reflections);
    } catch (error) {
      console.error('批量保存失败:', error);
      throw error;
    }
  }

  /**
   * 生成成就数据
   */
  private async generateAchievements(): Promise<void> {
    const achievements = this.users.map(user => ({
      walletAddress: user.id,
      chain: 'bnb' as const,
      currentLevel: user.currentLevel,
      totalCheckInDays: user.checkInDays,
      sbtClaimed: this.generateSBTClaimStatus(user.currentLevel),
      lastUpdated: new Date(),
    }));

    await db.userAchievements.bulkAdd(achievements);
  }

  /**
   * 生成SBT领取状态
   */
  private generateSBTClaimStatus(currentLevel: number): boolean[] {
    const status: boolean[] = [];
    for (let i = 1; i <= 6; i++) {
      status.push(i <= currentLevel);
    }
    return status;
  }

  /**
   * 报告进度
   */
  private reportProgress(progress: GenerationProgress): void {
    if (this.onProgress) {
      this.onProgress(progress);
    }
  }

  /**
   * 清空所有演示数据
   */
  static async clearAll(): Promise<void> {
    await db.reflections.clear();
    await db.userAchievements.clear();
    await db.checkInRecords.clear();
  }

  /**
   * 导出数据为JSON
   */
  static async exportToJSON(): Promise<string> {
    const reflections = await db.reflections.toArray();
    const achievements = await db.userAchievements.toArray();

    return JSON.stringify(
      {
        reflections,
        achievements,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }

  /**
   * 导出数据为CSV
   */
  static async exportToCSV(): Promise<string> {
    const reflections = await db.reflections.toArray();

    if (reflections.length === 0) return '';

    const headers = ['date', 'walletAddress', 'isMeaningful', 'emotion', 'rawContent'];
    const rows = reflections.map(r => [
      r.date,
      r.walletAddress,
      r.isMeaningful ? 'Yes' : 'No',
      r.structuredData.emotion,
      `"${r.rawContent.replace(/"/g, '""')}"`, // CSV 转义
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

/**
 * 默认配置
 */
export const DEFAULT_DEMO_CONFIG: DemoDataConfig = {
  userCount: 200,
  daysPerUser: 60,
  levelDistribution: [40, 30, 15, 10, 4, 1],
  emotionDistribution: {
    积极: 35,
    平静: 40,
    焦虑: 15,
    疲惫: 10,
  },
  checkInProbability: 0.8,
  meaningfulProbability: 0.7,
  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90天前
};

/**
 * 快速生成函数（使用默认配置）
 */
export async function generateQuickDemo(
  userCount: number = 200,
  onProgress?: (progress: GenerationProgress) => void
): Promise<void> {
  const generator = new DemoDataGenerator({
    ...DEFAULT_DEMO_CONFIG,
    userCount,
  });

  if (onProgress) {
    generator.setProgressCallback(onProgress);
  }

  await generator.generateAll();
}

/**
 * 生成质量指标
 */
export async function getDataQualityMetrics() {
  const reflections = await db.reflections.toArray();

  if (reflections.length === 0) {
    return {
      totalReflections: 0,
      uniqueReflections: 0,
      duplicateRate: 0,
      emotionVariety: 0,
      keywordVariety: 0,
      averageWordCount: 0,
      qualityScore: 0,
    };
  }

  // 计算不重复内容数
  const uniqueContent = new Set(reflections.map(r => r.rawContent));
  const duplicateRate = ((reflections.length - uniqueContent.size) / reflections.length) * 100;

  // 计算情绪种类
  const emotions = new Set(reflections.map(r => r.structuredData.emotion));

  // 计算关键词种类
  const allKeywords = reflections.flatMap(r => r.structuredData.keywords);
  const uniqueKeywords = new Set(allKeywords);

  // 计算平均字数
  const avgWordCount = reflections.reduce((sum, r) => sum + r.rawContent.length, 0) / reflections.length;

  // 质量评分（0-100）
  const qualityScore = calculateQualityScore({
    duplicateRate,
    emotionVariety: emotions.size,
    keywordVariety: uniqueKeywords.size,
    avgWordCount,
  });

  return {
    totalReflections: reflections.length,
    uniqueReflections: uniqueContent.size,
    duplicateRate,
    emotionVariety: emotions.size,
    keywordVariety: uniqueKeywords.size,
    averageWordCount: avgWordCount,
    qualityScore,
  };
}

/**
 * 计算质量评分
 */
function calculateQualityScore(metrics: {
  duplicateRate: number;
  emotionVariety: number;
  keywordVariety: number;
  avgWordCount: number;
}): number {
  let score = 100;

  // 重复率扣分
  score -= metrics.duplicateRate * 0.5;

  // 情绪多样性加分
  score += Math.min(metrics.emotionVariety * 5, 20);

  // 关键词多样性加分
  score += Math.min(metrics.keywordVariety * 0.5, 15);

  // 字数合理性扣分/加分
  if (metrics.avgWordCount < 30) score -= 10;
  if (metrics.avgWordCount > 50 && metrics.avgWordCount < 150) score += 5;

  return Math.max(0, Math.min(100, score));
}
