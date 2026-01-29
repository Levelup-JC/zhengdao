# 证道 - 双链SBT成就系统

基于BNB Chain和Solana的去中心化成就系统,通过吾日三省吾身获得Soulbound Token(SBT)。

> **📊 最新状态**: 查看 [最新项目状态报告](./LATEST-PROJECT-STATUS-REPORT.md) 了解项目整体进度
>
> **📋 任务协调**: 查看 [CTO任务管理中心](./CTO-TASK-MANAGER.md) 了解AI团队任务分配
>
> **🚀 快速启动**: 查看 [AI任务分配清单](./AI-TASK-ALLOCATION.md) 了解各AI的具体任务
>
> **📖 中文手册**: 查看 [用户使用手册](./docs/用户使用手册.md) 获取完整使用指南

## 项目概述

证道是一个创新的自省式成就系统,用户通过每日反思和复盘来累积修行天数,达到不同等级后可以铸造不可转移的SBT作为修行证明。

### 核心特性

- ✅ **双链支持**: BNB Chain和Solana
- ✅ **6个等级**: 从见素到抱一的修行境界
- ✅ **SBT系统**: 不可转移的灵魂绑定代币
- ✅ **水墨风格**: 独特的东方美学设计
- ✅ **AI复盘**: 集成DeepSeek AI进行智能反思

## 技术栈

### 前端
- **框架**: Next.js 15.1
- **UI库**: React 19
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **状态管理**: TanStack Query
- **数据库**: Dexie(IndexedDB)

### Web3
- **BNB Chain**: Wagmi v2 + Viem
- **Solana**: @solana/web3.js + Wallet Adapter
- **智能合约**: Solidity 0.8.20 (BNB), Rust (Solana)
- **开发框架**: Hardhat (BNB), Anchor (Solana)

### 开发工具
- **语言**: TypeScript 5.3
- **测试**: Jest + Testing Library
- **代码规范**: ESLint + Prettier
- **合约**: OpenZeppelin

## 开发环境设置

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd 黑客松项目-证道

# 安装依赖
npm install

# 或者使用legacy peer deps(如果遇到依赖冲突)
npm install --legacy-peer-deps
```

### 环境变量配置

复制环境变量模板:

```bash
cp .env.local.example .env.local
```

编辑`.env.local`文件,填写必要的配置:

```bash
# BNB Chain配置
PRIVATE_KEY=your_private_key_here  # 仅开发环境使用
BNB_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
BNB_MAINNET_RPC_URL=https://bsc-dataseed.binance.org/
BSCSCAN_API_KEY=your_bscscan_api_key

# 合约地址(部署后添加)
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=

# IPFS配置(可选)
NEXT_PUBLIC_USE_IPFS=false
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
PINATA_API_KEY=
PINATA_SECRET_API_KEY=

# DeepSeek API(用于AI复盘)
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm test

# 测试覆盖率
npm run test:coverage

# 编译智能合约
npm run hardhat:compile

# 运行合约测试
npm run hardhat:test
```

## 项目结构

```
zheng-dao/
├── app/                    # Next.js应用目录
│   ├── page.tsx           # 主页面
│   └── layout.tsx         # 布局组件
├── components/            # React组件
│   ├── achievement/       # 成就系统组件
│   ├── CheckInRing.tsx   # 打卡环
│   ├── ReflectionFlow.tsx # 复盘流程
│   └── ...
├── lib/                   # 核心库
│   ├── achievement-system.ts      # 成就系统核心
│   ├── achievement-service.ts     # 成就服务
│   ├── chain-manager.ts           # 链管理器
│   ├── db.ts                      # 数据库
│   └── contracts/                 # 合约交互
├── contracts/            # 智能合约
│   └── ZhengDao.sol    # BNB Chain SBT合约
├── programs/            # Solana程序
│   └── zhengdao-sbt/   # Anchor程序
├── public/             # 静态资源
│   ├── sbt-images/    # SBT图像
│   └── sbt-metadata/  # SBT元数据
├── docs/               # 文档
│   ├── dependencies-report.md
│   └── development-logs/
└── hardhat.config.ts   # Hardhat配置

### 每日三问

用户每天需要回答三个问题:
1. 今日做了什么值得记录的事?
2. 有什么需要改进的地方?
3. 明日的计划是什么?

AI会基于回答提供智能分析和建议。

## SBT系统

### BNB Chain SBT

- **标准**: ERC-721
- **特性**: 不可转移(Soulbound)
- **元数据**: 链上存储
- **网络**: BNB Chain Testnet

### Solana SBT

- **标准**: SPL Token
- **特性**: 不可转移
- **元数据**: Metaplex标准
- **网络**: Solana Devnet

## 部署

### BNB Chain部署

```bash
# 编译合约
npm run hardhat:compile

# 部署到测试网
npm run hardhat:deploy --network bnbTestnet

# 验证合约
npx hardhat verify --network bnbTestnet <CONTRACT_ADDRESS>
```

