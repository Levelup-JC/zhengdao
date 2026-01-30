# BSC 主网部署 - 问题报告和替代方案

**报告人**: AI #1 (合约部署专家)
**日期**: 2026-01-29
**任务**: TASK-MAINNET-01 BSC 主网部署
**状态**: ⚠️ 网络连接问题，无法通过 CLI 部署

---

## ❌ 遇到的问题

### 网络连接超时

**错误信息**:
```
ConnectTimeoutError: Connect Timeout Error
code: 'UND_ERR_CONNECT_TIMEOUT'
```

**尝试的 RPC 端点**:
1. ❌ https://bsc-dataseed.binance.org/ (官方)
2. ❌ https://bsc-dataseed1.binance.org/ (备用)
3. ❌ https://bsc-dataseed1.defibit.io/ (第三方)

**原因分析**:
- 本地网络环境可能限制了外部 RPC 连接
- 防火墙可能阻止了 HTTPS 出站连接
- 可能需要 VPN 或代理

---

## ✅ 替代部署方案

### 方案一：使用 Remix IDE 部署（推荐）

**优点**:
- 不需要本地网络配置
- 界面友好，操作简单
- 支持多种网络

**步骤**:

1. **访问 Remix IDE**: https://remix.ethereum.org/

2. **创建合约文件**:
   - 新建文件 `contracts/ZhengDaoSBT.sol`
   - 复制合约代码到文件中

3. **编译合约**:
   - 点击 "Compile" 按钮
   - 确保编译成功

4. **切换到部署面板**:
   - 点击 "Deploy & Run Transactions" 图标
   - Environment 选择 "Injected Provider - MetaMask"

5. **配置 MetaMask**:
   - 确保 MetaMask 已安装
   - 切换到 BSC 主网 (Chain ID: 56)
   - 确保账户有足够的 BNB（至少 0.1 BNB）

6. **部署合约**:
   - Contract 选择 `ZhengDaoSBT`
   - 点击 "Deploy"
   - 在 MetaMask 中确认交易

7. **记录合约地址**:
   - 部署成功后，Remix 会显示合约地址
   - 将地址填入下方 "主网合约地址" 字段

### 方案二：使用其他部署工具

**Tool 1: Hardhat + VPN**
```bash
# 1. 连接 VPN
# 2. 运行部署命令
npx hardhat run scripts/deploy-bnb-sbt.js --network bnbMainnet
```

**Tool 2: Truffle Dashboard**
- 使用 Truffle 的图形界面部署
- 需要 `truffle-config.js` 配置

**Tool 3: 第三方部署平台**
- https://www.quicknode.com/
- https://www.moralis.io/
- 提供一键部署功能

---

## 📋 已准备好的配置

### 合约参数

```solidity
// 合约名称
ZhengDao Soulbound Token

// Token 符号
ZDSBT

// 基础 URI
https://your-domain.com/api/sbt-metadata/
```

### 部署配置

```javascript
// hardhat.config.ts
bnbMainnet: {
  url: "https://bsc-dataseed.binance.org/",
  chainId: 56,
  gasPrice: 5000000000 // 5 gwei
}
```

### 环境变量

```bash
PRIVATE_KEY=***（已配置）***
BNB_MAINNET_RPC_URL=https://bsc-dataseed.binance.org/
```

---

## 🎯 下一步操作

### 方案 A：用户自行部署（推荐）

如果您有可用的网络环境，请：

1. 使用 Remix IDE 部署（最简单）
2. 或连接 VPN 后使用 CLI 部署
3. 部署成功后，将合约地址告知 AI #2

### 方案 B：提供网络访问权限

如果您能提供：
- VPN 连接
- 或代理服务器
- 或远程桌面访问

AI #1 可以继续完成 CLI 部署。

---

## 📝 部署后需要完成的工作

一旦合约成功部署，请：

1. **记录合约地址到本文档**:
   ```markdown
   主网合约地址: 0x...
   部署交易: 0x...
   BscScan: https://bscscan.com/address/0x...
   ```

2. **更新环境变量** (`.env.local`):
   ```bash
   NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=0x...（主网地址）
   NEXT_PUBLIC_CHAIN_ID=56
   ```

3. **验证合约**（可选）:
   ```bash
   npx hardhat verify --network bnbMainnet <合约地址> \
     "ZhengDao Soulbound Token" "ZDSBT" \
     "https://your-domain.com/api/sbt-metadata/"
   ```

4. **通知 AI #2 和 CTO**:
   - 主网合约地址
   - 部署交易 Hash
   - BscScan 链接

---

## ⚠️ 重要提示

### 安全提醒

1. **私钥安全**:
   - 不要将私钥提交到 Git
   - 使用专用部署账户
   - 部署后转移 Owner 权限

2. **主网部署风险**:
   - ⚠️ **不可逆** - 主网部署后无法撤回
   - ⚠️ **Gas 费** - 主网 Gas 费用较高（约 $5-20）
   - ⚠️ **代码审查** - 确保合约代码经过充分测试

3. **测试网验证**:
   - 合约已在 BSC 测试网验证
   - 所有 39 个测试用例通过
   - SBT 铸造功能已测试

---

## 📊 合约信息

### 合约详情

- **合约名称**: ZhengDaoSBT
- **Token 名称**: ZhengDao Soulbound Token
- **Token 符号**: ZDSBT
- **标准**: ERC-721 (SBT)
- **等级**: 6 个等级 (1-6)
- **功能**: 铸造、查询、转移锁定

### 测试网部署记录

- **测试网地址**: 0x86e0392575cBb9BEEfF32Eb62De5923B05f66B94
- **测试网**: BSC Testnet (Chain ID: 97)
- **BscScan**: https://testnet.bscscan.com/address/0x86e0392575cBb9BEEfF32Eb62De5923B05f66B94
- **状态**: ✅ 已验证，功能正常

---

## 🆘 需要帮助？

如果遇到问题，请提供：

1. 使用的部署方法（Remix / CLI / 其他）
2. 错误信息截图
3. 网络环境描述（是否使用 VPN 等）
4. 钱包余额截图

---

**报告生成时间**: 2026-01-29
**状态**: ⏳ 等待网络环境或用户手动部署
