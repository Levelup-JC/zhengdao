# 证道 Logo 使用指南

<div align="center">

# 🎨 Logo 使用规范

**确保品牌形象的一致性**

</div>

---

## 📋 目录

1. [Logo 版本](#logo-版本)
2. [使用场景](#使用场景)
3. [颜色规范](#颜色规范)
4. [尺寸规范](#尺寸规范)
5. [代码示例](#代码示例)
6. [禁止事项](#禁止事项)

---

## 🎯 Logo 版本

### 版本 1：原版（深色背景）
```
文件：logo.svg / logo.png
背景：深色（#000000, #1a1a1a, 深灰等）
用途：
- 网站 Header（深色主题）
- 启动页面（深色背景）
- 社交媒体（深色模式）
```

### 版本 2：白底版（浅色背景）⭐ 推荐
```
文件：logo-light.svg / logo-light.png
背景：浅色（#FFFEF2, #FFFFFF, 浅灰等）
用途：
- 网站主体内容区
- 打印材料
- 文档和 PDF
- 白色背景的页面

设计要点：
✅ 保持黑色主体（#000000）
✅ 朱砂红保持不变（#D43628）
✅ 背景透明或白色
✅ 确保对比度足够
```

### 版本 3：简化版（小尺寸）
```
文件：logo-simple.svg / logo-simple.png
背景：任意
用途：
- Favicon（16x16, 32x32）
- App 图标
- 按钮图标
- 极小尺寸场景

设计要点：
- 只保留中心人物
- 去掉外圈和飞溅
- 保持核心识别度
```

---

## 🎨 使用场景详解

### 场景 1：白色背景的网页

#### 示例 1：Header 导航栏
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 白色背景的 Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.svg"  {/* 使用原版，黑色主体在白底上清晰可见 */}
                alt="证道"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-xl font-bold text-black">证道</h1>
                <p className="text-xs text-gray-600">修身 · 齐家 · 证道</p>
              </div>
            </div>
            
            {/* 导航 */}
            <nav className="flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-[#D43628]">首页</a>
              <a href="/about" className="text-gray-700 hover:text-[#D43628]">关于</a>
              <button className="bg-[#D43628] text-white px-4 py-2 hover:bg-[#B82E20]">
                开始使用
              </button>
            </nav>
          </div>
        </header>
        
        {children}
      </body>
    </html>
  )
}
```

#### 示例 2：内容区域
```tsx
// components/FeatureSection.tsx
export function FeatureSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Logo 作为装饰元素 */}
        <div className="text-center mb-12">
          <Image 
            src="/logo.svg"
            alt="证道"
            width={120}
            height={120}
            className="mx-auto mb-6 opacity-90"
          />
          <h2 className="text-3xl font-bold text-black mb-4">
            首个 AI 复盘挖矿 DApp
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            用区块链和 AI 重新定义自我修炼
          </p>
        </div>
        
        {/* 功能卡片 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 卡片内容 */}
        </div>
      </div>
    </section>
  )
}
```

#### 示例 3：Footer
```tsx
// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-[#FFFEF2] border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo 和简介 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/logo.svg"
                alt="证道"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold">证道</span>
            </div>
            <p className="text-gray-600 mb-4">
              首个 AI 复盘挖矿 DApp<br />
              每天 3 分钟，让成长变现
            </p>
            <p className="text-sm text-gray-500">
              修身 · 齐家 · 证道
            </p>
          </div>
          
          {/* 链接 */}
          <div>
            <h3 className="font-bold mb-4">产品</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/features">功能</a></li>
              <li><a href="/pricing">定价</a></li>
              <li><a href="/roadmap">路线图</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">社区</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/twitter">Twitter</a></li>
              <li><a href="/discord">Discord</a></li>
              <li><a href="/telegram">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          © 2026 证道 ZhengDao. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

### 场景 2：打印材料

#### 示例 1：名片设计
```css
/* 名片尺寸：90mm x 54mm */
.business-card {
  width: 90mm;
  height: 54mm;
  background: white;
  padding: 10mm;
  
  /* 确保打印时颜色准确 */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.business-card-logo {
  width: 20mm;
  height: 20mm;
  margin-bottom: 5mm;
}

/* 打印样式 */
@media print {
  body {
    background: white;
  }
  
  .business-card {
    page-break-after: always;
  }
}
```

```html
<!-- 名片 HTML -->
<div class="business-card">
  <img src="/logo.svg" alt="证道" class="business-card-logo" />
  
  <h2 style="font-size: 18pt; margin-bottom: 2mm;">张三</h2>
  <p style="font-size: 10pt; color: #666; margin-bottom: 5mm;">创始人 & CEO</p>
  
  <div style="font-size: 9pt; color: #666;">
    <p>📧 contact@zhengdao.io</p>
    <p>🌐 www.zhengdao.io</p>
    <p>📱 +86 138 0000 0000</p>
  </div>
  
  <p style="font-size: 8pt; color: #999; margin-top: 5mm;">
    修身 · 齐家 · 证道
  </p>
</div>
```

#### 示例 2：宣传单页
```html
<!-- A4 宣传单页 -->
<!DOCTYPE html>
<html>
<head>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: white;
    }
    
    .flyer {
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      box-sizing: border-box;
    }
    
    .flyer-header {
      text-align: center;
      margin-bottom: 15mm;
    }
    
    .flyer-logo {
      width: 60mm;
      height: 60mm;
      margin: 0 auto 10mm;
    }
    
    .flyer-title {
      font-size: 32pt;
      font-weight: bold;
      color: #000;
      margin-bottom: 5mm;
    }
    
    .flyer-subtitle {
      font-size: 18pt;
      color: #D43628;
      margin-bottom: 3mm;
    }
    
    .flyer-tagline {
      font-size: 14pt;
      color: #666;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="flyer">
    <div class="flyer-header">
      <img src="/logo.svg" alt="证道" class="flyer-logo" />
      <h1 class="flyer-title">证道</h1>
      <h2 class="flyer-subtitle">首个 AI 复盘挖矿 DApp</h2>
      <p class="flyer-tagline">每天 3 分钟，让成长变现</p>
    </div>
    
    <!-- 内容区域 -->
    <div class="flyer-content">
      <!-- 功能介绍、使用说明等 -->
    </div>
  </div>
</body>
</html>
```

#### 示例 3：海报设计
```css
/* A3 海报：297mm x 420mm */
.poster {
  width: 297mm;
  height: 420mm;
  background: white;
  position: relative;
  overflow: hidden;
}

/* Logo 水印（大尺寸，半透明） */
.poster-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200mm;
  height: 200mm;
  opacity: 0.05;
  z-index: 0;
}

/* 主 Logo */
.poster-logo {
  width: 80mm;
  height: 80mm;
  margin: 30mm auto 20mm;
  display: block;
}

/* 海报标题 */
.poster-title {
  text-align: center;
  font-size: 48pt;
  font-weight: bold;
  color: #000;
  margin-bottom: 10mm;
}

/* 海报副标题 */
.poster-subtitle {
  text-align: center;
  font-size: 24pt;
  color: #D43628;
  margin-bottom: 20mm;
}
```

### 场景 3：文档和 PDF

#### 示例 1：产品文档封面
```tsx
// components/DocumentCover.tsx
export function DocumentCover() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-16">
      {/* Logo */}
      <Image 
        src="/logo.svg"
        alt="证道"
        width={200}
        height={200}
        className="mb-12"
      />
      
      {/* 文档标题 */}
      <h1 className="text-6xl font-bold text-black mb-6">
        证道产品白皮书
      </h1>
      
      {/* 副标题 */}
      <h2 className="text-3xl text-[#D43628] mb-4">
        首个 AI 复盘挖矿 DApp
      </h2>
      
      {/* 描述 */}
      <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center">
        用区块链和 AI 重新定义自我修炼
      </p>
      
      {/* 版本和日期 */}
      <div className="text-gray-500">
        <p>Version 3.0</p>
        <p>2026 年 1 月</p>
      </div>
      
      {/* 底部标语 */}
      <div className="absolute bottom-16 text-gray-400">
        修身 · 齐家 · 证道
      </div>
    </div>
  )
}
```

#### 示例 2：PDF 页眉页脚
```css
/* PDF 页眉 */
@page {
  @top-left {
    content: url('/logo-simple.svg');
    width: 15mm;
    height: 15mm;
  }
  
  @top-center {
    content: "证道 - 产品文档";
    font-size: 10pt;
    color: #666;
  }
  
  @top-right {
    content: counter(page);
    font-size: 10pt;
    color: #666;
  }
  
  @bottom-center {
    content: "修身 · 齐家 · 证道";
    font-size: 8pt;
    color: #999;
  }
}

/* 文档样式 */
.document {
  background: white;
  padding: 25mm;
  font-family: 'Source Han Sans', sans-serif;
}

.document-header {
  display: flex;
  align-items: center;
  padding-bottom: 10mm;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10mm;
}

.document-logo {
  width: 20mm;
  height: 20mm;
  margin-right: 5mm;
}
```

#### 示例 3：Markdown 文档
```markdown
<!-- README.md -->

<div align="center">

<img src="./public/logo.svg" alt="证道" width="200" />

# 证道 (ZhengDao)

**首个 AI 复盘挖矿 DApp**

用区块链和 AI 重新定义自我修炼

[![Version](https://img.shields.io/badge/version-3.0-red.svg)](https://github.com/zhengdao)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**修身 · 齐家 · 证道**

</div>

---

## 项目简介

证道是首个结合 AI 和区块链的深度复盘系统...
```

---

## 🎨 颜色规范

### 主色调
```css
/* 墨黑 - Logo 主体 */
--logo-black: #000000;

/* 朱砂红 - Logo 点缀 */
--logo-red: #D43628;

/* 纸白 - 背景色 */
--bg-paper: #FFFEF2;
```

### 背景搭配

#### ✅ 推荐背景色
```css
/* 纯白 */
background: #FFFFFF;

/* 纸白（品牌色） */
background: #FFFEF2;

/* 浅灰 */
background: #F5F5F5;
background: #FAFAFA;

/* 深色（使用原版 Logo） */
background: #000000;
background: #1a1a1a;
background: #2d2d2d;
```

#### ❌ 避免使用
```css
/* 中等灰度（对比度不足） */
background: #808080;
background: #999999;

/* 彩色背景（干扰 Logo） */
background: #FF0000;
background: #00FF00;
background: #0000FF;

/* 复杂图案背景 */
background: url('pattern.png');
```

### 对比度检查

```
最小对比度要求（WCAG AA 标准）：
- 正常文本：4.5:1
- 大文本：3:1
- Logo：3:1

检查工具：
https://webaim.org/resources/contrastchecker/
```

---

## 📐 尺寸规范

### 网页使用

```css
/* 超小尺寸 - Favicon */
.logo-xs {
  width: 16px;
  height: 16px;
}

/* 小尺寸 - 按钮、图标 */
.logo-sm {
  width: 32px;
  height: 32px;
}

/* 中等尺寸 - Header */
.logo-md {
  width: 48px;
  height: 48px;
}

/* 大尺寸 - Hero Section */
.logo-lg {
  width: 120px;
  height: 120px;
}

/* 超大尺寸 - 启动页 */
.logo-xl {
  width: 200px;
  height: 200px;
}
```

### 打印使用

```
名片：20mm x 20mm
信纸：25mm x 25mm
宣传单：60mm x 60mm
海报：100mm x 100mm
横幅：300mm x 300mm
```

### 留白规范

```
最小留白 = Logo 高度 × 20%

示例：
- Logo 高度 100px
- 四周留白至少 20px

代码实现：
.logo-container {
  padding: 20%; /* 相对于 Logo 尺寸 */
}
```

---

## 💻 代码示例

### React/Next.js 组件

```tsx
// components/Logo.tsx
import Image from 'next/image'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'simple'
  className?: string
}

const sizeMap = {
  xs: 16,
  sm: 32,
  md: 48,
  lg: 120,
  xl: 200
}

export function Logo({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}: LogoProps) {
  const dimension = sizeMap[size]
  const src = variant === 'simple' ? '/logo-simple.svg' : '/logo.svg'
  
  return (
    <Image 
      src={src}
      alt="证道"
      width={dimension}
      height={dimension}
      className={`logo-${size} ${className}`}
      priority={size === 'xl'} // 大 Logo 优先加载
    />
  )
}

// 使用示例
<Logo size="md" />
<Logo size="lg" variant="simple" />
<Logo size="xl" className="animate-pulse" />
```

### 响应式 Logo

```tsx
// components/ResponsiveLogo.tsx
export function ResponsiveLogo() {
  return (
    <Image 
      src="/logo.svg"
      alt="证道"
      width={48}
      height={48}
      className="
        w-8 h-8          /* 移动端：32px */
        sm:w-10 sm:h-10  /* 平板：40px */
        md:w-12 md:h-12  /* 桌面：48px */
        lg:w-16 lg:h-16  /* 大屏：64px */
      "
    />
  )
}
```

### 带动画的 Logo

```tsx
// components/AnimatedLogo.tsx
export function AnimatedLogo() {
  return (
    <div className="relative">
      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-[#D43628] opacity-20 blur-xl animate-pulse" />
      
      {/* Logo */}
      <Image 
        src="/logo.svg"
        alt="证道"
        width={200}
        height={200}
        className="
          relative z-10
          transition-transform duration-300
          hover:scale-110
          hover:rotate-3
        "
      />
    </div>
  )
}
```

### 打印专用样式

```tsx
// components/PrintableLogo.tsx
export function PrintableLogo() {
  return (
    <>
      <style jsx>{`
        @media print {
          .logo-print {
            width: 20mm !important;
            height: 20mm !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
      
      <Image 
        src="/logo.svg"
        alt="证道"
        width={200}
        height={200}
        className="logo-print"
      />
    </>
  )
}
```

---

## 🚫 禁止事项

### ❌ 不要做的事

```
1. 不要拉伸或压缩 Logo
   ❌ transform: scaleX(1.5)
   ✅ 保持 1:1 比例

2. 不要旋转 Logo（除非设计需要）
   ❌ transform: rotate(45deg)
   ✅ 保持正常方向

3. 不要改变 Logo 颜色
   ❌ filter: hue-rotate(180deg)
   ✅ 使用原始颜色

4. 不要添加阴影或特效
   ❌ box-shadow: 0 0 20px rgba(0,0,0,0.5)
   ✅ 保持简洁

5. 不要在复杂背景上使用
   ❌ background: url('busy-pattern.png')
   ✅ 使用纯色背景

6. 不要与其他图形混合
   ❌ 多个 Logo 重叠
   ✅ 单独使用

7. 不要使用低分辨率图片
   ❌ logo-16.png 放大到 200px
   ✅ 使用 SVG 或高分辨率 PNG

8. 不要在对比度不足的背景上使用
   ❌ 灰色背景 + 黑色 Logo
   ✅ 白色背景 + 黑色 Logo
```

### ✅ 正确示例

```tsx
// ✅ 正确：保持比例
<Image 
  src="/logo.svg"
  width={100}
  height={100}
  alt="证道"
/>

// ❌ 错误：拉伸变形
<Image 
  src="/logo.svg"
  width={150}
  height={100}
  alt="证道"
/>

// ✅ 正确：纯色背景
<div className="bg-white p-8">
  <Logo />
</div>

// ❌ 错误：复杂背景
<div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8">
  <Logo />
</div>

// ✅ 正确：足够留白
<div className="p-8">
  <Logo />
</div>

// ❌ 错误：留白不足
<div className="p-1">
  <Logo />
</div>
```

---

## 📱 响应式设计

### 移动端优先

```tsx
// 移动端优化的 Logo
export function MobileLogo() {
  return (
    <div className="flex items-center space-x-2">
      {/* 移动端：只显示图标 */}
      <Image 
        src="/logo-simple.svg"
        alt="证道"
        width={32}
        height={32}
        className="md:hidden"
      />
      
      {/* 桌面端：显示完整 Logo + 文字 */}
      <div className="hidden md:flex items-center space-x-3">
        <Image 
          src="/logo.svg"
          alt="证道"
          width={48}
          height={48}
        />
        <div>
          <h1 className="text-xl font-bold">证道</h1>
          <p className="text-xs text-gray-600">修身 · 齐家 · 证道</p>
        </div>
      </div>
    </div>
  )
}
```

### 断点设置

```css
/* Tailwind 断点 */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */

.logo-responsive {
  /* 移动端 */
  width: 32px;
  height: 32px;
}

@media (min-width: 640px) {
  .logo-responsive {
    /* 平板 */
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 1024px) {
  .logo-responsive {
    /* 桌面 */
    width: 48px;
    height: 48px;
  }
}
```

---

## 🎯 最佳实践

### 1. 使用 SVG 格式
```
优势：
✅ 无限缩放不失真
✅ 文件体积小
✅ 支持 CSS 样式
✅ 加载速度快

何时使用 PNG：
- 需要复杂效果
- 不支持 SVG 的场景
- 社交媒体上传
```

### 2. 优化加载性能
```tsx
// 使用 Next.js Image 组件
<Image 
  src="/logo.svg"
  alt="证道"
  width={48}
  height={48}
  priority  // 首屏 Logo 优先加载
  loading="eager"  // 立即加载
/>

// 预加载 Logo
<link rel="preload" href="/logo.svg" as="image" />
```

### 3. 无障碍访问
```tsx
// 提供有意义的 alt 文本
<Image 
  src="/logo.svg"
  alt="证道 - 首个 AI 复盘挖矿 DApp"
  width={48}
  height={48}
/>

// 装饰性 Logo 使用空 alt
<Image 
  src="/logo.svg"
  alt=""
  role="presentation"
  width={48}
  height={48}
/>
```

### 4. 深色模式支持
```tsx
// 根据主题切换 Logo
export function ThemeLogo() {
  const { theme } = useTheme()
  
  return (
    <Image 
      src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
      alt="证道"
      width={48}
      height={48}
    />
  )
}
```

---

## 📞 联系方式

如需 Logo 源文件或有其他问题，请联系设计团队。

**修身 · 齐家 · 证道**
