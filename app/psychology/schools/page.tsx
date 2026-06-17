import type { Metadata } from "next";
import Link from "next/link";
import { getAllSchools } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";

export const metadata: Metadata = {
  title: "心理学流派 — Episteme · 格致",
  description: "从精神分析到认知革命，心理学的主要流派与理论范式",
};

export default function SchoolsPage() {
  const schools = getAllSchools();
  const eras = ["经典", "现代", "当代"];

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.42em] uppercase">
          psychology / schools
        </p>
        <h1 className="font-display text-fg-primary mb-3 text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]">
          心理学<em className="text-accent-purple italic"> 流派</em>
        </h1>
        <p className="text-fg-secondary max-w-xl text-sm leading-relaxed md:text-base">
          {schools.length} 个心理学主要流派，从弗洛伊德的精神分析到当代的认知神经科学。
        </p>
      </header>

      {eras.map((era) => {
        const eraSchools = schools.filter((s) => s.era === era);
        if (eraSchools.length === 0) return null;
        const eraColor = ERA_COLORS[era] || "#9b7dc4";

        return (
          <section key={era} className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: eraColor }}
              >
                {era}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {eraSchools.length} 个流派
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>

            <div className="timeline-connector">
              {eraSchools.map((school) => (
                <div key={school.slug} className="relative mb-6 pl-6">
                  <div className="timeline-dot" style={{ borderColor: eraColor }} />
                  <Link
                    href={`/psychology/schools/${school.slug}`}
                    className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 card-hover block overflow-hidden border p-6 backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="font-display text-fg-primary group-hover:text-accent-purple text-xl leading-tight font-semibold transition-colors duration-300">
                        {school.title}
                      </h2>
                    </div>
                    {school.founder && (
                      <p className="text-fg-muted mb-2 font-mono text-[11px] tracking-wider">
                        创始人：{school.founder}
                      </p>
                    )}
                    {school.period && (
                      <p className="text-fg-secondary mb-3 text-sm">{school.period}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {school.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border-fg-disabled/30 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {schools.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无流派内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">内容正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
