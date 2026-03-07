'use client';

import Image from 'next/image';
import { useFadeIn } from '@/hooks/useFadeIn';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { codexEntries } from '@/lib/data/codex';

const previewEntries = codexEntries.slice(0, 6);

const SIDEBAR_PAD = {
  paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 1rem)',
  paddingRight: 'calc(var(--right-sidebar-w, 0px) + 1rem)',
};

const typeColors: Record<string, string> = {
  artifact: '#00e5ff',
  quest: '#f97316',
  fragment: '#a855f7',
};

export function CodexPreview() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      data-section="codex"
      className="relative w-full min-h-screen flex items-center overflow-hidden py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080a12] to-[#050505]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '120px 120px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/3 blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600/3 blur-[120px]" />

      <div
        ref={ref}
        className={`relative z-10 w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={SIDEBAR_PAD}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-cyan-400/70" />
            </div>
            <span className="text-cyan-400/40 text-[10px] font-bold tracking-[0.3em] uppercase">
              Codex of Creations
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            The work
            <br />
            <span className="text-white/30">speaks for itself.</span>
          </h2>
          <p className="mt-6 text-white/20 text-sm max-w-md mx-auto leading-relaxed">
            Artifacts forged, quests undertaken, fragments explored.
            Every creation documented in our living archive.
          </p>
        </div>

        {/* Featured project — large hero card */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href={`/codex/${previewEntries[0].slug}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/5 group-hover:border-white/15 transition-all duration-500">
              <div className="aspect-[21/9] w-full relative overflow-hidden">
                {previewEntries[0].coverImage && (
                  <Image
                    src={previewEntries[0].coverImage}
                    alt={previewEntries[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border"
                      style={{
                        color: typeColors[previewEntries[0].type] || '#00e5ff',
                        borderColor: `${typeColors[previewEntries[0].type] || '#00e5ff'}30`,
                        background: `${typeColors[previewEntries[0].type] || '#00e5ff'}10`,
                      }}
                    >
                      {previewEntries[0].type}
                    </span>
                    <span className="text-white/20 text-[10px] font-mono">{previewEntries[0].year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
                    {previewEntries[0].title}
                  </h3>
                  <p className="text-white/30 text-sm max-w-lg leading-relaxed mb-4">
                    {previewEntries[0].description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400/70 group-hover:text-cyan-400 group-hover:gap-3 transition-all">
                    View project <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid of remaining projects */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {previewEntries.slice(1).map((entry) => (
            <Link
              key={entry.slug}
              href={`/codex/${entry.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/5 group-hover:border-white/15 transition-all duration-500 h-full">
                {entry.coverImage && (
                  <div className="aspect-video w-full overflow-hidden relative">
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                  </div>
                )}
                <div className="p-5 bg-[#0a0a0a]">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[8px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border"
                      style={{
                        color: typeColors[entry.type] || '#00e5ff',
                        borderColor: `${typeColors[entry.type] || '#00e5ff'}25`,
                        background: `${typeColors[entry.type] || '#00e5ff'}08`,
                      }}
                    >
                      {entry.type}
                    </span>
                    <span className="text-white/15 text-[9px] font-mono">{entry.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors mb-1">
                    {entry.title}
                  </h4>
                  <p className="text-[11px] text-white/25 leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/codex"
            className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 px-10 py-4 text-sm font-bold text-cyan-300/80 hover:text-cyan-300 transition-all hover:scale-105 group"
          >
            Enter the full Codex
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
