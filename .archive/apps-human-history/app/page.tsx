'use client';

import PageWrapper from '@/components/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderHome, cleanupHome } = await import('@/page-renderers/home');
        renderHome();
        return cleanupHome;
      }}
    />
  );
}
