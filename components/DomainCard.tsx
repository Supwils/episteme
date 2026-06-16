import Link from "next/link";
import { APP_URLS } from "../lib/urls";

interface Domain {
  id: keyof typeof APP_URLS;
  title: string;
  titleEn: string;
  description: string;
  gradient: string;
  glowColor: string;
  bgAccent: string;
  borderAccent: string;
  icon: React.ReactNode;
  stats: string;
}

export function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const href = APP_URLS[domain.id];

  return (
    <Link
      href={href}
      data-domain={domain.id}
      className="animate-fade-slide-up domain-card group border-border-faint bg-bg-near/70 text-fg-primary relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border p-5 no-underline shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8"
      style={
        {
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          animationDelay: `${0.15 + index * 0.12}s`,
          "--domain-glow": domain.glowColor,
          "--domain-border": domain.borderAccent,
          "--domain-bg": domain.bgAccent,
          "--domain-gradient": domain.gradient,
          "--domain-shimmer-delay": `${0.15 + index * 0.12}s`,
        } as React.CSSProperties
      }
    >
      <div aria-hidden="true" className="domain-card__shimmer" />

      {/* Domain-tinted accent rail along the left edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-[2px] opacity-50 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: domain.gradient }}
      />

      <div
        aria-hidden="true"
        className="domain-card__topline absolute top-0 right-0 left-0 h-[3px] transition-opacity duration-400"
        style={{
          background: domain.gradient,
          opacity: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="domain-card__glow pointer-events-none absolute -top-20 -right-20 h-50 w-50 rounded-full transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle, ${domain.glowColor}1f 0%, transparent 70%)`,
          opacity: 0.35,
        }}
      />

      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] transition-transform duration-400 group-hover:scale-105 group-focus-visible:scale-105"
          style={{
            background: domain.bgAccent,
            border: `1px solid ${domain.borderAccent}`,
            boxShadow: `inset 0 1px 0 ${domain.glowColor}1a`,
          }}
        >
          {domain.icon}
        </div>
        <div>
          <h2 className="font-display text-fg-primary m-0 text-[1.4rem] leading-tight font-semibold">
            {domain.title}
          </h2>
          <p
            className="text-fg-muted mt-0.5 mb-0 font-mono text-[0.66rem] uppercase"
            style={{ letterSpacing: "0.12em" }}
          >
            {domain.titleEn}
          </p>
        </div>
      </div>

      <p className="text-fg-secondary m-0 flex-1 text-[0.88rem] leading-relaxed">
        {domain.description}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <span
          className="rounded-full border px-3 py-1 text-[0.7rem] font-medium"
          style={{
            color: domain.glowColor,
            background: domain.bgAccent,
            borderColor: domain.borderAccent,
          }}
        >
          {domain.stats}
        </span>
        <span
          className="domain-card__cta inline-flex items-center text-[0.85rem] font-semibold transition-[gap] duration-300"
          style={{
            color: domain.glowColor,
            gap: "0.35rem",
          }}
        >
          进入探索
          <span
            aria-hidden="true"
            className="domain-card__arrow inline-block transition-transform duration-300"
            style={{
              transform: "translateX(0)",
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
