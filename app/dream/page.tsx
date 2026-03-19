import type { Metadata } from 'next';
import { DreamContent } from '@/components/pages/DreamContent';

export const metadata: Metadata = {
  title: 'Dream — The Navigator Realm — Warehaus',
};

export default function DreamPage() {
  return <DreamContent />;
}
