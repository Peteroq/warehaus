'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { Menu, MessageCircle } from 'lucide-react';

const TABS: { label: string; value: ActiveTab }[] = [
  { label: 'DEVELOP', value: 'develop' },
  { label: 'DREAM', value: 'dream' },
  { label: 'DESIGN', value: 'design' },
];

export function BottomNav() {
  const { activeTab, setActiveTab, toggleMenu, menuOpen, toggleChatOverlay } = useLayout();
  const tabRefs = useRef<Map<ActiveTab, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const updatePill = useCallback(() => {
    if (!containerRef.current) return;
    const el = tabRefs.current.get(activeTab);
    if (!el) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const tabRect = el.getBoundingClientRect();
    setPill({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
  }, [activeTab]);

  useEffect(() => {
    updatePill();
    const timer = setTimeout(updatePill, 50);
    return () => clearTimeout(timer);
  }, [updatePill]);

  useEffect(() => {
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0a0a0a] backdrop-blur-2xl border-t border-white/15"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {/* Menu button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.1] transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Tab slider */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Content tabs"
        className="relative flex items-center gap-0.5 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-1"
      >
        {/* Sliding pill */}
        {pill && (
          <div
            className="absolute top-1 h-[calc(100%-8px)] rounded-xl bg-white/[0.12] border border-white/[0.1] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: `${pill.left}px`, width: `${pill.width}px` }}
          />
        )}

        {TABS.map(({ label, value }) => {
          const isActive = activeTab === value;
          return (
            <button
              key={value}
              ref={(el) => { if (el) tabRefs.current.set(value, el); }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${value}`}
              onClick={() => setActiveTab(value)}
              className={`relative z-10 px-4 py-2 text-xs font-bold tracking-wider rounded-xl transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Chat button */}
      <button
        type="button"
        onClick={toggleChatOverlay}
        aria-label="Open chat"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 border border-accent/25 text-accent hover:bg-accent/25 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </nav>
  );
}
