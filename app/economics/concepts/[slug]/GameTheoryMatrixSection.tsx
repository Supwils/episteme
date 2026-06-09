"use client";

import dynamic from "next/dynamic";

const GameTheoryMatrix = dynamic(
  () =>
    import("@/subjects/economics/components/visualizations/GameTheoryMatrix").then(
      (m) => m.GameTheoryMatrix
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

export function GameTheoryMatrixSection() {
  return (
    <section className="my-10">
      <GameTheoryMatrix />
    </section>
  );
}
