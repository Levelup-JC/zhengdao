# 证道项目 - AI员工任务分配方案 V2.0

**制定时间**: 2026-01-27
**CTO**: Claude
**可用AI员工**: 3-5个

---

## 一、分工策略

### 1.1 核心原则

1. **技能聚焦**: 每个AI专注一个技术领域，减少上下文切换
2. **依赖优化**: 优先启动无依赖任务，阻塞任务提前完成
3. **并行最大化**: 充分利用3-5个AI并行工作
4. **弹性配置**: 3个AI为核心配置，4-5个为加速配置

### 1.2 AI角色重新定义

| AI编号 | 角色定位 | 核心技能 | 工作范围 |
|--------|----------|----------|----------|
| **AI-A** | 全栈前端工程师 | React, TypeScript, UI | 页面开发、组件开发 |
| **AI-B** | 后端/Web3工程师 | 合约, 数据库, API | 合约部署、数据服务 |
| **AI-C** | 数据可视化工程师 | 图表, 数据分析 | 图表组件、复盘系统 |
| **AI-D** | QA工程师 (可选) | 测试, 文档 | 测试、Bug修复 |
| **AI-E** | 设计支持 (可选) | UI/UX, 文案 | Coming Soon、优化 |

---

## 二、优化后的任务分配

### 2.1 核心配置 (3个AI)

适用于：资源有限时的最小可行配置

```
┌─────────────────────────────────────────────────────────────────┐
│                        3 AI 配置方案                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI-A (全栈前端)          AI-B (Web3/后端)      AI-C (数据可视化) │
│  ┌─────────────┐         ┌─────────────┐       ┌─────────────┐  │
│  │ TASK-01    │         │ TASK-06    │       │ TASK-04    │  │
│  │ 人生规划问卷 │         │ BNB部署    │       │ 数据图表    │  │
│  │ (4-6h)     │         │ (2-3h)     │       │ (4-5h)     │  │
│  └─────────────┘         └─────────────┘       └─────────────┘  │
│         ↓                       ↓                    ↓          │
│  ┌─────────────┐         ┌─────────────┐       ┌─────────────┐  │
│  │ TASK-02    │         │ TASK-07    │       │ TASK-03    │  │
│  │ 打卡流程优化 │         │ Solana部署  │       │ 周期复盘    │  │
│  │ (3-4h)     │         │ (3-4h)     │       │ (6-8h)     │  │
│  └─────────────┘         └─────────────┘       └─────────────┘  │
│         ↓                       ↓                               │
│  ┌─────────────┐         ┌─────────────┐                       │
│  │ TASK-05    │         │ TASK-08    │                       │
│  │ 个人主页    │         │ 前端集成    │                       │
│  │ (3-4h)     │         │ (3-4h)     │                       │
│  └─────────────┘         └─────────────┘                       │
│         ↓                       ↓                               │
│  ┌─────────────┐         ┌─────────────┐                       │
│  │ TASK-09    │         │ TASK-10    │                       │
│  │ Coming Soon │         │ 测试修复    │                       │
│  │ (2-3h)     │         │ (4-5h)     │                       │
│  └─────────────┘         └─────────────┘                       │
│                                                                 │
│  总工时: 12-17h           总工时: 12-16h       总工时: 10-13h    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 标准配置 (4个AI) - 推荐

适用于：平衡效率和资源的最佳配置

```
┌─────────────────────────────────────────────────────────────────┐
│                        4 AI 配置方案 (推荐)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI-A (前端页面)    AI-B (Web3)      AI-C (数据)    AI-D (QA)   │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐   ┌──────────┐ │
│  │ TASK-01 │     │ TASK-06 │     │ TASK-04 │   │ TASK-09 │ │
│  │ 问卷系统 │     │ BNB部署  │     │ 图表组件 │   │ Coming  │ │
│  │ (4-6h)  │     │ (2-3h)  │     │ (4-5h)  │   │ Soon    │ │
│  └──────────┘     └──────────┘     └──────────┘   │ (2-3h)  │ │
│       ↓               ↓               ↓          └──────────┘ │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐       ↓       │
│  │ TASK-02 │     │ TASK-07 │     │ TASK-03 │   ┌──────────┐ │
│  │ 打卡流程 │     │ SOL部署  │     │ 周期复盘 │   │ TASK-10 │ │
│  │ (3-4h)  │     │ (3-4h)  │     │ (6-8h)  │   │ 测试修复 │ │
│  └──────────┘     └──────────┘     └──────────┘   │ (4-5h)  │ │
│       ↓               ↓                          └──────────┘ │
│  ┌──────────┐     ┌──────────┐                                │
│  │ TASK-05 │     │ TASK-08 │                                │
│  │ 个人主页 │     │ 前端集成 │                                │
│  │ (3-4h)  │     │ (3-4h)  │                                │
│  └──────────┘     └──────────┘                                │
│                                                                 │
│  工时: 10-14h     工时: 8-11h      工时: 10-13h   工时: 6-8h    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 加速配置 (5个AI)

