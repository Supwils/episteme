import type { Metadata } from "next";
import Link from "next/link";
import { getAllConcepts } from "@/src-economics/lib/mdx";
import { CATEGORY_COLORS } from "@/src-economics/lib/constants";

export const metadata: Metadata = {
  title: "经济学概念 — Universe Knowledge",
  description: "GDP、通货膨胀、边际效用、机会成本等基础与进阶经济学概念",
};

export default function ConceptsPage() {
  const concepts = getAllConcepts();

  const grouped: Record<string, typeof concepts> = {};
  for (const concept of concepts) {
    const cat = concept.category || "其他";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(concept);
  }
  const categories = Object.keys(grouped).sort();

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          economics / concepts
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 概念</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {concepts.length} 个经济学核心概念，从基础定义到进阶理论
        </p>
      </header>

      {categories.map((category) => {
        const items = grouped[category] ?? [];
        const accent = CATEGORY_COLORS[category] ?? "#c8a45a";

        return (
          <section key={category} className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: accent }}
              >
                {category}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {items.length} 个概念
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((concept) => (
                <Link
                  key={concept.slug}
                  href={`/economics/concepts/${concept.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
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
                        {concept.category}
                      </span>
                    </div>

                    <h3 className="font-display text-fg-primary text-base font-semibold transition-colors group-hover:text-accent-gold">
                      {concept.title}
                    </h3>
                    <p className="text-fg-muted mt-0.5 font-display text-sm italic tracking-wide opacity-60">
                      {concept.title_en}
                    </p>

                    {concept.key_figures.length > 0 && (
                      <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                        {concept.key_figures.slice(0, 3).join("、")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {concepts.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无概念内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            经济学概念文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
