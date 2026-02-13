import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectContent, type ProjectData } from '@/components/pages/ProjectContent';

const projects: ProjectData[] = [
  {
    slug: 'nexus-brand-identity',
    title: 'Nexus Brand Identity',
    client: 'Nexus Corp',
    year: 2024,
    description: 'Complete visual identity for a tech startup disrupting the logistics space. We crafted everything from the logo system to digital touchpoints.',
    services: ['Brand Strategy', 'Visual Identity', 'Guidelines'],
    category: 'Branding',
  },
  {
    slug: 'orbital-dashboard',
    title: 'Orbital Dashboard',
    client: 'SpaceOps Inc',
    year: 2024,
    description: 'Real-time analytics platform for satellite operations and space telemetry. Built with performance-first architecture.',
    services: ['UX Design', 'UI Design', 'Front-end Development'],
    category: 'Product Design',
  },
  {
    slug: 'synthwave-campaign',
    title: 'Synthwave Campaign',
    client: 'RetroWave Media',
    year: 2023,
    description: 'Multi-channel marketing campaign blending retro-futurism with modern tech aesthetics.',
    services: ['Campaign Strategy', 'Motion Design', 'Social Content'],
    category: 'Digital',
  },
  {
    slug: 'aurora-mobile',
    title: 'Aurora Mobile App',
    client: 'Weather.ai',
    year: 2024,
    description: 'Weather prediction app featuring cinematic data visualizations and real-time atmospheric rendering.',
    services: ['Product Design', 'Prototyping', 'User Research'],
    category: 'Product Design',
  },
  {
    slug: 'helix-motion',
    title: 'Helix Motion System',
    client: 'BioGenex',
    year: 2023,
    description: 'Comprehensive motion design language for a biotech company, applied across digital and physical touchpoints.',
    services: ['Motion Design', 'Brand Guidelines', 'Animation'],
    category: 'Motion',
  },
  {
    slug: 'chrono-web',
    title: 'Chrono Web Platform',
    client: 'TimeTech',
    year: 2024,
    description: 'Full-stack web platform for time-tracking and project management with a focus on developer experience.',
    services: ['Full-stack Development', 'API Design', 'DevOps'],
    category: 'Development',
  },
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    return {
      title: project ? `${project.title} — Warehaus` : 'Project — Warehaus',
    };
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
}
