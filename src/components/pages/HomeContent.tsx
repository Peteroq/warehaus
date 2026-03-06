'use client';

import { HeroSection } from '@/components/pages/home/HeroSection';
import { PillarsSection } from '@/components/pages/home/PillarsSection';
import { CodexPreview } from '@/components/pages/home/CodexPreview';
import { FamiliarsSection } from '@/components/pages/home/FamiliarsSection';
import { FooterSection } from '@/components/pages/home/FooterSection';

export function HomeContent() {
  return (
    <>
      <div className="h-screen w-full">
        <HeroSection />
      </div>
      <PillarsSection />
      <CodexPreview />
      <FamiliarsSection />
      <FooterSection />
    </>
  );
}
