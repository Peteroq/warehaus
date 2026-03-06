'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { LayoutProvider, useLayout, EXPANDED, COLLAPSED } from '@/components/providers/LayoutProvider';
import { Navbar } from '@/components/layout/Navbar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { PageTransition } from '@/components/providers/PageTransition';

function AppShellInner({ children }: { children: ReactNode }) {
  const {
    leftCollapsed,
    rightCollapsed,
    setScrollProgress,
    setActiveSection,
    setIsOnLight,
  } = useLayout();

  const mainRef = useRef<HTMLDivElement>(null);

  const leftWidth = leftCollapsed ? COLLAPSED : EXPANDED;
  const rightWidth = rightCollapsed ? COLLAPSED : EXPANDED;

  useEffect(() => {
    // Light theme detection
    const lightSections = document.querySelectorAll('[data-theme="light"]');
    const lightObserver = new IntersectionObserver(
      (entries) => {
        const anyLight = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0.3,
        );
        setIsOnLight(anyLight);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1] },
    );
    lightSections.forEach((el) => lightObserver.observe(el));

    // Active section detection
    const allSections = document.querySelectorAll('[data-section]');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxSection = 'hero';
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxSection = (entry.target as HTMLElement).dataset.section || 'hero';
          }
        });
        if (maxRatio > 0.2) {
          setActiveSection(maxSection);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );
    allSections.forEach((el) => sectionObserver.observe(el));

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lightObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollProgress, setActiveSection, setIsOnLight]);

  return (
    <div
      className="min-h-screen w-full bg-black text-white font-sans selection:bg-white/20"
      style={
        {
          '--left-sidebar-w': `${leftWidth}px`,
          '--right-sidebar-w': `${rightWidth}px`,
        } as React.CSSProperties
      }
    >
      <Navbar />

      {/* Right sidebar — desktop only */}
      <div
        className="hidden md:block fixed top-0 right-0 z-40 h-screen p-5 pl-0 transition-all duration-300 ease-in-out"
        style={{ width: `${rightWidth}px` }}
      >
        <RightSidebar />
      </div>

      {/* Main content */}
      <main ref={mainRef} className="w-full">
        <PageTransition>{children}</PageTransition>
      </main>

      <MobileBottomBar />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <AppShellInner>{children}</AppShellInner>
    </LayoutProvider>
  );
}
