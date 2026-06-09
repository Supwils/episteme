import type { Metadata } from "next";
import Link from "next/link";
import { getAllDebates } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";

export const metadata: Metadata = {
  title: "经济学辩论 — Universe Knowledge",
  description: "政府干预 vs 自由市场、供给 vs 需求侧等经典经济学论战",
};

export default function DebatesPage() {
  const debates = getAllDebates();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.42em]">
          economics / debates
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 辩论</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {debates.length} 场塑造经济思想史的经典辩论
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {debates.map((debate) => {
          const accent = ERA_COLORS[debate.era] ?? "#c8a45a";
          return (
            <Link
              key={debate.slug}
              href={`/economics/debates/${debate.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: accent }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ borderColor: `${accent}40`, color: accent }}
                >
                  {debate.era}
                </span>
              </div>

              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg font-semibold leading-tight transition-colors duration-300">
                  {debate.title}
                </h2>
                {debate.title_en && (
                  <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                    {debate.title_en}
                  </p>
                )}
              </div>

              {debate.sides.length >= 2 && (
                <div className="relative flex items-center gap-2 text-sm">
                  <span className="text-accent-copper font-medium">{debate.sides[0]}</span>
                  <span className="text-fg-disabled font-mono text-xs">vs</span>
                  <span className="text-accent-green font-medium">{debate.sides[1]}</span>
                </div>
              )}

              {debate.key_figures.length > 0 && (
                <p className="text-fg-secondary text-sm">
                  {debate.key_figures.slice(0, 3).join(" · ")}
                </p>
              )}

              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {debate.tags.slice(0, 3).map((tag) => (
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

      {debates.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无辩论内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            经济学辩论文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
