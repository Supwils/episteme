import type { Metadata } from "next";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { getAllExperiments } from "@/subjects/psychology/lib/mdx";
import { FIELD_COLORS } from "@/subjects/psychology/lib/constants";

const StroopEffect = lazy(
  () => import("@/subjects/psychology/components/visualizations/StroopEffect"),
);

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

export const metadata: Metadata = {
  title: "经典实验 — Universe Knowledge",
  description: "改变心理学进程的里程碑实验与发现",
};

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          psychology / experiments
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          经典<em className="text-accent-blue italic"> 实验</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {experiments.length} 项改变心理学进程的里程碑实验，从巴甫洛夫的条件反射到米尔格拉姆的服从研究。
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

      <div className="mb-8 flex flex-wrap gap-2">
        {["全部", "1900s", "1950s", "1960s", "1970s", "2000s"].map((decade) => (
          <span key={decade} className={`filter-tab ${decade === "全部" ? "active" : ""}`}>
            {decade}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {experiments.map((exp) => {
          const fieldColor = FIELD_COLORS[exp.field] || "#6b8fd6";
          return (
            <Link
              key={exp.slug}
              href={`/psychology/experiments/${exp.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: fieldColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
                >
                  {exp.field}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {formatYear(exp.year)}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg font-semibold leading-tight transition-colors duration-300">
                  {exp.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                  {exp.title_en}
                </p>
              </div>
              <p className="text-fg-secondary relative text-sm">{exp.researcher}</p>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {exp.tags.slice(0, 3).map((tag) => (
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
                className="text-fg-disabled group-hover:text-accent-purple absolute bottom-4 right-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              >
                →
              </span>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: fieldColor }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {experiments.length === 0 && (
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
