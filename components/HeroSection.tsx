import Link from "next/link";
import { STATS } from "../lib/data";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 pb-16 text-center">
      <div className="relative z-1 px-6" data-home-hero-copy>
        <div className="animate-slide-up relative inline-block px-4 py-9 sm:px-12">
          <div
            className="animate-slide-up mb-7 flex items-center justify-center gap-3"
            style={{ animationDelay: "0.1s" }}
          >
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
            <p className="text-accent-gold font-mono text-[0.75rem] font-medium tracking-[0.38em] uppercase">
              Episteme · 格致
            </p>
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
          </div>

          <h1
            aria-label="从问题出发"
            className="animate-slide-up font-display text-fg-primary mb-5 text-[clamp(2.9rem,7.5vw,5.2rem)] leading-[1.04] font-semibold tracking-tight"
            style={{ animationDelay: "0.15s" }}
          >
            从<span className="text-accent-gold">问题</span>
            出发
          </h1>

          <p
            className="animate-slide-up text-fg-secondary mx-auto mb-4 max-w-[560px] text-[1.15rem] leading-relaxed font-medium"
            style={{ animationDelay: "0.25s" }}
          >
            顺着知识的线索，慢慢建立自己的理解
          </p>

          <p
            className="animate-slide-up text-fg-muted mx-auto mb-8 max-w-[520px] text-[1.02rem] leading-relaxed"
            style={{ animationDelay: "0.35s" }}
          >
            这里整理了自然科学、形式科学、社会科学与人文学科的文章、图谱和阅读路线。你可以从熟悉的主题读起，也可以随手翻开一篇。
          </p>

          <div
            className="animate-slide-up mb-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/random"
              className="bg-accent-gold text-bg-base inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[12px] tracking-[0.14em] uppercase transition-opacity hover:opacity-90"
            >
              随机一篇
            </Link>
            <Link
              href="/read"
              className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-[12px] tracking-[0.14em] uppercase transition-colors"
            >
              阅读路线
            </Link>
            <Link
              href="/curiosities"
              className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-[12px] tracking-[0.14em] uppercase transition-colors"
            >
              奇趣知识
            </Link>
          </div>
        </div>
      </div>

      <ul
        aria-label="平台内容统计"
        className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6 px-4 sm:gap-x-16"
      >
        {STATS.map((stat, i) => (
          <li key={stat.label} className="flex items-center gap-x-10 sm:gap-x-16">
            {i > 0 ? (
              <span aria-hidden="true" className="bg-border-faint hidden h-9 w-px sm:block" />
            ) : null}
            <div className="text-center">
              <span className="font-display text-fg-primary block text-[2.1rem] leading-tight font-semibold tracking-tight">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-fg-muted mt-1.5 block font-mono text-[0.75rem] tracking-[0.18em] uppercase">
                {stat.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
