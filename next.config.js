/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 生产环境移除 console.log
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Next.js 16+ 使用 Turbopack
  turbopack: {
    // Turbopack 配置（空配置以消除警告）
  },

  webpack: (config, { dev, isServer }) => {
    // 原有配置
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // ⚡ 开发模式优化：减少文件监听开销
    if (dev) {
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
          '**/public/**',
        ],
      };
    }

    // ⚡ 减少内存使用
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
};

module.exports = nextConfig;
