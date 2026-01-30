@echo off
REM 证道项目 - 快速优化启动脚本 (Windows)
REM 解决卡顿问题

echo 🚀 开始优化证道项目...
echo.

REM 检查当前目录
if not exist "package.json" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 方案选择
echo 请选择优化方案:
echo 1) 快速修复（2分钟）- 清除缓存 + 生产模式
echo 2) 完整优化（10分钟）- 清理依赖 + 重建项目
echo 3) 仅启动生产模式
set /p choice="请输入选项 (1/2/3): "

if "%choice%"=="1" goto option1
if "%choice%"=="2" goto option2
if "%choice%"=="3" goto option3
goto invalid

:option1
echo.
echo 📦 方案 1: 快速修复
echo -----------------------------------
echo 🧹 清除缓存...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .swc 2>nul
echo ✅ 缓存已清除
echo.
echo 🔨 构建项目...
call npm run build
echo.
echo ✅ 构建完成！
echo.
echo 🚀 启动生产服务器...
echo 访问: http://localhost:3000
echo 按 Ctrl+C 停止
echo.
call npm run start
goto end

:option2
echo.
echo 📦 方案 2: 完整优化
echo -----------------------------------
echo 🧹 清理所有文件...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules 2>nul
del /q package-lock.json 2>nul
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .swc 2>nul
echo ✅ 清理完成
echo.
echo 📥 重新安装依赖...
call npm install
echo.
echo ✅ 依赖安装完成
echo.
echo 🔨 构建项目...
call npm run build
echo.
echo ✅ 构建完成！
echo.
echo 🚀 启动生产服务器...
echo 访问: http://localhost:3000
echo 按 Ctrl+C 停止
echo.
call npm run start
goto end

:option3
echo.
echo 📦 方案 3: 仅启动生产模式
echo -----------------------------------
echo 🚀 启动生产服务器...
echo 访问: http://localhost:3000
echo 按 Ctrl+C 停止
echo.
call npm run start
goto end

:invalid
echo ❌ 无效选项
pause
exit /b 1

:end
