/**
 * 虚拟用户画像生成器
 * 生成逼真的虚拟用户，用于演示数据
 */

import { DemoUserProfile, InterestType, EmotionType, AchievementLevel } from '@/types/demo-data';

/**
 * 等级定义
 */
export const ACHIEVEMENT_LEVELS: AchievementLevel[] = [
  {
    level: 1,
    name: '见素',
    nameEn: 'Seeing Essence',
    requiredDays: 7,
    description: '见素抱朴，少私寡欲',
    color: '#D43628',
  },
  {
    level: 2,
    name: '守一',
    nameEn: 'Guarding Oneness',
    requiredDays: 30,
    description: '载营魄抱一，能无离乎',
    color: '#E85D04',
  },
  {
    level: 3,
    name: '玄德',
    nameEn: 'Mysterious Virtue',
    requiredDays: 90,
    description: '生而不有，为而不恃',
    color: '#F48C06',
  },
  {
    level: 4,
    name: '知常',
    nameEn: 'Knowing Constant',
    requiredDays: 180,
    description: '复命曰常，知常曰明',
    color: '#FAA307',
  },
  {
    level: 5,
    name: '无为',
    nameEn: 'Non-Action',
    requiredDays: 365,
    description: '为无为，事无事',
    color: '#FFBA08',
  },
  {
    level: 6,
    name: '抱一',
    nameEn: 'Embracing Oneness',
    requiredDays: 1000,
    description: '抱一为天下式',
    color: '#FFD60A',
  },
];

/**
 * 中文姓氏
 */
const CHINESE_SURNAMES = [
  '王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周',
  '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗',
];

/**
 * 中文名字
 */
const CHINESE_NAMES = [
  '明', '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军',
  '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '华',
  '睿', '梓', '宇航', '浩', '欣怡', '子涵', '一诺', '俊杰', '雨桐',
];

/**
 * 兴趣标签组合
 */
const INTEREST_COMBINATIONS: InterestType[][] = [
  ['work', 'growth', 'learning'], // 工作导向
  ['health', 'family', 'social'], // 生活平衡
  ['wealth', 'learning', 'growth'], // 财富积累
  ['work', 'family', 'health'], // 全面发展
  ['growth', 'learning', 'work'], // 自我提升
  ['health', 'growth', 'social'], // 健康成长
  ['wealth', 'work', 'learning'], // 事业发展
  ['family', 'social', 'health'], // 社交生活
];

/**
 * 情绪倾向分布
 */
const EMOTION_DISTRIBUTIONS: Array<{ emotion: EmotionType; weight: number }> = [
  { emotion: '积极', weight: 0.35 },
  { emotion: '平静', weight: 0.40 },
  { emotion: '焦虑', weight: 0.15 },
  { emotion: '疲惫', weight: 0.10 },
];

/**
 * 性格类型分布
 */
const PERSONALITY_DISTRIBUTIONS = [
  { type: 'optimistic' as const, weight: 0.40 },
  { type: 'neutral' as const, weight: 0.45 },
  { type: 'pessimistic' as const, weight: 0.15 },
];

/**
 * 活跃度分布
 */
const ACTIVITY_DISTRIBUTIONS = [
  { level: 'high' as const, weight: 0.25 },
  { level: 'medium' as const, weight: 0.50 },
  { level: 'low' as const, weight: 0.25 },
];

/**
 * 写作风格分布
 */
const WRITING_DISTRIBUTIONS = [
  { style: 'detailed' as const, weight: 0.30 },
  { style: 'balanced' as const, weight: 0.50 },
  { style: 'concise' as const, weight: 0.20 },
];

/**
 * 生成虚拟用户列表
 */
export function generateDemoUsers(count: number, levelDistribution: number[]): DemoUserProfile[] {
  const users: DemoUserProfile[] = [];
  const totalWeight = levelDistribution.reduce((sum, weight) => sum + weight, 0);

  for (let i = 0; i < count; i++) {
    // 选择目标等级
    const targetLevel = selectFromDistribution(levelDistribution, totalWeight);
    const requiredDays = ACHIEVEMENT_LEVELS[targetLevel - 1].requiredDays;

    users.push(createUserProfile(i, targetLevel, requiredDays));
  }

  return users;
}

/**
 * 创建单个用户画像
 */
