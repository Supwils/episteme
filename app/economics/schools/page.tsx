import type { Metadata } from "next";
import Link from "next/link";
import { getAllSchools } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";

export const metadata: Metadata = {
  title: "经济学派 — Episteme · 格致",
  description: "古典、新古典、凯恩斯、奥地利、行为经济学等思想流派",
};

export default function SchoolsPage() {
  const schools = getAllSchools();

  const grouped: Record<string, typeof schools> = {};
  for (const school of schools) {
    const era = school.era || "其他";
    if (!grouped[era]) grouped[era] = [];
    grouped[era].push(school);
  }
  const eras = ["古典", "新古典", "现代", "当代"] as const;

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          economics / schools
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          经济<em className="text-accent-gold italic"> 学派</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {schools.length} 个经济学思想流派，从古典政治经济学到当代行为经济学
        </p>
      </header>

      <div className="relative">
        <div className="bg-border-faint absolute top-0 bottom-0 left-4 w-px md:left-8" />

        {eras.map((era) => {
          const items = grouped[era] ?? [];
          if (items.length === 0) return null;
          const color = ERA_COLORS[era] ?? "#c8a45a";

          return (
            <section key={era} className="mb-16">
              <div className="relative mb-8 pl-12 md:pl-20">
                <div
                  className="absolute top-1 left-2 h-5 w-5 rounded-full border-2 md:left-6"
                  style={{ borderColor: color, backgroundColor: "var(--color-bg-deep)" }}
                />
                <h2 className="font-display text-xl font-semibold" style={{ color }}>
                  {era}
                </h2>
                <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                  {items.length} 个学派
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2 md:pl-20 lg:grid-cols-3">
                {items.map((school) => (
                  <Link
                    key={school.slug}
                    href={`/economics/schools/${school.slug}`}
                    className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-3 overflow-hidden border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,164,90,0.06)]"
                  >
                    <div
                      className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                      style={{ backgroundColor: color }}
                    />

                    <div className="relative flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] tracking-[0.28em] uppercase"
                        style={{ color }}
                      >
                        {school.period}
                      </span>
                    </div>

                    <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-base leading-tight font-semibold transition-colors duration-300">
                      {school.title}
                    </h3>
                    {school.title_en && (
                      <p className="text-fg-muted font-mono text-[10px] tracking-wider italic">
                        {school.title_en}
                      </p>
                    )}

                    {school.founder && (
                      <p className="text-fg-secondary text-sm">创始人：{school.founder}</p>
                    )}

                    {school.key_figures.length > 0 && (
                      <div className="relative mt-auto flex flex-wrap gap-1.5">
                        {school.key_figures.slice(0, 3).map((name) => (
                          <span
                            key={name}
                            className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    )}

                    <span
                      aria-hidden
                      className="text-fg-disabled group-hover:text-accent-gold absolute right-4 bottom-4 font-mono text-xs opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {schools.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无学派内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">经济学派文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
