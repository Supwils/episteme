"use client";

import { clsx } from "clsx";
import {
  CROSS_LINKS,
  type CrossLink,
  type DomainApp,
  getAppLabel,
  getLinkUrl,
} from "@universe/content";

type RelatedDomainsProps = {
  thinkerSlug: string;
};

const APP_STYLES: Record<DomainApp, { badge: string; border: string }> = {
  "universe-physics": {
    badge: "bg-indigo-500/15 text-indigo-400",
    border: "hover:border-indigo-500/30",
  },
  "human-history": {
    badge: "bg-red-500/15 text-red-400",
    border: "hover:border-red-400/30",
  },
  philosophy: {
    badge: "bg-accent-gold/15 text-accent-gold",
    border: "hover:border-accent-gold/30",
  },
};

function getRelatedLinks(slug: string): CrossLink[] {
  return CROSS_LINKS.filter(
    (link) =>
      (link.sourceApp === "philosophy" && link.sourceId === slug) ||
      (link.targetApp === "philosophy" && link.targetId === slug),
  );
}

function resolveDisplayInfo(link: CrossLink, currentSlug: string) {
  const isSource = link.sourceApp === "philosophy" && link.sourceId === currentSlug;
  if (isSource) {
    return {
      app: link.targetApp as DomainApp,
      id: link.targetId,
      title: link.targetTitle,
      relationship: link.relationship,
    };
  }
  return {
    app: link.sourceApp as DomainApp,
    id: link.sourceId,
    title: link.sourceTitle,
    relationship: link.relationship,
  };
}

export default function RelatedDomains({ thinkerSlug }: RelatedDomainsProps) {
  const links = getRelatedLinks(thinkerSlug);
  if (links.length === 0) return null;

  return (
    <section className="mt-10 border-t border-border-faint pt-6">
      <h2 className="mb-4 font-mono text-[11px] tracking-[0.32em] uppercase text-accent-gold">
        跨领域连接
      </h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => {
          const info = resolveDisplayInfo(link, thinkerSlug);
          const url = getLinkUrl(link, "philosophy");
          const appLabel = getAppLabel(info.app);
          const styles = APP_STYLES[info.app];

          return (
            <a
              key={`${info.app}-${info.id}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "group/domain flex items-start gap-3 border border-border-faint bg-bg-panel p-4 backdrop-blur-sm transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-bg-elevated hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
                styles.border,
              )}
            >
              <span
                className={clsx(
                  "mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase",
                  styles.badge,
                )}
              >
                {appLabel}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[13px] font-semibold tracking-wide text-fg-primary transition-colors group-hover/domain:text-accent-gold">
                  {info.title}
                </div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-fg-muted">
                  {info.relationship}
                </div>
              </div>
              {/* External link indicator */}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-fg-disabled opacity-0 transition-opacity duration-200 group-hover/domain:opacity-100"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                  <path d="M12 9v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
                  <path d="M8 2h6v6" />
                  <path d="M14 2L6.5 9.5" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
