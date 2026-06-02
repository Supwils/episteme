'use client';

// @ts-check

import dynamic from 'next/dynamic';

const AtlasCanvas = dynamic(() => import('@/src-history/components/atlas/AtlasCanvas'), { ssr: false });

export default function AtlasPage() {
  return <AtlasCanvas />;
}
