# 技术实现文档: TASK-UI-01 首页Logo和标题优化

## 1. 目标

根据CTO的V3.0审查报告，优化首页的品牌展示区域，使其更符合极简、居中的设计理念，并突出核心Slogan。

## 2. 涉及文件

- **主要修改**: `components/BrandLogo.tsx`
- **样式修改**: 内联在 `BrandLogo.tsx` 中的JSX Style

## 3. 修改需求

1.  **移除副标题**: 不再显示「修身 · 齐家 · 证道」。
2.  **添加Slogan**: 在标题下方添加新的Slogan: 「第一个Web3的成长变现应用」。
3.  **调整标题**: 「证道」标题字体需要更大、更突出。
4.  **居中对齐**: 确保Logo、标题、Slogan整体垂直居中对齐。

## 4. 实现步骤

### 步骤1: 修改 `BrandLogo.tsx` 组件Props

修改组件的props，用 `slogan` 替代 `showSubtitle`。

```typescript
// components/BrandLogo.tsx

// ... imports

export function BrandLogo({
  slogan = '第一个Web3的成长变现应用',
}: {
  slogan?: string;
}) {
  // ... component logic
}
```

### 步骤2: 更新组件结构

移除原有的副标题 `<p>` 元素，并用新的Slogan元素替代。

```jsx
// components/BrandLogo.tsx

// ...
      {/* 项目名称 */}
      <motion.h1
        className="brand-title"
        // ... animation props
      >
        证道
      </motion.h1>

      {/* 新的Slogan */}
      {slogan && (
        <motion.p
          className="brand-slogan" // 使用新的class
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {slogan}
        </motion.p>
      )}

      {/* 装饰线 */}
// ...
```

### 步骤3: 调整样式

在组件的 `<style jsx>` 部分进行以下调整：

1.  **增大标题字体**: 修改 `.brand-title` 的 `font-size`。
2.  **添加Slogan样式**: 创建 `.brand-slogan` 的样式。
3.  **确保居中**: 检查 `.brand-logo-container` 的flex布局属性。

```css
/* components/BrandLogo.tsx -> <style jsx> */

.brand-logo-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保水平居中 */
  justify-content: center; /* 确保垂直居中 */
  padding: 2rem 1rem 1.5rem;
  text-align: center;
}

.brand-title {
  font-family: 'Georgia', serif;
  font-size: 3.5rem; /* 增大字体 */
  font-weight: bold;
  color: #000000;
  margin: 0 0 0.75rem 0; /* 调整margin */
  letter-spacing: 0.1em;
}

/* 新增Slogan样式 */
.brand-slogan {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: #4A4A4A; /* Slogan颜色可以稍深一些 */
  margin: 0 0 1rem 0;
  letter-spacing: 0.05em;
  font-weight: 400;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .brand-title {
    font-size: 2.8rem; /* 移动端标题大小 */
  }

  .brand-slogan {
    font-size: 0.875rem;
  }
}
```

### 步骤4: 在主页调用

确保 `app/page.tsx` 中调用 `BrandLogo` 组件时，不再传递 `showSubtitle` prop。

```jsx
// app/page.tsx

// ...
      {/* ==================== 品牌Logo展示 ==================== */}
      <BrandLogo />
// ...
```

## 5. 验收标准

- [ ] 首页顶部的「修身 · 齐家 · 证道」文字已移除。
- [ ] 「证道」标题下方显示新的Slogan: 「第一个Web3的成长变现应用」。
- [ ] 「证道」标题明显变大，视觉冲击力更强。
- [ ] Logo、标题、Slogan整体在页面上居中显示，尤其是在移动端视图下，保持垂直和水平居中。
