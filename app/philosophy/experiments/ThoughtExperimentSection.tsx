"use client";

import dynamic from "next/dynamic";

const ThoughtExperimentTree = dynamic(
  () => import("@/src-philosophy/components/visualizations/ThoughtExperimentTree"),
  { ssr: false }
);

export function ThoughtExperimentSection() {
  return <ThoughtExperimentTree />;
}
