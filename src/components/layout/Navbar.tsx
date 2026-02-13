'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  MailIcon,
  AlignLeftIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLayout, EXPANDED, COLLAPSED } from '@/components/providers/LayoutProvider';

const NAV_LINKS = [
  { icon: BriefcaseIcon, label: 'WORK', href: '/work' },
  { icon: UsersIcon, label: 'ABOUT', href: '/about' },
  { icon: MailIcon, label: 'CONTACT', href: '/contact' },
];

function isActiveRoute(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { leftCollapsed, toggleLeft, isOnLight } = useLayout();

  const width = leftCollapsed ? COLLAPSED : EXPANDED;

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
        <div className={`flex flex-col h-full ${leftCollapsed ? 'p-4 items-center' : 'p-7'}`}>
          {/* Top Bar */}
          <div
            className={`${
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
          <div className={`flex-1 flex flex-col ${leftCollapsed ? 'items-center' : ''}`}>
            {/* Home */}
            {leftCollapsed ? (
              <div className="mb-6">
                <Link
                  href="/"
                  className={`flex items-center justify-center ${
                    isActiveRoute('/', pathname) ? 'text-white' : ''
                  }`}
                  title="HOME"
                >
                  <HomeIcon className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="mb-6">
                <Link
                  href="/"
                  className={`flex items-center gap-3 font-bold text-sm mb-4 ${
                    isActiveRoute('/', pathname) ? 'text-white' : ''
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>HOME</span>
                </Link>

                {/* Decorative Card */}
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-orange-400 mb-3 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>

                <p
                  className={`text-[10px] leading-tight transition-colors duration-500 ${
                    isOnLight ? 'text-gray-500' : 'text-gray-300'
                  }`}
                >
                  Welcome to the world of warehaus, a virtual space for building
                  amazing digital products.
                </p>
              </div>
            )}

            {/* Other nav links */}
            <div className={`flex flex-col gap-6 ${leftCollapsed ? 'items-center' : ''}`}>
              {NAV_LINKS.map(({ icon: Icon, label, href }) => {
                const active = isActiveRoute(href, pathname);
                return (
                  <Link
                    key={label}
                    href={href}
                    title={label}
                    className={`flex items-center text-sm font-bold transition-all duration-500 group ${
                      leftCollapsed ? 'justify-center' : 'gap-3'
                    } ${
                      active
                        ? isOnLight
                          ? 'text-gray-900'
                          : 'text-white'
                        : isOnLight
                          ? 'text-gray-500 hover:text-gray-900'
                          : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors duration-500 ${
                        isOnLight ? 'group-hover:text-gray-900' : 'group-hover:text-white'
                      }`}
                    />
                    {!leftCollapsed && <span>{label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`mt-auto ${leftCollapsed ? 'flex flex-col items-center' : ''}`}>
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
