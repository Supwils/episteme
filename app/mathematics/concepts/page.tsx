import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathConcepts } from "@/subjects/mathematics/lib/concepts";
import { MathConceptsListBrowser } from "@/components/mathematics/MathConceptsListBrowser";

export const metadata: Metadata = {
  title: "数学概念 — Episteme · 格致",
  description: "从群论到拓扑，探索数学中最核心的概念与思想工具",
  openGraph: {
    title: "数学概念 — Episteme · 格致",
    description: "从群论到拓扑，探索数学中最核心的概念与思想工具",
    type: "website",
  },
};

export default function MathConceptsPage() {
  const all = getAllMathConcepts();
  const concepts = all.map((c) => ({
    slug: c.slug,
    title: c.title,
    title_en: c.title_en,
    field: c.field || "其他",
    key_figures: c.key_figures,
    tags: c.tags,
  }));

  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / concepts
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              数学<em className="text-accent-indigo italic"> 概念</em>
            </h1>
            <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
              {concepts.length > 0
                ? `${concepts.length} 个数学核心概念，涵盖代数、几何、分析、数论等领域`
                : "探索数学中最核心的概念与思想工具——内容正在编写中"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/mathematics/concepts/probability"
              className="group flex items-center gap-2 rounded-lg border border-[var(--color-accent-gold)]/20 bg-[var(--color-accent-gold)]/10 px-4 py-2.5 text-sm text-[var(--color-accent-gold)] transition-all hover:border-[var(--color-accent-gold)]/40 hover:bg-[var(--color-accent-gold)]/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <rect x="3" y="3" width="10" height="10" rx="1" />
                <circle cx="6" cy="6" r="1" fill="currentColor" />
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </svg>
              概率模拟
            </Link>
            <Link
              href="/mathematics/concepts/matrix-transformer"
              className="group flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-sm text-indigo-300 transition-all hover:border-indigo-400/40 hover:bg-indigo-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <rect x="2" y="2" width="5" height="5" rx="0.5" />
                <rect x="9" y="9" width="5" height="5" rx="0.5" transform="rotate(15 11.5 11.5)" />
              </svg>
              矩阵变换
            </Link>
            <Link
              href="/mathematics/concepts/number-line"
              className="group flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <line x1="2" y1="8" x2="14" y2="8" />
                <circle cx="5" cy="8" r="1" fill="currentColor" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
                <circle cx="11" cy="8" r="1" fill="currentColor" />
              </svg>
              数轴概念
            </Link>
          </div>
        </div>
      </header>

      {concepts.length > 0 ? (
        <MathConceptsListBrowser concepts={concepts} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无概念内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">概念文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
