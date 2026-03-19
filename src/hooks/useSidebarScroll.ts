'use client';

import { useEffect, useState, useRef } from 'react';
import { useLayout } from '@/components/providers/LayoutProvider';

/**
 * Measures the scroll container and returns the translateY value
 * that keeps the sidebar content in sync with the main page scroll.
 *
 * Usage:
 *   const { containerRef, containerHeight, translateY, mounted } = useSidebarScroll();
 *   <div ref={containerRef}>
 *     <div style={{ transform: `translateY(${translateY}px)` }}> ... </div>
 *   </div>
 */
export function useSidebarScroll() {
  const { sectionProgress } = useLayout();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      if (containerRef.current) setContainerHeight(containerRef.current.clientHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const translateY = mounted ? -(sectionProgress * containerHeight) : 0;

  return { containerRef, containerHeight, translateY, mounted };
}
