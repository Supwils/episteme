import type { Metadata } from "next";
import { Suspense } from "react";
import { KnowledgeGraphClient } from "./KnowledgeGraphClient";
import { GraphIndex } from "./GraphIndex";
import { SITE_TOTALS } from "@/lib/site-stats";
import "./globals.css";

export const metadata: Metadata = {
  title: "知识图谱 — Episteme · 格致",
  description: `探索 ${SITE_TOTALS.graphNodes} 个知识节点之间的关联网络，跨越 ${SITE_TOTALS.domains} 个学科`,
};

export default function KnowledgeGraphPage() {
  return (
    <>
      {/* Start the graph payload with the HTML instead of after hydration: on a
          slow connection each round trip costs ~0.5 s, and this removes the
          HTML → JS → fetch chain from the first draw. Matches the client's
          same-origin fetch, so the browser reuses this response. */}
      <link rel="preload" href="/knowledge-graph/graph-data" as="fetch" crossOrigin="anonymous" />
      <Suspense
        fallback={
          <div
            className="bg-bg-deep text-fg-muted flex h-screen w-full items-center justify-center text-sm"
            role="status"
            aria-live="polite"
          >
            正在加载知识图谱…
          </div>
        }
      >
        <KnowledgeGraphClient />
      </Suspense>
      <GraphIndex />
    </>
  );
}
