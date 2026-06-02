'use client';

import PageWrapper from '@/components/PageWrapper';

export default function ScholarlyPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderScholarly, cleanupScholarly } = await import('@/page-renderers/scholarly');
        renderScholarly();
        return cleanupScholarly;
      }}
    />
  );
}
