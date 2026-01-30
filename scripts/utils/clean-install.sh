#!/bin/bash

# 清理和重装脚本
set -e

echo "🧹 清理package-lock.json..."

# 删除package-lock.json
rm -f package-lock.json

echo "⚠️  node_modules保留，使用--legacy-peer-deps安装..."
echo "📦 重新安装依赖..."
npm install --legacy-peer-deps

echo "✅ 安装完成！"
echo ""
echo "🚀 验证Hardhat安装："
npx hardhat --version
echo ""
echo "🚀 下一步："
echo "   npm run hardhat:compile  # 编译合约"
echo "   npm run hardhat:test     # 运行测试"
