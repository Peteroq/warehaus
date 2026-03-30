'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { useScrollObserver } from '@/hooks/useScrollObserver';
import { DreamContent } from '@/components/pages/DreamContent';
import { DesignContent } from '@/components/pages/DesignContent';
import { DevelopContent } from '@/components/pages/DevelopContent';

const TABS: ActiveTab[] = ['dream', 'design', 'develop'];

const TAB_INDEX: Record<ActiveTab, number> = {
  dream: 0,
  design: 1,
  develop: 2,
};

export function HomeContent() {
  const { activeTab, setActiveTab } = useLayout();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dreamRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);
  const isProgammaticScroll = useRef(false);

  const refs: Record<ActiveTab, React.RefObject<HTMLDivElement | null>> = {
    dream: dreamRef,
    design: designRef,
    develop: developRef,
  };

  // Scroll observer — only active tab writes to context
  useScrollObserver(dreamRef, activeTab === 'dream');
  useScrollObserver(designRef, activeTab === 'design');
  useScrollObserver(developRef, activeTab === 'develop');

  // Read ?tab= param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab | null;
    if (tabParam && TABS.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [setActiveTab]);

  // URL sync on tab change
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);

  // Scroll to the active tab's panel when tab changes (from BottomNav clicks)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetIndex = TAB_INDEX[activeTab];
    const targetLeft = targetIndex * container.offsetWidth;

    // Only scroll if we're not already at the right position
    if (Math.abs(container.scrollLeft - targetLeft) > 2) {
      isProgammaticScroll.current = true;
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Detect when swipe/scroll settles on a new panel and update active tab
  const handleScrollEnd = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // If this was a programmatic scroll, just clear the flag
    if (isProgammaticScroll.current) {
      isProgammaticScroll.current = false;
      return;
    }

    const panelWidth = container.offsetWidth;
    const index = Math.round(container.scrollLeft / panelWidth);
    const clamped = Math.max(0, Math.min(index, TABS.length - 1));
    const newTab = TABS[clamped];

    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [activeTab, setActiveTab]);

  // Listen for scrollend (modern browsers) with fallback
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Modern browsers support 'scrollend'
    if ('onscrollend' in window) {
      container.addEventListener('scrollend', handleScrollEnd);
      return () => container.removeEventListener('scrollend', handleScrollEnd);
    }

    // Fallback: debounce scroll events
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 100);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      container.removeEventListener('scroll', onScroll);
    };
  }, [handleScrollEnd]);

  // Reset vertical scroll to top on tab switch
  useEffect(() => {
    const panel = refs[activeTab]?.current;
    if (panel) {
      panel.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-[100dvh] flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none"
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
    >
      {TABS.map((tab) => (
        <div
          key={tab}
          id={`tabpanel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          ref={refs[tab]}
          className="h-full w-full shrink-0 snap-start snap-always overflow-y-auto"
          style={{ scrollbarGutter: 'stable' }}
        >
          {tab === 'dream' && <DreamContent />}
          {tab === 'design' && <DesignContent />}
          {tab === 'develop' && <DevelopContent />}
        </div>
      ))}
    </div>
  );
}
