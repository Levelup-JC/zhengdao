# 技术实现文档: TASK-UI-02 体验模式的钱包检查修复

## 1. 目标

修复在“体验模式”下，进入某些页面（如打卡页、个人主页）时，依然会触发“请连接钱包”提示的问题。确保用户在选择了体验模式后，可以无中断地浏览和使用核心功能。

## 2. 核心问题

当前，`isSkipMode` 状态是 `app/page.tsx` 的一个本地状态 (`useState`)。当路由切换到其他页面时，这个状态会丢失，导致其他页面的 `useAccount()` hook 返回 `isConnected: false`，从而触发钱包连接提示。

## 3. 解决方案：全局状态管理

我们需要一个全局的状态来管理“体验模式”。这里推荐使用 React Context，因为它轻量且不需要引入新的库。

## 4. 实现步骤

### 步骤1: 创建 `SkipModeContext`

在 `lib/` 目录下创建一个新文件 `context/SkipModeContext.tsx`。

```tsx
// lib/context/SkipModeContext.tsx

'use client';

import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface SkipModeContextType {
  isSkipMode: boolean;
  demoAddress: `0x${string}` | null;
  enableSkipMode: () => void;
  disableSkipMode: () => void;
}

const SkipModeContext = createContext<SkipModeContextType | undefined>(undefined);

const DEMO_WALLET_ADDRESS = '0x1234567890123456789012345678901234567890' as `0x${string}`;

export function SkipModeProvider({ children }: { children: ReactNode }) {
  const [isSkipMode, setIsSkipMode] = useState(false);

  const enableSkipMode = () => {
    setIsSkipMode(true);
  };

  const disableSkipMode = () => {
    setIsSkipMode(false);
  };

  const value = useMemo(() => ({
    isSkipMode,
    demoAddress: isSkipMode ? DEMO_WALLET_ADDRESS : null,
    enableSkipMode,
    disableSkipMode,
  }), [isSkipMode]);

  return (
    <SkipModeContext.Provider value={value}>
      {children}
    </SkipModeContext.Provider>
  );
}

export function useSkipMode() {
  const context = useContext(SkipModeContext);
  if (context === undefined) {
    throw new Error('useSkipMode must be used within a SkipModeProvider');
  }
  return context;
}
```

### 步骤2: 在主布局中包裹 `SkipModeProvider`

修改 `app/layout.tsx`，将 `SkipModeProvider` 添加到 `WagmiProvider` 内部，以便所有页面都可以访问它。

```tsx
// app/layout.tsx

// ... imports
import { SkipModeProvider } from '@/lib/context/SkipModeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <SkipModeProvider>  {/* <--- 添加在这里 */}
            {children}
          </SkipModeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
```

### 步骤3: 修改 `app/page.tsx` 使用全局状态

移除本地的 `isSkipMode` 和 `skipWalletAddress` 状态，改用 `useSkipMode` hook。

```tsx
// app/page.tsx

// ... imports
import { useSkipMode } from '@/lib/context/SkipModeContext';

function HomePageContent() {
  // ...
  const { isSkipMode, demoAddress, enableSkipMode, disableSkipMode } = useSkipMode();
  const { address, isConnected } = useAccount();

  // 移除本地状态
  // const [isSkipMode, setIsSkipMode] = useState(false);
  // const [skipWalletAddress, setSkipWalletAddress] = useState<string | null>(null);

  const effectiveAddress = address || demoAddress;

  // ...

  // 修改“跳过”按钮的点击事件
  <button
    onClick={enableSkipMode} // <--- 修改这里
    // ...
  >
    跳过 / 体验模式
  </button>

  // 修改“退出”按钮的点击事件
  <button
    onClick={() => {
      if (isSkipMode) {
        disableSkipMode(); // <--- 修改这里
      } else {
        disconnect();
      }
    }}
    // ...
  >
    {isSkipMode ? '退出' : '断开'}
  </button>

  // ...
}
```

### 步骤4: 修改其他需要检查登录状态的页面

现在，在 `check-in`、`profile`、`review` 等页面，我们可以同时检查 `isConnected` 和 `isSkipMode`。

**示例: `app/check-in/page.tsx`**

```tsx
// app/check-in/page.tsx

// ... imports
import { useSkipMode } from '@/lib/context/SkipModeContext';

export default function CheckInPage() {
  // ...
  const { address, isConnected } = useAccount();
  const { isSkipMode, demoAddress } = useSkipMode();

  const effectiveAddress = address || demoAddress;

  // ...

  // 修改钱包检查逻辑
  if (!isConnected && !isSkipMode) { // <--- 修改这里
    return (
      <div>
        <h1>请先连接钱包或返回首页选择体验模式</h1>
        <button onClick={() => router.push('/')}>返回首页</button>
      </div>
    );
  }

  // ...
}
```

对 `app/profile/page.tsx` 和 `app/review/[period]/page.tsx` 等页面做类似修改。

## 5. 验收标准

- [ ] 创建了 `lib/context/SkipModeContext.tsx` 并正确配置。
- [ ] `app/layout.tsx` 中已添加 `SkipModeProvider`。
- [ ] `app/page.tsx` 已移除本地的 `isSkipMode` 状态，并改用全局Context。
- [ ] **测试场景**: 
  1.  在首页点击“跳过 / 体验模式”。
  2.  然后点击“你觉得今天是否度过了有意义的一天？”按钮。
  3.  **预期结果**: 能够顺利进入 `/check-in` 页面，而不会弹出“请连接钱包”的提示。
  4.  在体验模式下，能够访问个人主页、复盘等页面，都不会触发钱包连接提示。
