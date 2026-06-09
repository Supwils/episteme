"use client";

import dynamic from "next/dynamic";

const CircularFlowDiagram = dynamic(
  () =>
    import("@/subjects/economics/components/visualizations/CircularFlowDiagram").then(
      (m) => m.CircularFlowDiagram
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

export function CircularFlowSection() {
  return (
    <section className="my-10">
      <CircularFlowDiagram />
    </section>
  );
}
