"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FIELD_COLORS } from "@/subjects/psychology/lib/constants";

interface Experiment {
  slug: string;
  title: string;
  title_en: string;
  field: string;
  year: number;
  researcher: string;
  tags: string[];
}

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

function decadeOf(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

export default function ExperimentsGrid({ experiments }: { experiments: Experiment[] }) {
  const decades = useMemo(() => {
    const set = new Set(experiments.map((e) => decadeOf(e.year)));
    return ["全部", ...[...set].sort()];
  }, [experiments]);

  const [active, setActive] = useState("全部");
  const visible =
    active === "全部" ? experiments : experiments.filter((e) => decadeOf(e.year) === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {decades.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={`filter-tab ${d === active ? "active" : ""}`}
            aria-pressed={d === active}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {visible.map((exp) => {
          const fieldColor = FIELD_COLORS[exp.field] || "#6b8fd6";
          return (
            <Link
              key={exp.slug}
              href={`/psychology/experiments/${exp.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: fieldColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
                >
                  {exp.field}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {formatYear(exp.year)}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg leading-tight font-semibold transition-colors duration-300">
                  {exp.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] tracking-wider italic">
                  {exp.title_en}
                </p>
              </div>
              <p className="text-fg-secondary relative text-sm">{exp.researcher}</p>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {exp.tags.slice(0, 3).map((tag) => (
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
                style={{ backgroundColor: fieldColor }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            该年代暂无内容
          </p>
        </div>
      )}
    </>
  );
}
