'use client';

import { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  Compass,
  Hammer,
  TowerControl,
  BookOpen,
  DoorOpen,
  AlignLeftIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLayout, EXPANDED, COLLAPSED } from '@/components/providers/LayoutProvider';

interface NavLink {
  icon: typeof HomeIcon;
  label: string;
  href: string;
  description: string;
  group?: string;
  accentClass?: string;
  accentColor?: string;
}

const NAV_LINKS: NavLink[] = [
  {
    icon: HomeIcon,
    label: 'HOME',
    href: '/',
    description: 'Welcome to the world of Warehaus — where dreams are forged into reality.',
  },
  {
    icon: Compass,
    label: 'DREAM',
    href: '/dream',
    description: 'The Navigator Realm. Chart vision into strategy.',
    group: 'PILLARS',
    accentClass: 'text-indigo-400',
    accentColor: '#818cf8',
  },
  {
    icon: Hammer,
    label: 'DESIGN',
    href: '/design',
    description: 'The Forge. Shape ideas into form.',
    group: 'PILLARS',
    accentClass: 'text-orange-400',
    accentColor: '#fb923c',
  },
  {
    icon: TowerControl,
    label: 'DEVELOP',
    href: '/develop',
    description: 'The High Tower. Build the impossible.',
    group: 'PILLARS',
    accentClass: 'text-yellow-400',
    accentColor: '#facc15',
  },
  {
    icon: BookOpen,
    label: 'CODEX',
    href: '/codex',
    description: 'The Codex of Creations. Our collected works.',
    accentColor: '#c084fc',
  },
  {
    icon: DoorOpen,
    label: 'CONTACT',
    href: '/contact',
    description: 'Step inside the house. Begin your journey with us.',
    accentColor: '#22d3ee',
  },
];

