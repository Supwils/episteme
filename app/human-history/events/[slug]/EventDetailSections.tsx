import Link from "next/link";
import { getAllEvents, formatYear, getCatLabel, getRegionLabel } from "@/subjects/history/lib/events";
import type { EnrichedEvent } from "@/subjects/history/lib/events";

const ROLE_LABELS: Record<string, string> = {
  initiated: "发起",
  participated: "参与",
  influenced: "影响",
  opposed: "反对",
};

const RELATION_TYPE_LABELS: Record<string, string> = {
  caused: "因果",
  influenced: "影响",
  contemporary: "同时代",
  "reacted-to": "回应",
};

const RELATION_TYPE_COLORS: Record<string, string> = {
  caused: "#C8A951",
  influenced: "#2D6A4F",
  contemporary: "#1E3A5F",
  "reacted-to": "#8B1A1A",
};

export function EventHero({ event }: { event: EnrichedEvent }) {
  return (
    <section className="ev-hero">
      <div className="ev-breadcrumb">
        <Link href="/human-history">人类历史</Link>
        <span>/</span>
        <Link href="/human-history/timeline">时间线</Link>
        <span>/</span>
        <span>{event.title}</span>
      </div>
      <h1 className="ev-title">{event.title}</h1>
      <div className="ev-meta-row">
        <span className="ev-year" style={{ color: event.eraColor }}>
          {formatYear(event.year)}
        </span>
        <Link
          href={`/human-history/eras/${event.era}`}
          className="ev-era-tag"
          style={{ borderColor: event.eraColor, color: event.eraColor }}
        >
          {event.eraName}
        </Link>
        <span className="ev-region-tag">{getRegionLabel(event.region)}</span>
        <span className="ev-cat-tag">{getCatLabel(event.cat)}</span>
      </div>
      <p className="ev-desc">{event.desc}</p>
    </section>
  );
}

export function EventDetailPages({ event }: { event: EnrichedEvent }) {
  if (!event.detail || event.detail.pages.length === 0) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">深度解读</h2>
      <div className="ev-pages">
        {event.detail.pages.map((page, i) => (
          <div key={i} className="ev-page">
            <h3 className="ev-page-title">
              <span className="ev-page-num">{String(i + 1).padStart(2, "0")}</span>
              {page.title}
            </h3>
            <div className="ev-page-body">
              {page.body.split("\n\n").map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EventLongDesc({ event }: { event: EnrichedEvent }) {
  if (event.detail || !event.longDesc) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">详细叙述</h2>
      <div className="ev-long-desc">
        {event.longDesc.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export function EventFacts({ event }: { event: EnrichedEvent }) {
  if (!event.detail || event.detail.facts.length === 0) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">知识卡片</h2>
      <div className="ev-facts">
        {event.detail.facts.map((fact, i) => (
          <div key={i} className="ev-fact-item">
            <span className="ev-fact-dot" />
            <span>{fact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EventQuote({ event }: { event: EnrichedEvent }) {
  const quote = event.detail?.quote;
  if (!quote) return null;
  return (
    <section className="ev-section">
      <blockquote className="ev-quote">
        <p>{quote.text}</p>
        <cite>——{quote.author}</cite>
      </blockquote>
    </section>
  );
}

export function EventFigures({ event }: { event: EnrichedEvent }) {
  if (event.figureLinks.length === 0) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">关键人物</h2>
      <div className="ev-figures-grid">
        {event.figureLinks.map((link) => (
          <Link
            key={link.figureId}
            href={`/human-history/figures/${encodeURIComponent(link.figureId)}`}
            className="ev-figure-card"
          >
            <div
              className="ev-figure-avatar"
              style={{ borderColor: event.eraColor }}
            >
              {link.figureId.charAt(0)}
            </div>
            <div className="ev-figure-info">
              <span className="ev-figure-name">{link.figureId}</span>
              <span className="ev-figure-role">
                {ROLE_LABELS[link.role] ?? link.role}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EventRelatedEvents({ event }: { event: EnrichedEvent }) {
  if (event.relatedEvents.length === 0) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">相关事件</h2>
      <div className="ev-related-list">
        {event.relatedEvents.map((rel, i) => {
          const otherTitle =
            rel.source === event.title ? rel.target : rel.source;
          const relColor = RELATION_TYPE_COLORS[rel.type] ?? "#C8A951";
          return (
            <Link
              key={i}
              href={`/human-history/events/${encodeURIComponent(otherTitle)}`}
              className="ev-related-item"
            >
              <span
                className="ev-related-type"
                style={{ color: relColor, borderColor: relColor }}
              >
                {RELATION_TYPE_LABELS[rel.type] ?? rel.type}
              </span>
              <span className="ev-related-title">{otherTitle}</span>
              <span className="ev-related-desc">{rel.description}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function EventReferences({ event }: { event: EnrichedEvent }) {
  if (event.resolvedReferences.length === 0) return null;
  return (
    <section className="ev-section">
      <h2 className="ev-section-title">参考文献</h2>
      <div className="ev-refs-list">
        {event.resolvedReferences.map((ref, i) => (
          <div key={i} className="ev-ref-item">
            <span className="ev-ref-num">[{i + 1}]</span>
            <div className="ev-ref-info">
              <span className="ev-ref-title">{ref.title}</span>
              {ref.titleEn && (
                <span className="ev-ref-title-en">{ref.titleEn}</span>
              )}
              <span className="ev-ref-meta">
                {ref.author} · {ref.year > 0 ? ref.year : `约${Math.abs(ref.year)}年前`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EventNav({ event }: { event: EnrichedEvent }) {
  const eraEvents = getAllEvents()
    .filter((e) => e.era === event.era)
    .sort((a, b) => a.year - b.year);
  const idx = eraEvents.findIndex((e) => e.title === event.title);
  const prev = idx > 0 ? eraEvents[idx - 1] : null;
  const next = idx < eraEvents.length - 1 ? eraEvents[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="ev-nav-bottom">
      {prev ? (
        <Link
          href={`/human-history/events/${encodeURIComponent(prev.title)}`}
          className="ev-nav-link ev-nav-prev"
        >
          <span className="ev-nav-label">← 上一事件</span>
          <span className="ev-nav-name">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/human-history/events/${encodeURIComponent(next.title)}`}
          className="ev-nav-link ev-nav-next"
        >
          <span className="ev-nav-label">下一事件 →</span>
          <span className="ev-nav-name">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
