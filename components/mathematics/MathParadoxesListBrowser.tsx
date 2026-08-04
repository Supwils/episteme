"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import { MATH_FIELD_COLORS, mathBadgeColor } from "@/subjects/mathematics/lib/constants";

/**
 * Client-side browser for the math paradoxes index: full-text search over
 * title/EN title/key figures/field/tags plus field filter chips.
 * Field grouping and card visuals are unchanged from the original page.
 */

export type MathParadoxItem = {
  slug: string;
  title: string;
  title_en: string;
  field: string;
  key_figures: string[];
  tags: string[];
};

export function MathParadoxesListBrowser({ paradoxes }: { paradoxes: MathParadoxItem[] }) {
  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(() => {
    const seen: ListFilterChip[] = [];
    for (const p of paradoxes) {
      if (!seen.some((chip) => chip.value === p.field)) {
        seen.push({
          value: p.field,
          label: p.field,
          color: MATH_FIELD_COLORS[p.field] ?? "#6366f1",
        });
      }
    }
    return seen;
  }, [paradoxes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return paradoxes.filter((p) => {
      if (activeField && p.field !== activeField) return false;
      if (!q) return true;
      const haystack = [p.title, p.title_en, p.field, ...p.key_figures, ...p.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [paradoxes, query, activeField]);

  const grouped = useMemo(() => {
    const map = new Map<string, MathParadoxItem[]>();
    for (const p of filtered) {
      const list = map.get(p.field) ?? [];
      list.push(p);
      map.set(p.field, list);
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
        total={paradoxes.length}
        placeholder="搜索悖论：名称、人物、标签…"
        searchLabel="搜索数学悖论"
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
        grouped.map(([field, fieldParadoxes]) => {
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
                  {fieldParadoxes.length} 个悖论
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldParadoxes.map((paradox) => (
                  <Link
                    key={paradox.slug}
                    href={`/mathematics/paradoxes/${paradox.slug}`}
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
                          {paradox.field}
                        </span>
                      </div>

                      <h3 className="font-display text-fg-primary group-hover:text-accent-indigo text-base font-semibold transition-colors">
                        {paradox.title}
                      </h3>
                      <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic">
                        {paradox.title_en}
                      </p>

                      {paradox.key_figures.length > 0 && (
                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {paradox.key_figures.slice(0, 3).join(" · ")}
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
