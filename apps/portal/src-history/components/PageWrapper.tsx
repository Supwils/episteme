'use client';

// @ts-check
import { useEffect, useRef } from 'react';
import type { RenderFn, AsyncRenderFn } from '@/src-history/types';

interface PageWrapperProps {
  render: RenderFn | AsyncRenderFn;
}

function isPromise(value: unknown): value is Promise<unknown> {
  return value !== null && typeof value === 'object' && typeof (value as Record<string, unknown>).then === 'function';
}

export default function PageWrapper({ render }: PageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let app = container.querySelector('#app') as HTMLElement;
    if (!app) {
      app = document.createElement('div');
      app.id = 'app';
      container.appendChild(app);
    }
    let cleanupFn: (() => void) | undefined;
    let cancelled = false;

    const result = render(app);
    if (isPromise(result)) {
      result.then((fn) => {
        if (cancelled) {
          if (typeof fn === 'function') fn();
        } else {
          cleanupFn = typeof fn === 'function' ? fn : undefined;
        }
      });
    } else {
      cleanupFn = typeof result === 'function' ? result : undefined;
    }

    return () => {
      cancelled = true;
      if (typeof cleanupFn === 'function') cleanupFn();
      if (container.contains(app)) container.removeChild(app);
    };
  }, [render]);

  return <div ref={containerRef} style={{ minHeight: '100%' }} />;
}
