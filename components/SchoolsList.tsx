"use client";

import { memo, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SearchInput } from "./SearchInput";
import { EmptyState } from "./EmptyState";
import { ERA_ACCENT, ERA_GLOW } from "@/lib/constants";

type SchoolItem = {
  title: string;
  era: string;
  period?: string;
  founder?: string;
  philosopher?: string;
  key_figures?: string[];
  tags: string[];
  slug: string;
};

type EraFilter = "全部" | "古代" | "近现代" | "当代";

const ERA_FILTERS: EraFilter[] = ["全部", "古代", "近现代", "当代"];

const ERA_ORDER: EraFilter[] = ["古代", "近现代", "当代"];

function matchesEraFilter(era: string, filter: EraFilter): boolean {
  if (filter === "全部") return true;
  if (filter === "近现代") return era === "近代" || era === "现代";
  return era === filter;
}

function getEraHeaderLabel(filter: EraFilter): string {
  const labels: Record<EraFilter, string> = {
    全部: "全部流派",
    古代: "古代流派 · Ancient Schools",
    近现代: "近现代流派 · Modern Schools",
    当代: "当代流派 · Contemporary Schools",
  };
  return labels[filter];
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "……";
}

function SchoolCard({ school, reducedMotion }: { school: SchoolItem; reducedMotion: boolean }) {
  const founder = school.founder ?? school.philosopher ?? "";
  const accent = ERA_ACCENT[school.era] ?? "#c8a45a";
  const glow = ERA_GLOW[school.era] ?? "rgba(200,164,90,0.12)";

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link
        href={`/schools/${school.slug}`}
        className="border-border-faint bg-bg-near group relative flex h-full flex-col overflow-hidden border transition-all duration-300 hover:border-[color:var(--card-accent)]"
        style={
          {
            "--card-accent": accent,
            "--card-glow": glow,
          } as React.CSSProperties
        }
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300 group-hover:w-[4px]"
          style={{ backgroundColor: accent }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 32px var(--card-glow)` }}
        />

        <div className="flex flex-col gap-3 pb-4 pl-5 pr-5 pt-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.28em]"
              style={{ color: accent }}
            >
              {school.era}
            </span>
            {school.period && (
              <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em]">
                {school.period}
              </span>
            )}
          </div>

          <h3 className="font-display text-fg-primary text-[1.15rem] font-semibold leading-snug tracking-tight">
            {school.title}
          </h3>

          {founder && (
            <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
              创始人：{founder}
            </p>
          )}

          {school.key_figures && school.key_figures.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {school.key_figures.slice(0, 5).map((name) => (
                <span
                  key={name}
                  className="border-fg-disabled/20 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
                >
                  {name}
                </span>
              ))}
              {school.key_figures.length > 5 && (
                <span className="text-fg-disabled font-mono text-[9px]">
                  +{school.key_figures.length - 5}
                </span>
              )}
            </div>
          )}

          {school.tags.length > 0 && (
            <p className="text-fg-secondary/70 line-clamp-2 text-[0.82rem] leading-relaxed">
              {school.tags.slice(0, 4).join(" · ")}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between px-5 pb-4">
          <span
            aria-hidden
            className="h-px w-8 transition-all duration-500 group-hover:w-12"
            style={{ backgroundColor: accent }}
          />
          <span
            aria-hidden
            className="text-fg-disabled group-hover:text-accent-gold font-mono text-xs transition-all duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export const SchoolsList = memo(function SchoolsList({ schools }: { schools: SchoolItem[] }) {
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<EraFilter>("全部");
  const reducedMotion = useReducedMotion() ?? false;

  const handleSearch = useCallback((q: string) => setQuery(q), []);

  const filtered = useMemo(() => {
    let result = schools;
    if (activeEra !== "全部") {
      result = result.filter((s) => matchesEraFilter(s.era, activeEra));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.founder ?? "").toLowerCase().includes(q) ||
          (s.philosopher ?? "").toLowerCase().includes(q) ||
          s.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          (s.key_figures ?? []).some((fig) => fig.toLowerCase().includes(q))
      );
    }
    return result;
  }, [schools, query, activeEra]);

  const grouped = useMemo(() => {
    if (activeEra !== "全部") {
      return [{ era: activeEra, schools: filtered }];
    }
    return ERA_ORDER.map((era) => ({
      era,
      schools: filtered.filter((s) => matchesEraFilter(s.era, era)),
    })).filter((g) => g.schools.length > 0);
  }, [filtered, activeEra]);

  return (
    <>
      <div className="relative mb-8">
        <div className="flex flex-wrap items-center gap-1">
          {ERA_FILTERS.map((era) => (
            <button
              key={era}
              type="button"
              onClick={() => setActiveEra(era)}
              className="relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
              style={{
                color:
                  activeEra === era
                    ? (ERA_ACCENT[era === "全部" ? "古代" : era] ?? "#c8a45a")
                    : undefined,
              }}
            >
              <span
                className={
                  activeEra === era ? "text-fg-primary" : "text-fg-muted hover:text-fg-secondary"
                }
              >
                {era}
              </span>
              {activeEra === era && (
                <motion.span
                  layoutId="era-tab-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px]"
                  style={{
                    backgroundColor: ERA_ACCENT[era === "全部" ? "古代" : era] ?? "#c8a45a",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <SearchInput placeholder="搜索流派、创始人、标签……" onSearch={handleSearch} />

      {query.trim() && (
        <p className="text-fg-disabled mb-6 font-mono text-[10px] tracking-[0.22em]">
          {filtered.length} 个结果
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="暂无匹配流派" description="尝试更换筛选条件或搜索关键词。" />
      ) : (
        <div className="space-y-12">
          {grouped.map(({ era, schools: eraSchools }) => (
            <section key={era}>
              {activeEra === "全部" && (
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="font-display text-fg-primary text-[1.1rem] font-semibold tracking-tight">
                    {getEraHeaderLabel(era as EraFilter)}
                  </h2>
                  <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                    {eraSchools.length}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(to right, ${ERA_ACCENT[era] ?? "#c8a45a"}33, transparent)`,
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {eraSchools.map((school) => (
                  <SchoolCard key={school.slug} school={school} reducedMotion={reducedMotion} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
});
