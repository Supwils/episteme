'use client';

import PageWrapper from '@/subjects/history/components/PageWrapper';

const renderTimeline = async () => {
  const { renderTimeline: render, cleanupTimeline } = await import('@/subjects/history/page-renderers/timeline');
  render();
  return cleanupTimeline;
};

export default function TimelineClient() {
  return <PageWrapper render={renderTimeline} />;
}
