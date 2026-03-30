'use client';

import { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    duration: 20, // Lower = snappier (default 25)
    skipSnaps: false,
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin({ forceWheelAxis: 'x' })]);

  const isProgrammatic = useRef(false);

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

  // Sync: tab state → embla (from BottomNav clicks)
  useEffect(() => {
    if (!emblaApi) return;
    const targetIndex = TAB_INDEX[activeTab];
    if (emblaApi.selectedScrollSnap() !== targetIndex) {
      isProgrammatic.current = true;
      emblaApi.scrollTo(targetIndex);
    }
  }, [activeTab, emblaApi]);

  // Sync: embla → tab state (from swipe)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    if (isProgrammatic.current) {
      isProgrammatic.current = false;
      return;
    }
    const index = emblaApi.selectedScrollSnap();
    const newTab = TABS[index];
    if (newTab && newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [emblaApi, activeTab, setActiveTab]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  // Reset vertical scroll to top on tab switch
  useEffect(() => {
    const panel = refs[activeTab]?.current;
    if (panel) {
      panel.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="w-full h-[100dvh] overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {TABS.map((tab) => (
          <div
            key={tab}
            id={`tabpanel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            ref={refs[tab]}
            className="h-full min-w-0 shrink-0 grow-0 basis-full overflow-y-auto"
            style={{ scrollbarGutter: 'stable' }}
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
