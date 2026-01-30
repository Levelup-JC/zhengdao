# 证道项目 - 前端主网切换指南

**作者**: AI #2 (全栈开发)
**日期**: 2026-01-29
**目标**: 快速将前端从测试网切换到 BSC 主网

---

## 📋 前置条件

✅ **已完成的工作**：
- 前端代码已支持主网/测试网自动切换
- Gas 费估算已优化（区分主网/测试网）
- UI 已添加网络状态提示（测试网🧪 / 主网🚀）
- 网络切换引导功能已实现
- 错误处理和用户提示已完善

⏳ **等待中**：
- AI #1 提供主网合约地址

---

## 🚀 主网切换步骤（仅需修改 1 个文件）

### 步骤 1: 更新环境变量（1 分钟）

打开 `.env.local` 文件，修改以下环境变量：

```bash
# ========================================
# 从测试网切换到主网
# ========================================

# 将测试网模式关闭
NEXT_PUBLIC_BNB_CHAIN_TESTNET=false  # 从 true 改为 false

# 更新为主网合约地址（等待 AI #1 提供）
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=<主网合约地址>

# 可选：明确指定 Chain ID（推荐）
NEXT_PUBLIC_CHAIN_ID=56
```

### 步骤 2: 重启开发服务器（10 秒）

```bash
# 停止当前服务器（Ctrl + C）
# 重新启动
npm run dev
```

### 步骤 3: 验证配置（30 秒）

打开浏览器，检查铸造页面：

✅ **预期效果**：
- 网络状态横幅显示"🚀 主网模式"
- 提示文字："当前为 BSC 主网 (Chain ID: 56)，使用真实 BNB 进行交易"
- Gas 费估算显示更高的主网费用（约 0.00075 BNB）
- 钱包连接时自动提示切换到主网（Chain ID: 56）

---

## 🔍 配置验证清单

| 检查项 | 测试网 | 主网 | 说明 |
|-------|--------|------|------|
| 环境变量 | `NEXT_PUBLIC_BNB_CHAIN_TESTNET=true` | `NEXT_PUBLIC_BNB_CHAIN_TESTNET=false` | ✅ 已自动处理 |
| Chain ID | 97 | 56 | ✅ 代码自动读取 |
| 合约地址 | 测试网地址 | 主网地址 | ⚠️ 需手动更新 |
| Wagmi 配置 | `bscTestnet` | `bsc` | ✅ 自动切换 |
| 区块浏览器 | testnet.bscscan.com | bscscan.com | ✅ 自动切换 |
| Gas 费估算 | ~0.00045 BNB (3 Gwei) | ~0.00075 BNB (5 Gwei) | ✅ 已优化 |
| UI 提示 | 🧪 测试网模式 | 🚀 主网模式 | ✅ 已实现 |

---

## 📁 关键文件说明

### 自动切换的文件（无需修改）

| 文件 | 功能 | 切换机制 |
|------|------|---------|
| `lib/wagmi-config.ts` | Wagmi 配置 | 根据 `NEXT_PUBLIC_BNB_CHAIN_TESTNET` 选择 `bsc`/`bscTestnet` |
| `lib/chain-manager.ts` | 链管理器 | 读取环境变量判断主网/测试网 |
| `lib/contracts/sbt.ts` | 合约交互 | 使用环境变量中的合约地址和网络 |
| `lib/gas-estimator.ts` | Gas 费估算 | 根据主网/测试网调整 Gas 价格 |

### 需要修改的文件（仅 1 个）

| 文件 | 修改内容 | 原因 |
|------|---------|------|
| `.env.local` | 更新 `NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS` | 主网合约地址不同 |

---

## 🧪 测试流程

### 测试网测试（当前）

1. **获取测试币**：https://testnet.bnbchain.org/faucet-smart
2. **连接钱包**：OKX Wallet / MetaMask
3. **切换到测试网**：Chain ID 97
4. **测试铸造**：在成就页面铸造 SBT
5. **验证交易**：https://testnet.bscscan.com

### 主网测试（切换后）

⚠️ **警告**：主网测试需要消耗真实 BNB！

