'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderLessons = async () => {
  const { renderLessons: render, cleanupLessons } = await import('@/src-history/page-renderers/lessons');
  render();
  return cleanupLessons;
};

export default function LessonsPage() {
  return <PageWrapper render={renderLessons} />;
}
