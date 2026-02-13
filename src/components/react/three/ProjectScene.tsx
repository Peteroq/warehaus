'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { SceneLoader } from './SceneLoader';

const ThreeScene = lazy(() => import('./ProjectSceneInner'));

interface ProjectSceneProps {
  modelUrl: string;
  className?: string;
}

export function ProjectScene({ modelUrl, className = '' }: ProjectSceneProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <SceneLoader className={`h-full w-full ${className}`} />;

  return (
    <div className={`h-full w-full ${className}`}>
      <Suspense fallback={<SceneLoader className="h-full w-full" />}>
        <ThreeScene modelUrl={modelUrl} />
      </Suspense>
    </div>
  );
}
