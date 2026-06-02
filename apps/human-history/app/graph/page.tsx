'use client';

import PageWrapper from '@/components/PageWrapper';

export default function GraphPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderGraph, cleanupGraph } = await import('@/page-renderers/graph');
        renderGraph();
        return cleanupGraph;
      }}
    />
  );
}
