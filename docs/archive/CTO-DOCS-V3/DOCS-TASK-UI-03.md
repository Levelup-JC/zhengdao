# 技术实现文档: TASK-UI-03 打卡流程反馈和结果展示

## 1. 目标

优化每日打卡流程的用户体验。在用户输入复盘文字并提交后，提供明确的AI处理中状态反馈，并展示AI整理后的结果供用户预览和确认，然后再进入下一步。

## 2. 核心问题

当前流程在用户提交文本后，直接进入了一个空白的“处理中”状态，并且即使用户的 `check-in/page.tsx` 中有 `setStep("preview")` 的逻辑，但似乎没有对应的UI来展示 `AIPreview` 组件，导致流程卡住。

## 3. 实现步骤

### 步骤1: 完善 `CheckInStep` 类型

确保 `app/check-in/page.tsx` 中的步骤类型定义完整。

```typescript
// app/check-in/page.tsx

type CheckInStep = 'question' | 'input' | 'processing' | 'preview' | 'photo' | 'completed';
```

### 步骤2: 创建明确的 `ProcessingStep` 组件

为了提供更好的反馈，我们创建一个专门用于展示“处理中”状态的组件。

```tsx
// components/check-in/ProcessingStep.tsx

import { motion } from 'framer-motion';

export function ProcessingStep() {
  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="text-4xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      >
        🤖
      </motion.div>
      <h2 className="text-2xl font-bold font-serif">AI正在整理您的复盘...</h2>
      <p className="text-ink/60">请稍候，这通常需要几秒钟。</p>
    </motion.div>
  );
}
```

### 步骤3: 确保 `AIPreview` 组件被正确渲染

`AIPreview` 组件应该在 `preview` 步骤时显示，并提供“确认”和“返回编辑”的按钮。

```tsx
// components/check-in/AIPreview.tsx

// ... imports

export function AIPreview({ structuredData, onConfirm, onEdit, isSaving }) {
  return (
    <motion.div /* ... */ >
      <h2 /* ... */ >AI复盘总结</h2>
      
      {/* 展示AI生成的标题、摘要、关键词等 */}
      <div className="ai-summary-card">
        <h3>{structuredData.title}</h3>
        <p>{structuredData.summary}</p>
        <div>
          {structuredData.keywords.map(k => <span key={k}>{k}</span>)}
        </div>
      </div>

      <div className="button-group">
        <button onClick={onEdit} disabled={isSaving}>返回编辑</button>
        <button onClick={onConfirm} disabled={isSaving}>
          {isSaving ? '保存中...' : '确认并继续'}
        </button>
      </div>
    </motion.div>
  );
}
```

### 步骤4: 调整 `app/check-in/page.tsx` 的渲染逻辑

在主页面中，根据 `step` 状态渲染不同的组件。

```tsx
// app/check-in/page.tsx

// ... imports
import { ProcessingStep } from '@/components/check-in/ProcessingStep';

export default function CheckInPage() {
  // ... state and handlers

  const renderStep = () => {
    switch (step) {
      case 'question':
        return <DailyQuestion onAnswer={handleQuestionAnswer} />;
      case 'input':
        return <ReflectionInput onSubmit={handleContentSubmit} initialContent={content} />;
      case 'processing':
        return <ProcessingStep />;
      case 'preview':
        return (
          <AIPreview
            structuredData={structuredData}
            onConfirm={handlePreviewConfirm}
            onEdit={handleEdit}
            isSaving={isSaving}
          />
        );
      case 'photo':
        return <PhotoUpload onComplete={handlePhotoComplete} />;
      case 'completed':
        return <div>今日打卡已完成！</div>;
      default:
        return null;
    }
  };

  return (
    <div className="check-in-container">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
```

### 步骤5: 完善 `handleContentSubmit` 逻辑

确保在API调用失败时，能返回到输入步骤，并给出提示。

```typescript
// app/check-in/page.tsx

const handleContentSubmit = async (inputContent: string) => {
  setContent(inputContent);
  setStep('processing');
  setIsProcessing(true);

  try {
    const response = await fetch('/api/reflect/process', /* ... */);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'AI处理失败');
    }

    setStructuredData(result.data);
    setStep('preview'); // <--- 成功后进入预览步骤

  } catch (error) {
    toast.error(error.message);
    setStep('input'); // <--- 失败后返回输入步骤
  } finally {
    setIsProcessing(false);
  }
};
```

## 5. 验收标准

- [ ] 用户在输入复盘文字并点击“继续”后，页面显示一个清晰的加载动画和提示文字（例如“AI正在整理...”）。
- [ ] AI处理成功后，页面自动跳转到预览界面，展示AI生成的标题、摘要、关键词等。
- [ ] 预览界面包含“确认并继续”和“返回编辑”两个按钮。
- [ ] 点击“返回编辑”，可以回到文本输入框，并保留之前输入的内容。
- [ ] 点击“确认并继续”，流程可以正常进入下一步（例如照片上传或完成）。
- [ ] 如果AI处理失败，页面应返回到文本输入框，并显示一个错误提示。
