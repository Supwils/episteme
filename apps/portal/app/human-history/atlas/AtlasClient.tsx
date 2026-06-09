'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui';

const AtlasCanvas = dynamic(() => import('@/src-history/components/atlas/AtlasCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#08080f]">
      <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
    </div>
  ),
});

export default function AtlasClient() {
  return <AtlasCanvas />;
}
