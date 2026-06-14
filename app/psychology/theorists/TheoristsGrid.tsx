"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";

interface Theorist {
  slug: string;
  title: string;
  name_en: string;
  era: string;
  years: string;
  school: string;
  tags: string[];
}

const ERA_ORDER = ["经典", "现代", "当代"];

export default function TheoristsGrid({ theorists }: { theorists: Theorist[] }) {
  const eras = useMemo(() => {
    const present = new Set(theorists.map((t) => t.era));
    const ordered = [
      ...ERA_ORDER.filter((e) => present.has(e)),
      ...[...present].filter((e) => !ERA_ORDER.includes(e)),
    ];
    return ordered.length > 1 ? ["全部", ...ordered] : [];
  }, [theorists]);

  const [active, setActive] = useState("全部");
  const visible = active === "全部" ? theorists : theorists.filter((t) => t.era === active);

  return (
    <>
      {eras.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {eras.map((era) => (
            <button
              key={era}
              type="button"
              onClick={() => setActive(era)}
              className={`filter-tab ${era === active ? "active" : ""}`}
              aria-pressed={era === active}
            >
              {era}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {visible.map((t) => {
          const eraColor = ERA_COLORS[t.era] || "#9b7dc4";
          return (
            <Link
              key={t.slug}
              href={`/psychology/theorists/${t.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: eraColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ borderColor: `${eraColor}50`, color: eraColor }}
                >
                  {t.era}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {t.years}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg leading-tight font-semibold transition-colors duration-300">
                  {t.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                  {t.name_en}
                </p>
              </div>
              <p className="text-fg-secondary relative text-sm">{t.school}</p>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {t.tags.slice(0, 3).map((tag) => (
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
                className="text-fg-disabled group-hover:text-accent-purple absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
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

      {visible.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            该时代暂无内容
          </p>
        </div>
      )}
    </>
  );
}
