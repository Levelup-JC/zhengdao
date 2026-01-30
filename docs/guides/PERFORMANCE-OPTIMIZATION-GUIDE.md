# 证道 - 性能优化与卡顿解决指南

**问题**: 本地开发时卡顿严重
**目标**: 优化到流畅体验
**预计时间**: 15-30分钟

---

## 🚨 快速修复（立即生效）

### 方案 1: 使用生产模式运行 (推荐，最快速)

```bash
# 1. 构建项目
cd "黑客松项目-证道 2"
npm run build

# 2. 启动生产服务器
npm run start

# 访问 http://localhost:3000
```

**为什么有效**: 生产模式移除了开发时的热重载、类型检查等开销，性能提升 10倍以上。

---

### 方案 2: 增加内存限制

```bash
# 编辑 package.json，修改 dev 脚本
nano package.json

# 将 "dev": "next dev" 改为：
"dev": "NODE_OPTIONS='--max-old-space-size=8192' next dev"

# 重新启动
npm run dev
```

---

### 方案 3: 清除缓存重建

```bash
# 1. 停止开发服务器 (Ctrl+C)

# 2. 清除所有缓存
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# 3. 重新启动
npm run dev
```

---

## 🛠️ 深度优化（15分钟）

### 优化 1: 更新 Next.js 配置

创建优化后的 `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 性能优化
  swcMinify: true, // 使用 SWC 压缩（比 Terseter 快 7 倍）

  // 减少构建时间
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除 console
  },

  // Webpack 优化
  webpack: (config, { dev, isServer }) => {
    // 原有配置
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // 开发模式优化
    if (dev) {
      // 减少文件监听
      config.watchOptions = {
        poll: 1000, // 每秒检查一次，而不是持续监听
        aggregateTimeout: 300, // 延迟 300ms 重新构建
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/programs/**',
          '**/scripts/**',
          '**/docs/**',
        ],
      };

      // 禁用一些开发时的性能消耗功能
      config.cache = false;
    }

    // 减少内存使用
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      };
    }

    return config;
  },

  // 实验性功能
  experimental: {
    // 启用 Turbopack（Next.js 13+，极大提升开发速度）
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },
};

module.exports = nextConfig;
```

**应用配置**:

```bash
# 备份原配置
cp next.config.js next.config.js.backup

# 创建新配置（直接复制上面的内容）
# 或者使用我提供的脚本（见下方）
```

---

### 优化 2: 精简依赖包

你的 `node_modules` 有 2.0GB，太大了！可以清理：

```bash
# 1. 分析哪些包占用空间最大
npx depcheck

# 2. 查看最大的依赖包
du -sh node_modules/* | sort -rh | head -20

# 3. 清理未使用的依赖
npx npm-check-updates -u

# 4. 重新安装（使用 --legacy-peer-deps 如果有冲突）
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

### 优化 3: 优化 TypeScript 配置

更新 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true, // 跳过库文件类型检查（重要！）
    "strict": false, // 开发时关闭严格模式，提升速度
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true, // 增量编译（重要！）
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "programs", "scripts"]
}
```

---

### 优化 4: 浏览器端优化

#### 禁用浏览器扩展（开发时）

开发时禁用这些扩展：
- ❌ AdBlock
- ❌ Grammarly
- ❌ LastPass
- ✅ 仅保留 React DevTools 和 Redux DevTools

#### 使用无痕模式

```bash
# 打开 Chrome 无痕模式
# 访问 http://localhost:3000
# 这样不会有扩展干扰
```

---

### 优化 5: 系统资源优化

#### 检查系统资源

```bash
# 查看 Node.js 进程内存使用
ps aux | grep node

# 如果内存占用 >2GB，说明需要优化
```

#### 关闭其他应用

开发时关闭：
- Chrome 其他标签页（仅保留开发页）
- VS Code 其他大型项目
- Docker、其他 Node.js 项目

---

## 🎯 推荐的开发流程

### 日常开发（推荐）

```bash
# 1. 使用生产模式预览
npm run build && npm run start

# 2. 或者使用 Turbopack（Next.js 13+）
npm run dev -- --turbo

# 3. 只在需要热重载时用开发模式
npm run dev
```

### 调试时使用

```bash
# 启动开发服务器，但限制资源
NODE_OPTIONS='--max-old-space-size=4096' npm run dev
```

