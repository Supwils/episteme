'use client';

import dynamic from 'next/dynamic';

const HistoricalMap = dynamic(
  () => import('@/src-history/components/visualizations/HistoricalMap'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#0a0f1a',
          color: '#c8a951',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        正在加载历史地图…
      </div>
    ),
  }
);

export default function MapClient() {
  return <HistoricalMap />;
}
