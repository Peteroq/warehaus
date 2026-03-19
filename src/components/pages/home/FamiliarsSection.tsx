'use client';

import { Sparkles, Zap, Bot } from 'lucide-react';
import { useFadeIn } from '@/hooks/useFadeIn';

const familiars = [
  {
    name: 'Echo',
    realm: 'Dream',
    mentor: 'Vaelen',
    icon: Sparkles,
    color: '#6366f1',
    description: 'Sifts data faster than any mortal cartographer. Charts market constellations and whispers probabilities.',
    capabilities: ['Research Synthesis', 'Insight Clustering', 'Trend Detection', 'Strategy Simulation'],
  },
  {
    name: 'Flint',
    realm: 'Design',
    mentor: 'Korr',
    icon: Zap,
    color: '#f97316',
    description: 'Accelerates iteration. Generates variations in seconds, checks accessibility, and maintains consistency.',
    capabilities: ['Rapid Iteration', 'A11y Checks', 'Asset Generation', 'Design QA'],
  },
  {
    name: 'Axiom',
    realm: 'Develop',
    mentor: 'Cirion',
    icon: Bot,
    color: '#eab308',
    description: 'Writes tests before bugs form. Catches regressions, optimizes performance, and watches every deploy.',
    capabilities: ['Auto Testing', 'Perf Monitoring', 'Code Review', 'Deploy Guards'],
  },
];

const SIDEBAR_PAD = {
  paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 1rem)',
  paddingRight: 'calc(var(--right-sidebar-w, 0px) + 1rem)',
};

export function FamiliarsSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      data-section="familiars"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0818] to-[#050505]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #818cf8 0px, transparent 1px, transparent 40px)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/4 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-orange-600/3 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-yellow-600/3 blur-[100px]" />

      <div
        ref={ref}
        className={`relative z-10 w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={SIDEBAR_PAD}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            AI-Powered Companions
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Bound familiars,
            <br />
            <span className="text-white/30">guided by masters.</span>
          </h2>
          <p className="mt-6 text-white/20 text-sm max-w-lg mx-auto leading-relaxed">
            They don&apos;t replace the craft — they multiply it.
            Each familiar amplifies its mentor&apos;s abilities with AI superpowers.
          </p>
        </div>

        {/* Familiar cards — horizontal with animated visuals */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {familiars.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.name} className="group">
                <div className="relative overflow-hidden rounded-2xl border border-white/5 group-hover:border-white/15 transition-all duration-500 bg-gradient-to-b from-white/[0.02] to-transparent">
                  {/* Animated familiar visual */}
                  <div className="relative h-[240px] flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `radial-gradient(ellipse at center, ${f.color} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="relative w-[160px] h-[160px]">
                      <div
                        className="absolute inset-0 rounded-full border opacity-15 animate-[spin_20s_linear_infinite]"
                        style={{ borderColor: f.color }}
                      />
                      <div
                        className="absolute inset-4 rounded-full border opacity-20 animate-[spin_15s_linear_infinite_reverse]"
                        style={{ borderColor: f.color }}
                      />
                      <div
                        className="absolute inset-8 rounded-full border opacity-10"
                        style={{ borderColor: f.color }}
                      />
                      <div
                        className="absolute inset-12 rounded-full flex items-center justify-center"
                        style={{ background: `${f.color}10` }}
                      >
                        <Icon
                          className="w-12 h-12 transition-all duration-500 group-hover:scale-110"
                          style={{ color: `${f.color}90` }}
                        />
                      </div>
                      <div
                        className="absolute inset-12 rounded-full animate-ping opacity-20"
                        style={{ background: `${f.color}15` }}
                      />
                      {/* Orbital dots */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-lg"
                        style={{ background: `${f.color}60`, boxShadow: `0 0 8px ${f.color}40` }}
                      />
                      <div
                        className="absolute bottom-[8%] right-[8%] w-1.5 h-1.5 rounded-full"
                        style={{ background: `${f.color}40` }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold text-white">
                        {f.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: `${f.color}60` }}>
                        {f.realm} Familiar
                      </span>
                    </div>
                    <p className="text-[10px] text-white/20 mb-3">
                      Bound to {f.mentor}
                    </p>
                    <p className="text-xs text-white/30 leading-relaxed mb-5">
                      {f.description}
                    </p>

                    {/* Capability tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {f.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-[9px] rounded-full px-2.5 py-1 border"
                          style={{
                            borderColor: `${f.color}15`,
                            color: `${f.color}70`,
                            background: `${f.color}05`,
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
