import type { Metadata } from "next";
import { getAllConcepts } from "@/subjects/economics/lib/mdx";
import { extractExcerpt } from "@/lib/content-utils";
import { ConceptsListBrowser } from "@/components/economics/ConceptsListBrowser";
import type { ConceptItem } from "@/components/economics/ConceptsListBrowser";

export const metadata: Metadata = {
  title: "经济学概念 — Episteme · 格致",
  description: "GDP、通货膨胀、边际效用、机会成本等基础与进阶经济学概念",
};

export default function ConceptsPage() {
  const concepts = getAllConcepts();

  const items: ConceptItem[] = concepts.map((concept) => ({
    slug: concept.slug,
    title: concept.title,
    title_en: concept.title_en,
    category: concept.category || "其他",
    key_figures: concept.key_figures,
    tags: concept.tags,
    excerpt: extractExcerpt(concept.content, 120),
  }));

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
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

      {concepts.length === 0 ? (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无概念内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">经济学概念文章正在撰写中，敬请期待。</p>
        </div>
      ) : (
        <ConceptsListBrowser concepts={items} />
      )}
    </div>
  );
}
