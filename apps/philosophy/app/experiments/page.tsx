import Link from "next/link";
import { getAllExperiments } from "@/lib/experiments";
import { FIELD_COLORS } from "@/lib/constants";

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

export const metadata = {
  title: "思想实验 — Philosophy",
  description: "哲学家们用思想实验来检验概念、挑战直觉、揭示悖论。",
};

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / experiments
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          思想<em className="text-accent-gold italic"> 实验</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          哲学家们用思想实验来检验概念、挑战直觉、揭示悖论。这些虚构的场景比任何实验室都更能触及人类理性的边界。
        </p>
      </header>

      <p className="text-fg-disabled mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
        {experiments.length} 个思想实验 · thought experiments
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((exp, i) => {
          const fieldColor = FIELD_COLORS[exp.field] || "#6b6460";
          return (
            <Link
              key={exp.slug}
              href={`/experiments/${exp.slug}`}
              className="group border-border-faint bg-bg-panel relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-fg-disabled/30 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              style={{
                animationDelay: `${i * 70}ms`,
                animation: "fadeInUp 0.5s var(--ease-product) both",
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: fieldColor }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase transition-colors duration-300"
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
                <h2 className="font-display text-fg-primary text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-gold">
                  {exp.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                  {exp.title_en}
                </p>
              </div>

              <p className="text-fg-secondary relative text-sm">
                {exp.philosopher}
              </p>

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
                className="text-fg-disabled group-hover:text-accent-gold absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
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
    </div>
  );
}
