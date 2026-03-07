'use client';

import Link from 'next/link';
import { useFadeIn } from '@/hooks/useFadeIn';
import {
  Compass,
  Hammer,
  TowerControl,
  ArrowRight,
} from 'lucide-react';
import { ALL_SERVICES } from '@/lib/data/services';

const icons = [Compass, Hammer, TowerControl];

const SIDEBAR_PAD = {
  paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 1rem)',
  paddingRight: 'calc(var(--right-sidebar-w, 0px) + 1rem)',
};

export function PillarsSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      data-section="pillars"
      className="relative w-full min-h-screen flex items-center overflow-hidden py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0818] to-[#050505]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />
      {/* Constellation lines connecting the three pillars */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="0.5" />
        <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#f97316" strokeWidth="0.5" />
        <line x1="20%" y1="50%" x2="50%" y2="30%" stroke="#818cf8" strokeWidth="0.5" />
        <line x1="80%" y1="50%" x2="50%" y2="30%" stroke="#eab308" strokeWidth="0.5" />
        <circle cx="20%" cy="50%" r="3" fill="#818cf8" opacity="0.4" />
        <circle cx="50%" cy="50%" r="3" fill="#f97316" opacity="0.4" />
        <circle cx="80%" cy="50%" r="3" fill="#eab308" opacity="0.4" />
        <circle cx="50%" cy="30%" r="2" fill="#a5b4fc" opacity="0.3" />
      </svg>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={SIDEBAR_PAD}
      >
        <div className="text-center mb-20">
          <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Three realms, one house
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Every great creation
            <br />
            <span className="text-white/30">follows the same path.</span>
          </h2>
          <p className="mt-6 text-white/20 text-sm max-w-md mx-auto leading-relaxed">
            Dream charts the vision. Design gives it form. Develop brings it to life.
            Each realm has its own mentor, familiar, and craft.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {ALL_SERVICES.map((service, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/5 group-hover:border-white/15 transition-all duration-500">
                  {/* Card visual — tall aspect with atmospheric background */}
                  <div
                    className="aspect-[3/4] w-full relative overflow-hidden"
                    style={{
                      background: `radial-gradient(ellipse at center, ${service.color}15 0%, transparent 70%), linear-gradient(to bottom, #0a0818, #050505)`,
                    }}
                  >
                    {/* Geometric sigil */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
                        <div
                          className="absolute inset-0 rounded-full border opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                          style={{ borderColor: service.color }}
                        />
                        <div
                          className="absolute inset-8 rounded-full border opacity-15 group-hover:opacity-25 transition-opacity duration-700"
                          style={{ borderColor: service.color }}
                        />
                        <div
                          className="absolute inset-16 rounded-full border opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                          style={{ borderColor: service.color }}
                        />
                        <div className="absolute top-0 left-1/2 -translate-x-px w-px h-full opacity-10" style={{ background: service.color }} />
                        <div className="absolute top-1/2 left-0 -translate-y-px w-full h-px opacity-10" style={{ background: service.color }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-20 h-20 rounded-full flex items-center justify-center opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                            style={{ background: `${service.color}20` }}
                          >
                            <Icon className="w-10 h-10" style={{ color: service.color }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                      backgroundImage: `linear-gradient(${service.color}40 1px, transparent 1px), linear-gradient(90deg, ${service.color}40 1px, transparent 1px)`,
                      backgroundSize: '50px 50px',
                    }} />

                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

                    {/* Card content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center border"
                          style={{
                            borderColor: `${service.color}30`,
                            background: `${service.color}10`,
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: service.color }} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                            {service.realm}
                          </h3>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: service.color }}>
                            {service.mentor}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-white/30 leading-relaxed mb-5 line-clamp-3">
                        {service.loreBlurb.slice(0, 150)}...
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] rounded-full px-2.5 py-1 border"
                            style={{
                              borderColor: `${service.color}15`,
                              color: `${service.color}90`,
                              background: `${service.color}08`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3"
                        style={{ color: service.color }}
                      >
                        Enter the realm <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
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
