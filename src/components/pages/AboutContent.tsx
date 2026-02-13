'use client';

import { DataPanel } from '@/components/react/panels/DataPanel';
import { GlassCard } from '@/components/react/ui/GlassCard';

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
      {/* Studio intro */}
      <section className="mb-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">We are Warehaus</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          A creative studio at the intersection of design, technology, and storytelling.
          We build immersive digital experiences that push boundaries and deliver results.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DataPanel label="Founded" value={2019} />
        <DataPanel label="Projects Completed" value={147} suffix="+" trend="up" />
        <DataPanel label="Team Members" value={12} />
        <DataPanel label="Countries Served" value={28} trend="up" />
      </section>

      {/* Philosophy */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-semibold">Our Approach</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Design-Led</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Every project starts with deep understanding of the problem space. We design
              systems, not just screens.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Tech-Forward</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              We leverage cutting-edge technology — from WebGL to AI — to create experiences
              that feel ahead of their time.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Story-Driven</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Great work tells a story. We weave narrative into every interaction,
              making the complex feel intuitive.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-sm font-semibold text-accent">Performance-First</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Beautiful means nothing if it&apos;s slow. We optimize relentlessly
              for speed, accessibility, and reliability.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="mb-6 font-display text-2xl font-semibold">The Team</h2>
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
