'use client';

import PageWrapper from '@/components/PageWrapper';

export default function MapPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderMap, cleanupMap } = await import('@/page-renderers/map');
        renderMap();
        return cleanupMap;
      }}
    />
  );
}
