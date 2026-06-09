import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathematicians } from "@/src-mathematics/lib/mathematicians";
import { MATH_ERA_ACCENT } from "@/src-mathematics/lib/constants";

export const metadata: Metadata = {
  title: "数学家 — Universe Knowledge",
  description: "从欧几里得到陶哲轩，探索伟大数学家的生平、贡献与遗产",
  openGraph: {
    title: "数学家 — Universe Knowledge",
    description: "从欧几里得到陶哲轩，探索伟大数学家的生平、贡献与遗产",
    type: "website",
  },
};

export default function MathematiciansPage() {
  const mathematicians = getAllMathematicians();

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / mathematicians
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 家</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {mathematicians.length > 0
            ? `${mathematicians.length} 位伟大数学家的生平、贡献与遗产`
            : "探索伟大数学家的生平、贡献与遗产——内容正在编写中"}
        </p>
      </header>

      {mathematicians.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {mathematicians.map((m) => {
            const eraColor = MATH_ERA_ACCENT[m.era] || "#6366f1";
            return (
              <Link
                key={m.slug}
                href={`/mathematics/mathematicians/${m.slug}`}
                className="group border-border-faint bg-bg-panel relative flex h-full flex-col gap-3 overflow-hidden border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-fg-disabled/30 hover:shadow-[0_8px_32px_rgba(99,102,241,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: eraColor }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase transition-colors duration-300"
                    style={{ borderColor: `${eraColor}50`, color: eraColor }}
                  >
                    {m.era}
                  </span>
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em]">
                    {m.birthYear}–{m.deathYear ?? "至今"}
                  </span>
                </div>

                <div className="relative">
                  <h2 className="font-display text-fg-primary text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-indigo">
                    {m.title}
                  </h2>
                  <p className="text-fg-muted mt-0.5 font-mono text-[11px] italic tracking-wider">
                    {m.name}
                  </p>
                </div>

                <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                  {m.nationality} · {m.field}
                </p>

                <div className="relative mt-auto flex flex-wrap gap-1.5">
                  {m.tags.slice(0, 3).map((tag) => (
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
                  className="text-fg-disabled group-hover:text-accent-indigo absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: eraColor }}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无数学家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            数学家文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
