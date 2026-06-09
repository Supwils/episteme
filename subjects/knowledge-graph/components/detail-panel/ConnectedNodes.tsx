"use client";

import { clsx } from "clsx";
import type { GraphNode, GraphEdge } from "../../data/types";
import {
  DOMAIN_META,
  groupByDomain,
  buildEdgeMap,
} from "./constants";
import { Reveal } from "./Reveal";

type ConnectedNodesProps = {
  nodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick: (nodeId: string) => void;
};

export function ConnectedNodes({
  nodeId,
  nodes,
  edges,
  onNodeClick,
}: ConnectedNodesProps) {
  if (nodes.length === 0) return null;

  const grouped = groupByDomain(nodes);
  const edgeMap = buildEdgeMap(edges);

  function findEdge(connectedId: string): GraphEdge | undefined {
    return (
      edgeMap.get(`${nodeId}->${connectedId}`) ??
      edgeMap.get(`${connectedId}->${nodeId}`)
    );
  }

  return (
    <Reveal>
      <div className="border-t border-white/[0.06] pt-5">
        <h3 className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/45">
          关联节点
        </h3>
        <div className="flex flex-col gap-4">
          {Array.from(grouped.entries()).map(([domain, domainNodes]) => {
            const groupMeta = DOMAIN_META[domain]!;
            return (
              <div key={domain} className="flex flex-col gap-1.5">
                <span
                  className={clsx(
                    "font-mono text-[9px] font-medium tracking-[0.2em] uppercase",
                    groupMeta.color,
                  )}
                >
                  {groupMeta.label}
                </span>
                <div className="flex flex-col gap-1">
                  {domainNodes.map((connected) => {
                    const edge = findEdge(connected.id);
                    return (
                      <button
                        key={connected.id}
                        type="button"
                        onClick={() => onNodeClick(connected.id)}
                        className="group flex items-start gap-3 rounded-lg border border-transparent bg-white/[0.02] px-3 py-2.5 text-left transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.05]"
                      >
                        <span
                          aria-hidden
                          className={clsx(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            groupMeta.dot,
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium text-white/80 transition-colors duration-200 group-hover:text-white/95">
                            {connected.label}
                          </span>
                          {edge?.label ? (
                            <span className="mt-0.5 block text-[11px] leading-relaxed text-white/45">
                              {edge.label}
                            </span>
                          ) : null}
                        </div>
                        <span
                          aria-hidden
                          className="mt-1 shrink-0 text-white/15 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M6 4l4 4-4 4" />
                          </svg>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
