#!/bin/bash

# 证道项目 - 快速优化启动脚本
# 解决卡顿问题

echo "🚀 开始优化证道项目..."
echo ""

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 方案选择
echo "请选择优化方案:"
echo "1) 快速修复（2分钟）- 清除缓存 + 生产模式"
echo "2) 完整优化（10分钟）- 清理依赖 + 重建项目"
echo "3) 仅启动生产模式"
read -p "请输入选项 (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "📦 方案 1: 快速修复"
        echo "-----------------------------------"
        echo "🧹 清除缓存..."
        rm -rf .next
        rm -rf node_modules/.cache
        rm -rf .swc
        echo "✅ 缓存已清除"
        echo ""
        echo "🔨 构建项目..."
        npm run build
        echo ""
        echo "✅ 构建完成！"
        echo ""
        echo "🚀 启动生产服务器..."
        echo "访问: http://localhost:3000"
        echo "按 Ctrl+C 停止"
        echo ""
        npm run start
        ;;

    2)
        echo ""
        echo "📦 方案 2: 完整优化"
        echo "-----------------------------------"
        echo "🧹 清理所有文件..."
        rm -rf .next
        rm -rf node_modules
        rm -rf package-lock.json
        rm -rf node_modules/.cache
        rm -rf .swc
        echo "✅ 清理完成"
        echo ""
        echo "📥 重新安装依赖（使用国内镜像加速）..."
        npm install --registry=https://registry.npmmirror.com
        echo ""
        echo "✅ 依赖安装完成"
        echo ""
        echo "🔨 构建项目..."
        npm run build
        echo ""
        echo "✅ 构建完成！"
        echo ""
        echo "🚀 启动生产服务器..."
        echo "访问: http://localhost:3000"
        echo "按 Ctrl+C 停止"
        echo ""
        npm run start
        ;;

    3)
        echo ""
        echo "📦 方案 3: 仅启动生产模式"
        echo "-----------------------------------"
        echo "🚀 启动生产服务器..."
        echo "访问: http://localhost:3000"
        echo "按 Ctrl+C 停止"
        echo ""
        npm run start
        ;;

    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac
