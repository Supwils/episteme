import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

/** Graph node ids predate three route ids; everything else matches. */
const GRAPH_DOMAIN: Record<string, string> = {
  "life-science": "lifescience",
  "human-history": "history",
  "universe-physics": "physics",
};

export function graphDomainId(routeDomain: string): string {
  return GRAPH_DOMAIN[routeDomain] ?? routeDomain;
}

export type SpineStep = {
  id: string;
  level: KnowledgeLevel;
  label: string;
  url: string;
  /** One line on why this step follows the previous one. */
  transition: string;
};

export type DomainSpine = { question: string; steps: SpineStep[] };

const NODE_BY_ID = new Map(ALL_NODES.map((node) => [node.id, node]));

/**
 * The domain's curated L1→L5 learning spine (the first one, where a domain has
 * several). Its question doubles as the landing's guiding question. Server-only:
 * the graph data never ships to the client.
 */
export function domainSpine(routeDomain: string): DomainSpine | null {
  const prefix = `${graphDomainId(routeDomain)}:`;
  const path = CURATED_LEARNING_PATHS.find(
    (candidate) =>
      candidate.scope === "domain-spine" && candidate.steps[0]?.nodeId.startsWith(prefix)
  );
  if (!path) return null;
  const steps = path.steps.flatMap((step) => {
    const node = NODE_BY_ID.get(step.nodeId);
    if (!node?.url) return [];
    return [
      {
        id: node.id,
        level: step.level,
        label: node.label,
        url: node.url,
        transition: step.transition,
      },
    ];
  });
  return { question: path.question, steps };
}
