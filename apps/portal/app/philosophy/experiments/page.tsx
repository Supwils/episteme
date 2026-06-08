import type { Metadata } from "next";
import Link from "next/link";
import { getAllExperiments } from "@/lib/experiments";
import { FIELD_COLORS } from "@/lib/constants";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { ThoughtExperimentSection } from "./ThoughtExperimentSection";

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

export const metadata: Metadata = {
  title: "思想实验 — Universe Knowledge",
  description: "哲学家们用思想实验来检验概念、挑战直觉、揭示悖论",
};

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          philosophy / experiments
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          思想<em className="text-accent-gold italic"> 实验</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          哲学家们用思想实验来检验概念、挑战直觉、揭示悖论。这些虚构的场景比任何实验室都更能触及人类理性的边界。
        </p>
      </header>

      <section className="mb-16">
        <p className="text-fg-disabled mb-4 font-mono text-[10px] uppercase tracking-[0.38em]">
          interactive · 决策树
        </p>
        <ThoughtExperimentSection />
      </section>

      <p className="text-fg-disabled mb-8 font-mono text-[10px] uppercase tracking-[0.38em]">
        {experiments.length} 个思想实验 · thought experiments
      </p>

      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {experiments.map((exp) => {
          const fieldColor = FIELD_COLORS[exp.field] || "#6b6460";
          return (
            <StaggerItem key={exp.slug}>
              <Link
                href={`/philosophy/experiments/${exp.slug}`}
                className="border-border-faint bg-bg-panel hover:border-fg-disabled/30 group relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: fieldColor }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em] transition-colors duration-300"
                    style={{
                      borderColor: `${fieldColor}50`,
                      color: fieldColor,
                    }}
                  >
                    {exp.field}
                  </span>
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                    {formatYear(exp.year)}
                  </span>
                </div>

                <div className="relative flex flex-col gap-1.5">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg font-semibold leading-tight transition-colors duration-300">
                    {exp.title}
                  </h2>
                  <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                    {exp.title_en}
                  </p>
                </div>

                <p className="text-fg-secondary relative text-sm">{exp.philosopher}</p>

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
                  className="text-fg-disabled group-hover:text-accent-gold absolute bottom-4 right-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: fieldColor }}
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
