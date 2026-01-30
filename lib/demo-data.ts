/**
 * Demo 数据生成脚本
 * 用于生成模拟复盘数据，方便演示和测试
 * 同时包含游客模式预设的个人主页数据
 */

import { ReflectionService } from './storage';
import type { Reflection } from './db';
import type { ProfileData } from './profile-service';
import type { LifeGoal } from './db';

/**
 * Demo 模板数据 - 丰富的场景和主题
 */
const DEMO_TEMPLATES = {
  gains: [
    '完成了项目的核心功能开发，获得了团队认可',
    '坚持早起晨练，一整天精力充沛',
    '学习了新的设计模式，应用到项目中',
    '和家人度过了愉快的晚餐时光，关系更亲密了',
    '完成了重要的工作汇报，领导给予了高度评价',
    '坚持健身，体重下降了2公斤，身体状态良好',
    '阅读了技术书籍《代码整洁之道》，收获很大',
    '解决了困扰已久的Bug，优化了系统性能',
    '组织了技术分享会，团队协作更加顺畅',
    '学会了使用Docker，部署效率提升很多',
    '完成了Python课程的学习，掌握了数据分析基础',
    '坚持每天写代码，编程能力明显提升',
    '主动承担了额外任务，锻炼了解决问题的能力',
    '优化了工作流程，节省了团队大量时间',
    '和客户进行了有效沟通，需求更加明确了',
    '坚持冥想30天，心态变得更加平和',
    '完成了季度目标，感到非常有成就感',
    '帮助新同事熟悉项目，提升了领导力',
    '参加了行业会议，拓展了人脉圈',
    '坚持早起阅读，已经读完5本书',
    '学会了时间管理，工作效率显著提升',
    '克服了拖延症，按时完成了所有任务',
    '坚持健康饮食，身体状况明显改善',
    '和家人一起旅行，增进了感情',
    '完成了马拉松比赛，突破了自我',
  ],
  losses: [
    '花费太多时间在社交媒体上，影响了工作效率',
    '熬夜看电影，第二天精神不佳',
    '拖延了重要任务，最后时刻才完成',
    '情绪波动较大，因为一点小事影响了一整天',
    '工作中容易分心，频繁查看手机',
    '饮食不规律，吃了太多外卖',
    '沟通不够及时，导致团队出现误解',
    '没有坚持冥想习惯，感到焦虑',
    '代码质量需要提升，出现了几个Bug',
    '时间管理有待改进，多任务处理效果不好',
    '运动三天打鱼两天晒网，没有坚持',
    '总是想太多，行动力不足',
    '容易受到他人情绪影响',
    '沉迷短视频，浪费了大量时间',
    '会议太多，实际工作时间被压缩',
    '没有及时回复邮件，错过重要信息',
    '没有好好休息，周末也在工作',
    '和家人沟通太少，关系有些疏远',
    '学习新技能时容易放弃',
    '总是追求完美，导致进度缓慢',
  ],
  ideas: [
    '尝试番茄工作法提高效率，设定25分钟专注工作',
    '每天早起30分钟进行晨练，养成健康习惯',
    '定期进行代码审查，提升代码质量',
    '建立更好的沟通机制，每周一次团队会议',
    '培养阅读习惯，每天睡前阅读30分钟',
    '尝试新的技术栈，保持学习热情',
    '优化工作流程，减少不必要的会议',
    '加强团队建设，每月一次团建活动',
    '保持学习热情，每周学习一个新知识点',
    '平衡工作和生活，设定明确的下班时间',
    '建立晨间例程，包括冥想、运动、早餐',
    '使用GTD方法管理任务和项目',
    '每周进行一次深度复盘，总结经验教训',
    '学会说"不"，避免过度承诺',
    '建立支持系统，找伙伴互相监督',
    '将大目标分解为小步骤，降低执行难度',
    '庆祝小胜利，保持积极心态',
    '定期断舍离，清理不必要的物品和信息',
    '培养感恩习惯，每天记录三件好事',
    '优化睡眠环境，提升睡眠质量',
  ],
  emotions: ['积极', '平静', '焦虑', '疲惫', '兴奋', '满足', '沮丧', '充满希望'],
  keywords: [
    '成长', '效率', '健康', '学习', '复盘', '团队', '技术',
    '健身', '早起', '阅读', '冥想', '时间管理', '自律',
    '家庭', '工作平衡', '目标', '坚持', '突破', '反思',
    '沟通', '领导力', '创新', '优化', '健康', '旅行',
  ],
};

