# 证道项目 - AI员工启动指令

**版本**: V1.0
**日期**: 2026-01-27

---

## 📌 通用启动指令

**复制以下指令给任意AI，只需修改 `[X]` 为对应的字母（A/B/C/D）：**

```
你是证道项目的 AI-[X] 员工。

📁 项目文档位置（按顺序阅读）：
1. AI-STARTUP-INSTRUCTIONS.md - 找到你的任务详情（当前文件）
2. CTO-AI-ASSIGNMENT-V2.md - 完整任务分配方案
3. CTO-DEVELOPMENT-PLAN-V2.md - 产品需求和设计文档
4. PROGRESS-TRACKER.md - 进度追踪表（完成任务后更新）

⚡ 请立即：
1. 阅读本文件中「AI-[X] 详细任务」部分
2. 开始执行你的第一个任务
3. 完成后更新 PROGRESS-TRACKER.md

如遇问题，在 PROGRESS-TRACKER.md 的「阻塞问题记录」中登记。
```

---

## 🅰️ AI-A 详细任务（全栈前端工程师）

### 角色定位
你是前端页面开发专家，负责用户界面和交互逻辑。

### 任务序列

| 顺序 | 任务 | 工时 | 依赖 |
|------|------|------|------|
| 1 | TASK-01 人生规划问卷系统 | 4-6h | 无 |
| 2 | TASK-02 每日打卡流程优化 | 3-4h | 无 |
| 3 | TASK-05 个人主页开发 | 3-4h | TASK-01,02 |

---

### TASK-01: 人生规划问卷系统

**目标**: 用户首次进入APP时显示的人生规划问卷，设置5年人生目标。

**产出文件**:
```
app/onboarding/page.tsx              # 问卷主页面
components/onboarding/
├── WelcomeStep.tsx                  # 欢迎页
├── WealthGoalStep.tsx               # 财富目标
├── HealthGoalStep.tsx               # 健康目标
├── FamilyGoalStep.tsx               # 家庭目标
├── OtherGoalStep.tsx                # 其他目标
├── ConfirmStep.tsx                  # 确认页
└── StepIndicator.tsx                # 步骤指示器
lib/db-goals.ts                      # 目标数据库服务
lib/onboarding-service.ts            # 问卷服务
```

**功能要求**:
1. 欢迎页：介绍产品理念「你想要过一个怎样的人生？」
2. 财富目标选项：
   - 月收入目标（1万/3万/5万/10万+）
   - 存款目标（10万/50万/100万/500万+）
   - 投资收益目标
3. 健康目标选项：
   - 运动频率（每周1次/3次/5次/每天）
   - 体重管理目标
   - 睡眠质量目标（6h/7h/8h+）
4. 家庭目标选项：
   - 家庭陪伴时间
   - 亲子关系改善
   - 伴侣关系维护
5. 其他目标选项：
   - 学习成长（读书/课程/技能）
   - 社交关系
   - 兴趣爱好
6. 确认页：汇总展示所有选择
7. 数据持久化到IndexedDB
8. 首次进入检测（已完成则跳过）

**UI要求**:
- 水墨风格（墨黑#000000, 朱砂红#D43628, 纸白#FFFEF2）
- 卡片式选项设计
- 步骤导航（可前进/后退）
- 流畅过渡动画
- 移动端适配

**验收标准**:
- [ ] 首次进入自动跳转到问卷页面
- [ ] 问卷流程流畅，可前进/后退
- [ ] 数据正确保存到IndexedDB
- [ ] 完成后不再显示问卷
- [ ] UI风格与现有水墨风格统一

---

### TASK-02: 每日打卡流程优化

**目标**: 优化每日打卡流程，增加核心问题和文本复盘。

**产出文件**:
```
app/check-in/page.tsx                # 打卡主页面
components/check-in/
├── DailyQuestion.tsx                # 核心问题组件
├── YesNoButtons.tsx                 # 是/否按钮
├── ReflectionInput.tsx              # 文本复盘输入
├── AIPreview.tsx                    # AI整理预览
└── PhotoUpload.tsx                  # 照片上传
lib/check-in-service.ts              # 打卡服务（更新）
```

