'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function GraphPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderGraph, cleanupGraph } = await import('@/src-history/page-renderers/graph');
        renderGraph();
        return cleanupGraph;
      }}
    />
  );
}
