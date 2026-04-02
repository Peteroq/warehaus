'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { useScrollObserver } from '@/hooks/useScrollObserver';
import { DreamContent } from '@/components/pages/DreamContent';
import { DesignContent } from '@/components/pages/DesignContent';
import { DevelopContent } from '@/components/pages/DevelopContent';

const TABS: ActiveTab[] = ['dream', 'design', 'develop'];
const TAB_INDEX: Record<ActiveTab, number> = { dream: 0, design: 1, develop: 2 };

export function HomeContent() {
  const { activeTab, setActiveTab } = useLayout();
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgScrolling = useRef(false);

  const dreamRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);
  const panelRefs = { dream: dreamRef, design: designRef, develop: developRef };

  // Scroll observers — only active tab writes to context
  useScrollObserver(dreamRef, activeTab === 'dream');
  useScrollObserver(designRef, activeTab === 'design');
  useScrollObserver(developRef, activeTab === 'develop');

  // Detect which slide is snapped via scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (isProgScrolling.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!el || isProgScrolling.current) return;
        const index = Math.round(el.scrollLeft / el.clientWidth);
        const tab = TABS[index];
        if (tab && tab !== activeTabRef.current) {
          setActiveTab(tab);
        }
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [setActiveTab]);

  // Tab click → scroll to slide
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = TAB_INDEX[activeTab] * el.clientWidth;
    if (Math.abs(el.scrollLeft - target) < 2) return;

    isProgScrolling.current = true;
    el.scrollTo({ left: target, behavior: 'smooth' });

    // Clear flag once scroll settles
    const clear = () => {
      if (Math.abs(el.scrollLeft - target) < 2) {
        isProgScrolling.current = false;
        el.removeEventListener('scroll', clear);
      }
    };
    el.addEventListener('scroll', clear, { passive: true });
    // Fallback timeout in case scroll event doesn't fire (already at target)
    const timeout = setTimeout(() => {
      isProgScrolling.current = false;
      el.removeEventListener('scroll', clear);
    }, 500);
    return () => {
      clearTimeout(timeout);
      el.removeEventListener('scroll', clear);
    };
  }, [activeTab]);

  // Read ?tab= from URL on mount
  useEffect(() => {
    const tabParam = new URLSearchParams(window.location.search).get('tab') as ActiveTab | null;
    if (tabParam && TABS.includes(tabParam)) {
      setActiveTab(tabParam);
      // Scroll instantly (no animation) on initial load
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: TAB_INDEX[tabParam] * el.clientWidth });
      });
    }
  }, [setActiveTab]);

  // Sync URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);

  // Reset panel scroll on tab switch
  useEffect(() => {
    panelRefs[activeTab]?.current?.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      <div
        ref={scrollRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-none overscroll-x-contain"
        style={{ scrollbarWidth: 'none', willChange: 'scroll-position' }}
      >
        {TABS.map((tab) => (
          <div
            key={tab}
            id={`tabpanel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            ref={panelRefs[tab]}
            className="h-full overflow-y-auto shrink-0 w-screen snap-start"
          >
            {tab === 'dream' && <DreamContent />}
            {tab === 'design' && <DesignContent />}
            {tab === 'develop' && <DevelopContent />}
          </div>
        ))}
      </div>
    </div>
  );
}
