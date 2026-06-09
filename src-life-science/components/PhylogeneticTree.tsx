"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "../lib/constants";
import type { PhylogeneticNode } from "../lib/types";

const NODE_RADIUS = 8;
const LEAF_RADIUS = 5;
const LEVEL_HEIGHT = 90;
const MIN_SPAN = 40;
const Y_EASING = 0.65;

interface PhylogeneticTreeProps {
  data: PhylogeneticNode;
}

interface LayoutNode {
  node: PhylogeneticNode;
  x: number;
  y: number;
  depth: number;
  hasChildren: boolean;
  isLeaf: boolean;
}

interface LayoutEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  depth: number;
  divergenceMYA?: number;
}

function countDescendants(node: PhylogeneticNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countDescendants(c), 0);
}

function measureSubtreeWidth(
  node: PhylogeneticNode,
  expanded: Set<string>,
): number {
  if (!node.children || node.children.length === 0 || !expanded.has(node.id)) {
    return MIN_SPAN;
  }
  const childWidths = node.children.map((c) =>
    measureSubtreeWidth(c, expanded),
  );
  return Math.max(
    MIN_SPAN,
    childWidths.reduce((a, b) => a + b, 0) + (childWidths.length - 1) * 12,
  );
}

function layoutTree(
  node: PhylogeneticNode,
  expanded: Set<string>,
  centerX: number,
  startY: number,
  depth: number,
): { nodes: LayoutNode[]; edges: LayoutEdge[]; maxX: number; maxY: number } {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  const y = startY + depth * LEVEL_HEIGHT;
  const hasChildren =
    !!node.children && node.children.length > 0 && expanded.has(node.id);
  const isLeaf = !node.children || node.children.length === 0;

  let maxX = centerX;
  let maxY = y;

  if (hasChildren && node.children) {
    const childWidths = node.children.map((c) =>
      measureSubtreeWidth(c, expanded),
    );
    const totalWidth =
      childWidths.reduce((a, b) => a + b, 0) +
      (childWidths.length - 1) * 12;
    let currentX = centerX - totalWidth / 2;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]!;
      const childWidth = childWidths[i]!;
      const childCenter = currentX + childWidth / 2;
      const childY = y + LEVEL_HEIGHT;

      edges.push({
        x1: centerX,
        y1: y,
        x2: childCenter,
        y2: childY,
        color: child.color,
        depth,
        divergenceMYA: child.divergenceMYA,
      });

      const sub = layoutTree(
        child,
        expanded,
        childCenter,
        startY,
        depth + 1,
      );
      nodes.push(...sub.nodes);
      edges.push(...sub.edges);
      maxX = Math.max(maxX, sub.maxX);
      maxY = Math.max(maxY, sub.maxY);

      currentX += childWidth + 12;
    }
  }

  nodes.push({
    node,
    x: centerX,
    y,
    depth,
    hasChildren: !!node.children && node.children.length > 0,
    isLeaf,
  });

  return { nodes, edges, maxX: Math.max(maxX, centerX), maxY };
}

function CurvedBranch({
  x1,
  y1,
  x2,
  y2,
  color,
  depth,
  reduce,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  depth: number;
  reduce: boolean;
}) {
  const midY = y1 + (y2 - y1) * Y_EASING;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  const strokeWidth = Math.max(1.5, 4 - depth * 0.5);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeOpacity={0.5}
      strokeLinecap="round"
      initial={reduce ? {} : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        ease: PRODUCT_EASE,
        delay: reduce ? 0 : depth * 0.08,
      }}
    />
  );
}

function DivergenceLabel({
  x1,
  y1,
  x2,
  y2,
  mya,
  reduce,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mya: number;
  reduce: boolean;
}) {
  const mx = (x1 + x2) / 2 + 8;
  const my = (y1 + y2) / 2 - 4;

  const label =
    mya >= 1000
      ? `${(mya / 1000).toFixed(1)} Bya`
      : `${mya} Mya`;

  return (
    <motion.text
      x={mx}
      y={my}
      fill="#666"
      fontSize="8"
      fontFamily="monospace"
      initial={reduce ? {} : { opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 }}
    >
      {label}
    </motion.text>
  );
}

function NodeTooltip({
  node,
  x,
  y,
}: {
  node: PhylogeneticNode;
  x: number;
  y: number;
}) {
  const descendantCount = countDescendants(node);
  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <motion.g
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <rect
        x={x - 90}
        y={y - 68}
        width={180}
        height={52}
        rx={4}
        fill="rgba(10,10,14,0.92)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
      />
      <text
        x={x}
        y={y - 48}
        textAnchor="middle"
        fill="#e8e8f0"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui"
      >
        {node.name} ({node.nameEn})
      </text>
      <text
        x={x}
        y={y - 32}
        textAnchor="middle"
        fill="#888"
        fontSize="9"
        fontFamily="monospace"
      >
        {node.divergenceMYA
          ? `分歧: ${node.divergenceMYA >= 1000 ? (node.divergenceMYA / 1000).toFixed(1) + " Bya" : node.divergenceMYA + " Mya"}`
          : ""}
        {node.speciesCount
          ? ` · ${formatCount(node.speciesCount)} 种`
          : descendantCount > 1
            ? ` · ${formatCount(descendantCount)} 类群`
            : ""}
      </text>
    </motion.g>
  );
}

