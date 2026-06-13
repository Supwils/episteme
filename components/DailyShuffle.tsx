"use client";

import { useCallback, useRef, useState } from "react";
import type { DailySelected } from "@/lib/daily-selector";
import { DailyDomainGrid } from "./DailyDomainGrid";
import { DailyKnowledgeCard } from "./DailyKnowledgeCard";
import { DailyQuestionCard } from "./DailyQuestionCard";
import { DailyShareCard } from "./DailyShareCard";

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
        <p className="font-mono text-xs tracking-widest text-white/30 uppercase">
          {offsetRef.current === 0 ? "今日精选" : "随机一组"}
        </p>
        <button
          type="button"
          onClick={shuffle}
          disabled={loading}
          aria-label="换一批知识"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs tracking-wider text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
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
          className="group block rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-6 no-underline transition-colors hover:border-amber-400/40"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              💡
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-300/80 uppercase">
              今日冷知识
            </span>
          </div>
          <h3 className="mb-1.5 text-lg font-semibold text-white">{daily.curiosity.title}</h3>
          <p className="text-sm leading-relaxed text-white/55">{daily.curiosity.detail}</p>
          <span className="mt-3 inline-block font-mono text-[11px] tracking-wider text-amber-300/60 transition-colors group-hover:text-amber-300">
            更多奇趣知识 →
          </span>
        </a>
      </div>

      <div className="mt-8">
        <DailyShareCard daily={daily} />
      </div>
    </div>
  );
}
