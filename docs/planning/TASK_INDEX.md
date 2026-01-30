# 证道项目 - 任务快速索引

**使用说明**:
1. 每个AI分配一个编号
2. 告诉AI"你是AI #X，请执行TASK-Y-Z"
3. AI会自动去TASK_ASSIGNMENTS.md查找详细任务说明

---

## 👥 团队角色分配

| AI编号 | 角色 | 主要技能 | 负责任务 |
|--------|------|----------|----------|
| **AI #1** | BNB Chain智能合约工程师 | Solidity, Hardhat, ERC-721 | TASK-1-1 到 TASK-1-3 |
| **AI #2** | Solana程序工程师 | Rust, Anchor, Solana Web3 | TASK-2-1 到 TASK-2-3 |
| **AI #3** | 前端核心开发工程师 | React, TypeScript, 状态管理 | TASK-1-6, TASK-1-7, TASK-1-11, TASK-2-4, TASK-2-5 |
| **AI #4** | UI组件开发工程师 | React组件, Tailwind CSS, 动画 | TASK-1-8 到 TASK-1-10, TASK-2-6到 TASK-2-8 |
| **AI #5** | UI/UX设计师 | UI设计, 视觉设计, 水墨风格 | TASK-1-4, TASK-1-5, TASK-3-1 |
| **AI #6** | DevOps与集成工程师 | 配置管理, 部署, 测试 | TASK-1-12, TASK-3-4到 TASK-3-6 |

---

## 📋 完整任务清单

### Week 1-2: BNB Chain SBT实现

#### TASK-1-1: BNB SBT合约开发 ⭐⭐⭐⭐⭐
- **负责人**: AI #1
- **工时**: 2天
- **优先级**: P0
- **状态**: 待开始
- **文档**: TASK_ASSIGNMENTS.md 第1447-1612行
- **产出**: `/contracts/ZhengDaoSBT.sol`
- **验收**: 合约编译通过，90%测试覆盖率

#### TASK-1-2: BNB合约测试 ⭐⭐⭐⭐⭐
- **负责人**: AI #1
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-1
- **文档**: TASK_ASSIGNMENTS.md 第1614-1729行
- **产出**: `/contracts/ZhengDaoSBT.test.ts`
- **验收**: 所有测试通过，覆盖率>90%

#### TASK-1-3: BNB合约部署 ⭐⭐⭐⭐⭐
- **负责人**: AI #1
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-2
- **文档**: TASK_ASSIGNMENTS.md 第1731-1838行
- **产出**: 部署到BNB Testnet
- **验收**: 合约在BscScan可查

#### TASK-1-4: SBT视觉设计 ⭐⭐⭐⭐⭐
- **负责人**: AI #5
- **工时**: 2天
- **优先级**: P0
- **状态**: 待开始
- **文档**: TASK_ASSIGNMENTS.md 第1840-2182行
- **产出**: 6个等级的SBT图像
- **验收**: 水墨风格统一，1080x1080px

#### TASK-1-5: 元数据准备 ⭐⭐⭐⭐⭐
- **负责人**: AI #5
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-4
- **文档**: TASK_ASSIGNMENTS.md 第2184-2429行
- **产出**: 6个元数据JSON文件
- **验收**: JSON格式正确

#### TASK-1-6: 成就系统核心 ⭐⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 2天
- **优先级**: P0
- **状态**: 待开始
- **文档**: TASK_ASSIGNMENTS.md 第2431-2897行
- **产出**: `/lib/achievement-system.ts`, `/lib/achievement-service.ts`
- **验收**: 6个等级定义正确，计算逻辑无误

#### TASK-1-7: 数据库扩展 ⭐⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-6
- **文档**: TASK_ASSIGNMENTS.md 第2899-3440行
- **产出**: `/lib/db-achievement.ts`
- **验收**: 数据库升级到v2，CRUD操作正常

#### TASK-1-8: LevelDisplay组件 ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-6
- **文档**: TASK_ASSIGNMENTS.md 第3449-3763行
- **产出**: `/components/achievement/LevelDisplay.tsx`
- **验收**: 显示当前等级、进度条

