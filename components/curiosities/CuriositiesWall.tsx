"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  CURIOSITY_SUBJECTS,
  type CuriosityWithSubject,
  type CuriositySubject,
} from "@/lib/curiosities";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function CuriositiesWall({ items }: { items: CuriosityWithSubject[] }) {
  const [active, setActive] = useState<CuriositySubject | "all">("all");
  const [order, setOrder] = useState<string[] | null>(null);

  const subjects = Object.keys(CURIOSITY_SUBJECTS) as CuriositySubject[];

  const visible = useMemo(() => {
    let list = active === "all" ? items : items.filter((i) => i.subject === active);
    if (order) {
      const rank = new Map(order.map((id, idx) => [id, idx]));
      list = [...list].sort(
        (a, b) => (rank.get(`${a.subject}:${a.id}`) ?? 0) - (rank.get(`${b.subject}:${b.id}`) ?? 0)
      );
    }
    return list;
  }, [items, active, order]);

  const reshuffle = useCallback(() => {
    setOrder(shuffle(items.map((i) => `${i.subject}:${i.id}`)));
  }, [items]);

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          curiosities · 奇趣知识
        </p>
        <h1 className="font-display text-fg-primary text-[2.6rem] leading-tight tracking-tight md:text-[3.6rem]">
          原来<em className="text-accent-gold italic"> 如此</em>
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          横跨十个学科、{items.length}{" "}
          条少有人知却真实而迷人的事实。每一条都有出处，每一条都可能让你「咦？」一声。
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all ${
            active === "all"
              ? "border-accent-gold/50 text-accent-gold bg-accent-gold/10"
              : "border-border-faint text-fg-muted hover:text-fg-secondary"
          }`}
        >
          全部 {items.length}
        </button>
        {subjects.map((s) => {
          const meta = CURIOSITY_SUBJECTS[s];
          const count = items.filter((i) => i.subject === s).length;
          if (count === 0) return null;
          const on = active === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              className="rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all"
              style={{
                borderColor: on ? `${meta.accent}80` : "var(--color-border-faint)",
                color: on ? meta.accent : "var(--color-fg-muted)",
                backgroundColor: on ? `${meta.accent}14` : "transparent",
              }}
            >
              {meta.icon} {meta.label} {count}
            </button>
          );
        })}
        <button
          type="button"
          onClick={reshuffle}
          className="border-border-faint text-fg-secondary hover:text-fg-primary hover:border-fg-disabled/40 ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-wider transition-all"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 hover:rotate-180"
            aria-hidden
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          换个顺序
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => {
          const meta = CURIOSITY_SUBJECTS[item.subject];
          const card = (
            <div className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex h-full flex-col gap-3 overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                style={{ backgroundColor: meta.accent }}
              />
              <div className="relative flex items-center gap-2">
                <span className="text-base leading-none" aria-hidden>
                  {meta.icon}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.22em] uppercase"
                  style={{ color: meta.accent }}
                >
                  {meta.label}
                </span>
              </div>
              <h3 className="font-display text-fg-primary relative text-lg leading-snug font-semibold">
                {item.title}
              </h3>
              <p className="text-fg-secondary relative flex-1 text-sm leading-relaxed">
                {item.detail}
              </p>
              {item.source && (
                <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                  来源：{item.source}
                </p>
              )}
              {item.url && (
                <span className="text-fg-disabled group-hover:text-accent-gold relative mt-1 font-mono text-[11px] tracking-wider transition-colors">
                  深入了解 →
                </span>
              )}
            </div>
          );
          return item.url ? (
            <Link key={`${item.subject}:${item.id}`} href={item.url} className="block no-underline">
              {card}
            </Link>
          ) : (
            <div key={`${item.subject}:${item.id}`}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
