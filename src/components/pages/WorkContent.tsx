'use client';

import { ContentPanel } from '@/components/react/panels/ContentPanel';

const projects = [
  {
    id: '1',
    title: 'Nexus Brand Identity',
    category: 'Branding',
    href: '/work/nexus-brand-identity',
    description: 'Complete visual identity for a tech startup disrupting the logistics space.',
    image: '/images/hero/bg-1.png',
  },
  {
    id: '2',
    title: 'Orbital Dashboard',
    category: 'Product Design',
    href: '/work/orbital-dashboard',
    description: 'Real-time analytics platform for satellite operations and space telemetry.',
    image: '/images/hero/bg-2.png',
  },
  {
    id: '3',
    title: 'Synthwave Campaign',
    category: 'Digital',
    href: '/work/synthwave-campaign',
    description: 'Multi-channel marketing campaign blending retro-futurism with modern tech.',
  },
  {
    id: '4',
    title: 'Aurora Mobile App',
    category: 'Product Design',
    href: '/work/aurora-mobile',
    description: 'Weather prediction app featuring cinematic data visualizations.',
  },
  {
    id: '5',
    title: 'Helix Motion System',
    category: 'Motion',
    href: '/work/helix-motion',
    description: 'Comprehensive motion design language for a biotech company.',
  },
  {
    id: '6',
    title: 'Chrono Web Platform',
    category: 'Development',
    href: '/work/chrono-web',
    description: 'Full-stack web platform for time-tracking and project management.',
  },
];

const categories = ['Branding', 'Product Design', 'Digital', 'Motion', 'Development'];

export function WorkContent() {
  return (
    <section
      className="p-6 py-20 transition-all duration-300 ease-in-out"
      data-section="work"
      style={{
        paddingLeft: 'calc(var(--left-sidebar-w, 0px) + 2.5rem)',
        paddingRight: 'calc(var(--right-sidebar-w, 0px) + 2.5rem)',
      }}
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Our Work</h1>
        <p className="mt-2 text-muted">Selected projects across design, technology, and storytelling.</p>
      </div>

      <ContentPanel items={projects} categories={categories} />
    </section>
  );
}
