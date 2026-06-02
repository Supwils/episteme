'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderHome, cleanupHome } = await import('@/src-history/page-renderers/home');
        renderHome();
        return cleanupHome;
      }}
    />
  );
}
