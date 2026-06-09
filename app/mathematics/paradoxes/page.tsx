import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathParadoxes, getMathParadoxesByField } from "@/src-mathematics/lib/paradoxes";
import { MATH_FIELD_COLORS } from "@/src-mathematics/lib/constants";

export const metadata: Metadata = {
  title: "数学悖论 — Universe Knowledge",
  description: "从芝诺到巴拿赫-塔斯基，探索数学中最深刻、最反直觉的悖论",
  openGraph: {
    title: "数学悖论 — Universe Knowledge",
    description: "从芝诺到巴拿赫-塔斯基，探索数学中最深刻、最反直觉的悖论",
    type: "website",
  },
};

export default function MathParadoxesPage() {
  const paradoxes = getAllMathParadoxes();
  const grouped = getMathParadoxesByField();
  const fields = Object.keys(grouped);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / paradoxes
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 悖论</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {paradoxes.length > 0
            ? `${paradoxes.length} 个深刻而反直觉的数学悖论，挑战人类理性`
            : "探索数学中最深刻、最反直觉的悖论——内容正在编写中"}
        </p>
      </header>

      {paradoxes.length > 0 ? (
        fields.map((field) => {
          const fieldParadoxes = grouped[field] ?? [];
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
                  {fieldParadoxes.length} 个悖论
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldParadoxes.map((paradox) => (
                  <Link
                    key={paradox.slug}
                    href={`/mathematics/paradoxes/${paradox.slug}`}
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
                          {paradox.field}
                        </span>
                      </div>

                      <h3 className="font-display text-fg-primary text-base font-semibold transition-colors group-hover:text-accent-indigo">
                        {paradox.title}
                      </h3>
                      <p className="text-fg-muted mt-0.5 font-display text-sm italic tracking-wide opacity-60">
                        {paradox.title_en}
                      </p>

                      {paradox.key_figures.length > 0 && (
                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {paradox.key_figures.slice(0, 3).join(" · ")}
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
            暂无悖论内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            悖论文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
