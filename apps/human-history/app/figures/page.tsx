'use client';

import PageWrapper from '@/components/PageWrapper';

export default function FiguresPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderFigures, cleanupFigures } = await import('@/page-renderers/figures');
        renderFigures();
        return cleanupFigures;
      }}
    />
  );
}
