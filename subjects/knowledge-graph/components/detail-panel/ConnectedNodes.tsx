"use client";

import { clsx } from "clsx";
import type { GraphNode, GraphEdge } from "../../data/types";
import { DOMAIN_META, groupByDomain, buildEdgeMap } from "./constants";
import { Reveal } from "./Reveal";

type ConnectedNodesProps = {
  nodeId: string;
  nodeDomain: GraphNode["domain"];
  nodes: GraphNode[];
  edges: GraphEdge[];
  prerequisiteIds: string[];
  onNodeClick: (nodeId: string) => void;
};

export function ConnectedNodes({
  nodeId,
  nodeDomain,
  nodes,
  edges,
  prerequisiteIds,
  onNodeClick,
}: ConnectedNodesProps) {
  if (nodes.length === 0) return null;

  const grouped = groupByDomain(nodes);
  const edgeMap = buildEdgeMap(edges);
  const prerequisiteIdSet = new Set(prerequisiteIds);
  const crossDomainCount = nodes.filter((node) => node.domain !== nodeDomain).length;

  function findEdge(connectedId: string): GraphEdge | undefined {
    return edgeMap.get(`${nodeId}->${connectedId}`) ?? edgeMap.get(`${connectedId}->${nodeId}`);
  }

  return (
    <Reveal>
      <div className="border-border-faint border-t pt-5">
        <h3 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
          前置与关联节点
          {crossDomainCount > 0 && (
            <span className="text-accent-gold"> · {crossDomainCount} 条跨域</span>
          )}
        </h3>
        <div className="flex flex-col gap-4">
          {Array.from(grouped.entries()).map(([domain, domainNodes]) => {
            const groupMeta = DOMAIN_META[domain]!;
            return (
              <div key={domain} className="flex flex-col gap-1.5">
                <span
                  className={clsx(
                    "font-mono text-[9px] font-medium tracking-[0.2em] uppercase",
                    groupMeta.color
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
                        className="group hover:border-border-subtle flex items-start gap-3 rounded-lg border border-transparent bg-[var(--input-bg)] px-3 py-2.5 text-left transition-all duration-200 hover:bg-[var(--hover-bg)]"
                      >
                        <span
                          aria-hidden
                          className={clsx("mt-1.5 h-2 w-2 shrink-0 rounded-full", groupMeta.dot)}
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-fg-secondary group-hover:text-fg-primary block truncate text-[13px] font-medium transition-colors duration-200">
                            {connected.label}
                          </span>
                          {prerequisiteIdSet.has(connected.id) ? (
                            <span className="text-fg-muted mt-0.5 block font-mono text-[9px] tracking-[0.14em] uppercase">
                              前置知识
                            </span>
                          ) : null}
                          {connected.domain !== nodeDomain ? (
                            <span className="text-fg-muted mt-0.5 block font-mono text-[9px] tracking-[0.14em] uppercase">
                              跨域
                            </span>
                          ) : null}
                          {edge?.label ? (
                            <span className="text-fg-muted mt-0.5 block text-[11px] leading-relaxed">
                              {edge.label}
                            </span>
                          ) : null}
                        </div>
                        <span
                          aria-hidden
                          className="text-fg-disabled mt-1 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
