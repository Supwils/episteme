"use client";

import { useCallback, useRef, useState } from "react";
import type { DailySelected } from "@/lib/daily-selector";
import { DailyDomainGrid } from "./DailyDomainGrid";
import { DailyKnowledgeCard } from "./DailyKnowledgeCard";
import { DailyQuestionCard } from "./DailyQuestionCard";

function toLegacyItems(daily: DailySelected) {
  return [
    {
      id: `physics-${daily.date}`,
      title: daily.physics.title,
      description: daily.physics.description,
      domain: "physics" as const,
      url: daily.physics.url,
      year: daily.physics.year,
      icon: "🔬",
    },
    {
      id: `history-${daily.date}`,
      title: daily.history.title,
      description: daily.history.description,
      domain: "history" as const,
      url: daily.history.url,
      year: daily.history.year,
      icon: "📜",
    },
    {
      id: `philosophy-${daily.date}`,
      title: daily.philosophy.title,
      description: daily.philosophy.description,
      domain: "philosophy" as const,
      url: daily.philosophy.url,
      year: daily.philosophy.year,
      icon: "💭",
    },
    {
      id: `economics-${daily.date}`,
      title: daily.economics.title,
      description: daily.economics.description,
      domain: "economics" as const,
      url: daily.economics.url,
      year: daily.economics.year,
      icon: "📊",
    },
    {
      id: `psychology-${daily.date}`,
      title: daily.psychology.title,
      description: daily.psychology.description,
      domain: "psychology" as const,
      url: daily.psychology.url,
      year: daily.psychology.year,
      icon: "🧠",
    },
  ];
}

export function DailyShuffle({ initial }: { initial: DailySelected }) {
  const [daily, setDaily] = useState<DailySelected>(initial);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(0);

  const shuffle = useCallback(() => {
    offsetRef.current += 1;
    setLoading(true);
    fetch(`/api/daily/shuffle?offset=${offsetRef.current}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((next: DailySelected | null) => {
        if (next) setDaily(next);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-fg-muted font-mono text-xs tracking-widest uppercase">
          {offsetRef.current === 0 ? "今日精选" : "随机一组"}
        </p>
        <button
          type="button"
          onClick={shuffle}
          disabled={loading}
          aria-label="换一批知识"
          className="group border-border-subtle bg-bg-elevated text-fg-secondary hover:border-border-strong hover:text-fg-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-wider transition-all disabled:opacity-50"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              loading ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"
            }
            aria-hidden
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          {loading ? "正在换…" : "换一批"}
        </button>
      </div>

      <DailyDomainGrid daily={daily} />

      <div className="mt-8">
        <DailyKnowledgeCard items={toLegacyItems(daily)} fact={daily.fact} date={daily.date} />
      </div>

      <div className="mt-8">
        <DailyQuestionCard question={daily.question} />
      </div>

      <div className="mt-8">
        <a
          href={daily.curiosity.url ?? "/curiosities"}
          className="group border-accent-gold/25 bg-accent-gold/[0.06] hover:border-accent-gold/45 block rounded-2xl border p-6 no-underline transition-colors"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              💡
            </span>
            <span className="text-accent-gold font-mono text-[10px] tracking-[0.28em] uppercase">
              今日冷知识
            </span>
          </div>
          <h3 className="text-fg-primary mb-1.5 text-lg font-semibold">{daily.curiosity.title}</h3>
          <p className="text-fg-secondary text-sm leading-relaxed">{daily.curiosity.detail}</p>
          <span className="text-accent-gold mt-3 inline-block font-mono text-[11px] tracking-wider transition-colors group-hover:underline">
            更多奇趣知识 →
          </span>
        </a>
      </div>
    </div>
  );
}
