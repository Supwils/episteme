'use client';

import PageWrapper from '@/components/PageWrapper';

export default function TimelinePage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderTimeline, cleanupTimeline } = await import('@/page-renderers/timeline');
        renderTimeline();
        return cleanupTimeline;
      }}
    />
  );
}
