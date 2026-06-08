'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@universe/ui';

const GraphClient = dynamic(() => import('./GraphClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0c0a09]">
      <LoadingSpinner size="md" color="amber" label="正在加载历史图谱…" />
    </div>
  ),
});

export default function GraphLoader() {
  return <GraphClient />;
}