function isActiveRoute(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

/* ───────── Expandable nav item ───────── */
function NavItem({
  link,
  active,
  collapsed,
  isOnLight,
}: {
  link: NavLink;
  active: boolean;
  collapsed: boolean;
  isOnLight: boolean;
}) {
  const { icon: Icon, label, href, description, accentClass, accentColor } = link;
  const expandRef = useRef<HTMLDivElement>(null);

  // Animate height on expand/collapse
  useEffect(() => {
    const el = expandRef.current;
    if (!el) return;

    if (active && !collapsed) {
      // Expand: measure scrollHeight, animate to it
      el.style.height = '0px';
      el.style.opacity = '0';
      // Force reflow
      void el.offsetHeight;
      const target = el.scrollHeight;
      el.style.height = `${target}px`;
      el.style.opacity = '1';

      const onEnd = () => {
        el.style.height = 'auto';
      };
      el.addEventListener('transitionend', onEnd, { once: true });
      return () => el.removeEventListener('transitionend', onEnd);
    } else {
      // Collapse: if currently open, animate from current height to 0
      if (el.style.height === 'auto' || el.offsetHeight > 0) {
        const current = el.offsetHeight;
        el.style.height = `${current}px`;
        el.style.opacity = '1';
        void el.offsetHeight;
        el.style.height = '0px';
        el.style.opacity = '0';
      }
    }
  }, [active, collapsed]);

  return (
    <div>
      <Link
        href={href}
        title={label}
        className={`relative flex items-center text-sm font-bold transition-all duration-400 group rounded-xl px-3 py-2.5 ${
          collapsed ? 'justify-center' : 'gap-3'
        } ${
          active
            ? isOnLight
              ? 'text-gray-900 bg-black/5'
              : 'text-white bg-white/[0.06]'
            : isOnLight
              ? 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
        }`}
      >
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-all duration-400 ${
            active ? accentClass || '' : ''
          }`}
          style={active && accentColor ? { color: accentColor } : undefined}
        />
        {!collapsed && <span>{label}</span>}

        {/* Active dot — collapsed only */}
        {active && collapsed && (
          <div
            className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full transition-all duration-500"
            style={{ backgroundColor: accentColor || '#00e5ff' }}
          />
        )}
      </Link>

      {/* Expandable content — only rendered when sidebar is expanded */}
      {!collapsed && (
        <div
          ref={expandRef}
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="px-1 pt-2 pb-3">
            {/* Image card */}
            <Link
              href={href}
              className="block w-full h-28 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-orange-400 mb-2.5 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/40" />
                </div>
              </div>
            </Link>

            {/* Description */}
            <p
              className={`text-[10px] leading-relaxed transition-colors duration-500 ${
                isOnLight ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── Main Navbar ───────── */
export function Navbar() {
  const pathname = usePathname();
  const { leftCollapsed, toggleLeft, isOnLight } = useLayout();
  const width = leftCollapsed ? COLLAPSED : EXPANDED;

  // Build group dividers
  const navLinksWithDividers = NAV_LINKS.reduce<{
    lastGroup: string | undefined;
    items: { link: NavLink; divider: boolean }[];
  }>(
    (acc, link) => {
      const showDivider = !!(link.group && link.group !== acc.lastGroup);
      acc.items.push({ link, divider: showDivider });
      if (link.group) acc.lastGroup = link.group;
      else acc.lastGroup = undefined;
      return acc;
    },
    { lastGroup: undefined, items: [] },
  ).items;

  return (
    <div
      className="hidden md:block fixed top-0 left-0 z-50 h-screen p-5 pr-0 transition-all duration-300 ease-in-out"
      style={{ width: `${width}px` }}
    >
      <nav
        className={`flex flex-col h-full w-full backdrop-blur-2xl rounded-3xl relative overflow-hidden transition-all duration-500 ease-in-out ${
          isOnLight
            ? 'bg-black/5 border border-black/10 text-gray-900 shadow-[0_0_40px_rgba(0,0,0,0.08)]'
            : 'bg-white/5 border border-white/15 text-white shadow-[0_0_40px_rgba(0,0,0,0.3)]'
        }`}
      >
        <div className={`flex flex-col h-full ${leftCollapsed ? 'p-4 items-center' : 'p-7'} overflow-y-auto overflow-x-hidden`}>
          {/* Top Bar */}
          <div
            className={`flex-shrink-0 ${
              leftCollapsed
                ? 'flex flex-col items-center gap-4'
                : 'flex items-center justify-between'
            } mb-6`}
          >
            {leftCollapsed ? (
              <>
                <AlignLeftIcon className="w-6 h-6 rotate-90" />
                <button
                  onClick={toggleLeft}
                  className={`w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 border ${
                    isOnLight
                      ? 'bg-white/60 hover:bg-white/80 border-black/10'
                      : 'bg-black/20 hover:bg-black/30 border-white/10'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="flex items-center gap-2">
                  <AlignLeftIcon className="w-6 h-6 rotate-90" />
                  <span className="font-bold text-xl tracking-wide whitespace-nowrap">
                    warehaus
                  </span>
                </Link>
                <button
                  onClick={toggleLeft}
                  className={`w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 border ${
                    isOnLight
                      ? 'bg-white/60 hover:bg-white/80 border-black/10'
                      : 'bg-black/20 hover:bg-black/30 border-white/10'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Nav Links */}
          <div className={`flex-1 flex flex-col gap-0.5 ${leftCollapsed ? 'items-center' : ''}`}>
            {navLinksWithDividers.map(({ link, divider: showDivider }) => {
              const active = isActiveRoute(link.href, pathname);

              let divider = null;
              if (showDivider && link.group && !leftCollapsed) {
                divider = (
                  <div
                    key={`divider-${link.group}`}
                    className={`mt-3 mb-1 px-3 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                      isOnLight ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {link.group}
                  </div>
                );
              }

              return (
                <div key={link.label}>
                  {divider}
                  <NavItem
                    link={link}
                    active={active}
                    collapsed={leftCollapsed}
                    isOnLight={isOnLight}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className={`flex-shrink-0 mt-auto pt-4 ${leftCollapsed ? 'flex flex-col items-center' : ''}`}>
            {!leftCollapsed ? (
              <>
                <div className="mb-4 flex gap-2">
                  <button
                    className={`flex-1 backdrop-blur-md text-xs py-1.5 px-3 rounded-full border transition-all duration-500 ${
                      isOnLight
                        ? 'bg-white/60 hover:bg-white/80 border-black/10 text-gray-700'
                        : 'bg-black/20 hover:bg-black/40 border-white/15 text-white'
                    }`}
                  >
                    collective
                  </button>
                  <button
                    className={`flex-1 backdrop-blur-md text-xs py-1.5 px-3 rounded-full border transition-all duration-500 ${
                      isOnLight
                        ? 'bg-white/60 hover:bg-white/80 border-black/10 text-gray-700'
                        : 'bg-black/20 hover:bg-black/40 border-white/15 text-white'
                    }`}
                  >
                    .studio
                  </button>
                </div>
                <div
                  className={`text-[9px] transition-colors duration-500 ${
                    isOnLight ? 'text-gray-400' : 'text-gray-400'
                  }`}
                >
                  2026 Copyright Warehaus. All rights reserved.
                </div>
              </>
            ) : (
              <div className="mb-2" />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
