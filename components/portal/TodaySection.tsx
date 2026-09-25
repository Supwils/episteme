import Link from "next/link";
import { SpriteSeal } from "@/components/design/SpriteSeal";
import { dailyShelf } from "@/lib/astrolabe";
import {
  coincidenceFollowHref,
  curiosityTeaser,
  getSpotlightCoincidence,
  SPOTLIGHT_COINCIDENCE_SALT,
} from "@/lib/curiosities";
import { dailyLabelFor, dedupeDailyEvents } from "@/lib/daily-display";
import { getDailyKnowledge } from "@/lib/daily-knowledge";
import { LATEST_UPDATES } from "@/lib/data";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";
import { domainCluster } from "@/lib/knowledge-geometry";

function calendarSeed(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function formatYear(year: number): string {
  return year < 0 ? `公元前 ${Math.abs(year)} 年` : `${year} 年`;
}

/**
 * ③ 今天：今日一篇（每日知识的第一条）、最近更新、今日书架（学习主线 L2–L3
 * 按日期轮换的六篇）与一条跨学科巧合。原来的每日知识、最新更新、精选内容
 * 三段合成这一段；页面每小时重验证，书架每天换一次。
 */
export function TodaySection() {
  const now = new Date();
  const daily = getDailyKnowledge(now);
  const lead = dedupeDailyEvents(daily.items)[0];
  const shelf = dailyShelf(now);
  const coincidence = getSpotlightCoincidence(calendarSeed(now) + SPOTLIGHT_COINCIDENCE_SALT);

  return (
    <section className="home-section home-today" aria-labelledby="today-title">
      <header className="home-section__header">
        <h2 id="today-title" className="home-section__title">
          今天
        </h2>
        <p className="home-section__meta">{daily.date}</p>
      </header>

      <div className="home-today__grid">
        {lead ? (
          <article className="home-today__lead">
            <p className="home-today__eyebrow">
              今日一篇 · {dailyLabelFor(lead.url, "知识")}
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
              const cluster = domainCluster(pick.domain);
              return (
                <li key={pick.url}>
                  <Link href={pick.url} className="home-today__pick">
                    {isSealDomain(pick.domain) && cluster ? (
                      <SpriteSeal domain={pick.domain} size={22} color={pigmentVar(cluster)} />
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
          <Link href={coincidenceFollowHref(coincidence.url)} className="home-today__coincidence">
            <span className="home-today__pick-meta">今日巧合</span>
            <span className="home-today__pick-title">{coincidence.title}</span>
            <span className="home-today__coincidence-text">
              {curiosityTeaser(coincidence.detail)}
            </span>
          </Link>
        </div>

        <div className="home-today__column">
          <h3 className="home-today__heading">最近更新</h3>
          <ol className="home-today__updates">
            {LATEST_UPDATES.slice(0, 5).map((update) => (
              <li key={update.id}>
                <Link href={update.href} className="home-today__update">
                  <span className="home-today__pick-meta">
                    <time>{update.date}</time> · {update.domain}
                  </span>
                  <span className="home-today__pick-title">{update.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
