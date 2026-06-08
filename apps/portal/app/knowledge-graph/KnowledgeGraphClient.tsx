'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@universe/ui';
import type { GraphNode, GraphEdge } from '@/src-knowledge-graph/data/types';

const KnowledgeGraph = dynamic(
  () =>
    import('@/src-knowledge-graph/components/KnowledgeGraph').then(
      (m) => m.KnowledgeGraph,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#08080f]" role="status" aria-live="polite">
        <LoadingSpinner size="md" color="indigo" label="正在加载知识图谱…" />
      </div>
    ),
  },
);

type KnowledgeGraphClientProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function KnowledgeGraphClient({ nodes, edges }: KnowledgeGraphClientProps) {
  return (
    <div className="knowledge-graph-page">
      <KnowledgeGraph nodes={nodes} edges={edges} />
    </div>
  );
}
