import type { Metadata } from 'next';
import { DevelopContent } from '@/components/pages/DevelopContent';

export const metadata: Metadata = {
  title: 'Develop — The High Tower — Warehaus',
};

export default function DevelopPage() {
  return <DevelopContent />;
}