适用于：时间紧迫需要快速完成

```
┌─────────────────────────────────────────────────────────────────┐
│                        5 AI 配置方案                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI-A        AI-B        AI-C        AI-D        AI-E          │
│  前端页面    Web3        数据可视化   QA          UI支持        │
│                                                                 │
│  TASK-01    TASK-06     TASK-04     TASK-10     TASK-09       │
│  问卷系统    BNB部署     图表组件     测试修复    Coming Soon   │
│  (4-6h)     (2-3h)      (4-5h)      (4-5h)      (2-3h)        │
│     ↓          ↓           ↓                        ↓          │
│  TASK-02    TASK-07     TASK-03                 协助优化       │
│  打卡流程    SOL部署     周期复盘                              │
│  (3-4h)     (3-4h)      (6-8h)                               │
│     ↓          ↓                                              │
│  TASK-05    TASK-08                                           │
│  个人主页    前端集成                                           │
│  (3-4h)     (3-4h)                                            │
│                                                                 │
│  工时:7-11h 工时:8-11h  工时:10-13h 工时:4-5h   工时:2-3h      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、详细任务分配

### 3.1 AI-A: 全栈前端工程师

**职责**: 负责所有用户界面页面的开发

**任务序列**:

#### 任务1: TASK-01 人生规划问卷系统
```
优先级: P0
预计工时: 4-6小时
依赖: 无

产出文件:
├── app/onboarding/page.tsx          # 问卷主页面
├── components/onboarding/
│   ├── WelcomeStep.tsx              # 欢迎页
│   ├── WealthGoalStep.tsx           # 财富目标
│   ├── HealthGoalStep.tsx           # 健康目标
│   ├── FamilyGoalStep.tsx           # 家庭目标
│   ├── OtherGoalStep.tsx            # 其他目标
│   ├── ConfirmStep.tsx              # 确认页
│   └── StepIndicator.tsx            # 步骤指示器
├── lib/db-goals.ts                  # 目标数据库服务
└── lib/onboarding-service.ts        # 问卷服务

功能要求:
1. 5年人生目标设置
2. 多维度选项（财富/健康/家庭/其他）
3. 每个维度提供3-5个可选目标
4. 步骤导航（前进/后退）
5. 数据持久化到IndexedDB
6. 首次进入检测（已完成则跳过）

UI要求:
- 水墨风格
- 卡片式选项
- 流畅过渡动画
- 移动端适配
```

#### 任务2: TASK-02 每日打卡流程优化
```
优先级: P0
预计工时: 3-4小时
依赖: 无

产出文件:
├── app/check-in/page.tsx            # 打卡主页面
├── components/check-in/
│   ├── DailyQuestion.tsx            # 核心问题组件
│   ├── YesNoButtons.tsx             # 是/否按钮
│   ├── ReflectionInput.tsx          # 文本复盘输入
│   ├── AIPreview.tsx                # AI整理预览
│   └── PhotoUpload.tsx              # 照片上传
└── lib/check-in-service.ts          # 打卡服务

功能要求:
1. 核心问题展示：「你觉得今天是否度过了有意义的一天？」
2. 大按钮选择：[是] [否]
3. 文本复盘输入框
4. AI整理功能（调用DeepSeek API）
5. 照片上传（可选）
6. 记录「是/否」选择到数据库

