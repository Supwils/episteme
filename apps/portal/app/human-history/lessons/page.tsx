'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function LessonsPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderLessons, cleanupLessons } = await import('@/src-history/page-renderers/lessons');
        renderLessons();
        return cleanupLessons;
      }}
    />
  );
}
