import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";

export const metadata: Metadata = {
  title: "经济案例 — Episteme · 格致",
  description: "大萧条、金融危机、日本泡沫——真实经济事件的深度分析",
};

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          economics / case-studies
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 案例</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {caseStudies.length} 个真实经济事件的深度分析，从历史中学习经济运行的规律
        </p>
      </header>

      <div className="relative">
        <div className="bg-border-faint absolute top-0 bottom-0 left-4 w-px md:left-8" />

        <div className="space-y-6">
          {caseStudies.map((cs) => {
            const color = CATEGORY_COLORS[cs.category] ?? "#c8a45a";
            return (
              <div key={cs.slug} className="relative pl-12 md:pl-20">
                <div
                  className="absolute top-6 left-2.5 h-3 w-3 rounded-full border-2 md:left-6.5"
                  style={{
                    borderColor: color,
                    backgroundColor: "var(--color-bg-deep)",
                  }}
                />

                <Link
                  href={`/economics/case-studies/${cs.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative block overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
                >
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: color }}
                  />

                  <div className="relative mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className="font-mono text-[11px] font-semibold tracking-[0.22em]"
                      style={{ color }}
                    >
                      {formatYear(cs.year)}
                    </span>
                    <span
                      className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.22em] uppercase"
                      style={{ borderColor: `${color}40`, color }}
                    >
                      {cs.category}
                    </span>
                    <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                      {cs.region}
                    </span>
                  </div>

                  <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg leading-tight font-semibold transition-colors duration-300">
                    {cs.title}
                  </h2>
                  {cs.title_en && (
                    <p className="text-fg-muted mt-1 font-mono text-[11px] tracking-wider italic">
                      {cs.title_en}
                    </p>
                  )}

                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    aria-hidden
                    className="text-fg-disabled group-hover:text-accent-gold absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {caseStudies.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无案例内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">经济案例文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
