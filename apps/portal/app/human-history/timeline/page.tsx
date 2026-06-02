'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderTimeline = async () => {
  const { renderTimeline: render, cleanupTimeline } = await import('@/src-history/page-renderers/timeline');
  render();
  return cleanupTimeline;
};

export default function TimelinePage() {
  return <PageWrapper render={renderTimeline} />;
}
