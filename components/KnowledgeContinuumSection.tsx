"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ContinuumStepButton,
  KnowledgeContinuumMap,
} from "./knowledge-continuum/KnowledgeContinuumMap";
import {
  KNOWLEDGE_BRIDGES,
  KNOWLEDGE_DOMAINS,
  KNOWLEDGE_STAGES,
  KNOWLEDGE_THREADS,
  getKnowledgeContinuumNode,
  type KnowledgeStageId,
} from "@/lib/knowledge-continuum";
import { buildContinuumGraphHref } from "@/lib/knowledge-continuum-graph";
import { KnowledgeContinuumDeferred } from "./knowledge-continuum/KnowledgeContinuumDeferred";

const DEFAULT_NODE_ID = "universe-matter-1";

export function KnowledgeContinuumSection() {
  const [selectedNodeId, setSelectedNodeId] = useState(DEFAULT_NODE_ID);
  const selectedNode = getKnowledgeContinuumNode(selectedNodeId)!;
  const selectedThread = KNOWLEDGE_THREADS.find((thread) =>
    thread.nodes.some((node) => node.id === selectedNodeId)
  )!;
  const selectedIndex = selectedThread.nodes.findIndex((node) => node.id === selectedNodeId);
  const activeStage = selectedNode.stage;
  const stage = KNOWLEDGE_STAGES.find((item) => item.id === activeStage)!;
  const previousNode = selectedThread.nodes[selectedIndex - 1];
  const nextNode = selectedThread.nodes[selectedIndex + 1];
  const bridgeNodes = KNOWLEDGE_BRIDGES.flatMap(([from, to]) => {
    if (from === selectedNodeId) return getKnowledgeContinuumNode(to) ?? [];
    if (to === selectedNodeId) return getKnowledgeContinuumNode(from) ?? [];
    return [];
  });

  function selectStage(stageId: KnowledgeStageId) {
    const node = selectedThread.nodes.find((item) => item.stage === stageId);
    if (node) setSelectedNodeId(node.id);
  }

  return (
    <section className="w-full px-6 py-16 sm:px-10 lg:px-16" aria-labelledby="continuum-title">
      <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
        <div>
          <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.34em] uppercase">
            knowledge continuum
          </p>
          <h2 id="continuum-title" className="font-display text-fg-primary text-2xl font-semibold">
            从儿童好奇到研究前沿
          </h2>
        </div>
        <p className="text-fg-secondary max-w-3xl text-sm leading-relaxed">
          六个贯穿一生的问题把 15
          个学科组织为连续的认知结构：先观察，再掌握概念，继而解释系统、检验证据，最终进入需要多学科共同回答的开放问题。
        </p>
      </div>

      <div className="border-border-faint bg-bg-near border">
        <div className="border-border-faint border-b px-4 py-4 sm:px-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
              15 学科 · 5 阶段 · 6 条问题主线
            </p>
            <Link
              href={`/knowledge-graph?level=${activeStage}&source=continuum`}
              className="text-fg-secondary hover:text-fg-primary focus-visible:text-fg-primary text-xs transition-colors"
            >
              展开“{stage.label}”全部图谱节点 →
            </Link>
          </div>

          <div
            className="border-border-faint grid grid-cols-2 border sm:grid-cols-5"
            aria-label="认知阶段"
          >
            {KNOWLEDGE_STAGES.map((item) => {
              const active = item.id === activeStage;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectStage(item.id)}
                  style={active ? { color: "var(--color-bg-base)" } : undefined}
                  className={`border-border-faint min-h-14 border-r border-b px-3 py-2 text-left transition-colors last:border-r-0 sm:border-b-0 ${
                    active
                      ? "bg-fg-primary"
                      : "text-fg-secondary hover:bg-bg-panel hover:text-fg-primary"
                  }`}
                >
                  <span className="block font-mono text-[9px]">0{item.id}</span>
                  <span className="mt-0.5 block text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-start gap-3">
            <span className="text-fg-primary shrink-0 text-sm font-medium">{stage.shortLabel}</span>
            <p className="text-fg-muted text-xs leading-relaxed">{stage.description}</p>
          </div>
        </div>

        <KnowledgeContinuumMap
          activeStage={activeStage}
          selectedNodeId={selectedNodeId}
          onSelect={setSelectedNodeId}
        />

        <div className="border-border-faint grid gap-6 border-t px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)]">
          <div aria-live="polite">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="h-2.5 w-2.5"
                style={{ backgroundColor: selectedThread.color }}
                aria-hidden="true"
              />
              <span className="text-fg-muted text-xs">{selectedThread.label}</span>
              <span className="text-fg-disabled text-xs">/</span>
              <span className="text-fg-muted text-xs">阶段 {selectedNode.stage}</span>
            </div>
            <h3 className="font-display text-fg-primary text-xl font-semibold">
              {selectedNode.question}
            </h3>
            <p className="text-fg-secondary mt-3 max-w-3xl text-sm leading-relaxed">
              {selectedNode.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="相关学科">
              {selectedNode.domains.map((domainId) => {
                const domain = KNOWLEDGE_DOMAINS[domainId];
                return (
                  <Link
                    key={domainId}
                    href={domain.href}
                    className="border-border-faint text-fg-secondary hover:border-fg-muted hover:text-fg-primary border px-2.5 py-1 text-xs transition-colors"
                  >
                    {domain.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={selectedNode.href}
                className="text-fg-primary inline-flex min-h-10 items-center border-b border-current text-sm font-medium"
              >
                打开“{selectedNode.title}”知识节点 →
              </Link>
              <Link
                href={buildContinuumGraphHref(selectedNode)}
                className="text-fg-secondary hover:text-fg-primary inline-flex min-h-10 items-center border-b border-current text-sm transition-colors"
              >
                在图谱中查看前置来路 →
              </Link>
            </div>
          </div>

          <div className="border-border-faint border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <p className="text-fg-muted font-mono text-[9px] tracking-[0.18em] uppercase">
              前置与延伸
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ContinuumStepButton
                label="上一阶段"
                node={previousNode}
                onSelect={setSelectedNodeId}
                direction="←"
              />
              <ContinuumStepButton
                label="下一阶段"
                node={nextNode}
                onSelect={setSelectedNodeId}
                direction="→"
              />
            </div>

            <p className="text-fg-muted mt-5 font-mono text-[9px] tracking-[0.18em] uppercase">
              跨学科桥
            </p>
            <div className="mt-2 flex flex-col gap-1">
              {bridgeNodes.length > 0 ? (
                bridgeNodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className="text-fg-secondary hover:text-fg-primary min-h-9 text-left text-xs transition-colors"
                  >
                    ↗ {node.title}
                  </button>
                ))
              ) : (
                <p className="text-fg-disabled text-xs leading-relaxed">
                  沿当前主线前进后，将出现与其他学科共享的方法和问题。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <KnowledgeContinuumDeferred />

      <p className="text-fg-disabled mt-4 text-xs leading-relaxed">
        阶段表示知识结构的递进，不是年龄、学历或能力标签；任何人都可以从任一问题进入，再沿前置关系补齐概念。
      </p>
    </section>
  );
}
