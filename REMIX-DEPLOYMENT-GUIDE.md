# 使用 Remix IDE 部署 BSC 主网合约 - 完整指南

**方案**: 方案一 - Remix IDE 部署
**难度**: ⭐ 简单（无需命令行）
**预计时间**: 10-15 分钟

---

## 📋 部署前准备清单

### ✅ 必需物品

- [ ] MetaMask 钱包（已安装）
- [ ] 至少 **0.1 BNB** 的 Gas 费（实际约需 0.01 BNB）
- [ ] 稳定的网络连接
- [ ] 本指南（打开在浏览器中）

### ✅ 检查 MetaMask 配置

1. **打开 MetaMask**
2. **检查网络**: 必须切换到 **BNB Chain（主网）**
   - 网络名称: BNB Chain
   - RPC URL: https://bsc-dataseed.binance.org/
   - Chain ID: `56`
   - 货币符号: BNB

3. **检查余额**: 确保至少有 **0.1 BNB**

---

## 🚀 详细部署步骤

### 第一步：打开 Remix IDE

1. 访问：**https://remix.ethereum.org/**
2. 看到以下界面：
   - 左侧：文件浏览器
   - 中间：代码编辑器
   - 底部：终端和控制台

---

### 第二步：创建合约文件

1. **点击左侧 "file explorers" 图标**（最上面的图标）

2. **创建新文件夹**（可选，但推荐）:
   - 点击 "Create New Folder"
   - 命名为：`contracts`

3. **创建合约文件**:
   - 点击 "Create New File" 图标
   - 命名为：`ZhengDaoSBT.sol`
   - 确保后缀是 `.sol`

4. **复制合约代码**:
   - 见下方 **"完整合约代码"** 部分
   - 复制全部代码
   - 粘贴到 Remix 编辑器中
   - 按 `Ctrl+S` (或 `Cmd+S`) 保存文件

---

### 第三步：编译合约

1. **点击左侧 "Solidity Compiler" 图标**（第二个图标，Solidity logo）

2. **配置编译选项**:
   - **Compiler**: 选择 `0.8.20`（重要！）
   - **Enable optimization**: 勾选
   - **Runs**: `200`
   - **EVM Version**: `default`

3. **点击 "Compile ZhengDaoSBT.sol" 按钮**

4. **等待编译完成**:
   - ✅ 绿色勾 = 成功
   - ❌ 红色叉 = 有错误（检查代码是否完整）

5. **编译成功后会显示**:
   - 编译器版本
   - 优化设置
   - 字节码大小

---

### 第四步：连接 MetaMask

1. **点击左侧 "Deploy & Run Transactions" 图标**（第三个图标，Ethereum logo）

2. **配置环境**:
   - **Environment**: 选择 `Injected Provider - MetaMask`
   - 如果 MetaMask 正确连接，会显示：
     - 账户地址
     - BNB 余额
     - 网络名称（应该是 BNB Chain）

3. **如果 MetaMask 弹出**:
   - 点击 "连接"
   - 选择账户
   - 点击 "下一步"
   - 点击 "连接"

---

### 第五步：部署合约到 BSC 主网

1. **确认配置**:
   - **Contract**: 选择 `ZhengDaoSBT`（下拉菜单）
   - **At Address**: 留空（我们部署新合约）

2. **输入构造函数参数**（重要！）:

   点击 **"Deploy"** 按钮下方的参数输入框，依次输入三个参数（用逗号或空格分隔）:

   ```
   ZhengDao Soulbound Token,
   ZDSBT,
   https://your-domain.com/api/sbt-metadata/
   ```

   **或者**，点击下拉箭头，分别输入：
   - `string`: `ZhengDao Soulbound Token`
   - `string`: `ZDSBT`
   - `string`: `https://your-domain.com/api/sbt-metadata/`

3. **点击 "Deploy" 按钮**

4. **MetaMask 会弹出交易确认**:
   - 检查参数：
     - Gas 费用：约 0.01 BNB（实际可能更低）
     - To: `0x0000000000000000000000000000000000000000` (新合约)
     - Value: `0 ETH`
   - 点击 **"确认"** 按钮

5. **等待交易确认**:
   - Remix 底部终端会显示 "Sending transaction..."
   - 等待约 10-30 秒
   - MetaMask 会显示 "交易已确认"

---

### 第六步：记录合约地址

