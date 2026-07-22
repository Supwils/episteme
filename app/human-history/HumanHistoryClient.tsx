"use client";

import { lazy, Suspense, useState } from "react";
import { serializeJsonLd } from "@/lib/jsonld";
import PageWrapper from "@/subjects/history/components/PageWrapper";
import { SITE_URL } from "@/lib/constants";

const EventTimeline = lazy(
  () => import("@/subjects/history/components/visualizations/EventTimeline")
);

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Human History",
  url: `${SITE_URL}/human-history`,
  description:
    "Human history knowledge graph — timeline, atlas, figures, and SVG maps from ancient times to the modern era",
  isPartOf: {
    "@type": "WebSite",
    name: "Episteme · 格致",
    url: SITE_URL,
  },
};

const renderHome = async () => {
  const { renderHome: render, cleanupHome } =
    await import("@/subjects/history/page-renderers/home");
  render();
  return cleanupHome;
};

export default function HumanHistoryClient() {
  const [timelineVisible, setTimelineVisible] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <PageWrapper render={renderHome} />
      <section style={{ padding: "48px 0", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: "rgba(200,169,81,0.6)",
                marginBottom: 8,
              }}
            >
              INTERACTIVE TIMELINE
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
              关键事件时间线
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              从金字塔到登月——改变人类命运的关键时刻
            </p>
          </div>
          {!timelineVisible && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "22px 0 8px",
              }}
            >
              <button
                type="button"
                aria-expanded="false"
                aria-controls="history-interactive-timeline"
                onClick={() => setTimelineVisible(true)}
                style={{
                  minHeight: 44,
                  padding: "0 18px",
                  border: "1px solid rgba(200,169,81,0.55)",
                  borderRadius: 4,
                  background: "rgba(200,169,81,0.12)",
                  color: "#e6cf84",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                展开交互时间线
              </button>
              <a
                href="/human-history/timeline"
                style={{
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 18px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                进入完整时间线 →
              </a>
            </div>
          )}
          <div id="history-interactive-timeline">
            {timelineVisible && (
              <Suspense
                fallback={
                  <div
                    role="status"
                    style={{
                      minHeight: 180,
                      display: "grid",
                      placeItems: "center",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                    }}
                  >
                    正在准备交互时间线…
                  </div>
                }
              >
                <EventTimeline />
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
