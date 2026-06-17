import type { Metadata } from "next";
import Link from "next/link";
import { getAllConcepts, getConceptsByField, getOrderedFields } from "@/lib/concepts";
import { FIELD_ACCENTS } from "@/lib/constants";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "哲学概念 — Episteme · 格致",
  description: "从形而上学到逻辑学，探索哲学中最核心的概念与思想工具",
};

export default function ConceptsPage() {
  const allConcepts = getAllConcepts();
  const fields = getOrderedFields();
  const grouped = getConceptsByField();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              哲学<em className="text-accent-gold italic"> 概念</em>
            </h1>
            <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
              {allConcepts.length}{" "}
              个哲学核心概念，涵盖形而上学、认识论、伦理学、美学、政治哲学与逻辑学六大领域。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/philosophy/concepts/ethics-spectrum"
              className="group flex items-center gap-2 rounded-lg border border-[var(--color-accent-gold)]/20 bg-[var(--color-accent-gold)]/10 px-4 py-2.5 text-sm text-[var(--color-accent-gold)] transition-all hover:border-[var(--color-accent-gold)]/40 hover:bg-[var(--color-accent-gold)]/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <circle cx="4" cy="8" r="2" />
                <circle cx="12" cy="4" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="8" cy="6" r="1" />
                <circle cx="8" cy="10" r="1" />
              </svg>
              伦理学光谱
            </Link>
            <Link
              href="/philosophy/concepts/map"
              className="group flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-sm text-indigo-300 transition-all hover:border-indigo-400/40 hover:bg-indigo-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <circle cx="4" cy="4" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="8" cy="12" r="2" />
                <path d="M6 4h4M5 5.5l2.5 5M11 5.5l-2.5 5" strokeLinecap="round" />
              </svg>
              概念图谱
            </Link>
            <Link
              href="/philosophy/concepts/dialectic-triangle"
              className="group flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <polygon points="8,2 2,14 14,14" />
              </svg>
              辩证三角
            </Link>
            <Link
              href="/philosophy/concepts/virtue-radar"
              className="group flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-sm text-violet-300 transition-all hover:border-violet-400/40 hover:bg-violet-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <circle cx="8" cy="8" r="5" />
                <circle cx="8" cy="8" r="3" />
                <circle cx="8" cy="8" r="1" />
              </svg>
              美德雷达
            </Link>
            <Link
              href="/philosophy/concepts/quiz"
              className="group flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300 transition-all hover:border-amber-400/40 hover:bg-amber-500/20"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <circle cx="8" cy="8" r="6" />
                <text
                  x="8"
                  y="11"
                  textAnchor="middle"
                  fontSize="8"
                  fill="currentColor"
                  stroke="none"
                >
                  ?
                </text>
              </svg>
              哲学测试
            </Link>
          </div>
        </div>
      </header>

      {fields.map((field) => {
        const concepts = grouped[field] ?? [];
        const accent = FIELD_ACCENTS[field] ?? "#c8a45a";

        return (
          <FadeInSection key={field} className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: accent }}
              >
                {field}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {concepts.length} 个概念
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>

            <StaggerGrid className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {concepts.map((concept) => (
                <StaggerItem key={concept.slug}>
                  <Link
                    href={`/philosophy/concepts/${concept.slug}`}
                    className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div
                      className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                      style={{ backgroundColor: accent }}
                    />

                    <div className="relative">
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className="h-6 w-0.5 rounded-full opacity-50"
                          style={{ backgroundColor: accent }}
                        />
                        <span
                          className="font-mono text-[9px] tracking-[0.22em] uppercase"
                          style={{ color: accent }}
                        >
                          {concept.field}
                        </span>
                      </div>

                      <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-base font-semibold transition-colors">
                        {concept.title}
                      </h3>
                      <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic opacity-60">
                        {concept.title_en}
                      </p>

                      {concept.key_figures.length > 0 && (
                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {concept.key_figures.slice(0, 3).join("、")}
                        </p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </FadeInSection>
        );
      })}

      {allConcepts.length === 0 && (
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
