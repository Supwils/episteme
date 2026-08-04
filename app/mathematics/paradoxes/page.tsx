import type { Metadata } from "next";
import { getAllMathParadoxes } from "@/subjects/mathematics/lib/paradoxes";
import { MathParadoxesListBrowser } from "@/components/mathematics/MathParadoxesListBrowser";

export const metadata: Metadata = {
  title: "数学悖论 — Episteme · 格致",
  description: "从芝诺到巴拿赫-塔斯基，探索数学中最深刻、最反直觉的悖论",
  openGraph: {
    title: "数学悖论 — Episteme · 格致",
    description: "从芝诺到巴拿赫-塔斯基，探索数学中最深刻、最反直觉的悖论",
    type: "website",
  },
};

export default function MathParadoxesPage() {
  const paradoxes = getAllMathParadoxes().map((p) => ({
    slug: p.slug,
    title: p.title,
    title_en: p.title_en,
    field: p.field || "其他",
    key_figures: p.key_figures,
    tags: p.tags,
  }));

  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
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
        <MathParadoxesListBrowser paradoxes={paradoxes} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无悖论内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">悖论文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
