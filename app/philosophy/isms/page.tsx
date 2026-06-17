import type { Metadata } from "next";
import Link from "next/link";
import { getAllIsms, getOrderedCategories, type Ism } from "@/lib/isms";
import IsmsFilter from "./IsmsFilter";
import { CATEGORY_ACCENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "哲学主义 — Episteme · 格致",
  description: "从本体论到伦理学，探索哲学中最重要的主义与立场",
};

export default function IsmsPage() {
  const allIsms = getAllIsms();
  const categories = getOrderedCategories();

  const serialized = allIsms.map((ism) => ({
    slug: ism.slug,
    title: ism.title,
    title_en: ism.title_en,
    category: ism.category,
    era: ism.era,
    key_figures: ism.key_figures,
  }));

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-10">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophical · isms
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          哲学<em className="text-accent-gold italic"> 主义</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          从唯物主义到存在主义，从理性主义到后现代主义——哲学中最核心的立场、争论与思想图谱。
        </p>
      </header>

      <IsmsFilter isms={serialized} categories={categories} categoryAccents={CATEGORY_ACCENTS} />
    </div>
  );
}
