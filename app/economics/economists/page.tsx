import type { Metadata } from "next";
import { getAllEconomists } from "@/subjects/economics/lib/mdx";
import { EconomistsListBrowser } from "@/components/economics/EconomistsListBrowser";

export const metadata: Metadata = {
  title: "经济学家 — Episteme · 格致",
  description: "从亚当·斯密到现代诺贝尔奖得主，经济学巨匠的生平、思想与遗产",
};

const ERAS = ["古典", "新古典", "现代", "当代"] as const;

export default function EconomistsPage() {
  const all = getAllEconomists();
  const economists = all.map((e) => ({
    slug: e.slug,
    title: e.title,
    name_en: e.name_en,
    years: e.years,
    era: e.era,
    school: e.school,
    key_contributions: e.key_contributions,
    nobel: e.nobel ?? false,
    tags: e.tags,
  }));

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          economics / economists
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 学家</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {economists.length} 位影响世界的经济学巨匠，从古典政治经济学到当代行为经济学
        </p>
      </header>

      {economists.length > 0 ? (
        <EconomistsListBrowser economists={economists} eras={ERAS} />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无经济学家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">经济学家文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
