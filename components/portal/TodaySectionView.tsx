"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SpriteSeal } from "@/components/design/SpriteSeal";
import type { HomeToday } from "@/lib/home-today";
import { useDailySnapshot } from "@/components/useDailySnapshot";

function formatYear(year: number): string {
  return year < 0 ? `公元前 ${Math.abs(year)} 年` : `${year} 年`;
}

/**
 * ③ 今天：今日一篇（每日知识的第一条）、最近更新、今日书架（学习主线 L2–L3
 * 按日期轮换的六篇）与一条跨学科巧合。原来的每日知识、最新更新、精选内容
 * 三段合成这一段；首屏保留 ISR 快照，跨日后整段一起刷新。
 */
export function TodaySectionView({
  initial,
  children,
}: {
  initial: HomeToday;
  children: ReactNode;
}) {
  const { snapshot: daily } = useDailySnapshot(initial, "/api/daily/home");
  const { lead, shelf, coincidence } = daily;

  return (
    <section className="home-section home-today" aria-labelledby="today-title">
      <header className="home-section__header">
        <h2 id="today-title" className="home-section__title">
          今天
        </h2>
        <p className="home-section__meta" aria-live="polite" aria-atomic="true">
          {daily.date}
        </p>
      </header>

      <div className="home-today__grid">
        {lead ? (
          <article className="home-today__lead">
            <p className="home-today__eyebrow">
              今日一篇 · {lead.label}
              {lead.year !== undefined ? ` · ${formatYear(lead.year)}` : ""}
            </p>
            <h3 className="home-today__lead-title">
              <Link href={lead.url}>{lead.title}</Link>
            </h3>
            <p className="home-today__lead-text">{lead.description}</p>
            <p className="home-today__fact">
              <span className="home-today__fact-label">趣味知识</span>
              {daily.fact}
            </p>
            <Link href="/daily" className="home-today__more">
              更多每日知识 →
            </Link>
          </article>
        ) : null}

        <div className="home-today__column">
          <h3 className="home-today__heading">今日书架</h3>
          <ul className="home-today__shelf">
            {shelf.map((pick) => {
              return (
                <li key={pick.url}>
                  <Link href={pick.url} className="home-today__pick">
                    {pick.seal && pick.pigment ? (
                      <SpriteSeal domain={pick.seal} size={22} color={pick.pigment} />
                    ) : null}
                    <span>
                      <span className="home-today__pick-meta">
                        {pick.domainTitle} · L{pick.level}
                      </span>
                      <span className="home-today__pick-title">{pick.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={coincidence.href} className="home-today__coincidence">
            <span className="home-today__pick-meta">今日巧合</span>
            <span className="home-today__pick-title">{coincidence.title}</span>
            <span className="home-today__coincidence-text">{coincidence.teaser}</span>
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
}