#### TASK-1-9: SBTGallery组件 ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 2天
- **优先级**: P0
- **依赖**: TASK-1-6
- **文档**: TASK_ASSIGNMENTS.md 第3765-4253行
- **产出**: `/components/achievement/SBTGallery.tsx`
- **验收**: SBT展示墙，瀑布流动画

#### TASK-1-10: ClaimSBTFlow组件 ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-9
- **文档**: TASK_ASSIGNMENTS.md 第4255-4921行
- **产出**: `/components/achievement/ClaimSBTFlow.tsx`
- **验收**: 3步申领流程，错误处理完善

#### TASK-1-11: BNB合约集成 ⭐⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-1-3, TASK-1-7, TASK-1-10
- **文档**: TASK_ASSIGNMENTS.md 第4923-5337行
- **产出**: `/lib/contracts/sbt.ts`, `/lib/sbt-manager.ts`
- **验收**: 成功调用mintSBT，交易成功

#### TASK-1-12: 项目配置和依赖 ⭐⭐⭐⭐⭐
- **负责人**: AI #6
- **工时**: 1天
- **优先级**: P0
- **状态**: 待开始
- **文档**: TASK_ASSIGNMENTS.md 第5339-5732行
- **产出**: 所有配置文件，目录结构
- **验收**: npm run dev正常启动

---

### Week 3-5: Solana SBT实现

#### TASK-2-1: Solana SBT程序开发 ⭐⭐⭐⭐⭐
- **负责人**: AI #2
- **工时**: 3天
- **优先级**: P0
- **状态**: 待开始
- **文档**: TASK_ASSIGNMENTS.md 第5734-6172行
- **产出**: `/programs/zhengdao-sbt/src/lib.rs`
- **验收**: Anchor程序编译通过

#### TASK-2-2: Solana程序测试 ⭐⭐⭐⭐
- **负责人**: AI #2
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-1
- **文档**: TASK_ASSIGNMENTS.md 第6174-6281行
- **产出**: `/programs/zhengdao-sbt/tests/zhengdao-sbt.ts`
- **验收**: 测试覆盖率>85%

#### TASK-2-3: Solana程序部署 ⭐⭐⭐⭐
- **负责人**: AI #2
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-2
- **文档**: TASK_ASSIGNMENTS.md 第6283-6383行
- **产出**: 部署到Solana Devnet
- **验收**: 程序在Explorer可查

#### TASK-2-4: Solana钱包集成 ⭐⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 2天
- **优先级**: P0
- **依赖**: TASK-2-3
- **文档**: TASK_ASSIGNMENTS.md 第6385-6700行
- **产出**: `/lib/chain-manager.ts`, `/lib/hooks/useSolanaWallet.ts`
- **验收**: Phantom钱包连接正常

#### TASK-2-5: 双链管理器 ⭐⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-4
- **文档**: TASK_ASSIGNMENTS.md 第6702-6950行
- **产出**: `/lib/multi-chain-achievement-service.ts`
- **验收**: 双链数据独立，可切换

#### TASK-2-6: ChainSwitcher组件 ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-5
- **详细**: 参考TASK-1-8类似结构
- **产出**: `/components/achievement/ChainSwitcher.tsx`
- **验收**: BNB/Solana切换流畅

#### TASK-2-7: DualChainStatus组件 ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-5
- **详细**: 参考TASK-1-8类似结构
- **产出**: `/components/achievement/DualChainStatus.tsx`
- **验收**: 双链对比显示正确

#### TASK-2-8: SBT组件适配Solana ⭐⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-5
- **详细**: 复用BNB组件，适配Solana API
- **产出**: 更新所有SBT组件
- **验收**: Solana SBT可以展示和claim

#### TASK-2-9: 双链数据同步 ⭐⭐⭐⭐
- **负责人**: AI #3
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-2-5
- **详细**: 链上数据同步到本地数据库
- **产出**: syncSBTsFromChain函数
- **验收**: 链上SBT可以查询到

---

### Week 6: Coming Soon与打磨

