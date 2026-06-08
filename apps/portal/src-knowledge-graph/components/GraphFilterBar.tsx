"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { DomainFilters } from "./DomainFilters";
import { ClusterToggle } from "./ClusterToggle";
import { ZoomControls } from "./ZoomControls";
import { GraphSearch } from "./GraphSearch";
import { PathFinder } from "./PathFinder";
import type { SearchMatchField, GroupedSearchResult } from "./GraphSearch";
import type { GraphNode as FullGraphNode } from "../data/types";

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
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: GroupedSearchResult[];
  onSearchSelect: (nodeId: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  clusterMode: boolean;
  onClusterToggle: () => void;
  isMobile?: boolean;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  nodes: FullGraphNode[];
  pathStartId: string | null;
  pathEndId: string | null;
  pathResult: string[] | null;
  onPathFind: (startId: string, endId: string) => void;
  onPathClear: () => void;
  nodeMap: Map<string, FullGraphNode>;
};

export function GraphFilterBar({
  activeDomains,
  onDomainToggle,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  clusterMode,
  onClusterToggle,
  isMobile = false,
  searchInputRef,
  nodes,
  pathStartId,
  pathEndId,
  pathResult,
  onPathFind,
  onPathClear,
  nodeMap,
}: GraphFilterBarProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
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
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
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
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
            <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex-1" />
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
        "flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5",
        "rounded-xl border border-white/[0.06]",
        "bg-[#111118]/80 backdrop-blur-xl",
        "shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
      )}
    >
      <DomainFilters
        activeDomains={activeDomains}
        onDomainToggle={onDomainToggle}
        isMobile={isMobile}
        showCloseButton={isMobile}
        onClose={() => setMobileExpanded(false)}
      />

      <div
        className="h-5 w-px bg-white/[0.08] hidden sm:block"
        aria-hidden="true"
      />

      <TypeFilterDropdown
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isOpen={isTypeDropdownOpen}
        setIsOpen={setIsTypeDropdownOpen}
        isMobile={isMobile}
      />

      <div
        className="h-5 w-px bg-white/[0.08] hidden sm:block"
        aria-hidden="true"
      />

      <ClusterToggle
        clusterMode={clusterMode}
        onClusterToggle={onClusterToggle}
        isMobile={isMobile}
      />

      <div
        className="h-5 w-px bg-white/[0.08] hidden sm:block"
        aria-hidden="true"
      />

      <GraphSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchResults={searchResults}
        onSearchSelect={onSearchSelect}
        isMobile={isMobile}
        searchInputRef={searchInputRef}
      />

      <div
        className="h-5 w-px bg-white/[0.08] hidden sm:block"
        aria-hidden="true"
      />

      <PathFinder
        nodes={nodes}
        pathStartId={pathStartId}
        pathEndId={pathEndId}
        pathResult={pathResult}
        onPathFind={onPathFind}
        onPathClear={onPathClear}
        nodeMap={nodeMap}
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

function TypeFilterDropdown({
  selectedType,
  setSelectedType,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedType: string | null;
  setSelectedType: (v: string | null) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  isMobile: boolean;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs",
          "border transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]",
          isOpen
            ? "border-white/10 text-white/80 bg-white/[0.04]"
            : "border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/[0.08]",
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
        <span className={isMobile ? 'inline' : 'hidden sm:inline'}>
          {selectedType
            ? NODE_TYPES.find((t) => t.id === selectedType)?.label ?? "类型"
            : "类型"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="absolute top-full left-0 mt-1 z-50 min-w-[120px] py-1 rounded-lg border border-white/[0.08] bg-[#111118]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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
                "w-full text-left px-3 py-1.5 text-xs transition-colors duration-150",
                selectedType === null
                  ? "text-white bg-white/[0.06]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]",
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
                  setSelectedType(
                    nodeType.id === selectedType ? null : nodeType.id,
                  );
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full text-left px-3 py-1.5 text-xs transition-colors duration-150",
                  selectedType === nodeType.id
                    ? "text-white bg-white/[0.06]"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]",
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
