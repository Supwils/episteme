'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui';
import type { HistoryGraphProps } from '@/subjects/history/components/history-graph/HistoryGraph';

const HistoryGraph = dynamic<HistoryGraphProps>(
  () =>
    import('@/subjects/history/components/history-graph/HistoryGraph').then(
      (mod) => ({ default: mod.HistoryGraph }),
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0c0a09]">
        <LoadingSpinner size="md" color="amber" label="正在计算历史图谱布局…" />
      </div>
    ),
  },
);

type GraphData = {
  nodes: HistoryGraphProps['nodes'];
  edges: HistoryGraphProps['edges'];
  filterOptions: HistoryGraphProps['filterOptions'];
};

export default function GraphClient() {
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('@/subjects/history/lib/graph-data').then((mod) => {
      if (cancelled) return;
      setData({
        nodes: mod.buildHistoryNodes(),
        edges: mod.buildHistoryEdges(),
        filterOptions: {
          eras: mod.getUniqueEras(),
          regions: mod.getUniqueRegions(),
          categories: mod.getUniqueCategories(),
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0c0a09]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/20 border-t-amber-400" />
          <p className="text-sm text-white/40">正在加载历史数据…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <HistoryGraph nodes={data.nodes} edges={data.edges} filterOptions={data.filterOptions} />
    </div>
  );
}
