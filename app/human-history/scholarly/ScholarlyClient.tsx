'use client';

import PageWrapper from '@/subjects/history/components/PageWrapper';

const renderScholarly = async () => {
  const { renderScholarly: render, cleanupScholarly } = await import('@/subjects/history/page-renderers/scholarly');
  render();
  return cleanupScholarly;
};

export default function ScholarlyClient() {
  return <PageWrapper render={renderScholarly} />;
}