export function PhylogeneticTree({ data }: PhylogeneticTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["luca"]));
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const ids = new Set<string>();
    const walk = (n: PhylogeneticNode) => {
      ids.add(n.id);
      n.children?.forEach(walk);
    };
    walk(data);
    setExpanded(ids);
  }, [data]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set(["luca"]));
  }, []);

  const { nodes, edges, maxX, maxY } = useMemo(
    () => layoutTree(data, expanded, 0, 30, 0),
    [data, expanded],
  );

  const padding = 100;
  const viewBox = `${-padding} ${-padding} ${maxX * 2 + padding * 2} ${maxY + padding * 2}`;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.2, Math.min(3, prev - e.deltaY * 0.001)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pan],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning) return;
      setPan({
        x: panStart.current.px + (e.clientX - panStart.current.x),
        y: panStart.current.py + (e.clientY - panStart.current.y),
      });
    },
    [isPanning],
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const hoveredNode = hoveredId
    ? nodes.find((n) => n.node.id === hoveredId)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={expandAll}
          className="border-border-faint bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
        >
          展开全部
        </button>
        <button
          onClick={collapseAll}
          className="border-border-faint bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
        >
          收起全部
        </button>
        <div className="border-border-faint flex items-center gap-2 border-l pl-3">
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
            className="border-border-faint bg-bg-near hover:bg-bg-elevated text-fg-secondary flex h-7 w-7 items-center justify-center border font-mono text-sm transition-colors"
            aria-label="放大"
          >
            +
          </button>
          <span className="text-fg-muted w-12 text-center font-mono text-[10px]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.max(0.2, z - 0.2))}
            className="border-border-faint bg-bg-near hover:bg-bg-elevated text-fg-secondary flex h-7 w-7 items-center justify-center border font-mono text-sm transition-colors"
            aria-label="缩小"
          >
            −
          </button>
          <button
            onClick={resetView}
            className="border-border-faint bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-2 py-1 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors"
          >
            重置
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {[
            { label: "细菌", color: "#61afef" },
            { label: "古菌", color: "#c678dd" },
            { label: "真核", color: "#e5c07b" },
            { label: "动物", color: "#e07a5f" },
            { label: "植物", color: "#81b29a" },
            { label: "真菌", color: "#98c379" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1 font-mono text-[9px] tracking-[0.15em]"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-fg-muted">{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="border-border-faint bg-bg-card relative overflow-hidden border"
        style={{ height: 600, cursor: isPanning ? "grabbing" : "grab" }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={viewBox}
          role="tree"
          aria-label="生命之树系统发育图 — 点击节点展开/收起分支"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center top",
            transition: isPanning ? "none" : "transform 0.2s ease",
          }}
        >
          <defs>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hover-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge, i) => (
            <g key={`edge-${i}`}>
              <CurvedBranch
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                color={edge.color}
                depth={edge.depth}
                reduce={!!reduce}
              />
              {edge.divergenceMYA && (
                <DivergenceLabel
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  mya={edge.divergenceMYA}
                  reduce={!!reduce}
                />
              )}
            </g>
          ))}

          {nodes.map((layoutNode) => {
            const { node, x, y, hasChildren, isLeaf } = layoutNode;
            const isHovered = hoveredId === node.id;
            const r = isLeaf ? LEAF_RADIUS : NODE_RADIUS;

            return (
              <g
                key={node.id}
                role="treeitem"
                aria-expanded={hasChildren ? expanded.has(node.id) : undefined}
                tabIndex={0}
                onClick={() => hasChildren && toggle(node.id)}
                onKeyDown={(e: ReactKeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (hasChildren) toggle(node.id);
                  }
                }}
                onPointerEnter={() => setHoveredId(node.id)}
                onPointerLeave={() => setHoveredId(null)}
                style={{ cursor: hasChildren ? "pointer" : "default" }}
              >
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 8}
                    fill={node.color}
                    fillOpacity={0.06}
                    filter="url(#hover-glow)"
                  />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={isHovered ? node.color : "rgba(10,10,14,0.8)"}
                  fillOpacity={isHovered ? 0.3 : 1}
                  stroke={node.color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  style={{ transition: "all 0.2s ease" }}
                />

                {hasChildren && (
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.color}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace"
                    style={{ pointerEvents: "none" }}
                  >
                    {expanded.has(node.id) ? "−" : "+"}
                  </text>
                )}

                <text
                  x={x}
                  y={y - r - 6}
                  textAnchor="middle"
                  fill={isHovered ? "#fff" : "#c8c8d4"}
                  fontSize={isLeaf ? 9 : 10}
                  fontWeight="600"
                  fontFamily="system-ui"
                  style={{
                    pointerEvents: "none",
                    transition: "fill 0.2s ease",
                  }}
                >
                  {node.name}
                </text>

                <text
                  x={x}
                  y={y + r + 12}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="7"
                  fontFamily="monospace"
                  opacity={isHovered ? 1 : 0.6}
                  style={{ pointerEvents: "none" }}
                >
                  {node.nameEn}
                </text>

                {isHovered && (
                  <NodeTooltip node={node} x={x} y={y} />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-fg-muted font-mono text-[9px] tracking-[0.15em] uppercase text-center">
        滚轮缩放 · 拖拽平移 · 点击节点展开/收起分支 · 悬停查看信息
      </p>
    </div>
  );
}
