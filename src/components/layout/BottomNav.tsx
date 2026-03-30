'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { Menu, MessageCircle, ChevronDown } from 'lucide-react';

const TABS: { label: string; value: ActiveTab }[] = [
  { label: 'DREAM', value: 'dream' },
  { label: 'DESIGN', value: 'design' },
  { label: 'DEVELOP', value: 'develop' },
];

const TAB_COLORS: Record<ActiveTab, string> = {
  dream: 'text-purple-500',
  design: 'text-pink-500',
  develop: 'text-emerald-500',
};

export function BottomNav() {
  const { activeTab, setActiveTab, toggleMenu, menuOpen, toggleChatOverlay, chatOverlayOpen } = useLayout();
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Map<ActiveTab, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [indicators, setIndicators] = useState<Map<ActiveTab, { center: number }>>(new Map());

  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Update pill
    const el = tabRefs.current.get(activeTab);
    if (el) {
      const tabRect = el.getBoundingClientRect();
      setPill({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }

    // Update indicator positions for all tabs
    const newIndicators = new Map<ActiveTab, { center: number }>();
    tabRefs.current.forEach((btn, tab) => {
      const r = btn.getBoundingClientRect();
      newIndicators.set(tab, { center: r.left - containerRect.left + r.width / 2 });
    });
    setIndicators(newIndicators);
  }, [activeTab]);

  useEffect(() => {
    updatePositions();
    const timer = setTimeout(updatePositions, 50);
    return () => clearTimeout(timer);
  }, [updatePositions]);

  useEffect(() => {
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [updatePositions]);

  // Expose nav width as CSS variable for menu overlay
  useEffect(() => {
    if (!navRef.current) return;
    const w = navRef.current.offsetWidth;
    document.documentElement.style.setProperty('--nav-width', `${w}px`);
  });

  return (
    <nav
      ref={navRef}
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 px-4 pt-3 bg-transparent"
      style={{ bottom: '1.75rem' }}
    >
      {/* Menu button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/20 text-black/60 hover:text-black hover:bg-white/80 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Tab slider */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Content tabs"
        className="relative flex flex-col items-center gap-0.5 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/20 p-1"
      >
        {/* Floating indicators above tabs — positioned per tab */}
        {TABS.map(({ value }) => {
          const isActive = activeTab === value;
          const pos = indicators.get(value);
          const w = isActive ? 48 : 24;
          return (
            <div
              key={`indicator-${value}`}
              className="absolute -top-3 pointer-events-none"
              style={{
                left: pos ? `${pos.center - w / 2}px` : '50%',
                width: `${w}px`,
                transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1), width 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease',
              }}
            >
              <div
                className={`h-[5px] w-full rounded-full ${
                  isActive ? 'bg-white/90' : 'bg-white/30'
                }`}
              />
            </div>
          );
        })}

        {/* Tab buttons row */}
        <div className="flex items-center gap-0.5">
          {/* Sliding pill */}
          {pill && (
            <div
              className="absolute top-1 h-[calc(100%-8px)] rounded-xl bg-white/60 border border-white/40 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
                className={`relative z-10 w-20 text-center py-2 text-xs font-bold tracking-wider rounded-xl transition-colors duration-300 ${
                  isActive ? 'text-black' : 'text-black/40 hover:text-black/60'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat button */}
      <button
        type="button"
        onClick={toggleChatOverlay}
        aria-label={chatOverlayOpen ? 'Close chat' : 'Open chat'}
        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/20 hover:bg-white/80 transition-colors ${TAB_COLORS[activeTab]}`}
      >
        {chatOverlayOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </nav>
  );
}
