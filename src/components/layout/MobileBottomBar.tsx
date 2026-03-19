'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, Compass, BookOpen, DoorOpen } from 'lucide-react';

const items = [
  { icon: HomeIcon, label: 'Home', href: '/' },
  { icon: Compass, label: 'Services', href: '/dream' },
  { icon: BookOpen, label: 'Codex', href: '/codex' },
  { icon: DoorOpen, label: 'Contact', href: '/contact' },
];

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href === '/dream')
    return pathname.startsWith('/dream') || pathname.startsWith('/design') || pathname.startsWith('/develop');
  return pathname.startsWith(href);
}

export function MobileBottomBar() {
  const pathname = usePathname();
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());
  const barRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const updatePill = useCallback(() => {
    if (!barRef.current) return;
    const activeItem = items.find((i) => isActive(i.href, pathname));
    if (!activeItem) return;
    const el = linkRefs.current.get(activeItem.href);
    if (!el) return;

    const barRect = barRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    setPill({
      left: linkRect.left - barRect.left,
      width: linkRect.width,
    });
  }, [pathname]);

  useEffect(() => {
    updatePill();
    const timer = setTimeout(updatePill, 100);
    return () => clearTimeout(timer);
  }, [updatePill]);

  return (
    <div
      ref={barRef}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-50 flex justify-around items-center px-4 py-3 border-t border-white/[0.06] relative"
    >
      {/* Sliding pill indicator */}
      {pill && (
        <div
          className="absolute top-1.5 h-[calc(100%-12px)] rounded-xl bg-white/[0.06] border border-white/[0.08] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            left: `${pill.left}px`,
            width: `${pill.width}px`,
          }}
        />
      )}

      {items.map(({ icon: Icon, label, href }) => {
        const active = isActive(href, pathname);
        return (
          <Link
            key={href}
            ref={(el) => {
              if (el) linkRefs.current.set(href, el);
            }}
            href={href}
            className={`relative z-10 flex flex-col items-center gap-1 text-[10px] font-bold px-4 py-1 rounded-xl transition-all duration-400 ${
              active ? 'text-white' : 'text-gray-500'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-400 ${active ? 'scale-110' : ''}`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