#### TASK-3-1: Coming Soon界面设计 ⭐⭐⭐
- **负责人**: AI #5
- **工时**: 1天
- **优先级**: P1
- **状态**: 待开始
- **文档**: 参考TASK_ASSIGNMENTS.md Coming Soon部分
- **产出**: 4个功能的UI设计
- **验收**: 统一的Coming Soon样式

#### TASK-3-2: Coming Soon组件 ⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P1
- **依赖**: TASK-3-1
- **详细**: 实现ComingSoonBadge组件
- **产出**: `/components/achievement/ComingSoonBadge.tsx`
- **验收**: 4个功能占位正确

#### TASK-3-3: 动画效果优化 ⭐⭐⭐
- **负责人**: AI #4
- **工时**: 1天
- **优先级**: P1
- **依赖**: 所有UI组件
- **详细**: 添加framer-motion动画
- **产出**: 组件动画增强
- **验收**: 动画流畅，性能好

#### TASK-3-4: 集成测试 ⭐⭐⭐⭐⭐
- **负责人**: AI #6
- **工时**: 2天
- **优先级**: P0
- **依赖**: 所有前置任务
- **文档**: TASK_ASSIGNMENTS.md 集成测试部分
- **产出**: 测试报告，bug修复
- **验收**: 端到端流程通过

#### TASK-3-5: 性能优化 ⭐⭐⭐
- **负责人**: AI #6
- **工时**: 1天
- **优先级**: P1
- **依赖**: TASK-3-4
- **详细**: 优化加载速度，减少bundle大小
- **产出**: 性能优化报告
- **验收**: 页面加载<3s

#### TASK-3-6: 文档和部署指南 ⭐⭐⭐⭐
- **负责人**: AI #6
- **工时**: 1天
- **优先级**: P0
- **依赖**: TASK-3-4
- **详细**: 完善所有文档
- **产出**: 部署指南，用户手册
- **验收**: 文档完整，可部署

---

## 🎯 快速开始指令模板

### 给AI #1 (BNB Chain合约工程师)
```
你是AI #1，负责BNB Chain智能合约开发。

你的任务列表：
1. TASK-1-1: 开发BNB SBT合约 (2天)
   - 查看TASK_ASSIGNMENTS.md第1447-1612行
   - 创建 /contracts/ZhengDaoSBT.sol

2. TASK-1-2: 编写合约测试 (1天)
   - 查看TASK_ASSIGNMENTS.md第1614-1729行
   - 创建 /contracts/ZhengDaoSBT.test.ts

3. TASK-1-3: 部署合约到testnet (1天)
   - 查看TASK_ASSIGNMENTS.md第1731-1838行
   - 部署到BNB Chain Testnet

请从TASK-1-1开始，完成后告诉我。
```

### 给AI #2 (Solana程序工程师)
```
你是AI #2，负责Solana SBT程序开发。

你的任务列表：
1. TASK-2-1: 开发Solana SBT程序 (3天)
   - 查看TASK_ASSIGNMENTS.md第5734-6172行
   - 创建 /programs/zhengdao-sbt/src/lib.rs

2. TASK-2-2: 编写程序测试 (1天)
   - 查看TASK_ASSIGNMENTS.md第6174-6281行
   - 创建测试文件

3. TASK-2-3: 部署程序到Devnet (1天)
   - 查看TASK_ASSIGNMENTS.md第6283-6383行
   - 部署到Solana Devnet

请从TASK-2-1开始，完成后告诉我。
```

### 给AI #3 (前端核心开发)
```
你是AI #3，负责前端核心逻辑开发。

你的任务列表：
1. TASK-1-6: 成就系统核心 (2天)
2. TASK-1-7: 数据库扩展 (1天)
3. TASK-1-11: BNB合约集成 (1天)
4. TASK-2-4: Solana钱包集成 (2天)
5. TASK-2-5: 双链管理器 (1天)
6. TASK-2-9: 双链数据同步 (1天)

详细说明在TASK_ASSIGNMENTS.md中，请按顺序执行。
```

