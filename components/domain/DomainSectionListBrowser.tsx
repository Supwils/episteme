"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Client-side browser for engine-driven section lists: full-text search over
 * title/EN title/excerpt/tags plus category chips. Replaces the previous
 * render-everything static grid — long sections (e.g. medicine, chemistry)
 * were unscannable without any filtering.
 *
 * Cross-domain badge data is precomputed on the server (the backlink index is
 * server-only) and passed in as plain props.
 */

export type SectionListEntry = {
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  tags: readonly string[];
  category: string;
  info0?: string;
};

export type SectionListBadge = {
  colors: string[];
  count: number;
  names: string;
};

const MAX_DOTS = 5;

export function DomainSectionListBrowser({
  domain,
  section,
  accent,
  entries,
  badges,
}: {
  domain: string;
  section: string;
  accent: string;
  entries: SectionListEntry[];
  badges: Record<string, SectionListBadge>;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const entry of entries) {
      if (!seen.includes(entry.category)) seen.push(entry.category);
    }
    return seen;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (activeCategory && entry.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [entry.title, entry.titleEn ?? "", entry.excerpt, ...entry.tags]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, SectionListEntry[]>();
    for (const entry of filtered) {
      const list = map.get(entry.category) ?? [];
      list.push(entry);
      map.set(entry.category, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const filtering = query.trim() !== "" || activeCategory !== null;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4">
        <div className="relative max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索本板块：标题、摘要、标签…"
            aria-label="搜索本板块文章"
            className="border-border-subtle bg-bg-panel text-fg-primary placeholder:text-fg-disabled focus:border-accent-gold/60 w-full border px-4 py-2.5 font-mono text-[12px] tracking-wide transition-colors outline-none"
          />
          {filtering && (
            <span className="text-fg-disabled absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] tracking-[0.18em]">
              {filtered.length}/{entries.length}
            </span>
          )}
        </div>
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="按分类筛选">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] transition-colors ${
                activeCategory === null
                  ? "border-accent-gold/50 text-accent-gold"
                  : "border-border-faint text-fg-muted hover:text-fg-primary"
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] transition-colors ${
                  activeCategory === category
                    ? "border-accent-gold/50 text-accent-gold"
                    : "border-border-faint text-fg-muted hover:text-fg-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {grouped.map(([category, list]) => (
        <section key={category} className="mb-12">
          {grouped.length > 1 && (
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))` }}
              >
                {category}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {list.length} 篇
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((entry) => {
              const badge = badges[entry.slug] ?? null;
              return (
                <Link
                  key={entry.slug}
                  href={`/${domain}/${section}/${entry.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex flex-col gap-2 overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="relative flex items-center gap-2">
                    <div
                      className="h-5 w-0.5 rounded-full opacity-60"
                      style={{ backgroundColor: accent }}
                    />
                    {entry.info0 && (
                      <span
                        className="font-mono text-[9px] tracking-[0.22em] uppercase"
                        style={{
                          color: `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))`,
                        }}
                      >
                        {entry.info0}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-fg-primary group-hover:text-accent-gold relative text-lg leading-snug font-semibold transition-colors">
                    {entry.title}
                  </h3>
                  {entry.titleEn && (
                    <p className="text-fg-muted font-display -mt-1 text-sm tracking-wide italic opacity-60">
                      {entry.titleEn}
                    </p>
                  )}
                  <p className="text-fg-secondary relative flex-1 text-sm leading-relaxed">
                    {entry.excerpt}
                  </p>
                  {entry.tags.length > 0 && (
                    <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                      {entry.tags.slice(0, 3).join(" · ")}
                    </p>
                  )}
                  {badge && (
                    <p className="text-fg-disabled relative flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em]">
                      <span aria-hidden className="flex items-center gap-1">
                        {badge.colors.slice(0, MAX_DOTS).map((color, i) => (
                          <span
                            key={i}
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                      被 {badge.count} 个领域引用
                      <span className="sr-only">（{badge.names}）</span>
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="border-border-faint bg-bg-panel border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            没有匹配的条目
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            换个关键词，或
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(null);
              }}
              className="text-accent-gold ml-1 underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              清除筛选
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
