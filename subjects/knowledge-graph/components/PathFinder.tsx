"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { GraphNode } from "../data/types";
import type { ThoughtTour } from "../data/thought-tours";
import { DOMAIN_COLORS } from "../lib/constants";

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
  isMobile = false,
}: PathFinderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localStart, setLocalStart] = useState<string | null>(pathStartId);
  const [localEnd, setLocalEnd] = useState<string | null>(pathEndId);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setLocalStart(pathStartId);
  }, [pathStartId]);

  useEffect(() => {
    setLocalEnd(pathEndId);
  }, [pathEndId]);

  const handleFind = useCallback(() => {
    if (localStart && localEnd) {
      onPathFind(localStart, localEnd);
    }
  }, [localStart, localEnd, onPathFind]);

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

  return (
    <div className="relative">
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
            className="absolute top-full left-0 z-50 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/[0.08] bg-[#111118]/95 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
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
                        onClick={() => onTourSelect(tour.waypoints)}
                        className="group rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5 text-left transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/[0.06]"
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
                      onClick={onPathClear}
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
