'use client';

import { useEffect, useRef } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { useScrollObserver } from '@/hooks/useScrollObserver';
import { DreamContent } from '@/components/pages/DreamContent';
import { DesignContent } from '@/components/pages/DesignContent';
import { DevelopContent } from '@/components/pages/DevelopContent';

const TABS: ActiveTab[] = ['develop', 'dream', 'design'];

const TAB_INDEX: Record<ActiveTab, number> = {
  develop: 0,
  dream: 1,
  design: 2,
};

export function HomeContent() {
  const { activeTab, setActiveTab } = useLayout();

  const dreamRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);

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

  // Reset scroll to top on tab switch
  useEffect(() => {
    const panel = refs[activeTab]?.current;
    if (panel) {
      panel.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const translateX = -(TAB_INDEX[activeTab] * 100);

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: `translateX(${translateX}vw)`,
        }}
      >
        {TABS.map((tab) => (
          <div
            key={tab}
            id={`tabpanel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            ref={refs[tab]}
            className="h-full overflow-y-auto shrink-0"
            style={{ width: '100vw', scrollbarGutter: 'stable' }}
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
