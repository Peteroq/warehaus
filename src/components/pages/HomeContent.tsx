'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
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

  // Only use wheel plugin on desktop
  const plugins = useMemo(() => {
    if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
      return [WheelGesturesPlugin({ forceWheelAxis: 'x' })];
    }
    return [];
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    duration: 8,          // Very fast snap (native-app feel)
    skipSnaps: false,
    containScroll: 'keepSnaps',
    dragThreshold: 5,     // Responsive — start tracking drag quickly
    watchDrag: true,
  }, plugins);

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

  // Sync: embla → tab state in real-time during drag
  const lastTabRef = useRef(activeTab);
  lastTabRef.current = activeTab;

  const onScroll = useCallback(() => {
    if (!emblaApi || isProgrammatic.current) return;
    const progress = emblaApi.scrollProgress();
    const floatIndex = progress * (TABS.length - 1);
    const nearestIndex = Math.round(floatIndex);
    const clamped = Math.max(0, Math.min(nearestIndex, TABS.length - 1));
    const newTab = TABS[clamped];
    if (newTab && newTab !== lastTabRef.current) {
      setActiveTab(newTab);
    }
  }, [emblaApi, setActiveTab]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    if (isProgrammatic.current) {
      isProgrammatic.current = false;
      return;
    }
    const index = emblaApi.selectedScrollSnap();
    const newTab = TABS[index];
    if (newTab && newTab !== lastTabRef.current) {
      setActiveTab(newTab);
    }
  }, [emblaApi, setActiveTab]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('scroll', onScroll);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onScroll, onSelect]);

  // Prevent vertical scroll on panels while dragging horizontally
  useEffect(() => {
    if (!emblaApi) return;

    const panelEls = [dreamRef.current, designRef.current, developRef.current];

    const disableVerticalScroll = () => {
      panelEls.forEach((el) => {
        if (el) el.style.overflowY = 'hidden';
      });
    };

    const enableVerticalScroll = () => {
      panelEls.forEach((el) => {
        if (el) el.style.overflowY = 'auto';
      });
    };

    emblaApi.on('pointerDown', disableVerticalScroll);
    emblaApi.on('settle', enableVerticalScroll);
    // Also re-enable if drag is released without settling on a new slide
    emblaApi.on('pointerUp', () => {
      requestAnimationFrame(enableVerticalScroll);
    });

    return () => {
      emblaApi.off('pointerDown', disableVerticalScroll);
      emblaApi.off('settle', enableVerticalScroll);
    };
  }, [emblaApi]);

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
      className="w-full h-[100dvh] overflow-hidden"
      ref={emblaRef}
      style={{ touchAction: 'pan-y pinch-zoom', WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex h-full backface-hidden" style={{ touchAction: 'pan-y pinch-zoom' }}>
        {TABS.map((tab) => (
          <div
            key={tab}
            id={`tabpanel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            ref={refs[tab]}
            className="h-full min-w-0 shrink-0 grow-0 basis-full overflow-y-auto overscroll-y-contain"
            style={{
              scrollbarGutter: 'stable',
              WebkitOverflowScrolling: 'touch',
            }}
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