### 给AI #4 (UI组件开发)
```
你是AI #4，负责UI组件开发。

你的任务列表：
1. TASK-1-8: LevelDisplay组件 (1天)
2. TASK-1-9: SBTGallery组件 (2天)
3. TASK-1-10: ClaimSBTFlow组件 (1天)
4. TASK-2-6: ChainSwitcher组件 (1天)
5. TASK-2-7: DualChainStatus组件 (1天)
6. TASK-2-8: SBT组件适配Solana (1天)
7. TASK-3-2: Coming Soon组件 (1天)
8. TASK-3-3: 动画效果优化 (1天)

详细说明在TASK_ASSIGNMENTS.md中，请按顺序执行。
```

### 给AI #5 (UI/UX设计师)
```
你是AI #5，负责UI/UX设计。

你的任务列表：
1. TASK-1-4: 设计6个等级的SBT图像 (2天)
   - 查看TASK_ASSIGNMENTS.md第1840-2182行
   - 水墨风格，1080x1080px

2. TASK-1-5: 准备元数据JSON (1天)
   - 查看TASK_ASSIGNMENTS.md第2184-2429行
   - 6个JSON文件

3. TASK-3-1: Coming Soon界面设计 (1天)
   - 设计4个功能的占位界面

请从TASK-1-4开始，完成后告诉我。
```

### 给AI #6 (DevOps与集成)
```
你是AI #6，负责DevOps和集成测试。

你的任务列表：
1. TASK-1-12: 项目配置和依赖 (1天)
   - 查看TASK_ASSIGNMENTS.md第5339-5732行
   - 安装所有依赖，配置环境

2. TASK-3-4: 集成测试 (2天)
   - 测试完整用户流程
   - 修复发现的问题

3. TASK-3-5: 性能优化 (1天)
   - 优化加载速度

4. TASK-3-6: 文档和部署指南 (1天)
   - 完善所有文档

请从TASK-1-12开始，完成后告诉我。
```

---

## 📝 日常沟通模板

### 每日早会（虚拟）
```
【早会】证道项目 - Day N

今日重点：
- AI #1: 继续TASK-1-1，预计今天完成合约结构
- AI #2: 等待TASK-1-12完成后开始Solana开发
- AI #3: 完成TASK-1-6，开始TASK-1-7
...

风险提示：
- 注意保持水墨风格统一
- 双链数据隔离要仔细处理
```

### 每日晚会（虚拟）
```
【晚会】证道项目 - Day N 完成情况

✅ 已完成任务：
- TASK-1-1: BNB合约开发 100% ✅
- TASK-1-12: 项目配置完成 100% ✅

⏳ 进行中任务：
- TASK-1-6: 成就系统核心 60% 🔄
- TASK-1-4: SBT图像设计 50% 🔄

🚧 阻塞问题：
- 无

📅 明日计划：
- 完成TASK-1-6
- 完成TASK-1-4
```

---

## 🎯 关键里程碑

### Week 1结束（Day 7）
- [ ] BNB Chain合约开发完成
- [ ] SBT图像设计完成
- [ ] 项目环境配置完成

### Week 2结束（Day 14）
- [ ] BNB Chain完整流程可演示
- [ ] 所有UI组件完成
- [ ] BNB合约集成测试通过

### Week 4结束（Day 28）
- [ ] Solana程序部署完成
- [ ] Solana钱包集成完成
- [ ] 双链切换功能完成

### Week 6结束（Day 42）
- [ ] 所有功能完成
- [ ] 集成测试通过
- [ ] 文档完整
- [ ] 可以录制演示视频

---

## 📞 协作规范

### 任务交接
当一个AI完成任务后：
1. 更新任务状态为"已完成"
2. 在共享文档中记录完成情况
3. 通知依赖此任务的其他AI可以开始
4. 提交代码到Git

### 问题反馈
遇到问题时：
1. 立即在群组中描述问题
2. 标注任务编号（如：TASK-1-6）
3. 提供错误信息和复现步骤
4. @相关负责人的AI编号

### 代码审查
代码完成后：
1. 创建Pull Request
2. 其他AI进行代码审查
3. 通过后合并到主分支

---

**索引版本**: v1.0
**创建时间**: 2026-01-27
**维护者**: CTO Claude
