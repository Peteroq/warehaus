'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayout } from '@/components/providers/LayoutProvider';
import { Home, BookOpen, DoorOpen, Users } from 'lucide-react';

const MENU_ITEMS = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BookOpen, label: 'Codex', href: '/codex' },
  { icon: Users, label: 'About', href: '/about' },
  { icon: DoorOpen, label: 'Contact', href: '/contact' },
];

export function MenuOverlay() {
  const { menuOpen, toggleMenu } = useLayout();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    if (menuOpen) toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleMenu();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen, toggleMenu]);

  // Click outside to close
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };
    // Defer to avoid catching the toggle click itself
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [menuOpen, toggleMenu]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Menu panel — opens upward from bottom-left */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Navigation menu"
        className={`fixed left-3 z-50 rounded-2xl bg-[#111]/95 backdrop-blur-2xl border border-white/[0.1] shadow-[0_0_40px_rgba(0,0,0,0.5)] p-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ bottom: 'calc(64px + max(0.5rem, env(safe-area-inset-bottom)))' }}
      >
        <nav className="flex flex-col gap-0.5 min-w-[200px]">
          {MENU_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/[0.1] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
