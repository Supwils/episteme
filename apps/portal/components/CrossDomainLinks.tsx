"use client";

import { clsx } from "clsx";
import {
  getLinksForEntity,
  type CrossLink,
  type DomainApp,
  getAppLabel,
  getLinkUrl,
} from "@universe/content";

type CrossDomainLinksProps = {
  currentApp: DomainApp;
  entityId: string;
};

const DOMAIN_ICON: Record<DomainApp, string> = {
  "universe-physics": "\u{1F52C}",
  "human-history": "\u{1F4DC}",
  philosophy: "\u{1F4AD}",
};

const APP_STYLES: Record<DomainApp, { badge: string; border: string; hoverText: string }> = {
  "universe-physics": {
    badge: "bg-indigo-500/15 text-indigo-400",
    border: "hover:border-indigo-500/30",
    hoverText: "group-hover/crosslink:text-indigo-400",
  },
  "human-history": {
    badge: "bg-red-500/15 text-red-400",
    border: "hover:border-red-400/30",
    hoverText: "group-hover/crosslink:text-red-400",
  },
  philosophy: {
    badge: "bg-amber-500/15 text-amber-400",
    border: "hover:border-amber-400/30",
    hoverText: "group-hover/crosslink:text-amber-400",
  },
};

function resolveTarget(link: CrossLink, currentApp: DomainApp) {
  const isSource = link.sourceApp === currentApp;
  return {
    app: (isSource ? link.targetApp : link.sourceApp) as DomainApp,
    id: isSource ? link.targetId : link.sourceId,
    title: isSource ? link.targetTitle : link.sourceTitle,
    relationship: link.relationship,
  };
}

export default function CrossDomainLinks({
  currentApp,
  entityId,
}: CrossDomainLinksProps) {
  const links = getLinksForEntity(currentApp, entityId);
  if (links.length === 0) return null;

  return (
    <section className="mt-8 border-t border-white/[0.06] pt-5">
      <h3 className="mb-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
        跨领域连接
      </h3>
      <div className="flex flex-col gap-2">
        {links.map((link) => {
          const target = resolveTarget(link, currentApp);
          const url = getLinkUrl(link, currentApp);
          const appLabel = getAppLabel(target.app);
          const icon = DOMAIN_ICON[target.app];
          const styles = APP_STYLES[target.app];

          return (
            <a
              key={`${target.app}-${target.id}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "group/crosslink flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-white/[0.05] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
                styles.border,
              )}
            >
              <span className="mt-0.5 shrink-0 text-sm leading-none" aria-hidden>
                {icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase",
                      styles.badge,
                    )}
                  >
                    {appLabel}
                  </span>
                  <span
                    className={clsx(
                      "truncate font-mono text-[12px] font-semibold tracking-wide text-white/90 transition-colors duration-200",
                      styles.hoverText,
                    )}
                  >
                    {target.title}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                  {target.relationship}
                </p>
              </div>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-white/20 opacity-0 transition-all duration-200 group-hover/crosslink:translate-x-0.5 group-hover/crosslink:-translate-y-0.5 group-hover/crosslink:opacity-100"
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
