'use client';

import { type ReactNode } from 'react';

interface SidebarPanelProps {
  active: boolean;
  height: number;
  mounted: boolean;
  children: ReactNode;
}

/**
 * A single full-height panel in the scroll-synced sidebar.
 * Fades to full opacity when active, invisible when not.
 */
export function SidebarPanel({ active, height, mounted, children }: SidebarPanelProps) {
  return (
    <div
      className={`flex flex-col py-6 transition-opacity duration-500 ease-in-out ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={mounted && height > 0 ? { height: `${height}px` } : undefined}
    >
      {children}
    </div>
  );
}
