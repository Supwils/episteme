'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderGraph = async () => {
  const { renderGraph: render, cleanupGraph } = await import('@/src-history/page-renderers/graph');
  render();
  return cleanupGraph;
};

export default function GraphPage() {
  return <PageWrapper render={renderGraph} />;
}
