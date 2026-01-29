# 🚀 Remix IDE 部署 - 快速开始指南

**方案一：使用 Remix IDE（最简单）**
**预计时间**: 10-15 分钟

---

## ⚡ 5 个快速步骤

### 1️⃣ 打开 Remix
访问：**https://remix.ethereum.org/**

### 2️⃣ 创建合约文件
- 点击左侧 **"Create New File"** 图标
- 命名：`ZhengDaoSBT.sol`

### 3️⃣ 复制粘贴代码
- 点击下方 **"复制完整代码"** 按钮
- 在 Remix 中按 `Ctrl+V` 粘贴
- 按 `Ctrl+S` 保存

### 4️⃣ 编译
- 点击 **"Solidity Compiler"** 图标（第二个）
- 选择版本：`0.8.20`
- 点击 **"Compile ZhengDaoSBT.sol"**

### 5️⃣ 部署
- 点击 **"Deploy & Run Transactions"** 图标（第三个）
- Environment: 选择 `Injected Provider - MetaMask`
- 确认 MetaMask 连接到 **BNB Chain 主网**
- 点击 **"Deploy"**

**MetaMask 会弹出交易确认** → 点击 **"确认"** → 等待 30 秒 → **完成！**

---

## 📝 完整合约代码（点击复制）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ZhengDaoSBT is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _tokenIdCounter;
    mapping(uint256 => uint256) public tokenLevel;
    mapping(uint256 => uint256) public tokenCheckInDays;
    mapping(uint256 => uint256) public tokenDate;
    mapping(address => uint256[]) public userTokens;
    mapping(address => mapping(uint256 => bool)) public userHasLevel;
    string private _baseTokenURI;

    event SBTMinted(address indexed to, uint256 indexed tokenId, uint256 level, uint256 checkInDays, uint256 timestamp);

    error InvalidLevel();
    error InvalidDays();
    error TokenAlreadyExists();
    error TokenDoesNotExist();
    error SoulboundTokenTransferNotAllowed();

    modifier validLevel(uint256 level) {
        if (level < 1 || level > 6) revert InvalidLevel();
        _;
    }

    modifier validCheckInDays(uint256 checkInDays) {
        if (checkInDays == 0) revert InvalidDays();
        _;
    }

    modifier tokenExists(uint256 tokenId) {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        _;
    }

    constructor(string memory name, string memory symbol, string memory baseTokenURI)
        ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
        _tokenIdCounter = 1;
    }

    function mintSBT(address to, uint256 level, uint256 checkInDays, string memory uri)
        external onlyOwner validLevel(level) validCheckInDays(checkInDays) returns (uint256) {
        if (userHasLevel[to][level]) revert TokenAlreadyExists();

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(to, tokenId);
        tokenLevel[tokenId] = level;
        tokenCheckInDays[tokenId] = checkInDays;
        tokenDate[tokenId] = block.timestamp;
        userHasLevel[to][level] = true;
        userTokens[to].push(tokenId);

        if (bytes(uri).length > 0) {
            _setTokenURI(tokenId, uri);
        } else {
            _setTokenURI(tokenId, string(abi.encodePacked(_baseTokenURI, level.toString(), ".json")));
        }

        emit SBTMinted(to, tokenId, level, checkInDays, block.timestamp);
        return tokenId;
    }

    function getUserSBTCount(address owner) external view returns (uint256) {
        return userTokens[owner].length;
    }

    function hasLevelSBT(address owner, uint256 level) external view returns (bool) {
        return userHasLevel[owner][level];
    }

    function getTokenLevel(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenLevel[tokenId];
    }

    function getTokenCheckInDays(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenCheckInDays[tokenId];
    }

    function getTokenDate(uint256 tokenId) external view tokenExists(tokenId) returns (uint256) {
        return tokenDate[tokenId];
    }

    function _update(address to, uint256 tokenId, address auth) internal override {
        revert SoulboundTokenTransferNotAllowed();
    }

    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
```

---

## 🔑 部署参数

在 Remix 中点击 "Deploy" 时，输入以下三个参数（用逗号或空格分隔）：

```
ZhengDao Soulbound Token, ZDSBT, https://your-domain.com/api/sbt-metadata/
```

或者逐个输入：
- `string`: `ZhengDao Soulbound Token`
- `string`: `ZDSBT`
- `string`: `https://your-domain.com/api/sbt-metadata/`

---

## ✅ 部署成功后

1. **Remix 会显示**：`📝 Deployment successful`
2. **复制合约地址**：在 "Deployed Contracts" 下找到地址（`0x` 开头）
3. **验证合约**：访问 `https://bscscan.com/address/YOUR_ADDRESS`

---

## 📞 立即通知

部署成功后，**立即复制合约地址**并发送：

```
✅ TASK-MAINNET-01 已完成，主网合约地址：0x...
```

**AI #2 会立即更新前端配置！** 🚀
