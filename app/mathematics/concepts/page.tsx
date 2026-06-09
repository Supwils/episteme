import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathConcepts, getMathConceptsByField } from "@/subjects/mathematics/lib/concepts";
import { MATH_FIELD_COLORS } from "@/subjects/mathematics/lib/constants";

export const metadata: Metadata = {
  title: "数学概念 — Universe Knowledge",
  description: "从群论到拓扑，探索数学中最核心的概念与思想工具",
  openGraph: {
    title: "数学概念 — Universe Knowledge",
    description: "从群论到拓扑，探索数学中最核心的概念与思想工具",
    type: "website",
  },
};

export default function MathConceptsPage() {
  const concepts = getAllMathConcepts();
  const grouped = getMathConceptsByField();
  const fields = Object.keys(grouped);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
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
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
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
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <rect x="2" y="2" width="5" height="5" rx="0.5" />
                <rect x="9" y="9" width="5" height="5" rx="0.5" transform="rotate(15 11.5 11.5)" />
              </svg>
              矩阵变换
            </Link>
            <Link
              href="/mathematics/concepts/number-line"
              className="group flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/20"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
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
        fields.map((field) => {
          const fieldConcepts = grouped[field] ?? [];
          const fieldColor = MATH_FIELD_COLORS[field] || "#6366f1";

          return (
            <div key={field} className="mb-14">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ color: fieldColor }}
                >
                  {field}
                </span>
                <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                  {fieldConcepts.length} 个概念
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldConcepts.map((concept) => (
                  <Link
                    key={concept.slug}
                    href={`/mathematics/concepts/${concept.slug}`}
                    className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                      style={{ backgroundColor: fieldColor }}
                    />

                    <div className="relative">
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className="h-6 w-0.5 rounded-full opacity-50"
                          style={{ backgroundColor: fieldColor }}
                        />
                        <span
                          className="font-mono text-[9px] tracking-[0.22em] uppercase"
                          style={{ color: fieldColor }}
                        >
                          {concept.field}
                        </span>
                      </div>

                      <h3 className="font-display text-fg-primary text-base font-semibold transition-colors group-hover:text-accent-indigo">
                        {concept.title}
                      </h3>
                      <p className="text-fg-muted mt-0.5 font-display text-sm italic tracking-wide opacity-60">
                        {concept.title_en}
                      </p>

                      {concept.key_figures.length > 0 && (
                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {concept.key_figures.slice(0, 3).join("、")}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无概念内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            概念文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
