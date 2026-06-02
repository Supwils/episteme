'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

export default function TimelinePage() {
  return (
    <PageWrapper
      render={async (app) => {
        const { renderTimeline, cleanupTimeline } = await import('@/src-history/page-renderers/timeline');
        renderTimeline();
        return cleanupTimeline;
      }}
    />
  );
}
