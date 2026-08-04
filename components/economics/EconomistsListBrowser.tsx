"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListSearchFilter, ListEmptyState } from "@/components/ListSearchFilter";
import type { ListFilterChip } from "@/components/ListSearchFilter";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";

/**
 * Client-side browser for the economists index: full-text search over
 * title/EN name/school/contributions/tags plus era filter chips. The chips
 * existed before as purely decorative counts — now they actually filter.
 * Card visuals are unchanged from the original server-rendered page.
 */

export type EconomistItem = {
  slug: string;
  title: string;
  name_en: string;
  years: string;
  era: string;
  school: string;
  key_contributions: string[];
  nobel: boolean;
  tags: string[];
};

export function EconomistsListBrowser({
  economists,
  eras,
}: {
  economists: EconomistItem[];
  eras: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<string | null>(null);

  const chips = useMemo<ListFilterChip[]>(
    () =>
      eras.map((era) => ({
        value: era,
        label: `${era} (${economists.filter((e) => e.era === era).length})`,
        color: ERA_COLORS[era] ?? "#c8a45a",
      })),
    [economists, eras]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return economists.filter((e) => {
      if (activeEra && e.era !== activeEra) return false;
      if (!q) return true;
      const haystack = [e.title, e.name_en, e.school, ...e.key_contributions, ...e.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [economists, query, activeEra]);

  return (
    <div>
      <ListSearchFilter
        query={query}
        onQueryChange={setQuery}
        chips={chips}
        activeChip={activeEra}
        onChipChange={setActiveEra}
        matched={filtered.length}
        total={economists.length}
        placeholder="搜索经济学家：姓名、流派、贡献、标签…"
        searchLabel="搜索经济学家"
        chipsLabel="按时代筛选"
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
          {filtered.map((economist) => {
            const accent = ERA_COLORS[economist.era] ?? "#c8a45a";
            return (
              <Link
                key={economist.slug}
                href={`/economics/economists/${economist.slug}`}
                className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase"
                    style={{ borderColor: `${accent}50`, color: accent }}
                  >
                    {economist.era}
                  </span>
                  <div className="flex items-center gap-2">
                    {economist.nobel && <span className="badge-nobel text-[9px]">Nobel</span>}
                    <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                      {economist.years}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col gap-1.5">
                  <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg leading-tight font-semibold transition-colors duration-300">
                    {economist.title}
                  </h2>
                  <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                    {economist.name_en}
                  </p>
                </div>

                <p className="text-fg-muted font-mono text-[10px] tracking-wider">
                  {economist.school}
                </p>

                {economist.key_contributions.length > 0 && (
                  <p className="text-fg-secondary text-sm leading-relaxed">
                    {economist.key_contributions.slice(0, 2).join("、")}
                  </p>
                )}

                <div className="relative mt-auto flex flex-wrap gap-1.5">
                  {economist.tags.slice(0, 3).map((tag) => (
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
                  className="text-fg-disabled group-hover:text-accent-gold absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: accent }}
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
