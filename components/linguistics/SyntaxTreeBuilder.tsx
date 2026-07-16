"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SYNTAX_EXAMPLES,
  visibleSyntaxNodes,
  type SyntaxMode,
  type SyntaxNode,
} from "@/subjects/linguistics/lib/syntax-tree-data";

const ACCENT = "#d28a38";
const STAGES = ["观察词序", "组成局部关系", "连接完整结构", "解释角色"] as const;

function TreeCanvas({
  nodes,
  edges,
  mode,
  stage,
  selectedId,
  onSelect,
}: {
  nodes: readonly SyntaxNode[];
  edges: readonly { source: string; target: string; label?: string }[];
  mode: SyntaxMode;
  stage: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const visibleStage = mode === "dependency" && stage > 0 ? Math.min(stage + 1, 2) : stage;
  const visible = visibleSyntaxNodes(nodes, visibleStage);
  const visibleIds = new Set(visible.map((node) => node.id));
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const visibleEdges = edges.filter(
    (edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target)
  );

  return (
    <div
      className="border-border-faint bg-bg-deep relative h-[330px] overflow-hidden border sm:h-[390px]"
      role="group"
      aria-label={`${mode === "constituency" ? "短语结构" : "依存关系"}树，第 ${stage + 1} 阶段`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <marker
            id="syntax-arrow"
            markerWidth="5"
            markerHeight="5"
            refX="4"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L5,2.5 L0,5 Z" fill={ACCENT} />
          </marker>
        </defs>
        {visibleEdges.map((edge) => {
          const source = nodeMap.get(edge.source)!;
          const target = nodeMap.get(edge.target)!;
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          return (
            <g key={`${edge.source}-${edge.target}`}>
              <line
                x1={source.x}
                y1={source.y + 4}
                x2={target.x}
                y2={target.y - 4}
                stroke={ACCENT}
                strokeOpacity="0.68"
                strokeWidth="0.65"
                vectorEffect="non-scaling-stroke"
                markerEnd={mode === "dependency" ? "url(#syntax-arrow)" : undefined}
              />
              {edge.label && stage >= 2 && (
                <text
                  x={midX}
                  y={midY - 1}
                  textAnchor="middle"
                  fill="var(--color-fg-muted)"
                  fontSize="3.1"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {visible.map((node) => {
        const selected = node.id === selectedId;
        return (
          <button
            key={node.id}
            type="button"
            onClick={() => onSelect(node.id)}
            aria-pressed={selected}
            aria-label={`${node.label}：${node.role}`}
            className="absolute flex min-h-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border px-2 py-1 text-center text-xs leading-4 transition-colors motion-reduce:transition-none sm:min-h-10 sm:px-3 sm:text-sm"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              maxWidth: "30%",
              borderColor: selected ? ACCENT : "var(--color-border-subtle)",
              color: selected ? ACCENT : "var(--color-fg-secondary)",
              background: selected
                ? `color-mix(in srgb, ${ACCENT} 13%, var(--color-bg-deep))`
                : "var(--color-bg-near)",
            }}
          >
            <span className="break-words">{node.label}</span>
          </button>
        );
      })}

      {stage === 0 && (
        <p className="text-fg-disabled absolute right-3 bottom-3 left-3 text-center text-xs">
          先比较线性次序；词的相邻关系还不是完整句法结构。
        </p>
      )}
    </div>
  );
}

export function SyntaxTreeBuilder() {
  const [exampleId, setExampleId] = useState(SYNTAX_EXAMPLES[0]!.id);
  const [analysisId, setAnalysisId] = useState(SYNTAX_EXAMPLES[0]!.analyses[0]!.id);
  const [mode, setMode] = useState<SyntaxMode>("constituency");
  const [stage, setStage] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const example =
    SYNTAX_EXAMPLES.find((candidate) => candidate.id === exampleId) ?? SYNTAX_EXAMPLES[0]!;
  const analysis =
    example.analyses.find((candidate) => candidate.id === analysisId) ?? example.analyses[0]!;
  const tree = analysis[mode];
  const selectedNode = useMemo(
    () => tree.nodes.find((node) => node.id === selectedId) ?? null,
    [selectedId, tree.nodes]
  );

  useEffect(() => {
    setAnalysisId(example.analyses[0]!.id);
    setStage(0);
    setSelectedId(null);
  }, [example.id, example.analyses]);

  const changeMode = (nextMode: SyntaxMode) => {
    setMode(nextMode);
    setSelectedId(null);
  };

  return (
    <section
      className="border-border-subtle bg-bg-near my-12 overflow-hidden border"
      aria-labelledby="syntax-builder-title"
      data-testid="syntax-tree-builder"
    >
      <header className="border-border-faint border-b px-4 py-5 sm:px-6">
        <p className="text-fg-disabled font-mono text-[10px] tracking-[0.2em] uppercase">
          Structure Lab · 2/2
        </p>
        <h2 id="syntax-builder-title" className="text-fg-primary mt-1 text-xl font-medium">
          多语言句法树构造器
        </h2>
        <p className="text-fg-muted mt-1 max-w-3xl text-sm leading-6">
          逐层把词组成关系，比较 SVO、SOV、VSO 与结构歧义。树图是可检验的分析，不是句子的唯一照片。
        </p>
      </header>

      <div className="border-border-faint border-b p-4 sm:p-6">
        <p className="text-fg-disabled mb-3 font-mono text-[10px] tracking-[0.18em] uppercase">
          选择语言与问题
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="例句">
          {SYNTAX_EXAMPLES.map((candidate) => {
            const selected = candidate.id === example.id;
            return (
              <button
                key={candidate.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setExampleId(candidate.id)}
                className="border-border-subtle min-h-14 border px-3 py-2 text-left transition-colors motion-reduce:transition-none"
                style={{
                  borderColor: selected ? ACCENT : undefined,
                  background: selected ? `${ACCENT}12` : "transparent",
                }}
              >
                <span
                  className="block text-sm"
                  style={{ color: selected ? ACCENT : "var(--color-fg-secondary)" }}
                >
                  {candidate.language}
                </span>
                <span className="text-fg-disabled mt-0.5 block font-mono text-[10px]">
                  {candidate.order}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)]">
        <div className="border-border-faint border-b p-4 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-fg-primary text-lg font-medium break-words">{example.sentence}</p>
              <p className="text-fg-muted mt-1 text-sm leading-6">{example.translation}</p>
            </div>
            <div
              className="flex shrink-0 border"
              style={{ borderColor: `${ACCENT}66` }}
              role="group"
              aria-label="分析方式"
            >
              {(["constituency", "dependency"] as const).map((value) => {
                const selected = mode === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => changeMode(value)}
                    className="min-w-20 px-3 py-2 font-mono text-[11px] transition-colors motion-reduce:transition-none"
                    style={{
                      color: selected ? ACCENT : "var(--color-fg-muted)",
                      background: selected ? `${ACCENT}12` : "transparent",
                    }}
                  >
                    {value === "constituency" ? "短语结构" : "依存关系"}
                  </button>
                );
              })}
            </div>
          </div>

          {example.analyses.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="歧义分析">
              {example.analyses.map((candidate) => {
                const selected = candidate.id === analysis.id;
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setAnalysisId(candidate.id);
                      setSelectedId(null);
                    }}
                    className="border px-3 py-1.5 font-mono text-[11px] transition-colors motion-reduce:transition-none"
                    style={{
                      borderColor: selected ? ACCENT : "var(--color-border-subtle)",
                      color: selected ? ACCENT : "var(--color-fg-muted)",
                    }}
                  >
                    {candidate.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5">
            <TreeCanvas
              nodes={tree.nodes}
              edges={tree.edges}
              mode={mode}
              stage={stage}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStage((value) => Math.max(0, value - 1))}
              disabled={stage === 0}
              aria-label="上一步"
              className="border-border-subtle text-fg-muted h-10 w-10 border text-lg disabled:opacity-35"
              title="上一步"
            >
              ←
            </button>
            <div className="min-w-0 flex-1 text-center" aria-live="polite">
              <div className="text-fg-disabled font-mono text-[10px] tracking-[0.15em] uppercase">
                阶段 {stage + 1} / {STAGES.length}
              </div>
              <div className="mt-1 text-sm" style={{ color: ACCENT }}>
                {STAGES[stage]}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStage((value) => Math.min(STAGES.length - 1, value + 1))}
              disabled={stage === STAGES.length - 1}
              aria-label="下一步"
              className="h-10 w-10 border text-lg disabled:opacity-35"
              style={{ borderColor: ACCENT, color: ACCENT }}
              title="下一步"
            >
              →
            </button>
          </div>
        </div>

        <aside className="p-4 sm:p-6" aria-label="句法分析说明">
          <p className="text-fg-disabled font-mono text-[10px] tracking-[0.18em] uppercase">
            当前解释
          </p>
          <p className="text-fg-secondary mt-2 text-sm leading-6">{analysis.interpretation}</p>

          <div className="border-border-faint mt-5 border-t pt-5">
            <p className="text-fg-disabled font-mono text-[10px] tracking-[0.18em] uppercase">
              证据提醒
            </p>
            <p className="text-fg-secondary mt-2 text-sm leading-6">{example.evidence}</p>
          </div>

          <div className="border-border-faint mt-5 min-h-36 border-t pt-5" aria-live="polite">
            <p className="text-fg-disabled font-mono text-[10px] tracking-[0.18em] uppercase">
              所选节点
            </p>
            {selectedNode ? (
              <div className="mt-2">
                <div className="font-medium" style={{ color: ACCENT }}>
                  {selectedNode.label}
                </div>
                <div className="text-fg-muted mt-1 font-mono text-[10px]">
                  {stage >= 3 ? selectedNode.role : "角色将在第 4 阶段显示"}
                </div>
                <p className="text-fg-secondary mt-2 text-sm leading-6">{selectedNode.detail}</p>
              </div>
            ) : (
              <p className="text-fg-muted mt-2 text-sm leading-6">
                选择树中的词或结构节点，查看它在当前分析中的作用。
              </p>
            )}
          </div>

          <p className="text-fg-disabled border-border-faint mt-5 border-t pt-4 text-xs leading-5">
            类型实例依据 WALS 语序章节；依存标签采用 Universal Dependencies
            的通用教学概念。类型是统计概括，不规定所有句子。
          </p>
        </aside>
      </div>
    </section>
  );
}
