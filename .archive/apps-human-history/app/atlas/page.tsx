'use client';

// @ts-check

import dynamic from 'next/dynamic';

const AtlasCanvas = dynamic(() => import('@/components/atlas/AtlasCanvas'), { ssr: false });

export default function AtlasPage() {
  return <AtlasCanvas />;
}
