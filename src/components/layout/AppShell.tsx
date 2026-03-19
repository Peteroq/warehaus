'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
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
    setSectionProgress,
    setActiveSection,
    setIsOnLight,
  } = useLayout();

  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  const leftWidth = leftCollapsed ? COLLAPSED : EXPANDED;
  const rightWidth = rightCollapsed ? COLLAPSED : EXPANDED;

  // Reset scroll state on route change so the sidebar starts fresh
  useEffect(() => {
    setSectionProgress(0);
    setScrollProgress(0);
    // Set activeSection to the first data-section on the new page
    const first = document.querySelector('[data-section]');
    if (first) {
      setActiveSection((first as HTMLElement).dataset.section || 'hero');
    } else {
      setActiveSection('hero');
    }
  }, [pathname, setSectionProgress, setScrollProgress, setActiveSection]);

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
      { threshold: [0.3] },
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
      { threshold: [0.2, 0.5, 0.8] },
    );
    allSections.forEach((el) => sectionObserver.observe(el));

    // Scroll progress tracking (RAF-throttled)
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));

        // Compute fractional section index based on how far each section's
        // top edge has scrolled past the top of the viewport.
        // sectionProgress=0 when section 0's top is at viewport top,
        // sectionProgress=1 when section 1's top reaches viewport top, etc.
        const sections = Array.from(document.querySelectorAll('[data-section]'));
        if (sections.length > 0) {
          let fracIndex = 0;
          for (let i = 0; i < sections.length - 1; i++) {
            const currTop = (sections[i] as HTMLElement).offsetTop;
            const nextTop = (sections[i + 1] as HTMLElement).offsetTop;
            if (scrollTop >= currTop && scrollTop < nextTop) {
              const t = (scrollTop - currTop) / (nextTop - currTop);
              fracIndex = i + t;
              break;
            } else if (scrollTop >= nextTop && i === sections.length - 2) {
              fracIndex = i + 1;
            }
          }
          setSectionProgress(fracIndex);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lightObserver.disconnect();
      sectionObserver.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, setScrollProgress, setSectionProgress, setActiveSection, setIsOnLight]);

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
