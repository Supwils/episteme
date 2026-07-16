"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { DomainFilters } from "./DomainFilters";
import { GraphLayoutModeControl } from "./GraphLayoutModeControl";
import { CuratedPathSelect } from "./CuratedPathSelect";
import { CrossDomainToggle } from "./CrossDomainToggle";
import { ZoomControls } from "./ZoomControls";
import { GraphSearch } from "./GraphSearch";
import { PathFinder } from "./PathFinder";
import type { SearchMatchField, GroupedSearchResult } from "./GraphSearch";
import type { GraphNode as FullGraphNode } from "../data/types";
import type { ThoughtTour } from "../data/thought-tours";
import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";
import type { GraphNodeType } from "../data/types";
import type { GraphLayoutMode } from "../lib/cognitive-layout";
import type { CuratedLearningPath } from "../data/curated-learning-paths";
import type { KnowledgeFrontierStatus, KnowledgeFrontierSummary } from "@/lib/knowledge-frontier";
import { LearningFrontierFilter } from "./LearningFrontierFilter";

export type { SearchMatchField, GroupedSearchResult };
export type { FullGraphNode as GraphNode };

const NODE_TYPES = [
  { id: "thinker", label: "思想家" },
  { id: "event", label: "事件" },
  { id: "species", label: "物种" },
  { id: "concept", label: "概念" },
  { id: "experiment", label: "实验" },
] as const;

const DOMAINS = [
  { id: "physics", label: "物理", color: "#6366f1" },
  { id: "history", label: "历史", color: "#f59e0b" },
  { id: "philosophy", label: "哲学", color: "#10b981" },
  { id: "life-science", label: "生命科学", color: "#ec4899" },
] as const;

