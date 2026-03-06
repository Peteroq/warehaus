import type { Metadata } from 'next';
import { DesignContent } from '@/components/pages/DesignContent';

export const metadata: Metadata = {
  title: 'Design — The Forge — Warehaus',
};

export default function DesignPage() {
  return <DesignContent />;
}
