import type { Metadata } from "next";
import Link from "next/link";
import { getAllTheories } from "@/src-economics/lib/mdx";
import { CATEGORY_COLORS } from "@/src-economics/lib/constants";

export const metadata: Metadata = {
  title: "经济理论 — Universe Knowledge",
  description: "微观、宏观、国际、发展、行为经济学等核心理论体系",
};

const CATEGORIES = ["微观", "宏观", "国际", "发展", "行为", "博弈论", "制度", "金融"];

export default function TheoriesPage() {
  const theories = getAllTheories();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.42em]">
          economics / theories
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 理论</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {theories.length} 个核心经济理论，涵盖从微观个体决策到宏观经济运行的完整体系
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <span className="border-accent-gold/30 text-accent-gold bg-accent-gold/5 border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
          全部
        </span>
        {CATEGORIES.map((cat) => {
          const color = CATEGORY_COLORS[cat] ?? "#c8a45a";
          return (
            <span
              key={cat}
              className="border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase"
              style={{ borderColor: `${color}30`, color }}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {theories.map((theory) => {
          const color = CATEGORY_COLORS[theory.category] ?? "#c8a45a";
          return (
            <Link
              key={theory.slug}
              href={`/economics/theories/${theory.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: color }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{ borderColor: `${color}50`, color }}
                >
                  {theory.category}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {theory.period}
                </span>
              </div>

              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-gold text-lg font-semibold leading-tight transition-colors duration-300">
                  {theory.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
                  {theory.title_en}
                </p>
              </div>

              {theory.key_figures.length > 0 && (
                <p className="text-fg-secondary text-sm">
                  {theory.key_figures.slice(0, 3).join(" · ")}
                </p>
              )}

              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {theory.tags.slice(0, 3).map((tag) => (
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
                style={{ backgroundColor: color }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {theories.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无理论内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">
            经济理论文章正在撰写中，敬请期待。
          </p>
        </div>
      )}
    </div>
  );
}
