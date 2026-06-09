"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SearchInput } from "./SearchInput";
import { ERA_ACCENT, ERA_BG, PRODUCT_EASE } from "@/lib/constants";

type ThinkerItem = {
  title: string;
  philosopher: string;
  era: string;
  school: string;
  tags: string[];
  slug: string;
};

const ERA_OPTIONS = ["全部", "古代", "近代", "现代", "当代"] as const;

export const ThinkersList = memo(function ThinkersList({ thinkers }: { thinkers: ThinkerItem[] }) {
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<string>("全部");
  const reduce = useReducedMotion();

  const handleSearch = useCallback((q: string) => setQuery(q), []);

  const filtered = useMemo(() => {
    let result = thinkers;
    if (activeEra !== "全部") {
      result = result.filter((t) => t.era === activeEra);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.philosopher.toLowerCase().includes(q) ||
          t.school.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [thinkers, query, activeEra]);

  return (
    <>
      <SearchInput placeholder="搜索哲学家、流派、标签……" onSearch={handleSearch} />

      {/* Era filter chips */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {ERA_OPTIONS.map((era) => {
          const isActive = activeEra === era;
          const accent = era === "全部" ? "#c8a45a" : (ERA_ACCENT[era] ?? "#c8a45a");
          return (
            <button
              key={era}
              type="button"
              onClick={() => setActiveEra(era)}
              className="rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] transition-all duration-300"
              style={{
                borderColor: isActive ? accent : "rgba(200,164,90,0.08)",
                backgroundColor: isActive ? `${accent}18` : "transparent",
                color: isActive ? accent : "var(--color-fg-muted)",
              }}
            >
              {era}
            </button>
          );
        })}
        {(query.trim() || activeEra !== "全部") && (
          <span className="text-fg-disabled ml-2 font-mono text-[10px] tracking-[0.22em]">
            {filtered.length} 个结果
          </span>
        )}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="border-border-subtle mb-6 flex h-16 w-16 items-center justify-center border">
            <span className="font-display text-fg-disabled text-2xl italic">Φ</span>
          </div>
          <p className="font-display text-fg-muted text-lg font-semibold">未找到哲学家</p>
          <p className="text-fg-disabled mt-2 max-w-md text-sm leading-relaxed">
            尝试调整搜索关键词或筛选条件
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((thinker, i) => (
            <ThinkerCard key={thinker.slug} thinker={thinker} index={i} reduce={!!reduce} />
          ))}
        </div>
      )}
    </>
  );
});

/* ── Individual Thinker Card ──────────────────────────────────── */

function ThinkerCard({
  thinker,
  index,
  reduce,
}: {
  thinker: ThinkerItem;
  index: number;
  reduce: boolean;
}) {
  const accent = ERA_ACCENT[thinker.era] ?? "#c8a45a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : Math.min(index * 0.06, 0.6),
        ease: PRODUCT_EASE,
      }}
    >
      <Link
        href={`/thinkers/${thinker.slug}`}
        className="border-border-faint bg-bg-near hover:bg-bg-elevated group relative flex h-full flex-col overflow-hidden border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(200,164,90,0.15)]"
      >
        {/* Era color accent — top bar */}
        <div
          className="h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
          style={{ backgroundColor: accent }}
        />

        <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
          {/* Header: philosopher name + era */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-xl font-semibold leading-snug transition-colors duration-300">
                {thinker.title}
              </h3>
              <p className="text-fg-muted mt-0.5 font-mono text-[11px] italic tracking-wider">
                {thinker.philosopher}
              </p>
            </div>
            <div
              className="font-display flex h-9 w-9 shrink-0 items-center justify-center border text-base italic"
              style={{
                borderColor: `${accent}30`,
                color: accent,
                backgroundColor: ERA_BG[thinker.era],
              }}
            >
              {thinker.title[0]}
            </div>
          </div>

          {/* Badges: era + school */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{
                borderColor: `${accent}30`,
                color: accent,
                backgroundColor: `${accent}0a`,
              }}
            >
              {thinker.era}
            </span>
            <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.16em]">
              {thinker.school}
            </span>
          </div>

          {/* Tags — first 2 as subtle pills */}
          {thinker.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {thinker.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="border-fg-disabled/20 text-fg-disabled rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.12em]"
                >
                  {tag}
                </span>
              ))}
              {thinker.tags.length > 2 && (
                <span className="text-fg-disabled font-mono text-[9px]">
                  +{thinker.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Arrow indicator */}
          <span
            aria-hidden
            className="text-fg-disabled group-hover:text-accent-gold mt-1 font-mono text-xs transition-all duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>

        {/* Hover accent underline */}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
