import type { Metadata } from "next";
import Link from "next/link";
import { mathematicsKB } from "@/lib/mathematics-kb";

const DESCRIPTION =
  "从证明、无穷与非欧几何，到信息论、复杂系统和因果推断：以问题史和应用脉络理解数学。";

const CATEGORY_COLORS: Record<string, string> = {
  数学基础: "#8b6fd0",
  代数: "#6f85d8",
  几何: "#4f9ca8",
  分析: "#c07b55",
  数论: "#b99245",
  统计: "#5d9a70",
  应用: "#b4658b",
};

export const metadata: Metadata = {
  title: "数学深度阅读 — Episteme · 格致",
  description: DESCRIPTION,
};

export default function MathematicsKnowledgeBasePage() {
  const groups = mathematicsKB.getArticlesByCategory();
  const total = groups.reduce((sum, group) => sum + group.articles.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/mathematics"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回数学
      </Link>

      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / deep readings
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          数学<em className="text-accent-indigo italic"> 深度阅读</em>
        </h1>
        <p className="text-fg-secondary mt-4 max-w-2xl text-[15px] leading-relaxed">
          {DESCRIPTION} 共 {total} 篇。
        </p>
      </header>

      <div className="space-y-12">
        {groups.map((group) => {
          const accent = CATEGORY_COLORS[group.category] ?? "#8b6fd0";
          return (
            <section key={group.category} aria-labelledby={`category-${group.category}`}>
              <div className="mb-5 flex items-center gap-3">
                <h2
                  id={`category-${group.category}`}
                  className="font-mono text-xs tracking-[0.28em] uppercase"
                  style={{ color: accent }}
                >
                  {group.category}
                </h2>
                <span className="text-fg-disabled font-mono text-[10px] tracking-[0.2em]">
                  {group.articles.length} 篇
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/mathematics/knowledge-base/${article.slug}`}
                    className="border-border-faint bg-bg-panel hover:border-fg-disabled/30 group border p-5 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <h3 className="font-display text-fg-primary group-hover:text-accent-indigo text-base font-semibold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-fg-secondary mt-2 line-clamp-3 text-[13px] leading-relaxed">
                      {article.excerpt}
                    </p>
                    {article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-fg-muted border-border-faint rounded border px-1.5 py-0.5 font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
