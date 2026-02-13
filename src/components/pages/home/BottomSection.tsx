'use client';

import Link from 'next/link';

export function BottomSection() {
  return (
    <section
      data-section="cta"
      data-theme="light"
      className="relative w-full min-h-screen bg-white overflow-hidden py-20"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-100/50 to-transparent" />
      </div>

      {/* Inner content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
          Ready to build?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12 text-lg">
          Join the collective and start your journey into the digital frontier
          with Warehaus.
        </p>

        <Link
          href="/contact"
          className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105"
        >
          Get Started
        </Link>
      </div>

      {/* Footer Links */}
      <div
        className="relative z-10 mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <div>&copy; 2026 Warehaus Inc.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            Privacy
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            Terms
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            Twitter
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            Instagram
          </span>
        </div>
      </div>
    </section>
  );
}
