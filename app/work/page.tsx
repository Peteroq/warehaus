import type { Metadata } from 'next';
import { WorkContent } from '@/components/pages/WorkContent';

export const metadata: Metadata = {
  title: 'Work — Warehaus',
};

export default function WorkPage() {
  return <WorkContent />;
}