**功能要求**:
1. 核心问题展示：「你觉得今天是否度过了有意义的一天？」
2. 两个大按钮：[是] [否]
3. 选择后进入文本复盘输入
4. 引导文案：「请复盘你今天的一天」
5. 文本输入框（支持多行，无字数限制）
6. AI整理功能：
   - 调用现有DeepSeek API
   - 保留用户原始文字
   - 生成AI整理后的版本
   - 并排展示对比
7. 照片上传（可选）
8. 保存时记录「是/否」选择

**数据结构**:
```typescript
interface DailyCheckIn {
  id: string;
  date: string;                    // YYYY-MM-DD
  meaningful: boolean;             // 是/否
  originalText: string;            // 用户原文
  aiSummary: string;               // AI整理
  photos: string[];                // 照片URL
  createdAt: number;               // 时间戳
}
```

**验收标准**:
- [ ] 核心问题清晰展示
- [ ] 是/否选择正确记录
- [ ] 文本输入流畅
- [ ] AI整理功能正常
- [ ] 数据正确保存

---

### TASK-05: 个人主页开发

**目标**: 用户个人主页，展示人生目标、打卡记录和SBT。

**产出文件**:
```
app/profile/page.tsx                 # 个人主页
components/profile/
├── UserInfo.tsx                     # 用户信息
├── GoalDisplay.tsx                  # 目标展示
├── CheckInTimeline.tsx              # 打卡时间线
└── SBTShowcase.tsx                  # SBT展示
lib/profile-service.ts               # 个人主页服务
```

**功能要求**:
1. 用户基本信息（钱包地址、头像）
2. 人生目标展示（来自问卷数据）
3. 打卡记录时间线（按日期倒序）
4. SBT成就展示（已铸造的SBT）

**验收标准**:
- [ ] 页面布局美观
- [ ] 数据展示正确
- [ ] 时间线交互流畅

---

## 🅱️ AI-B 详细任务（Web3/后端工程师）

### 角色定位
你是Web3和后端开发专家，负责合约部署和链上交互。

### 任务序列

| 顺序 | 任务 | 工时 | 依赖 |
|------|------|------|------|
| 1 | TASK-06 BNB Chain合约部署 | 2-3h | 无 |
| 2 | TASK-07 Solana程序部署 | 3-4h | 无 |
| 3 | TASK-08 前端合约集成 | 3-4h | TASK-06,07 |

---

### TASK-06: BNB Chain合约部署

**目标**: 将BNB Chain SBT合约部署到测试网。

**产出文件**:
```
scripts/deploy-bnb-sbt.ts            # 部署脚本
scripts/verify-bnb.ts                # 验证脚本
docs/BNB-DEPLOYMENT.md               # 部署文档（更新）
```

**执行步骤**:
1. 检查 `contracts/ZhengDaoSBT.sol` 合约代码
2. 配置 `hardhat.config.ts`：
   ```javascript
   bnbTestnet: {
     url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
     chainId: 97,
     accounts: [process.env.PRIVATE_KEY]
   }
   ```
3. 创建部署脚本 `scripts/deploy-bnb-sbt.ts`
4. 获取测试网BNB（水龙头：https://testnet.bnbchain.org/faucet-smart）
5. 执行部署：`npx hardhat run scripts/deploy-bnb-sbt.ts --network bnbTestnet`
6. 在BSCScan验证合约
7. 更新 `.env.local` 中的 `NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS`

**验收标准**:
- [ ] 合约成功部署到BNB Testnet
- [ ] BSCScan验证通过
- [ ] 配置文件已更新
- [ ] 部署文档已更新

**完成后汇报**:
- 合约地址
- 部署交易hash
- 验证状态

---

### TASK-07: Solana程序部署

**目标**: 将Solana SBT程序部署到Devnet。

**产出文件**:
```
programs/zhengdao-sbt/scripts/
├── deploy-devnet.sh                 # 部署脚本
└── test-devnet.sh                   # 测试脚本
docs/SOLANA-DEPLOYMENT.md            # 部署文档（更新）
```

**执行步骤**:
1. 检查 `programs/zhengdao-sbt/src/lib.rs` 程序代码
2. 配置 `Anchor.toml`：
   ```toml
   [provider]
   cluster = "devnet"
   ```
