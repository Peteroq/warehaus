'use client';

import { useCallback, useEffect, useState } from 'react';
import { Globe, Menu, Diamond, Grid } from 'lucide-react';

const TABS = [
  {
    label: 'DREAM',
    image: '/images/hero/bg-3.png',
    overlay: 'bg-indigo-900/40',
  },
  {
    label: 'DESIGN',
    image: '/images/hero/bg-1.png',
    overlay: 'bg-orange-900/40',
  },
  {
    label: 'DEVELOP',
    image: '/images/hero/bg-2.png',
    overlay: 'bg-emerald-900/40',
  },
];

const INTERVAL = 5000;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TABS.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [resetKey]);

  return (
    <div
      className="relative w-full h-full min-h-[600px] overflow-hidden"
      data-section="hero"
    >
      {/* Background layers — crossfade */}
      {TABS.map((tab, i) => (
        <div
          key={tab.label}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${tab.image}")` }}
        >
          <div className={`absolute inset-0 ${tab.overlay} transition-opacity duration-1000`} />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content Overlay */}
      <div
        className="relative z-10 h-full flex flex-col p-8 transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-start w-full mb-12">
          <div className="text-white font-bold text-xl tracking-wider">
            {'\u5922\u3092\u7BC9\u304F'}
          </div>
          <div className="flex gap-4 text-white/80">
            <Globe className="w-5 h-5 cursor-pointer hover:text-white" />
            <Menu className="w-5 h-5 cursor-pointer hover:text-white" />
            <Diamond className="w-5 h-5 cursor-pointer hover:text-white" />
            <Grid className="w-5 h-5 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Tab Typography with progress bars */}
        <div className="flex-1 flex flex-col justify-center">
          {TABS.map((tab, i) => {
            const isActive = i === activeIndex;
            const alignment =
              i === 0 ? 'items-start' : i === 1 ? 'items-center' : 'items-end';
            return (
              <div
                key={tab.label}
                className={`flex flex-col transform transition-all duration-500 ease-in-out ${alignment} ${
                  i === 1 ? 'my-2' : ''
                }`}
              >
                <div className="inline-flex flex-col">
                  <button
                    onClick={() => goTo(i)}
                    className="text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter drop-shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    style={
                      isActive
                        ? { color: 'white', WebkitTextStroke: '0px transparent' }
                        : { color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.6)' }
                    }
                  >
                    {tab.label}.
                  </button>

                  {/* Progress bar */}
                  <button
                    onClick={() => goTo(i)}
                    className="relative h-2 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer mt-2"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-white rounded-full"
                      style={
                        i === activeIndex
                          ? { animation: `progress ${INTERVAL}ms linear forwards` }
                          : { width: '0%' }
                      }
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
