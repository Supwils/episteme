"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildPersonalLearningPlan,
  type LearningPlanCatalog,
  type LearningPlanSelection,
} from "@/lib/knowledge-learning-plan";
import {
  buildKnowledgeTargetPlan,
  KNOWLEDGE_BRANCH_CONFIDENCE_META,
  selectKnowledgeTargetAnchor,
  type KnowledgeBranchTarget,
  type KnowledgeTargetFilter,
} from "@/lib/knowledge-branch";
import type { KnowledgeTerrainSnapshot } from "@/lib/knowledge-terrain";
import type { LearningTargetSelection } from "@/lib/learning-plan-progress";
import { LearningPlanRoute } from "./LearningPlanRoute";
import { KnowledgeTerrain } from "./KnowledgeTerrain";
import { AnchorCandidateComparison } from "./AnchorCandidateComparison";
import { LearningPlannerControls } from "./LearningPlannerControls";
import type { LearningRouteUrlState } from "@/lib/learning-route-url";
import { LearningRouteShareButton } from "./LearningRouteShareButton";
import { useLearningPlannerPersistence } from "./useLearningPlannerPersistence";

export function KnowledgeLearningPlanner({
  catalog,
  terrain,
  embedded = false,
}: {
  catalog: LearningPlanCatalog;
  terrain: KnowledgeTerrainSnapshot;
  embedded?: boolean;
}) {
  const defaultSelection: LearningPlanSelection = {
    goalId: catalog.goals[0]!.id,
    startLevel: 1,
    minutes: 45,
  };
  const [selection, setSelection] = useState(defaultSelection);
  const [mode, setMode] = useState<LearningTargetSelection["mode"]>("curated");
  const [branchTarget, setBranchTarget] = useState<KnowledgeBranchTarget | null>(null);
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);
  const [terrainFilter, setTerrainFilter] = useState<KnowledgeTargetFilter | null>(null);
  const [targetLoading, setTargetLoading] = useState(false);
  const [targetError, setTargetError] = useState<string | null>(null);
  const curatedPlan = useMemo(
    () => buildPersonalLearningPlan(catalog, selection),
    [catalog, selection]
  );
  const resolvedBranchTarget = useMemo(
    () =>
      branchTarget && activeAnchorId
        ? selectKnowledgeTargetAnchor(branchTarget, activeAnchorId)
        : branchTarget,
    [activeAnchorId, branchTarget]
  );
  const branchPlan = useMemo(
    () =>
      resolvedBranchTarget
        ? buildKnowledgeTargetPlan(catalog, resolvedBranchTarget, {
            startLevel: selection.startLevel,
            minutes: selection.minutes,
          })
        : null,
    [catalog, resolvedBranchTarget, selection.minutes, selection.startLevel]
  );

  const loadBranchTarget = useCallback(
    async (targetId: string, preferredAnchorId: string | null = null) => {
      const response = await fetch(`/api/learning-targets?id=${encodeURIComponent(targetId)}`);
      if (!response.ok) throw new Error("Unable to load knowledge target");
      const data = (await response.json()) as { target: KnowledgeBranchTarget };
      const preferredAnchorExists = data.target.anchorCandidates.some(
        (candidate) => candidate.anchorNodeId === preferredAnchorId
      );
      setBranchTarget(data.target);
      setActiveAnchorId(preferredAnchorExists ? preferredAnchorId : data.target.anchorNodeId);
    },
    []
  );

  const selectBranchTarget = useCallback(
    async (targetId: string) => {
      setTargetLoading(true);
      setTargetError(null);
      try {
        await loadBranchTarget(targetId);
      } catch {
        setTargetError("节点路线暂时无法生成，请尝试其他目标。");
      } finally {
        setTargetLoading(false);
      }
    },
    [loadBranchTarget]
  );

  useLearningPlannerPersistence({
    catalog,
    selection,
    setSelection,
    mode,
    setMode,
    branchTarget,
    activeAnchorId,
    terrainFilter,
    setTerrainFilter,
    setTargetLoading,
    setTargetError,
    loadBranchTarget,
  });

  const changeSelection = (partial: Partial<LearningPlanSelection>) => {
    setSelection((current) => ({ ...current, ...partial }));
  };
  const confidence = resolvedBranchTarget
    ? KNOWLEDGE_BRANCH_CONFIDENCE_META[resolvedBranchTarget.confidence]
    : null;
  const routeUrlState: LearningRouteUrlState = {
    mode,
    filter: terrainFilter,
    targetId: mode === "all-nodes" ? (branchTarget?.id ?? null) : null,
    anchorNodeId: mode === "all-nodes" ? activeAnchorId : null,
  };

  const selectTerrainRegion = (filter: KnowledgeTargetFilter) => {
    setTerrainFilter(filter);
    setMode("all-nodes");
    setBranchTarget(null);
    setActiveAnchorId(null);
    setTargetError(null);
  };

  return (
    <>
      <KnowledgeTerrain
        snapshot={terrain}
        selectedFilter={terrainFilter}
        onSelect={selectTerrainRegion}
        onClear={() => setTerrainFilter(null)}
      />
      <div
        className="border-border-faint bg-bg-near mt-8 border"
        data-testid={embedded ? undefined : "knowledge-learning-planner"}
        aria-labelledby="learning-planner-title"
      >
        <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              personal learning route
            </p>
            <h3
              id="learning-planner-title"
              className="font-display text-fg-primary mt-1 text-xl font-semibold"
            >
              把一个问题编排成可学习的路线
            </h3>
            <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
              {mode === "curated"
                ? "选择知识起点、目标问题和本次时间。人工前置链保持完整，时间预算只改变学习深度。"
                : "搜索任意图谱节点：先沿人工前置链抵达最近锚点，再进入明确标识的图谱关系旁支。"}
            </p>
          </div>
          <div className="text-fg-disabled text-[10px] leading-5 lg:text-right">
            {terrain.summary.nodeCount} 个图谱节点
            <br />
            {terrain.summary.anchorCount} 个人工策展锚点
            {mode === "all-nodes" && (terrainFilter || branchTarget) && (
              <div>
                <LearningRouteShareButton state={routeUrlState} />
              </div>
            )}
          </div>
        </div>

        <LearningPlannerControls
          catalog={catalog}
          selection={selection}
          mode={mode}
          selectedTarget={branchTarget}
          terrainFilter={terrainFilter}
          onModeChange={setMode}
          onSelectionChange={changeSelection}
          onClearFilter={() => setTerrainFilter(null)}
          onSelectTarget={selectBranchTarget}
        />

        {mode === "curated" ? (
          <LearningPlanRoute
            planId={curatedPlan.id}
            question={curatedPlan.question}
            summary={`从 L${curatedPlan.startLevel} 到 L5 · ${curatedPlan.steps.length} 步 · ${curatedPlan.domainCount} 门学科 · 共 ${curatedPlan.totalMinutes} 分钟${
              curatedPlan.assumedMasteredCount > 0
                ? `；前 ${curatedPlan.assumedMasteredCount} 个阶段按你的选择视为已掌握`
                : "；保留完整前置链"
            }`}
            steps={curatedPlan.steps}
          />
        ) : targetLoading ? (
          <p className="text-fg-muted px-4 py-10 text-sm sm:px-6">正在构建节点接入路线…</p>
        ) : targetError ? (
          <p role="alert" className="text-fg-secondary px-4 py-10 text-sm sm:px-6">
            {targetError}
          </p>
        ) : branchTarget && resolvedBranchTarget && branchPlan && confidence ? (
          <>
            <div className="border-border-faint grid gap-3 border-b px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="h-2.5 w-2.5"
                    style={{ backgroundColor: resolvedBranchTarget.domainColor }}
                    aria-hidden="true"
                  />
                  <h4 className="text-fg-primary text-sm font-medium">
                    {resolvedBranchTarget.label}
                  </h4>
                  <span className="border-border-faint text-fg-muted border px-2 py-0.5 text-[9px]">
                    {confidence.label}
                  </span>
                </div>
                <p className="text-fg-muted mt-2 max-w-3xl text-[11px] leading-5">
                  {confidence.description}
                </p>
              </div>
              <div className="text-fg-disabled text-[10px] leading-5 lg:text-right">
                当前锚点：{resolvedBranchTarget.anchorLabel}
                <br />
                {resolvedBranchTarget.distance} 跳关系 · 目标L{resolvedBranchTarget.level}
                {resolvedBranchTarget.levelSource === "inferred" ? "（推断）" : "（策展）"}
              </div>
            </div>
            <AnchorCandidateComparison
              target={branchTarget}
              activeAnchorId={resolvedBranchTarget.anchorNodeId}
              onSelect={setActiveAnchorId}
            />
            <LearningPlanRoute
              planId={branchPlan.id}
              question={branchPlan.question}
              summary={`从 L${branchPlan.effectiveStartLevel} 人工骨架出发 · ${branchPlan.steps.length} 步 · ${branchPlan.domainCount} 门学科 · 共 ${branchPlan.totalMinutes} 分钟${
                branchPlan.requestedStartLevel > branchPlan.effectiveStartLevel
                  ? `；锚点位于L${branchPlan.effectiveStartLevel}，已回到该阶段补足来路`
                  : ""
              }`}
              steps={branchPlan.steps}
            />
          </>
        ) : (
          <div className="px-4 py-10 sm:px-6">
            <p className="text-fg-primary text-sm">搜索一个节点，查看它怎样接入知识骨架。</p>
            <p className="text-fg-muted mt-2 text-xs leading-5">
              搜索支持概念、人物、事件、实验和方法；结果会显示最近锚点与关系可信度。
            </p>
          </div>
        )}
      </div>
    </>
  );
}