1. **部署成功后**，Remix 左下角会显示：

   ```
   📝 Deployment successful
   📍 Contract address: 0x...
   ```

2. **复制合约地址**:
   - 在 "Deployed Contracts" 下会看到列表
   - 点击小箭头展开
   - 复制显示的地址（`0x` 开头的 42 位字符）

3. **验证合约**:
   - 访问：https://bscscan.com/address/YOUR_CONTRACT_ADDRESS
   - 替换 `YOUR_CONTRACT_ADDRESS` 为你的合约地址
   - 应该能看到：
     - ✅ Contract Creation
     - ✅ 5 个 Transactions（部署 + 4 个事件）
     - ✅ Creator 地址

---

## 📝 部署后立即执行的操作

### 1. **复制并保存合约地址**

```
主网合约地址: 0x...
（请立即复制并保存到安全的地方）
```

### 2. **通知 AI #2**

发送以下信息：

```
✅ TASK-MAINNET-01 已完成，主网合约地址：0x...

部署信息：
- 合约地址: 0x...
- 网络: BSC Mainnet (Chain ID: 56)
- 部署工具: Remix IDE
- 部署时间: 2026-01-29

请立即更新前端配置！
```

### 3. **更新项目配置**（AI #2 会执行）

在 `.env.local` 中更新：
```bash
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=0x...（你的主网地址）
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_BNB_CHAIN_TESTNET=false
```

---

## 🎯 合约代码

### **完整合约代码（已准备好用于 Remix）**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ZhengDaoSBT - 证道成就系统 Soulbound Token
 * @notice 符合ERC-721标准的SBT，完全禁止转移
 * @dev 6个等级的成就SBT，链上存储元数据
 */
contract ZhengDaoSBT is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    // ==================== 状态变量 ====================

    // Token计数器
    uint256 private _tokenIdCounter;

    // Token元数据存储
    mapping(uint256 => uint256) public tokenLevel;  // tokenId => level (1-6)
    mapping(uint256 => uint256) public tokenCheckInDays;   // tokenId => check-in days
    mapping(uint256 => uint256) public tokenDate;   // tokenId => mint timestamp

    // 用户拥有的所有SBT
    mapping(address => uint256[]) public userTokens;

    // 用户是否已拥有某等级的SBT（防止重复铸造）
    mapping(address => mapping(uint256 => bool)) public userHasLevel;

    // 基础URI
    string private _baseTokenURI;

    // ==================== 事件 ====================

    event SBTMinted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 level,
        uint256 checkInDays,
        uint256 timestamp
    );

    // ==================== 错误定义 ====================

    error InvalidLevel();
    error InvalidDays();
    error TokenAlreadyExists();
    error TokenDoesNotExist();
    error SoulboundTokenTransferNotAllowed();

    // ==================== 修饰符 ====================

    /**
     * @dev 检查等级是否有效
     */
    modifier validLevel(uint256 level) {
        if (level < 1 || level > 6) {
            revert InvalidLevel();
        }
        _;
    }

    /**
     * @dev 检查天数是否有效
     */
    modifier validCheckInDays(uint256 checkInDays) {
        if (checkInDays == 0) {
            revert InvalidDays();
        }
        _;
    }

    /**
     * @dev 检查token是否存在
     */
    modifier tokenExists(uint256 tokenId) {
        if (_ownerOf(tokenId) == address(0)) {
            revert TokenDoesNotExist();
        }
        _;
    }

    // ==================== 构造函数 ====================

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
        _tokenIdCounter = 1; // 从1开始计数
    }

    // ==================== 核心功能 ====================

    /**
     * @notice 铸造SBT（仅合约owner）
     * @dev 为指定地址铸造指定等级的SBT
     * @param to 接收地址
     * @param level 等级（1-6）
     * @param checkInDays 打卡天数
     * @param uri 元数据URI（可选，如果为空则使用默认URI）
     */
    function mintSBT(
        address to,
        uint256 level,
        uint256 checkInDays,
        string memory uri
    ) external onlyOwner validLevel(level) validCheckInDays(checkInDays) returns (uint256) {
        // 检查用户是否已有该等级的SBT
        if (userHasLevel[to][level]) {
            revert TokenAlreadyExists();
        }

        // 铸造新token
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        // 铸造ERC721 token
        _safeMint(to, tokenId);

        // 存储元数据
        tokenLevel[tokenId] = level;
        tokenCheckInDays[tokenId] = checkInDays;
        tokenDate[tokenId] = block.timestamp;

        // 记录用户拥有该等级
        userHasLevel[to][level] = true;

        // 添加到用户的SBT列表
        userTokens[to].push(tokenId);

        // 设置token URI
        if (bytes(uri).length > 0) {
            _setTokenURI(tokenId, uri);
        } else {
            // 使用默认URI: baseURI/{level}.json
            _setTokenURI(tokenId, string(abi.encodePacked(_baseTokenURI, level.toString(), ".json")));
        }

        emit SBTMinted(to, tokenId, level, checkInDays, block.timestamp);

        return tokenId;
    }

    /**
     * @notice 获取用户的SBT数量
     * @param owner 用户地址
     * @return SBT数量
     */
    function getUserSBTCount(address owner) external view returns (uint256) {
        return userTokens[owner].length;
    }

    /**
     * @notice 获取用户指定等级的SBT是否存在
     * @param owner 用户地址
     * @param level 等级
     * @return 是否存在
     */
    function hasLevelSBT(address owner, uint256 level) external view returns (bool) {
        return userHasLevel[level];
    }

    /**
     * @notice 获取Token等级
     * @param tokenId Token ID
     * @return 等级
     */
    function getTokenLevel(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenLevel[tokenId];
    }

    /**
     * @notice 获取Token打卡天数
     * @param tokenId Token ID
     * @return 打卡天数
     */
    function getTokenCheckInDays(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenCheckInDays[tokenId];
    }

    /**
     * @notice 获取Token铸造日期
     * @param tokenId Token ID
     * @return 时间戳
     */
    function getTokenDate(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenDate[tokenId];
    }

    // ==================== 禁止转移 ====================

    /**
     * @dev 禁止SBT转移
     */
    function _update(address to, uint256 tokenId, address auth) internal override {
        revert SoulboundTokenTransferNotAllowed();
    }

    /**
     * @dev 禁止SBT转移
     */
    function _approve(address to, uint256 tokenId, address auth) internal override {
        revert SoulboundTokenTransferNotAllowed();
    }

    /**
     * @dev 禁止SBT转移
     */
    function setApprovalForAll(address operator, bool approved) public override {
        revert SoulboundTokenTransferNotAllowed();
    }

    // ==================== 管理员功能 ====================

    /**
     * @notice 更新基础URI（仅Owner）
     * @param baseTokenURI 新的基础URI
     */
    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    // ==================== Required Overrides ====================

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        tokenExists(tokenId)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

