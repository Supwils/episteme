import { STATS } from "../lib/data";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 pb-16 text-center">
      <div className="relative z-1 px-6">
        <div className="animate-fade-slide-up relative inline-block px-4 py-9 sm:px-12">
          <div
            className="animate-fade-slide-up mb-7 flex items-center justify-center gap-3"
            style={{ animationDelay: "0.1s" }}
          >
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
            <p className="text-accent-gold font-mono text-[0.7rem] font-medium tracking-[0.38em] uppercase">
              Episteme · 格致 Platform
            </p>
            <span aria-hidden="true" className="bg-accent-gold/45 h-px w-8" />
          </div>

          <h1
            className="animate-fade-slide-up font-display text-fg-primary mb-5 text-[clamp(2.9rem,7.5vw,5.2rem)] leading-[1.04] font-semibold tracking-tight"
            style={{ animationDelay: "0.15s" }}
          >
            探索人类
            <span className="text-accent-gold">知识</span>
            的边界
          </h1>

          <p
            className="animate-fade-slide-up text-fg-secondary mx-auto mb-4 max-w-[560px] text-[1.15rem] leading-relaxed font-medium"
            style={{ animationDelay: "0.25s" }}
          >
            从宇宙的尺度到人类的思想，一站式探索
          </p>

          <p
            className="animate-fade-slide-up text-fg-muted mx-auto mb-10 max-w-[520px] text-[1.02rem] leading-relaxed"
            style={{ animationDelay: "0.35s" }}
          >
            贯通自然科学、形式科学、社会科学与人文学科，构建可追踪、可游览的知识图谱。让任何人随时以美好的方式接触到人类最重要的知识。
          </p>
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
              <span className="text-fg-muted mt-1.5 block font-mono text-[0.68rem] tracking-[0.18em] uppercase">
                {stat.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
