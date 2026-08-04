"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import {
  MATH_FIELD_COLORS,
  MATH_DIFFICULTY_COLORS,
  mathBadgeColor,
} from "@/subjects/mathematics/lib/constants";

/**
 * Client-side browser for the theorems index: full-text search over
 * title/EN title/mathematician/field/tags plus field filter chips.
 * Field grouping and card visuals are unchanged from the original page.
 */

export type TheoremItem = {
  slug: string;
  title: string;
  title_en: string;
  field: string;
  mathematician: string;
  year: number | null;
  difficulty: string;
  tags: string[];
};

export function TheoremsListBrowser({ theorems }: { theorems: TheoremItem[] }) {
  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(() => {
    const seen: ListFilterChip[] = [];
    for (const t of theorems) {
      if (!seen.some((c) => c.value === t.field)) {
        seen.push({
          value: t.field,
          label: t.field,
          color: MATH_FIELD_COLORS[t.field] ?? "#6366f1",
        });
      }
    }
    return seen;
  }, [theorems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return theorems.filter((t) => {
      if (activeField && t.field !== activeField) return false;
      if (!q) return true;
      const haystack = [t.title, t.title_en, t.mathematician, t.field, ...t.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [theorems, query, activeField]);

  const grouped = useMemo(() => {
    const map = new Map<string, TheoremItem[]>();
    for (const t of filtered) {
      const list = map.get(t.field) ?? [];
      list.push(t);
      map.set(t.field, list);
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
        total={theorems.length}
        placeholder="搜索定理：名称、数学家、标签…"
        searchLabel="搜索定理"
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
        grouped.map(([field, fieldTheorems]) => {
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
                  {fieldTheorems.length} 个定理
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fieldTheorems.map((theorem) => {
                  const difficultyColor = MATH_DIFFICULTY_COLORS[theorem.difficulty] || "#6366f1";
                  return (
                    <Link
                      key={theorem.slug}
                      href={`/mathematics/theorems/${theorem.slug}`}
                      className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div
                        className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                        style={{ backgroundColor: fieldColor }}
                      />

                      <div className="relative">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-6 w-0.5 rounded-full opacity-50"
                              style={{ backgroundColor: fieldColor }}
                            />
                            <span
                              className="font-mono text-[9px] tracking-[0.22em] uppercase"
                              style={{ color: mathBadgeColor(fieldColor) }}
                            >
                              {theorem.field}
                            </span>
                          </div>
                          <span
                            className="rounded-full border px-2 py-0.5 font-mono text-[8px] tracking-[0.16em]"
                            style={{
                              borderColor: `${difficultyColor}40`,
                              color: mathBadgeColor(difficultyColor),
                            }}
                          >
                            {theorem.difficulty}
                          </span>
                        </div>

                        <h3 className="font-display text-fg-primary group-hover:text-accent-indigo text-base font-semibold transition-colors">
                          {theorem.title}
                        </h3>
                        <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic">
                          {theorem.title_en}
                        </p>

                        <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                          {theorem.mathematician}
                          {theorem.year ? ` · ${theorem.year}` : ""}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
