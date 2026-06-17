import type { Metadata } from "next";
import Link from "next/link";
import { getAllKnowledgeBase } from "@/subjects/economics/lib/mdx";

export const metadata: Metadata = {
  title: "知识库 — 经济学 — Episteme · 格致",
  description: "外汇、股票、债券、房产、退休规划等实用经济学知识指南",
};

const CATEGORY_COLORS: Record<string, string> = {
  国际金融: "#61afef",
  货币政策: "#e5c07b",
  金融市场: "#c8a45a",
  房地产: "#d47850",
  个人理财: "#98c379",
  宏观经济: "#a88adf",
  行为经济学应用: "#c678dd",
  投资学: "#e06c75",
};

export default function KnowledgeBasePage() {
  const articles = getAllKnowledgeBase();

  const grouped: Record<string, typeof articles> = {};
  for (const article of articles) {
    const cat = article.category || "其他";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(article);
  }
  const categories = Object.keys(grouped).sort();

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          economics / knowledge-base
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          知识<em className="text-accent-gold italic"> 库</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          {articles.length} 篇实用经济学指南，从外汇入门到退休规划
        </p>
      </header>

      {categories.map((category) => {
        const items = grouped[category] ?? [];
        const accent = CATEGORY_COLORS[category] ?? "#c8a45a";

        return (
          <section key={category} className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: accent }}
              >
                {category}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {items.length} 篇
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((article) => (
                <Link
                  key={article.slug}
                  href={`/economics/knowledge-base/${article.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative overflow-hidden border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="relative">
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="h-6 w-0.5 rounded-full opacity-50"
                        style={{ backgroundColor: accent }}
                      />
                      <span
                        className="font-mono text-[9px] tracking-[0.22em] uppercase"
                        style={{ color: accent }}
                      >
                        {article.category}
                      </span>
                    </div>

                    <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-base font-semibold transition-colors">
                      {article.title}
                    </h3>
                    {article.title_en && (
                      <p className="text-fg-muted font-display mt-0.5 text-sm tracking-wide italic opacity-60">
                        {article.title_en}
                      </p>
                    )}

                    {article.tags.length > 0 && (
                      <p className="text-fg-muted mt-2 font-mono text-[9px] tracking-wider">
                        {article.tags.slice(0, 3).join("、")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {articles.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            暂无知识库内容
          </p>
          <p className="text-fg-secondary mt-2 text-sm">知识库文章正在撰写中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
