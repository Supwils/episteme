'use client';

import { lazy, Suspense } from 'react';

const CivilizationCompare = lazy(
  () => import('@/subjects/history/components/visualizations/CivilizationCompare'),
);

function CompareLoading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      color: 'var(--parchment-dim)',
      fontFamily: 'var(--serif)',
      fontSize: '1.1rem',
    }}>
      加载文明对比中…
    </div>
  );
}

export default function CivilizationsClient() {
  return (
    <div className="civilizations-page">
      <Suspense fallback={<CompareLoading />}>
        <CivilizationCompare />
      </Suspense>
    </div>
  );
}
