'use client';

import PageWrapper from '@/src-history/components/PageWrapper';

const renderHome = async () => {
  const { renderHome: render, cleanupHome } = await import('@/src-history/page-renderers/home');
  render();
  return cleanupHome;
};

export default function HomePage() {
  return <PageWrapper render={renderHome} />;
}
