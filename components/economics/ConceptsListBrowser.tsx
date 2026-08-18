"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import { orderConceptCategories, conceptCategoryColor } from "@/subjects/economics/lib/constants";

/**
 * Client-side browser for the economics concepts index: full-text search over
 * title/EN title/category/key figures/tags/excerpt plus category filter chips.
 * Categories render in the fixed pedagogical CONCEPT_CATEGORY_ORDER (not
 * Unicode code-point order); card visuals follow the original page.
 */

export type ConceptItem = {
  slug: string;
  title: string;
  title_en: string;
  category: string;
  key_figures: string[];
  tags: string[];
  excerpt: string;
};

export function ConceptsListBrowser({ concepts }: { concepts: ConceptItem[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(() => {
    const counts = new Map<string, number>();
    for (const c of concepts) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    return orderConceptCategories(counts.keys()).map((cat) => ({
      value: cat,
      label: `${cat} (${counts.get(cat)})`,
      color: conceptCategoryColor(cat),
    }));
  }, [concepts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return concepts.filter((c) => {
      if (activeCategory && c.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [c.title, c.title_en, c.category, c.excerpt, ...c.key_figures, ...c.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [concepts, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, ConceptItem[]>();
    for (const c of filtered) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return orderConceptCategories(map.keys()).map((cat) => [cat, map.get(cat)!] as const);
  }, [filtered]);

  return (
    <div>
      <ListSearchFilter
        query={query}
        onQueryChange={setQuery}
        chips={chips}
        activeChip={activeCategory}
        onChipChange={setActiveCategory}
        matched={filtered.length}
        total={concepts.length}
        placeholder="搜索概念：名称、人物、标签、摘要…"
        searchLabel="搜索经济学概念"
        chipsLabel="按分类筛选"
      />

      {filtered.length === 0 ? (
        <ListEmptyState
          onReset={() => {
            setQuery("");
            setActiveCategory(null);
          }}
        />
      ) : (
        grouped.map(([category, items]) => {
          const accent = conceptCategoryColor(category);

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
                      className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
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

                      <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-base font-semibold transition-colors">
                        {concept.title}
                      </h3>
                      <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic opacity-60">
                        {concept.title_en}
                      </p>

                      {concept.excerpt && (
                        <p className="text-fg-secondary mt-2 line-clamp-2 text-[13px] leading-relaxed">
                          {concept.excerpt}
                        </p>
                      )}

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
        })
      )}
    </div>
  );
}
