import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/knowledge-base";
import { resolveWikiLink } from "@/lib/wiki-link-index";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

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

export async function generateStaticParams() {
  return []; // ISR: render on first request + cache; skip build prerender to bound deploy file count
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const description = article.excerpt;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=human-history&description=${encodeURIComponent(description)}`;
  return {
    title: `${article.title} — 知识库`,
    description,
    openGraph: {
      title: `${article.title} — 知识库`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

type LinkResolver = (target: string) => string | null;

function renderMarkdown(content: string, resolveLink: LinkResolver): React.ReactNode {
  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // `[[name]]` / `[[name|label]]` wiki-links resolve against the cross-domain
      // index (KB articles included). Unresolved targets render as plain text.
      const wiki = part.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/);
      if (wiki) {
        const label = (wiki[2] ?? wiki[1])!.trim();
        const href = resolveWikiLink(wiki[1]!.trim(), "human-history");
        return href ? (
          <Link
            key={i}
            href={href}
            style={{ color: "#7fb2dd", textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            {label}
          </Link>
        ) : (
          label
        );
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = resolveLink(link[2]!);
        if (href) {
          return (
            <Link
              key={i}
              href={href}
              style={{ color: "#7fb2dd", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              {link[1]}
            </Link>
          );
        }
        return link[1];
      }
      return part;
    });
  };

  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const text = block.trim();
    if (!text) return null;

    if (text.startsWith("# ")) {
      return null;
    }
    if (text.startsWith("## ")) {
      return (
        <h2 key={i} className="kb-detail-h2">
          {text.slice(3)}
        </h2>
      );
    }
    if (text.startsWith("### ")) {
      return (
        <h3 key={i} className="kb-detail-h3">
          {text.slice(4)}
        </h3>
      );
    }
    if (text.startsWith("#### ")) {
      return (
        <h4 key={i} className="kb-detail-h4">
          {text.slice(5)}
        </h4>
      );
    }
    if (text.startsWith("> ")) {
      const lines = text.split("\n").map((l) => l.replace(/^>\s?/, ""));
      return (
        <blockquote key={i} className="kb-detail-quote">
          {lines.map((line, li) => (
            <p key={li}>{renderInline(line)}</p>
          ))}
        </blockquote>
      );
    }
    if (text.startsWith("---")) {
      return <hr key={i} className="kb-detail-hr" />;
    }
    if (text.startsWith("- ") || text.startsWith("* ")) {
      const items = text.split("\n");
      return (
        <ul key={i} className="kb-detail-list">
          {items.map((item, li) => (
            <li key={li}>{renderInline(item.replace(/^[-*]\s*/, ""))}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(text)) {
      const items = text.split("\n");
      return (
        <ol key={i} className="kb-detail-olist">
          {items.map((item, li) => (
            <li key={li}>{renderInline(item.replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>
      );
    }
    if (text.startsWith("| ")) {
      const rows = text.split("\n").filter((r) => !r.match(/^\|[\s-|]+\|$/));
      return (
        <div key={i} className="kb-detail-table-wrap">
          <table className="kb-detail-table">
            <tbody>
              {rows.map((row, ri) => {
                const cells = row
                  .split("|")
                  .filter(Boolean)
                  .map((c) => c.trim());
                return (
                  <tr key={ri}>
                    {cells.map((cell, ci) =>
                      ri === 0 ? (
                        <th key={ci}>{renderInline(cell)}</th>
                      ) : (
                        <td key={ci}>{renderInline(cell)}</td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <p key={i} className="kb-detail-p">
        {renderInline(text)}
      </p>
    );
  });
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const accent = ERA_COLORS[article.era] ?? "#c8a951";

  const allSlugs = new Set(getAllArticles().map((a) => a.slug));
  const currentDir = article.filePath.includes("/")
    ? article.filePath.slice(0, article.filePath.lastIndexOf("/"))
    : "";
  const resolveLink = (target: string): string | null => {
    if (!target.endsWith(".md") || /^https?:/i.test(target)) return null;
    const stack = currentDir ? currentDir.split("/") : [];
    for (const seg of target.replace(/\.md$/, "").split("/")) {
      if (seg === "..") stack.pop();
      else if (seg && seg !== ".") stack.push(seg);
    }
    const exact = stack.join("--");
    if (allSlugs.has(exact)) return `/human-history/knowledge/${exact}`;
    const base = target.replace(/\.md$/, "").split("/").pop()!;
    const matches = [...allSlugs].filter((s) => s === base || s.endsWith(`--${base}`));
    return matches.length === 1 ? `/human-history/knowledge/${matches[0]}` : null;
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/human-history/knowledge/${slug}`,
    author: {
      "@type": "Organization",
      name: "Episteme · 格致",
    },
    publisher: {
      "@type": "Organization",
      name: "Episteme · 格致",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/human-history/knowledge/${slug}`,
    },
    datePublished: article.date || "2026-01-01",
    dateModified: article.date || "2026-06-03",
    keywords: article.tags?.join(", ") || "",
  };

  return (
    <div className="kb-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <nav className="kb-detail-nav">
        <Link href="/human-history/knowledge" className="kb-back-link">
          ← 返回知识库
        </Link>
        <span className="kb-detail-breadcrumb">
          {article.eraLabel} {article.category !== article.eraLabel ? `/ ${article.category}` : ""}
        </span>
      </nav>

      <article className="kb-detail-article">
        <header className="kb-detail-header">
          <span className="kb-detail-era" style={{ color: accent, borderColor: accent }}>
            {article.eraLabel}
          </span>
          <h1 className="kb-detail-title">{article.title}</h1>
          {article.period && <p className="kb-detail-period">{article.period}</p>}
          {article.tags.length > 0 && (
            <div className="kb-detail-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="kb-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="kb-detail-body">{renderMarkdown(article.content, resolveLink)}</div>
      </article>

      <div className="kb-detail-footer">
        <Link href="/human-history/knowledge" className="kb-back-bottom">
          ← 返回知识库
        </Link>
      </div>
    </div>
  );
}
