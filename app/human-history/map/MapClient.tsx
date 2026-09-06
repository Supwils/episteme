"use client";

import dynamic from "next/dynamic";

const HistoricalMap = dynamic(
  () => import("@/subjects/history/components/visualizations/HistoricalMap"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-bg-deep text-fg-muted flex h-screen items-center justify-center">
        正在加载历史地图…
      </div>
    ),
  }
);

export default function MapClient() {
  return <HistoricalMap />;
}
