import Link from "next/link";
import type { EraDetail } from "@/subjects/history/lib/eras";

interface HistoryEvent {
  year: number;
  title: string;
  desc: string;
  era: string;
  region: string;
  cat: string;
}

interface HistoryFigure {
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

const CAT_LABELS: Record<string, string> = {
  politics: "政治",
  military: "军事",
  economy: "经济",
  culture: "文化",
  science: "科技",
  technology: "技术",
};

const REGION_LABELS: Record<string, string> = {
  asia: "亚洲",
  europe: "欧洲",
  africa: "非洲",
  americas: "美洲",
  oceania: "大洋洲",
  global: "全球",
};

export function formatYear(year: number): string {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `公元${year}年`;
}

export function EraOverview({ era }: { era: EraDetail }) {
  return (
    <section className="era-section era-overview">
      <div className="era-overview-quote">
        <blockquote>
          <p>{era.quote.text}</p>
          <cite>——{era.quote.author}</cite>
        </blockquote>
      </div>
      <div className="era-overview-desc">
        {era.longDesc.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export function EraTimeline({
  events,
  eraColor,
}: {
  events: HistoryEvent[];
  eraColor: string;
}) {
  if (events.length === 0) return null;
  return (
    <section className="era-section">
      <h2 className="era-section-title">重大事件年表</h2>
      <div className="era-timeline">
        {events.map((ev, i) => (
          <div key={i} className="era-timeline-item">
            <div className="era-timeline-dot" style={{ borderColor: eraColor }} />
            <div className="era-timeline-line" />
            <div className="era-timeline-content">
              <div className="era-timeline-meta">
                <span className="era-timeline-year" style={{ color: eraColor }}>
                  {formatYear(ev.year)}
                </span>
                <span className="era-timeline-cat">
                  {CAT_LABELS[ev.cat] ?? ev.cat}
                </span>
                <span className="era-timeline-region">
                  {REGION_LABELS[ev.region] ?? ev.region}
                </span>
              </div>
              <h3 className="era-timeline-title">{ev.title}</h3>
              <p className="era-timeline-desc">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EraFigures({
  figures,
  eraColor,
}: {
  figures: HistoryFigure[];
  eraColor: string;
}) {
  if (figures.length === 0) return null;
  return (
    <section className="era-section">
      <h2 className="era-section-title">关键人物</h2>
      <div className="era-figures-grid">
        {figures.map((fig, i) => (
          <div key={i} className="era-figure-card">
            <div className="era-figure-avatar" style={{ borderColor: eraColor }}>
              {fig.name.charAt(0)}
            </div>
            <div className="era-figure-info">
              <h3 className="era-figure-name">{fig.name}</h3>
              <span className="era-figure-title">{fig.title}</span>
              {(fig.birth != null || fig.death != null) && (
                <span className="era-figure-dates">
                  {fig.birth != null ? formatYear(fig.birth) : "?"} –{" "}
                  {fig.death != null ? formatYear(fig.death) : "?"}
                </span>
              )}
              <p className="era-figure-desc">{fig.desc}</p>
              {fig.quote && (
                <p className="era-figure-quote">&ldquo;{fig.quote}&rdquo;</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EraAchievements({ achievements }: { achievements: string[] }) {
  return (
    <section className="era-section">
      <h2 className="era-section-title">文明成就</h2>
      <div className="era-achievements-list">
        {achievements.map((a, i) => (
          <div key={i} className="era-achievement-item">
            <span className="era-achievement-dot" />
            <span>{a}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EraDeepReading({ era }: { era: EraDetail }) {
  return (
    <section className="era-section">
      <h2 className="era-section-title">延伸阅读</h2>
      <div className="era-reading-list">
        {era.deepReading.map((book, i) => (
          <div key={i} className="era-reading-item">
            <span className="era-reading-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="era-reading-info">
              <h3 className="era-reading-title">{book.title}</h3>
              <span className="era-reading-title-en">{book.titleEn}</span>
              <div className="era-reading-meta">
                <span>{book.author}</span>
                <span>{book.year}</span>
              </div>
              <p className="era-reading-note">{book.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EraLegacy({ legacy }: { legacy: string }) {
  return (
    <section className="era-section">
      <h2 className="era-section-title">历史遗产</h2>
      <p className="era-legacy-text">{legacy}</p>
    </section>
  );
}

export function EraNav({
  prev,
  next,
}: {
  prev: EraDetail | null;
  next: EraDetail | null;
}) {
  return (
    <nav className="era-nav-bottom">
      {prev ? (
        <Link href={`/human-history/eras/${prev.id}`} className="era-nav-link era-nav-prev">
          <span className="era-nav-label">← 上一个时代</span>
          <span className="era-nav-name">{prev.name}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/human-history/eras/${next.id}`} className="era-nav-link era-nav-next">
          <span className="era-nav-label">下一个时代 →</span>
          <span className="era-nav-name">{next.name}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
