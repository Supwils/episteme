"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import { MATH_FIELD_COLORS, mathBadgeColor } from "@/subjects/mathematics/lib/constants";

/**
 * Client-side browser for the math concepts index: full-text search over
 * title/EN title/key figures/field/tags plus field filter chips.
 * Field grouping and card visuals are unchanged from the original page.
 */

export type MathConceptItem = {
  slug: string;
  title: string;
  title_en: string;
  field: string;
  key_figures: string[];
  tags: string[];
};

export function MathConceptsListBrowser({ concepts }: { concepts: MathConceptItem[] }) {
  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(() => {
    const seen: ListFilterChip[] = [];
    for (const c of concepts) {
      if (!seen.some((chip) => chip.value === c.field)) {
        seen.push({
          value: c.field,
          label: c.field,
          color: MATH_FIELD_COLORS[c.field] ?? "#6366f1",
        });
      }
    }
    return seen;
  }, [concepts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return concepts.filter((c) => {
      if (activeField && c.field !== activeField) return false;
      if (!q) return true;
      const haystack = [c.title, c.title_en, c.field, ...c.key_figures, ...c.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [concepts, query, activeField]);

  const grouped = useMemo(() => {
    const map = new Map<string, MathConceptItem[]>();
    for (const c of filtered) {
      const list = map.get(c.field) ?? [];
      list.push(c);
      map.set(c.field, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      <ListSearchFilter
        query={query}
        onQueryChange={setQuery}
        chips={chips}
        activeChip={activeField}
        onChipChange={setActiveField}
        matched={filtered.length}
        total={concepts.length}
        placeholder="搜索概念：名称、人物、标签…"
        searchLabel="搜索数学概念"
        chipsLabel="按分支筛选"
        focusAccentClass="focus:border-accent-indigo/60"
      />

      {filtered.length === 0 ? (
        <ListEmptyState
          onReset={() => {
            setQuery("");
            setActiveField(null);
          }}
        />
      ) : (
        grouped.map(([field, fieldConcepts]) => {
          const fieldColor = MATH_FIELD_COLORS[field] || "#6366f1";

          return (
            <div key={field} className="mb-14">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ color: mathBadgeColor(fieldColor) }}
                >
                  {field}
                </span>
                <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                  {fieldConcepts.length} 个概念
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldConcepts.map((concept) => (
                  <Link
                    key={concept.slug}
                    href={`/mathematics/concepts/${concept.slug}`}
                    className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div
                      className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
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
                          style={{ color: mathBadgeColor(fieldColor) }}
                        >
                          {concept.field}
                        </span>
                      </div>

                      <h3 className="font-display text-fg-primary group-hover:text-accent-indigo text-base font-semibold transition-colors">
                        {concept.title}
                      </h3>
                      <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic">
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
            </div>
          );
        })
      )}
    </div>
  );
}