/**
 * 生成随机日期（最近30天）
 */
function getRandomDate(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * 随机选择数组中的元素
 */
function randomChoice<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 生成单条反思数据
 */
function generateReflection(dayOffset: number, walletAddress: string): Omit<Reflection, 'id'> {
  const isMeaningful = Math.random() > 0.2; // 80%概率有意义
  const date = getRandomDate(dayOffset);

  // 根据是否有意义决定字数
  const wordCount = isMeaningful
    ? 300 + Math.floor(Math.random() * 400) // 300-700字
    : 100 + Math.floor(Math.random() * 200); // 100-300字

  const rawContent = `
${isMeaningful ? '今天是有意义的一天。' : '今天遇到了一些挑战。'}

${randomChoice(DEMO_TEMPLATES.gains, isMeaningful ? 3 : 1).join('\n')}

${randomChoice(DEMO_TEMPLATES.losses, Math.random() > 0.5 ? 2 : 1).join('\n')}

${randomChoice(DEMO_TEMPLATES.ideas, 2).join('\n')}

总结：${isMeaningful ? '继续保持，明天会更好！' : '需要改进，加油！'}
  `.trim();

  return {
    date,
    isMeaningful,
    rawContent,
    structuredData: {
      gains: randomChoice(DEMO_TEMPLATES.gains, isMeaningful ? 3 : 1),
      losses: randomChoice(DEMO_TEMPLATES.losses, 2),
      ideas: randomChoice(DEMO_TEMPLATES.ideas, 2),
      emotion: randomChoice(DEMO_TEMPLATES.emotions, 1)[0],
      keywords: randomChoice(DEMO_TEMPLATES.keywords, 3 + Math.floor(Math.random() * 3)),
    },
    walletAddress,
    createdAt: new Date(date),
    updatedAt: new Date(date),
  };
}

/**
 * 生成指定天数的Demo数据
 * @param walletAddress 钱包地址
 * @param days 天数（默认30天）
 * @returns 生成的数据数量
 */
export async function generateDemoData(walletAddress: string, days: number = 30): Promise<number> {
  console.log(`[Demo Data] 开始生成 ${days} 天的模拟数据...`);

  // 清空现有数据
  await ReflectionService.clearAllReflections(walletAddress);

  // 生成新数据
  let count = 0;
  for (let i = days - 1; i >= 0; i--) {
    // 80%概率有数据
    if (Math.random() > 0.2) {
      const reflection = generateReflection(i, walletAddress);
      await ReflectionService.saveReflection(reflection);
      count++;
    }
  }

  console.log(`[Demo Data] 生成完成，共 ${count} 条数据`);
  return count;
}

/**
 * 快速生成Demo数据（浏览器控制台使用）
 * 使用方法：
 * 1. 打开浏览器控制台
 * 2. 复制粘贴以下代码：
 *
 * import('./lib/demo-data.ts').then(module => {
 *   const address = '0x1234567890123456789012345678901234567890'; // 替换为你的钱包地址
 *   module.generateDemoData(address, 30);
 * });
 */
export function setupDemoDataHelper() {
  (window as any).generateDemoData = async (walletAddress: string, days: number = 30) => {
    return await generateDemoData(walletAddress, days);
  };

  console.log('[Demo Data] Demo数据生成助手已启用');
  console.log('[Demo Data] 使用方法: generateDemoData(walletAddress, days)');
  console.log('[Demo Data] 示例: generateDemoData("0x123...", 30)');
}

/**
 * 检查是否需要生成Demo数据
 * @param walletAddress 钱包地址
 * @returns 是否需要生成
 */
export async function shouldGenerateDemoData(walletAddress: string): Promise<boolean> {
  const hasReflected = await ReflectionService.hasReflectedToday(walletAddress);
  const allReflections = await ReflectionService.getAllReflections(walletAddress);
  return !hasReflected && allReflections.length === 0;
}

// ============================================================================
// 游客模式预设数据
// ============================================================================

/**
 * 演示用户的人生目标（单数形式，保持兼容）
 */
export const demoLifeGoal: LifeGoal = {
  walletAddress: '0x0000000000000000000000000000000000000000',
  wealthGoals: {
    monthlyIncome: '月收入5万元',
    savings: '存款达到100万',
    investmentReturn: '年化收益率15%',
  },
  healthGoals: {
    exerciseFrequency: '每周健身4次',
    weightManagement: '体重保持在70kg',
    sleepQuality: '每天保证7小时睡眠',
  },
  familyGoals: {
    familyTime: '每周至少2次家庭聚餐',
    parentChildRelationship: '每月一次亲子旅行',
    partnerRelationship: '每周一次约会之夜',
  },
  otherGoals: {
    learningGoals: ['学习Python编程', '阅读50本书', '掌握短视频剪辑'],
    socialGoals: ['参加10场行业会议', '建立100+人脉网络'],
    hobbies: ['摄影', '吉他', '登山'],
  },
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

/**
 * 演示用户的人生规划列表（复数形式，用于体验模式）
 * 包含至少2条预设的人生目标
 */
export const demoLifeGoals: LifeGoal[] = [
  {
    walletAddress: '0x0000000000000000000000000000000000000000',
    wealthGoals: {
      monthlyIncome: '月收入5万元',
      savings: '存款达到100万',
      investmentReturn: '年化收益率15%',
    },
    healthGoals: {
      exerciseFrequency: '每周健身4次',
      weightManagement: '体重保持在70kg',
      sleepQuality: '每天保证7小时睡眠',
    },
    familyGoals: {
      familyTime: '每周至少2次家庭聚餐',
      parentChildRelationship: '每月一次亲子旅行',
      partnerRelationship: '每周一次约会之夜',
    },
    otherGoals: {
      learningGoals: ['学习Rust开发', '阅读50本书', '掌握AI应用'],
      socialGoals: ['参加10场行业会议', '建立100+人脉网络'],
      hobbies: ['摄影', '吉他', '登山'],
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    walletAddress: '0x0000000000000000000000000000000000000000',
    wealthGoals: {
      monthlyIncome: '月收入8万元',
      savings: '存款达到200万',
      investmentReturn: '年化收益率20%',
    },
    healthGoals: {
      exerciseFrequency: '每周健身5次',
      weightManagement: '体重保持在68kg',
      sleepQuality: '每天保证8小时睡眠',
    },
    familyGoals: {
      familyTime: '每周至少3次家庭聚餐',
      parentChildRelationship: '每月两次亲子旅行',
      partnerRelationship: '每周两次约会之夜',
    },
    otherGoals: {
      learningGoals: ['掌握Web3开发', '完成AI课程', '学习投资理财'],
      socialGoals: ['建立优质人脉圈', '参与开源项目'],
      hobbies: ['跑步', '烹饪', '写作'],
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-20'),
  },
];

/**
 * 演示用户配置（虚拟用户信息）
 * 58天打卡对应 Level 2（需要30天），未达到 Level 3（需要100天）
 */
export const demoUserProfile = {
  name: '体验用户',
  avatar: '/images/avatars/default.png',
  level: 2, // 当前等级（58天打卡对应 Level 2）
  sbtLevel: 2, // 已铸造的 SBT 等级（Level 1 和 Level 2 都已领取）
};

/**
 * 演示用户的成就数据
 * 等级达成应该是连续的：Level 1 → Level 2 → Level 3...
 */
export const demoAchievements = [
  {
    chain: 'bnb' as const,
    currentLevel: 2, // 58天打卡对应 Level 2
    totalCheckInDays: 58,
    // sbtClaimed[0] 表示 Level 1，sbtClaimed[1] 表示 Level 2，以此类推
    // 如果 sbtLevel 是 2，那么 Level 1 和 Level 2 都应该已领取
    sbtClaimed: [true, true, false, false, false, false], // Level 1 和 Level 2 已领取
  },
  {
    chain: 'solana' as const,
    currentLevel: 2,
    totalCheckInDays: 58,
    sbtClaimed: [true, true, false, false, false, false],
  },
];

/**
 * 生成演示打卡记录
 */
function generateStaticDemoReflections(count: number): Reflection[] {
  const reflections: Reflection[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const isMeaningful = Math.random() > 0.25; // 75%有意义

    reflections.push({
      date: date.toISOString().split('T')[0],
      isMeaningful,
      rawContent: generateRawContent(i, isMeaningful),
      structuredData: {
        gains: isMeaningful
          ? ['完成了重要的项目里程碑', '学习了新技术', '锻炼身体保持健康']
          : ['日常工作', '处理邮件'],
        losses: isMeaningful
          ? ['时间管理需要改进', '会议时间过长']
          : ['拖延了一些任务', '看手机时间过长'],
        ideas: isMeaningful
          ? ['可以尝试新的工作方法', '优化代码结构']
          : [],
        emotion: isMeaningful ? '积极' : '平静',
        keywords: isMeaningful ? ['成长', '效率', '健康'] : ['日常'],
      },
      walletAddress: '0x0000000000000000000000000000000000000000',
      createdAt: date,
      updatedAt: date,
    });
  }

  return reflections;
}

/**
 * 生成演示原始内容 - 更丰富、更多样化
 */
function generateRawContent(dayIndex: number, isMeaningful: boolean): string {
  const dayNumber = 58 - dayIndex;

  if (isMeaningful) {
    // 有意义的日子 - 多样化的场景
    const meaningfulScenarios = [
      // 工作成就类
      `第${dayNumber}天，非常有收获！

今天在项目上取得了重大突破。早上9点就开始处理核心功能，经过一整天的努力，终于在下午5点完成了关键模块的开发。团队Code Review时得到了大家的一致认可，这种成就感真的很棒。

晚上和团队成员一起吃饭，交流了技术心得，学到了很多新的思路。感觉自己在技术道路上又迈进了一步。

明天计划继续优化代码结构，争取将性能再提升20%。`,

      // 健康生活类
      `坚持打卡第${dayNumber}天！

今天依然保持了早起的好习惯，5:30就起床了。晨练30分钟，跑步5公里，出了一身汗，整个人神清气爽。早餐准备了营养均衡的搭配：鸡蛋、牛奶、全麦面包和水果。

工作上也很顺利，下午完成了重要的客户演示，客户对我们的方案非常满意。感觉自己现在的生活节奏很好，工作、运动、休息都很平衡。

继续保持这种状态，每天进步一点点！`,

      // 学习成长类
      `第${dayNumber}天的学习记录！

今天完成了《代码整洁之道》的阅读，收获很大。书中的很多观点让我反思自己的编程习惯，比如函数应该短小精悍、注释的必要性、错误处理的重要性等。

下午尝试将学到的原则应用到实际项目中，重构了一段复杂的代码。重构后代码可读性明显提升，同事也给予了好评。

晚上参加了线上技术分享会，学习了微服务架构的最佳实践。感觉每天都在成长，这种感觉真好！`,

      // 家庭时光类
      `第${dayNumber}天，温暖的一天！

今天早早完成了工作，6点就准时下班了。和家人一起去公园散步，聊了很多有趣的话题。孩子的笑脸是最好的治愈，看着他们快乐成长，所有的辛苦都值得了。

晚餐是自己下厨做的，做了家人爱吃的糖醋排骨和清炒时蔬。一家人围坐在餐桌前，其乐融融。这样的时光让我觉得生活的意义就在这些平凡的瞬间。

晚上和孩子一起读绘本，讲故事。这种简单的陪伴，就是最大的幸福。`,

      // 自我突破类
      `突破自我的第${dayNumber}天！

今天完成了一件一直想做但总在拖延的事情 - 主动在团队会议上分享了自己的项目经验。虽然之前很紧张，准备到深夜，但真正站在台上时，发现自己完全可以做得很好。

同事们的反馈都很积极，还有人私下请教我问题。这让我意识到，很多时候限制我们的不是能力，而是勇气。只要勇敢迈出第一步，后面就顺理成章了。

今天的经历给了我很大信心，以后要更加主动，抓住更多机会。`,

      // 目标达成类
      `第${dayNumber}天，小目标达成！

今天达成了坚持早起30天的小目标！回想刚开始时真的很痛苦，每天早上闹钟响了3遍才能爬起来。但现在已经形成了生物钟，自然就在6点左右醒来，不需要闹钟了。

早上的时间特别宝贵，可以利用这段时间锻炼、阅读、规划一天的任务。感觉整个人生都延长了2小时，工作效率也提升了很多。

完成这个小目标后，更有信心挑战下一个目标了 - 坚持健身60天！`,

      // 团队协作类
      `第${dayNumber}天，团队力量！

今天完成了一个棘手的技术难题。单靠自己可能需要好几天，但通过和团队成员协作，只用了半天就解决了。这让我深刻体会到"三个臭皮匠赛过诸葛亮"的道理。

我们在白板上画图、讨论、尝试各种方案，最终找到了最优解。过程中每个人都有贡献，思维的碰撞产生了意想不到的效果。

晚上请团队喝奶茶庆祝，大家都很开心。能在这样一个优秀的团队工作，真的很幸运！`,
    ];

    return meaningfulScenarios[dayIndex % meaningfulScenarios.length];
  } else {
    // 需要改进的日子 - 各种挑战
    const challengeScenarios = [
      `第${dayNumber}天，有点挫败。

今天状态不太好，早上起床后就感觉头昏脑胀。到了公司，本来计划要完成的任务，结果一直在拖延，刷手机、看新闻，就是不想开始工作。

下午开会时被领导批评了进度慢，心里很不舒服，但也知道是自己没有合理安排时间。晚上反省了很久，意识到是最近熬夜太多导致的。

明天要调整作息，早睡早起，恢复状态。不能让今天的状态继续下去。`,

      `第${dayNumber}天，平平淡淡。

今天没什么特别的，就是按部就班地完成工作。早上开会、处理邮件、写代码、测试，日复一日的重复。有时候会怀疑自己是否在成长，还是在原地踏步。

晚上回家后一直刷短视频，不知不觉就过了3个小时。等回过神来，已经该睡觉了。感觉今天虚度了，什么都没收获。

需要改变这种状态，重新找回工作的热情和动力。`,

      `第${dayNumber}天，情绪低落。

今天因为一件小事影响了整个人的状态。早上和同事有些分歧，沟通时语气不太好，结果气氛很尴尬。一整天都心不在焉，工作效率很低。

反省了一下，是自己太敏感了，把小事看得太重。应该更成熟地处理这些人际关系问题，而不是让情绪影响工作。

明天要调整心态，把注意力放在重要的事情上，不要被琐事干扰。`,

      `第${dayNumber}天，有点焦虑。

今天参加行业会议，看到同龄人都取得了很好的成绩，心里有些焦虑。感觉自己的发展速度太慢，还在原地踏步，而别人已经前进了很远。

晚上和导师聊天，他告诉我每个人的节奏不同，重要的是持续进步，而不是和别人比较。这番话让我冷静了一些，但焦虑感还是存在。

需要调整心态，专注于自己的成长路径，一步一个脚印地前进。`,

      `第${dayNumber}天，今天就这样吧。

工作、生活都很平淡，没有什么值得记录的亮点。感觉每天都在重复同样的生活，缺乏激情和动力。

可能进入了疲惫期，需要找些新的挑战来激发热情。也许是学习一项新技能，也许是设定一个新的目标。

明天要重新规划一下，找到前进的方向。不能就这样浑浑噩噩地过日子。`,
    ];

    return challengeScenarios[dayIndex % challengeScenarios.length];
  }
}

/**
 * 演示打卡记录（最近58天）
 */
export const demoReflections: Reflection[] = generateStaticDemoReflections(58).reverse();

/**
 * 演示年度打卡记录（用于年度复盘，均匀分布在一年中）
 * 总共180天打卡，分布在12个月，每个月10-20天
 */
export function generateDemoYearlyReflections(): Reflection[] {
  const reflections: Reflection[] = [];
  const currentYear = new Date().getFullYear();

  // 每月打卡天数配置（模拟真实用户行为）
  const monthlyDays = [15, 12, 18, 14, 16, 13, 11, 15, 17, 14, 19, 16]; // 总共180天

  monthlyDays.forEach((days, monthIndex) => {
    for (let day = 1; day <= days; day++) {
      // 在每月内随机选择日期
      const date = new Date(currentYear, monthIndex, Math.floor(Math.random() * 28) + 1);
      const dateStr = date.toISOString().split('T')[0];

      // 75%概率有意义
      const isMeaningful = Math.random() > 0.25;

      reflections.push({
        date: dateStr,
        isMeaningful,
        rawContent: generateRawContent(reflections.length, isMeaningful),
        structuredData: {
          gains: isMeaningful
            ? ['完成了重要的项目里程碑', '学习了新技术', '锻炼身体保持健康']
            : ['日常工作', '处理邮件'],
          losses: isMeaningful
            ? ['时间管理需要改进', '会议时间过长']
            : ['拖延了一些任务', '看手机时间过长'],
          ideas: isMeaningful
            ? ['可以尝试新的工作方法', '优化代码结构']
            : [],
          emotion: isMeaningful ? '积极' : '平静',
          keywords: isMeaningful ? ['成长', '效率', '健康'] : ['日常'],
        },
        walletAddress: '0x0000000000000000000000000000000000000000',
        createdAt: date,
        updatedAt: date,
      });
    }
  });

  // 按日期排序
  return reflections.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 演示年度打卡记录（预生成，用于年度复盘）
 */
export const demoYearlyReflections: Reflection[] = generateDemoYearlyReflections();

/**
 * 预设的打卡历史（至少6条，用于体验模式）
 * 导出为 demoCheckInHistory 以符合任务要求
 */
export const demoCheckInHistory: Reflection[] = demoReflections.slice(-6).map(ref => ({
  ...ref,
  rawContent: `【${new Date(ref.date).toLocaleDateString('zh-CN')}】${ref.rawContent.split('\n')[0] || ref.structuredData.gains.join('、')}`,
}));

/**
 * 演示个人主页数据
 * 用于游客模式展示完整的个人主页
 */
export const demoProfileData: ProfileData = {
  goals: demoLifeGoal,
  recentReflections: demoReflections,
  totalCheckInDays: 58,
  meaningfulDays: 45,
  meaningfulRate: 78,
  currentStreak: 12,
};

// ============================================================================
// 动态数据生成函数（用于体验模式）
// ============================================================================

/**
 * 生成体验模式的复盘数据
 * 根据请求的时长精确生成对应天数的复盘分析数据
 * @param period 天数（如 7、30、90、365）
 * @param checkIns 打卡记录数组（可选，不传则使用预设历史）
 * @returns 复盘统计数据
 */
export function generateDemoReviewData(
  period: number,
  checkIns?: Reflection[]
): {
  totalDays: number;
  meaningfulDays: number;
  meaningfulRate: number;
  avgWords: number;
  dailyData: Array<{ date: string; isMeaningful: boolean }>;
  meaningfulSummaries: string[];
} {
  // 使用传入的打卡记录，或使用预设历史
  const reflections = checkIns || demoCheckInHistory;

  // 截取指定天数的数据（确保不超过请求的天数）
  const slicedData = reflections.slice(-period);

  // 计算统计数据
  const totalDays = slicedData.length;
  const meaningfulDays = slicedData.filter(r => r.isMeaningful).length;
  const meaningfulRate = totalDays > 0 ? Math.round((meaningfulDays / totalDays) * 100) : 0;

  // 计算平均字数
  const totalWords = slicedData.reduce((sum, r) => sum + r.rawContent.length, 0);
  const avgWords = totalDays > 0 ? Math.round(totalWords / totalDays) : 0;

  // 生成每日数据
  const dailyData = slicedData.map(r => ({
    date: r.date,
    isMeaningful: r.isMeaningful,
  }));

  // 提取有意义日子的复盘摘要（最多5条）
  const meaningfulSummaries = slicedData
    .filter(r => r.isMeaningful)
    .slice(0, 5)
    .map(r => r.rawContent);

  return {
    totalDays,
    meaningfulDays,
    meaningfulRate,
    avgWords,
    dailyData,
    meaningfulSummaries,
  };
}

/**
 * 合并用户的打卡记录
 * 将体验模式下的新打卡记录与预设历史合并
 * @param newCheckIn 用户的新打卡记录
 * @returns 合并后的打卡记录数组
 */
export function getMergedCheckIns(newCheckIn: Reflection): Reflection[] {
  // 创建预设历史的副本
  const merged = [...demoCheckInHistory];

  // 添加新打卡记录
  merged.push(newCheckIn);

  // 按日期排序
  merged.sort((a, b) => a.date.localeCompare(b.date));

  // 保持数组长度为7（6条预设 + 1条新打卡）
  // 如果超过7条，移除最旧的
  if (merged.length > 7) {
    merged.splice(0, merged.length - 7);
  }

  return merged;
}

/**
 * 生成体验模式的个人主页数据
 * @param newCheckIn 用户的新打卡记录（可选）
 * @returns 个人主页数据
 */
export function generateDemoProfileData(newCheckIn?: Reflection): ProfileData {
  // 合并打卡记录
  const mergedReflections = newCheckIn
    ? getMergedCheckIns(newCheckIn)
    : demoCheckInHistory;

  // 使用第一条人生规划
  const goals = demoLifeGoals[0];

  // 计算统计数据
  const totalCheckInDays = mergedReflections.length;
  const meaningfulDays = mergedReflections.filter(r => r.isMeaningful).length;
  const meaningfulRate = totalCheckInDays > 0
    ? Math.round((meaningfulDays / totalCheckInDays) * 100)
    : 0;

  // 计算连续打卡天数
  let currentStreak = 0;
  const sortedReflections = [...mergedReflections].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < sortedReflections.length; i++) {
    const ref = sortedReflections[i];
    const refDate = new Date(ref.date);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (ref.date === expectedDate.toISOString().split('T')[0]) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    goals,
    recentReflections: mergedReflections,
    totalCheckInDays,
    meaningfulDays,
    meaningfulRate,
    currentStreak,
  };
}
