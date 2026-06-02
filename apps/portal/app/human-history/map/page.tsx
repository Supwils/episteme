'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderMap = async () => {
  const { renderMap: render, cleanupMap } = await import('@/src-history/page-renderers/map');
  render();
  return cleanupMap;
};

export default function MapPage() {
  return <PageWrapper render={renderMap} />;
}
