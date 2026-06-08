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
      className="animate-fade-slide-up domain-card group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl p-5 no-underline backdrop-blur-xl sm:p-8"
      style={
        {
          color: "inherit",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderColor: "var(--domain-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
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

      <div
        aria-hidden="true"
        className="domain-card__topline duration-400 absolute left-0 right-0 top-0 h-[3px] transition-opacity"
        style={{
          background: domain.gradient,
          opacity: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="domain-card__glow w-50 h-50 duration-400 pointer-events-none absolute -right-20 -top-20 rounded-full transition-opacity"
        style={{
          background: `radial-gradient(circle, ${domain.glowColor}12 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />

      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px]"
          style={{
            background: domain.bgAccent,
            border: `1px solid ${domain.borderAccent}`,
          }}
        >
          {domain.icon}
        </div>
        <div>
          <h2 className="m-0 text-[1.35rem] font-bold leading-tight text-[#e8e8f0]">
            {domain.title}
          </h2>
          <p
            className="mb-0 mt-0.5 text-[0.7rem] font-medium"
            style={{ color: domain.glowColor, letterSpacing: "0.06em" }}
          >
            {domain.titleEn}
          </p>
        </div>
      </div>

      <p className="m-0 flex-1 text-[0.88rem] leading-relaxed text-[#9ca3af]">
        {domain.description}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-[0.7rem] font-medium"
          style={{
            color: domain.glowColor,
            background: domain.bgAccent,
            border: `1px solid ${domain.borderAccent}`,
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
