'use client';

import { type ReactNode } from 'react';
import { useSidebarScroll } from '@/hooks/useSidebarScroll';

interface ScrollSyncedPanelProps {
  children: (ctx: { containerHeight: number; mounted: boolean }) => ReactNode;
}

/**
 * Container that translates its children in sync with the main page scroll.
 * Takes a render function so children can access containerHeight/mounted.
 *
 * Usage:
 *   <ScrollSyncedPanel>
 *     {({ containerHeight, mounted }) => (
 *       <SidebarPanel active={...} height={containerHeight} mounted={mounted}>
 *         ...
 *       </SidebarPanel>
 *     )}
 *   </ScrollSyncedPanel>
 */
export function ScrollSyncedPanel({ children }: ScrollSyncedPanelProps) {
  const { containerRef, containerHeight, translateY, mounted } = useSidebarScroll();

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden relative">
      <div
        className="will-change-transform"
        style={mounted ? { transform: `translateY(${translateY}px)` } : undefined}
      >
        {children({ containerHeight, mounted })}
      </div>
    </div>
  );
}
