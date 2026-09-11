import Link from "next/link";
import { STATS } from "../lib/data";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero__copy" data-home-hero-copy>
        <div className="home-hero__frame">
          <div className="home-hero__kicker-row" style={{ animationDelay: "0.1s" }}>
            <span aria-hidden="true" className="home-hero__kicker-rule" />
            <p className="home-hero__kicker">Episteme · 格致</p>
            <span aria-hidden="true" className="home-hero__kicker-rule" />
          </div>

          <h1
            aria-label="从问题出发"
            className="home-hero__title"
            style={{ animationDelay: "0.15s" }}
          >
            从<span className="text-accent-gold">问题</span>
            出发
          </h1>

          <p className="home-hero__lead" style={{ animationDelay: "0.25s" }}>
            顺着知识的线索，慢慢建立自己的理解
          </p>

          <p className="home-hero__sub" style={{ animationDelay: "0.35s" }}>
            这里整理了自然科学、形式科学、社会科学与人文学科的文章、图谱和阅读路线。你可以从熟悉的主题读起，也可以随手翻开一篇。
          </p>

          <div className="home-hero__actions" style={{ animationDelay: "0.4s" }}>
            <Link href="/random" className="home-hero__cta home-hero__cta--primary">
              随机一篇
            </Link>
            <Link href="/read" className="home-hero__cta home-hero__cta--ghost">
              阅读路线
            </Link>
            <Link href="/curiosities" className="home-hero__cta home-hero__cta--ghost">
              奇趣知识
            </Link>
          </div>
        </div>
      </div>

      <ul aria-label="平台内容统计" className="home-hero__stats">
        {STATS.map((stat, i) => (
          <li key={stat.label} className="home-hero__stat-row">
            {i > 0 ? <span aria-hidden="true" className="home-hero__stat-rule" /> : null}
            <div className="text-center">
              <span className="home-hero__stat-value">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="home-hero__stat-label">{stat.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