3. 编译程序：`anchor build`
4. 获取Devnet SOL（水龙头：`solana airdrop 2`）
5. 部署：`anchor deploy --provider.cluster devnet`
6. 导出IDL文件
7. 更新 `.env.local` 中的 Program ID

**验收标准**:
- [ ] 程序成功部署到Devnet
- [ ] IDL正确导出
- [ ] 配置文件已更新
- [ ] 部署文档已更新

**完成后汇报**:
- Program ID
- 部署交易签名
- IDL文件位置

---

### TASK-08: 前端合约集成

**目标**: 将部署后的合约集成到前端。

**依赖**: TASK-06和TASK-07必须先完成

**产出文件**:
```
lib/contractABI.ts                   # 更新合约地址
lib/solana-sbt-manager.ts            # 更新Program ID
lib/chain-manager.ts                 # 更新配置
```

**执行步骤**:
1. 更新 `lib/contractABI.ts` 中的BNB合约地址
2. 更新 `lib/solana-sbt-manager.ts` 中的Program ID
3. 测试BNB Chain SBT铸造功能
4. 测试Solana SBT铸造功能
5. 完善错误处理和用户提示

**验收标准**:
- [ ] BNB SBT铸造正常
- [ ] Solana SBT铸造正常
- [ ] 错误提示友好

---

## 🅲 AI-C 详细任务（数据可视化工程师）

### 角色定位
你是数据可视化专家，负责图表组件和数据分析功能。

### 任务序列

| 顺序 | 任务 | 工时 | 依赖 |
|------|------|------|------|
| 1 | TASK-04 数据可视化组件 | 4-5h | 无 |
| 2 | TASK-03 周期复盘系统 | 6-8h | TASK-04 |

---

### TASK-04: 数据可视化组件

**目标**: 开发周期复盘所需的数据可视化组件。

**产出文件**:
```
components/charts/
├── YesNoRatioChart.tsx              # 是/否比例饼图
├── CheckInTrendChart.tsx            # 打卡趋势曲线
├── GoalProgressChart.tsx            # 目标进度条
├── MeaningfulDaysTrend.tsx          # 有意义天数趋势
└── index.ts                         # 导出
lib/chart-utils.ts                   # 图表工具函数
```

**技术要求**:
- 使用 `recharts` 库（已安装）
- 水墨风格配色：
  - 主色：墨黑 #1a1a2e
  - 强调色：朱砂红 #D43628
  - 背景：纸白 #FFFEF2
  - 辅助：青灰 #6B7280
- 响应式设计
- 支持时间范围筛选

**图表1: YesNoRatioChart**
```typescript
interface Props {
  data: { yes: number; no: number };
  period: '7d' | '30d' | '6m' | '1y' | 'all';
}
```
- 饼图展示「是/否」比例
- 显示具体数字和百分比
- 中心显示总天数

**图表2: CheckInTrendChart**
```typescript
interface Props {
  data: Array<{ date: string; wordCount: number }>;
  period: '7d' | '30d' | '6m' | '1y';
}
```
- 折线图展示打卡数据量趋势
- X轴：日期
- Y轴：字数
- 支持hover显示详情

**图表3: GoalProgressChart**
```typescript
interface Props {
  goals: Array<{
    category: string;      // 财富/健康/家庭/其他
    target: string;        // 目标描述
    progress: number;      // 0-100
  }>;
}
```
- 横向进度条
- 显示各维度目标完成度
- 颜色区分不同维度

**图表4: MeaningfulDaysTrend**
```typescript
interface Props {
  data: Array<{ period: string; ratio: number }>;
  groupBy: 'week' | 'month';
}
```
- 面积图展示「有意义天数」比例趋势
- 按周/月聚合
- 显示趋势变化

**验收标准**:
- [ ] 四个图表组件完成
- [ ] 水墨风格统一
- [ ] 响应式布局正常
- [ ] 数据展示准确

---

### TASK-03: 周期复盘系统

**目标**: 基于用户每日输入，提供周期性复盘总结。

**依赖**: TASK-04必须先完成

