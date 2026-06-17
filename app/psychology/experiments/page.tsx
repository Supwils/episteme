import type { Metadata } from "next";
import { lazy, Suspense } from "react";
import { getAllExperiments } from "@/subjects/psychology/lib/mdx";
import ExperimentsGrid from "./ExperimentsGrid";

const StroopEffect = lazy(
  () => import("@/subjects/psychology/components/visualizations/StroopEffect")
);

export const metadata: Metadata = {
  title: "经典实验 — Episteme · 格致",
  description: "改变心理学进程的里程碑实验与发现",
};

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          psychology / experiments
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          经典<em className="text-accent-blue italic"> 实验</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {experiments.length}{" "}
          项改变心理学进程的里程碑实验，从巴甫洛夫的条件反射到米尔格拉姆的服从研究。
        </p>
      </header>

      <div className="mb-12">
        <Suspense
          fallback={
            <div className="border-border-faint bg-bg-panel flex h-64 items-center justify-center border">
              <span className="text-fg-muted font-mono text-xs">加载中…</span>
            </div>
          }
        >
          <StroopEffect />
        </Suspense>
      </div>

      {experiments.length > 0 ? (
        <ExperimentsGrid experiments={experiments} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无实验内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
