"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui";
import type { GraphNode, GraphEdge } from "@/subjects/knowledge-graph/data/types";

const KnowledgeGraph = dynamic(
  () =>
    import("@/subjects/knowledge-graph/components/KnowledgeGraph").then((m) => m.KnowledgeGraph),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-screen w-full items-center justify-center bg-[#08080f]"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
      </div>
    ),
  }
);

type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

// The dataset is fetched from the force-static /knowledge-graph/graph-data
// route so the ~680KB graph never enters the page RSC payload or JS bundle.
export function KnowledgeGraphClient() {
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/knowledge-graph/graph-data")
      .then((r) => r.json())
      .then((d: GraphData) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setData({ nodes: [], edges: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center bg-[#08080f]"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
      </div>
    );
  }

  return (
    <div className="knowledge-graph-page">
      <KnowledgeGraph nodes={data.nodes} edges={data.edges} />
    </div>
  );
}