### Solana部署

```bash
# 配置Solana CLI
solana config set --url devnet
solana config set --keypair <your-keypair>

# 构建程序
anchor build

# 部署程序
anchor deploy

# 升级程序(如需要)
anchor upgrade <program_id> --program-id zhengdao-sbt
```

## 测试网领水配置

在测试网部署和测试SBT功能之前，需要获取测试币。以下是两条测试网的领水配置：

### BNB Chain Testnet 领水

**水龙头地址**: https://testnet.bnbchain.org/faucet-smart

**领水步骤**:
1. 访问水龙头页面
2. 连接您的MetaMask钱包（确保切换到BNB Chain Testnet）
3. 输入钱包地址或直接连接钱包
4. 完成人机验证（如需要）
5. 点击"领取"按钮
6. 等待测试BNB到账（通常几分钟内）

**测试网配置**:
- **网络名称**: BNB Chain Testnet
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Chain ID**: 97
- **区块浏览器**: https://testnet.bscscan.com
- **货币符号**: tBNB

**其他领水渠道**:
- BNB Chain官方Discord: https://discord.gg/bnbchain
- 每日可领取0.1-1 tBNB

### Solana Devnet 领水

**水龙头地址**: https://faucet.solana.com/

**领水步骤**:
1. 访问Solana水龙头页面
2. 输入您的Solana钱包地址
3. 选择网络：Devnet
4. 点击"Request Airdrop"或"领取空投"
5. 等待测试SOL到账（通常几秒钟）

**测试网配置**:
- **RPC URL**: https://api.devnet.solana.com
- **区块浏览器**: https://explorer.solana.com/?cluster=devnet
- **货币符号**: SOL (Devnet)

**CLI领水方式**:
```bash
# 使用Solana CLI领取
solana airdrop 2 <your_wallet_address> --url devnet
```

**领水限制**:
- 每次可领取1-2 SOL
- 每个地址有一定的时间间隔限制
- 可通过Solana Discord请求更多: https://discord.gg/solana

### 钱包网络配置

#### MetaMask 配置 (BNB Chain Testnet)

在MetaMask中手动添加网络：
1. 打开MetaMask
2. 点击网络下拉菜单
3. 选择"添加网络" → "手动添加网络"
4. 填写以下信息：
   - **网络名称**: BNB Chain Testnet
   - **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
   - **Chain ID**: 97
   - **货币符号**: tBNB
   - **区块浏览器**: https://testnet.bscscan.com

#### Phantom 配置 (Solana Devnet)

Phantom钱包默认支持Devnet：
1. 打开Phantom钱包
2. 点击左下角设置图标
3. 选择"更改网络"
4. 选择"Devnet"

### 验证测试币

**检查BNB余额**:
```bash
# 使用Hardhat脚本
npx hardhat run scripts/check-balance.ts --network bnbTestnet
```

或在区块浏览器查看：
- BNB: https://testnet.bscscan.com/address/<your_address>

**检查Solana余额**:
```bash
# 使用Solana CLI
solana balance <your_wallet_address> --url devnet
```

或在区块浏览器查看：
- Solana: https://explorer.solana.com/?cluster=devnet

### 常见问题

**Q: 领水失败怎么办？**
- 确保钱包切换到正确的测试网
- 检查是否达到每日领水限额
- 尝试其他领水渠道（Discord、其他水龙头）
- 等待24小时后重试

**Q: 测试币不够用怎么办？**
- BNB Chain: 可在Discord向官方申请更多测试币
- Solana: 使用CLI命令多次领取（有时间间隔限制）

**Q: 领水后多久可以开始测试？**
- BNB Chain: 通常1-5分钟内到账
- Solana: 通常几秒钟内到账

建议在部署和测试前确保钱包中有足够的测试币（建议至少保留1-2 tBNB或2-5 SOL用于Gas费）。

## 测试

```bash
# 前端测试
npm test

# 智能合约测试
npm run hardhat:test

# 集成测试
npm run test:coverage
```

## 贡献指南

1. Fork项目
2. 创建功能分支(`git checkout -b feature/AmazingFeature`)
3. 提交更改(`git commit -m 'feat: 添加某功能'`)
4. 推送到分支(`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 提交信息规范

使用Conventional Commits格式:
- `feat:` 新功能
- `fix:` Bug修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具

## 开发路线图

- [x] V1.0 - MVP完成
- [x] V2.0 - 数据库持久化
- [x] V3.0 - AI复盘系统
- [ ] V4.0 - 双链SBT实现(进行中)
  - [ ] TASK-1-1 到 TASK-1-12: BNB Chain实现
  - [ ] TASK-2-1 到 TASK-2-9: Solana实现
  - [ ] TASK-3-1 到 TASK-3-6: 集成与打磨

## 许可证

MIT License

## 联系方式

- 项目主页: [GitHub Repository]
- 问题反馈: [Issues]

---

**最后更新**: 2026-01-27
**维护者**: 证道开发团队
