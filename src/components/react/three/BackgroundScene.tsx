import { Suspense, lazy, useEffect, useState } from 'react';
import { SceneLoader } from './SceneLoader';

const BackgroundCanvas = lazy(() => import('./BackgroundSceneInner'));

interface BackgroundSceneProps {
  className?: string;
}

export function BackgroundScene({ className = '' }: BackgroundSceneProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={`pointer-events-none ${className}`}>
      <Suspense fallback={<SceneLoader className="h-full w-full" />}>
        <BackgroundCanvas />
      </Suspense>
    </div>
  );
}
