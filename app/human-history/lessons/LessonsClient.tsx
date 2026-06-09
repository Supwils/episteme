'use client';

import PageWrapper from '@/subjects/history/components/PageWrapper';

const renderLessons = async () => {
  const { renderLessons: render, cleanupLessons } = await import('@/subjects/history/page-renderers/lessons');
  render();
  return cleanupLessons;
};

export default function LessonsClient() {
  return <PageWrapper render={renderLessons} />;
}