数据结构:
{
  date: string,
  meaningful: boolean,      // 是/否
  originalText: string,     // 用户原文
  aiSummary: string,        // AI整理
  photos: string[],         // 照片URL
  timestamp: number
}
```

#### 任务3: TASK-05 个人主页开发
```
优先级: P1
预计工时: 3-4小时
依赖: TASK-01, TASK-02

产出文件:
├── app/profile/page.tsx             # 个人主页
├── components/profile/
│   ├── UserInfo.tsx                 # 用户信息
│   ├── GoalDisplay.tsx              # 目标展示
│   ├── CheckInTimeline.tsx          # 打卡时间线
│   └── SBTShowcase.tsx              # SBT展示
└── lib/profile-service.ts           # 个人主页服务

功能要求:
1. 用户基本信息（钱包地址、头像）
2. 人生目标展示（来自问卷）
3. 打卡记录时间线
4. SBT成就展示
```

**AI-A 总工时**: 10-14小时

---

### 3.2 AI-B: Web3/后端工程师

**职责**: 负责合约部署和数据服务

**任务序列**:

#### 任务1: TASK-06 BNB Chain合约部署
```
优先级: P0
预计工时: 2-3小时
依赖: 无

产出文件:
├── scripts/deploy-bnb-sbt.ts        # 部署脚本
├── scripts/verify-bnb.ts            # 验证脚本
└── docs/BNB-DEPLOYMENT.md           # 部署文档

执行步骤:
1. 检查 contracts/ZhengDaoSBT.sol
2. 配置 hardhat.config.ts (BNB Testnet)
3. 编写部署脚本
4. 部署到 BNB Testnet
5. 在 BSCScan 验证合约
6. 更新 .env.local 合约地址

验收标准:
- 合约成功部署
- BSCScan 验证通过
- 配置文件已更新
```

#### 任务2: TASK-07 Solana程序部署
```
优先级: P0
预计工时: 3-4小时
依赖: 无

产出文件:
├── programs/zhengdao-sbt/scripts/
│   ├── deploy-devnet.sh             # 部署脚本
│   └── test-devnet.sh               # 测试脚本
└── docs/SOLANA-DEPLOYMENT.md        # 部署文档

执行步骤:
1. 检查 programs/zhengdao-sbt/src/lib.rs
2. 配置 Anchor.toml (Devnet)
3. 编译: anchor build
4. 部署: anchor deploy --provider.cluster devnet
5. 导出 IDL
6. 更新 .env.local Program ID

验收标准:
- 程序成功部署到 Devnet
- IDL 正确导出
- 配置文件已更新
```

#### 任务3: TASK-08 前端合约集成
```
优先级: P0
预计工时: 3-4小时
依赖: TASK-06, TASK-07

产出文件:
├── lib/contractABI.ts               # 更新合约地址
├── lib/solana-sbt-manager.ts        # 更新Program ID
├── lib/chain-manager.ts             # 更新配置
└── components/achievement/          # 更新组件

执行步骤:
1. 更新 BNB 合约地址
2. 更新 Solana Program ID
3. 测试 BNB SBT 铸造
4. 测试 Solana SBT 铸造
5. 完善错误处理
6. 更新文档

验收标准:
- BNB SBT 铸造正常
- Solana SBT 铸造正常
- 错误提示友好
```

**AI-B 总工时**: 8-11小时

---

### 3.3 AI-C: 数据可视化工程师

**职责**: 负责图表组件和周期复盘系统

**任务序列**:

#### 任务1: TASK-04 数据可视化组件
```
优先级: P0
预计工时: 4-5小时
依赖: 无

产出文件:
├── components/charts/
│   ├── YesNoRatioChart.tsx          # 是/否比例饼图
│   ├── CheckInTrendChart.tsx        # 打卡趋势曲线
│   ├── GoalProgressChart.tsx        # 目标进度条
│   ├── MeaningfulDaysTrend.tsx      # 有意义天数趋势
│   └── index.ts                     # 导出
└── lib/chart-utils.ts               # 图表工具函数

技术要求:
- 使用 recharts 库（已安装）
- 水墨风格配色
- 响应式设计
- 支持时间范围筛选

