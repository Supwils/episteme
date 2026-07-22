"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { GraphNode } from "../data/types";
import type { ThoughtTour } from "../data/thought-tours";
import { DOMAIN_COLORS } from "../lib/constants";
import { buildTourUrl, resolveTourUrlState } from "../lib/tour-url-state";

type PathFinderProps = {
  nodes: GraphNode[];
  pathStartId: string | null;
  pathEndId: string | null;
  pathResult: string[] | null;
  onPathFind: (startId: string, endId: string) => void;
  onPathClear: () => void;
  nodeMap: Map<string, GraphNode>;
  edgeLabelMap: Map<string, string>;
  tours: ThoughtTour[];
  onTourSelect: (waypoints: string[]) => void;
  onTourStepSelect: (nodeId: string) => void;
  isGraphReady: boolean;
  detailPanelOpen: boolean;
  isMobile?: boolean;
};

function domainColor(domain: string): string {
  return DOMAIN_COLORS[domain] ?? "#9ca3af";
}

function NodeSelector({
  label,
  value,
  nodes,
  onSelect,
  placeholder,
}: {
  label: string;
  value: string | null;
  nodes: GraphNode[];
  onSelect: (id: string) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedNode = value ? nodes.find((n) => n.id === value) : null;

  const filtered = useMemo(() => {
    if (!query.trim()) return nodes.slice(0, 20);
    const q = query.toLowerCase();
    return nodes
      .filter((n) => n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q))
      .slice(0, 20);
  }, [nodes, query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
        {label}
      </span>
      <div className="relative">
        <input
          type="text"
          value={isOpen ? query : (selectedNode?.label ?? "")}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setQuery("");
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/80 outline-none placeholder:text-white/20 focus:border-indigo-500/40"
        />
        <AnimatePresence>
          {isOpen && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full right-0 left-0 z-50 mt-1 max-h-[180px] overflow-y-auto rounded-lg border border-white/[0.08] bg-[#111118]/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            >
              {filtered.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    onSelect(node.id);
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs transition-colors",
                    node.id === value
                      ? "bg-indigo-500/15 text-white"
                      : "text-white/70 hover:bg-white/[0.05]"
                  )}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: domainColor(node.domain) }}
                  />
                  <span className="truncate">{node.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PathFinder({
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
  detailPanelOpen,
  isMobile = false,
}: PathFinderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [isOpen, setIsOpen] = useState(false);
  const [localStart, setLocalStart] = useState<string | null>(pathStartId);
  const [localEnd, setLocalEnd] = useState<string | null>(pathEndId);
  const [activeTourId, setActiveTourId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const onTourSelectRef = useRef(onTourSelect);
  const onTourStepSelectRef = useRef(onTourStepSelect);
  const onPathClearRef = useRef(onPathClear);
  const appliedUrlTourIdRef = useRef<string | null>(null);

  useEffect(() => {
    onTourSelectRef.current = onTourSelect;
    onTourStepSelectRef.current = onTourStepSelect;
    onPathClearRef.current = onPathClear;
  }, [onPathClear, onTourSelect, onTourStepSelect]);

  const tourDescriptors = useMemo(
    () =>
      tours.map((tour) => ({
        id: tour.id,
        stepCount: tour.steps?.length ?? tour.waypoints.length,
      })),
    [tours]
  );

  const resolvedUrlState = useMemo(
    () => resolveTourUrlState(new URLSearchParams(searchParamsString), tourDescriptors),
    [searchParamsString, tourDescriptors]
  );

  const navigateToTourState = useCallback(
    (tourId: string | null, stepIndex = 0, replace = false) => {
      const href = buildTourUrl(
        pathname,
        new URLSearchParams(searchParamsString),
        tourId ? { tourId, stepIndex } : null
      );
      if (replace) {
        router.replace(href, { scroll: false });
      } else {
        router.push(href, { scroll: false });
      }
    },
    [pathname, router, searchParamsString]
  );

  useEffect(() => {
    setLocalStart(pathStartId);
  }, [pathStartId]);

  useEffect(() => {
    setLocalEnd(pathEndId);
  }, [pathEndId]);

  const handleFind = useCallback(() => {
    if (localStart && localEnd) {
      setActiveTourId(null);
      setActiveStepIndex(0);
      appliedUrlTourIdRef.current = null;
      navigateToTourState(null);
      onPathFind(localStart, localEnd);
    }
  }, [localStart, localEnd, navigateToTourState, onPathFind]);

  const handleTourClick = useCallback(
    (tour: ThoughtTour) => {
      setIsTourPlaying(false);
      setActiveTourId(tour.id);
      setActiveStepIndex(0);
      onTourSelect(tour.waypoints);
      navigateToTourState(tour.id);
    },
    [navigateToTourState, onTourSelect]
  );

  const handleClear = useCallback(() => {
    setIsTourPlaying(false);
    setActiveTourId(null);
    setActiveStepIndex(0);
    appliedUrlTourIdRef.current = null;
    navigateToTourState(null);
    onPathClear();
  }, [navigateToTourState, onPathClear]);

  // Build the explained chain: each step carries the relationship label (the
  // "why") on the edge to the next node, turning a node list into a genealogy.
  const chain = useMemo(() => {
    if (!pathResult) return [];
    return pathResult.map((id, idx) => {
      const node = nodeMap.get(id);
      const nextId = pathResult[idx + 1];
      const relToNext = nextId ? (edgeLabelMap.get(`${id}|${nextId}`) ?? null) : null;
      return {
        id,
        label: node?.label ?? id,
        domain: node?.domain ?? "",
        relToNext,
        isLast: idx === pathResult.length - 1,
      };
    });
  }, [pathResult, nodeMap, edgeLabelMap]);

  const activeTour = activeTourId ? (tours.find((tour) => tour.id === activeTourId) ?? null) : null;

  const activeTourSteps = useMemo(() => {
    if (!activeTour) return [];
    if (activeTour.steps && activeTour.steps.length > 0) return activeTour.steps;
    return activeTour.waypoints.map((nodeId) => {
      const node = nodeMap.get(nodeId);
      return {
        nodeId,
        title: node?.label ?? nodeId,
        summary: activeTour.subtitle,
        focus: node?.domain ?? "路径节点",
      };
    });
  }, [activeTour, nodeMap]);
  const activeTourNode = activeTourSteps[activeStepIndex]
    ? (nodeMap.get(activeTourSteps[activeStepIndex]!.nodeId) ?? null)
    : null;

  useEffect(() => {
    if (activeStepIndex >= activeTourSteps.length) {
      setActiveStepIndex(Math.max(0, activeTourSteps.length - 1));
    }
  }, [activeStepIndex, activeTourSteps.length]);

  useEffect(() => {
    const urlState = resolvedUrlState.state;

    if (!urlState) {
      if (appliedUrlTourIdRef.current !== null) {
        appliedUrlTourIdRef.current = null;
        setIsTourPlaying(false);
        setActiveTourId(null);
        setActiveStepIndex(0);
        onPathClearRef.current();
      }
      if (resolvedUrlState.needsNormalization) {
        navigateToTourState(null, 0, true);
      }
      return;
    }

    const tour = tours.find((candidate) => candidate.id === urlState.tourId);
    if (!tour) return;

    setIsOpen(true);
    appliedUrlTourIdRef.current = urlState.tourId;
    setActiveTourId(urlState.tourId);
    setActiveStepIndex(urlState.stepIndex);
    onTourSelectRef.current(tour.waypoints);

    if (isGraphReady) {
      const steps =
        tour.steps ??
        tour.waypoints.map((nodeId) => ({
          nodeId,
          title: nodeMap.get(nodeId)?.label ?? nodeId,
          summary: tour.subtitle,
          focus: nodeMap.get(nodeId)?.domain ?? "路径节点",
        }));
      const step = steps[urlState.stepIndex];
      if (step) onTourStepSelectRef.current(step.nodeId);
    }

    if (resolvedUrlState.needsNormalization) {
      navigateToTourState(urlState.tourId, urlState.stepIndex, true);
    }
  }, [isGraphReady, navigateToTourState, nodeMap, resolvedUrlState, tours]);

  const activeStepProgress =
    activeTourSteps.length > 1
      ? `${(activeStepIndex / (activeTourSteps.length - 1)) * 100}%`
      : "100%";

  const handleTourStepSelect = useCallback(
    (idx: number, replace = false) => {
      const step = activeTourSteps[idx];
      if (!step) return;
      setActiveStepIndex(idx);
      onTourStepSelectRef.current(step.nodeId);
      if (activeTourId) navigateToTourState(activeTourId, idx, replace);
    },
    [activeTourId, activeTourSteps, navigateToTourState]
  );

  const handlePreviousStep = useCallback(() => {
    setIsTourPlaying(false);
    handleTourStepSelect(Math.max(0, activeStepIndex - 1));
  }, [activeStepIndex, handleTourStepSelect]);

  const handleNextStep = useCallback(() => {
    setIsTourPlaying(false);
    handleTourStepSelect(Math.min(activeTourSteps.length - 1, activeStepIndex + 1));
  }, [activeStepIndex, activeTourSteps.length, handleTourStepSelect]);

  const handleManualTourStepSelect = useCallback(
    (index: number) => {
      setIsTourPlaying(false);
      handleTourStepSelect(index);
    },
    [handleTourStepSelect]
  );

  const handlePlaybackToggle = useCallback(() => {
    if (reducedMotion || activeTourSteps.length < 2) return;
    if (isTourPlaying) {
      setIsTourPlaying(false);
      return;
    }
    if (activeStepIndex >= activeTourSteps.length - 1) {
      handleTourStepSelect(0, true);
    }
    setIsTourPlaying(true);
  }, [
    activeStepIndex,
    activeTourSteps.length,
    handleTourStepSelect,
    isTourPlaying,
    reducedMotion,
  ]);

  useEffect(() => {
    if (reducedMotion && isTourPlaying) setIsTourPlaying(false);
  }, [isTourPlaying, reducedMotion]);

  useEffect(() => {
    if (!isTourPlaying || !activeTour || activeTourSteps.length < 2) return;
    if (activeStepIndex >= activeTourSteps.length - 1) {
      setIsTourPlaying(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      if (document.hidden) {
        setIsTourPlaying(false);
        return;
      }
      handleTourStepSelect(activeStepIndex + 1, true);
    }, 4_500);
    return () => window.clearTimeout(timeout);
  }, [
    activeStepIndex,
    activeTour,
    activeTourSteps.length,
    handleTourStepSelect,
    isTourPlaying,
  ]);

  return (
    <div className={clsx(!isMobile && detailPanelOpen ? "static" : "relative")}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={clsx(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs",
          "border transition-all duration-200",
          isOpen
            ? "border-indigo-500/30 bg-indigo-500/10 text-white"
            : "border-white/[0.04] text-white/40 hover:border-white/[0.08] hover:text-white/60"
        )}
        aria-expanded={isOpen}
        aria-label="连接引擎"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <circle cx="4" cy="4" r="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M5.5 5.5L10.5 10.5" strokeDasharray="2 2" />
        </svg>
        <span className={isMobile ? "inline" : "hidden sm:inline"}>连接引擎</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className={clsx(
              "absolute z-50 w-[320px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#111118]/95 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl",
              isMobile
                ? "top-full right-0 mt-2 max-h-[72vh]"
                : detailPanelOpen
                  ? "top-full z-[70] mt-2"
                  : "top-full left-0 mt-2 max-h-[72vh]"
            )}
            style={
              !isMobile && detailPanelOpen
                ? { right: 436, maxHeight: "calc(100dvh - 126px)" }
                : undefined
            }
            role="region"
            aria-label="连接引擎面板"
          >
            <div className="flex flex-col gap-3">
              {/* Curated thought lines */}
              {tours.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
                    思想之线
                  </span>
                  <div className="flex flex-col gap-1">
                    {tours.map((tour) => (
                      <button
                        key={tour.id}
                        type="button"
                        onClick={() => handleTourClick(tour)}
                        className={clsx(
                          "group rounded-lg border px-2.5 py-1.5 text-left transition-colors",
                          activeTourId === tour.id
                            ? "border-indigo-500/35 bg-indigo-500/[0.08]"
                            : "border-white/[0.05] bg-white/[0.02] hover:border-indigo-500/30 hover:bg-indigo-500/[0.06]"
                        )}
                      >
                        <span className="block text-[11px] font-medium text-white/80 group-hover:text-white">
                          {tour.title}
                        </span>
                        <span className="block text-[10px] leading-snug text-white/35">
                          {tour.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTour && activeTourSteps.length > 0 && (
                <div className="order-first rounded-lg border border-indigo-500/15 bg-indigo-500/[0.04] p-2.5">
                  <div className="mb-2">
                    <span className="block text-[10px] font-medium tracking-wider text-indigo-300/70 uppercase">
                      路线解释
                    </span>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="min-w-0 text-[11px] leading-snug text-white/65">
                        {activeTour.title} · {activeStepIndex + 1}/{activeTourSteps.length}
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePreviousStep}
                          disabled={activeStepIndex === 0}
                          className={clsx(
                            "flex h-6 w-7 items-center justify-center rounded-md border transition-colors",
                            activeStepIndex === 0
                              ? "cursor-not-allowed border-white/[0.04] text-white/20"
                              : "border-white/[0.08] text-white/50 hover:border-indigo-400/40 hover:text-indigo-200"
                          )}
                          aria-label="上一步"
                          title="上一步"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          >
                            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handlePlaybackToggle}
                          disabled={Boolean(reducedMotion) || activeTourSteps.length < 2}
                          className={clsx(
                            "flex h-6 w-7 items-center justify-center rounded-md border transition-colors",
                            reducedMotion || activeTourSteps.length < 2
                              ? "cursor-not-allowed border-white/[0.04] text-white/20"
                              : isTourPlaying
                                ? "border-indigo-300/40 bg-indigo-300/10 text-indigo-200"
                                : "border-white/[0.08] text-white/50 hover:border-indigo-400/40 hover:text-indigo-200"
                          )}
                          aria-label={
                            reducedMotion
                              ? "自动播放已因减少动态效果关闭"
                              : isTourPlaying
                                ? "暂停路线"
                                : "播放路线"
                          }
                          aria-pressed={isTourPlaying}
                          title={
                            reducedMotion
                              ? "减少动态效果时不自动推进"
                              : isTourPlaying
                                ? "暂停路线"
                                : "播放路线"
                          }
                        >
                          {isTourPlaying ? (
                            <svg
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="h-3 w-3"
                              aria-hidden="true"
                            >
                              <path d="M4 3h3v10H4zM9 3h3v10H9z" />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="h-3 w-3"
                              aria-hidden="true"
                            >
                              <path d="M5 3.2v9.6L12.5 8z" />
                            </svg>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={activeStepIndex >= activeTourSteps.length - 1}
                          className={clsx(
                            "flex h-6 w-7 items-center justify-center rounded-md border transition-colors",
                            activeStepIndex >= activeTourSteps.length - 1
                              ? "cursor-not-allowed border-white/[0.04] text-white/20"
                              : "border-white/[0.08] text-white/50 hover:border-indigo-400/40 hover:text-indigo-200"
                          )}
                          aria-label="下一步"
                          title="下一步"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          >
                            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]"
                      role="progressbar"
                      aria-label="路线播放进度"
                      aria-valuemin={1}
                      aria-valuemax={activeTourSteps.length}
                      aria-valuenow={activeStepIndex + 1}
                    >
                      <div
                        className="h-full rounded-full bg-indigo-300/70 transition-[width] duration-200"
                        style={{ width: activeStepProgress }}
                        aria-hidden="true"
                      />
                    </div>
                    {activeTourNode?.url ? (
                      <Link
                        href={activeTourNode.url}
                        className="mt-2 inline-flex min-h-8 items-center border-b border-indigo-300/40 text-[10px] text-indigo-200 transition-colors hover:border-indigo-200 hover:text-white"
                      >
                        阅读当前文章 →
                      </Link>
                    ) : null}
                  </div>
                  <div className="max-h-[260px] overflow-y-auto pr-1">
                    {activeTourSteps.map((step, idx) => {
                      const node = nodeMap.get(step.nodeId);
                      const isActiveStep = idx === activeStepIndex;
                      return (
                        <button
                          key={`${activeTour.id}-${step.nodeId}-${idx}`}
                          type="button"
                          onClick={() => handleManualTourStepSelect(idx)}
                          className={clsx(
                            "group grid w-full grid-cols-[1.25rem_minmax(0,1fr)] gap-2 rounded-md border px-1 py-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-indigo-300/60",
                            isActiveStep
                              ? "border-indigo-400/30 bg-indigo-400/[0.08]"
                              : "border-transparent hover:bg-white/[0.04]"
                          )}
                          aria-label={`聚焦路线步骤：${step.title}`}
                          aria-current={isActiveStep ? "step" : undefined}
                        >
                          <span className="relative flex justify-center pt-0.5">
                            <span
                              className={clsx(
                                "h-2.5 w-2.5 rounded-full ring-2",
                                isActiveStep ? "ring-indigo-200/50" : "ring-white/10"
                              )}
                              style={{
                                backgroundColor: domainColor(node?.domain ?? ""),
                              }}
                            />
                            {idx < activeTourSteps.length - 1 && (
                              <span
                                className="absolute top-3 bottom-[-0.5rem] w-px bg-white/10"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5">
                              <span className="truncate text-[11px] font-medium text-white/85 group-hover:text-white">
                                {step.title}
                              </span>
                              <span className="shrink-0 rounded-full border border-white/[0.06] px-1.5 py-0.5 text-[9px] text-white/35">
                                {step.focus}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-[10.5px] leading-snug text-white/42">
                              {step.summary}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="h-px bg-white/[0.06]" aria-hidden="true" />

              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
                  自选两个概念，看它们如何相连
                </span>
                <NodeSelector
                  label="起点"
                  value={localStart}
                  nodes={nodes}
                  onSelect={setLocalStart}
                  placeholder="选择起点节点…"
                />
                <NodeSelector
                  label="终点"
                  value={localEnd}
                  nodes={nodes}
                  onSelect={setLocalEnd}
                  placeholder="选择终点节点…"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFind}
                    disabled={!localStart || !localEnd}
                    className={clsx(
                      "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                      localStart && localEnd
                        ? "border border-indigo-500/30 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                        : "cursor-not-allowed border border-white/[0.04] bg-white/[0.03] text-white/20"
                    )}
                  >
                    查找路径
                  </button>
                  {pathResult && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="rounded-lg border border-white/[0.04] px-3 py-1.5 text-xs text-white/40 transition-all duration-200 hover:border-white/[0.08] hover:text-white/60"
                    >
                      清除
                    </button>
                  )}
                </div>
              </div>

              {pathResult && chain.length > 0 && (
                <div className="border-t border-white/[0.06] pt-2.5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
                      连接路径
                    </span>
                    <span className="text-[10px] text-indigo-400">
                      {chain.length} 个概念 · {chain.length - 1} 段关系
                    </span>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto pr-1">
                    {chain.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/5"
                            style={{ backgroundColor: domainColor(item.domain) }}
                          />
                          <span className="text-[12px] leading-tight font-medium text-white/85">
                            {item.label}
                          </span>
                        </div>
                        {!item.isLast && (
                          <div className="ml-[4px] flex items-stretch gap-2.5 py-0.5">
                            <div
                              className="w-px shrink-0 bg-gradient-to-b from-white/15 to-white/15"
                              aria-hidden="true"
                            />
                            <span
                              className={clsx(
                                "py-0.5 text-[10.5px] leading-snug",
                                item.relToNext ? "text-white/45" : "text-white/20 italic"
                              )}
                            >
                              {item.relToNext ?? "相关联"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pathResult && chain.length === 0 && (
                <div className="border-t border-white/[0.06] pt-2.5">
                  <p className="text-center text-[11px] text-white/30">未找到路径</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
