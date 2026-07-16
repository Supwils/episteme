"use client";

import type { GraphNode } from "../../data/types";
import { getCuratedPathForNode, type CuratedLearningPath } from "../../data/curated-learning-paths";
import { Reveal } from "./Reveal";

type LearningPathTraceProps = {
  selectedNodeId: string;
  nodes: GraphNode[];
  curatedPath?: CuratedLearningPath;
  onNodeClick: (nodeId: string) => void;
};

export function LearningPathTrace({
  selectedNodeId,
  nodes,
  curatedPath: requestedCuratedPath,
  onNodeClick,
}: LearningPathTraceProps) {
  if (nodes.length === 0 || (nodes.length < 2 && !requestedCuratedPath)) return null;

  const curatedPath = requestedCuratedPath ?? getCuratedPathForNode(selectedNodeId);
  const stepMap = new Map(curatedPath?.steps.map((step) => [step.nodeId, step]));

  return (
    <Reveal>
      <section
        aria-labelledby="learning-path-heading"
        className="border-y border-white/[0.07] py-4"
      >
        <div className="mb-3">
          <p className="font-mono text-[10px] tracking-[0.16em] text-amber-300/70 uppercase">
            知识来路 · {nodes.length} 步
          </p>
          <h3 id="learning-path-heading" className="mt-1 text-sm font-semibold text-white/85">
            {curatedPath?.title ?? "逐级前置路径"}
          </h3>
          {curatedPath ? (
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
              {curatedPath.question}
            </p>
          ) : null}
        </div>

        <ol className="space-y-1" aria-label="从基础到当前节点的前置步骤">
          {nodes.map((node, index) => {
            const step = stepMap.get(node.id);
            const isCurrent = node.id === selectedNodeId;
            return (
              <li key={node.id} className="relative flex gap-3 pb-2 last:pb-0">
                {index < nodes.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-6 bottom-0 left-[13px] w-px bg-amber-300/15"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => onNodeClick(node.id)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${
                    isCurrent
                      ? "border-amber-300/60 bg-amber-300/15 text-amber-200"
                      : "border-white/10 bg-[#111118] text-white/45 hover:border-white/25 hover:text-white/75"
                  }`}
                  aria-label={`L${node.knowledgeLevel ?? index + 1} ${node.label}`}
                >
                  L{node.knowledgeLevel ?? index + 1}
                </button>
                <div className="min-w-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onNodeClick(node.id)}
                    className={`text-left text-[12px] font-medium transition-colors ${
                      isCurrent ? "text-amber-100" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {node.label}
                  </button>
                  {step ? (
                    <p className="mt-0.5 text-[11px] leading-relaxed text-white/35">
                      {step.transition}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </Reveal>
  );
}
