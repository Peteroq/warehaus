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
  const isExternalChange = useRef(false);

  const dreamRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);

  const refs: Record<ActiveTab, React.RefObject<HTMLDivElement | null>> = {
    dream: dreamRef,
    design: designRef,
    develop: developRef,
  };

  // Embla carousel — smooth drag with velocity-based snapping
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      dragFree: false,
      duration: 20,
      skipSnaps: false,
      containScroll: 'keepSnaps',
      dragThreshold: 3,
      startIndex: TAB_INDEX[activeTab],
    },
    [WheelGesturesPlugin({ wheelDraggingClass: '' })]
  );

  // Scroll observer — only active tab writes to context
  useScrollObserver(dreamRef, activeTab === 'dream');
  useScrollObserver(designRef, activeTab === 'design');
  useScrollObserver(developRef, activeTab === 'develop');

  // Sync Embla → tab state (fires during drag for real-time updates)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      const tab = TABS[index];
      if (tab && tab !== activeTab) {
        isExternalChange.current = true;
        setActiveTab(tab);
      }
    };

    // 'select' fires when the snap target changes (even mid-drag)
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, activeTab, setActiveTab]);

  // Sync tab state → Embla (when tab changes from BottomNav clicks)
  useEffect(() => {
    if (!emblaApi) return;
    if (isExternalChange.current) {
      isExternalChange.current = false;
      return;
    }
    const targetIndex = TAB_INDEX[activeTab];
    if (emblaApi.selectedScrollSnap() !== targetIndex) {
      emblaApi.scrollTo(targetIndex);
    }
  }, [emblaApi, activeTab]);

  // Disable vertical scroll on panels while dragging horizontally
  useEffect(() => {
    if (!emblaApi) return;

    const panels = [dreamRef, designRef, developRef];

    const lockVerticalScroll = () => {
      panels.forEach((ref) => {
        if (ref.current) ref.current.style.overflowY = 'hidden';
      });
    };

    const unlockVerticalScroll = () => {
      panels.forEach((ref) => {
        if (ref.current) ref.current.style.overflowY = 'auto';
      });
    };

    emblaApi.on('pointerDown', lockVerticalScroll);
    emblaApi.on('settle', unlockVerticalScroll);
    emblaApi.on('pointerUp', unlockVerticalScroll);

    return () => {
      emblaApi.off('pointerDown', lockVerticalScroll);
      emblaApi.off('settle', unlockVerticalScroll);
      emblaApi.off('pointerUp', unlockVerticalScroll);
    };
  }, [emblaApi]);

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

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {TABS.map((tab) => (
            <div
              key={tab}
              id={`tabpanel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              ref={refs[tab]}
              className="h-full overflow-y-auto shrink-0 basis-full min-w-0"
              style={{ scrollbarGutter: 'stable' }}
            >
              {tab === 'dream' && <DreamContent />}
              {tab === 'design' && <DesignContent />}
              {tab === 'develop' && <DevelopContent />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
