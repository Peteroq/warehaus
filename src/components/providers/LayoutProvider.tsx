'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface LayoutContextValue {
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  isOnLight: boolean;
  setIsOnLight: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

const EXPANDED = 320;
const COLLAPSED = 72;

export { EXPANDED, COLLAPSED };

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOnLight, setIsOnLight] = useState(false);

  const toggleLeft = useCallback(() => setLeftCollapsed((p) => !p), []);
  const toggleRight = useCallback(() => setRightCollapsed((p) => !p), []);

  return (
    <LayoutContext.Provider
      value={{
        leftCollapsed,
        rightCollapsed,
        toggleLeft,
        toggleRight,
        scrollProgress,
        setScrollProgress,
        activeSection,
        setActiveSection,
        isOnLight,
        setIsOnLight,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used within <LayoutProvider>');
  return ctx;
}
