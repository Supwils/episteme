'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function MapPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderMap, cleanupMap } = await import('@/src-history/page-renderers/map');
        renderMap();
        return cleanupMap;
      }}
    />
  );
}
