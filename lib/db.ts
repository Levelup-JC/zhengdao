/**
 * IndexedDB 数据库初始化和 Schema 定义
 * 使用 Dexie.js 作为封装库
 */

import Dexie, { Table } from 'dexie';

/**
 * 反思数据结构化提取结果
 */
export interface StructuredReflectionData {
  /** 收获 - 学到了什么、做到了什么 */
  gains: string[];
  /** 损失 - 浪费了什么、犯了什么错 */
  losses: string[];
  /** 想法 - 闪现的灵感、新的想法 */
  ideas: string[];
  /** 情绪标签 - 积极/平静/焦虑/疲惫 */
  emotion: string;
  /** 关键词 - 3-5个最重要的关键词 */
  keywords: string[];
}

/**
 * 每日反思数据表结构
 */
export interface Reflection {
  /** 自增主键 */
  id?: number;
  /** 日期 YYYY-MM-DD */
  date: string;
  /** 今天有意义吗? Yes/No */
  isMeaningful: boolean;
  /** 用户原始输入内容 */
  rawContent: string;
  /** AI提取的结构化数据 */
  structuredData: StructuredReflectionData;
  /** 用户钱包地址 */
  walletAddress: string;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 照片数组（Base64编码） */
  photos?: string[];
}

/**
 * 月度统计数据
 */
export interface MonthlyStats {
  /** 本月总天数 */
  totalDays: number;
  /** 复盘天数 */
  reflectionCount: number;
  /** 有意义天数 */
  meaningfulCount: number;
  /** 有意义率 (0-100) */
  meaningfulRate: number;
  /** 情绪分布 */
  emotions: Record<string, number>;
  /** 关键词频率 */
  keywords: Record<string, number>;
  /** 所有收获 */
  allGains: string[];
  /** 所有损失 */
  allLosses: string[];
  /** 所有想法 */
  allIdeas: string[];
}

/**
 * 用户成就数据表结构
 */
export interface UserAchievement {
  /** 自增主键 */
  id?: number;
  /** 用户钱包地址 */
  walletAddress: string;
  /** 链类型 (bnb/solana) */
  chain: 'bnb' | 'solana';
  /** 当前等级 (1-6) */
  currentLevel: number;
  /** 总打卡天数 */
  totalCheckInDays: number;
  /** SBT领取记录 [false, true, false, ...] 索引0=level1 */
  sbtClaimed: boolean[];
  /** 最后更新时间 */
  lastUpdated: Date;
}

/**
 * 打卡记录表结构
 */
export interface CheckInRecord {
  /** 自增主键 */
  id?: number;
  /** 用户钱包地址 */
  walletAddress: string;
  /** 链类型 (bnb/solana) */
  chain: 'bnb' | 'solana';
  /** 打卡日期 YYYY-MM-DD */
  checkInDate: string;
  /** 打卡时的等级 */
  levelAtTime: number;
  /** 时间戳 */
  timestamp: Date;
}

/**
 * SBT铸造记录表结构
 */
export interface SBTMintRecord {
  /** 自增主键 */
  id?: number;
  /** 用户钱包地址 */
  walletAddress: string;
  /** 链类型 (bnb/solana) */
  chain: 'bnb' | 'solana';
  /** 等级 (1-6) */
  level: number;
  /** 交易哈希 */
  txHash: string;
  /** metadata URI */
  metadataURI: string;
  /** 铸造时间 */
  mintedAt: Date;
}

/**
 * 人生目标表结构
 */
export interface LifeGoal {
  /** 自增主键 */
  id?: number;
  /** 用户钱包地址 */
  walletAddress: string;
  /** 财富目标 */
  wealthGoals: WealthGoal;
  /** 健康目标 */
  healthGoals: HealthGoal;
  /** 家庭目标 */
  familyGoals: FamilyGoal;
  /** 其他目标 */
  otherGoals: OtherGoal;
  /** 问卷完成时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
}

/**
 * 财富目标
 */
export interface WealthGoal {
  /** 月收入目标 */
  monthlyIncome: string;
  /** 存款目标 */
  savings: string;
  /** 投资收益目标 */
  investmentReturn: string;
}

/**
 * 健康目标
 */
export interface HealthGoal {
  /** 运动频率 */
  exerciseFrequency: string;
  /** 体重管理目标 */
  weightManagement: string;
  /** 睡眠质量目标 */
  sleepQuality: string;
}

/**
 * 家庭目标
 */
export interface FamilyGoal {
  /** 家庭陪伴时间 */
  familyTime: string;
  /** 亲子关系改善 */
  parentChildRelationship: string;
  /** 伴侣关系维护 */
  partnerRelationship: string;
}

/**
 * 其他目标
 */
export interface OtherGoal {
  /** 学习成长 */
  learningGoals: string[];
  /** 社交关系 */
  socialGoals: string[];
  /** 兴趣爱好 */
  hobbies: string[];
}

/**
 * 证道数据库
 */
export class ZhengDaoDatabase extends Dexie {
  /** 反思数据表 */
  reflections!: Table<Reflection, number>;
  /** 用户成就表 */
  userAchievements!: Table<UserAchievement, number>;
  /** 打卡记录表 */
  checkInRecords!: Table<CheckInRecord, number>;
  /** 人生目标表 */
  lifeGoals!: Table<LifeGoal, number>;
  /** SBT铸造记录表 */
  sbtMintRecords!: Table<SBTMintRecord, number>;

