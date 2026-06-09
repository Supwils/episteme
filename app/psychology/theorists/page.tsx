import type { Metadata } from "next";
import Link from "next/link";
import { getAllTheorists } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";

export const metadata: Metadata = {
  title: "心理学家 — Universe Knowledge",
  description: "从弗洛伊德到卡尼曼，心理学巨匠的生平、理论与贡献",
};

export default function TheoristsPage() {
  const theorists = getAllTheorists();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          psychology / theorists
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          心理学<em className="text-accent-purple italic"> 家</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {theorists.length} 位心理学巨匠的生平、理论与贡献，从精神分析之父到行为经济学先驱。
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {["全部", "经典", "现代", "当代"].map((era) => (
          <span
            key={era}
            className={`filter-tab ${era === "全部" ? "active" : ""}`}
          >
            {era}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {theorists.map((t) => {
          const eraColor = ERA_COLORS[t.era] || "#9b7dc4";
          return (
            <Link
              key={t.slug}
              href={`/psychology/theorists/${t.slug}`}
              className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover relative flex h-full flex-col gap-4 overflow-hidden border p-6 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: eraColor }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ borderColor: `${eraColor}50`, color: eraColor }}
                >
                  {t.era}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
                  {t.years}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg font-semibold leading-tight transition-colors duration-300">
                  {t.title}
                </h2>
                <p className="text-fg-muted font-mono text-[11px] italic tracking-wider">
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
                className="text-fg-disabled group-hover:text-accent-purple absolute bottom-4 right-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
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

      {theorists.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无理论家内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
