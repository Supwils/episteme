'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderScholarly = async () => {
  const { renderScholarly: render, cleanupScholarly } = await import('@/src-history/page-renderers/scholarly');
  render();
  return cleanupScholarly;
};

export default function ScholarlyClient() {
  return <PageWrapper render={renderScholarly} />;
}
