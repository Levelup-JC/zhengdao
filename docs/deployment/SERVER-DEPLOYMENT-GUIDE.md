# 证道 - 服务器部署与体验测试完整指南

**版本**: v1.0
**最后更新**: 2026-01-28
**预计部署时间**: 30-45分钟
**预计测试时间**: 1小时

---

## 📋 目录

1. [部署前准备](#部署前准备)
2. [本地开发环境部署](#本地开发环境部署)
3. [生产服务器部署](#生产服务器部署)
4. [部署验证清单](#部署验证清单)
5. [体验测试指南](#体验测试指南)
6. [常见问题排查](#常见问题排查)
7. [性能监控](#性能监控)

---

## 🚀 部署前准备

### 环境要求

```yaml
服务器配置:
  CPU: 2核以上
  内存: 4GB以上
  磁盘: 20GB以上
  操作系统: Ubuntu 20.04+ / macOS 12+

软件要求:
  Node.js: >=18.0.0 (推荐 20.x)
  npm: >=9.0.0
  Git: >=2.30.0
  PM2: 全局安装 (用于进程管理)
```

### 检查清单

```bash
# 1. 检查 Node.js 版本
node --version  # 应该 >= 18.0.0

# 2. 检查 npm 版本
npm --version   # 应该 >= 9.0.0

# 3. 检查 Git
git --version

# 4. 安装 PM2 (生产环境)
npm install -g pm2
```

---

## 💻 本地开发环境部署

### 步骤 1: 克隆项目

```bash
cd /path/to/your/workspace
git clone <repository-url>
cd "黑客松项目-证道 2"
```

### 步骤 2: 安装依赖

```bash
# 方式 1: 标准安装
npm install

# 方式 2: 如果遇到依赖冲突
npm install --legacy-peer-deps
```

### 步骤 3: 配置环境变量

```bash
# 复制环境变量模板
cp .env.local.example .env.local

# 编辑环境变量
nano .env.local
```

**最小化配置（本地开发）**:

```bash
# BNB Chain 配置
PRIVATE_KEY=your_testnet_private_key
BNB_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
BNB_MAINNET_RPC_URL=https://bsc-dataseed.binance.org/
BSCSCAN_API_KEY=your_bscscan_api_key

# 合约地址 (部署后填写)
NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=

# DeepSeek AI (可选，用于AI复盘)
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com

# IPFS (可选)
NEXT_PUBLIC_USE_IPFS=false
```

### 步骤 4: 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
# 或者 http://localhost:3005 (如果配置了)
```

### 步骤 5: 验证本地部署

打开浏览器访问 `http://localhost:3000`，检查：

- [ ] 首页正常加载
- [ ] 水墨风格显示正常
- [ ] 控制台无错误
- [ ] 可以连接钱包

---

## 🌐 生产服务器部署

### 方案 1: Vercel 部署 (推荐，最简单)

#### 优点
- ✅ 零配置，自动部署
- ✅ 全球 CDN 加速
- ✅ 免费 SSL 证书
- ✅ 自动 CI/CD

#### 步骤

1. **连接 GitHub 仓库**
   ```
   访问 https://vercel.com
   → 点击 "New Project"
   → 导入 GitHub 仓库
   ```

2. **配置项目**
   ```bash
   # Framework Preset: Next.js
   # Build Command: npm run build
   # Output Directory: .next
   # Install Command: npm install
   ```

3. **配置环境变量**
   ```
   在 Vercel Dashboard 中添加：
   Settings → Environment Variables

   必需变量:
   - NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS
   - DEEPSEEK_API_KEY
   - NEXT_PUBLIC_USE_IPFS
   ```

4. **部署**
   ```
   点击 "Deploy"
   等待 2-3 分钟
   获取域名: https://your-project.vercel.app
   ```

5. **自定义域名 (可选)**
   ```
   Settings → Domains
   添加你的域名: zhengdao.com
   配置 DNS 记录
   ```

---

### 方案 2: VPS 部署 (灵活，可控)

#### 服务器选择

推荐云服务商：
- **阿里云**: https://www.aliyun.com
- **腾讯云**: https://cloud.tencent.com
- **DigitalOcean**: https://www.digitalocean.com
- **Vultr**: https://www.vultr.com

**最低配置**: 2核CPU, 2GB内存, 20GB SSD

#### 步骤 1: 服务器初始化

```bash
# 连接到服务器
ssh root@your-server-ip

# 更新系统
apt update && apt upgrade -y

# 安装 Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 安装 PM2
npm install -g pm2

# 安装 Nginx
apt install -y nginx

# 安装 Git
apt install -y git
```

#### 步骤 2: 部署应用

```bash
# 克隆项目
cd /var/www
git clone <repository-url> zhengdao
cd zhengdao

# 安装依赖
npm install

# 构建项目
npm run build

# 启动应用 (使用 PM2)
pm2 start npm --name "zhengdao" -- start

# 保存 PM2 进程列表
pm2 save

# 设置开机自启
pm2 startup
```

#### 步骤 3: 配置 Nginx 反向代理

```bash
# 编辑 Nginx 配置
nano /etc/nginx/sites-available/zhengdao
```

**Nginx 配置文件**:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL 证书配置 (使用 Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # 反向代理到 Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_proxied any;
    gzip_comp_level 4;
    gzip_types text/css application/javascript image/svg+xml;
}
```

```bash
# 启用站点
ln -s /etc/nginx/sites-available/zhengdao /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx
```

#### 步骤 4: 配置 SSL 证书 (Let's Encrypt)

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

#### 步骤 5: 配置防火墙

```bash
# 允许 SSH
ufw allow 22/tcp

# 允许 HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# 启用防火墙
ufw enable

# 查看状态
ufw status
```

---

### 方案 3: Docker 部署 (推荐，可移植)

#### 创建 Dockerfile

在项目根目录创建 `Dockerfile`:

```dockerfile
# 官方 Node.js 镜像
FROM node:20-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 生产镜像
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  zhengdao:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS=${NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS}
      - DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - zhengdao
    restart: unless-stopped
```

#### 部署命令

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 更新部署
docker-compose down
docker pull your-registry/zhengdao:latest
docker-compose up -d
```

---

## ✅ 部署验证清单

### 基础功能检查

```yaml
服务器检查:
  - [ ] 服务正常运行 (pm2 status 或 docker ps)
  - [ ] 端口 3000 可访问
  - [ ] 日志无错误 (pm2 logs 或 docker logs)

前端检查:
  - [ ] 首页加载正常
  - [ ] 所有页面路由正常
  - [ ] 水墨风格显示正确
  - [ ] 响应式设计正常 (手机/平板/桌面)
  - [ ] 浏览器控制台无错误

Web3 功能:
  - [ ] 钱包连接正常 (MetaMask/Phantom)
  - [ ] 链切换正常 (BNB/Solana)
  - [ ] 合约调用正常
  - [ ] 交易签名正常

数据持久化:
  - [ ] IndexedDB 正常工作
  - [ ] 刷新页面数据保留
  - [ ] 切换链后数据正确
```

### 性能检查

```bash
# 使用 Lighthouse 检查性能
npm install -g lighthouse

# 检查首页性能
lighthouse https://your-domain.com --view

# 目标分数:
# Performance: >90
# Accessibility: >95
# Best Practices: >90
# SEO: >85
```

---

## 🧪 体验测试指南

### 测试环境准备

#### 测试钱包准备

```yaml
BNB Chain 测试网:
  网络: BNB Chain Testnet
  RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
  钱包: MetaMask
  水龙头: https://testnet.bnbchain.org/faucet-smart
  测试币需求: 0.1 tBNB

Solana 测试网:
  网络: Solana Devnet
  RPC: https://api.devnet.solana.com
  钱包: Phantom
  水龙头: https://faucet.solana.com/
  测试币需求: 1 SOL
```

#### 测试数据准备

```bash
# 生成测试数据脚本 (可选)
curl -X POST http://localhost:3000/api/demo/generate \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_WALLET_ADDRESS",
    "days": 30,
    "meaningfulDays": 26
  }'
```

---

### 测试场景 1: 新用户完整流程

#### 目的：验证新用户从注册到首次打卡的完整体验

**时间**: 10分钟

**步骤**:

1. **访问首页** (1分钟)
   ```yaml
   测试项:
     - [ ] 首页加载速度 <3秒
     - [ ] 水墨风格显示正常
     - [ ] Logo 清晰可见
     - [ ] 连接钱包按钮醒目
     - [ ] 页面无错位/闪烁
   ```

2. **连接钱包** (2分钟)
   ```yaml
   测试项:
     - [ ] 点击"连接钱包"按钮
     - [ ] MetaMask 弹窗正常
     - [ ] 授权成功后显示钱包地址
     - [ ] 自动切换到 BNB Testnet (提示切换)
     - [ ] 显示钱包余额
   ```

3. **人生规划问卷** (3分钟)
   ```yaml
   测试项:
     - [ ] 首次访问自动跳转到问卷页
     - [ ] 6步问卷流程顺畅
     - [ ] 每个步骤都有动画过渡
     - [ ] 可以点击"上一步"返回
     - [ ] 完成后自动跳转回首页
     - [ ] 数据保存到 IndexedDB
   ```

4. **首次打卡** (4分钟)
   ```yaml
   测试项:
     - [ ] 点击"立即打卡"按钮
     - [ ] 显示核心问题 (今天有意义吗?)
     - [ ] 选择"Yes"
     - [ ] 文本输入框正常
     - [ ] 输入测试文本 (50-100字)
     - [ ] 点击"提交"
     - [ ] AI 处理中状态显示 (3-5秒)
     - [ ] AI 整理结果显示:
         - 收获 (Gains)
         - 损失 (Losses)
         - 想法 (Ideas)
         - 情绪 (Emotion)
         - 关键词 (Keywords)
     - [ ] 点击"确认保存"
     - [ ] 保存成功提示
     - [ ] 打卡记录显示在首页
   ```

**预期结果**: 新用户能够顺利完成整个流程，无需帮助文档

---

### 测试场景 2: 成就系统与 SBT 铸造

#### 目的：验证打卡累积和 SBT 铸造流程

**前置条件**: 用户已打卡 7 天

**步骤**:

1. **查看成就进度**
   ```yaml
   测试项:
     - [ ] 首页显示当前等级
     - [ ] 进度条显示 (例如: 5/7 天)
     - [ ] 距离下一等级天数显示
     - [ ] 水墨风格进度条
   ```

2. **达到晋升标准**
   ```yaml
   测试项:
     - [ ] 打卡第 7 天后，弹出晋升通知
     - [ ] 通知动画流畅
     - [ ] 显示达到的等级 (Level 1: 见素)
     - [ ] 显示"领取 SBT"按钮
   ```

3. **铸造 SBT**
   ```yaml
   测试项:
     - [ ] 点击"领取 SBT"
     - [ ] 显示 SBT 预览
     - [ ] 点击"确认铸造"
     - [ ] MetaMask 签名交易弹窗
     - [ ] 交易提交成功
     - [ ] 等待交易确认 (10-30秒)
     - [ ] 铸造成功提示
     - [ ] SBT 显示在个人主页
   ```

4. **SBT 属性验证**
   ```yaml
   测试项:
     - [ ] SBT 名称正确 (ZhengDao Soulbound Token)
     - [ ] SBT 符号正确 (ZDSBT)
     - [ ] Token ID 唯一
     - [ ] 元数据 URI 正确
     - [ ] SBT 无法转移 (尝试转移失败)
   ```

**预期结果**: 用户能够顺利领取 SBT，SBT 属性正确

---

### 测试场景 3: 双链切换测试

#### 目的：验证 BNB Chain 和 Solana 的数据隔离

**步骤**:

1. **BNB Chain 打卡**
   ```yaml
   测试项:
     - [ ] 切换到 BNB Chain
     - [ ] 连接 MetaMask
     - [ ] 查看打卡数据 (假设有 7 天)
     - [ ] 查看等级 (Level 1)
   ```

2. **切换到 Solana**
   ```yaml
   测试项:
     - [ ] 点击链切换按钮
     - [ ] 选择 Solana
     - [ ] 连接 Phantom 钱包
     - [ ] 查看 Solana 打卡数据 (应该为 0 或独立数据)
     - [ ] BNB 数据不会显示
   ```

3. **Solana 打卡**
   ```yaml
   测试项:
     - [ ] 在 Solana 打卡 1 次
     - [ ] 数据显示正确
     - [ ] 切换回 BNB，数据独立
   ```

4. **同时持有双链 SBT**
   ```yaml
   测试项:
     - [ ] BNB: 持有 SBT (Level 1)
     - [ ] Solana: 持有 SBT (Level 1)
     - [ ] SBT Gallery 显示两条链的 SBT
     - [ ] SBT 预览显示不同链标识
   ```

**预期结果**: 两条链数据完全独立，互不干扰

---

### 测试场景 4: 数据持久化测试

#### 目的：验证数据在各种情况下的持久性

**步骤**:

1. **刷新页面**
   ```yaml
   测试项:
     - [ ] 打卡 1 次
     - [ ] 刷新页面 (F5)
     - [ ] 打卡记录保留
     - [ ] 等级保留
     - [ ] 人生目标保留
   ```

2. **关闭浏览器重开**
   ```yaml
   测试项:
     - [ ] 关闭浏览器
     - [ ] 重新打开
     - [ ] 访问网站
     - [ ] 所有数据保留
   ```

3. **清除缓存 (非数据)**
   ```yaml
   测试项:
     - [ ] 清除浏览器缓存
     - [ ] 保留 IndexedDB
     - [ ] 刷新页面
     - [ ] 数据正常
   ```

4. **导出/导入数据**
   ```yaml
   测试项:
     - [ ] 个人主页 → 导出数据
     - [ ] 下载 JSON 文件
     - [ ] 清除 IndexedDB (开发者工具)
     - [ ] 导入 JSON 文件
     - [ ] 数据恢复成功
   ```

**预期结果**: 数据在各种情况下都能正确保留

---

### 测试场景 5: 异常处理测试

#### 目的：验证各种错误情况的处理

**步骤**:

1. **网络断开**
   ```yaml
   测试项:
     - [ ] 断开网络 (开发者工具 → Offline)
     - [ ] 尝试打卡
     - [ ] 显示友好的错误提示
     - [ ] 提供"重试"按钮
     - [ ] 恢复网络，重试成功
   ```

2. **合约调用失败**
   ```yaml
   测试项:
     - [ ] 余额不足时尝试铸造 SBT
     - [ ] 显示清晰的错误信息
     - [ ] 提示获取测试币
     - [ ] 提供水龙头链接
   ```

3. **AI 服务超时**
   ```yaml
   测试项:
     - [ ] 模拟 AI 响应超时 (>30秒)
     - [ ] 自动降级到 Mock 数据
     - [ ] 提示用户"AI 服务超时，使用备用方案"
     - [ ] 打卡流程继续
   ```

4. **钱包未连接**
   ```yaml
   测试项:
     - [ ] 未连接钱包时点击打卡
     - [ ] 提示"请先连接钱包"
     - [ ] 引导用户连接钱包
   ```

**预期结果**: 所有错误都有友好的提示和解决方案

---

### 测试场景 6: 性能与压力测试

#### 目的：验证系统在高负载下的表现

**步骤**:

1. **页面加载性能**
   ```yaml
   测试项:
     - [ ] 首屏加载时间 <3秒
     - [ ] Time to Interactive <5秒
     - [ ] Lighthouse Performance >90
     - [ ] 图片加载优化 (WebP 格式)
     - [ ] 代码分割正常
   ```

2. **大量数据测试**
   ```yaml
   测试项:
     - [ ] 生成 365 天打卡数据
     - [ ] 个人主页加载时间 <2秒
     - [ ] 图表渲染流畅
     - [ ] 时间轴滚动流畅
     - [ ] 无卡顿/崩溃
   ```

3. **并发测试**
   ```yaml
   测试项:
     - [ ] 10个用户同时打卡
     - [ ] 所有请求成功
     - [ ] 数据一致
     - [ ] 无竞态条件
   ```

4. **内存泄漏测试**
   ```yaml
   测试项:
     - [ ] 打开开发者工具 → Performance
     - [ ] 录制 5 分钟操作
     - [ ] 内存使用稳定
     - [ ] 无明显增长
   ```

**预期结果**: 系统在各种负载下都保持稳定

---

### 测试场景 7: 移动端体验测试

#### 目的：验证移动端的用户体验

**设备**: iPhone/Android 手机

**步骤**:

1. **PWA 安装**
   ```yaml
   测试项:
     - [ ] 访问网站
     - [ ] 浏览器提示"添加到主屏幕"
     - [ ] 安装后显示桌面图标
     - [ ] 启动后全屏显示
     - [ ] 隐藏浏览器地址栏
   ```

2. **触摸交互**
   ```yaml
   测试项:
     - [ ] 按钮大小适合触摸 (>44x44px)
     - [ ] 点击响应迅速
     - [ ] 滑动手势流畅
     - [ ] 输入框不缩放页面
   ```

3. **响应式布局**
   ```yaml
   测试项:
     - [ ] 小屏 (320px) 正常
     - [ ] 中屏 (768px) 正常
     - [ ] 大屏 (1024px+) 正常
     - [ ] 横屏/竖屏切换正常
   ```

4. **性能优化**
   ```yaml
   测试项:
     - [ ] 移动端加载速度 <5秒 (4G)
     - [ ] 图片懒加载
     - [ ] 触摸反馈及时
     - [ ] 无卡顿
   ```

**预期结果**: 移动端体验接近原生应用

---

### 测试场景 8: 安全性测试

#### 目的：验证系统的安全性

**步骤**:

1. **数据加密**
   ```yaml
   测试项:
     - [ ] IndexedDB 数据加密存储
     - [ ] 无法直接查看明文
     - [ ] 私钥不在日志中
     - [ ] 敏感信息不在 URL 中
   ```

2. **XSS 防护**
   ```yaml
   测试项:
     - [ ] 输入 `<script>alert('xss')</script>`
     - [ ] 脚本不执行
     - [ ] 显示为纯文本
   ```

3. **CSRF 防护**
   ```yaml
   测试项:
     - [ ] 合约调用需要签名
     - [ ] 无法伪造交易
   ```

4. **私钥安全**
   ```yaml
   测试项:
     - [ ] 私钥不存储在前端
     - [ ] 私钥不在代码中
     - [ ] .env.local 在 .gitignore 中
   ```

**预期结果**: 通过所有安全检查

---

## 📊 测试结果记录表

### 测试摘要

| 测试场景 | 测试用例 | 通过数 | 失败数 | 阻塞数 | 通过率 |
|---------|---------|--------|--------|--------|--------|
| 新用户完整流程 | 15 | _ | _ | _ | _% |
| 成就系统与 SBT | 12 | _ | _ | _ | _% |
| 双链切换 | 10 | _ | _ | _ | _% |
| 数据持久化 | 8 | _ | _ | _ | _% |
| 异常处理 | 10 | _ | _ | _ | _% |
| 性能测试 | 8 | _ | _ | _ | _% |
| 移动端体验 | 12 | _ | _ | _ | _% |
| 安全性测试 | 8 | _ | _ | _ | _% |
| **总计** | **83** | _ | _ | _ | _% |

### Bug 记录

| ID | 严重程度 | 描述 | 复现步骤 | 状态 | 负责人 |
|----|---------|------|---------|------|--------|
| BUG-001 | P0 | ... | ... | 待修复 | ... |
| BUG-002 | P1 | ... | ... | 待修复 | ... |

### 性能指标

| 指标 | 目标 | 实际 | 状态 |
|-----|------|------|------|
| 首屏加载时间 | <3s | _s | _ |
| Time to Interactive | <5s | _s | _ |
| Lighthouse Performance | >90 | _ | _ |
| 打卡响应时间 | <5s | _s | _ |
| AI 处理时间 | <5s | _s | _ |

---

## 🔧 常见问题排查

### 问题 1: 服务无法启动

**症状**: `npm start` 失败

**排查步骤**:

```bash
# 1. 检查端口占用
lsof -i :3000

# 2. 杀死占用进程
kill -9 <PID>

# 3. 检查 Node.js 版本
node --version

# 4. 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install

# 5. 检查构建
npm run build
```

### 问题 2: 钱包无法连接

**症状**: MetaMask/Phantom 无法连接

**排查步骤**:

```yaml
检查项:
  1. 确认钱包已安装
  2. 确认网络配置正确 (BNB Testnet / Solana Devnet)
  3. 清除浏览器缓存
  4. 检查控制台错误
  5. 确认 HTTPS (生产环境必须)
```

### 问题 3: 合约调用失败

**症状**: 交易失败或超时

**排查步骤**:

```yaml
检查项:
  1. 确认钱包有足够的测试币
  2. 确认合约地址正确
  3. 确认 RPC URL 正常
  4. 检查 Gas 费用
  5. 查看 BscScan/SolScan 交易详情
```

### 问题 4: AI 无响应

**症状**: DeepSeek API 超时

**排查步骤**:

```yaml
检查项:
  1. 确认 API Key 正确
  2. 确认 API 余额充足
  3. 检查网络连接
  4. 查看控制台错误
  5. 确认降级方案工作
```

### 问题 5: 数据丢失

**症状**: 刷新页面后数据消失

**排查步骤**:

```bash
# 1. 检查 IndexedDB
# 打开开发者工具 → Application → IndexedDB

# 2. 检查是否有错误
# 控制台查看错误日志

# 3. 清除并重试
# 开发者工具 → Application → Storage → Clear site data
```

---

## 📈 性能监控

### 监控工具

```bash
# PM2 监控 (VPS 部署)
pm2 monit

# 查看 CPU 和内存使用
pm2 show zhengdao

# 查看日志
pm2 logs zhengdao --lines 100

# Docker 监控
docker stats

# Nginx 访问日志
tail -f /var/log/nginx/access.log

# Nginx 错误日志
tail -f /var/log/nginx/error.log
```

### 监控指标

| 指标 | 正常范围 | 告警阈值 |
|-----|---------|---------|
| CPU 使用率 | <50% | >80% |
| 内存使用率 | <70% | >90% |
| 磁盘使用率 | <80% | >90% |
| 响应时间 | <1s | >3s |
| 错误率 | <1% | >5% |

### 日志管理

```bash
# PM2 日志轮转
pm2 install pm2-logrotate

# 配置日志保留
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# 查看错误日志
pm2 logs zhengdao --err
```

---

## 🎯 部署后续步骤

### 1. 域名配置

```yaml
推荐域名注册商:
  - 阿里云: https://wanwang.aliyun.com
  - 腾讯云: https://dnspod.cn
  - Namecheap: https://www.namecheap.com

DNS 配置:
  A 记录: @ → 服务器 IP
  A 记录: www → 服务器 IP
  CNAME: * → your-domain.com (Vercel)
```

### 2. CDN 配置 (可选)

```yaml
推荐 CDN:
  - Cloudflare: 免费 CDN + SSL + DDoS 防护
  - 阿里云 CDN: 国内加速
  - 腾讯云 CDN: 国内加速

配置步骤:
  1. 注册 CDN 服务
  2. 添加域名
  3. 配置 CNAME 记录
  4. 启用 HTTPS
  5. 配置缓存规则
```

### 3. 监控告警 (可选)

```yaml
推荐服务:
  - Sentry: 错误追踪
  - LogRocket: 用户会话录制
  - Google Analytics: 用户行为分析
  - Uptime Robot: 服务可用性监控

配置步骤:
  1. 注册服务
  2. 获取 API Key
  3. 集成到代码
  4. 配置告警规则
```

---

## ✅ 最终验收清单

### 功能验收

- [ ] 所有页面路由正常
- [ ] 钱包连接正常
- [ ] 打卡流程完整
- [ ] AI 复盘工作
- [ ] 成就系统正确
- [ ] SBT 铸造成功
- [ ] 双链切换正常
- [ ] 数据持久化正常
- [ ] 移动端体验良好

### 性能验收

- [ ] Lighthouse Performance >90
- [ ] 首屏加载 <3秒
- [ ] API 响应 <1秒
- [ ] 无内存泄漏
- [ ] 无明显卡顿

### 安全验收

- [ ] 数据加密存储
- [ ] 无 XSS 漏洞
- [ ] 无 CSRF 漏洞
- [ ] 私钥不泄露
- [ ] HTTPS 正常

### 用户体验验收

- [ ] 设计一致 (水墨风格)
- [ ] 文案准确
- [ ] 无错别字
- [ ] 动画流畅
- [ ] 错误提示友好

---

## 📞 支持与反馈

### 获取帮助

```yaml
文档:
  - README.md: 项目总览
  - docs/DEPLOYMENT-SETUP-GUIDE.md: BNB 合约部署
  - docs/TESTING-GUIDE.md: 测试框架
  - docs/QUICK-DEMO-GUIDE.md: 演示指南

社区:
  - GitHub Issues: 提交 Bug
  - GitHub Discussions: 提问和讨论
  - Discord: 实时交流 (如有)
```

### 反馈渠道

```yaml
Bug 报告:
  - GitHub Issues
  - 包含: 复现步骤、错误日志、截图

功能建议:
  - GitHub Discussions
  - 描述: 使用场景、期望行为

其他问题:
  - GitHub Discussions
  - Email: support@zhengdao.com (示例)
```

---

## 🎉 部署完成！

恭喜！你已经完成了证道项目的部署和测试。

**下一步**:
1. 开始推广你的 DApp
2. 收集用户反馈
3. 迭代优化功能
4. 规划下一阶段开发

**证道 - 让每一天都有意义**
**修身 · 齐家 · 证道**

---

*文档版本: v1.0*
*最后更新: 2026-01-28*
*维护者: 证道开发团队*
