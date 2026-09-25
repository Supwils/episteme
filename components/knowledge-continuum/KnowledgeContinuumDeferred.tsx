"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { hasLearningRouteUrlState } from "@/lib/learning-route-url";
import type {
  KnowledgeConfluenceCatalogPayload,
  KnowledgeCoveragePayload,
  KnowledgePlannerPayload,
  KnowledgeSpinePayload,
} from "@/lib/knowledge-continuum-payload";
import { COVERAGE_DOMAIN_COUNT } from "@/lib/knowledge-continuum-coverage-meta";
import { DeferredKnowledgePanel } from "./DeferredKnowledgePanel";
import { useDeferredKnowledgeData } from "./useDeferredKnowledgeData";

const loadSpineModule = () => import("./KnowledgeSpineAtlas");
const loadPlannerModule = () => import("./KnowledgeLearningPlanner");
const loadFrontierModule = () => import("./KnowledgeFrontierLab");
const loadConfluenceModule = () => import("./KnowledgeConfluenceExplorer");
const loadCoverageModule = () => import("./KnowledgeCoveragePanel");

function DeferredModuleLoading() {
  return (
    <div
      className="border-border-faint bg-bg-near mt-8 flex items-center justify-center border px-6"
      style={{ minHeight: "100vh" }}
      role="status"
      aria-live="polite"
    >
      <p className="text-fg-muted text-xs">正在准备交互界面…</p>
    </div>
  );
}

function FrontierModuleLoading() {
  return (
    <div
      className="border-border-faint bg-bg-near mt-8 flex min-h-48 items-center justify-center border"
      role="status"
      aria-live="polite"
    >
      <p className="text-fg-muted text-xs">正在准备学习前沿…</p>
    </div>
  );
}

const SpineModule = dynamic(() => loadSpineModule().then((module) => module.KnowledgeSpineAtlas), {
  ssr: false,
  loading: DeferredModuleLoading,
});
const PlannerModule = dynamic(
  () => loadPlannerModule().then((module) => module.KnowledgeLearningPlanner),
  { ssr: false, loading: DeferredModuleLoading }
);
const FrontierModule = dynamic(
  () => loadFrontierModule().then((module) => module.KnowledgeFrontierLab),
  { ssr: false, loading: FrontierModuleLoading }
);
const ConfluenceModule = dynamic(
  () => loadConfluenceModule().then((module) => module.KnowledgeConfluenceExplorer),
  { ssr: false, loading: DeferredModuleLoading }
);
const CoverageModule = dynamic(
  () => loadCoverageModule().then((module) => module.KnowledgeCoveragePanel),
  { ssr: false, loading: DeferredModuleLoading }
);

