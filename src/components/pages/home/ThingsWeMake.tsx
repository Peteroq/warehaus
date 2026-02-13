'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function ThingsWeMake() {
  return (
    <section
      data-section="work"
      className="relative w-full min-h-screen bg-[#0a0a1a] overflow-hidden py-20"
    >
      {/* Starry Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1020] via-[#0a0a1a] to-[#000000]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(white 2px, transparent 2px)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Inner content */}
      <div
        className="relative z-10 flex flex-col items-center transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 1rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 1rem)',
        }}
      >
        {/* Section Title */}
        <h3 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-16 opacity-80">
          Things We Make
        </h3>

        {/* Main Content */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Phone Mockup */}
          <div className="relative z-10 w-[200px] h-[320px] bg-gray-600/50 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black/20 rounded-b-xl" />
          </div>

          {/* Large Text Overlay */}
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-black text-white italic tracking-tighter whitespace-nowrap z-20 drop-shadow-2xl mix-blend-overlay">
            Mobile Apps
          </h2>
          <h2
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-black text-transparent italic tracking-tighter whitespace-nowrap z-20 pointer-events-none"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
          >
            Mobile Apps
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-32 mt-20 w-full max-w-2xl justify-center">
          <Link
            href="/work"
            className="bg-white text-black px-8 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Link>
          <Link
            href="/work"
            className="bg-white text-black px-8 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
