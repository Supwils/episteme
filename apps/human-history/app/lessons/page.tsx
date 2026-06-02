'use client';

import PageWrapper from '@/components/PageWrapper';

export default function LessonsPage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderLessons, cleanupLessons } = await import('@/page-renderers/lessons');
        renderLessons();
        return cleanupLessons;
      }}
    />
  );
}
