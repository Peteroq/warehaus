'use client';

import { type ReactNode } from 'react';

interface TabCyclePanelProps {
  activeIndex: number;
  children: ReactNode[];
}

/**
 * Cycles through child panels with a fade + slide transition.
 * Used inside a SidebarPanel for sections with rotating content
 * (e.g., the home hero cycling through Dream/Design/Develop tabs).
 *
 * Usage:
 *   <TabCyclePanel activeIndex={heroTabIndex}>
 *     <SectionBlock data={tab0} isOnLight={isOnLight} />
 *     <SectionBlock data={tab1} isOnLight={isOnLight} />
 *     <SectionBlock data={tab2} isOnLight={isOnLight} />
 *   </TabCyclePanel>
 */
export function TabCyclePanel({ activeIndex, children }: TabCyclePanelProps) {
  return (
    <div className="relative flex-1">
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex flex-col transition-all duration-500 ${
            i === activeIndex
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