  constructor() {
    super('ZhengDaoDB');

    // 定义数据库版本和表结构
    this.version(1).stores({
      reflections: '++id, [date+walletAddress], createdAt', // 复合索引：date+walletAddress
    });

    // 版本2: 添加成就系统相关表
    this.version(2).stores({
      reflections: '++id, [date+walletAddress], createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp'
    });

    // 数据迁移逻辑: version(1) → version(2)
    this.version(2).upgrade(async tx => {
      console.log('[DB] Upgrading from v1 to v2...');
      // 迁移现有数据（如果需要）
    });

    // 版本3: 添加人生目标表
    this.version(3).stores({
      reflections: '++id, [date+walletAddress], createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp',
      lifeGoals: '++id, walletAddress, createdAt'
    });

    // 数据迁移逻辑: version(2) → version(3)
    this.version(3).upgrade(async tx => {
      console.log('[DB] Upgrading from v2 to v3...');
      // 迁移现有数据（如果需要）
    });

    // 版本4: 添加SBT铸造记录表
    this.version(4).stores({
      reflections: '++id, [date+walletAddress], createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp',
      lifeGoals: '++id, walletAddress, createdAt',
      sbtMintRecords: '++id, [walletAddress+level], chain, txHash, mintedAt'
    });

    // 数据迁移逻辑: version(3) → version(4)
    this.version(4).upgrade(async tx => {
      console.log('[DB] Upgrading from v3 to v4...');
      // 迁移现有数据（如果需要）
    });

    // 版本5: 添加walletAddress单独索引以支持查询
    this.version(5).stores({
      reflections: '++id, walletAddress, [date+walletAddress], createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp',
      lifeGoals: '++id, walletAddress, createdAt',
      sbtMintRecords: '++id, [walletAddress+level], chain, txHash, mintedAt'
    });

    // 数据迁移逻辑: version(4) → version(5)
    this.version(5).upgrade(async tx => {
      console.log('[DB] Upgrading from v4 to v5 - 添加walletAddress单独索引...');
      // 不需要数据迁移，只是索引结构的变更
    });

    // 版本6: 添加跨链铸造记录索引
    this.version(6).stores({
      reflections: '++id, walletAddress, [date+walletAddress], createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp',
      lifeGoals: '++id, walletAddress, createdAt',
      sbtMintRecords: '++id, [walletAddress+level+chain], chain, txHash, mintedAt'
      // 添加复合索引: walletAddress + level + chain，支持跨链查询
    });

    // 数据迁移逻辑: version(5) → version(6)
    this.version(6).upgrade(async tx => {
      console.log('[DB] Upgrading from v5 to v6 - 添加跨链铸造索引...');
      // 不需要数据迁移，只是索引结构的变更，支持按链类型查询
    });
  }
}

/**
 * 创建数据库实例（单例）- 延迟初始化以避免SSR错误
 */
let dbInstance: ZhengDaoDatabase | null = null;

function getDB(): ZhengDaoDatabase {
  if (typeof window === 'undefined') {
    // Server side - throw error if someone tries to use DB
    throw new Error('Database can only be accessed on the client side');
  }

  if (!dbInstance) {
    dbInstance = new ZhengDaoDatabase();
  }

  return dbInstance;
}

// Export a proxy that looks like the db but lazily initializes
export const db = new Proxy({} as ZhengDaoDatabase, {
  get(target, prop) {
    const db = getDB();
    return db[prop as keyof ZhengDaoDatabase];
  }
}) as ZhengDaoDatabase;

/**
 * 数据库错误处理
 */
export function handleDBError(error: unknown, context: string): never {
  console.error(`[DB Error] ${context}:`, error);

  if (error instanceof Dexie.SchemaError) {
    throw new Error('数据库Schema错误，请清除浏览器数据后重试');
  } else if (error instanceof Dexie.ConstraintError) {
    throw new Error('数据约束错误，可能是重复添加数据');
  } else {
    throw new Error(`数据库操作失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取用户在所有链上的铸造记录
 * @param walletAddress 钱包地址
 * @returns 分链的铸造记录
 */
export async function getUserMintRecordsAcrossChains(
  walletAddress: string
): Promise<{
  bnb: SBTMintRecord[];
  solana: SBTMintRecord[];
  total: number;
}> {
  try {
    const bnbRecords = await db.sbtMintRecords
      .where('[walletAddress+chain]')
      .equals([walletAddress, 'bnb'])
      .toArray();

    const solanaRecords = await db.sbtMintRecords
      .where('[walletAddress+chain]')
      .equals([walletAddress, 'solana'])
      .toArray();

    return {
      bnb: bnbRecords,
      solana: solanaRecords,
      total: bnbRecords.length + solanaRecords.length,
    };
  } catch (error) {
    handleDBError(error, 'getUserMintRecordsAcrossChains');
  }
}

/**
 * 获取用户指定等级在所有链上的铸造状态
 * @param walletAddress 钱包地址
 * @param level 等级
 * @returns 分链的铸造状态
 */
export async function getLevelMintStatusAcrossChains(
  walletAddress: string,
  level: number
): Promise<{
  bnb: boolean;
  solana: boolean;
  any: boolean;
}> {
  try {
    const bnbCount = await db.sbtMintRecords
      .where('[walletAddress+level+chain]')
      .equals([walletAddress, level, 'bnb'])
      .count();

    const solanaCount = await db.sbtMintRecords
      .where('[walletAddress+level+chain]')
      .equals([walletAddress, level, 'solana'])
      .count();

    return {
      bnb: bnbCount > 0,
      solana: solanaCount > 0,
      any: bnbCount > 0 || solanaCount > 0,
    };
  } catch (error) {
    handleDBError(error, 'getLevelMintStatusAcrossChains');
  }
}

