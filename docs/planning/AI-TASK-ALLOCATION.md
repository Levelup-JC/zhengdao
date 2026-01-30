# 证道项目 - AI任务分配清单

**更新时间**: 2026-01-27
**执行模式**: 模拟模式（不立即部署到测试网）
**协作方式**: 多AI并行执行

---

## 📊 任务总览

| 阶段 | 任务 | 负责AI | 预计时间 | 状态 | 依赖 |
|-----|------|--------|----------|------|------|
| **Phase 1** | | | | | |
| 1.1 | 部署BNB Chain合约 | AI #1 | 2-3h | ⏳ 待开始 | 无 |
| 1.2 | 部署Solana程序 | AI #2 | 3-4h | ⏳ 待开始 | 无 |
| 1.3 | BNB前端集成 | AI #3 | 2-3h | ⏳ 待开始 | Task 1.1 |
| **Phase 2** | | | | | |
| 2.1 | Solana SBT交互 | AI #3 | 4-5h | ⏳ 待开始 | Task 1.2 |
| 2.2 | 组件适配Solana | AI #4 | 3-4h | ⏳ 待开始 | Task 2.1 |
| **Phase 3** | | | | | |
| 3.1 | 集成测试 | AI #6 | 4-5h | ⏳ 待开始 | Task 1.3, 2.2 |
| 3.2 | 性能优化 | AI #6 | 2-3h | ⏳ 待开始 | Task 3.1 |
| **Phase 4** | | | | | |
| 4.1 | 部署文档 | AI #6 | 2h | ⏳ 待开始 | Task 3.1 |
| 4.2 | 准备演示 | AI #4 + AI #6 | 2-3h | ⏳ 待开始 | 所有前置任务 |

---

## 🚀 可以立即并行的任务（第1批）

### ✅ 无依赖，可立即开始

#### Task A: BNB Chain合约部署准备
**负责AI**: AI #1（BNB Chain工程师）
**优先级**: P0
**模拟模式**: 使用本地Hardhat网络

**具体任务**:
1. 创建部署脚本 `scripts/deploy-bnb-sbt.ts`
2. 创建环境变量模板 `.env.local.example`
3. 测试本地部署流程
4. 准备部署验证脚本
5. 编写部署文档草稿

**产出文件**:
- `scripts/deploy-bnb-sbt.ts`
- `.env.local.example`
- `scripts/verify-bnb-deployment.ts`
- `docs/BNB-DEPLOYMENT.md`

**验收标准**:
- ✅ 本地部署成功
- ✅ 环境变量模板完整
- ✅ 文档清晰易懂

---

#### Task B: Solana程序部署准备
**负责AI**: AI #2（Solana工程师）
**优先级**: P0
**模拟模式**: 使用Localhost验证器

**具体任务**:
1. 完善部署脚本 `programs/zhengdao-sbt/scripts/deploy-devnet.sh`
2. 创建本地测试脚本
3. 生成Program ID配置
4. 准备IDL导出脚本
5. 编写部署文档草稿

**产出文件**:
- `programs/zhengdao-sbt/scripts/deploy-local.sh`
- `programs/zhengdao-sbt/scripts/test-local.sh`
- `programs/zhengdao-sbt/.env.example`
- `docs/SOLANA-DEPLOYMENT.md`

**验收标准**:
- ✅ 本地部署成功
- ✅ IDL正确生成
- ✅ 文档清晰易懂

---

#### Task C: Solana SBT交互层开发
**负责AI**: AI #3（前端核心开发）
**优先级**: P0
**模式**: 模拟模式（使用mock数据）

**具体任务**:
1. 创建 `lib/contracts/solana-sbt.ts`
   - 定义SolanaSBTService类
   - 实现initialize(), mintSBT(), getSBT()方法
   - 添加完整TypeScript类型定义
2. 创建 `lib/solana-sbt-manager.ts`
   - 仿照BNB的SBT Manager
   - 提供统一的高级接口
   - 添加错误处理
3. 更新 `lib/solana-wallet.ts`
   - 添加交易签名方法
   - 完善错误处理
   - 添加交易状态管理

**产出文件**:
- `lib/contracts/solana-sbt.ts`（新建，~300行）
- `lib/solana-sbt-manager.ts`（新建，~200行）
- `lib/solana-wallet.ts`（更新）

**验收标准**:
- ✅ TypeScript类型定义完整
- ✅ 所有方法有清晰注释
- ✅ 错误处理完善
- ✅ 与BNB接口保持一致

---

#### Task D: SBT组件双链适配
**负责AI**: AI #4（UI组件开发）
**优先级**: P1
**模式**: 基于现有组件扩展

**具体任务**:
1. 更新 `components/achievement/ClaimSBTFlow.tsx`
   - 支持Solana钱包检测
   - 根据当前链显示不同UI
   - 统一双链申领流程
2. 更新 `components/achievement/SBTGallery.tsx`
   - 根据当前链筛选SBT
   - 适配Solana元数据格式
   - 添加链标签显示
