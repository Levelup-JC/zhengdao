#!/bin/bash
# 成就系统组件快速查看脚本

echo "================================"
echo "🎨 成就系统组件文件清单"
echo "================================"
echo ""
echo "📁 组件目录: components/achievement/"
echo ""
ls -lh "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/" | grep ".tsx$"
echo ""
echo "📁 核心库目录: lib/"
echo ""
ls -lh "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/lib/" | grep -E "achievement|multi-chain"
echo ""
echo "================================"
echo "📖 查看组件代码"
echo "================================"
echo ""
echo "请选择要查看的组件编号:"
echo "1) LevelDisplay - 等级展示组件"
echo "2) SBTGallery - SBT展示墙组件"
echo "3) ClaimSBTFlow - 申领流程组件"
echo "4) ChainSwitcher - 链切换组件"
echo "5) DualChainStatus - 双链对比组件"
echo "6) 查看成就系统核心定义"
echo "0) 退出"
echo ""
read -p "请输入编号 (0-6): " choice

case $choice in
  1)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/LevelDisplay.tsx"
    ;;
  2)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/SBTGallery.tsx"
    ;;
  3)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/ClaimSBTFlow.tsx"
    ;;
  4)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/ChainSwitcher.tsx"
    ;;
  5)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/components/achievement/DualChainStatus.tsx"
    ;;
  6)
    less "/Users/jasoncong/Desktop/claude code/黑客松项目-证道/lib/achievement-system.ts"
    ;;
  0)
    echo "退出"
    ;;
  *)
    echo "无效选择"
    ;;
esac
