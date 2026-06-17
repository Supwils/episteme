import type { Metadata } from "next";
import Link from "next/link";
import { getAllMathDialogues } from "@/subjects/mathematics/lib/dialogues";
import { MATH_FIELD_COLORS, MATH_ERA_ACCENT } from "@/subjects/mathematics/lib/constants";

export const metadata: Metadata = {
  title: "数学对话 — Episteme · 格致",
  description: "数学家之间的思想交锋——从欧拉与达朗贝尔到希尔伯特与布劳威尔",
  openGraph: {
    title: "数学对话 — Episteme · 格致",
    description: "数学家之间的思想交锋——从欧拉与达朗贝尔到希尔伯特与布劳威尔",
    type: "website",
  },
};

export default function MathDialoguesPage() {
  const dialogues = getAllMathDialogues();

  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / dialogues
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 对话</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {dialogues.length > 0
            ? `${dialogues.length} 篇跨越时代的数学思想交锋`
            : "数学家之间的思想交锋——内容正在编写中"}
        </p>
      </header>

      {dialogues.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {dialogues.map((d) => {
            const fieldColor = MATH_FIELD_COLORS[d.field] || "#6366f1";
            const eraColor = MATH_ERA_ACCENT[d.era] || "#6366f1";
            return (
              <Link
                key={d.slug}
                href={`/mathematics/dialogues/${d.slug}`}
                className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(99,102,241,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: fieldColor }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase transition-colors duration-300"
                    style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
                  >
                    {d.field}
                  </span>
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                    style={{ borderColor: `${eraColor}30`, color: eraColor }}
                  >
                    {d.era}
                  </span>
                </div>

                <div className="relative flex flex-col gap-1.5">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-indigo text-lg leading-tight font-semibold transition-colors duration-300">
                    {d.title}
                  </h2>
                  <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                    {d.title_en}
                  </p>
                </div>

                <p className="text-fg-secondary relative text-sm">{d.participants.join(" · ")}</p>

                <div className="relative mt-auto flex flex-wrap gap-1.5">
                  {d.tags.slice(0, 3).map((tag) => (
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
                  style={{ backgroundColor: fieldColor }}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无对话内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">对话文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