图表1: YesNoRatioChart
- 饼图展示「是/否」比例
- 显示具体数字和百分比
- 支持 7日/30日/全部 切换

图表2: CheckInTrendChart
- 折线图展示打卡趋势
- X轴: 日期
- Y轴: 打卡数据量（字数）
- 支持缩放

图表3: GoalProgressChart
- 进度条展示各维度目标
- 财富/健康/家庭/其他
- 显示完成百分比

图表4: MeaningfulDaysTrend
- 面积图展示「有意义天数」趋势
- 按周/月聚合
```

#### 任务2: TASK-03 周期复盘系统
```
优先级: P0
预计工时: 6-8小时
依赖: TASK-04

产出文件:
├── app/review/page.tsx              # 复盘主页面
├── app/review/[period]/page.tsx     # 周期详情页
├── components/review/
│   ├── PeriodSelector.tsx           # 周期选择器
│   ├── StatsSummary.tsx             # 统计摘要
│   ├── AIReviewSummary.tsx          # AI复盘总结
│   ├── GoalComparison.tsx           # 目标对比（年度）
│   └── ProblemAnalysis.tsx          # 问题分析
└── lib/review-service.ts            # 复盘服务

功能要求:

1. 四个复盘周期:
   - 7日复盘 (/review/7d)
   - 30日复盘 (/review/30d)
   - 半年复盘 (/review/6m)
   - 年度复盘 (/review/1y)

2. 每个周期展示:
   - 打卡天数统计
   - 「是/否」比例图表
   - 打卡数据量曲线
   - AI生成的周期总结

3. 年度复盘特殊功能:
   - 对比年初设定的目标
   - 分析目标达成度
   - 定位问题月份/时间点
   - 给出改进建议

AI总结Prompt模板:
"请根据以下{period}的打卡数据，生成一份复盘总结：
- 打卡天数: {days}
- 有意义天数比例: {ratio}%
- 用户反思内容摘要: {summaries}
请分析用户的状态变化，给出鼓励和建议。"

年度目标对比Prompt:
"用户年初设定的目标：{goals}
实际完成情况：{actual}
请分析目标达成度，找出问题所在的时间点，并给出改进建议。"
```

**AI-C 总工时**: 10-13小时

---

### 3.4 AI-D: QA工程师 (可选)

**职责**: 负责测试和Coming Soon页面

**任务序列**:

#### 任务1: TASK-09 Coming Soon页面完善
```
优先级: P2
预计工时: 2-3小时
依赖: 无

产出文件:
├── app/coming-soon/page.tsx         # 完善
└── components/ComingSoonCard.tsx    # 完善

内容要求:

1. DeFi挑战池卡片:
   标题: 「挑战池」
   图标: 💰
   描述: 入金参与挑战，完成打卡目标瓜分奖励池
   规则:
   - 选择挑战周期（7天/30天/100天）
   - 入金到挑战池
   - 完成打卡目标获得奖励
   - 失败者资金进入奖励池

2. 名人挑战赛卡片:
   标题: 「名人挑战」
   图标: ⭐
   描述: 追踪名人自律情况，参与预测赢取奖励
   规则:
   - 选择追踪的名人
   - 预测名人是否完成自律目标
   - 预测正确获得奖励

3. 积分系统卡片:
   标题: 「积分系统」
   图标: 🎯
   描述: 打卡获取积分，积分可兑换权益
   规则:
   - 每日打卡获得基础积分
   - 连续打卡获得加成
   - 积分可兑换SBT、特权等

4. PVP机制卡片:
   标题: 「论剑」
   图标: ⚔️
   描述: 与好友PK打卡，胜者获得额外奖励
   规则:
   - 发起/接受挑战
   - 比拼打卡天数或质量
   - 胜者获得对方质押的积分
```

#### 任务2: TASK-10 测试与Bug修复
```
优先级: P0
预计工时: 4-5小时
依赖: 所有其他任务

测试清单:

[ ] 首次进入流程
    - 连接钱包
    - 显示问卷
    - 完成问卷
    - 进入主页

[ ] 人生规划问卷
    - 步骤导航
    - 选项选择
    - 数据保存
    - 再次进入不显示

[ ] 每日打卡
    - 核心问题显示
    - 是/否选择
    - 文本输入
    - AI整理
    - 照片上传
    - 数据保存

