'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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
  sectionProgress: number;
  setSectionProgress: (v: number) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  isOnLight: boolean;
  setIsOnLight: (v: boolean) => void;
  heroTabIndex: number;
  setHeroTabIndex: (v: number) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

const EXPANDED = 320;
const COLLAPSED = 72;

export { EXPANDED, COLLAPSED };

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOnLight, setIsOnLight] = useState(false);
  const [heroTabIndex, setHeroTabIndex] = useState(0);

  const toggleLeft = useCallback(() => setLeftCollapsed((p) => !p), []);
  const toggleRight = useCallback(() => setRightCollapsed((p) => !p), []);

  const value = useMemo<LayoutContextValue>(
    () => ({
      leftCollapsed,
      rightCollapsed,
      toggleLeft,
      toggleRight,
      scrollProgress,
      setScrollProgress,
      sectionProgress,
      setSectionProgress,
      activeSection,
      setActiveSection,
      isOnLight,
      setIsOnLight,
      heroTabIndex,
      setHeroTabIndex,
    }),
    [
      leftCollapsed,
      rightCollapsed,
      toggleLeft,
      toggleRight,
      scrollProgress,
      sectionProgress,
      activeSection,
      isOnLight,
      heroTabIndex,
    ],
  );

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used within <LayoutProvider>');
  return ctx;
}
