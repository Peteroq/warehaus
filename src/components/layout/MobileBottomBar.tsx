'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BriefcaseIcon, UsersIcon, MailIcon } from 'lucide-react';

const items = [
  { icon: HomeIcon, label: 'Home', href: '/' },
  { icon: BriefcaseIcon, label: 'Work', href: '/work' },
  { icon: UsersIcon, label: 'About', href: '/about' },
  { icon: MailIcon, label: 'Contact', href: '/contact' },
];

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#3a3937]/90 backdrop-blur-md z-50 flex justify-around items-center px-4 py-3 border-t border-white/10">
      {items.map(({ icon: Icon, label, href }) => {
        const active = isActive(href, pathname);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
              active ? 'text-white' : 'text-gray-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
