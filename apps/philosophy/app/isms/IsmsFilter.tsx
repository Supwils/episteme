"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORY_ACCENTS } from "@/lib/constants";

type IsmData = {
  slug: string;
  title: string;
  title_en: string;
  category: string;
  era: string;
  key_figures: string[];
};

export default function IsmsFilter({
  isms,
  categories,
  categoryAccents,
}: {
  isms: IsmData[];
  categories: string[];
  categoryAccents: Record<string, string>;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return isms.filter((ism) => {
      const matchesCategory = !activeCategory || ism.category === activeCategory;
      const matchesSearch =
        !search ||
        ism.title.includes(search) ||
        ism.title_en.toLowerCase().includes(search.toLowerCase()) ||
        ism.key_figures.some((f) => f.includes(search));
      return matchesCategory && matchesSearch;
    });
  }, [isms, activeCategory, search]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <svg
            className="text-fg-disabled absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="搜索主义、哲学家…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border-faint bg-bg-near text-fg-primary placeholder:text-fg-disabled w-full border py-2.5 pl-10 pr-4 font-mono text-[12px] tracking-wide outline-none transition-colors focus:border-accent-gold/40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${
              !activeCategory
                ? "border-accent-gold/50 bg-accent-gold/10 text-accent-gold"
                : "border-border-faint text-fg-muted hover:text-fg-secondary hover:border-fg-disabled/40"
            }`}
          >
            全部
          </button>
          {categories.map((cat) => {
            const accent = categoryAccents[cat] || "#c8a45a";
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className="border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300"
                style={{
                  borderColor: isActive ? `${accent}66` : "var(--color-border-faint)",
                  backgroundColor: isActive ? `${accent}15` : "transparent",
                  color: isActive ? accent : "var(--color-fg-muted)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-fg-disabled mb-6 font-mono text-[10px] tracking-[0.32em] uppercase">
        {filtered.length} 个主义 · {activeCategory || "全部类别"}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ism, i) => {
          const accent = CATEGORY_ACCENTS[ism.category] || "#c8a45a";
          return (
            <Link
              key={ism.slug}
              href={`/isms/${ism.slug}`}
              className="group border-border-faint bg-bg-panel relative flex flex-col gap-3 overflow-hidden border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-fg-disabled/30 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
              style={{
                animationDelay: `${i * 60}ms`,
                animation: "fadeInUp 0.5s var(--ease-product) both",
              }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ backgroundColor: accent }}
              />

              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-fg-primary text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-accent-gold">
                    {ism.title}
                  </h3>
                  <span className="text-fg-muted font-mono text-[10px] italic tracking-wider">
                    {ism.title_en}
                  </span>
                </div>
                <span
                  className="shrink-0 border px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] uppercase"
                  style={{
                    borderColor: `${accent}40`,
                    color: accent,
                  }}
                >
                  {ism.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {ism.era}
                </span>
                <span className="text-fg-disabled">·</span>
                <div className="flex flex-wrap gap-1.5">
                  {ism.key_figures.slice(0, 3).map((fig) => (
                    <span
                      key={fig}
                      className="text-fg-secondary font-mono text-[9px] tracking-[0.16em]"
                    >
                      {fig}
                    </span>
                  ))}
                  {ism.key_figures.length > 3 && (
                    <span className="text-fg-disabled font-mono text-[9px]">
                      +{ism.key_figures.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            未找到匹配的主义
          </p>
        </div>
      )}
    </>
  );
}
