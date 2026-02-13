'use client';

import Link from 'next/link';
import { DataPanel } from '@/components/react/panels/DataPanel';
import { GlassCard } from '@/components/react/ui/GlassCard';

export interface ProjectData {
  slug: string;
  title: string;
  client: string;
  year: number;
  description: string;
  services: string[];
  category: string;
}

interface ProjectContentProps {
  project: ProjectData;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <article
      className="mx-auto max-w-4xl p-6 py-20 transition-all duration-300 ease-in-out"
      style={{
        paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
        paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
      }}
    >
      {/* Header */}
      <header className="mb-8">
        <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-accent">
          {project.category}
        </span>
        <h1 className="font-display text-4xl font-bold md:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>
      </header>

      {/* Project meta */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {project.client && (
          <DataPanel label="Client" value={0} suffix={project.client} />
        )}
        {project.year && (
          <DataPanel label="Year" value={project.year} />
        )}
        <div className="glass p-5">
          <p className="text-xs text-muted">Services</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.services?.map((service) => (
              <span key={service} className="rounded-full border border-border-subtle bg-surface-elevated px-2.5 py-0.5 text-xs text-foreground/80">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cover image placeholder */}
      <div className="mb-10 aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex h-full items-center justify-center text-muted">
          <p className="text-sm">Cover image — connect Sanity CMS to display</p>
        </div>
      </div>

      {/* Body content placeholder */}
      <div className="prose prose-invert max-w-none">
        <GlassCard className="p-8">
          <p className="text-foreground/80 leading-relaxed">
            {project.description}
          </p>
          <p className="mt-4 text-sm text-muted">
            Full project content will be rendered from Sanity CMS Portable Text blocks once the CMS is connected.
          </p>
        </GlassCard>
      </div>

      {/* Back link */}
      <div className="mt-12 border-t border-border pt-6">
        <Link href="/work" className="text-sm text-accent transition-colors hover:text-accent/80">
          &larr; Back to all work
        </Link>
      </div>
    </article>
  );
}
