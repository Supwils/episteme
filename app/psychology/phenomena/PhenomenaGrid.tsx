"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";

interface Phenomenon {
  slug: string;
  title: string;
  title_en: string;
  category: string;
  tags: string[];
}

// Canonical display order; only categories actually present are shown.
const CANON = ["认知", "社会", "发展", "情绪", "感知", "记忆", "决策"];

export default function PhenomenaGrid({ phenomena }: { phenomena: Phenomenon[] }) {
  const categories = useMemo(() => {
    const present = new Set(phenomena.map((p) => p.category));
    const ordered = [
      ...CANON.filter((c) => present.has(c)),
      ...[...present].filter((c) => !CANON.includes(c)),
    ];
    // A single-category filter is just "全部" twice — not worth showing.
    return ordered.length > 1 ? ["全部", ...ordered] : [];
  }, [phenomena]);

  const [active, setActive] = useState("全部");
  const visible = active === "全部" ? phenomena : phenomena.filter((p) => p.category === active);

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`filter-tab ${cat === active ? "active" : ""}`}
              aria-pressed={cat === active}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {visible.map((p) => {
          const catColor = CATEGORY_COLORS[p.category] || "#d4789c";
          return (
            <Link
              key={p.slug}
              href={`/psychology/phenomena/${p.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: catColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ borderColor: `${catColor}50`, color: catColor }}
                >
                  {p.category}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg leading-tight font-semibold transition-colors duration-300">
                  {p.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                  {p.title_en}
                </p>
              </div>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: catColor }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            该分类暂无内容
          </p>
        </div>
      )}
    </>
  );
}
