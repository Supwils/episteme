"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type { GraphNode } from "../data/types";
import type { SpatialDomainSummary } from "../lib/spatial-aggregation";
import { DOMAIN_COLORS } from "../lib/constants";
import { DOMAIN_META } from "./detail-panel/constants";

type SpatialClusterSummaryProps = {
  summary: SpatialDomainSummary;
  selectedLevel: KnowledgeLevel | null;
  onLevelSelect: (level: KnowledgeLevel | null) => void;
  onNodeFocus: (nodeId: string) => void;
  isMobile: boolean;
};

function ArticleIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M5 3h7v7M11.5 3.5L4 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 9.5V13H3V5h3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpatialClusterSummary({
  summary,
  selectedLevel,
  onLevelSelect,
  onNodeFocus,
  isMobile,
}: SpatialClusterSummaryProps) {
  const [expanded, setExpanded] = useState(!isMobile);
  const domainMeta = DOMAIN_META[summary.domainId];
  const selectedStage = selectedLevel
    ? summary.stages.find((stage) => stage.level === selectedLevel)
    : null;
  const anchors = selectedStage?.anchorNodes ?? summary.anchorNodes;

  useEffect(() => {
    if (!isMobile) setExpanded(true);
  }, [isMobile]);

  return (
    <section
      data-testid="spatial-cluster-summary"
      data-domain={summary.domainId}
      className={clsx(
        "border-border-faint bg-bg-overlay absolute top-14 left-2 z-[55] flex max-h-[calc(100%-4rem)] flex-col overflow-hidden border shadow-[0_16px_36px_rgba(0,0,0,0.3)] backdrop-blur-xl",
        isMobile ? "w-[min(22rem,calc(100%-1rem))]" : "w-[22rem]"
      )}
      aria-label={`${domainMeta.label}空间阶段摘要`}
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex min-h-10 w-full items-center gap-2 px-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
        aria-expanded={expanded}
        aria-controls="spatial-cluster-summary-content"
      >
        <span
          className="h-5 w-1 shrink-0"
          style={{ backgroundColor: DOMAIN_COLORS[summary.domainId] }}
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="text-fg-secondary block truncate text-[11px] font-medium">
            {domainMeta.label}
          </span>
          <span className="text-fg-muted block text-[9px]">
            {summary.nodeCount} 个节点 · {summary.articleCount} 篇可读内容 ·{" "}
            {summary.crossDomainEdgeCount} 条跨学科关系
          </span>
        </span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={clsx("text-fg-muted h-3.5 w-3.5 shrink-0", expanded && "rotate-180")}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded ? (
        <div
          id="spatial-cluster-summary-content"
          className="border-border-faint min-h-0 flex-1 overflow-y-auto border-t px-3 pt-2.5 pb-3"
        >
          <div
            className="border-border-faint grid grid-cols-5 border"
            role="group"
            aria-label="空间阶段聚焦"
          >
            {summary.stages.map((stage) => {
              const selected = selectedLevel === stage.level;
              return (
                <button
                  key={stage.level}
                  type="button"
                  onClick={() => onLevelSelect(selected ? null : stage.level)}
                  disabled={stage.nodeCount === 0}
                  className={clsx(
                    "border-border-faint min-w-0 border-r px-1 py-1.5 text-center last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400",
                    selected
                      ? "text-fg-primary bg-[var(--hover-bg)]"
                      : "text-fg-muted hover:text-fg-primary hover:bg-[var(--input-bg)]",
                    stage.nodeCount === 0 && "cursor-not-allowed opacity-30"
                  )}
                  aria-pressed={selected}
                  aria-label={`聚焦 L${stage.level} ${stage.label}，${stage.nodeCount} 个节点`}
                  title={`${stage.label}：${stage.description}`}
                >
                  <span className="block text-[10px] font-medium">L{stage.level}</span>
                  <span className="block text-[9px] opacity-70">{stage.nodeCount}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-fg-secondary text-[11px] font-medium">
                  {selectedStage
                    ? `L${selectedStage.level} · ${selectedStage.label}`
                    : "五阶段学科全景"}
                </p>
                <p className="text-fg-disabled mt-0.5 text-[10px] leading-snug">
                  {selectedStage
                    ? selectedStage.description
                    : "选择一个阶段，高亮当前学科的对应知识簇，并从关键节点进入文章。"}
                </p>
              </div>
              {selectedStage ? (
                <span className="text-fg-muted shrink-0 text-right text-[9px] leading-snug">
                  {selectedStage.articleCount} 篇内容
                  <br />
                  {selectedStage.crossDomainEdgeCount} 条跨域关系
                </span>
              ) : null}
            </div>

            <div className="border-border-faint mt-2 border-t pt-1.5">
              {anchors.length > 0 ? (
                anchors.map((node) => (
                  <div
                    key={node.id}
                    className="border-border-faint grid min-h-8 grid-cols-[minmax(0,1fr)_2rem] items-center border-b last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => onNodeFocus(node.id)}
                      className="text-fg-primary/58 hover:text-fg-primary min-w-0 py-1.5 pr-2 text-left text-[10.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
                    >
                      <span className="block truncate">{node.label}</span>
                      <span className="text-fg-disabled block text-[9px]">
                        L{node.knowledgeLevel ?? 2}
                      </span>
                    </button>
                    {node.url ? (
                      <a
                        href={node.url}
                        className="text-fg-muted hover:text-fg-primary flex h-8 w-8 items-center justify-center hover:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
                        aria-label={`阅读${node.label}`}
                        title={`阅读${node.label}`}
                      >
                        <ArticleIcon />
                      </a>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-fg-muted py-2 text-[10px]">该阶段暂无可显示节点。</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