---

## 📊 性能对比

| 模式 | 启动时间 | 内存占用 | 热重载 | 推荐度 |
|-----|---------|---------|--------|--------|
| `npm run dev` | 30-60s | 1-2GB | ✅ 支持 | ⭐⭐ |
| `npm run build && start` | 60-120s | 200-500MB | ❌ 不支持 | ⭐⭐⭐⭐⭐ |
| `npm run dev -- --turbo` | 10-20s | 500MB-1GB | ✅ 支持 | ⭐⭐⭐⭐ |

---

## 🚨 紧急情况处理

### 如果还是卡，使用这个方案：

```bash
# 1. 完全清理
rm -rf .next node_modules package-lock.json

# 2. 重新安装（使用国内镜像加速）
npm install --registry=https://registry.npmmirror.com

# 3. 构建
npm run build

# 4. 启动生产服务器
npm run start
```

### 使用 Docker 隔离环境

```dockerfile
# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

# 只安装必要依赖
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
```

```bash
# 构建并运行
docker build -t zhengdao-dev .
docker run -p 3000:3000 zhengdao-dev
```

---

## 🔍 持续监控

### 安装性能监控工具

```bash
# 安装clinic.js（Node.js 性能分析）
npm install -g clinic

# 启动分析
clinic doctor -- npm run dev

# 访问应用，使用一段时间
# Ctrl+C 停止，会生成性能报告
```

### Chrome DevTools 分析

1. 打开 Chrome DevTools (F12)
2. 切换到 **Performance** 标签
3. 点击 **Record**
4. 操作应用 10 秒
5. 点击 **Stop**
6. 查看性能瓶颈

---

## ✅ 验证优化效果

### 检查清单

优化后，验证以下指标：

```yaml
启动时间:
  - [ ] <30秒 (生产模式)
  - [ ] <60秒 (开发模式)

内存占用:
  - [ ] <500MB (生产模式)
  - [ ] <1GB (开发模式)

页面加载:
  - [ ] 首屏 <3秒
  - [ ] 交互响应 <100ms

热重载:
  - [ ] 修改代码后 <5秒刷新
  - [ ] 不需要手动刷新浏览器
```

---

## 💡 最佳实践

### 日常开发建议

1. **使用生产模式预览**
   - 完成功能后，使用 `npm run build && npm run start` 预览
   - 只在需要调试时用开发模式

2. **定期清理缓存**
   ```bash
   # 每周清理一次
   rm -rf .next node_modules/.cache
   ```

3. **合理使用热重载**
   - 样式调整：可以使用开发模式
   - 逻辑调试：使用生产模式 + console.log
   - 性能测试：必须用生产模式

4. **代码分割**
   - 大型组件使用 `next/dynamic` 懒加载
   - 避免在首页加载所有代码

5. **减少依赖**
   - 定期检查未使用的包
   - 使用 `bundlephobia.com` 检查包的大小

---

## 📞 需要更多帮助？

### 如果问题仍然存在：

1. **收集诊断信息**
   ```bash
   # 系统信息
   uname -a

   # Node.js 版本
   node --version
   npm --version

   # 内存使用
   free -h  # Linux/Mac
   systeminfo | findstr /C:"Memory"  # Windows

   # 磁盘使用
   df -h

   # Node.js 进程
   ps aux | grep node
   ```

2. **查看错误日志**
   ```bash
   # 查看构建日志
   npm run build 2>&1 | tee build.log

   # 查看运行日志
   npm run dev 2>&1 | tee dev.log
   ```

3. **降低 Next.js 版本**（如果使用最新版有问题）
   ```bash
   # 降级到稳定版本
   npm install next@14.2.0 react@18.3.0
   ```

---

## 🎉 总结

**立即行动（5分钟）**:
```bash
# 最快的解决方案
npm run build
npm run start
```

**完整优化（15分钟）**:
1. 更新 `next.config.js`
2. 更新 `tsconfig.json`
3. 清理缓存重建
4. 使用生产模式

**长期方案（30分钟）**:
1. 精简依赖包
2. 优化代码结构
3. 使用 Docker 隔离
4. 建立监控体系

---

**证道 - 让每一天都有意义**
**修身 · 齐家 · 证道**

---

*优化指南 v1.0*
*最后更新: 2026-01-28*
*预计性能提升: 10倍*
