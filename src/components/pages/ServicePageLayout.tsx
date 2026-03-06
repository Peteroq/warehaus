'use client';

import Link from 'next/link';
import type { ServicePageData } from '@/lib/types/service';
import { GlassCard } from '@/components/react/ui/GlassCard';
import { ALL_SERVICES } from '@/lib/data/services';

interface ServicePageLayoutProps {
  service: ServicePageData;
}

export function ServicePageLayout({ service }: ServicePageLayoutProps) {
  const siblings = ALL_SERVICES.filter((s) => s.href !== service.href);

  return (
    <div
      className="min-h-screen transition-all duration-300 ease-in-out"
      style={{
        paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 0rem)',
        paddingRight: 'calc(var(--right-sidebar-w, 0px) + 0rem)',
      }}
    >
      {/* Intro Hero */}
      <section
        data-section="hero"
        className={`relative w-full min-h-[70vh] flex items-center overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradientClass} opacity-20`} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 md:px-10">
          <div
            className="inline-block mb-4 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase"
            style={{ borderColor: service.color, color: service.color }}
          >
            {service.sigil} Sigil
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black italic tracking-tight text-white mb-4">
            {service.realm}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-xl">
            Guided by <span style={{ color: service.color }} className="font-bold">{service.mentor}</span>
          </p>
        </div>
      </section>

      {/* Mentor Lore */}
      <section data-section="lore" className="max-w-4xl mx-auto px-6 py-16 md:px-10">
        <p className="text-lg leading-relaxed text-foreground/80">
          {service.loreBlurb}
        </p>
      </section>

      {/* Skills / Abilities */}
      <section data-section="skills" className="max-w-4xl mx-auto px-6 pb-16 md:px-10">
        <h2 className="font-display text-2xl font-semibold mb-6">Abilities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.skills.map((skill) => (
            <GlassCard key={skill}>
              <h3
                className="font-display text-sm font-semibold"
                style={{ color: service.color }}
              >
                {skill}
              </h3>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Artifacts / Deliverables */}
      <section data-section="artifacts" className="max-w-4xl mx-auto px-6 pb-16 md:px-10">
        <h2 className="font-display text-2xl font-semibold mb-6">Artifacts & Deliverables</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.artifacts.map((artifact) => (
            <GlassCard key={artifact.name}>
              <h3
                className="font-display text-sm font-semibold mb-2"
                style={{ color: service.color }}
              >
                {artifact.name}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {artifact.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Familiars */}
      <section data-section="familiars" className="max-w-4xl mx-auto px-6 pb-16 md:px-10">
        <h2 className="font-display text-2xl font-semibold mb-6">Familiar: {service.familiarName}</h2>
        <GlassCard>
          <p className="text-sm leading-relaxed text-foreground/80">
            {service.familiarDescription}
          </p>
        </GlassCard>
      </section>

      {/* CTA */}
      <section data-section="cta" className="max-w-4xl mx-auto px-6 pb-16 md:px-10 text-center">
        <Link
          href="/contact"
          className="inline-block rounded-full px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105"
          style={{ backgroundColor: service.color }}
        >
          {service.ctaText}
        </Link>
      </section>

      {/* Cross-links */}
      <section className="max-w-4xl mx-auto px-6 pb-20 md:px-10">
        <h2 className="font-display text-xl font-semibold mb-6 text-center">Explore Other Realms</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {siblings.map((s) => (
            <Link key={s.href} href={s.href} className="group block">
              <GlassCard className="transition-transform duration-200 group-hover:-translate-y-0.5">
                <h3 className="font-display text-sm font-semibold" style={{ color: s.color }}>
                  {s.realm}
                </h3>
                <p className="text-xs text-foreground/60 mt-1">Guided by {s.mentor}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
