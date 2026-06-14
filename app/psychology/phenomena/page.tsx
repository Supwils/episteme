import type { Metadata } from "next";
import { lazy, Suspense } from "react";
import { getAllPhenomena } from "@/subjects/psychology/lib/mdx";
import BrainRegions from "@/subjects/psychology/components/visualizations/BrainRegions";
import BiasTaxonomy from "@/subjects/psychology/components/visualizations/BiasTaxonomy";
import PhenomenaGrid from "./PhenomenaGrid";

const MemoryCurve = lazy(
  () => import("@/subjects/psychology/components/visualizations/MemoryCurve")
);
const DecisionMatrix = lazy(
  () => import("@/subjects/psychology/components/visualizations/DecisionMatrix")
);

export const metadata: Metadata = {
  title: "心理现象 — Universe Knowledge",
  description: "认知偏差、社会效应与令人惊奇的心理规律",
};

export default function PhenomenaPage() {
  const phenomena = getAllPhenomena();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          psychology / phenomena
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          心理<em className="text-accent-pink italic"> 现象</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {phenomena.length} 个认知偏差、社会效应与令人惊奇的心理规律，揭示人类心智的隐秘运作。
        </p>
      </header>

      <div className="mb-12">
        <BrainRegions />
      </div>

      <div className="mb-12">
        <BiasTaxonomy />
      </div>

      <div className="mb-12">
        <Suspense
          fallback={
            <div className="border-border-faint bg-bg-panel flex h-64 items-center justify-center border">
              <span className="text-fg-muted font-mono text-xs">加载中…</span>
            </div>
          }
        >
          <MemoryCurve />
        </Suspense>
      </div>

      <div className="mb-12">
        <Suspense
          fallback={
            <div className="border-border-faint bg-bg-panel flex h-64 items-center justify-center border">
              <span className="text-fg-muted font-mono text-xs">加载中…</span>
            </div>
          }
        >
          <DecisionMatrix />
        </Suspense>
      </div>

      {phenomena.length > 0 ? (
        <PhenomenaGrid phenomena={phenomena} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无心理现象内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
