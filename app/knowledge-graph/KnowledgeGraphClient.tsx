"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui";
import {
  applyGraphDescriptions,
  unpackGraphData,
  type PackedGraphDescriptions,
} from "@/subjects/knowledge-graph/lib/graph-wire";
import type { GraphNode, GraphEdge } from "@/subjects/knowledge-graph/data/types";

const KnowledgeGraph = dynamic(
  () =>
    import("@/subjects/knowledge-graph/components/KnowledgeGraph").then((m) => m.KnowledgeGraph),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-bg-deep flex h-screen w-full items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
      </div>
    ),
  }
);

type GraphData = ReturnType<typeof unpackGraphData>;

// The dataset is fetched from the force-static /knowledge-graph/graph-data
// route so the graph payload never enters the page RSC payload or JS bundle.
// Wire format v3 (subjects/knowledge-graph/lib/graph-wire.ts) packs edges and
// defers node descriptions to /knowledge-graph/graph-descriptions.
export function KnowledgeGraphClient() {
  const [data, setData] = useState<GraphData | null>(null);
  const [failed, setFailed] = useState(false);
  // Bumped once descriptions land so open tooltips/panels re-read the field.
  const [, setDescriptionsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/knowledge-graph/graph-data")
      .then((r) => {
        if (!r.ok) throw new Error(`graph-data ${r.status}`);
        return r.json();
      })
      .then((d: Parameters<typeof unpackGraphData>[0]) => {
        if (cancelled) return;
        setData(unpackGraphData(d));
      })
      .catch(() => {
        // An HTTP or parse failure must not masquerade as an empty graph.
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Descriptions only feed tooltips, the panel and search, so they are fetched
  // after the first layout draws — parsing them mid-layout delayed first paint.
  // A failure leaves them empty rather than failing the graph.
  const nodes = data?.nodes;
  const loadDescriptions = useCallback(() => {
    if (!nodes) return;
    fetch("/knowledge-graph/graph-descriptions")
      .then((r) => (r.ok ? (r.json() as Promise<PackedGraphDescriptions>) : null))
      .then((packed) => {
        if (packed && applyGraphDescriptions(nodes, packed)) setDescriptionsLoaded(true);
      })
      .catch(() => {});
  }, [nodes]);

  if (failed) {
    return (
      <div className="bg-bg-deep flex h-screen w-full items-center justify-center" role="alert">
        <p className="text-fg-secondary text-sm">
          知识图谱数据暂时无法加载。
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-accent-gold ml-2 underline underline-offset-4"
          >
            重试
          </button>
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="bg-bg-deep flex h-screen w-full items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
      </div>
    );
  }

  return (
    <div className="knowledge-graph-page">
      <KnowledgeGraph
        nodes={data.nodes}
        edges={data.edges}
        initialPositions={data.initialPositions}
        onReady={loadDescriptions}
      />
    </div>
  );
}