const TABS = [
  { id: "spine", label: "主干地图", Panel: DeferredSpineAtlas },
  { id: "planner", label: "地形与路线", Panel: DeferredLearningPlanner },
  { id: "frontier", label: "可达前沿", Panel: FrontierModule },
  { id: "confluence", label: "多学科汇流", Panel: DeferredConfluenceExplorer },
  { id: "coverage", label: "策展覆盖", Panel: DeferredCoveragePanel },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Shared links (a confluence, a learning route) open on the tab that reads them. */
function tabFromUrl(): TabId | null {
  const params = new URLSearchParams(window.location.search);
  if (params.has("confluence")) return "confluence";
  if (hasLearningRouteUrlState(params)) return "planner";
  return null;
}

/**
 * 五个深层模块收成一组页签（E4）：一次只挂一个，挂过的留着（隐藏）免得重取；
 * 各模块仍在进入视口后才取数据。键盘按 WAI-ARIA 页签模式：左右键切换。
 */
export function KnowledgeContinuumDeferred() {
  const [active, setActive] = useState<TabId>("spine");
  const [visited, setVisited] = useState<ReadonlySet<TabId>>(() => new Set(["spine"]));
  const tabRefs = useRef(new Map<TabId, HTMLButtonElement>());
  const baseId = useId();

  function open(id: TabId) {
    setActive(id);
    setVisited((current) => (current.has(id) ? current : new Set([...current, id])));
  }

  useEffect(() => {
    const requested = tabFromUrl();
    if (requested) open(requested);
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = TABS.findIndex((tab) => tab.id === active);
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const target =
      offset !== 0
        ? TABS[(index + offset + TABS.length) % TABS.length]
        : event.key === "Home"
          ? TABS[0]
          : event.key === "End"
            ? TABS.at(-1)
            : undefined;
    if (!target) return;
    event.preventDefault();
    open(target.id);
    tabRefs.current.get(target.id)?.focus();
  }

  return (
    <div className="continuum-tabs">
      <div className="continuum-tabs__list" role="tablist" aria-label="知识连续体工具">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={(node) => {
              if (node) tabRefs.current.set(tab.id, node);
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={tab.id === active}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={tab.id === active ? 0 : -1}
            onClick={() => open(tab.id)}
            onKeyDown={onKeyDown}
            className="continuum-tabs__tab"
          >
            <span className="continuum-tabs__index">0{i + 1}</span>
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map(({ id, Panel }) =>
        visited.has(id) ? (
          <div
            key={id}
            role="tabpanel"
            id={`${baseId}-panel-${id}`}
            aria-labelledby={`${baseId}-tab-${id}`}
            hidden={id !== active}
            className="continuum-tabs__panel"
          >
            <Panel />
          </div>
        ) : null
      )}
    </div>
  );
}

function DeferredSpineAtlas() {
  const deferred = useDeferredKnowledgeData<KnowledgeSpinePayload>(
    "/api/knowledge-continuum/spine",
    loadSpineModule
  );
  return (
    <DeferredKnowledgePanel
      containerRef={deferred.containerRef}
      title={`${COVERAGE_DOMAIN_COUNT} 门学科的五级主干地图`}
      description="比较每门学科从第一问、核心概念、系统解释、方法建模到研究边界的人工前置链。地图接近视口时才载入。"
      status={deferred.status}
      onLoad={deferred.activate}
      onRetry={deferred.retry}
      testId="knowledge-spine-atlas"
    >
      {deferred.data ? <SpineModule atlas={deferred.data.atlas} embedded /> : null}
    </DeferredKnowledgePanel>
  );
}

function DeferredLearningPlanner() {
  const deferred = useDeferredKnowledgeData<KnowledgePlannerPayload>(
    "/api/knowledge-continuum/planner",
    loadPlannerModule
  );
  return (
    <DeferredKnowledgePanel
      containerRef={deferred.containerRef}
      title="知识地形与路线编排"
      description="先观察全图各学科和阶段的库存结构，再按起点、目标与时间生成保留必要前置关系的学习路线。"
      status={deferred.status}
      onLoad={deferred.activate}
      onRetry={deferred.retry}
      testId="knowledge-learning-planner"
      triggerTestIds={["knowledge-terrain", "knowledge-terrain-diagnostics"]}
    >
      {deferred.data ? (
        <PlannerModule catalog={deferred.data.catalog} terrain={deferred.data.terrain} embedded />
      ) : null}
    </DeferredKnowledgePanel>
  );
}

function DeferredConfluenceExplorer() {
  const deferred = useDeferredKnowledgeData<KnowledgeConfluenceCatalogPayload>(
    "/api/knowledge-continuum/confluences",
    loadConfluenceModule
  );
  const activate = deferred.activate;
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("confluence")) activate();
  }, [activate]);

  return (
    <DeferredKnowledgePanel
      containerRef={deferred.containerRef}
      title="多学科知识汇流"
      description="围绕同一开放问题并列必要解释、互补尺度与争议检验，完整路线只在选题后继续按需载入。"
      status={deferred.status}
      onLoad={deferred.activate}
      onRetry={deferred.retry}
      testId="knowledge-confluence-explorer"
      fallbackLinks={[
        { href: "/knowledge-confluence/ai-governance", label: "AI 治理" },
        { href: "/knowledge-confluence/urban-climate-adaptation", label: "城市气候适应" },
        { href: "/knowledge-confluence/population-ageing", label: "人口老龄化" },
        { href: "/knowledge-confluence/macro-fiscal-governance", label: "宏观财政" },
        { href: "/knowledge-confluence/public-health-priority", label: "公共卫生优先排序" },
      ]}
    >
      {deferred.data ? (
        <ConfluenceModule
          catalog={deferred.data.catalog}
          initialConfluence={null}
          initialMinutes={45}
          embedded
        />
      ) : null}
    </DeferredKnowledgePanel>
  );
}

function DeferredCoveragePanel() {
  const deferred = useDeferredKnowledgeData<KnowledgeCoveragePayload>(
    "/api/knowledge-continuum/coverage",
    loadCoverageModule
  );
  return (
    <DeferredKnowledgePanel
      containerRef={deferred.containerRef}
      title="全学科策展覆盖"
      description="按学科、认知阶段、证据方式和跨学科转接检查人工主干的覆盖密度与真实路径。"
      status={deferred.status}
      onLoad={deferred.activate}
      onRetry={deferred.retry}
      testId="knowledge-coverage-panel"
    >
      {deferred.data ? <CoverageModule snapshot={deferred.data.coverage} embedded /> : null}
    </DeferredKnowledgePanel>
  );
}
