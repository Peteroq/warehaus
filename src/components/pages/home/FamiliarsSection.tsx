'use client';

import { Bot, Sparkles, Zap } from 'lucide-react';
import { GlassCard } from '@/components/react/ui/GlassCard';

const familiars = [
  {
    name: 'Echo',
    realm: 'Dream',
    icon: Sparkles,
    color: '#6366f1',
    description: 'Listens to market signals, synthesizes research, and surfaces insights.',
  },
  {
    name: 'Flint',
    realm: 'Design',
    icon: Zap,
    color: '#f97316',
    description: 'Accelerates iteration, checks accessibility, and maintains consistency.',
  },
  {
    name: 'Axiom',
    realm: 'Develop',
    icon: Bot,
    color: '#eab308',
    description: 'Writes tests, catches bugs, and optimizes performance.',
  },
];

export function FamiliarsSection() {
  return (
    <section
      data-section="familiars"
      className="relative w-full py-24 overflow-hidden"
    >
      <div
        className="relative z-10 max-w-4xl mx-auto text-center transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
          paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
        }}
      >
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-muted">
          The Familiars
        </h2>
        <p className="text-2xl md:text-3xl font-bold mb-4">
          Bound familiars, guided by masters.
        </p>
        <p className="text-muted max-w-xl mx-auto mb-12">
          AI-powered companions that amplify every realm. They don&apos;t replace the craft — they multiply it.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {familiars.map((f) => {
            const Icon = f.icon;
            return (
              <GlassCard key={f.name} className="text-center">
                <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: f.color }} />
                <h3 className="font-display text-sm font-bold" style={{ color: f.color }}>
                  {f.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">
                  {f.realm} Realm
                </p>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {f.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
