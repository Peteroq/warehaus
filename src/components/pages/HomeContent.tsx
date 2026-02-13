'use client';

import { HeroSection } from '@/components/pages/home/HeroSection';
import { ThingsWeMake } from '@/components/pages/home/ThingsWeMake';
import { BottomSection } from '@/components/pages/home/BottomSection';

export function HomeContent() {
  return (
    <>
      <div className="h-screen w-full">
        <HeroSection />
      </div>
      <ThingsWeMake />
      <BottomSection />
    </>
  );
}
