# 证道 - 快速参考清单

<div align="center">

# ⚡ 快速参考

**最常用的信息和命令**

</div>

---

## 🎯 核心信息

### 产品定位
```
一句话：首个 AI 复盘挖矿 DApp
Slogan：每天 3 分钟，让成长变现
标语：修身 · 齐家 · 证道
```

### 品牌色彩
```css
--logo-black: #000000    /* 墨黑 */
--logo-red: #D43628      /* 朱砂红 */
--bg-paper: #FFFEF2      /* 纸白 */
```

### Logo 文件
```
public/logo.svg          主 Logo
public/logo-512.png      PWA 图标
public/logo-192.png      PWA 图标
public/logo-32.png       Favicon
```

---

## 🌐 测试网信息

### BNB Chain Testnet
```
Chain ID: 97
RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
浏览器: https://testnet.bscscan.com
水龙头: https://testnet.bnbchain.org/faucet-smart
```

### 获取测试币
```bash
# 访问水龙头
https://testnet.bnbchain.org/faucet-smart

# 每次获取: 0.5-1 tBNB
# 间隔: 24 小时
```

---

## 💻 常用命令

### 开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 启动生产服务器
npm start
```

### 合约
```bash
# 编译合约
forge build

# 测试合约
forge test

# 部署到测试网
forge create --rpc-url https://data-seed-prebsc-1-s1.binance.org:8545/ \
  --private-key YOUR_PRIVATE_KEY \
  contracts/ZhengDao.sol:ZhengDao

# 验证合约
forge verify-contract \
  --chain-id 97 \
  CONTRACT_ADDRESS \
  contracts/ZhengDao.sol:ZhengDao
```

### Git
```bash
# 提交格式
git commit -m "feat(scope): description"
git commit -m "fix(scope): description"
git commit -m "docs(scope): description"
```

---

## 📁 文件位置

### 核心文档
```
README.md                      项目总览
PROJECT_NOTES.md               补充说明 ⭐
IMPLEMENTATION_ROADMAP.md      实施路线图
FEATURE_MAPPING.md             功能对照表
```

### 设计文档
```
VERSION_COMPARISON.md          版本对比
V3_REFLECTION_DESIGN.md        V3 设计
TOKENOMICS_DESIGN.md           经济模型
LOGO_USAGE_GUIDE.md            Logo 指南
```

### 代码
```
app/                           Next.js 应用
components/                    UI 组件
contracts/                     智能合约
lib/                          工具函数
public/                       静态资源
```

---

## 🚀 实施进度

### Phase 1: MVP (4 周)
```
Week 1: 立心 + 省身
Week 2: 入世
Week 3: 证道
Week 4: 测试 + Demo
```

### Phase 2: 完整功能 (4 周)
```
Week 5-6: 省身完整版
Week 7-8: 挖矿 V2.0
```

### Phase 3: 优化迭代 (4 周)
```
Week 9-10: 用户体验
Week 11-12: 高级功能
```

---

## ✅ 本周任务

```
□ 保存 Logo 文件
□ 更新 manifest.json
□ 配置测试网
□ 开始 Week 1 开发
```

---

## 📞 快速链接

```
文档: ./README.md
路线图: ./IMPLEMENTATION_ROADMAP.md
Logo: ./LOGO_USAGE_GUIDE.md
补充: ./PROJECT_NOTES.md
```

---

<div align="center">

**修身 · 齐家 · 证道**

</div>
