import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, type KBArticle } from "@/lib/knowledge-base";

export const metadata: Metadata = {
  title: "知识库 — Universe Knowledge",
  description: "人类历史知识库，涵盖从远古到当代的重大事件、文明与人物",
  openGraph: {
    title: "知识库 — Universe Knowledge",
    description: "人类历史知识库，涵盖从远古到当代的重大事件、文明与人物",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "知识库 — Universe Knowledge",
    description: "人类历史知识库，涵盖从远古到当代的重大事件、文明与人物",
  },
};

const ERA_COLORS: Record<string, string> = {
  远古时期: "#8b6914",
  古典时期: "#c8443a",
  中世纪: "#4a148c",
  近代: "#2d6a4f",
  现代: "#2b4a73",
  当代: "#6b4226",
  未来展望: "#1a5276",
  人物: "#c8a951",
  文明: "#a8362b",
  事件: "#7d6608",
};

const ERA_ICONS: Record<string, string> = {
  远古时期: "🏛",
  古典时期: "⚔️",
  中世纪: "🏰",
  近代: "⛵",
  现代: "🏭",
  当代: "🌐",
  未来展望: "🔮",
  人物: "👤",
  文明: "🌍",
  事件: "📜",
};

function groupByEra(articles: KBArticle[]): Map<string, KBArticle[]> {
  const grouped = new Map<string, KBArticle[]>();
  for (const article of articles) {
    const existing = grouped.get(article.era) ?? [];
    existing.push(article);
    grouped.set(article.era, existing);
  }
  return grouped;
}

export default function KnowledgePage() {
  const articles = getAllArticles();
  const grouped = groupByEra(articles);
  const eraOrder = [
    "远古时期",
    "古典时期",
    "中世纪",
    "近代",
    "现代",
    "当代",
    "未来展望",
    "人物",
    "文明",
    "事件",
  ];

  return (
    <div className="kb-page">
      <header className="kb-header">
        <p className="kb-header-label">KNOWLEDGE BASE</p>
        <h1 className="kb-header-title">人类历史知识库</h1>
        <p className="kb-header-desc">{articles.length} 篇深度文章，从人类起源到当代世界</p>
      </header>

      <div className="kb-stats">
        {eraOrder.map((era) => {
          const count = grouped.get(era)?.length ?? 0;
          if (count === 0) return null;
          return (
            <div key={era} className="kb-stat" style={{ borderColor: ERA_COLORS[era] }}>
              <span className="kb-stat-icon">{ERA_ICONS[era]}</span>
              <span className="kb-stat-count">{count}</span>
              <span className="kb-stat-label">{era}</span>
            </div>
          );
        })}
      </div>

      {eraOrder.map((era) => {
        const eraArticles = grouped.get(era);
        if (!eraArticles || eraArticles.length === 0) return null;
        const color = ERA_COLORS[era] ?? "#c8a951";
        return (
          <section key={era} className="kb-era-section">
            <div className="kb-era-head">
              <span className="kb-era-icon">{ERA_ICONS[era]}</span>
              <h2 className="kb-era-title" style={{ color }}>
                {era}
              </h2>
              <span className="kb-era-count">{eraArticles.length} 篇</span>
            </div>
            <div className="kb-grid">
              {eraArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/human-history/knowledge/${article.slug}`}
                  className="kb-card"
                  style={{ "--accent": color } as React.CSSProperties}
                >
                  <div className="kb-card-top">
                    <span className="kb-card-category">{article.category}</span>
                    {article.period && <span className="kb-card-period">{article.period}</span>}
                  </div>
                  <h3 className="kb-card-title">{article.title}</h3>
                  <p className="kb-card-excerpt">{article.excerpt}</p>
                  {article.tags.length > 0 && (
                    <div className="kb-card-tags">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="kb-card-tag">
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
  );
}
