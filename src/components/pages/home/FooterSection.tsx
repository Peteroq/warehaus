'use client';

import Link from 'next/link';
import { useFadeIn } from '@/hooks/useFadeIn';
import { ArrowRight, Compass } from 'lucide-react';

const SIDEBAR_PAD = {
  paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 1rem)',
  paddingRight: 'calc(var(--right-sidebar-w, 0px) + 1rem)',
};

export function FooterSection() {
  const [ctaRef, ctaVisible] = useFadeIn();

  return (
    <>
      {/* ════════ CTA Section ════════ */}
      <section
        data-section="cta"
        className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-32"
      >
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0e0c22] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/3 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Starfield */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div
          ref={ctaRef}
          className={`relative z-10 w-full text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={SIDEBAR_PAD}
        >
          {/* Compass sigil */}
          <div className="relative w-20 h-20 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-2 rounded-full border border-white/8" />
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-8 h-8 text-white/40" />
            </div>
            <div className="absolute -inset-4 rounded-full bg-white/3 blur-xl" />
          </div>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Ready to begin?
          </h2>
          <p className="text-lg text-white/25 max-w-lg mx-auto mb-14 leading-relaxed">
            Every great creation starts with a conversation.
            <br className="hidden md:block" />
            Step inside and tell us what you&apos;re building.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-white hover:bg-gray-100 px-12 py-5 text-lg font-bold text-gray-900 transition-all hover:scale-105 group"
            >
              Step Inside
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dream"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-white/30 px-8 py-5 text-sm font-semibold text-white/50 hover:text-white/80 transition-all"
            >
              Explore the Realms
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ Footer ════════ */}
      <footer
        data-theme="light"
        className="relative w-full bg-white overflow-hidden"
      >
        <div
          className="relative z-10 py-16 border-t border-gray-100 transition-all duration-300 ease-in-out"
          style={SIDEBAR_PAD}
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
      </footer>
    </>
  );
}