1. **确保钱包有足够 BNB**：至少 0.1 BNB
2. **连接钱包**：OKX Wallet / MetaMask
3. **切换到主网**：Chain ID 56
4. **小额测试**：先铸造 1 个测试 SBT
5. **验证交易**：https://bscscan.com

---

## 🛠️ 常见问题解决

### Q1: 钱包无法自动切换网络？

**解决方案**：
1. 手动在钱包中添加 BSC 主网网络
   - 网络名称：BNB Chain
   - RPC URL：https://bsc-dataseed.binance.org/
   - Chain ID：56
   - 货币符号：BNB
   - 区块浏览器：https://bscscan.com

2. 或者使用 OKX Wallet，它会自动识别

### Q2: Gas 费估算不准确？

**原因**：实际 Gas 价格会根据网络拥堵情况变化

**解决方案**：
- 代码已实现保守估算，实际费用通常更低
- 用户在钱包中可以看到准确的 Gas 费
- 建议在 Gas 价格较低时进行交易（通常周末或凌晨）

### Q3: 交易失败怎么办？

**常见原因**：
1. **Gas 不足**：确保钱包有足够 BNB（至少 0.01 BNB）
2. **合约地址错误**：检查 `.env.local` 中的合约地址
3. **网络错误**：确认钱包在正确的网络（主网/测试网）
4. **已铸造过**：每个等级只能铸造一次

**调试步骤**：
```bash
# 1. 查看浏览器控制台错误
# 2. 检查钱包交易记录
# 3. 在区块浏览器查询交易状态
```

### Q4: 部署到生产环境后环境变量不生效？

**解决方案**：
- Vercel: 在项目设置中添加环境变量
- 其他平台: 检查部署平台的环境变量配置
- **重要**：部署后需要重新构建

---

## 📊 Gas 费对比

| 操作 | 测试网 | 主网 | 说明 |
|------|--------|------|------|
| 铸造 SBT | ~0.00045 BNB | ~0.00075 BNB | 3 Gwei vs 5 Gwei |
| Gas 价格 | 3 Gwei | 5 Gwei | 可根据网络调整 |
| 确认时间 | 3-5 秒 | 3-5 秒 | BSC 速度快 |

**节省技巧**：
- 在 Gas 价格较低时交易（通常周末或凌晨）
- 使用 Gas 价格追踪工具：https://bscgas.info/
- OKX Wallet 会自动估算合理的 Gas 价格

---

## ✅ 切换完成检查

切换到主网后，请验证以下项目：

- [ ] `.env.local` 中的 `NEXT_PUBLIC_BNB_CHAIN_TESTNET=false`
- [ ] `.env.local` 中的 `NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS` 已更新为主网地址
- [ ] 前端页面显示"🚀 主网模式"
- [ ] Gas 费估算显示主网价格（约 0.00075 BNB）
- [ ] 钱包连接后提示切换到 Chain ID 56
- [ ] 在区块浏览器能查询到主网合约

---

## 🎯 快速命令参考

```bash
# 查看当前环境变量
cat .env.local | grep NEXT_PUBLIC_BNB_CHAIN_TESTNET

# 切换到主网（编辑 .env.local）
vim .env.local
# 或使用其他编辑器

# 重启开发服务器
npm run dev

# 构建生产版本
npm run build

# 本地测试生产版本
npm run start
```

---

## 📝 代码修改示例

### .env.local 修改示例

**修改前（测试网）**：
```bash
NEXT_PUBLIC_BNB_CHAIN_TESTNET=true
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=0x86e0392575cBb9BEEfF32Eb62De5923B05f66B94
```

**修改后（主网）**：
```bash
NEXT_PUBLIC_BNB_CHAIN_TESTNET=false
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=0x<新的主网合约地址>
NEXT_PUBLIC_CHAIN_ID=56
```

---

## 🎉 总结

**好消息**：前端代码已经完全支持主网/测试网切换！

**切换步骤**：
1. 修改 `.env.local` 中的 2 个环境变量（1 分钟）
2. 重启开发服务器（10 秒）
3. 验证配置（30 秒）

**总耗时**：约 2 分钟！

**等待 AI #1**：提供主网合约地址后即可立即切换！

---

**作者签名**: AI #2 (全栈开发)
**完成时间**: 2026-01-29
**状态**: ✅ 代码优化完成，等待主网合约地址
