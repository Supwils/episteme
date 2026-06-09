import { FIGURES } from "@/content/human-history/data/figures.js";
import { ERAS } from "@/subjects/history/lib/eras";
import Link from "next/link";
import type { Metadata } from "next";

interface Figure {
  name: string;
  birth: number | null;
  death: number | null;
  title: string;
  desc: string;
  era: string;
  region: string;
  domain: string;
  quote: string;
}

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

export const metadata: Metadata = {
  title: "历史人物 — 人类历史",
  description: "塑造文明进程的关键人物，按地区与时代交叉浏览。",
};

function formatYear(year: number | null): string {
  if (year == null) return "未知";
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `公元${year}年`;
}

function getEraName(eraId: string): string {
  const era = ERAS.find((e) => e.id === eraId);
  return era?.name ?? eraId;
}

export default function FiguresPage() {
  const figures = FIGURES as Figure[];
  const sorted = [...figures].sort((a, b) => (a.birth ?? 0) - (b.birth ?? 0));

  return (
    <>
      <style>{`
        .figures-list-page {
          padding: 80px 24px 60px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .figures-list-header {
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
        }

        .figures-list-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 0.82rem;
          color: var(--parchment-dim);
        }

        .figures-list-breadcrumb a {
          color: var(--gold);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .figures-list-breadcrumb a:hover { opacity: 0.8; }

        .figures-list-title {
          font-family: var(--serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--parchment);
          margin: 0 0 8px;
        }

        .figures-list-subtitle {
          font-size: 0.95rem;
          color: var(--parchment-dim);
        }

        .figures-list-count {
          font-family: var(--mono);
          font-size: 0.82rem;
          color: var(--gold);
          margin-top: 12px;
        }

        .figures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .figure-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          text-decoration: none;
          transition: border-color 0.3s, transform 0.3s;
        }

        .figure-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .figure-card-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          background: color-mix(in oklab, var(--gold) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          color: var(--gold);
          flex-shrink: 0;
        }

        .figure-card-body {
          flex: 1;
          min-width: 0;
        }

        .figure-card-name {
          font-family: var(--serif);
          font-size: 1.05rem;
          color: var(--parchment);
          margin-bottom: 2px;
        }

        .figure-card-title {
          font-size: 0.78rem;
          color: var(--gold);
          margin-bottom: 4px;
        }

        .figure-card-dates {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--parchment-mute);
          margin-bottom: 6px;
        }

        .figure-card-desc {
          font-size: 0.82rem;
          color: var(--parchment-dim);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .figure-card-meta {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }

        .figure-card-chip {
          font-size: 0.65rem;
          padding: 2px 8px;
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          color: var(--parchment-mute);
        }

        @media (max-width: 640px) {
          .figures-list-title { font-size: 1.6rem; }
          .figures-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="figures-list-page">
        <header className="figures-list-header">
          <nav className="figures-list-breadcrumb">
            <Link href="/human-history">人类历史</Link>
            <span>/</span>
            <span>人物</span>
          </nav>
          <h1 className="figures-list-title">历史人物</h1>
          <p className="figures-list-subtitle">
            {figures.length}位塑造文明进程的人物——传记、争议反思、人物网络与事件关联
          </p>
          <p className="figures-list-count">按出生年代排序</p>
        </header>

        <div className="figures-grid">
          {sorted.map((fig) => (
            <Link
              key={fig.name}
              href={`/human-history/figures/${encodeURIComponent(fig.name)}`}
              className="figure-card"
            >
              <div className="figure-card-avatar">{fig.name.charAt(0)}</div>
              <div className="figure-card-body">
                <h2 className="figure-card-name">{fig.name}</h2>
                <span className="figure-card-title">{fig.title}</span>
                <span className="figure-card-dates">
                  {formatYear(fig.birth)} – {formatYear(fig.death)}
                </span>
                <p className="figure-card-desc">{fig.desc}</p>
                <div className="figure-card-meta">
                  <span className="figure-card-chip">
                    {DOMAIN_LABELS[fig.domain] ?? fig.domain}
                  </span>
                  <span className="figure-card-chip">{getEraName(fig.era)}</span>
                  <span className="figure-card-chip">
                    {REGION_LABELS[fig.region] ?? fig.region}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
