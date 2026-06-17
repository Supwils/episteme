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
      className="domain-card animate-fade-slide-up group text-fg-primary relative flex cursor-pointer flex-col gap-3.5 rounded-[var(--card-radius,12px)] border border-[var(--color-border-faint)] bg-[var(--color-bg-near)] p-6 no-underline shadow-[var(--card-shadow,none)] sm:p-7"
      style={
        {
          animationDelay: `${0.15 + index * 0.12}s`,
          "--domain-color": domain.glowColor,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.16em] uppercase">
          DOMAIN {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-[9px] w-[9px] rounded-full"
          style={{ background: domain.glowColor }}
        />
      </div>

      <div>
        <h2 className="font-display text-fg-primary m-0 text-[1.4rem] leading-tight font-semibold">
          {domain.title}
        </h2>
        <p
          className="text-fg-muted mt-1 mb-0 font-mono text-[0.66rem] uppercase"
          style={{ letterSpacing: "0.12em" }}
        >
          {domain.titleEn}
        </p>
      </div>

      <p className="text-fg-secondary m-0 flex-1 text-[0.88rem] leading-relaxed">
        {domain.description}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-fg-muted font-mono text-[0.68rem] tracking-[0.04em]">
          {domain.stats}
        </span>
        <span
          className="domain-card__cta inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-medium tracking-[0.04em]"
          style={{ color: domain.glowColor }}
        >
          进入探索
          <span
            aria-hidden="true"
            className="domain-card__arrow inline-block transition-transform duration-300"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
