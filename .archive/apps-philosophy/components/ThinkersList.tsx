"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

export function ThinkersList({ thinkers }: { thinkers: ThinkerItem[] }) {
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<string>("全部");
  const reduce = useReducedMotion();

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
      {/* Search input — glass morphism */}
      <div className="relative mb-5">
        <div
          className="border-border-faint bg-bg-panel flex items-center gap-3 border px-4 py-3 backdrop-blur-xl transition-colors duration-300 focus-within:border-accent-gold/40"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <svg
            className="text-fg-disabled h-4 w-4 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索哲学家、流派、标签……"
            className="text-fg-primary placeholder:text-fg-disabled w-full bg-transparent font-mono text-sm tracking-wide outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-fg-disabled hover:text-fg-secondary transition-colors"
              aria-label="清除搜索"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      </div>

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
          <div className="mb-6 flex h-16 w-16 items-center justify-center border border-border-subtle">
            <span className="font-display text-fg-disabled text-2xl italic">Φ</span>
          </div>
          <p className="font-display text-fg-muted text-lg font-semibold">未找到哲学家</p>
          <p className="text-fg-disabled mt-2 max-w-md text-sm leading-relaxed">
            尝试调整搜索关键词或筛选条件
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((thinker, i) => (
            <ThinkerCard
              key={thinker.slug}
              thinker={thinker}
              index={i}
              reduce={!!reduce}
            />
          ))}
        </div>
      )}
    </>
  );
}

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
        className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col overflow-hidden border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(200,164,90,0.15)]"
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
              <h3 className="font-display text-fg-primary text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-gold">
                {thinker.title}
              </h3>
              <p className="text-fg-muted mt-0.5 font-mono text-[11px] italic tracking-wider">
                {thinker.philosopher}
              </p>
            </div>
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center border font-display text-base italic"
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
              className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] uppercase"
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
