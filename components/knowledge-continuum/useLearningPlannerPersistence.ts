"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { KNOWLEDGE_STAGES } from "@/lib/knowledge-continuum";
import {
  LEARNING_PLAN_DURATIONS,
  type LearningPlanCatalog,
  type LearningPlanSelection,
} from "@/lib/knowledge-learning-plan";
import type { KnowledgeBranchTarget, KnowledgeTargetFilter } from "@/lib/knowledge-branch";
import {
  loadLearningPlanSelection,
  loadLearningTargetSelection,
  saveLearningPlanSelection,
  saveLearningTargetSelection,
  type LearningTargetSelection,
} from "@/lib/learning-plan-progress";
import {
  buildLearningRouteUrl,
  hasLearningRouteUrlState,
  parseLearningRouteUrlState,
  type LearningRouteUrlState,
} from "@/lib/learning-route-url";

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export function useLearningPlannerPersistence({
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
}: {
  catalog: LearningPlanCatalog;
  selection: LearningPlanSelection;
  setSelection: StateSetter<LearningPlanSelection>;
  mode: LearningTargetSelection["mode"];
  setMode: StateSetter<LearningTargetSelection["mode"]>;
  branchTarget: KnowledgeBranchTarget | null;
  activeAnchorId: string | null;
  terrainFilter: KnowledgeTargetFilter | null;
  setTerrainFilter: StateSetter<KnowledgeTargetFilter | null>;
  setTargetLoading: StateSetter<boolean>;
  setTargetError: StateSetter<string | null>;
  loadBranchTarget: (targetId: string, preferredAnchorId?: string | null) => Promise<void>;
}): boolean {
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      const savedPlan = loadLearningPlanSelection();
      const validGoal = savedPlan && catalog.goals.some((goal) => goal.id === savedPlan.goalId);
      const validLevel =
        savedPlan && KNOWLEDGE_STAGES.some((stage) => stage.id === savedPlan.startLevel);
      const validMinutes =
        savedPlan &&
        LEARNING_PLAN_DURATIONS.some((duration) => duration.minutes === savedPlan.minutes);
      if (savedPlan && validGoal && validLevel && validMinutes && active) setSelection(savedPlan);

      const searchParams = new URLSearchParams(window.location.search);
      const hasUrlState = hasLearningRouteUrlState(searchParams);
      const urlState = parseLearningRouteUrlState(searchParams);
      const savedTarget = loadLearningTargetSelection();
      const restoredMode = hasUrlState ? urlState.mode : (savedTarget?.mode ?? "curated");
      const restoredTargetId = hasUrlState ? urlState.targetId : savedTarget?.targetId;
      const restoredAnchorId = hasUrlState ? urlState.anchorNodeId : savedTarget?.anchorNodeId;
      if (hasUrlState) setTerrainFilter(urlState.filter);
      if (restoredMode === "all-nodes" && active) setMode("all-nodes");

      if (restoredMode === "all-nodes" && restoredTargetId) {
        setTargetLoading(true);
        try {
          await loadBranchTarget(restoredTargetId, restoredAnchorId ?? null);
        } catch {
          if (hasUrlState && active) {
            setTargetError("分享链接中的知识节点已不可用，请重新选择目标。");
          } else if (active) {
            setMode("curated");
          }
        } finally {
          if (active) setTargetLoading(false);
        }
      }
      if (active) setRestored(true);
    };
    void restore();
    return () => {
      active = false;
    };
  }, [
    catalog.goals,
    loadBranchTarget,
    setMode,
    setSelection,
    setTargetError,
    setTargetLoading,
    setTerrainFilter,
  ]);

  useEffect(() => {
    if (!restored) return;
    saveLearningPlanSelection(selection);
    saveLearningTargetSelection({
      mode,
      targetId: branchTarget?.id ?? null,
      anchorNodeId: activeAnchorId,
    });
    const routeState: LearningRouteUrlState = {
      mode,
      filter: terrainFilter,
      targetId: mode === "all-nodes" ? (branchTarget?.id ?? null) : null,
      anchorNodeId: mode === "all-nodes" ? activeAnchorId : null,
    };
    const nextUrl = new URL(buildLearningRouteUrl(window.location.href, routeState));
    window.history.replaceState(
      window.history.state,
      "",
      `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    );
  }, [activeAnchorId, branchTarget?.id, mode, restored, selection, terrainFilter]);

  return restored;
}
