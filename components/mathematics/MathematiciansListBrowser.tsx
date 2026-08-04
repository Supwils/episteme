"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import { MATH_ERA_ACCENT, mathBadgeColor } from "@/subjects/mathematics/lib/constants";

/**
 * Client-side browser for the mathematicians index: full-text search over
 * title/EN name/nationality/field/tags plus era filter chips.
 * Card visuals are unchanged from the original server-rendered page.
 */

export type MathematicianItem = {
  slug: string;
  title: string;
  name: string;
  era: string;
  field: string;
  birthYear: number;
  deathYear: number | null;
  nationality: string;
  tags: string[];
};

export function MathematiciansListBrowser({
  mathematicians,
}: {
  mathematicians: MathematicianItem[];
}) {
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(() => {
    const seen: ListFilterChip[] = [];
    for (const m of mathematicians) {
      if (!seen.some((c) => c.value === m.era)) {
        seen.push({
          value: m.era,
          label: m.era,
          color: MATH_ERA_ACCENT[m.era] ?? "#6366f1",
        });
      }
    }
    return seen;
  }, [mathematicians]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mathematicians.filter((m) => {
      if (activeEra && m.era !== activeEra) return false;
      if (!q) return true;
      const haystack = [m.title, m.name, m.nationality, m.field, ...m.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [mathematicians, query, activeEra]);

  return (
    <div>
      <ListSearchFilter
        query={query}
        onQueryChange={setQuery}
        chips={chips}
        activeChip={activeEra}
        onChipChange={setActiveEra}
        matched={filtered.length}
        total={mathematicians.length}
        placeholder="搜索数学家：姓名、国籍、领域、标签…"
        searchLabel="搜索数学家"
        chipsLabel="按时代筛选"
        focusAccentClass="focus:border-accent-indigo/60"
      />

      {filtered.length === 0 ? (
        <ListEmptyState
          onReset={() => {
            setQuery("");
            setActiveEra(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((m) => {
            const eraColor = MATH_ERA_ACCENT[m.era] || "#6366f1";
            return (
              <Link
                key={m.slug}
                href={`/mathematics/mathematicians/${m.slug}`}
                className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-3 overflow-hidden border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(99,102,241,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: eraColor }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase transition-colors duration-300"
                    style={{ borderColor: `${eraColor}50`, color: mathBadgeColor(eraColor) }}
                  >
                    {m.era}
                  </span>
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em]">
                    {m.birthYear}–{m.deathYear ?? "至今"}
                  </span>
                </div>

                <div className="relative">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-indigo text-lg leading-tight font-semibold transition-colors duration-300">
                    {m.title}
                  </h2>
                  <p className="text-fg-muted mt-0.5 font-mono text-[11px] tracking-wider italic">
                    {m.name}
                  </p>
                </div>

                <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                  {m.nationality} · {m.field}
                </p>

                <div className="relative mt-auto flex flex-wrap gap-1.5">
                  {m.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  aria-hidden
                  className="text-fg-disabled group-hover:text-accent-indigo absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: eraColor }}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