type GraphFilterBarProps = {
  activeDomains: Set<string>;
  onDomainToggle: (domain: string) => void;
  selectedType: GraphNodeType | null;
  onTypeChange: (type: GraphNodeType | null) => void;
  knowledgeLevel: KnowledgeLevel | null;
  onKnowledgeLevelChange: (level: KnowledgeLevel | null) => void;
  frontierStatus: KnowledgeFrontierStatus | null;
  frontierSummary: KnowledgeFrontierSummary;
  onFrontierStatusChange: (status: KnowledgeFrontierStatus | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: GroupedSearchResult[];
  onSearchSelect: (nodeId: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  layoutMode: GraphLayoutMode;
  onLayoutModeChange: (mode: GraphLayoutMode) => void;
  curatedPaths: readonly CuratedLearningPath[];
  activeCuratedPathId: string | null;
  onCuratedPathChange: (pathId: string | null) => void;
  crossDomainOnly: boolean;
  onCrossDomainToggle: () => void;
  isMobile?: boolean;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  nodes: FullGraphNode[];
  pathStartId: string | null;
  pathEndId: string | null;
  pathResult: string[] | null;
  onPathFind: (startId: string, endId: string) => void;
  onPathClear: () => void;
  nodeMap: Map<string, FullGraphNode>;
  edgeLabelMap: Map<string, string>;
  tours: ThoughtTour[];
  onTourSelect: (waypoints: string[]) => void;
  onTourStepSelect: (nodeId: string) => void;
  isGraphReady: boolean;
};

export function GraphFilterBar({
  activeDomains,
  onDomainToggle,
  selectedType,
  onTypeChange,
  knowledgeLevel,
  onKnowledgeLevelChange,
  frontierStatus,
  frontierSummary,
  onFrontierStatusChange,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  layoutMode,
  onLayoutModeChange,
  curatedPaths,
  activeCuratedPathId,
  onCuratedPathChange,
  crossDomainOnly,
  onCrossDomainToggle,
  isMobile = false,
  searchInputRef,
  nodes,
  pathStartId,
  pathEndId,
  pathResult,
  onPathFind,
  onPathClear,
  nodeMap,
  edgeLabelMap,
  tours,
  onTourSelect,
  onTourStepSelect,
  isGraphReady,
}: GraphFilterBarProps) {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  if (isMobile && !mobileExpanded) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMobileExpanded(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
          aria-label="搜索"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setMobileExpanded(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
          aria-label="筛选"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
          </svg>
        </button>
        <PathFinder
          nodes={nodes}
          pathStartId={pathStartId}
          pathEndId={pathEndId}
          pathResult={pathResult}
          onPathFind={onPathFind}
          onPathClear={onPathClear}
          nodeMap={nodeMap}
          edgeLabelMap={edgeLabelMap}
          tours={tours}
          onTourSelect={onTourSelect}
          onTourStepSelect={onTourStepSelect}
          isGraphReady={isGraphReady}
          isMobile
        />
        <div className="flex-1" />
        {knowledgeLevel ? (
          <span className="border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-white/55">
            L{knowledgeLevel}
          </span>
        ) : null}
        {frontierStatus ? (
          <span className="border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-white/55">
            {frontierStatus === "mastered"
              ? "已掌握"
              : frontierStatus === "ready"
                ? "可学习"
                : "被阻塞"}
          </span>
        ) : null}
        {Array.from(activeDomains).map((domainId) => {
          const domain = DOMAINS.find((d) => d.id === domainId);
          if (!domain) return null;
          return (
            <span
              key={domainId}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: domain.color }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5",
        "rounded-xl border border-white/[0.06]",
        "bg-[#111118]/80 backdrop-blur-xl",
        "shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
        isMobile && "w-full max-w-full min-w-0 overflow-hidden"
      )}
    >
      <DomainFilters
        activeDomains={activeDomains}
        onDomainToggle={onDomainToggle}
        isMobile={isMobile}
        showCloseButton={isMobile}
        onClose={() => setMobileExpanded(false)}
      />

      <div className="hidden h-5 w-px bg-white/[0.08] sm:block" aria-hidden="true" />

      <TypeFilterDropdown
        selectedType={selectedType}
        setSelectedType={onTypeChange}
        isOpen={isTypeDropdownOpen}
        setIsOpen={setIsTypeDropdownOpen}
        isMobile={isMobile}
      />

      <KnowledgeLevelSelect
        value={knowledgeLevel}
        onChange={onKnowledgeLevelChange}
        isMobile={isMobile}
      />

      <LearningFrontierFilter
        value={frontierStatus}
        summary={frontierSummary}
        onChange={onFrontierStatusChange}
        isMobile={isMobile}
      />

      <div className="hidden h-5 w-px bg-white/[0.08] sm:block" aria-hidden="true" />

      <GraphLayoutModeControl value={layoutMode} onChange={onLayoutModeChange} />

      <CuratedPathSelect
        paths={curatedPaths}
        value={activeCuratedPathId}
        onChange={onCuratedPathChange}
        isMobile={isMobile}
      />

      <CrossDomainToggle
        active={crossDomainOnly}
        onToggle={onCrossDomainToggle}
        isMobile={isMobile}
      />

      <div className="hidden h-5 w-px bg-white/[0.08] sm:block" aria-hidden="true" />

      <GraphSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchResults={searchResults}
        onSearchSelect={onSearchSelect}
        isMobile={isMobile}
        searchInputRef={searchInputRef}
      />

      <div className="hidden h-5 w-px bg-white/[0.08] sm:block" aria-hidden="true" />

      <PathFinder
        nodes={nodes}
        pathStartId={pathStartId}
        pathEndId={pathEndId}
        pathResult={pathResult}
        onPathFind={onPathFind}
        onPathClear={onPathClear}
        nodeMap={nodeMap}
        edgeLabelMap={edgeLabelMap}
        tours={tours}
        onTourSelect={onTourSelect}
        onTourStepSelect={onTourStepSelect}
        isGraphReady={isGraphReady}
        isMobile={isMobile}
      />

      <div className="flex-1" />

      <ZoomControls
        zoom={zoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFitToScreen={onFitToScreen}
      />
    </div>
  );
}

function KnowledgeLevelSelect({
  value,
  onChange,
  isMobile,
}: {
  value: KnowledgeLevel | null;
  onChange: (level: KnowledgeLevel | null) => void;
  isMobile: boolean;
}) {
  return (
    <label className="text-white/45">
      <span className="sr-only">认知阶段筛选</span>
      <select
        value={value ?? ""}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(next >= 1 && next <= 5 ? (next as KnowledgeLevel) : null);
        }}
        className="h-8 border border-white/[0.06] bg-[#111118] px-2 text-xs text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
        aria-label="认知阶段筛选"
      >
        <option value="">{isMobile ? "全部阶段" : "认知阶段：全部"}</option>
        {KNOWLEDGE_LEVELS.map((level) => (
          <option key={level.id} value={level.id}>
            L{level.id} · {level.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TypeFilterDropdown({
  selectedType,
  setSelectedType,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedType: GraphNodeType | null;
  setSelectedType: (v: GraphNodeType | null) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  isMobile: boolean;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs",
          "border transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]",
          isOpen
            ? "border-white/10 bg-white/[0.04] text-white/80"
            : "border-white/[0.04] text-white/40 hover:border-white/[0.08] hover:text-white/60"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
        </svg>
        <span className={isMobile ? "inline" : "hidden sm:inline"}>
          {selectedType ? (NODE_TYPES.find((t) => t.id === selectedType)?.label ?? "类型") : "类型"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="absolute top-full left-0 z-50 mt-1 min-w-[120px] rounded-lg border border-white/[0.08] bg-[#111118]/95 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            role="listbox"
            aria-label="节点类型筛选"
          >
            <button
              type="button"
              role="option"
              aria-selected={selectedType === null}
              onClick={() => {
                setSelectedType(null);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full px-3 py-1.5 text-left text-xs transition-colors duration-150",
                selectedType === null
                  ? "bg-white/[0.06] text-white"
                  : "text-white/50 hover:bg-white/[0.03] hover:text-white/80"
              )}
            >
              全部类型
            </button>
            {NODE_TYPES.map((nodeType) => (
              <button
                key={nodeType.id}
                type="button"
                role="option"
                aria-selected={selectedType === nodeType.id}
                onClick={() => {
                  setSelectedType(nodeType.id === selectedType ? null : nodeType.id);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full px-3 py-1.5 text-left text-xs transition-colors duration-150",
                  selectedType === nodeType.id
                    ? "bg-white/[0.06] text-white"
                    : "text-white/50 hover:bg-white/[0.03] hover:text-white/80"
                )}
              >
                {nodeType.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
