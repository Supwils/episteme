import type { Metadata } from "next";
import { getAllMathematicians } from "@/subjects/mathematics/lib/mathematicians";
import { MathematiciansListBrowser } from "@/components/mathematics/MathematiciansListBrowser";

export const metadata: Metadata = {
  title: "数学家 — Episteme · 格致",
  description: "从欧几里得到陶哲轩，探索伟大数学家的生平、贡献与遗产",
  openGraph: {
    title: "数学家 — Episteme · 格致",
    description: "从欧几里得到陶哲轩，探索伟大数学家的生平、贡献与遗产",
    type: "website",
  },
};

export default function MathematiciansPage() {
  const mathematicians = getAllMathematicians().map((m) => ({
    slug: m.slug,
    title: m.title,
    name: m.name,
    era: m.era,
    field: m.field,
    birthYear: m.birthYear,
    deathYear: m.deathYear,
    nationality: m.nationality,
    tags: m.tags,
  }));

  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
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
        <MathematiciansListBrowser mathematicians={mathematicians} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无数学家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">数学家文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