**产出文件**:
```
app/review/page.tsx                  # 复盘主页面
app/review/[period]/page.tsx         # 周期详情页 (7d/30d/6m/1y)
components/review/
├── PeriodSelector.tsx               # 周期选择器
├── StatsSummary.tsx                 # 统计摘要
├── AIReviewSummary.tsx              # AI复盘总结
├── GoalComparison.tsx               # 目标对比（年度）
└── ProblemAnalysis.tsx              # 问题分析
lib/review-service.ts                # 复盘服务
```

**功能要求**:

**1. 四个复盘周期**:
- `/review/7d` - 7日复盘
- `/review/30d` - 30日复盘
- `/review/6m` - 半年复盘
- `/review/1y` - 年度复盘

**2. 每个周期展示**:
- 打卡天数统计
- 「是/否」比例图表（使用YesNoRatioChart）
- 打卡数据量曲线（使用CheckInTrendChart）
- AI生成的周期总结

**3. AI总结Prompt**:
```
请根据以下{period}的打卡数据，生成一份复盘总结：
- 打卡天数: {days}
- 有意义天数比例: {ratio}%
- 用户反思内容摘要: {summaries}

请分析用户的状态变化，给出鼓励和建议。字数控制在200字以内。
```

**4. 年度复盘特殊功能**:
- 对比年初设定的目标（来自问卷数据）
- 分析目标达成度
- 定位问题月份/时间点
- 给出改进建议

**年度目标对比Prompt**:
```
用户年初设定的目标：
{goals}

实际完成情况：
- 打卡天数: {days}/365
- 有意义天数比例: {ratio}%
- 各月份数据: {monthlyData}

请分析：
1. 目标达成度如何？
2. 哪个月份出现了问题？
3. 可能的原因是什么？
4. 给出具体的改进建议。
```

**验收标准**:
- [ ] 四个周期复盘页面正常显示
- [ ] 数据统计准确
- [ ] 图表展示正确
- [ ] AI总结功能正常
- [ ] 年度复盘目标对比功能完整

---

## 🅳 AI-D 详细任务（QA工程师）

### 角色定位
你是QA和测试专家，负责质量保证和Coming Soon页面。

### 任务序列

| 顺序 | 任务 | 工时 | 依赖 |
|------|------|------|------|
| 1 | TASK-09 Coming Soon页面完善 | 2-3h | 无 |
| 2 | TASK-10 测试与Bug修复 | 4-5h | 所有其他任务 |

---

### TASK-09: Coming Soon页面完善

**目标**: 完善Coming Soon页面，展示未来功能。

**产出文件**:
```
app/coming-soon/page.tsx             # 完善
components/ComingSoonCard.tsx        # 完善
```

**内容要求**:

**卡片1: DeFi挑战池**
```
图标: 💰
标题: 挑战池
描述: 入金参与挑战，完成打卡目标瓜分奖励池

规则说明:
• 选择挑战周期（7天/30天/100天）
• 入金到挑战池（最低0.1 BNB）
• 每日完成打卡即视为成功
• 周期结束后，成功者瓜分失败者的资金
• 全员成功则资金原路返还

标签: Coming Soon
```

**卡片2: 名人挑战赛**
```
图标: ⭐
标题: 名人挑战
描述: 追踪名人自律情况，参与预测赢取奖励

规则说明:
• 选择追踪的名人（KOL/创业者/明星）
• 系统自动追踪名人每日推文/动态
• 预测名人是否完成自律目标
• 预测正确获得积分奖励
• 名人未达标时，追踪者瓜分奖励池

标签: Coming Soon
```

**卡片3: 积分系统**
```
图标: 🎯
标题: 积分系统
描述: 打卡获取积分，积分可兑换权益

规则说明:
• 每日打卡获得10基础积分
• 连续打卡加成（7天+20%，30天+50%，100天+100%）
• 「有意义的一天」额外+5积分
• 积分可兑换：
  - 高级SBT皮肤
  - 挑战池入场券
  - 名人挑战特权
  - 专属头像框

标签: Coming Soon
```

