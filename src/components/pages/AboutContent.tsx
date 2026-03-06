'use client';

import { DataPanel } from '@/components/react/panels/DataPanel';
import { GlassCard } from '@/components/react/ui/GlassCard';
import { ALL_SERVICES } from '@/lib/data/services';

const teamMembers = [
  { name: 'Alex Chen', role: 'Creative Director', bio: 'Leading vision and strategy across all studio projects.' },
  { name: 'Maya Rodriguez', role: 'Design Lead', bio: 'Crafting visual systems that bridge art and technology.' },
  { name: 'James Park', role: 'Tech Lead', bio: 'Building performant, scalable digital experiences.' },
  { name: 'Sophia Nakamura', role: 'Motion Designer', bio: 'Bringing interfaces to life through animation and interaction.' },
];

export function AboutContent() {
  return (
    <div
      className="mx-auto max-w-4xl p-6 py-20 transition-all duration-300 ease-in-out"
      style={{
        paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
        paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
      }}
    >
      {/* Origin Story */}
      <section className="mb-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">The World Bible</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Before there was a studio, there was an idea: that the best digital work happens when strategy, design, and engineering
          share a single vision. Warehaus was founded not as a company, but as a house — a place where different disciplines
          live under one roof, speak a common language, and build things that matter.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60">
          Over time, the house grew. What started as a small collective became a studio with a mythology of its own —
          mentors who embody our values, familiars who amplify our craft, and a codex of creations that documents
          every artifact we&apos;ve brought into the world.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DataPanel label="Founded" value={2019} />
        <DataPanel label="Projects Completed" value={147} suffix="+" trend="up" />
        <DataPanel label="Team Members" value={12} />
        <DataPanel label="Countries Served" value={28} trend="up" />
      </section>

      {/* Mentors */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-semibold">The Mentors</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ALL_SERVICES.map((service) => (
            <GlassCard key={service.mentor}>
              <h3 className="font-display text-sm font-semibold" style={{ color: service.color }}>
                {service.mentor}
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">{service.realm}</p>
              <p className="text-sm leading-relaxed text-foreground/70">
                {service.loreBlurb.slice(0, 150)}...
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* The Real Humans */}
      <section>
        <h2 className="mb-6 font-display text-2xl font-semibold">The Real Humans</h2>
        <p className="mb-6 text-sm text-muted">
          Behind the lore, real people do the work. These are the architects, designers, and builders of Warehaus.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <div key={member.name} className="glass p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-display text-lg font-bold text-accent">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-display text-sm font-semibold">{member.name}</h3>
              <p className="text-xs text-accent">{member.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