[ ] 周期复盘
    - 7日复盘
    - 30日复盘
    - 半年复盘
    - 年度复盘
    - 图表展示
    - AI总结

[ ] SBT铸造
    - BNB链铸造
    - Solana链铸造
    - 错误处理

[ ] 个人主页
    - 信息展示
    - 目标展示
    - 时间线
    - SBT展示

[ ] 响应式布局
    - 桌面端
    - 平板端
    - 移动端
```

**AI-D 总工时**: 6-8小时

---

## 四、执行时间线

### 4.1 Day 1: 并行启动 (所有AI同时开始)

```
时间线:
├── 0h-2h
│   ├── AI-A: 开始 TASK-01 (问卷系统)
│   ├── AI-B: 开始 TASK-06 (BNB部署)
│   ├── AI-C: 开始 TASK-04 (图表组件)
│   └── AI-D: 开始 TASK-09 (Coming Soon)
│
├── 2h-4h
│   ├── AI-A: 继续 TASK-01
│   ├── AI-B: 完成 TASK-06, 开始 TASK-07 (Solana部署)
│   ├── AI-C: 继续 TASK-04
│   └── AI-D: 完成 TASK-09
│
├── 4h-6h
│   ├── AI-A: 完成 TASK-01, 开始 TASK-02 (打卡流程)
│   ├── AI-B: 继续 TASK-07
│   ├── AI-C: 完成 TASK-04, 开始 TASK-03 (周期复盘)
│   └── AI-D: 待命/协助测试
│
└── Day 1 结束时预期完成:
    ✅ TASK-01 (问卷系统)
    ✅ TASK-06 (BNB部署)
    ✅ TASK-09 (Coming Soon)
    ⏳ TASK-02 (打卡流程) - 进行中
    ⏳ TASK-07 (Solana部署) - 进行中
    ⏳ TASK-04 (图表组件) - 完成
    ⏳ TASK-03 (周期复盘) - 进行中
```

### 4.2 Day 2: 核心功能完成

```
时间线:
├── 0h-4h
│   ├── AI-A: 完成 TASK-02, 开始 TASK-05 (个人主页)
│   ├── AI-B: 完成 TASK-07, 开始 TASK-08 (前端集成)
│   ├── AI-C: 继续 TASK-03
│   └── AI-D: 开始 TASK-10 (测试)
│
├── 4h-8h
│   ├── AI-A: 完成 TASK-05
│   ├── AI-B: 完成 TASK-08
│   ├── AI-C: 完成 TASK-03
│   └── AI-D: 继续 TASK-10
│
└── Day 2 结束时预期完成:
    ✅ TASK-02 (打卡流程)
    ✅ TASK-05 (个人主页)
    ✅ TASK-07 (Solana部署)
    ✅ TASK-08 (前端集成)
    ✅ TASK-03 (周期复盘)
    ⏳ TASK-10 (测试) - 进行中
```

### 4.3 Day 3: 测试收尾

```
时间线:
├── 0h-4h
│   ├── AI-D: 完成 TASK-10
│   └── 全员: Bug修复
│
└── Day 3 结束时预期完成:
    ✅ 所有任务完成
    ✅ 主流程测试通过
    ✅ Bug修复完成
```

---

## 五、给各AI的启动指令

### 5.1 启动 AI-A (全栈前端)

```
你是 AI-A，负责前端页面开发。

当前任务：TASK-01 人生规划问卷系统

项目位置：/home/ubuntu/project/黑客松项目-证道/

请按以下步骤执行：

1. 创建 app/onboarding/page.tsx
2. 创建问卷组件：
   - components/onboarding/WelcomeStep.tsx
   - components/onboarding/WealthGoalStep.tsx
   - components/onboarding/HealthGoalStep.tsx
   - components/onboarding/FamilyGoalStep.tsx
   - components/onboarding/OtherGoalStep.tsx
   - components/onboarding/ConfirmStep.tsx
3. 创建 lib/db-goals.ts 数据库服务
4. 创建 lib/onboarding-service.ts 问卷服务
5. 实现首次进入检测逻辑