**卡片4: PVP论剑**
```
图标: ⚔️
标题: 论剑
描述: 与好友PK打卡，胜者获得额外奖励

规则说明:
• 发起挑战，邀请好友参与
• 双方质押相同积分
• 比拼周期内的打卡表现：
  - 打卡天数
  - 有意义天数比例
  - 复盘质量评分
• 胜者获得对方质押的积分
• 平局则各自取回

标签: Coming Soon
```

**UI要求**:
- 水墨风格
- 卡片式布局（2x2网格）
- 每个卡片有图标、标题、描述、规则、标签
- 「Coming Soon」标签使用朱砂红色
- hover效果

**验收标准**:
- [ ] 四个卡片内容完整
- [ ] 设计美观，风格统一
- [ ] 移动端适配

---

### TASK-10: 测试与Bug修复

**目标**: 全面测试和Bug修复。

**依赖**: 所有其他任务完成后执行

**测试清单**:

```
[ ] 首次进入流程
    [ ] 连接钱包
    [ ] 显示问卷
    [ ] 完成问卷
    [ ] 进入主页
    [ ] 再次进入不显示问卷

[ ] 人生规划问卷 (TASK-01)
    [ ] 步骤导航（前进/后退）
    [ ] 各维度选项选择
    [ ] 数据保存到IndexedDB
    [ ] 确认页汇总正确

[ ] 每日打卡 (TASK-02)
    [ ] 核心问题显示
    [ ] 是/否选择
    [ ] 文本输入
    [ ] AI整理功能
    [ ] 照片上传
    [ ] 数据保存

[ ] 周期复盘 (TASK-03)
    [ ] 7日复盘页面
    [ ] 30日复盘页面
    [ ] 半年复盘页面
    [ ] 年度复盘页面
    [ ] 图表展示正确
    [ ] AI总结功能
    [ ] 年度目标对比

[ ] 数据图表 (TASK-04)
    [ ] 是/否比例图
    [ ] 打卡趋势图
    [ ] 目标进度图
    [ ] 有意义天数趋势图

[ ] 个人主页 (TASK-05)
    [ ] 用户信息展示
    [ ] 目标展示
    [ ] 打卡时间线
    [ ] SBT展示

[ ] SBT铸造 (TASK-06,07,08)
    [ ] BNB链连接
    [ ] BNB SBT铸造
    [ ] Solana链连接
    [ ] Solana SBT铸造
    [ ] 错误处理

[ ] Coming Soon (TASK-09)
    [ ] 四个卡片展示
    [ ] 内容完整
    [ ] 样式正确

[ ] 响应式布局
    [ ] 桌面端 (1920px)
    [ ] 平板端 (768px)
    [ ] 移动端 (375px)

[ ] 性能检查
    [ ] 页面加载 < 3秒
    [ ] 无控制台错误
    [ ] 无内存泄漏
```

**Bug修复流程**:
1. 发现Bug后记录到 PROGRESS-TRACKER.md
2. 评估严重程度（P0阻塞/P1重要/P2一般）
3. 修复或通知对应AI修复
4. 验证修复结果

**验收标准**:
- [ ] 主流程无阻塞Bug
- [ ] 测试覆盖率 > 80%
- [ ] 性能达标

---

## 📊 进度汇报格式

完成任务后，请在 `PROGRESS-TRACKER.md` 中添加：

```markdown
## AI-[X] 进度汇报 (时间: YYYY-MM-DD HH:MM)

**任务**: TASK-XX XXX
**状态**: ✅已完成 / 🔄进行中(XX%) / ❌阻塞

**产出文件**:
- path/to/file1.tsx
- path/to/file2.ts

**测试结果**: 通过 / 部分通过 / 未测试

**问题**: 无 / 描述具体问题

**下一步**: 开始TASK-XX / 等待依赖 / 需要协助
```

---

## ❓ 常见问题

**Q: 找不到某个依赖库？**
A: 运行 `pnpm install` 安装所有依赖

**Q: TypeScript报错？**
A: 检查类型定义，参考现有代码风格

**Q: 不确定UI风格？**
A: 参考 `components/` 目录下现有组件的设计

**Q: 遇到阻塞问题？**
A: 在 PROGRESS-TRACKER.md 的「阻塞问题记录」中登记，等待CTO协助

---

**文档版本**: V1.0
**最后更新**: 2026-01-27
**维护者**: CTO Claude