3. 更新 `components/achievement/LevelDisplay.tsx`
   - 显示当前链的等级信息
   - 支持双链数据切换

**产出文件**:
- `components/achievement/ClaimSBTFlow.tsx`（更新）
- `components/achievement/SBTGallery.tsx`（更新）
- `components/achievement/LevelDisplay.tsx`（更新）

**验收标准**:
- ✅ 组件在两条链上都能正常工作
- ✅ UI风格保持统一
- ✅ 切换链时数据正确更新

---

#### Task E: 集成测试框架
**负责AI**: AI #6（DevOps工程师）
**优先级**: P1
**模式**: 使用Jest + Testing Library

**具体任务**:
1. 创建 `lib/__tests__/integration.test.ts`
   - 测试打卡→升级→申领SBT流程
   - 测试双链数据隔离
   - 测试钱包切换
2. 创建 `lib/__tests__/mock-data.ts`
   - 准备测试用的模拟数据
   - Mock合约调用
3. 更新 `jest.setup.js`
   - 添加测试环境配置
   - Mock Web3对象

**产出文件**:
- `lib/__tests__/integration.test.ts`（新建，~300行）
- `lib/__tests__/mock-data.ts`（新建，~100行）
- `jest.setup.js`（更新）

**验收标准**:
- ✅ 测试可以运行
- ✅ Mock数据完整
- ✅ 主要流程有测试覆盖

---

## 📋 第2批任务（有依赖关系）

### Task F: BNB前端集成
**负责AI**: AI #3
**依赖**: Task A
**预计时间**: 2-3小时

**任务**: 在Task A完成后，将BNB合约地址配置到前端，完善错误处理。

---

### Task G: 双链服务集成
**负责AI**: AI #3
**依赖**: Task C
**预计时间**: 2-3小时

**任务**: 在Task C完成后，将Solana SBT服务集成到 `multi-chain-achievement-service.ts`。

---

### Task H: 性能优化
**负责AI**: AI #6
**依赖**: Task E + Task D
**预计时间**: 2-3小时

**任务**: 在测试完成后，优化组件渲染性能，添加懒加载。

---

## 🎯 给各AI的详细指令

### 给 AI #1（BNB Chain工程师）

```
你是AI #1，负责BNB Chain合约部署准备。

任务：Task A - BNB Chain合约部署准备

步骤：
1. 检查 contracts/ZhengDaoSBT.sol 是否完整
2. 创建 scripts/deploy-bnb-sbt.ts 部署脚本
3. 创建 .env.local.example 环境变量模板
4. 创建 scripts/verify-bnb-deployment.ts 验证脚本
5. 编写 docs/BNB-DEPLOYMENT.md 部署文档

环境变量模板应包含：
- PRIVATE_KEY
- BNB_TESTNET_RPC_URL
- BSCSCAN_API_KEY
- NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS

请从步骤1开始，完成后告诉我。
```

---

### 给 AI #2（Solana工程师）

```
你是AI #2，负责Solana程序部署准备。

任务：Task B - Solana程序部署准备

步骤：
1. 检查 programs/zhengdao-sbt/src/lib.rs 是否完整
2. 完善 programs/zhengdao-sbt/scripts/deploy-devnet.sh
3. 创建 programs/zhengdao-sbt/scripts/deploy-local.sh
4. 创建 programs/zhengdao-sbt/scripts/test-local.sh
5. 生成 programs/zhengdao-sbt/.env.example
6. 编写 docs/SOLANA-DEPLOYMENT.md 部署文档

环境变量模板应包含：
- ANCHOR_WALLET
- ANCHOR_PROVIDER_URL
- PROGRAM_ID

请从步骤1开始，完成后告诉我。
```

---

### 给 AI #3（前端核心开发）

```
你是AI #3，负责前端核心逻辑开发。

任务：Task C - Solana SBT交互层开发

步骤：
1. 创建 lib/contracts/solana-sbt.ts
   - 参考文件：lib/contracts/sbt.ts (BNB版本)
   - 定义SolanaSBTService类
   - 实现方法：initialize, mintSBT, getSBT, updateMetadata

2. 创建 lib/solana-sbt-manager.ts
   - 参考文件：lib/sbt-manager.ts (BNB版本)
   - 提供统一的高级接口
   - 添加完整的错误处理

3. 更新 lib/solana-wallet.ts
   - 添加交易签名和发送方法
   - 完善错误处理

关键要求：
- 使用TypeScript严格类型
- 所有方法添加JSDoc注释
- 错误处理要完整
- 接口要与BNB版本保持一致

请从步骤1开始，完成后告诉我。
```

---

### 给 AI #4（UI组件开发）

```
你是AI #4，负责UI组件开发。

任务：Task D - SBT组件双链适配

步骤：
1. 更新 components/achievement/ClaimSBTFlow.tsx
   - 检测当前链类型
   - BNB使用wagmi hooks
   - Solana使用useSolanaWallet hook
   - 统一申领流程UI

2. 更新 components/achievement/SBTGallery.tsx
   - 根据当前链过滤SBT
   - 适配Solana元数据格式
   - 添加链标签（BNB/SOL）

3. 更新 components/achievement/LevelDisplay.tsx
   - 显示当前链的等级
   - 支持双链数据切换

关键要求：
- 保持水墨风格统一
- 动画效果流畅
- 响应式布局
- 错误提示友好

请从步骤1开始，完成后告诉我。
```

