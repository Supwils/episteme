import type { Metadata } from "next";
import Link from "next/link";
import { getAllEconomists } from "@/src-economics/lib/mdx";
import { ERA_COLORS } from "@/src-economics/lib/constants";

export const metadata: Metadata = {
  title: "经济学家 — Universe Knowledge",
  description: "从亚当·斯密到现代诺贝尔奖得主，经济学巨匠的生平、思想与遗产",
};

export default function EconomistsPage() {
  const economists = getAllEconomists();
  const eras = ["古典", "新古典", "现代", "当代"] as const;

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.42em]">
          economics / economists
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 学家</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {economists.length} 位影响世界的经济学巨匠，从古典政治经济学到当代行为经济学
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <span className="border-accent-gold/30 text-accent-gold bg-accent-gold/5 border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
          全部
        </span>
        {eras.map((era) => {
          const color = ERA_COLORS[era] ?? "#c8a45a";
          const count = economists.filter((e) => e.era === era).length;
          return (
            <span
              key={era}
              className="border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase"
              style={{ borderColor: `${color}30`, color }}
            >
              {era} ({count})
            </span>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {economists.map((economist) => {
          const accent = ERA_COLORS[economist.era] ?? "#c8a45a";
          return (
            <Link
              key={economist.slug}
              href={`/economics/economists/${economist.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
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
                  {economist.nobel && (
                    <span className="badge-nobel text-[9px]">Nobel</span>
                  )}
                  <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                    {economist.years}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg font-semibold leading-tight transition-colors duration-300">
                  {economist.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
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

      {economists.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无经济学家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            经济学家文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
