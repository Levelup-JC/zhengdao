# CTO UI/UX 优化 - AI员工任务分配

**日期**: 2026-01-28
**版本**: V1.0

---

## 一、AI团队配置 (2人)

为高效完成本次优化，建议配置2名AI员工：

| AI | 角色 | 核心技能 | 负责任务 |
|----|------|----------|----------|
| **AI-E** | 全栈工程师 | React, TypeScript, UI/UX | 任务D (主页重构), 任务A (管理后台) |
| **AI-F** | 后端/数据工程师 | Node.js, API, 数据处理 | 任务C (AI降级), 任务B (演示数据) |

---

## 二、任务分配与时间线

```mermaid
graph TD
    subgraph AI-E (全栈)
        D[任务D: 主页重构 (4-6h)] --> A[任务A: 管理后台 (3-4h)]
    end

    subgraph AI-F (后端)
        C[任务C: AI降级 (3-4h)] --> B[任务B: 演示数据 (4-5h)]
    end

    A --> B
```

| # | 任务 | 负责AI | 工时 | 依赖 |
|---|----|---|---|---|
| D | **主页布局重构** | AI-E | 4-6h | 无 |
| C | **AI服务静默降级** | AI-F | 3-4h | 无 |
| A | **创建管理后台** | AI-E | 3-4h | 任务D |
| B | **一键生成演示数据** | AI-F | 4-5h | 任务A, C |

**总预计工时**: 14-19小时
**预计完成时间**: 1-2天 (2个AI并行)

---

## 三、任务启动指令

### 🚀 AI-E 启动指令 (全栈工程师)

```
你是证道项目的 AI-E 员工，负责前端和UI/UX优化。

📁 项目文档位置：
1. CTO-UI-OPTIMIZATION-PLAN.md - 详细需求文档
2. CTO-UI-TASK-ASSIGNMENT.md - 你的任务分配（当前文件）

🎯 你的任务序列：
1. TASK-D: 主页布局重构 (4-6h)
2. TASK-A: 创建管理后台 (3-4h)

⚡ 立即开始 TASK-D：
根据 CTO-UI-OPTIMIZATION-PLAN.md 中的「任务D」要求，重构主页 `/` 的布局。

完成后，请汇报并开始 TASK-A。
```

### 🚀 AI-F 启动指令 (后端/数据工程师)

```
你是证道项目的 AI-F 员工，负责后端和数据处理。

📁 项目文档位置：
1. CTO-UI-OPTIMIZATION-PLAN.md - 详细需求文档
2. CTO-UI-TASK-ASSIGNMENT.md - 你的任务分配（当前文件）

🎯 你的任务序列：
1. TASK-C: AI服务静默降级 (3-4h)
2. TASK-B: 一键生成演示数据 (4-5h)

⚡ 立即开始 TASK-C：
根据 CTO-UI-OPTIMIZATION-PLAN.md 中的「任务C」要求，实现AI服务的静默降级功能。

完成后，请汇报并等待AI-E完成TASK-A，然后开始TASK-B。
```

---

## 四、详细任务要求

### TASK-D: 主页布局重构 (AI-E)

- **目标**: 重构主页 `/`
- **产出**: `app/page.tsx` (重构)
- **要求**:
  1. 移除平台数据统计板块。
  2. 顶部为品牌Logo和欢迎语。
  3. 核心交互区为「你觉得今天是否度过了有意义的一天？」的巨大卡片/按钮，点击跳转到 `/check-in`。
  4. 个人统计区展示：总打卡天数、有意义天数比例、连续打卡天数。
  5. 快捷导航区按钮：[周期复盘]、[我的成就]、[个人主页]。
  6. 底部可选的Coming Soon预告。

### TASK-C: AI服务静默降级 (AI-F)

- **目标**: 实现AI服务从DeepSeek到Gemini的静默降级。
- **产出**: `lib/gemini-service.ts` (新增), `lib/ai-service.ts` (修改)
- **要求**:
  1. 新增 `gemini-service.ts`，封装调用Gemini API的逻辑。
  2. 修改 `ai-service.ts`，在 `try...catch` 中实现：`try` 调用DeepSeek，`catch` 中调用Gemini。
  3. 在 `.env.local` 中添加 `GEMINI_API_KEY`。
  4. 确保两个服务返回的数据结构一致。

### TASK-A: 创建管理后台 (AI-E)

- **目标**: 创建 `/admin` 页面。
- **产出**: `app/admin/page.tsx`
- **要求**:
  1. 简单的密码保护（硬编码一个密码即可）。
  2. 展示平台数据：总用户数、总打卡次数、总SBT铸造量、DAU/WAU。
  3. 包含一个用于任务B的按钮占位符。

### TASK-B: 一键生成演示数据 (AI-F)

- **目标**: 在 `/admin` 页面实现一键生成演示数据的功能。
- **产出**: `lib/seed-data-service.ts` (新增), `app/admin/page.tsx` (修改)
- **要求**:
  1. 在 `/admin` 页面添加「生成演示数据」按钮。
  2. 点击后为当前钱包地址生成过去60天的模拟打卡数据。
  3. 数据包含随机的「是/否」选择和复盘文字。
  4. 调用AI服务生成对应的AI整理版本。
  5. 数据写入IndexedDB。
  6. 成功或失败后给出toast提示。