---

## 🔧 部署参数快速参考

### **构造函数参数（按顺序）**

```
1. name (string):
   "ZhengDao Soulbound Token"

2. symbol (string):
   "ZDSBT"

3. baseTokenURI (string):
   "https://your-domain.com/api/sbt-metadata/"
```

---

## ✅ 部署成功验证清单

部署完成后，请确认：

- [ ] Remix 显示 "Deployment successful"
- [ ] 复制了合约地址（`0x` 开头的 42 位字符）
- [ ] 在 BscScan 上能看到合约: `https://bscscan.com/address/YOUR_ADDRESS`
- [ ] BscScan 显示 "Contract Creator: 0x..."
- [ ] BscScan 显示 "5 Transactions"

---

## 🆘 常见问题排查

### 问题 1: MetaMask 无法连接

**解决**:
- 检查 MetaMask 是否解锁
- 检查是否在 BSC 主网（Chain ID: 56）
- 刷新页面重试

### 问题 2: Gas 费过高

**解决**:
- 正常范围：0.005 - 0.02 BNB
- 如果超过 0.1 BNB，检查 Gas Price 设置
- 可以在 MetaMask 中手动调整 Gas Price

### 问题 3: 编译失败

**解决**:
- 确保选择 Solidity 0.8.20
- 检查代码是否完整复制
- 检查是否有语法错误（红色下划线）

### 问题 4: 部署失败

**解决**:
- 检查账户余额是否足够
- 检查网络是否正确（BSC 主网）
- 查看 Remix 终端的错误信息

---

## 📞 需要帮助？

如果遇到问题，请提供：
1. 截图（Remix 错误或 MetaMask 界面）
2. 具体步骤描述
3. 错误信息文本

---

**准备开始了吗？祝您部署顺利！** 🚀

**部署成功后，请立即将合约地址告知 AI #2！**
