'use client';

import { createContext, useState, useContext, ReactNode, useMemo, useEffect, useCallback } from 'react';

interface SkipModeContextType {
  isSkipMode: boolean;
  isSkipModeReady: boolean;
  demoAddress: `0x${string}` | null;
  enableSkipMode: () => void;
  disableSkipMode: () => void;
}

const SkipModeContext = createContext<SkipModeContextType | undefined>(undefined);

const DEMO_WALLET_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;
const SKIP_MODE_STORAGE_KEY = 'zhengdao:skip-mode';

export function SkipModeProvider({ children }: { children: ReactNode }) {
  const [isSkipMode, setIsSkipMode] = useState(false);
  const [isSkipModeReady, setIsSkipModeReady] = useState(false);

  useEffect(() => {
    try {
      setIsSkipMode(window.sessionStorage.getItem(SKIP_MODE_STORAGE_KEY) === '1');
    } catch {
      setIsSkipMode(false);
    } finally {
      setIsSkipModeReady(true);
    }
  }, []);

  const enableSkipMode = useCallback(() => {
    try {
      window.sessionStorage.setItem(SKIP_MODE_STORAGE_KEY, '1');
    } catch {
      // sessionStorage 不可用时仍允许当前页进入体验模式。
    }
    setIsSkipMode(true);
  }, []);

  const disableSkipMode = useCallback(() => {
    try {
      window.sessionStorage.removeItem(SKIP_MODE_STORAGE_KEY);
    } catch {
      // 忽略存储失败，内存状态仍会退出体验模式。
    }
    setIsSkipMode(false);
  }, []);

  const value = useMemo(() => ({
    isSkipMode,
    isSkipModeReady,
    demoAddress: isSkipMode ? DEMO_WALLET_ADDRESS : null,
    enableSkipMode,
    disableSkipMode,
  }), [isSkipMode, isSkipModeReady, enableSkipMode, disableSkipMode]);

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
