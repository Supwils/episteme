import type { Metadata } from "next";
import Link from "next/link";
import { getAllDebates } from "@/src-psychology/lib/mdx";
import { ERA_COLORS } from "@/src-psychology/lib/constants";

export const metadata: Metadata = {
  title: "经典论辩 — Universe Knowledge",
  description: "先天vs后天、自由意志vs决定论等心理学核心争论",
};

export default function DebatesPage() {
  const debates = getAllDebates();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.42em]">
          psychology / debates
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          经典<em className="text-accent-blue italic"> 论辩</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {debates.length} 个心理学核心争论，从先天与后天之争到意识的本质。
        </p>
      </header>

      <p className="text-fg-disabled mb-8 font-mono text-[10px] uppercase tracking-[0.38em]">
        {debates.length} 个论题 · debates
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {debates.map((d) => {
          const eraColor = ERA_COLORS[d.era] || "#6b8fd6";
          return (
            <Link
              key={d.slug}
              href={`/psychology/debates/${d.slug}`}
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
                  {d.era}
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-lg font-semibold leading-tight transition-colors duration-300">
                  {d.title}
                </h2>
                <p className="text-fg-secondary text-sm">{d.topic}</p>
              </div>
              <div className="relative flex flex-wrap gap-1.5">
                {d.key_figures.slice(0, 3).map((fig) => (
                  <span
                    key={fig}
                    className="text-fg-muted font-mono text-[9px] tracking-[0.16em]"
                  >
                    {fig}
                  </span>
                ))}
              </div>
              <div className="relative mt-auto flex flex-wrap gap-1.5">
                {d.tags.slice(0, 3).map((tag) => (
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
                style={{ backgroundColor: eraColor }}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>

      {debates.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无论辩内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
