# 技术实现文档: TASK-UI-04 移除UI中的符号

## 1. 目标

提升UI的整体简洁性和专业性，移除在V3.0版本中出现的一些不美观或多余的符号，如箭头（→）和省略号（...）。

## 2. 涉及文件

- `app/page.tsx` (主页快捷导航)
- `components/profile/SBTShowcase.tsx` (或相关组件)
- `components/ComingSoonShowcase.tsx` (或相关组件)
- 其他可能使用了类似符号的组件。

## 3. 修改需求

1.  **快捷导航**: 移除个人主页、周期复盘、成就系统等快捷导航按钮后的箭头符号。
2.  **Coming Soon**: 移除“更多功能推出...”上方的省略号或类似装饰性符号。
3.  **全局检查**: 检查项目中其他地方是否也存在类似的不必要的符号，并一并移除。

## 4. 实现步骤

### 步骤1: 修改主页快捷导航 (`app/page.tsx`)

定位到主页的快捷导航区域，直接从按钮文本中删除箭头符号。

**修改前 (示例)**:
```jsx
<Link href="/profile" className="nav-button">个人主页 →</Link>
<Link href="/review" className="nav-button">周期复盘 →</Link>
```

**修改后**: 
```jsx
<Link href="/profile" className="nav-button">个人主页</Link>
<Link href="/review" className="nav-button">周期复盘</Link>
```

### 步骤2: 修改 Coming Soon 板块

找到 `ComingSoonShowcase.tsx` 或在主页上实现 Coming Soon 功能的组件，移除顶部的装饰性符号。

**修改前 (示例)**:
```jsx
<div>
  <p className="text-2xl">...</p> {/* <--- 移除这个 */}
  <h3 className="text-xl">更多功能 敬请期待</h3>
</div>
```

**修改后**: 
```jsx
<div>
  <h3 className="text-xl">更多功能 敬请期待</h3>
</div>
```

### 步骤3: 修改个人主页中的 SBT 展示

检查 `components/profile/SBTShowcase.tsx`，确保在展示SBT成就时，标题或描述中没有不必要的符号。

**修改前 (示例)**:
```jsx
<p>已领取SBT →</p>
```

**修改后**: 
```jsx
<p>已领取SBT</p>
```

### 步骤4: 全局搜索和替换

为了确保彻底清理，可以在整个项目（特别是 `components` 和 `app` 目录）中搜索以下字符，并逐一审查和修改：

- `→`
- `...` (需要小心，避免误删代码中的扩展运算符)
- `=>` (在文本中，非代码)
- `>>`

## 5. 验收标准

- [ ] 主页的快捷导航按钮（个人主页、周期复盘、成就）后不再有箭头符号。
- [ ] “更多功能推出”或“Coming Soon”板块上方不再有省略号或其他装饰性符号。
- [ ] 个人主页的SBT展示区域，以及其他任何UI文本中，均已移除了不必要的箭头或类似符号。
- [ ] 整个应用的UI文本看起来更加干净、简洁。
