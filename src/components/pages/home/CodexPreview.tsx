'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/react/ui/GlassCard';
import { codexEntries } from '@/lib/data/codex';

const previewEntries = codexEntries.slice(0, 6);

export function CodexPreview() {
  return (
    <section
      data-section="codex"
      className="relative w-full py-24 overflow-hidden"
    >
      <div
        className="relative z-10 transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-12 text-muted text-center">
          Codex of Creations
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
          {previewEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/codex/${entry.slug}`}
              className="group block transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GlassCard className="h-full p-0 overflow-hidden">
                {entry.coverImage && (
                  <div className="aspect-video w-full overflow-hidden relative">
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-4">
                  <span className="mb-2 inline-block rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                    {entry.category}
                  </span>
                  <h4 className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                    {entry.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {entry.description}
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/codex"
            className="inline-block rounded-full border border-accent/40 bg-accent/5 px-8 py-3 text-sm font-bold text-accent transition-all hover:bg-accent/10 hover:scale-105"
          >
            Enter the Codex
          </Link>
        </div>
      </div>
    </section>
  );
}
