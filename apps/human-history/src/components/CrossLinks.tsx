"use client";

// @ts-check

import {
  CROSS_LINKS,
  type CrossLink,
  type DomainApp,
  getAppLabel,
  getLinkUrl,
} from "@universe/content";

type CrossLinksProps = {
  eventId: string;
};

function getRelatedLinks(eventId: string): CrossLink[] {
  return CROSS_LINKS.filter(
    (link) =>
      (link.sourceApp === "human-history" && link.sourceId === eventId) ||
      (link.targetApp === "human-history" && link.targetId === eventId)
  );
}

function resolveDisplayInfo(link: CrossLink, currentId: string) {
  const isSource = link.sourceApp === "human-history" && link.sourceId === currentId;
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

export default function CrossLinks({ eventId }: CrossLinksProps) {
  const links = getRelatedLinks(eventId);
  if (links.length === 0) return null;

  return (
    <div className="cross-links-section" style={{ marginTop: "16px" }}>
      <h4
        style={{
          fontFamily: "var(--serif)",
          fontSize: "0.85rem",
          color: "var(--gold)",
          fontWeight: 600,
          marginBottom: "10px",
          paddingBottom: "4px",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        跨领域连接
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {links.map((link) => {
          const info = resolveDisplayInfo(link, eventId);
          const url = getLinkUrl(link, "human-history");
          const appLabel = getAppLabel(info.app);

          return (
            <a
              key={`${info.app}-${info.id}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="cross-link-card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "8px 12px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                backgroundColor: "var(--bg-card)",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  backgroundColor:
                    info.app === "universe-physics"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "rgba(200, 164, 90, 0.15)",
                  color:
                    info.app === "universe-physics" ? "#818cf8" : "var(--gold)",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                {appLabel}
              </span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--parchment)",
                    marginBottom: "2px",
                  }}
                >
                  {info.title}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--parchment-dim)",
                  }}
                >
                  {info.relationship}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
