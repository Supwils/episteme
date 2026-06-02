'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderFigures = async () => {
  const { renderFigures: render, cleanupFigures } = await import('@/src-history/page-renderers/figures');
  render();
  return cleanupFigures;
};

export default function FiguresPage() {
  return <PageWrapper render={renderFigures} />;
}
