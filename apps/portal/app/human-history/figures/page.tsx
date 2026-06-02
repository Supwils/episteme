'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function FiguresPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderFigures, cleanupFigures } = await import('@/src-history/page-renderers/figures');
        renderFigures();
        return cleanupFigures;
      }}
    />
  );
}
