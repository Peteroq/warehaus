'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ActiveTab = 'dream' | 'design' | 'develop';

interface LayoutContextValue {
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
  sectionProgress: number;
  setSectionProgress: (v: number) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  isOnLight: boolean;
  setIsOnLight: (v: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  menuOpen: boolean;
  toggleMenu: () => void;
  chatOverlayOpen: boolean;
  toggleChatOverlay: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOnLight, setIsOnLight] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dream');
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOverlayOpen, setChatOverlayOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);
  const toggleChatOverlay = useCallback(() => setChatOverlayOpen((p) => !p), []);

  const value = useMemo<LayoutContextValue>(
    () => ({
      scrollProgress,
      setScrollProgress,
      sectionProgress,
      setSectionProgress,
      activeSection,
      setActiveSection,
      isOnLight,
      setIsOnLight,
      activeTab,
      setActiveTab,
      menuOpen,
      toggleMenu,
      chatOverlayOpen,
      toggleChatOverlay,
    }),
    [
      scrollProgress,
      sectionProgress,
      activeSection,
      isOnLight,
      activeTab,
      menuOpen,
      toggleMenu,
      chatOverlayOpen,
      toggleChatOverlay,
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
