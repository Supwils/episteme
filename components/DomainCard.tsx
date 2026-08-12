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
      className="domain-card"
      style={
        {
          animationDelay: `${0.15 + index * 0.12}s`,
          "--domain-color": domain.glowColor,
        } as React.CSSProperties
      }
    >
      <div className="domain-card__top">
        <span
          aria-hidden="true"
          className="domain-card__icon"
          style={{ background: domain.bgAccent }}
        >
          {domain.icon}
        </span>
        <div className="domain-card__counter">
          <span className="domain-card__counter-text">
            DOMAIN {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="domain-card__dot"
            style={{ background: domain.glowColor }}
          />
        </div>
      </div>

      <div className="domain-card__copy">
        <h2 className="domain-card__title">{domain.title}</h2>
        <p className="domain-card__subtitle" style={{ letterSpacing: "0.12em" }}>
          {domain.titleEn}
        </p>
      </div>

      <p className="domain-card__description">{domain.description}</p>

      <div className="domain-card__footer">
        <span className="domain-card__stats">{domain.stats}</span>
        <span
          className="domain-card__cta"
          style={{
            color: `color-mix(in oklab, ${domain.glowColor} 42%, var(--color-fg-primary))`,
          }}
        >
          进入探索
          <span aria-hidden="true" className="domain-card__arrow">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