---

### 给 AI #6（DevOps工程师）

```
你是AI #6，负责测试和文档。

任务：Task E - 集成测试框架

步骤：
1. 创建 lib/__tests__/mock-data.ts
   - 准备测试用的成就数据
   - Mock SBT元数据
   - Mock钱包地址

2. 创建 lib/__tests__/integration.test.ts
   - 测试：打卡→升级→申领SBT
   - 测试：双链数据隔离
   - 测试：钱包连接和切换
   - 测试：SBT查询和展示

3. 更新 jest.setup.js
   - 配置测试环境
   - Mock localStorage和IndexedDB
   - Mock Web3对象

关键要求：
- 测试覆盖率目标>70%
- 主要流程100%覆盖
- 测试要独立可运行
- Mock数据要真实

请从步骤1开始，完成后告诉我。
```

---

## 📊 任务进度跟踪

### 实时状态表

| AI编号 | 当前任务 | 开始时间 | 预计完成 | 状态 |
|--------|----------|----------|----------|------|
| AI #1 | Task A: BNB部署准备 | - | 2-3h | ⏳ 待开始 |
| AI #2 | Task B: Solana部署准备 | - | 3-4h | ⏳ 待开始 |
| AI #3 | Task C: Solana交互层 | - | 4-5h | ⏳ 待开始 |
| AI #4 | Task D: 组件适配 | - | 3-4h | ⏳ 待开始 |
| AI #6 | Task E: 测试框架 | - | 2-3h | ⏳ 待开始 |

---

## 🔄 任务交接流程

### 完成任务后的交接

**AI #1 完成Task A后**:
1. 更新任务状态为"已完成"
2. 通知 AI #3 可以开始Task F（BNB前端集成）
3. 提交代码到Git（可选）

**AI #2 完成Task B后**:
1. 更新任务状态为"已完成"
2. 通知 AI #3 Solana程序就绪
3. 提交代码到Git（可选）

**AI #3 完成Task C后**:
1. 更新任务状态为"已完成"
2. 通知 AI #4 可以开始Task G（双链服务集成）
3. 开始Task F（如果Task A已完成）

**AI #4 完成Task D后**:
1. 更新任务状态为"已完成"
2. 通知 AI #6 可以开始Task H（性能优化）
3. 开始进行UI测试

**AI #6 完成Task E后**:
1. 更新任务状态为"已完成"
2. 运行所有测试确保通过
3. 等待Task D完成后开始Task H

---

## 📝 协作规范

### 文件修改冲突处理

1. **如果多个AI需要修改同一文件**：
   - AI #3优先（核心逻辑）
   - AI #4次之（UI层）
   - 其他AI等待

2. **文件修改规范**：
   - 修改前先读取最新版本
   - 使用清晰的注释标注修改
   - 完成后立即更新文档

3. **沟通机制**：
   - 完成任务后立即通知相关AI
   - 遇到阻塞问题及时反馈
   - 定期同步进度

---

## ✅ 验收清单

### Phase 1完成标准

- [ ] AI #1: BNB部署脚本就绪，文档完整
- [ ] AI #2: Solana部署脚本就绪，文档完整
- [ ] AI #3: Solana交互层代码完成，类型定义完整
- [ ] AI #4: 组件支持双链，UI统一
- [ ] AI #6: 测试框架搭建完成，主要流程有测试

### Phase 2完成标准

- [ ] 所有测试通过
- [ ] 代码覆盖率>70%
- [ ] 无严重bug
- [ ] 文档完整

---

## 🎯 最终目标

**第1批任务完成后，应该达到**：
- ✅ BNB和Solana合约都可以部署（有完整脚本）
- ✅ Solana SBT交互层完成
- ✅ UI组件支持双链
- ✅ 有基础测试覆盖

**下一步**：
- 执行第2批任务（集成和优化）
- 准备演示
- 完善文档

---

**文档维护**: 请各AI在完成任务后更新此文档
**问题反馈**: 遇到问题及时在群组中沟通
**代码提交**: 建议每天至少提交一次代码

---

## 📞 快速命令参考

### 给AI的启动命令

```bash
# AI #1 - BNB Chain工程师
"你是AI #1，请执行Task A：BNB Chain合约部署准备。"

# AI #2 - Solana工程师
"你是AI #2，请执行Task B：Solana程序部署准备。"

# AI #3 - 前端核心开发
"你是AI #3，请执行Task C：Solana SBT交互层开发。"

# AI #4 - UI组件开发
"你是AI #4，请执行Task D：SBT组件双链适配。"

# AI #6 - DevOps工程师
"你是AI #6，请执行Task E：集成测试框架。"
```

---

**祝各AI协作顺利！🚀**
