import Link from "next/link";
import type { DailyItem } from "../lib/daily-knowledge";
import {
  dailyIconFor,
  dailyLabelFor,
  dailyStyleKeyFor,
  dedupeDailyEvents,
} from "../lib/daily-display";
import "./daily-card.css";

type DailyKnowledgeCardProps = {
  items: DailyItem[];
  fact: string;
  date: string;
};

const DOMAIN_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  physics: {
    bg: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.25)",
    text: "#60a5fa",
    label: "宇宙物理",
  },
  history: {
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.25)",
    text: "#f59e0b",
    label: "人类历史",
  },
  philosophy: {
    bg: "rgba(234, 179, 8, 0.12)",
    border: "rgba(234, 179, 8, 0.25)",
    text: "#eab308",
    label: "哲学思想",
  },
  "life-science": {
    bg: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.25)",
    text: "#22c55e",
    label: "生命科学",
  },
  mathematics: {
    bg: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.25)",
    text: "#a78bfa",
    label: "数学",
  },
  cosmology: {
    bg: "rgba(90, 143, 192, 0.12)",
    border: "rgba(90, 143, 192, 0.25)",
    text: "#5a8fc0",
    label: "宇宙学",
  },
  economics: {
    bg: "rgba(232, 184, 74, 0.12)",
    border: "rgba(232, 184, 74, 0.25)",
    text: "#e8b84a",
    label: "经济学",
  },
  psychology: {
    bg: "rgba(212, 120, 156, 0.12)",
    border: "rgba(212, 120, 156, 0.25)",
    text: "#d4789c",
    label: "心理学",
  },
  literature: {
    bg: "rgba(139, 94, 74, 0.12)",
    border: "rgba(139, 94, 74, 0.25)",
    text: "#8b5e4a",
    label: "文学与叙事",
  },
  religion: {
    bg: "rgba(107, 92, 138, 0.12)",
    border: "rgba(107, 92, 138, 0.25)",
    text: "#6b5c8a",
    label: "宗教学",
  },
};

const DEFAULT_STYLE = {
  bg: "rgba(195, 154, 69, 0.12)",
  border: "rgba(195, 154, 69, 0.25)",
  text: "#c39a45",
  label: "知识",
};

function getDomainStyle(domain: string) {
  return DOMAIN_STYLES[domain] ?? DEFAULT_STYLE;
}

export function DailyKnowledgeCard({ items, fact, date }: DailyKnowledgeCardProps) {
  return (
    <section
      className="home-daily"
      data-home-reveal
      style={{
        background: "var(--color-bg-panel)",
        border: "1px solid var(--color-border-faint)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #f59e0b, #eab308, #22c55e)",
        }}
      />

      <div className="home-daily__body">
        <div className="mb-6">
          <h2 className="home-daily__heading">今天的知识</h2>
          <p className="home-daily__date">{date}</p>
        </div>

        <div className="home-daily__list">
          {dedupeDailyEvents(items).map((item) => {
            const style = getDomainStyle(dailyStyleKeyFor(item.url, item.domain));
            const label = dailyLabelFor(item.url, style.label);
            return (
              <div key={item.id} data-home-reveal>
                <Link href={item.url} className="home-daily__link">
                  <div className="home-daily__row">
                    <span className="home-daily__icon">{dailyIconFor(item.url, item.icon)}</span>
                    <div className="home-daily__copy">
                      <div className="home-daily__meta">
                        <span
                          className="home-daily__badge"
                          style={{
                            color: `color-mix(in oklab, ${style.text} 38%, var(--color-fg-primary))`,
                            background: style.bg,
                            border: `1px solid ${style.border}`,
                          }}
                        >
                          {label}
                        </span>
                        {item.year !== undefined && (
                          <span className="home-daily__year">
                            {item.year < 0 ? `公元前${Math.abs(item.year)}年` : `${item.year}年`}
                          </span>
                        )}
                      </div>
                      <h3 className="home-daily__title">{item.title}</h3>
                      <p className="home-daily__description">{item.description}</p>
                    </div>
                    <span aria-hidden="true" className="home-daily__arrow">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div
          className="home-daily__fact"
          style={{ borderTop: "1px solid var(--color-border-faint)" }}
        >
          <span className="shrink-0 text-sm">💡</span>
          <p className="home-daily__fact-text">
            <span className="home-daily__fact-label">趣味知识：</span>
            {fact}
          </p>
        </div>
      </div>
    </section>
  );
}