目标选项参考：
- 财富：月收入目标、存款目标、投资收益目标
- 健康：运动频率、体重管理、睡眠质量
- 家庭：家庭陪伴时间、亲子关系、伴侣关系
- 其他：学习成长、社交关系、兴趣爱好

UI风格：水墨风格，参考现有组件的设计语言。

完成后请汇报进度。
```

### 5.2 启动 AI-B (Web3/后端)

```
你是 AI-B，负责Web3和后端开发。

当前任务：TASK-06 BNB Chain合约部署

项目位置：/home/ubuntu/project/黑客松项目-证道/

请按以下步骤执行：

1. 检查 contracts/ZhengDaoSBT.sol 合约代码
2. 配置 hardhat.config.ts：
   - 添加 BNB Testnet 网络配置
   - Chain ID: 97
   - RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
3. 创建 scripts/deploy-bnb-sbt.ts 部署脚本
4. 执行部署（需要测试网BNB）
5. 在 BSCScan 验证合约
6. 更新 .env.local 中的 NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS

如果没有测试网BNB，请先从水龙头获取：
https://testnet.bnbchain.org/faucet-smart

完成后请汇报：合约地址、部署交易hash、验证状态。
```

### 5.3 启动 AI-C (数据可视化)

```
你是 AI-C，负责数据可视化开发。

当前任务：TASK-04 数据可视化组件

项目位置：/home/ubuntu/project/黑客松项目-证道/

请按以下步骤执行：

1. 创建 components/charts/ 目录
2. 开发以下图表组件（使用 recharts 库）：
   - YesNoRatioChart.tsx：是/否比例饼图
   - CheckInTrendChart.tsx：打卡趋势曲线
   - GoalProgressChart.tsx：目标进度条
   - MeaningfulDaysTrend.tsx：有意义天数趋势
3. 创建 lib/chart-utils.ts 工具函数

设计要求：
- 水墨风格配色（墨黑#000000, 朱砂红#D43628, 纸白#FFFEF2）
- 响应式设计
- 支持时间范围筛选

完成后请汇报进度。
```

### 5.4 启动 AI-D (QA)

```
你是 AI-D，负责QA和测试。

当前任务：TASK-09 Coming Soon页面完善

项目位置：/home/ubuntu/project/黑客松项目-证道/

请按以下步骤执行：

1. 完善 app/coming-soon/page.tsx
2. 添加四个功能介绍卡片：
   - DeFi挑战池：入金机制、挑战规则、瓜分机制
   - 名人挑战赛：追踪机制、预测玩法
   - 积分系统：获取方式、兑换用途
   - PVP论剑：挑战规则、奖励机制

每个卡片包含：
- 图标
- 标题
- 描述
- 规则说明
- "Coming Soon" 标签

设计风格：水墨风格，简洁大气。

完成后请汇报进度。
```

---

## 六、验收检查清单

### 6.1 功能验收

```
[ ] 首次进入流程
    [ ] 连接钱包后显示问卷
    [ ] 问卷可前进/后退
    [ ] 数据正确保存
    [ ] 完成后不再显示

[ ] 每日打卡
    [ ] 核心问题清晰展示
    [ ] 是/否选择正确记录
    [ ] 文本输入流畅
    [ ] AI整理功能正常
    [ ] 照片上传正常

[ ] 周期复盘
    [ ] 四个周期页面正常
    [ ] 数据统计准确
    [ ] 图表展示正确
    [ ] AI总结功能正常
    [ ] 年度目标对比正常

[ ] SBT铸造
    [ ] BNB链铸造正常
    [ ] Solana链铸造正常
    [ ] 错误提示友好

[ ] 个人主页
    [ ] 信息展示正确
    [ ] 目标展示正确
    [ ] 时间线正常
    [ ] SBT展示正常

[ ] Coming Soon
    [ ] 四个卡片展示
    [ ] 内容完整
    [ ] 设计美观
```

### 6.2 技术验收

```
[ ] TypeScript 编译通过
[ ] 无控制台错误
[ ] 响应式布局正常
[ ] 页面加载 < 3秒
[ ] 数据持久化正常
```

---

**文档版本**: V2.0
**最后更新**: 2026-01-27
**维护者**: CTO Claude
