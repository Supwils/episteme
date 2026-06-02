'use client';

import Link from 'next/link';
import { APP_URLS } from '../lib/urls';

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
      aria-label={`${domain.title} — ${domain.description}`}
      className="group relative flex flex-col gap-4 p-8 rounded-2xl no-underline overflow-hidden cursor-pointer backdrop-blur-xl animate-fade-slide-up domain-card"
      style={{
        color: 'inherit',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        animationDelay: `${0.15 + index * 0.12}s`,
        ['--card-glow' as string]: domain.glowColor,
        ['--card-border' as string]: domain.borderAccent,
        ['--card-bg' as string]: domain.bgAccent,
        ['--card-gradient' as string]: domain.gradient,
      }}
    >
      <style>{`
        .domain-card:hover,
        .domain-card:focus-visible {
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--card-border) !important;
          box-shadow: 0 20px 60px color-mix(in srgb, var(--card-glow) 9%, transparent),
                      0 0 0 1px color-mix(in srgb, var(--card-glow) 8%, transparent),
                      inset 0 1px 0 rgba(255,255,255,0.05) !important;
          transform: translateY(-6px) !important;
        }
        .domain-card:focus-visible {
          outline: 2px solid var(--card-glow);
          outline-offset: 2px;
        }
        .domain-card:hover .domain-card__topline,
        .domain-card:focus-visible .domain-card__topline {
          opacity: 1;
        }
        .domain-card:hover .domain-card__glow,
        .domain-card:focus-visible .domain-card__glow {
          opacity: 1;
        }
        .domain-card:hover .domain-card__arrow,
        .domain-card:focus-visible .domain-card__arrow {
          transform: translateX(4px);
        }
        .domain-card:hover .domain-card__cta,
        .domain-card:focus-visible .domain-card__cta {
          gap: 0.65rem;
        }
      `}</style>

      <div
        aria-hidden="true"
        className="domain-card__topline absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-400"
        style={{
          background: domain.gradient,
          opacity: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="domain-card__glow absolute -top-20 -right-20 w-50 h-50 rounded-full pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle, ${domain.glowColor}12 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />

      <div className="flex items-center gap-3.5">
        <div
          className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
          style={{
            background: domain.bgAccent,
            border: `1px solid ${domain.borderAccent}`,
          }}
        >
          {domain.icon}
        </div>
        <div>
          <h2 className="text-[1.35rem] font-bold text-[#e8e8f0] m-0 leading-tight">
            {domain.title}
          </h2>
          <p
            className="text-[0.7rem] font-medium mt-0.5 mb-0"
            style={{ color: domain.glowColor, letterSpacing: '0.06em' }}
          >
            {domain.titleEn}
          </p>
        </div>
      </div>

      <p className="text-[0.88rem] text-[#9ca3af] leading-relaxed flex-1 m-0">
        {domain.description}
      </p>

      <div className="flex items-center justify-between mt-1">
        <span
          className="text-[0.7rem] font-medium px-3 py-1 rounded-full"
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
            gap: '0.35rem',
          }}
        >
          进入探索
          <span
            aria-hidden="true"
            className="domain-card__arrow inline-block transition-transform duration-300"
            style={{
              transform: 'translateX(0)',
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
