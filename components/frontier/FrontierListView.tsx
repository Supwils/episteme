import Link from "next/link";
import {
  createFrontier,
  FRONTIER_DOMAIN_CONFIG,
  type FrontierArticle,
  type FrontierDomain,
} from "@/lib/frontier";

const CATEGORY_PALETTE = [
  "#6b8cce",
  "#a88adf",
  "#5fb3a3",
  "#6bae6b",
  "#c8956a",
  "#c8a45a",
  "#c678dd",
  "#e06c75",
  "#56b6c2",
  "#d47850",
];

function accentForCategory(category: string, fallback: string): string {
  if (!category) return fallback;
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length] ?? fallback;
}

function groupByCategory(articles: FrontierArticle[]): [string, FrontierArticle[]][] {
  const groups = new Map<string, FrontierArticle[]>();
  for (const article of articles) {
    const existing = groups.get(article.category) ?? [];
    existing.push(article);
    groups.set(article.category, existing);
  }
  return Array.from(groups.entries());
}

export function FrontierListView({ domain }: { domain: FrontierDomain }) {
  const config = FRONTIER_DOMAIN_CONFIG[domain];
  const articles = createFrontier(domain).getAllArticles();
  const grouped = groupByCategory(articles);

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          {domain} / frontier
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          研究
          <em className="italic" style={{ color: config.accent }}>
            {" "}
            前沿
          </em>
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          人类在{config.label}领域当下正在推进的最前沿——尚未解决的问题、谁在攻关、近年的突破，
          以及仍然未知的边界。这里收录的是“正在发生的知识”，而非已盖棺定论的结论。
        </p>
        {articles.length > 0 && (
          <p className="text-fg-disabled mt-3 font-mono text-[11px] tracking-[0.22em]">
            {articles.length} 个前沿议题
          </p>
        )}
      </header>

      {grouped.map(([category, items]) => {
        const accent = accentForCategory(category, config.accent);
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${domain}/frontier/${article.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex flex-col gap-3 overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="relative flex items-center gap-2">
                    <div
                      className="h-5 w-0.5 rounded-full opacity-60"
                      style={{ backgroundColor: accent }}
                    />
                    {article.horizon && (
                      <span
                        className="font-mono text-[9px] tracking-[0.22em] uppercase"
                        style={{ color: accent }}
                      >
                        {article.horizon}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-fg-primary group-hover:text-accent-gold relative text-lg leading-snug font-semibold transition-colors">
                    {article.title}
                  </h3>
                  {article.titleEn && (
                    <p className="text-fg-muted font-display -mt-1 text-sm tracking-wide italic opacity-60">
                      {article.titleEn}
                    </p>
                  )}
                  <p className="text-fg-secondary relative flex-1 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  {article.researchers.length > 0 && (
                    <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                      {article.researchers.slice(0, 3).join(" · ")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {articles.length === 0 && (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            前沿议题撰写中
          </p>
          <p className="text-fg-secondary mt-2 text-sm">该领域的研究前沿正在整理中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
