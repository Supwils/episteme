import "../../styles/pages/figures.css";
import { ERAS } from "@/subjects/history/lib/eras";
import {
  HISTORY_FIGURE_CATALOG,
  getHistoryFigureSummary,
} from "@/subjects/history/lib/history-catalog";
import {
  getFigureRouteRecord,
  type HistoryFigure,
} from "@/subjects/history/lib/figure-route-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const DOMAIN_LABELS: Record<string, string> = {
  politics: "政治治理",
  philosophy: "思想哲学",
  science: "科学医学",
  technology: "技术工程",
  culture: "文化艺术",
  economy: "经济商业",
  military: "军事",
};

const REGION_LABELS: Record<string, string> = {
  asia: "亚洲",
  europe: "欧洲",
  africa: "非洲",
  americas: "美洲",
  oceania: "大洋洲",
  global: "全球",
};

function formatYear(year: number | null): string {
  if (year == null) return "未知";
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `公元${year}年`;
}

// On-demand ISR: prerender nothing at build time. Pages render on first request
// and are cached (dynamicParams defaults to true). This keeps the deployment file
// count low for this high-cardinality route while serving all figures.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const figure = getHistoryFigureSummary(slug);
  if (!figure) notFound();
  const description = figure.desc;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(figure.name)}&section=human-history&description=${encodeURIComponent(description)}`;
  return {
    title: `${figure.name} — 人类历史人物`,
    description,
    openGraph: {
      title: `${figure.name} — 人类历史人物`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

function getEraName(eraId: HistoryFigure["era"]): string {
  const era = ERAS.find((e) => e.id === eraId);
  return era?.name ?? eraId;
}

export default async function FigureDetailPage({ params }: Props) {
  const { slug } = await params;
  const figure = await getFigureRouteRecord(slug);
  if (!figure) notFound();

  const relatedFigures = HISTORY_FIGURE_CATALOG
    .filter((f) => f.era === figure.era && f.name !== figure.name)
    .slice(0, 5);

  return (
    <>
      <style>{`
        .figure-detail-page {
          padding: 80px 24px 60px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .figure-detail-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-size: 0.82rem;
          color: var(--parchment-dim);
        }

        .figure-detail-breadcrumb a {
          color: var(--gold);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .figure-detail-breadcrumb a:hover { opacity: 0.8; }

        .figure-detail-hero {
          display: flex;
          gap: 32px;
          margin-bottom: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
        }

        .figure-detail-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid var(--gold);
          background: color-mix(in oklab, var(--gold) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          color: var(--gold);
          flex-shrink: 0;
        }

        .figure-detail-header { flex: 1; }

        .figure-detail-title-tag {
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.6;
          margin-bottom: 8px;
        }

        .figure-detail-name {
          font-family: var(--serif);
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--parchment);
          margin: 0 0 6px;
          letter-spacing: 0.04em;
        }

        .figure-detail-title {
          font-size: 1rem;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .figure-detail-dates {
          font-family: var(--mono);
          font-size: 0.85rem;
          color: var(--parchment-mute);
          margin-bottom: 12px;
        }

        .figure-detail-desc {
          font-size: 0.95rem;
          color: var(--parchment-dim);
          line-height: 1.8;
        }

        .figure-detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
        }

        .figure-meta-chip {
          padding: 6px 16px;
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.78rem;
          color: var(--parchment-dim);
          background: var(--bg-card);
        }

        .figure-section {
          margin-bottom: 48px;
        }

        .figure-section-title {
          font-family: var(--serif);
          font-size: 1.35rem;
          color: var(--parchment);
          margin-bottom: 24px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
          font-weight: 600;
        }

        .figure-long-desc p {
          color: var(--parchment-dim);
          font-size: 0.95rem;
          line-height: 1.95;
          margin-bottom: 16px;
          text-indent: 2em;
        }

        .figure-long-desc p:first-child { text-indent: 0; }

        .figure-quote {
          font-family: var(--serif);
          font-size: 1.15rem;
          color: var(--gold);
          font-style: italic;
          border-left: 3px solid var(--gold);
          padding: 12px 0 12px 20px;
          margin-bottom: 40px;
        }

        .figure-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .figure-tag {
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          font-size: 0.78rem;
          color: var(--parchment-dim);
          background: var(--bg-card);
        }

        .figure-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .figure-list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 0.9rem;
          color: var(--parchment-dim);
          line-height: 1.65;
        }

        .figure-list-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          margin-top: 8px;
        }

        .figure-timeline {
          position: relative;
          padding-left: 32px;
        }

        .figure-timeline-item {
          position: relative;
          padding-bottom: 28px;
        }

        .figure-timeline-item:last-child { padding-bottom: 0; }

        .figure-timeline-dot {
          position: absolute;
          left: -32px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          background: var(--bg);
          z-index: 1;
        }

        .figure-timeline-line {
          position: absolute;
          left: -28px;
          top: 18px;
          bottom: -16px;
          width: 1px;
          background: linear-gradient(180deg, var(--border) 0%, transparent 100%);
        }

        .figure-timeline-item:last-child .figure-timeline-line { display: none; }

        .figure-timeline-year {
          font-family: var(--mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 4px;
        }

        .figure-timeline-title {
          font-family: var(--serif);
          font-size: 1rem;
          color: var(--parchment);
        }

        .figure-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }

        .figure-related-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          text-decoration: none;
          transition: border-color 0.3s, transform 0.3s;
        }

        .figure-related-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .figure-related-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          background: color-mix(in oklab, var(--gold) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--gold);
          flex-shrink: 0;
        }

        .figure-related-name {
          font-family: var(--serif);
          font-size: 0.9rem;
          color: var(--parchment);
        }

        .figure-related-title {
          font-size: 0.72rem;
          color: var(--parchment-mute);
        }

        .figure-controversy-item {
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 3px solid color-mix(in oklab, var(--gold) 40%, transparent);
          border-radius: var(--radius);
          font-size: 0.88rem;
          color: var(--parchment-dim);
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .figure-detail-hero { flex-direction: column; align-items: center; text-align: center; }
          .figure-detail-name { font-size: 1.8rem; }
          .figure-detail-meta { justify-content: center; }
          .figure-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="figure-detail-page">
        <nav className="figure-detail-breadcrumb">
          <Link href="/human-history">人类历史</Link>
          <span>/</span>
          <Link href="/human-history/figures">人物</Link>
          <span>/</span>
          <span>{figure.name}</span>
        </nav>

        <div className="figure-detail-hero">
          <div className="figure-detail-avatar">{figure.name.charAt(0)}</div>
          <div className="figure-detail-header">
            <p className="figure-detail-title-tag">human-history / figures</p>
            <h1 className="figure-detail-name">{figure.name}</h1>
            <p className="figure-detail-title">{figure.title}</p>
            <p className="figure-detail-dates">
              {formatYear(figure.birth)} — {formatYear(figure.death)}
            </p>
            <p className="figure-detail-desc">{figure.desc}</p>
          </div>
        </div>

        <div className="figure-detail-meta">
          <span className="figure-meta-chip">{DOMAIN_LABELS[figure.domain] ?? figure.domain}</span>
          <span className="figure-meta-chip">{getEraName(figure.era)}</span>
          <span className="figure-meta-chip">{REGION_LABELS[figure.region] ?? figure.region}</span>
          {figure.birth != null && figure.death != null && (
            <span className="figure-meta-chip">享年 {figure.death - figure.birth} 年</span>
          )}
        </div>

        {figure.quote && (
          <blockquote className="figure-quote">&ldquo;{figure.quote}&rdquo;</blockquote>
        )}

        <section className="figure-section">
          <h2 className="figure-section-title">生平</h2>
          <div className="figure-long-desc">
            {figure.longDesc.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {figure.keyEvents.length > 0 && (
          <section className="figure-section">
            <h2 className="figure-section-title">生平大事年表</h2>
            <div className="figure-timeline">
              {figure.keyEvents.map((ev, i) => (
                <div key={i} className="figure-timeline-item">
                  <div className="figure-timeline-dot" />
                  <div className="figure-timeline-line" />
                  <div className="figure-timeline-year">{formatYear(ev.year)}</div>
                  <div className="figure-timeline-title">{ev.title}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {figure.achievements.length > 0 && (
          <section className="figure-section">
            <h2 className="figure-section-title">主要成就</h2>
            <div className="figure-list">
              {figure.achievements.map((a, i) => (
                <div key={i} className="figure-list-item">
                  <span className="figure-list-dot" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {figure.impact.length > 0 && (
          <section className="figure-section">
            <h2 className="figure-section-title">历史影响</h2>
            <div className="figure-tags-grid">
              {figure.impact.map((tag, i) => (
                <span key={i} className="figure-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {figure.controversies.length > 0 && (
          <section className="figure-section">
            <h2 className="figure-section-title">争议与反思</h2>
            <div className="figure-list">
              {figure.controversies.map((c, i) => (
                <div key={i} className="figure-controversy-item">
                  {c}
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedFigures.length > 0 && (
          <section className="figure-section">
            <h2 className="figure-section-title">同时代人物</h2>
            <div className="figure-related-grid">
              {relatedFigures.map((rf) => (
                <Link
                  key={rf.name}
                  href={`/human-history/figures/${encodeURIComponent(rf.name)}`}
                  className="figure-related-card"
                >
                  <div className="figure-related-avatar">{rf.name.charAt(0)}</div>
                  <div>
                    <div className="figure-related-name">{rf.name}</div>
                    <div className="figure-related-title">{rf.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
