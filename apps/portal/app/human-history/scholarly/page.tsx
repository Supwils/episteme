'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function ScholarlyPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderScholarly, cleanupScholarly } = await import('@/src-history/page-renderers/scholarly');
        renderScholarly();
        return cleanupScholarly;
      }}
    />
  );
}
