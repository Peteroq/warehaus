import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About — Warehaus',
};

export default function AboutPage() {
  return <AboutContent />;
}
