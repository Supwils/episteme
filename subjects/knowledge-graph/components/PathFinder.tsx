"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { GraphNode } from "../data/types";

type PathFinderProps = {
  nodes: GraphNode[];
  pathStartId: string | null;
  pathEndId: string | null;
  pathResult: string[] | null;
  onPathFind: (startId: string, endId: string) => void;
  onPathClear: () => void;
  nodeMap: Map<string, GraphNode>;
  isMobile?: boolean;
};

const DOMAIN_COLORS: Record<string, string> = {
  physics: "#6366f1",
  history: "#f59e0b",
  philosophy: "#10b981",
  "life-science": "#ec4899",
};

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
      .filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          n.id.toLowerCase().includes(q),
      )
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
      <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
        {label}
      </span>
      <div className="relative">
        <input
          type="text"
          value={isOpen ? query : selectedNode?.label ?? ""}
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
              className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[180px] overflow-y-auto rounded-lg border border-white/[0.08] bg-[#111118]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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
                      : "text-white/70 hover:bg-white/[0.05]",
                  )}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: DOMAIN_COLORS[node.domain] ?? "#9ca3af",
                    }}
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

  const pathLabels = useMemo(() => {
    if (!pathResult) return [];
    return pathResult.map((id) => {
      const node = nodeMap.get(id);
      return {
        id,
        label: node?.label ?? id,
        domain: node?.domain ?? "physics",
      };
    });
  }, [pathResult, nodeMap]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={clsx(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs",
          "border transition-all duration-200",
          isOpen
            ? "border-indigo-500/30 text-white bg-indigo-500/10"
            : "border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/[0.08]",
        )}
        aria-expanded={isOpen}
        aria-label="路径查找"
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
        <span className={isMobile ? "inline" : "hidden sm:inline"}>
          路径查找
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="absolute top-full right-0 mt-2 z-50 w-[280px] rounded-xl border border-white/[0.08] bg-[#111118]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-3"
          >
            <div className="flex flex-col gap-3">
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
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30"
                      : "bg-white/[0.03] text-white/20 border border-white/[0.04] cursor-not-allowed",
                  )}
                >
                  查找路径
                </button>
                {pathResult && (
                  <button
                    type="button"
                    onClick={onPathClear}
                    className="rounded-lg px-3 py-1.5 text-xs text-white/40 border border-white/[0.04] hover:text-white/60 hover:border-white/[0.08] transition-all duration-200"
                  >
                    清除
                  </button>
                )}
              </div>

              {pathResult && pathLabels.length > 0 && (
                <div className="border-t border-white/[0.06] pt-2.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
                      路径
                    </span>
                    <span className="text-[10px] text-indigo-400">
                      {pathLabels.length} 个节点
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {pathLabels.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              DOMAIN_COLORS[item.domain] ?? "#9ca3af",
                          }}
                        />
                        <span className="text-[11px] text-white/70 truncate flex-1">
                          {item.label}
                        </span>
                        {idx < pathLabels.length - 1 && (
                          <svg
                            viewBox="0 0 8 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-2 w-2 shrink-0 text-white/20"
                          >
                            <path d="M2 1l4 3-4 3" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pathResult && pathLabels.length === 0 && (
                <div className="border-t border-white/[0.06] pt-2.5">
                  <p className="text-[11px] text-white/30 text-center">
                    未找到路径
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
