'use client';

import Link from 'next/link';

export function FooterSection() {
  return (
    <section
      data-section="cta"
      data-theme="light"
      className="relative w-full bg-white overflow-hidden py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50" />
      </div>

      {/* CTA */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] text-center transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
          Ready to begin?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12 text-lg">
          Every great creation starts with a conversation. Step inside the house and tell us what you&apos;re building.
        </p>

        <Link
          href="/contact"
          className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105"
        >
          Step Inside
        </Link>
      </div>

      {/* Footer Links */}
      <div
        className="relative z-10 mt-16 pt-10 border-t border-gray-200 transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Realms</h4>
            <div className="flex flex-col gap-2">
              <Link href="/dream" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Dream</Link>
              <Link href="/design" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Design</Link>
              <Link href="/develop" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Develop</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link href="/codex" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Codex</Link>
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</Link>
              <a href="mailto:hello@warehaus.studio" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Email</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Social</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Twitter</span>
              <span className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">Instagram</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>&copy; 2026 Warehaus Inc.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-gray-900 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-gray-900 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
