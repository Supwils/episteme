"use client";

import dynamic from "next/dynamic";

const GDPChart = dynamic(
  () =>
    import("@/subjects/economics/components/visualizations/GDPChart").then(
      (m) => m.GDPChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="chart-container flex h-72 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-fg-muted border-t-transparent" />
      </div>
    ),
  }
);

export function GDPChartSection() {
  return (
    <section className="my-10">
      <GDPChart />
    </section>
  );
}