function createUserProfile(index: number, targetLevel: number, requiredDays: number): DemoUserProfile {
  const today = new Date();
  const joinDate = new Date(today);
  joinDate.setDate(today.getDate() - Math.floor(Math.random() * 365)); // 过去一年内加入

  // 模拟钱包地址
  const id = generateMockWalletAddress(index);

  // 生成姓名
  const surname = CHINESE_SURNAMES[Math.floor(Math.random() * CHINESE_SURNAMES.length)];
  const name = CHINESE_NAMES[Math.floor(Math.random() * CHINESE_NAMES.length)];
  const fullName = `${surname}${name}`;

  return {
    id,
    name: fullName,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${id}`,
    joinDate,
    activityLevel: selectWeighted(ACTIVITY_DISTRIBUTIONS).level as 'high' | 'medium' | 'low',
    writingStyle: selectWeighted(WRITING_DISTRIBUTIONS).style as 'detailed' | 'concise' | 'balanced',
    interests: INTEREST_COMBINATIONS[Math.floor(Math.random() * INTEREST_COMBINATIONS.length)],
    baseEmotion: selectWeighted(EMOTION_DISTRIBUTIONS).emotion as EmotionType,
    personalityType: selectWeighted(PERSONALITY_DISTRIBUTIONS).type as 'optimistic' | 'neutral' | 'pessimistic',
    targetLevel,
    currentLevel: Math.min(targetLevel, calculateCurrentLevel(requiredDays)),
    checkInDays: requiredDays,
  };
}

/**
 * 生成模拟钱包地址
 */
function generateMockWalletAddress(index: number): string {
  // 生成类似以太坊地址的格式（0x开头，40位十六进制）
  const hex = index.toString(16).padStart(8, '0') + Math.random().toString(16).substring(2, 42);
  return '0x' + hex.padEnd(40, '0').substring(0, 40);
}

/**
 * 从加权分布中选择
 */
function selectWeighted<T extends { weight: number }>(distribution: T[]): T {
  const totalWeight = distribution.reduce((sum, item) => sum + item.weight, 0);
  const index = selectFromDistribution(distribution.map(d => d.weight), totalWeight);
  return distribution[index];
}

/**
 * 从分布中选择（返回索引）
 */
function selectFromDistribution(weights: number[], totalWeight: number): number {
  let random = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) return i;
  }
  return weights.length - 1;
}

/**
 * 计算当前等级（基于天数）
 */
function calculateCurrentLevel(days: number): number {
  for (let i = ACHIEVEMENT_LEVELS.length - 1; i >= 0; i--) {
    if (days >= ACHIEVEMENT_LEVELS[i].requiredDays) {
      return ACHIEVEMENT_LEVELS[i].level;
    }
  }
  return 1;
}

/**
 * 根据用户画像获取打卡概率
 */
export function getCheckInProbability(activityLevel: DemoUserProfile['activityLevel']): number {
  switch (activityLevel) {
    case 'high':
      return 0.9;
    case 'medium':
      return 0.75;
    case 'low':
      return 0.6;
  }
}

/**
 * 获取有意义概率
 */
export function getMeaningfulProbability(personalityType: DemoUserProfile['personalityType']): number {
  switch (personalityType) {
    case 'optimistic':
      return 0.75;
    case 'neutral':
      return 0.65;
    case 'pessimistic':
      return 0.55;
  }
}

/**
 * 获取情绪值（0-1之间）
 */
export function getEmotionValue(emotion: EmotionType): number {
  switch (emotion) {
    case '积极':
      return 0.75;
    case '平静':
      return 0.55;
    case '焦虑':
      return 0.35;
    case '疲惫':
      return 0.15;
  }
}

/**
 * 将数值映射到情绪
 */
export function mapValueToEmotion(value: number): EmotionType {
  if (value > 0.65) return '积极';
  if (value > 0.45) return '平静';
  if (value > 0.25) return '焦虑';
  return '疲惫';
}

/**
 * 计算等级分布
 */
export function calculateLevelDistribution(userCount: number): number[] {
  // 真实的平台增长分布
  return [
    Math.round(userCount * 0.40), // 40% Level 1
    Math.round(userCount * 0.30), // 30% Level 2
    Math.round(userCount * 0.15), // 15% Level 3
    Math.round(userCount * 0.10), // 10% Level 4
    Math.round(userCount * 0.04), // 4% Level 5
    Math.round(userCount * 0.01), // 1% Level 6
  ];
}
