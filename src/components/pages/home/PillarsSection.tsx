'use client';

import Link from 'next/link';
import { Compass, Hammer, TowerControl } from 'lucide-react';
import { ALL_SERVICES } from '@/lib/data/services';

const icons = [Compass, Hammer, TowerControl];

export function PillarsSection() {
  return (
    <section
      data-section="pillars"
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
          The Three Pillars
        </h2>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {ALL_SERVICES.map((service, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <div
                  className="glass p-8 rounded-2xl h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg border border-white/10 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <Icon
                      className="w-8 h-8 mb-4"
                      style={{ color: service.color }}
                    />
                    <h3 className="font-display text-xl font-bold mb-1 text-foreground group-hover:text-white transition-colors">
                      {service.realm}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: service.color }}>
                      {service.mentor}
                    </p>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {service.loreBlurb.slice(0, 120)}...
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
