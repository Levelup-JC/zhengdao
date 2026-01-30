# 证道双链SBT系统 - 详细任务分工方案

**制定时间**: 2026-01-27
**项目周期**: 6周
**CTO**: Claude
**团队规模**: 6个AI开发人员并行开发

---

## 📋 目录

1. [团队角色与职责](#团队角色与职责)
2. [任务分配总览](#任务分配总览)
3. [详细任务说明](#详细任务说明)
4. [开发日志要求](#开发日志要求)
5. [集成测试计划](#集成测试计划)
6. [验收标准汇总](#验收标准汇总)

---

## 👥 团队角色与职责

### AI #1: BNB Chain智能合约工程师
**专长**: Solidity, Hardhat, ERC-721, EVM
**职责**: 负责BNB Chain上的SBT智能合约开发、测试和部署

### AI #2: Solana程序工程师
**专长**: Rust, Anchor Framework, Solana Web3.js
**职责**: 负责Solana上的SBT程序开发、测试和部署

### AI #3: 前端核心开发工程师
**专长**: React, TypeScript, 状态管理
**职责**: 负责成就系统核心逻辑、数据库扩展、双链管理

### AI #4: UI组件开发工程师
**专长**: React组件, Tailwind CSS, Framer Motion
**职责**: 负责SBT相关UI组件、动画效果、展示墙

### AI #5: UI/UX设计师
**专长**: UI设计, 视觉设计, 水墨风格
**职责**: 负责SBT图像设计、元数据准备、 Coming Soon界面

### AI #6: DevOps与集成工程师
**专长**: 配置管理, 部署, 测试, 文档
**职责**: 负责项目配置、依赖安装、集成测试、部署文档

---

## 📊 任务分配总览

### 阶段1: Week 1-2 - BNB Chain SBT实现

| 任务ID | 负责人 | 任务名称 | 预计工时 | 依赖 | 优先级 |
|--------|--------|----------|---------|------|--------|
| TASK-1-1 | AI #1 | BNB SBT合约开发 | 2天 | 无 | P0 |
| TASK-1-2 | AI #1 | BNB合约测试 | 1天 | TASK-1-1 | P0 |
| TASK-1-3 | AI #1 | BNB合约部署 | 1天 | TASK-1-2 | P0 |
| TASK-1-4 | AI #5 | SBT视觉设计 | 2天 | 无 | P0 |
| TASK-1-5 | AI #5 | 元数据准备 | 1天 | TASK-1-4 | P0 |
| TASK-1-6 | AI #3 | 成就系统核心 | 2天 | 无 | P0 |
| TASK-1-7 | AI #3 | 数据库扩展 | 1天 | TASK-1-6 | P0 |
| TASK-1-8 | AI #4 | LevelDisplay组件 | 1天 | TASK-1-6 | P0 |
| TASK-1-9 | AI #4 | SBTGallery组件 | 2天 | TASK-1-6 | P0 |
| TASK-1-10 | AI #4 | ClaimSBTFlow组件 | 1天 | TASK-1-9 | P0 |
| TASK-1-11 | AI #3 | BNB合约集成 | 1天 | TASK-1-3, TASK-1-7 | P0 |
| TASK-1-12 | AI #6 | 项目配置和依赖 | 1天 | 无 | P0 |

### 阶段2: Week 3-5 - Solana SBT实现

| 任务ID | 负责人 | 任务名称 | 预计工时 | 依赖 | 优先级 |
|--------|--------|----------|---------|------|--------|
| TASK-2-1 | AI #2 | Solana SBT程序开发 | 3天 | 无 | P0 |
| TASK-2-2 | AI #2 | Solana程序测试 | 1天 | TASK-2-1 | P0 |
| TASK-2-3 | AI #2 | Solana程序部署 | 1天 | TASK-2-2 | P0 |
| TASK-2-4 | AI #3 | Solana钱包集成 | 2天 | TASK-2-3 | P0 |
| TASK-2-5 | AI #3 | 双链管理器 | 1天 | TASK-2-4 | P0 |
| TASK-2-6 | AI #4 | ChainSwitcher组件 | 1天 | TASK-2-5 | P0 |
| TASK-2-7 | AI #4 | DualChainStatus组件 | 1天 | TASK-2-5 | P0 |
| TASK-2-8 | AI #4 | SBT组件适配Solana | 1天 | TASK-2-5 | P0 |
| TASK-2-9 | AI #3 | 双链数据同步 | 1天 | TASK-2-5 | P0 |

### 阶段3: Week 6 - Coming Soon与打磨

| 任务ID | 负责人 | 任务名称 | 预计工时 | 依赖 | 优先级 |
|--------|--------|----------|---------|------|--------|
| TASK-3-1 | AI #5 | Coming Soon界面设计 | 1天 | 无 | P1 |
| TASK-3-2 | AI #4 | Coming Soon组件 | 1天 | TASK-3-1 | P1 |
| TASK-3-3 | AI #4 | 动画效果优化 | 1天 | TASK-1-10 | P1 |
| TASK-3-4 | AI #6 | 集成测试 | 2天 | 所有前置任务 | P0 |
| TASK-3-5 | AI #6 | 性能优化 | 1天 | TASK-3-4 | P1 |
| TASK-3-6 | AI #6 | 文档和部署指南 | 1天 | TASK-3-4 | P0 |

---

## 📝 详细任务说明

### TASK-1-1: BNB SBT合约开发

**负责人**: AI #1 (BNB Chain智能合约工程师)
**工时**: 2天
**优先级**: P0 (最高)

#### 任务目标
开发符合ERC-721标准的SBT（Soulbound Token）智能合约，部署在BNB Chain Testnet上。

#### 详细要求

**1. 合约功能**
- 继承ERC721和Ownable
- 实现soulbound机制：完全禁止transfer
- 支持按等级铸造SBT（6个等级）
- 链上存储元数据（等级、天数、日期）
- 批量铸造支持（可选）
- 只有合约owner可以mint

**2. 合约规格**
```solidity
// 文件位置: /contracts/ZhengDaoSBT.sol

contract ZhengDaoSBT is ERC721, ERC721URIStorage, Ownable {
    // 状态变量
    mapping(uint256 => uint256) public tokenLevel;  // tokenId => level
    mapping(uint256 => uint256) public tokenDays;   // tokenId => days
    mapping(uint256 => uint256) public tokenDate;   // tokenId => timestamp
    mapping(address => uint256[]) public userTokens; // address => tokenIds

    // 事件
    event SBTMinted(address indexed to, uint256 tokenId, uint256 level);

    // 函数
    function mintSBT(address to, uint256 level, uint256 days, string memory uri) external onlyOwner;
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory);
    function transferFrom(address, address, uint256) public pure override;
    function safeTransferFrom(address, address, uint256) public pure override;
    function safeTransferFrom(address, address, uint256, bytes memory) public pure override;
    function getUserTokens(address user) external view returns (uint256[] memory);
    function getTokenDetails(uint256 tokenId) external view returns (uint256 level, uint256 days, uint256 date);
}
```

**3. 安全要求**
- 使用OpenZeppelin ^5.0.0合约库
- 实现重入攻击防护
- 添加onlyOwner修饰符保护mint函数
- 禁止所有transfer相关函数

#### 交付成果

1. **合约代码**
   - 文件位置: `/contracts/ZhengDaoSBT.sol`
   - 代码行数: ~200行
   - 注释覆盖率: >80%

2. **单元测试**
   - 文件位置: `/contracts/ZhengDaoSBT.test.ts`
   - 测试覆盖率: >90%
   - 测试用例:
     * 铸造SBT成功
     * 转移被拒绝（soulbound）
     * 元数据正确存储
     * 只有owner可以mint

3. **Hardhat配置**
   - 文件位置: `/hardhat.config.ts`
   - 配置BNB Chain Testnet RPC
   - 配置编译器版本

#### 验收标准

- [ ] 合约成功编译无错误
- [ ] 所有单元测试通过
- [ ] 测试覆盖率 > 90%
- [ ] 转移功能完全被禁用
- [ ] 元数据正确存储在链上
- [ ] 代码符合Solidity最佳实践
- [ ] 通过Slither静态分析（无高危漏洞）

#### 开发日志要求

**每日更新格式**:
```markdown
### YYYY-MM-DD - BNB SBT合约开发 - 进度

**今日完成**:
- [x] 完成合约基础结构
- [x] 实现soulbound机制
- [ ] 编写单元测试（进行中 50%）

**遇到的问题**:
1. transferFrom禁用时编译警告
   - 解决方案: 使用pure override

**明日计划**:
- 完成剩余单元测试
- 本地测试网测试

**代码变更**:
- 新增: /contracts/ZhengDaoSBT.sol
- 修改: 无
- 删除: 无
```

#### 存储位置
- **合约代码**: `/contracts/ZhengDaoSBT.sol`
- **测试代码**: `/contracts/ZhengDaoSBT.test.ts`
- **开发日志**: `/docs/development-logs/contract-bnb-sbt.md`

---

### TASK-1-2: BNB合约测试

**负责人**: AI #1 (BNB Chain智能合约工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-1

#### 任务目标
对BNB Chain SBT合约进行全面测试，确保功能正确性和安全性。

#### 详细要求

**1. 单元测试**
- 测试框架: Hardhat Test
- 测试库: Mocha + Chai
- 覆盖率工具: Hardhat Coverage

**2. 测试用例清单**
```typescript
// 文件位置: /contracts/ZhengDaoSBT.test.ts

describe("ZhengDaoSBT", function () {
  // 基础功能测试
  it("Should mint SBT successfully");
  it("Should store correct metadata");
  it("Should assign correct token ID");

  // Soulbound测试
  it("Should reject transferFrom");
  it("Should reject safeTransferFrom");
  it("Should not allow transfers even to owner");

  // 权限测试
  it("Should only allow owner to mint");
  it("Should reject mint from non-owner");

  // 边界条件测试
  it("Should handle batch minting");
  it("Should revert on invalid token ID");
  it("Should revert on double mint");
});
```

**3. 测试数据准备**
- 准备6个等级的测试数据
- 模拟真实用户地址
- 准备IPFS CID测试值

**4. Gas优化测试**
- 记录mint函数gas消耗
- 对比不同实现方案的gas
- 目标: mint < 100,000 gas

#### 交付成果

1. **完整测试套件**
   - 文件位置: `/contracts/ZhengDaoSBT.test.ts`
   - 测试用例数: >20个
   - 测试覆盖率: >90%

2. **覆盖率报告**
   - 文件位置: `/coverage/index.html`
   - 生成命令: `npx hardhat coverage`

3. **Gas分析报告**
   - 文件位置: `/docs/gas-report-bnb-sbt.md`
   - 包含每个函数的gas消耗

#### 验收标准

- [ ] 所有测试用例通过
- [ ] 测试覆盖率 > 90%
- [ ] 转移测试100%失败（符合预期）
- [ ] Gas消耗在合理范围内
- [ ] 无内存泄漏或重入漏洞

#### 开发日志要求

**测试日志格式**:
```markdown
### 测试执行报告 - BNB SBT合约

**测试时间**: YYYY-MM-DD HH:MM
**测试环境**: Hardhat Network
**测试结果**: PASS/FAIL

**测试统计**:
- 总测试用例: 25
- 通过: 25
- 失败: 0
- 覆盖率: 92%

**关键发现**:
1. transferFrom成功被禁用 ✅
2. gas消耗平均 85,000 ✅
3. 无安全漏洞 ✅

**问题清单**:
- 无
```

#### 存储位置
- **测试代码**: `/contracts/ZhengDaoSBT.test.ts`
- **覆盖率报告**: `/coverage/`
- **开发日志**: `/docs/development-logs/contract-bnb-test.md`

---

### TASK-1-3: BNB合约部署

**负责人**: AI #1 (BNB Chain智能合约工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-2

#### 任务目标
将SBT合约部署到BNB Chain Testnet，并进行验证。

#### 详细要求

**1. 部署准备**
- 确保测试币充足（>0.1 tBNB）
- 配置部署脚本
- 准备部署参数

**2. 部署脚本**
```typescript
// 文件位置: /scripts/deploy-bnb-sbt.ts

import { ethers } from "hardhat";

async function main() {
  const ZhengDaoSBT = await ethers.getContractFactory("ZhengDaoSBT");
  const sbt = await ZhengDaoSBT.deploy();

  await sbt.waitForDeployment();
  const address = await sbt.getAddress();

  console.log("ZhengDaoSBT deployed to:", address);

  // 验证合约（可选）
  // await hre.run("verify:verify", { address, constructorArguments: [] });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**3. 网络配置**
- 网络: BNB Chain Testnet
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545
- 浏览器: https://testnet.bscscan.com/

**4. 部署后验证**
- 在BscScan上验证合约
- 测试mint函数
- 记录合约地址
- 生成合约ABI

#### 交付成果

1. **部署脚本**
   - 文件位置: `/scripts/deploy-bnb-sbt.ts`

2. **部署信息**
   - 文件位置: `/docs/deployment-bnb-sbt.md`
   - 内容:
     * 合约地址
     * 部署交易hash
     * 部署时间
     * BscScan验证链接

3. **合约ABI**
   - 文件位置: `/abis/ZhengDaoSBT.json`
   - 用于前端集成

4. **环境变量更新**
   - 文件位置: `.env.local.example`
   - 添加: `NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS`

#### 验收标准

- [ ] 合约成功部署到testnet
- [ ] 合约在BscScan上可查看
- [ ] 合约通过BscScan验证
- [ ] 可以正常调用mint函数
- [ ] ABI文件正确生成
- [ ] 部署信息完整记录

#### 开发日志要求

```markdown
### 部署日志 - BNB SBT合约

**部署时间**: YYYY-MM-DD HH:MM
**部署网络**: BNB Chain Testnet
**部署结果**: SUCCESS/FAIL

**合约信息**:
- 合约地址: 0x...
- 交易Hash: 0x...
- Gas Used: ...
- BscScan: https://testnet.bscscan.com/address/...

**验证命令**:
```bash
npx hardhat verify --network bnbTestnet <CONTRACT_ADDRESS>
```

**部署后测试**:
- [x] Mint测试通过
- [x] 转移被禁用
- [x] 元数据正确
```

#### 存储位置
- **部署脚本**: `/scripts/deploy-bnb-sbt.ts`
- **部署文档**: `/docs/deployment-bnb-sbt.md`
- **合约ABI**: `/abis/ZhengDAO_SBT.json`
- **开发日志**: `/docs/development-logs/deployment-bnb.md`

---

### TASK-1-4: SBT视觉设计

**负责人**: AI #5 (UI/UX设计师)
**工时**: 2天
**优先级**: P0

#### 任务目标
设计6个等级的SBT图像，采用中国传统水墨风格，每个等级有独特的视觉主题。

#### 详细要求

**1. 设计规格**
- 图像尺寸: 1080x1080px
- 格式: PNG (透明背景) + SVG (可缩放)
- 风格: 中国传统水墨 + 现代元素融合
- 色彩: 根据等级主色调设计

**2. 6个等级设计要求**

**等级1 - 11路奋斗者 (灰/白)**
- 核心元素: 破旧公文包 + 双脚
- 背景: 灰色渐变 (#6B7280 → #FFFFFF)
- 水墨效果: 淡墨晕染
- 图标: 👣 或 🎒
- 印章: 朱砂红 "初级" (左上角)

**等级2 - 扫码骑士 (绿)**
- 核心元素: 小黄车 (共享单车)
- 背景: 绿色渐变 (#10B981 → #34D399)
- 水墨效果: 竹叶水墨
- 图标: 🚲
- 印章: 朱砂红 "进阶"

**等级3 - 电掣游侠 (蓝)**
- 核心元素: 电动摩托
- 背景: 蓝色渐变 (#3B82F6 → #60A5FA)
- 水墨效果: 电流水墨线条
- 图标: ⚡ 或 🏍️
- 印章: 朱砂红 "中级"

**等级4 - 四轮领航员 (紫)**
- 核心元素: 轿车
- 背景: 紫色渐变 (#8B5CF6 → #A78BFA)
- 水墨效果: 云雾缭绕
- 图标: 🚗
- 印章: 朱砂红 "高级"

**等级5 - 超跑绅士 (红)**
- 核心元素: 敞篷跑车
- 背景: 红色渐变 (#EF4444 → #F87171)
- 水墨效果: 火焰水墨
- 图标: 🏎️
- 印章: 朱砂红 "特级"

**等级6 - 逍遥散仙 (金)**
- 核心元素: 沙滩椅 + 香槟
- 背景: 金色渐变 (#F59E0B → #FBBF24)
- 水墨效果: 祥云/光环
- 图标: 🏖️ 或 🍾
- 印章: 朱砂红 "顶级"

**3. 设计元素要求**
- 每个图像必须包含:
  * 核心道具（中心位置）
  * 主色调背景渐变
  * 水墨纹理装饰
  * 朱砂红等级印章
  * "证道"水印（半透明，右下角）

- 文件结构:
  ```
  /public/sbt-images/
    ├── level-1/
    │   ├── level-1.png      # 主图 1080x1080
    │   ├── level-1.svg      # 矢量图
    │   └── level-1-small.png # 缩略图 300x300
    ├── level-2/
    │   ├── level-2.png
    │   ├── level-2.svg
    │   └── level-2-small.png
    ...
    └── level-6/
        ├── level-6.png
        ├── level-6.svg
        └── level-6-small.png
  ```

**4. 动画版本（可选）**
- 如果时间允许，制作简单的GIF动画
- 初级: 脚步移动
- 进阶: 骑行动画
- 中级: 电动火花
- 高级: 平稳行驶
- 特级: 疾驰特效
- 顶级: 漂浮/光环旋转

#### 交付成果

1. **SBT图像文件**
   - 位置: `/public/sbt-images/level-*/`
   - 每个等级3个文件: PNG + SVG + small.png
   - 总计: 18个文件

2. **设计规范文档**
   - 位置: `/docs/design/sbt-design-spec.md`
   - 包含: 颜色代码、字体、尺寸、设计理念

3. **设计源文件（可选）**
   - 位置: `/design-source/`
   - 格式: Figma / PSD / Sketch

#### 验收标准

- [ ] 6个等级图像全部完成
- [ ] 图像尺寸符合规格
- [ ] 水墨风格统一
- [ ] 每个等级视觉独特
- [ ] 透明背景正确
- [ ] 缩略图清晰
- [ ] 文件命名规范

#### 开发日志要求

```markdown
### 设计日志 - SBT视觉设计

**设计时间**: YYYY-MM-DD
**完成进度**: 6/6 (100%)

**设计决策**:
1. 为什么选择水墨风格？
   - 符合项目"修身·齐家·证道"的中国传统文化定位

2. 核心道具设计理念：
   - 从步行到无车的象征意义

3. 颜色选择理由：
   - 灰→绿→蓝→紫→红→金
   - 代表从平凡到辉煌的历程

**文件清单**:
- [x] level-1.png (1080x1080)
- [x] level-1.svg
- [x] level-1-small.png
- ...
```

#### 存储位置
- **图像文件**: `/public/sbt-images/level-*/`
- **设计文档**: `/docs/design/sbt-design-spec.md`
- **开发日志**: `/docs/development-logs/design-sbt.md`

---

### TASK-1-5: 元数据准备

**负责人**: AI #5 (UI/UX设计师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-4

#### 任务目标
为6个等级的SBT准备标准化的元数据JSON文件，符合OpenSea/Metaplex标准。

#### 详细要求

**1. 元数据标准**
采用ERC-721 Metadata标准:
```json
{
  "name": "证道之路 - [称谓]",
  "description": "坚持打卡[N]天，获得[称谓]称号。证明：每一天都有意义。",
  "image": "ipfs://CID或相对路径",
  "external_url": "https://zhengdao.app",
  "attributes": [
    {
      "trait_type": "Level",
      "value": 1
    },
    {
      "trait_type": "Days",
      "value": 7
    },
    {
      "trait_type": "Title",
      "value": "11路奋斗者"
    },
    {
      "trait_type": "Chain",
      "value": "BNB Chain"
    },
    {
      "trait_type": "Achievement Date",
      "display_type": "date",
      "value": 1706409600000
    },
    {
      "trait_type": "Rarity",
      "value": "Common"
    },
    {
      "trait_type": "Color",
      "value": "Gray/White"
    }
  ]
}
```

**2. 6个等级元数据文件**

**文件结构**:
```
/public/sbt-metadata/
  ├── level-1-bnb.json
  ├── level-2-bnb.json
  ├── level-3-bnb.json
  ├── level-4-bnb.json
  ├── level-5-bnb.json
  └── level-6-bnb.json
```

**level-1-bnb.json**:
```json
{
  "name": "证道之路 - 11路奋斗者",
  "description": "坚持打卡7天，获得11路奋斗者称号。每一步都算数，每一天都有意义。",
  "image": "/sbt-images/level-1/level-1.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 1 },
    { "trait_type": "Days", "value": 7 },
    { "trait_type": "Title", "value": "11路奋斗者" },
    { "trait_type": "Title EN", "value": "BEGINNER" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Common" },
    { "trait_type": "Color", "value": "Gray/White" },
    { "trait_type": "Icon", "value": "walking" },
    { "trait_type": "Keywords", "value": "坚持、起步" }
  ]
}
```

**level-2-bnb.json**:
```json
{
  "name": "证道之路 - 扫码骑士",
  "description": "坚持打卡30天，获得扫码骑士称号。融入城市节奏，效率与成长同行。",
  "image": "/sbt-images/level-2/level-2.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 2 },
    { "trait_type": "Days", "value": 30 },
    { "trait_type": "Title", "value": "扫码骑士" },
    { "trait_type": "Title EN", "value": "COMMUTER" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Uncommon" },
    { "trait_type": "Color", "value": "Green" },
    { "trait_type": "Icon", "value": "bike" },
    { "trait_type": "Keywords", "value": "效率、融入" },
    { "trait_type": "Reward Bonus", "value": "+5%" }
  ]
}
```

**level-3-bnb.json**:
```json
{
  "name": "证道之路 - 电掣游侠",
  "description": "坚持打卡100天，获得电掣游侠称号。速度冲刺，见证质变。",
  "image": "/sbt-images/level-3/level-3.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 3 },
    { "trait_type": "Days", "value": 100 },
    { "trait_type": "Title", "value": "电掣游侠" },
    { "trait_type": "Title EN", "value": "RACER" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Rare" },
    { "trait_type": "Color", "value": "Blue" },
    { "trait_type": "Icon", "value": "ebike" },
    { "trait_type": "Keywords", "value": "速度、冲刺" },
    { "trait_type": "Reward Bonus", "value": "+10%" }
  ]
}
```

**level-4-bnb.json**:
```json
{
  "name": "证道之路 - 四轮领航员",
  "description": "坚持打卡365天，获得四轮领航员称号。一年的坚持，稳定的掌控力。",
  "image": "/sbt-images/level-4/level-4.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 4 },
    { "trait_type": "Days", "value": 365 },
    { "trait_type": "Title", "value": "四轮领航员" },
    { "trait_type": "Title EN", "value": "CAPTAIN" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Epic" },
    { "trait_type": "Color", "value": "Purple" },
    { "trait_type": "Icon", "value": "car" },
    { "trait_type": "Keywords", "value": "稳定、掌控" },
    { "trait_type": "Reward Bonus", "value": "+20%" }
  ]
}
```

**level-5-bnb.json**:
```json
{
  "name": "证道之路 - 超跑绅士",
  "description": "坚持打卡700天，获得超跑绅士称号。激情超越，追求极致。",
  "image": "/sbt-images/level-5/level-5.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 5 },
    { "trait_type": "Days", "value": 700 },
    { "trait_type": "Title", "value": "超跑绅士" },
    { "trait_type": "Title EN", "value": "LEGEND" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Legendary" },
    { "trait_type": "Color", "value": "Red" },
    { "trait_type": "Icon", "value": "sports-car" },
    { "trait_type": "Keywords", "value": "激情、超越" },
    { "trait_type": "Reward Bonus", "value": "+30%" }
  ]
}
```

**level-6-bnb.json**:
```json
{
  "name": "证道之路 - 逍遥散仙",
  "description": "坚持打卡1000天，获得逍遥散仙称号。超脱物外，自由自在。",
  "image": "/sbt-images/level-6/level-6.png",
  "external_url": "https://zhengdao.app",
  "attributes": [
    { "trait_type": "Level", "value": 6 },
    { "trait_type": "Days", "value": 1000 },
    { "trait_type": "Title", "value": "逍遥散仙" },
    { "trait_type": "Title EN", "value": "IMMORTAL" },
    { "trait_type": "Chain", "value": "BNB Chain" },
    { "trait_type": "Rarity", "value": "Mythical" },
    { "trait_type": "Color", "value": "Gold" },
    { "trait_type": "Icon", "value": "champagne" },
    { "trait_type": "Keywords", "value": "自由、超脱" },
    { "trait_type": "Reward Bonus", "value": "+50%" }
  ]
}
```

**3. IPFS上传（可选）**
如果使用IPFS:
```bash
# 安装ipfs-cli
# 上传图像文件夹
ipfs add -r /public/sbt-images/

# 记录CID
# 更新metadata中的image字段为: ipfs://CID/level-1/level-1.png
```

#### 交付成果

1. **元数据JSON文件**
   - 位置: `/public/sbt-metadata/level-*-bnb.json`
   - 数量: 6个
   - 验证: JSON格式正确

2. **元数据验证脚本**
   - 位置: `/scripts/validate-metadata.ts`
   - 功能: 检查所有JSON文件格式和必填字段

3. **IPFS CID记录（如果上传）**
   - 位置: `/docs/ipfs-cids.md`
   - 内容: 每个文件的CID

#### 验收标准

- [ ] 6个元数据文件全部完成
- [ ] JSON格式正确
- [ ] 所有必填字段存在
- [ ] 图像路径正确
- [ ] 属性数据准确
- [ ] 通过验证脚本

#### 开发日志要求

```markdown
### 元数据准备日志

**准备时间**: YYYY-MM-DD
**完成进度**: 6/6 (100%)

**元数据设计**:
1. 为什么包含中英文标题？
   - 支持国际化和多语言扩展

2. Rarity分配逻辑：
   - Common → Uncommon → Rare → Epic → Legendary → Mythical

3. IPFS上传状态：
   - [ ] 已上传 CID: Qm...
   - [ ] 未上传（使用本地路径）

**字段说明**:
- Level: 等级 (1-6)
- Days: 所需打卡天数
- Title: 中文称谓
- Title EN: 英文标识
- Chain: 区块链名称
- Rarity: 稀有度
- Reward Bonus: 奖励加成
```

#### 存储位置
- **元数据文件**: `/public/sbt-metadata/level-*-bnb.json`
- **验证脚本**: `/scripts/validate-metadata.ts`
- **开发日志**: `/docs/development-logs/metadata-prep.md`

---

### TASK-1-6: 成就系统核心

**负责人**: AI #3 (前端核心开发工程师)
**工时**: 2天
**优先级**: P0

#### 任务目标
实现成就系统的核心业务逻辑，包括等级计算、天数追踪、奖励加成等。

#### 详细要求

**1. 成就等级定义**
```typescript
// 文件位置: /lib/achievement-system.ts

export interface AchievementLevel {
  level: number;
  title: string;
  titleEn: string;
  requiredDays: number;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  keywords: string[];
  rewardBonus: number;
}

export const ACHIEVEMENT_LEVELS: AchievementLevel[] = [
  {
    level: 1,
    title: "11路奋斗者",
    titleEn: "BEGINNER",
    requiredDays: 7,
    icon: "walking",
    primaryColor: "#6B7280",
    secondaryColor: "#FFFFFF",
    keywords: ["坚持", "起步"],
    rewardBonus: 0
  },
  // ... 其他5个等级
];

export function getLevelByDays(days: number): AchievementLevel {
  // 根据打卡天数返回当前等级
}

export function getNextLevel(currentLevel: number): AchievementLevel | null {
  // 返回下一等级，如果已是最高级返回null
}

export function getDaysToNextLevel(currentDays: number): number {
  // 返回距离下一等级还需要多少天
}

export function calculateProgress(currentDays: number, targetLevel: number): number {
  // 计算到目标等级的进度百分比 (0-100)
}
```

**2. 成就服务类**
```typescript
// 文件位置: /lib/achievement-service.ts

import { ACHIEVEMENT_LEVELS, getLevelByDays } from './achievement-system';

export interface UserAchievement {
  id?: number;
  walletAddress: string;
  chain: 'bnb' | 'solana';
  currentLevel: number;
  totalCheckInDays: number;
  sbtClaimed: boolean[];
  lastUpdated: Date;
}

export interface CheckInRecord {
  id?: number;
  walletAddress: string;
  chain: 'bnb' | 'solana';
  checkInDate: string;
  levelAtTime: number;
  timestamp: Date;
}

export class AchievementService {
  /**
   * 获取用户成就数据
   */
  static async getUserAchievement(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<UserAchievement | null> {
    // 从数据库查询
  }

  /**
   * 记录打卡并更新成就
   */
  static async recordCheckIn(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<{
    previousLevel: number;
    newLevel: number;
    leveledUp: boolean;
  }> {
    // 1. 查询当前成就
    // 2. 计算新的总天数
    // 3. 计算新等级
    // 4. 如果升级，返回true
    // 5. 保存到数据库
  }

  /**
   * 检查是否可以claim SBT
   */
  static async canClaimSBT(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    level: number
  ): Promise<boolean> {
    // 1. 检查用户当前等级
    // 2. 检查该等级是否已claim
    // 3. 返回是否可以claim
  }

  /**
   * 标记SBT已claim
   */
  static async markSBTClaimed(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    level: number,
    tokenId: number
  ): Promise<void> {
    // 更新数据库
  }

  /**
   * 获取打卡统计
   */
  static async getCheckInStats(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<{
    totalDays: number;
    currentLevel: number;
    nextLevel: AchievementLevel | null;
    daysToNextLevel: number;
    progress: number;
  }> {
    // 计算并返回统计数据
  }
}
```

**3. 等级计算逻辑**
```typescript
// 示例实现

export function getLevelByDays(days: number): AchievementLevel {
  // 从高到低检查
  for (let i = ACHIEVEMENT_LEVELS.length - 1; i >= 0; i--) {
    if (days >= ACHIEVEMENT_LEVELS[i].requiredDays) {
      return ACHIEVEMENT_LEVELS[i];
    }
  }
  // 默认返回最低等级（即使0天也算level 1）
  return ACHIEVEMENT_LEVELS[0];
}

export function getDaysToNextLevel(currentDays: number): number {
  const currentLevel = getLevelByDays(currentDays);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) {
    return 0; // 已达最高级
  }

  return nextLevel.requiredDays - currentDays;
}

export function calculateProgress(currentDays: number, targetLevel: number): number {
  const level = ACHIEVEMENT_LEVELS.find(l => l.level === targetLevel);
  if (!level) return 0;

  const prevLevel = ACHIEVEMENT_LEVELS.find(l => l.level === targetLevel - 1);
  const prevRequiredDays = prevLevel ? prevLevel.requiredDays : 0;
  const range = level.requiredDays - prevRequiredDays;
  const progress = currentDays - prevRequiredDays;

  return Math.min(100, Math.max(0, (progress / range) * 100));
}
```

#### 交付成果

1. **成就系统定义**
   - 文件: `/lib/achievement-system.ts`
   - 包含: 6个等级定义 + 工具函数

2. **成就服务类**
   - 文件: `/lib/achievement-service.ts`
   - 包含: 完整的业务逻辑方法

3. **单元测试**
   - 文件: `/lib/__tests__/achievement-system.test.ts`
   - 覆盖率: >80%

4. **类型定义**
   - 文件: `/types/achievement.ts`
   - 包含: 所有TypeScript接口和类型

#### 验收标准

- [ ] 6个等级正确定义
- [ ] getLevelByDays() 函数正确返回等级
- [ ] getDaysToNextLevel() 正确计算天数
- [ ] calculateProgress() 正确计算百分比
- [ ] AchievementService所有方法实现
- [ ] 单元测试通过
- [ ] TypeScript类型检查通过

#### 开发日志要求

```markdown
### 开发日志 - 成就系统核心

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**实现难点**:
1. 边界条件处理：
   - 0天时如何处理？→ 默认level 1（还未达成）
   - 超过1000天？→ 停留在level 6

2. 数据库集成：
   - 使用Dexie的Promise API
   - 需要处理异步操作

3. 双链数据隔离：
   - 通过chain参数区分
   - 互不干扰

**函数说明**:
- getLevelByDays: O(6)复杂度，可接受
- calculateProgress: 注意除零保护

**测试结果**:
- 单元测试: 15/15 通过
- 覆盖率: 85%
```

#### 存储位置
- **核心代码**: `/lib/achievement-system.ts`, `/lib/achievement-service.ts`
- **类型定义**: `/types/achievement.ts`
- **测试代码**: `/lib/__tests__/achievement-system.test.ts`
- **开发日志**: `/docs/development-logs/achievement-core.md`

---

### TASK-1-7: 数据库扩展

**负责人**: AI #3 (前端核心开发工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-6

#### 任务目标
扩展现有的IndexedDB数据库，添加成就系统相关的数据表。

#### 详细要求

**1. 数据库Schema升级**
```typescript
// 文件位置: /lib/db.ts (修改现有文件)

import Dexie, { Table } from 'dexie';

// 现有的Reflection表保持不变
export interface Reflection {
  id?: number;
  date: string;
  isMeaningful: boolean;
  rawContent: string;
  structuredData: StructuredReflectionData;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

// 新增: 用户成就表
export interface UserAchievement {
  id?: number;
  walletAddress: string;
  chain: 'bnb' | 'solana';
  currentLevel: number;
  totalCheckInDays: number;
  sbtClaimed: boolean[];  // [false, true, false, ...] 索引0=level1
  lastUpdated: Date;
}

// 新增: 打卡记录表
export interface CheckInRecord {
  id?: number;
  walletAddress: string;
  chain: 'bnb' | 'solana';
  checkInDate: string;  // YYYY-MM-DD
  levelAtTime: number;
  timestamp: Date;
}

export class ZhengDaoDatabase extends Dexie {
  // 现有表
  reflections!: Table<Reflection, number>;

  // 新增表
  userAchievements!: Table<UserAchievement, number>;
  checkInRecords!: Table<CheckInRecord, number>;

  constructor() {
    super('ZhengDaoDB');

    // 版本2: 添加成就系统表
    this.version(2).stores({
      reflections: '++id, date, walletAddress, createdAt',
      userAchievements: '++id, [walletAddress+chain], currentLevel, totalCheckInDays',
      checkInRecords: '++id, [walletAddress+chain], checkInDate, timestamp'
    });

    // 数据迁移逻辑: version(1) → version(2)
    this.version(2).upgrade(async tx => {
      // 迁移现有数据（如果需要）
      console.log('[DB] Upgrading from v1 to v2...');
    });
  }
}

export const db = new ZhengDaoDatabase();
```

**2. 数据库操作封装**
```typescript
// 文件位置: /lib/db-achievement.ts

import { db, UserAchievement, CheckInRecord } from './db';

export class AchievementDB {
  /**
   * 获取或创建用户成就记录
   */
  static async getOrCreateUserAchievement(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<UserAchievement> {
    const existing = await db.userAchievements
      .where(['walletAddress+chain'])
      .equals([walletAddress, chain])
      .first();

    if (existing) {
      return existing;
    }

    // 创建新记录
    const id = await db.userAchievements.add({
      walletAddress,
      chain,
      currentLevel: 1,
      totalCheckInDays: 0,
      sbtClaimed: [false, false, false, false, false, false],
      lastUpdated: new Date()
    });

    return (await db.userAchievements.get(id))!;
  }

  /**
   * 更新用户成就
   */
  static async updateUserAchievement(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    updates: Partial<Pick<UserAchievement, 'currentLevel' | 'totalCheckInDays' | 'sbtClaimed'>>
  ): Promise<void> {
    await db.userAchievements
      .where(['walletAddress+chain'])
      .equals([walletAddress, chain])
      .modify({
        ...updates,
        lastUpdated: new Date()
      });
  }

  /**
   * 添加打卡记录
   */
  static async addCheckInRecord(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    checkInDate: string,
    levelAtTime: number
  ): Promise<number> {
    return await db.checkInRecords.add({
      walletAddress,
      chain,
      checkInDate,
      levelAtTime,
      timestamp: new Date()
    });
  }

  /**
   * 检查今天是否已打卡
   */
  static async hasCheckedInToday(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];

    const record = await db.checkInRecords
      .where(['walletAddress+chain'])
      .equals([walletAddress, chain])
      .and(record => record.checkInDate === today)
      .first();

    return !!record;
  }

  /**
   * 获取打卡历史（最近N条）
   */
  static async getRecentCheckIns(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    limit: number = 30
  ): Promise<CheckInRecord[]> {
    return await db.checkInRecords
      .where(['walletAddress+chain'])
      .equals([walletAddress, chain])
      .reverse()  // 最新的在前
      .limit(limit)
      .toArray();
  }

  /**
   * 获取总打卡天数
   */
  static async getTotalCheckInDays(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<number> {
    const achievement = await this.getOrCreateUserAchievement(walletAddress, chain);
    return achievement.totalCheckInDays;
  }

  /**
   * 标记SBT已claim
   */
  static async markSBTClaimed(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    level: number
  ): Promise<void> {
    const achievement = await this.getOrCreateUserAchievement(walletAddress, chain);

    // level 1对应索引0
    achievement.sbtClaimed[level - 1] = true;

    await db.userAchievements.update(achievement.id!, {
      sbtClaimed: achievement.sbtClaimed,
      lastUpdated: new Date()
    });
  }

  /**
   * 清空所有数据（用于测试或重置）
   */
  static async clearAll(): Promise<void> {
    await db.userAchievements.clear();
    await db.checkInRecords.clear();
  }
}
```

**3. 数据库初始化测试**
```typescript
// 文件位置: /lib/__tests__/db-achievement.test.ts

import { AchievementDB } from '../db-achievement';

describe('AchievementDB', () => {
  beforeEach(async () => {
    await AchievementDB.clearAll();
  });

  it('should create new user achievement', async () => {
    const achievement = await AchievementDB.getOrCreateUserAchievement(
      '0x123...',
      'bnb'
    );

    expect(achievement.walletAddress).toBe('0x123...');
    expect(achievement.chain).toBe('bnb');
    expect(achievement.currentLevel).toBe(1);
    expect(achievement.totalCheckInDays).toBe(0);
  });

  it('should detect duplicate check-in on same day', async () => {
    await AchievementDB.addCheckInRecord('0x123...', 'bnb', '2024-01-27', 1);

    const hasCheckedIn = await AchievementDB.hasCheckedInToday(
      '0x123...',
      'bnb'
    );

    expect(hasCheckedIn).toBe(true);
  });
});
```

#### 交付成果

1. **数据库Schema更新**
   - 文件: `/lib/db.ts` (修改)
   - 版本升级: 1 → 2
   - 新增表: userAchievements, checkInRecords

2. **数据库操作封装**
   - 文件: `/lib/db-achievement.ts`
   - 包含: 所有CRUD操作

3. **数据库测试**
   - 文件: `/lib/__tests__/db-achievement.test.ts`
   - 覆盖率: >80%

4. **迁移指南**
   - 文件: `/docs/db-migration-v1-to-v2.md`
   - 说明: 如何从v1升级到v2

#### 验收标准

- [ ] 数据库版本正确升级到v2
- [ ] 新表创建成功
- [ ] 数据迁移无错误
- [ ] AchievementDB所有方法正常工作
- [ ] 单元测试通过
- [ ] 支持双链数据隔离
- [ ] 索引正确配置

#### 开发日志要求

```markdown
### 开发日志 - 数据库扩展

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**Schema变更**:
- version 1: reflections表
- version 2: reflections + userAchievements + checkInRecords

**迁移策略**:
1. 使用Dexie的version机制
2. 自动升级，无需手动干预
3. 保持向后兼容

**索引设计**:
- [walletAddress+chain]: 复合索引，快速查询
- checkInDate: 日期索引，防重复打卡
- timestamp: 时间索引，排序查询

**性能考虑**:
- 限制查询数量（.limit()）
- 使用复合索引
- 避免全表扫描
```

#### 存储位置
- **数据库文件**: `/lib/db.ts` (修改)
- **数据库操作**: `/lib/db-achievement.ts`
- **测试代码**: `/lib/__tests__/db-achievement.test.ts`
- **迁移文档**: `/docs/db-migration-v1-to-v2.md`
- **开发日志**: `/docs/development-logs/db-extension.md`

---

---

### TASK-1-8: LevelDisplay组件

**负责人**: AI #4 (UI组件开发工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-6

#### 任务目标
开发等级展示组件，显示用户当前等级、进度条、下一等级预览。

#### 详细要求

**1. 组件功能**
- 显示当前等级图标、称号、颜色
- 显示当前打卡天数
- 显示距离下一等级还需要多少天
- 进度条可视化（0-100%）
- 显示奖励加成百分比
- 响应式设计

**2. 组件接口**
```typescript
// 文件位置: /components/achievement/LevelDisplay.tsx

import { AchievementLevel } from '@/lib/achievement-system';

interface LevelDisplayProps {
  currentDays: number;
  currentLevel: AchievementLevel;
  nextLevel: AchievementLevel | null;
  className?: string;
}

export function LevelDisplay({
  currentDays,
  currentLevel,
  nextLevel,
  className = ''
}: LevelDisplayProps) {
  // 计算进度
  const progress = calculateProgress(currentDays, currentLevel.level + 1);
  const daysToNext = nextLevel
    ? nextLevel.requiredDays - currentDays
    : 0;

  return (
    <div className={`level-display ${className}`}>
      {/* 当前等级 */}
      <div className="level-header">
        <div
          className="level-icon"
          style={{
            backgroundColor: currentLevel.primaryColor,
            color: currentLevel.secondaryColor
          }}
        >
          {getIcon(currentLevel.icon)}
        </div>
        <div className="level-info">
          <h2 className="level-title">{currentLevel.title}</h2>
          <p className="level-subtitle">
            Level {currentLevel.level} · {currentLevel.titleEn}
          </p>
        </div>
      </div>

      {/* 打卡天数 */}
      <div className="days-display">
        <span className="days-number">{currentDays}</span>
        <span className="days-label">天</span>
      </div>

      {/* 进度条 */}
      {nextLevel && (
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: nextLevel.primaryColor
              }}
            />
          </div>
          <p className="progress-text">
            距离 {nextLevel.title} 还需 {daysToNext} 天
          </p>
        </div>
      )}

      {/* 奖励加成 */}
      {currentLevel.rewardBonus > 0 && (
        <div className="reward-badge">
          <span className="reward-icon">🎁</span>
          <span>奖励加成 +{currentLevel.rewardBonus}%</span>
        </div>
      )}

      {/* 关键词标签 */}
      <div className="keywords-tags">
        {currentLevel.keywords.map((keyword, index) => (
          <span
            key={index}
            className="keyword-tag"
            style={{
              borderColor: currentLevel.primaryColor,
              color: currentLevel.primaryColor
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

// 辅助函数
function getIcon(iconName: string): JSX.Element {
  const icons: Record<string, JSX.Element> = {
    walking: <span className="text-4xl">👣</span>,
    bike: <span className="text-4xl">🚲</span>,
    ebike: <span className="text-4xl">⚡</span>,
    car: <span className="text-4xl">🚗</span>,
    'sports-car': <span className="text-4xl">🏎️</span>,
    champagne: <span className="text-4xl">🏖️</span>
  };
  return icons[iconName] || icons.walking;
}

function calculateProgress(currentDays: number, targetLevel: number): number {
  // 计算逻辑
  return 0; // 简化示例
}
```

**3. 样式要求**
```css
/* 文件位置: /components/achievement/LevelDisplay.module.css */

.level-display {
  padding: 1.5rem;
  border: 2px solid #1a1a1a;
  background: #fff;
  border-radius: 0; /* 水墨风格无圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.level-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.level-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  font-size: 2rem;
}

.level-title {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Georgia', serif;
  color: #1a1a1a;
  margin: 0;
}

.level-subtitle {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.days-display {
  text-align: center;
  margin: 2rem 0;
}

.days-number {
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Georgia', serif;
  color: #1a1a1a;
}

.days-label {
  font-size: 1rem;
  color: #666;
  margin-left: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.progress-text {
  text-align: center;
  font-size: 0.875rem;
  color: #666;
  margin: 0.5rem 0 0;
}

.reward-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  margin-top: 1rem;
}

.keywords-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.keyword-tag {
  padding: 0.25rem 0.75rem;
  border: 2px solid;
  font-size: 0.75rem;
  font-weight: bold;
}
```

**4. 响应式设计**
- 桌面端: 水平布局
- 平板端: 水平布局，间距缩小
- 移动端: 垂直堆叠布局

**5. 动画效果**
- 进度条增长动画（0.5s ease）
- 数字滚动动画
- 等级图标悬停效果

#### 交付成果

1. **组件代码**
   - 文件: `/components/achievement/LevelDisplay.tsx`
   - 包含: 完整组件逻辑 + 样式

2. **样式文件**
   - 文件: `/components/achievement/LevelDisplay.module.css`
   - 或使用 Tailwind CSS

3. **Storybook故事** (可选)
   - 文件: `/components/achievement/LevelDisplay.stories.tsx`
   - 展示所有6个等级的样式

4. **单元测试**
   - 文件: `/components/achievement/__tests__/LevelDisplay.test.tsx`
   - 测试用例: 渲染、props传递、进度计算

#### 验收标准

- [ ] 组件正确渲染当前等级
- [ ] 图标正确显示
- [ ] 进度条计算准确
- [ ] 响应式设计适配3种屏幕
- [ ] 动画流畅
- [ ] 水墨风格统一
- [ ] TypeScript类型正确
- [ ] 单元测试通过

#### 开发日志要求

```markdown
### 开发日志 - LevelDisplay组件

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**设计决策**:
1. 为什么使用CSS Modules？
   - 避免样式冲突
   - 更好的类型安全

2. 进度计算逻辑：
   - 复用achievement-system中的函数
   - 避免重复代码

3. 动画性能：
   - 使用CSS transition，而非JS动画
   - 避免重排和重绘

**兼容性测试**:
- [x] Chrome
- [x] Safari
- [x] Firefox
- [x] Mobile Safari
```

#### 存储位置
- **组件代码**: `/components/achievement/LevelDisplay.tsx`
- **样式文件**: `/components/achievement/LevelDisplay.module.css`
- **测试代码**: `/components/achievement/__tests__/LevelDisplay.test.tsx`
- **开发日志**: `/docs/development-logs/component-level-display.md`

---

### TASK-1-9: SBTGallery组件

**负责人**: AI #4 (UI组件开发工程师)
**工时**: 2天
**优先级**: P0
**依赖**: TASK-1-6

#### 任务目标
开发SBT展示墙组件，以时间线形式展示用户获得的所有SBT。

#### 详细要求

**1. 组件功能**
- 显示用户已获得的所有SBT
- 按获得时间排序
- 支持点击查看详情
- 支持按链筛选（BNB/Solana）
- 空状态提示
- 加载状态

**2. 组件接口**
```typescript
// 文件位置: /components/achievement/SBTGallery.tsx

import { useState } from 'react';

interface SBTItem {
  tokenId: number;
  level: number;
  chain: 'bnb' | 'solana';
  title: string;
  image: string;
  achievedDate: Date;
  metadata: any;
}

interface SBTGalleryProps {
  sbts: SBTItem[];
  loading?: boolean;
  onSBTClick?: (sbt: SBTItem) => void;
  className?: string;
}

export function SBTGallery({
  sbts,
  loading = false,
  onSBTClick,
  className = ''
}: SBTGalleryProps) {
  const [filterChain, setFilterChain] = useState<'all' | 'bnb' | 'solana'>('all');
  const [selectedSBT, setSelectedSBT] = useState<SBTItem | null>(null);

  // 过滤SBT
  const filteredSBTs = sbts.filter(sbt => {
    if (filterChain === 'all') return true;
    return sbt.chain === filterChain;
  });

  // 按时间排序（最新的在前）
  const sortedSBTs = [...filteredSBTs].sort(
    (a, b) => b.achievedDate.getTime() - a.achievedDate.getTime()
  );

  return (
    <div className={`sbt-gallery ${className}`}>
      {/* 头部：筛选器 */}
      <div className="gallery-header">
        <h2 className="gallery-title">
          我的SBT收藏 ({sortedSBTs.length})
        </h2>
        <div className="chain-filter">
          <button
            className={filterChain === 'all' ? 'active' : ''}
            onClick={() => setFilterChain('all')}
          >
            全部
          </button>
          <button
            className={filterChain === 'bnb' ? 'active' : ''}
            onClick={() => setFilterChain('bnb')}
          >
            BNB Chain
          </button>
          <button
            className={filterChain === 'solana' ? 'active' : ''}
            onClick={() => setFilterChain('solana')}
          >
            Solana
          </button>
        </div>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="gallery-loading">
          <div className="spinner" />
          <p>加载SBT中...</p>
        </div>
      )}

      {/* 空状态 */}
      {!loading && sortedSBTs.length === 0 && (
        <div className="gallery-empty">
          <div className="empty-icon">🎨</div>
          <h3>还没有SBT</h3>
          <p>坚持打卡，获得你的第一个SBT吧！</p>
        </div>
      )}

      {/* SBT网格 */}
      {!loading && sortedSBTs.length > 0 && (
        <div className="sbt-grid">
          {sortedSBTs.map((sbt, index) => (
            <SBTCard
              key={sbt.tokenId}
              sbt={sbt}
              index={index}
              onClick={() => {
                setSelectedSBT(sbt);
                onSBTClick?.(sbt);
              }}
            />
          ))}
        </div>
      )}

      {/* SBT详情弹窗 */}
      {selectedSBT && (
        <SBTDetailModal
          sbt={selectedSBT}
          onClose={() => setSelectedSBT(null)}
        />
      )}
    </div>
  );
}

// SBT卡片子组件
interface SBTCardProps {
  sbt: SBTItem;
  index: number;
  onClick: () => void;
}

function SBTCard({ sbt, index, onClick }: SBTCardProps) {
  return (
    <div
      className="sbt-card"
      onClick={onClick}
      style={{
        animationDelay: `${index * 100}ms` // 瀑布流动画
      }}
    >
      {/* 链标签 */}
      <div className={`chain-tag ${sbt.chain}`}>
        {sbt.chain === 'bnb' ? 'BNB' : 'SOL'}
      </div>

      {/* SBT图像 */}
      <div className="sbt-image">
        <img src={sbt.image} alt={sbt.title} />
        <div className="level-badge">Level {sbt.level}</div>
      </div>

      {/* SBT信息 */}
      <div className="sbt-info">
        <h3 className="sbt-title">{sbt.title}</h3>
        <p className="sbt-date">
          获得于 {formatDate(sbt.achievedDate)}
        </p>
      </div>
    </div>
  );
}

// 格式化日期
function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days}天前`;
  if (days < 30) return `${Math.floor(days / 7)}周前`;
  return date.toLocaleDateString('zh-CN');
}
```

**3. SBT卡片样式**
```css
/* 文件位置: /components/achievement/SBTGallery.module.css */

.sbt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.sbt-card {
  position: relative;
  border: 2px solid #1a1a1a;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease backwards;
}

.sbt-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.chain-tag {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 0;
  z-index: 10;
}

.chain-tag.bnb {
  background: #F3BA2F;
  color: #fff;
}

.chain-tag.solana {
  background: #9945FF;
  color: #fff;
}

.sbt-image {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
  border-bottom: 2px solid #1a1a1a;
}

.sbt-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sbt-card:hover .sbt-image img {
  transform: scale(1.05);
}

.level-badge {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(26, 26, 26, 0.9);
  color: #fff;
  font-weight: bold;
  font-size: 0.875rem;
}

.sbt-info {
  padding: 1rem;
}

.sbt-title {
  font-size: 1.125rem;
  font-weight: bold;
  font-family: 'Georgia', serif;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.sbt-date {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .sbt-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
```

**4. SBT详情弹窗**
```typescript
// 文件位置: /components/achievement/SBTDetailModal.tsx

interface SBTDetailModalProps {
  sbt: SBTItem;
  onClose: () => void;
}

export function SBTDetailModal({ sbt, onClose }: SBTDetailModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* SBT大图 */}
        <div className="modal-image">
          <img src={sbt.image} alt={sbt.title} />
        </div>

        {/* SBT详情 */}
        <div className="modal-details">
          <h2 className="modal-title">{sbt.title}</h2>
          <p className="modal-subtitle">
            Level {sbt.level} · {sbt.chain === 'bnb' ? 'BNB Chain' : 'Solana'}
          </p>

          {/* 元数据表格 */}
          <table className="metadata-table">
            <tbody>
              <tr>
                <td>Token ID</td>
                <td>#{sbt.tokenId}</td>
              </tr>
              <tr>
                <td>获得时间</td>
                <td>{sbt.achievedDate.toLocaleString('zh-CN')}</td>
              </tr>
              <tr>
                <td>区块链</td>
                <td>{sbt.chain === 'bnb' ? 'BNB Chain Testnet' : 'Solana Devnet'}</td>
              </tr>
            </tbody>
          </table>

          {/* 属性列表 */}
          <div className="attributes-list">
            {sbt.metadata.attributes.map((attr: any, index: number) => (
              <div key={index} className="attribute-item">
                <span className="attribute-type">{attr.trait_type}</span>
                <span className="attribute-value">{attr.value}</span>
              </div>
            ))}
          </div>

          {/* 区块浏览器链接 */}
          <a
            href={getBlockExplorerUrl(sbt)}
            target="_blank"
            rel="noopener noreferrer"
            className="explorer-link"
          >
            在区块浏览器上查看 →
          </a>
        </div>
      </div>
    </div>
  );
}

function getBlockExplorerUrl(sbt: SBTItem): string {
  if (sbt.chain === 'bnb') {
    return `https://testnet.bscscan.com/token/${sbt.tokenId}`;
  } else {
    return `https://explorer.solana.com/address/${sbt.tokenId}?cluster=devnet`;
  }
}
```

**5. 数据获取Hook**
```typescript
// 文件位置: /lib/hooks/useSBTs.ts

import { useState, useEffect } from 'react';
import { AchievementDB } from '@/lib/db-achievement';

export function useSBTs(walletAddress: string, chain: 'all' | 'bnb' | 'solana' = 'all') {
  const [sbts, setSBTs] = useState<SBTItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSBTs() {
      setLoading(true);
      try {
        // 从数据库获取SBT数据
        const achievement = await AchievementDB.getOrCreateUserAchievement(
          walletAddress,
          chain === 'all' ? 'bnb' : chain
        );

        // 构建SBT列表
        const sbtList: SBTItem[] = [];
        // ... 逻辑实现

        setSBTs(sbtList);
      } catch (error) {
        console.error('Failed to fetch SBTs:', error);
      } finally {
        setLoading(false);
      }
    }

    if (walletAddress) {
      fetchSBTs();
    }
  }, [walletAddress, chain]);

  return { sbts, loading };
}
```

#### 交付成果

1. **SBTGallery组件**
   - 文件: `/components/achievement/SBTGallery.tsx`
   - 包含: 主组件 + SBTCard子组件

2. **SBTDetailModal组件**
   - 文件: `/components/achievement/SBTDetailModal.tsx`

3. **样式文件**
   - 文件: `/components/achievement/SBTGallery.module.css`
   - 文件: `/components/achievement/SBTDetailModal.module.css`

4. **自定义Hook**
   - 文件: `/lib/hooks/useSBTs.ts`

5. **单元测试**
   - 文件: `/components/achievement/__tests__/SBTGallery.test.tsx`

#### 验收标准

- [ ] SBT正确展示在网格中
- [ ] 瀑布流动画流畅
- [ ] 点击卡片打开详情弹窗
- [ ] 链筛选功能正常
- [ ] 空状态正确显示
- [ ] 响应式布局适配
- [ ] 水墨风格统一

#### 开发日志要求

```markdown
### 开发日志 - SBTGallery组件

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**设计决策**:
1. 为什么使用CSS Grid？
   - 响应式布局更灵活
   - 自动填充，无需媒体查询

2. 瀑布流动画实现：
   - 使用CSS animation-delay
   - 根据index动态设置延迟

3. 性能优化：
   - 图片懒加载
   - 虚拟滚动（如果SBT数量>50）
```

#### 存储位置
- **组件代码**: `/components/achievement/SBTGallery.tsx`
- **详情弹窗**: `/components/achievement/SBTDetailModal.tsx`
- **样式文件**: `/components/achievement/SBTGallery.module.css`
- **开发日志**: `/docs/development-logs/component-sbt-gallery.md`

---

### TASK-1-10: ClaimSBTFlow组件

**负责人**: AI #4 (UI组件开发工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-9

#### 任务目标
开发SBT申领流程组件，引导用户完成链上SBT铸造。

#### 详细要求

**1. 组件功能**
- 多步骤流程（3步）
- 确认SBT信息
- 调用智能合约
- 显示成功/失败状态
- 错误处理和重试

**2. 步骤定义**
```
Step 1: 确认信息
  - 显示SBT图像和元数据
  - 显示链上铸造费用
  - 确认按钮

Step 2: 链上交易
  - 显示加载动画
  - 交易进度提示
  - 交易Hash链接

Step 3: 完成
  - 成功动画
  - SBT预览
  - 分享按钮（可选）
```

**3. 组件接口**
```typescript
// 文件位置: /components/achievement/ClaimSBTFlow.tsx

import { useState } from 'react';

type ClaimStep = 'confirm' | 'minting' | 'success' | 'error';

interface ClaimSBTFlowProps {
  walletAddress: string;
  chain: 'bnb' | 'solana';
  level: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ClaimSBTFlow({
  walletAddress,
  chain,
  level,
  onClose,
  onSuccess
}: ClaimSBTFlowProps) {
  const [step, setStep] = useState<ClaimStep>('confirm');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 获取等级信息
  const levelInfo = ACHIEVEMENT_LEVELS.find(l => l.level === level);

  const handleClaim = async () => {
    setStep('minting');
    setError('');

    try {
      // 调用合约mint函数
      const txHash = await mintSBT(walletAddress, chain, level);
      setTransactionHash(txHash);

      // 保存到数据库
      await AchievementDB.markSBTClaimed(walletAddress, chain, level, 0);

      setStep('success');
      onSuccess?.();
    } catch (err: any) {
      console.error('Claim SBT failed:', err);
      setError(err.message || '铸造失败，请重试');
      setStep('error');
    }
  };

  return (
    <div className="claim-flow-overlay">
      <div className="claim-flow-modal">
        {/* 关闭按钮 */}
        {step !== 'minting' && (
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        )}

        {/* Step 1: 确认信息 */}
        {step === 'confirm' && (
          <ConfirmStep
            level={levelInfo!}
            chain={chain}
            onConfirm={handleClaim}
            onCancel={onClose}
          />
        )}

        {/* Step 2: 铸造中 */}
        {step === 'minting' && (
          <MintingStep chain={chain} />
        )}

        {/* Step 3: 成功 */}
        {step === 'success' && (
          <SuccessStep
            level={levelInfo!}
            chain={chain}
            txHash={transactionHash}
            onClose={onClose}
          />
        )}

        {/* Step 4: 失败 */}
        {step === 'error' && (
          <ErrorStep
            error={error}
            onRetry={handleClaim}
            onCancel={onClose}
          />
        )}
      </div>
    </div>
  );
}

// Step 1: 确认信息
function ConfirmStep({
  level,
  chain,
  onConfirm,
  onCancel
}: any) {
  return (
    <div className="claim-step">
      <h2 className="step-title">确认铸造SBT</h2>

      {/* SBT预览 */}
      <div className="sbt-preview">
        <img
          src={`/sbt-images/level-${level.level}/level-${level.level}-small.png`}
          alt={level.title}
        />
      </div>

      {/* SBT信息 */}
      <div className="sbt-details">
        <h3 className="sbt-name">{level.title}</h3>
        <p className="sbt-desc">
          坚持打卡{level.requiredDays}天获得的成就证明
        </p>

        <div className="info-row">
          <span>等级</span>
          <span>Level {level.level}</span>
        </div>
        <div className="info-row">
          <span>区块链</span>
          <span>{chain === 'bnb' ? 'BNB Chain Testnet' : 'Solana Devnet'}</span>
        </div>
        <div className="info-row">
          <span>铸造费用</span>
          <span>免费</span>
        </div>
      </div>

      {/* 警告提示 */}
      <div className="warning-box">
        <span className="warning-icon">⚠️</span>
        <p>SBT是灵魂绑定NFT，铸造后不可转移</p>
      </div>

      {/* 按钮 */}
      <div className="action-buttons">
        <button className="btn-cancel" onClick={onCancel}>
          取消
        </button>
        <button className="btn-confirm" onClick={onConfirm}>
          确认铸造
        </button>
      </div>
    </div>
  );
}

// Step 2: 铸造中
function MintingStep({ chain }: { chain: 'bnb' | 'solana' }) {
  return (
    <div className="claim-step">
      <h2 className="step-title">铸造中...</h2>

      {/* 加载动画 */}
      <div className="minting-animation">
        <div className="spinner" />
        <div className="progress-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>

      {/* 进度提示 */}
      <div className="minting-status">
        <p>正在与{chain === 'bnb' ? 'BNB Chain' : 'Solana'}交互</p>
        <p className="status-detail">请确认钱包中的交易请求</p>
      </div>

      {/* 提示信息 */}
      <div className="tips-box">
        <p>💡 请勿关闭此窗口</p>
        <p>💡 交易可能需要10-30秒</p>
      </div>
    </div>
  );
}

// Step 3: 成功
function SuccessStep({
  level,
  chain,
  txHash,
  onClose
}: any) {
  return (
    <div className="claim-step">
      {/* 成功动画 */}
      <div className="success-animation">
        <div className="checkmark">✓</div>
      </div>

      <h2 className="step-title">铸造成功！</h2>

      {/* SBT卡片 */}
      <div className="success-sbt-card">
        <img
          src={`/sbt-images/level-${level.level}/level-${level.level}-small.png`}
          alt={level.title}
        />
        <h3>{level.title}</h3>
        <p>Level {level.level}</p>
      </div>

      {/* 交易信息 */}
      <div className="transaction-info">
        <p className="tx-label">交易Hash</p>
        <a
          href={getExplorerUrl(txHash, chain)}
          target="_blank"
          rel="noopener noreferrer"
          className="tx-link"
        >
          {shortenHash(txHash)}
        </a>
      </div>

      {/* 按钮 */}
      <div className="action-buttons">
        <button className="btn-share" onClick={() => shareSBT(level)}>
          分享
        </button>
        <button className="btn-close" onClick={onClose}>
          完成
        </button>
      </div>
    </div>
  );
}

// Step 4: 失败
function ErrorStep({
  error,
  onRetry,
  onCancel
}: any) {
  return (
    <div className="claim-step">
      {/* 错误图标 */}
      <div className="error-icon">✕</div>

      <h2 className="step-title">铸造失败</h2>

      <p className="error-message">{error}</p>

      {/* 错误提示 */}
      <div className="error-tips">
        <p>可能的原因：</p>
        <ul>
          <li>钱包余额不足</li>
          <li>网络连接不稳定</li>
          <li>交易被拒绝</li>
        </ul>
      </div>

      {/* 按钮 */}
      <div className="action-buttons">
        <button className="btn-cancel" onClick={onCancel}>
          取消
        </button>
        <button className="btn-retry" onClick={onRetry}>
          重试
        </button>
      </div>
    </div>
  );
}

// 辅助函数
function getExplorerUrl(txHash: string, chain: 'bnb' | 'solana'): string {
  if (chain === 'bnb') {
    return `https://testnet.bscscan.com/tx/${txHash}`;
  } else {
    return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
  }
}

function shortenHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

async function mintSBT(
  walletAddress: string,
  chain: 'bnb' | 'solana',
  level: number
): Promise<string> {
  // 实现链上铸造逻辑
  if (chain === 'bnb') {
    // 调用BNB Chain合约
    return '0x...';
  } else {
    // 调用Solana程序
    return '...';
  }
}
```

**4. 样式**
```css
/* 文件位置: /components/achievement/ClaimSBTFlow.module.css */

.claim-flow-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.claim-flow-modal {
  background: #fff;
  border: 2px solid #1a1a1a;
  border-radius: 0;
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.claim-step {
  padding: 2rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 2rem 0;
  font-family: 'Georgia', serif;
}

/* SBT预览 */
.sbt-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.sbt-preview img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

/* SBT详情 */
.sbt-details {
  margin-bottom: 2rem;
}

.sbt-name {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 0.5rem 0;
}

.sbt-desc {
  text-align: center;
  color: #666;
  margin: 0 0 1rem 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row span:first-child {
  color: #666;
}

.info-row span:last-child {
  font-weight: bold;
}

/* 警告框 */
.warning-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #FFF3CD;
  border-left: 4px solid #FFC107;
  margin-bottom: 2rem;
}

.warning-icon {
  font-size: 1.5rem;
}

/* 按钮 */
.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn-cancel,
.btn-confirm,
.btn-close,
.btn-retry,
.btn-share {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: 2px solid #1a1a1a;
  border-radius: 0;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #fff;
  color: #1a1a1a;
}

.btn-confirm,
.btn-retry {
  background: #1a1a1a;
  color: #fff;
}

.btn-confirm:hover,
.btn-retry:hover {
  background: #333;
}

/* 成功动画 */
.success-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #10B981;
  color: #fff;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* 铸造中动画 */
.minting-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f0f0f0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.progress-dots {
  margin-top: 1rem;
  font-size: 2rem;
  letter-spacing: 0.25rem;
}

.progress-dots span {
  animation: blink 1.4s infinite;
  animation-fill-mode: both;
}

.progress-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.progress-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

/* 错误状态 */
.error-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #EF4444;
  color: #fff;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.error-message {
  text-align: center;
  color: #EF4444;
  margin-bottom: 2rem;
}

.error-tips {
  background: #FEF2F2;
  padding: 1rem;
  margin-bottom: 2rem;
}

.error-tips p {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.error-tips ul {
  margin: 0;
  padding-left: 1.5rem;
}

.error-tips li {
  margin-bottom: 0.25rem;
  color: #666;
}
```

#### 交付成果

1. **ClaimSBTFlow组件**
   - 文件: `/components/achievement/ClaimSBTFlow.tsx`
   - 包含: 所有步骤子组件

2. **样式文件**
   - 文件: `/components/achievement/ClaimSBTFlow.module.css`

3. **合约调用函数**
   - 文件: `/lib/contracts/claim-sbt.ts` (合约交互逻辑)

4. **单元测试**
   - 文件: `/components/achievement/__tests__/ClaimSBTFlow.test.tsx`

#### 验收标准

- [ ] 3步流程正确展示
- [ ] 确认信息准确显示
- [ ] 铸造中动画流畅
- [ ] 成功状态正确处理
- [ ] 错误处理完善
- [ ] 重试功能正常
- [ ] 交易Hash链接可跳转
- [ ] 水墨风格统一

#### 开发日志要求

```markdown
### 开发日志 - ClaimSBTFlow组件

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**用户体验优化**:
1. 步骤清晰明确
2. 加载状态反馈及时
3. 错误信息友好具体
4. 成功后有成就感

**技术实现**:
- 使用状态机管理步骤
- 动画使用CSS，性能好
- 错误边界保护
```

#### 存储位置
- **组件代码**: `/components/achievement/ClaimSBTFlow.tsx`
- **合约交互**: `/lib/contracts/claim-sbt.ts`
- **样式文件**: `/components/achievement/ClaimSBTFlow.module.css`
- **开发日志**: `/docs/development-logs/component-claim-flow.md`

---

### TASK-1-11: BNB合约集成

**负责人**: AI #3 (前端核心开发工程师)
**工时**: 1天
**优先级**: P0
**依赖**: TASK-1-3, TASK-1-7, TASK-1-10

#### 任务目标
将BNB Chain SBT合约集成到前端，实现链上铸造功能。

#### 详细要求

**1. 合约交互封装**
```typescript
// 文件位置: /lib/contracts/sbt.ts

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import ZHENGDAO_SBT_ABI from '@/abis/ZhengDaoSBT.json';

const SBT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS as `0x${string}`;

/**
 * 铸造SBT Hook
 */
export function useMintSBT() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  /**
   * 铸造SBT
   */
  const mintSBT = async (
    to: `0x${string}`,
    level: number,
    days: number,
    metadataURI: string
  ) => {
    try {
      await writeContract(
        {
          address: SBT_CONTRACT_ADDRESS,
          abi: ZHENGDAO_SBT_ABI.abi,
          functionName: 'mintSBT',
          args: [to, level, days, metadataURI],
        },
        {
          onSuccess: () => {
            console.log('[SBT] Mint transaction submitted');
          },
          onError: (error) => {
            console.error('[SBT] Mint failed:', error);
            throw error;
          },
        }
      );
    } catch (err) {
      throw err;
    }
  };

  return {
    mintSBT,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
}

/**
 * 读取SBT详情 Hook
 */
export function useSBTDetails(tokenId: number) {
  const { data, error, isLoading } = useReadContract({
    address: SBT_CONTRACT_ADDRESS,
    abi: ZHENGDAO_SBT_ABI.abi,
    functionName: 'getTokenDetails',
    args: [tokenId],
  });

  return {
    details: data,
    error,
    isLoading,
  };
}

/**
 * 获取用户所有SBT Hook
 */
export function useUserSBTs(walletAddress: `0x${string}`) {
  const { data, error, isLoading } = useReadContract({
    address: SBT_CONTRACT_ADDRESS,
    abi: ZHENGDAO_SBT_ABI.abi,
    functionName: 'getUserTokens',
    args: [walletAddress],
  });

  return {
    tokenIds: data as number[] | undefined,
    error,
    isLoading,
  };
}
```

**2. SBT服务类**
```typescript
// 文件位置: /lib/sbt-manager.ts

import { useMintSBT, useUserSBTs, useSBTDetails } from './contracts/sbt';
import { AchievementDB } from './db-achievement';
import { ACHIEVEMENT_LEVELS } from './achievement-system';

export class SBTManager {
  /**
   * 铸造SBT并更新数据库
   */
  static async mintAndSaveSBT(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    level: number
  ): Promise<string> {
    // 1. 获取元数据URI
    const metadataURI = this.getMetadataURI(level, chain);

    // 2. 获取等级信息
    const levelInfo = ACHIEVEMENT_LEVELS.find(l => l.level === level)!;
    const days = levelInfo.requiredDays;

    // 3. 调用合约铸造
    const { mintSBT, hash } = useMintSBT();
    await mintSBT(walletAddress as `0x${string}`, level, days, metadataURI);

    // 4. 保存到本地数据库
    // 注意：tokenId需要从交易收据中获取
    // 这里简化处理，实际需要解析logs

    return hash;
  }

  /**
   * 获取元数据URI
   */
  private static getMetadataURI(level: number, chain: 'bnb' | 'solana'): string {
    // 如果使用IPFS
    if (process.env.NEXT_PUBLIC_USE_IPFS === 'true') {
      const cid = this.getIPFSCID(level);
      return `ipfs://${cid}`;
    }

    // 如果使用本地路径（开发环境）
    return `/sbt-metadata/level-${level}-${chain}.json`;
  }

  /**
   * 获取IPFS CID
   */
  private static getIPFSCID(level: number): string {
    const cids: Record<number, string> = {
      1: 'Qm...', // 从IPFS上传日志中获取
      2: 'Qm...',
      3: 'Qm...',
      4: 'Qm...',
      5: 'Qm...',
      6: 'Qm...',
    };
    return cids[level];
  }

  /**
   * 同步链上SBT到本地数据库
   */
  static async syncSBTsFromChain(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<void> {
    if (chain !== 'bnb') return; // 当前只实现BNB

    const { tokenIds } = useUserSBTs(walletAddress as `0x${string}`);

    if (!tokenIds || tokenIds.length === 0) return;

    for (const tokenId of tokenIds) {
      // 检查是否已记录
      const existing = await AchievementDB.hasSBTRecord(tokenId);

      if (!existing) {
        // 获取SBT详情
        const { details } = useSBTDetails(tokenId);

        if (details) {
          const [level, days, date] = details;

          // 保存到数据库
          await AchievementDB.addSBTRecord({
            tokenId,
            walletAddress,
            chain,
            level: Number(level),
            achievedAt: new Date(Number(date) * 1000),
            metadata: {}
          });
        }
      }
    }
  }

  /**
   * 检查用户是否已铸造某等级SBT
   */
  static async hasMintedSBT(
    walletAddress: string,
    chain: 'bnb' | 'solana',
    level: number
  ): Promise<boolean> {
    // 检查本地数据库
    const achievement = await AchievementDB.getOrCreateUserAchievement(
      walletAddress,
      chain
    );

    return achievement.sbtClaimed[level - 1];
  }

  /**
   * 获取所有已铸造的SBT
   */
  static async getMintedSBTs(
    walletAddress: string,
    chain: 'bnb' | 'solana'
  ): Promise<SBTItem[]> {
    const achievement = await AchievementDB.getOrCreateUserAchievement(
      walletAddress,
      chain
    );

    const sbts: SBTItem[] = [];

    for (let i = 0; i < achievement.sbtClaimed.length; i++) {
      if (achievement.sbtClaimed[i]) {
        const level = i + 1;
        const levelInfo = ACHIEVEMENT_LEVELS.find(l => l.level === level)!;

        sbts.push({
          tokenId: 0, // 实际需要从数据库获取
          level,
          chain,
          title: levelInfo.title,
          image: `/sbt-images/level-${level}/level-${level}.png`,
          achievedDate: achievement.lastUpdated,
          metadata: {}
        });
      }
    }

    return sbts;
  }
}
```

**3. 集成到主页面**
```typescript
// 文件位置: /app/page.tsx (修改现有文件)

import { SBTManager } from '@/lib/sbt-manager';

function HomePageContent() {
  // ... 现有代码

  // 打卡成功后检查是否可以claim SBT
  useEffect(() => {
    if (isConfirmed && checkInCompleted) {
      checkClaimableSBT();
    }
  }, [isConfirmed, checkInCompleted]);

  const checkClaimableSBT = async () => {
    if (!address) return;

    // 获取当前等级
    const stats = await AchievementService.getCheckInStats(address, 'bnb');
    const currentLevel = stats.currentLevel;

    // 检查是否已claim
    const hasClaimed = await SBTManager.hasMintedSBT(address, 'bnb', currentLevel);

    if (!hasClaimed && currentLevel > 0) {
      // 显示claim提示
      setShowClaimPrompt(true);
    }
  };

  const handleClaimSBT = async (level: number) => {
    if (!address) return;

    try {
      const txHash = await SBTManager.mintAndSaveSBT(address, 'bnb', level);

      // 显示成功消息
      toast.success(`SBT铸造成功！交易: ${txHash}`);

      // 刷新SBT列表
      await SBTManager.syncSBTsFromChain(address, 'bnb');

      // 关闭提示
      setShowClaimPrompt(false);
    } catch (error: any) {
      console.error('Claim SBT failed:', error);
      toast.error(error.message || '铸造失败');
    }
  };

  return (
    <div>
      {/* ... 现有UI */}

      {/* SBT Claim提示 */}
      {showClaimPrompt && (
        <div className="claim-prompt">
          <p>🎉 恭喜达到新等级！</p>
          <button onClick={() => handleClaimSBT(currentLevel)}>
            领取SBT
          </button>
        </div>
      )}
    </div>
  );
}
```

**4. 环境变量配置**
```bash
# .env.local (添加)

# BNB Chain SBT合约地址
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=0x1234567890123456789012345678901234567890

# 是否使用IPFS
NEXT_PUBLIC_USE_IPFS=false

# IPFS Gateway
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

#### 交付成果

1. **合约交互封装**
   - 文件: `/lib/contracts/sbt.ts`
   - 包含: mintSBT, useSBTDetails, useUserSBTs hooks

2. **SBT管理器**
   - 文件: `/lib/sbt-manager.ts`
   - 包含: 铸造、同步、查询功能

3. **主页面集成**
   - 文件: `/app/page.tsx` (修改)
   - 添加: claim提示和逻辑

4. **环境变量更新**
   - 文件: `.env.local.example` (修改)

5. **集成测试**
   - 文件: `/lib/__tests__/sbt-integration.test.ts`

#### 验收标准

- [ ] 合约交互函数正常工作
- [ ] mintSBT成功调用合约
- [ ] 交易成功后更新数据库
- [ ] 主页面正确显示claim提示
- [ ] 错误处理完善
- [ ] TypeScript类型正确
- [ ] 集成测试通过

#### 开发日志要求

```markdown
### 开发日志 - BNB合约集成

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**集成难点**:
1. Wagmi v2与v1差异较大
   - 解决：参考官方文档迁移

2. 交易收据解析
   - 需要从logs中提取tokenId
   - 使用event parsing

3. 异步状态管理
   - isPending, isConfirming状态
   - 正确处理loading状态

**测试验证**:
- [x] 本地测试网测试成功
- [x] BNB Testnet测试成功
- [x] Gas消耗合理
```

#### 存储位置
- **合约交互**: `/lib/contracts/sbt.ts`
- **SBT管理**: `/lib/sbt-manager.ts`
- **集成代码**: `/app/page.tsx` (修改)
- **测试代码**: `/lib/__tests__/sbt-integration.test.ts`
- **开发日志**: `/docs/development-logs/integration-bnb-contract.md`

---

### TASK-1-12: 项目配置和依赖

**负责人**: AI #6 (DevOps与集成工程师)
**工时**: 1天
**优先级**: P0

#### 任务目标
配置项目开发环境，安装所有必需的依赖，设置开发和构建脚本。

#### 详细要求

**1. 依赖安装**
```bash
# BNB Chain相关
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts

# 前端UI增强
npm install framer-motion
npm install react-hot-toast

# IPFS (可选)
npm install @pinata/sdk

# Solana相关 (Week 3开始使用，可提前安装)
npm install @solana/web3.js
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui
npm install @solana/wallet-adapter-wallets @solana/wallet-adapter-base
```

**2. package.json更新**
```json
{
  "name": "zhengdao",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "hardhat": "hardhat",
    "hardhat:test": "hardhat test",
    "hardhat:compile": "hardhat compile",
    "hardhat:deploy": "hardhat run scripts/deploy-bnb-sbt.ts --network bnbTestnet"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "15.0.0",
    // ... 现有依赖
    "framer-motion": "^11.0.0",
    "react-hot-toast": "^2.4.1",
    "@pinata/sdk": "^2.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "hardhat": "^2.19.0",
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "@openzeppelin/contracts": "^5.0.0",
    "@solana/web3.js": "^1.87.0",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@solana/wallet-adapter-react-ui": "^0.9.35",
    "@solana/wallet-adapter-wallets": "^0.19.32",
    "@solana/wallet-adapter-base": "^0.9.23",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "eslint": "^8.55.0",
    "eslint-config-next": "15.0.0",
    "prettier": "^3.1.0"
  }
}
```

**3. TypeScript配置**
```json
// tsconfig.json (更新)

{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    },
    // 新增：类型声明
    "typeRoots": ["./node_modules/@types", "./types"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**4. ESLint配置**
```javascript
// .eslintrc.js

module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    // 自定义规则
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

**5. Prettier配置**
```json
// .prettierrc

{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**6. Jest配置**
```javascript
// jest.config.js

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

**7. Hardhat配置**
```javascript
// hardhat.config.ts

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bnbTestnet: {
      url: process.env.BNB_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
    },
    hardhat: {
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: {
      bnbTestnet: process.env.BSCSCAN_API_KEY || '',
    },
  },
};

export default config;
```

**8. .gitignore更新**
```
# 添加到现有 .gitignore

# Hardhat
cache/
artifacts/
typechain-types/
typechain/

# Hardhat Ignition default folder for deployments against a local node
ignition/deployments/chain-31337/

# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.*.local

# IPFS
.ipfs/

# Test coverage
coverage/

# Build output
.next/
out/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**9. 目录结构创建**
```bash
# 创建必要的目录结构
mkdir -p contracts
mkdir - contracts/__tests__
mkdir - scripts
mkdir - programs/zhengdao-sbt/src
mkdir - programs/zhengdao-sbt/tests
mkdir - abis
mkdir - types
mkdir - lib/contracts
mkdir - lib/solana
mkdir - lib/hooks
mkdir - lib/__tests__
mkdir - components/achievement/__tests__
mkdir - components/achievement/__tests__
mkdir - public/sbt-images/level-{1..6}
mkdir - public/sbt-metadata
mkdir - docs/development-logs
mkdir - docs/design
mkdir - docs/deployment
mkdir - docs/api
```

**10. README更新**
```markdown
# 添加到 README.md

## 开发环境设置

### 前置要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖
```bash
npm install
```

### 环境变量配置
```bash
cp .env.local.example .env.local
# 编辑 .env.local 填写必要的API密钥
```

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 运行类型检查
npm run type-check

# 运行测试
npm test

# 运行测试覆盖率
npm run test:coverage

# 编译智能合约
npm run hardhat:compile

# 部署合约
npm run hardhat:deploy
```

### 代码规范
```bash
# Lint代码
npm run lint

# 格式化代码
npx prettier --write .
```
```

#### 交付成果

1. **package.json**
   - 更新所有依赖
   - 添加所有scripts

2. **配置文件**
   - tsconfig.json
   - .eslintrc.js
   - .prettierrc
   - jest.config.js
   - hardhat.config.ts

3. **.gitignore**
   - 添加所有忽略规则

4. **目录结构**
   - 创建所有必要目录

5. **README更新**
   - 添加开发环境设置说明

6. **依赖安装报告**
   - 文件: `/docs/dependencies-report.md`
   - 记录所有依赖版本和用途

#### 验收标准

- [ ] 所有依赖成功安装
- [ ] npm run dev 正常启动
- [ ] npm run build 成功构建
- [ ] npm run type-check 无错误
- [ ] npm run test 成功运行
- [ ] ESLint无错误
- [ ] Prettier正常工作
- [ ] Hardhat可以编译合约

#### 开发日志要求

```markdown
### 开发日志 - 项目配置和依赖

**配置时间**: YYYY-MM-DD
**完成进度**: 100%

**依赖版本记录**:
- hardhat: 2.19.0
- @openzeppelin/contracts: 5.0.0
- framer-motion: 11.0.0
- ...

**问题记录**:
1. 某个依赖冲突
   - 解决：升级到兼容版本

**环境验证**:
- [x] Node.js版本: 18.19.0
- [x] npm版本: 10.2.3
- [x] 操作系统: macOS/Linux
```

#### 存储位置
- **配置文件**: 各自的标准位置
- **依赖报告**: `/docs/dependencies-report.md`
- **开发日志**: `/docs/development-logs/setup-config.md`

---

## 阶段2: Solana SBT实现详细任务

### TASK-2-1: Solana SBT程序开发

**负责人**: AI #2 (Solana程序工程师)
**工时**: 3天
**优先级**: P0

#### 任务目标
使用Anchor框架开发Solana SBT程序，实现与BNB Chain相同的功能。

#### 详细要求

**1. 程序结构**
```rust
// 文件位置: /programs/zhengdao-sbt/src/lib.rs

use anchor_lang::prelude::*;

declare_id!("ZhengDAO SBT Program ID"); // 部署后填写

#[program]
pub mod zhengdao_sbt {
    use super::*;

    /// 初始化SBT程序
    pub fn initialize(
        ctx: Context<Initialize>,
        authority: Pubkey,
    ) -> Result<()> {
        let sbt_config = &mut ctx.accounts.sbt_config;
        sbt_config.authority = authority;
        sbt_config.bump = ctx.bumps.sbt_config;
        Ok(())
    }

    /// 铸造SBT
    pub fn mint_sbt(
        ctx: Context<MintSBT>,
        level: u8,
        days: u32,
        metadata_uri: String,
    ) -> Result<()> {
        let sbt = &mut ctx.accounts.sbt;
        let clock = Clock::get()?;

        // 验证level
        require!(level >= 1 && level <= 6, ErrorCode::InvalidLevel);

        // 设置SBT数据
        sbt.owner = ctx.accounts.owner.key();
        sbt.level = level;
        sbt.days = days;
        sbt.minted_at = clock.unix_timestamp;
        sbt.metadata_uri = metadata_uri;
        sbt.bump = ctx.bumps.sbt;

        // 发出事件
        emit!(SBTMintedEvent {
            owner: sbt.owner,
            level,
            timestamp: sbt.minted_at,
        });

        Ok(())
    }

    /// 更新SBT元数据（仅authority）
    pub fn update_metadata(
        ctx: Context<UpdateMetadata>,
        new_metadata_uri: String,
    ) -> Result<()> {
        let sbt = &mut ctx.accounts.sbt;
        sbt.metadata_uri = new_metadata_uri;
        Ok(())
    }
}

// === 指令上下文 ===

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + SbtConfig::SPACE,
        seeds = [b"sbt_config"],
        bump
    )]
    pub sbt_config: Account<'info, SbtConfig>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintSBT<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + Sbt::SPACE,
        seeds = [
            b"sbt",
            owner.key().as_ref(),
            &level.to_le_bytes()
        ],
        bump
    )]
    pub sbt: Account<'info, Sbt>,

    /// SBT所有者
    pub owner: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMetadata<'info> {
    #[account(
        mut,
        seeds = [
            b"sbt",
            sbt.owner.as_ref(),
            &sbt.level.to_le_bytes()
        ],
        bump = sbt.bump
    )]
    pub sbt: Account<'info, Sbt>,

    pub authority: Signer<'info>,
}

// === 数据结构 ===

#[account]
pub struct SbtConfig {
    pub authority: Pubkey,
    pub bump: u8,
}

impl SbtConfig {
    pub const SPACE: usize = 32 + 1; // authority + bump
}

#[account]
pub struct Sbt {
    pub owner: Pubkey,
    pub level: u8,
    pub days: u32,
    pub minted_at: i64,
    pub metadata_uri: String,
    pub bump: u8,
}

impl Sbt {
    pub const SPACE: usize = 32 + 1 + 4 + 8 + 4 + 256 + 1; // 字段总和
}

// === 事件 ===

#[event]
pub struct SBTMintedEvent {
    pub owner: Pubkey,
    pub level: u8,
    pub timestamp: i64,
}

// === 错误码 ===

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid level. Level must be between 1 and 6.")]
    InvalidLevel,
    #[msg("Not authorized to perform this action.")]
    Unauthorized,
}
```

**2. 元数据集成（Metaplex）**
```rust
// 文件位置: /programs/zhengdao-sbt/src/state/metadata.rs

use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct MintWithMetadata<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + Sbt::SPACE,
        seeds = [b"sbt", owner.key().as_ref(), &level.to_le_bytes()],
        bump
    )]
    pub sbt: Account<'info, Sbt>,

    /// Metaplex元数据账户
    /// CHECK: Metaplex will validate this
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,

    /// 元数据edition账户
    /// CHECK: Metaplex will validate this
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,

    /// Mint账户
    #[account(
        init,
        payer = payer,
        mint::decimals = 0,
        mint::authority = mint_authority,
        mint::freeze_authority = freeze_authority,
    )]
    pub mint: Account<'info, Mint>,

    /// Token账户（持有NFT）
    #[account(
        init,
        payer = payer,
        token::mint = mint,
        token::authority = owner,
        token::max_supply = Some(1), // SBT不可转移
    )]
    pub token_account: Account<'info, TokenAccount>,

    pub owner: Signer<'info>,

    /// Mint authority（程序派生）
    #[account(
        seeds = [b"mint_authority"],
        bump
    )]
    pub mint_authority: UncheckedAccount<'info>,

    /// Freeze authority（程序派生）
    #[account(
        seeds = [b"freeze_authority"],
        bump
    )]
    pub freeze_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}
```

**3. 测试文件**
```typescript
// 文件位置: /programs/zhengdao-sbt/tests/zhengdao-sbt.ts

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ZhengdaoSbt } from "../target/types/zhengdao_sbt";
import { assert } from "chai";

describe("zhengdao-sbt", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ZhengdaoSbt as Program<ZhengdaoSbt>;

  let sbtConfig: anchor.web3.Keypair;
  let owner: anchor.web3.Keypair;

  beforeEach(() => {
    sbtConfig = anchor.web3.Keypair.generate();
    owner = anchor.web3.Keypair.generate();
  });

  it("Initializes the SBT program", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        sbtConfig: sbtConfig.publicKey,
        payer: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Initialize transaction signature", tx);

    const config = await program.account.sbtConfig.fetch(sbtConfig.publicKey);
    assert.equal(config.authority.toBase58(), provider.wallet.publicKey.toBase58());
  });

  it("Mints a level 1 SBT", async () => {
    const level = 1;
    const days = 7;
    const metadataUri = "https://example.com/metadata/level-1.json";

    const [sbtPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("sbt"),
        owner.publicKey.toBuffer(),
        Buffer.from([level]),
      ],
      program.programId
    );

    const tx = await program.methods
      .mintSbt(level, days, metadataUri)
      .accounts({
        sbt: sbtPDA,
        owner: owner.publicKey,
        payer: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Mint SBT transaction signature", tx);

    const sbt = await program.account.sbt.fetch(sbtPDA);
    assert.equal(sbt.owner.toBase58(), owner.publicKey.toBase58());
    assert.equal(sbt.level, level);
    assert.equal(sbt.days, days);
  });

  it("Fails to mint invalid level", async () => {
    const level = 7; // Invalid: > 6

    try {
      await program.methods
        .mintSbt(level, 100, "https://example.com")
        .accounts({
          owner: owner.publicKey,
          payer: provider.wallet.publicKey,
        })
        .rpc();

      assert.fail("Should have thrown error");
    } catch (err) {
      assert.include(err.toString(), "InvalidLevel");
    }
  });
});
```

**4. Anchor配置**
```toml
# Anchor.toml

[toolchain]

[features]
seeds = false
skip-lint = false

[programs.localnet]
zhengdao_sbt = "ZhengDAO SBT Program ID"

[programs.devnet]
zhengdao_sbt = "ZhengDAO SBT Program ID"

[programs.mainnet]
zhengdao_sbt = "ZhengDAO SBT Program ID"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "Devnet"
wallet = "~/.config/solana/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

#### 交付成果

1. **Anchor程序**
   - 文件: `/programs/zhengdao-sbt/src/lib.rs`
   - 包含: 所有指令和数据结构

2. **测试文件**
   - 文件: `/programs/zhengdao-sbt/tests/zhengdao-sbt.ts`
   - 测试覆盖率 > 80%

3. **Anchor配置**
   - 文件: `/Anchor.toml`

4. **IDL文件**
   - 文件: `/target/idl/zhengdao_sbt.json` (编译后生成)

5. **类型定义**
   - 文件: `/target/types/zhengdao_sbt.ts` (编译后生成)

#### 验收标准

- [ ] 程序成功编译
- [ ] 所有测试通过
- [ ] IDL正确生成
- [ ] PDA地址计算正确
- [ ] 事件正确发出
- [ ] 错误处理完善

#### 开发日志要求

```markdown
### 开发日志 - Solana SBT程序

**开发时间**: YYYY-MM-DD
**完成进度**: 100%

**技术难点**:
1. PDA地址派生
   - 使用seeds组合生成唯一地址
   - 确保与前端计算一致

2. Metaplex集成
   - 元数据账户结构
   - CPI调用metaplex程序

3. 账户空间计算
   - 精确计算所需space
   - 避免浪费SOL

**测试结果**:
- [x] initialize: PASS
- [x] mint_sbt: PASS
- [x] update_metadata: PASS
- [x] 错误处理: PASS
```

#### 存储位置
- **程序代码**: `/programs/zhengdao-sbt/src/lib.rs`
- **测试代码**: `/programs/zhengdao-sbt/tests/zhengdao-sbt.ts`
- **配置文件**: `/Anchor.toml`
- **IDL**: `/target/idl/zhengdao_sbt.json`
- **开发日志**: `/docs/development-logs/solana-program.md`

---

[继续剩余18个任务...]

由于文档长度限制，我将创建第二部分文档继续剩余任务。

---

## 📝 统一开发日志要求

### 日志文件结构

每个任务必须维护自己的开发日志，文件位置统一为:
```
/docs/development-logs/[task-name].md
```

### 日志模板

```markdown
# [任务名称] - 开发日志

## 基本信息
- **负责人**: AI #X
- **开始时间**: YYYY-MM-DD
- **预计完成**: YYYY-MM-DD
- **实际完成**: YYYY-MM-DD
- **状态**: 进行中 / 已完成 / 阻塞

## 每日更新

### YYYY-MM-DD - 第N天

**今日计划**:
- [ ] 任务1
- [ ] 任务2

**完成情况**:
- [x] 任务1 - 完成
- [x] 任务2 - 完成 80%
- [ ] 任务3 - 未开始

**遇到的问题**:
1. 问题描述
   - 解决方案: ...
   - 耗时: X小时

**明日计划**:
- [ ] 继续任务2
- [ ] 开始任务3

**代码提交**:
- Commit hash: abc123
- Commit message: "feat: 添加XXX功能"

**参考文档**:
- 链接: ...
```

### 周报模板

```markdown
## 第N周工作总结 (YYYY-MM-DD ~ YYYY-MM-DD)

### 本周完成
- [x] 任务A - 100%
- [x] 任务B - 100%
- [ ] 任务C - 50%

### 下周计划
- [ ] 继续任务C
- [ ] 开始任务D

### 风险与阻塞
- **风险**: 描述
  - **应对措施**: ...

### 需要协助
- 需要谁协助什么
```

---

## 🧪 集成测试计划

### Week 2集成测试

**测试范围**: BNB Chain完整流程
**时间**: Week 2 第5天
**负责人**: AI #6 (DevOps)

```markdown
### 集成测试清单

#### 1. 打卡到晋升流程
- [ ] 用户打卡0天，显示Level 1
- [ ] 用户打卡7天，弹出"达到Level 1"通知
- [ ] 用户点击"领取SBT"
- [ ] ClaimSBTFlow正确显示
- [ ] 调用合约mint成功
- [ ] SBTGallery显示新SBT

#### 2. 数据持久化
- [ ] 刷新页面，等级不变
- [ ] 切换链再切换回来，数据保留
- [ ] IndexedDB数据正确

#### 3. 异常处理
- [ ] 合约调用失败，显示错误提示
- [ ] 网络错误，显示重试按钮
- [ ] 已claim的SBT不能再次claim
```

### Week 5集成测试

**测试范围**: 双链完整流程
**时间**: Week 5 第10天
**负责人**: AI #6 (DevOps)

```markdown
### 双链集成测试

#### 1. 链切换
- [ ] BNB → Solana，数据切换正确
- [ ] Solana → BNB，数据切换正确
- [ ] 两条链数据完全独立

#### 2. 双链并行
- [ ] BNB打卡，不影响Solana
- [ ] Solana打卡，不影响BNB
- [ ] 可以同时持有两条链的SBT

#### 3. 钱包连接
- [ ] BNB钱包连接正常
- [ ] Solana钱包连接正常
- [ ] 钱包切换UI正确
```

---

## ✅ 验收标准汇总

### 按角色验收

#### AI #1 - BNB Chain合约工程师
- [ ] 合约代码完成，编译通过
- [ ] 测试覆盖率 > 90%
- [ ] 合约成功部署到testnet
- [ ] 合约在BscScan验证
- [ ] mint函数正常工作
- [ ] transfer完全被禁用

#### AI #2 - Solana程序工程师
- [ ] Anchor程序完成
- [ ] 测试通过
- [ ] 程序部署到Devnet
- [ ] IDL生成正确
- [ ] mint指令正常
- [ ] 不可转移验证通过

#### AI #3 - 前端核心开发
- [ ] 成就系统逻辑完成
- [ ] 数据库扩展完成
- [ ] 双链管理器完成
- [ ] Solana钱包集成完成
- [ ] 单元测试 > 80%

#### AI #4 - UI组件开发
- [ ] LevelDisplay组件完成
- [ ] SBTGallery组件完成
- [ ] ClaimSBTFlow组件完成
- [ ] ChainSwitcher组件完成
- [ ] 所有组件适配双链

#### AI #5 - UI/UX设计师
- [ ] 6个等级SBT图像完成
- [ ] 元数据文件准备完成
- [ ] Coming Soon设计完成
- [ ] 水墨风格统一
- [ ] 文件命名规范

#### AI #6 - DevOps工程师
- [ ] 项目配置完成
- [ ] 依赖安装成功
- [ ] 集成测试通过
- [ ] 部署文档完成
- [ ] 性能优化完成

### 按功能验收

#### 功能完整性
- [ ] 用户可以在BNB Chain打卡
- [ ] 用户可以在Solana打卡
- [ ] 6个等级可以正常晋升
- [ ] 达到等级可以claim SBT
- [ ] SBT显示在展示墙
- [ ] 双链数据独立
- [ ] SBT不可转移

#### 性能指标
- [ ] 页面加载 < 3秒
- [ ] 打卡后等级更新 < 1秒
- [ ] SBT铸造 < 10秒
- [ ] 链切换 < 500ms
- [ ] 数据库查询 < 100ms

#### UI/UX
- [ ] 水墨风格统一
- [ ] 响应式适配
- [ ] 动画流畅
- [ ] 错误提示清晰
- [ ] 无控制台错误

---

## 📂 统一文件存储位置

### 代码文件
```
/
├── contracts/              # AI #1 - BNB合约
│   ├── ZhengDaoSBT.sol
│   └── ZhengDaoSBT.test.ts
├── programs/               # AI #2 - Solana程序
│   └── zhengdao-sbt/src/
│       └── lib.rs
├── lib/                    # AI #3 - 核心逻辑
│   ├── achievement-system.ts
│   ├── achievement-service.ts
│   ├── db-achievement.ts
│   ├── chain-manager.ts
│   └── solana/
│       └── sbt.ts
├── components/achievement/ # AI #4 - UI组件
│   ├── LevelDisplay.tsx
│   ├── SBTGallery.tsx
│   ├── ClaimSBTFlow.tsx
│   └── ChainSwitcher.tsx
├── public/                 # AI #5 - 静态资源
│   ├── sbt-images/
│   │   └── level-*/
│   └── sbt-metadata/
│       └── level-*.json
├── scripts/                # AI #6 - 工具脚本
│   ├── deploy-bnb-sbt.ts
│   └── validate-metadata.ts
└── docs/                   # 文档
    ├── development-logs/   # 开发日志
    ├── design/             # 设计文档
    └── deployment/         # 部署文档
```

### 文档文件
```
/docs/
├── development-logs/       # 每个任务的开发日志
│   ├── contract-bnb-sbt.md
│   ├── contract-bnb-test.md
│   ├── design-sbt.md
│   ├── achievement-core.md
│   └── ...
├── design/                 # 设计文档
│   └── sbt-design-spec.md
├── deployment/             # 部署文档
│   ├── deployment-bnb-sbt.md
│   └── deployment-solana-sbt.md
└── api/                    # API文档
    └── achievement-api.md
```

---

## 📊 进度跟踪要求

### 每日站会（虚拟）

每个AI每天结束时更新进度:

```markdown
## 今日进度汇报 - [任务名称]

**完成情况**: [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%

**今日产出**:
1. 代码文件: /path/to/file.ts (新增/修改)
2. 测试用例: X个
3. 文档更新: Y篇

**遇到阻塞**: 有/无
- 如果有: 详细描述

**明日计划**:
1. 继续XXX
2. 开始YYY
```

### 进度Dashboard

AI #6 (DevOps) 维护进度Dashboard:

```markdown
# 证道双链SBT - 开发进度Dashboard

更新时间: YYYY-MM-DD HH:MM

## 总体进度: XX%

### Week 1-2: BNB Chain SBT
- [ ] TASK-1-1: 合约开发 [████████░░] 80%
- [ ] TASK-1-2: 合约测试 [░░░░░░░░░░] 0%
- [ ] TASK-1-3: 合约部署 [░░░░░░░░░░] 0%
...

## 阻塞问题
1. 描述 - 负责人 - 预计解决时间

## 风险提示
1. 描述 - 影响 - 应对措施
```

---

## 🎯 最终交付清单

### 代码交付
- [ ] 所有源代码提交到Git
- [ ] 代码通过ESLint/Prettier检查
- [ ] TypeScript无错误
- [ ] 单元测试覆盖率 > 80%

### 文档交付
- [ ] 每个任务的开发日志完整
- [ ] API文档完整
- [ ] 部署文档完整
- [ ] 用户使用手册
- [ ] 开发者指南

### 部署交付
- [ ] BNB Chain合约地址公布
- [ ] Solana程序ID公布
- [ ] 前端部署到测试环境
- [ ] 环境变量配置说明

### 演示交付
- [ ] 演示视频脚本
- [ ] 演示视频录制
- [ ] 功能演示PPT

---

**文档版本**: v1.0
**最后更新**: 2026-01-27
**CTO**: Claude
**下次审查**: Week 2结束时
