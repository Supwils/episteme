import type { Metadata } from "next";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { getAllPhenomena } from "@/subjects/psychology/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";
import BrainRegions from "@/subjects/psychology/components/visualizations/BrainRegions";
import BiasTaxonomy from "@/subjects/psychology/components/visualizations/BiasTaxonomy";

const MemoryCurve = lazy(
  () => import("@/subjects/psychology/components/visualizations/MemoryCurve"),
);
const DecisionMatrix = lazy(
  () => import("@/subjects/psychology/components/visualizations/DecisionMatrix"),
);

const CATEGORIES = ["全部", "认知", "社会", "发展", "情绪", "感知", "记忆", "决策"];

export const metadata: Metadata = {
  title: "心理现象 — Universe Knowledge",
  description: "认知偏差、社会效应与令人惊奇的心理规律",
};

export default function PhenomenaPage() {
  const phenomena = getAllPhenomena();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
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

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <span key={cat} className={`filter-tab ${cat === "全部" ? "active" : ""}`}>
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {phenomena.map((p) => {
          const catColor = CATEGORY_COLORS[p.category] || "#d4789c";
          return (
            <Link
              key={p.slug}
              href={`/psychology/phenomena/${p.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: catColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ borderColor: `${catColor}50`, color: catColor }}
                >
                  {p.category}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg font-semibold leading-tight transition-colors duration-300">
                  {p.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                  {p.title_en}
                </p>
              </div>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: catColor }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {phenomena.length === 0 && (
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
