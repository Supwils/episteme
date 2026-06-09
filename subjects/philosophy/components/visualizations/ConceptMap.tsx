'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';
import type { ConceptRelationType } from '../../lib/concept-relationships';
import {
  CONCEPT_NODES,
  CONCEPT_RELATIONS,
  FIELD_COLORS,
  RELATION_COLORS,
} from '../../lib/concept-relationships';

type ConceptNode = (typeof CONCEPT_NODES)[number];

type SimNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  field: string;
};

type ConceptMapProps = {
  className?: string;
};

const NODE_RADIUS = 28;
const LABEL_FONT = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const SPRING_LENGTH = 140;
const SPRING_K = 0.006;
const REPULSION = 4000;
const CENTER_GRAVITY = 0.03;
const DOMAIN_CLUSTER_K = 0.08;
const DAMPING = 0.88;
const MIN_DIST = 60;
const MAX_SPEED = 8;

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return (hash & 0x7fffffff) / 0x7fffffff;
}

function initNodes(): SimNode[] {
  const fields = [...new Set(CONCEPT_NODES.map((n) => n.field))];
  return CONCEPT_NODES.map((node) => {
    const fieldIdx = fields.indexOf(node.field);
    const fieldAngle = (2 * Math.PI * fieldIdx) / fields.length;
    const jitterR = 80 + seededRandom(node.id + ':r') * 180;
    const jitterA = fieldAngle + (seededRandom(node.id + ':a') - 0.5) * 1.0;
    return {
      id: node.id,
      x: Math.cos(jitterA) * jitterR,
      y: Math.sin(jitterA) * jitterR,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null,
      field: node.field,
    };
  });
}

function computeDomainCenters(): Map<string, { x: number; y: number }> {
  const fields = [...new Set(CONCEPT_NODES.map((n) => n.field))].sort();
  const centers = new Map<string, { x: number; y: number }>();
  const radius = 300;
  fields.forEach((field, i) => {
    const angle = (2 * Math.PI * i) / fields.length;
    centers.set(field, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  });
  return centers;
}

function simulationTick(nodes: SimNode[], edges: { si: number; ti: number; strength: number }[], domainCenters: Map<string, { x: number; y: number }>) {
  const n = nodes.length;

  for (let i = 0; i < n; i++) {
    const a = nodes[i]!;
    if (a.fx !== null) { a.x = a.fx; a.y = a.fy!; a.vx = 0; a.vy = 0; continue; }

    let fx = 0;
    let fy = 0;

    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const b = nodes[j]!;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distSq = dx * dx + dy * dy || 1;
      const dist = Math.sqrt(distSq);
      const force = REPULSION / distSq;
      fx += (dx / dist) * force;
      fy += (dy / dist) * force;
    }

    const dc = domainCenters.get(a.field);
    if (dc) {
      fx += (dc.x - a.x) * DOMAIN_CLUSTER_K;
      fy += (dc.y - a.y) * DOMAIN_CLUSTER_K;
    }

    fx -= a.x * CENTER_GRAVITY;
    fy -= a.y * CENTER_GRAVITY;

    a.vx = (a.vx + fx) * DAMPING;
    a.vy = (a.vy + fy) * DAMPING;

    const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
    if (speed > MAX_SPEED) {
      a.vx = (a.vx / speed) * MAX_SPEED;
      a.vy = (a.vy / speed) * MAX_SPEED;
    }
  }

  for (const edge of edges) {
    const a = nodes[edge.si]!;
    const b = nodes[edge.ti]!;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const displacement = dist - SPRING_LENGTH;
    const force = SPRING_K * displacement * edge.strength;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;

    if (a.fx === null) { a.vx += fx; a.vy += fy; }
    if (b.fx === null) { b.vx -= fx; b.vy -= fy; }
  }

  for (let i = 0; i < n; i++) {
    const node = nodes[i]!;
    if (node.fx !== null) continue;
    node.x += node.vx;
    node.y += node.vy;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = nodes[i]!;
      const b = nodes[j]!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < MIN_DIST) {
        const overlap = (MIN_DIST - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;
        if (a.fx === null) { a.x -= nx * overlap; a.y -= ny * overlap; }
        if (b.fx === null) { b.x += nx * overlap; b.y += ny * overlap; }
      }
    }
  }
}

function buildEdges(): { si: number; ti: number; strength: number }[] {
  const nodeMap = new Map<string, number>();
  CONCEPT_NODES.forEach((n, i) => nodeMap.set(n.id, i));
  return CONCEPT_RELATIONS.map((r) => ({
    si: nodeMap.get(r.source) ?? 0,
    ti: nodeMap.get(r.target) ?? 0,
    strength: r.type === 'opposes' ? 0.5 : r.type === 'requires' ? 1.2 : 0.8,
  })).filter((e) => e.si !== e.ti);
}

export function ConceptMap({ className }: ConceptMapProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const edgesRef = useRef<ReturnType<typeof buildEdges>>([]);
  const domainCentersRef = useRef(computeDomainCenters());
  const animFrameRef = useRef<number>(0);
  const draggingRef = useRef<string | null>(null);

  const [tick, setTick] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFields, setActiveFields] = useState<Set<string>>(
    () => new Set([...new Set(CONCEPT_NODES.map((n) => n.field))]),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    nodesRef.current = initNodes();
    edgesRef.current = buildEdges();

    if (reduce) {
      for (let i = 0; i < 300; i++) {
        simulationTick(nodesRef.current, edgesRef.current, domainCentersRef.current);
      }
      setTick((t) => t + 1);
      return;
    }

    let iteration = 0;
    const maxIterations = 300;

    const step = () => {
      if (iteration >= maxIterations) return;
      simulationTick(nodesRef.current, edgesRef.current, domainCentersRef.current);
      iteration++;
      setTick((t) => t + 1);
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [reduce]);

  const fields = useMemo(
    () => [...new Set(CONCEPT_NODES.map((n) => n.field))],
    [],
  );

  const filteredNodes = useMemo(
    () =>
      CONCEPT_NODES.filter(
        (n) =>
          activeFields.has(n.field) &&
          (!searchQuery ||
            n.label.includes(searchQuery) ||
            n.label_en.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [activeFields, searchQuery],
  );

  const filteredNodeIds = useMemo(
    () => new Set(filteredNodes.map((n) => n.id)),
    [filteredNodes],
  );

  const filteredRelations = useMemo(
    () =>
      CONCEPT_RELATIONS.filter(
        (r) => filteredNodeIds.has(r.source) && filteredNodeIds.has(r.target),
      ),
    [filteredNodeIds],
  );

  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>();
    for (const r of CONCEPT_RELATIONS) {
      if (r.source === selectedId) ids.add(r.target);
      if (r.target === selectedId) ids.add(r.source);
    }
    ids.add(selectedId);
    return ids;
  }, [selectedId]);

  const handleFieldToggle = useCallback((field: string) => {
    setActiveFields((prev) => {
      const next = new Set(prev);
      if (next.has(field)) {
        if (next.size > 1) next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      router.push(`/philosophy/concepts/${id}`);
    },
    [router],
  );

  const handleFitToScreen = useCallback(() => {
    const container = containerRef.current;
    if (!container || nodesRef.current.length === 0) return;
    const w = container.clientWidth;
    const h = container.clientHeight;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const node of nodesRef.current) {
      if (node.x < minX) minX = node.x;
      if (node.x > maxX) maxX = node.x;
      if (node.y < minY) minY = node.y;
      if (node.y > maxY) maxY = node.y;
    }
    const pad = 80;
    const graphW = maxX - minX + pad * 2;
    const graphH = maxY - minY + pad * 2;
    const scale = Math.min(w / graphW, h / graphH, 2);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    setZoom(scale);
    setPanX(w / 2 - cx * scale);
    setPanY(h / 2 - cy * scale);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleFitToScreen, 500);
    return () => clearTimeout(timer);
  }, [handleFitToScreen]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((prev) => Math.min(5, Math.max(0.2, prev * delta)));
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const [viewBox, setViewBox] = useState('0 0 800 600');
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      setViewBox(`0 0 ${w} ${h}`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const getPointerGraphPos = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return { x: 0, y: 0 };
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      return {
        x: (px - panX) / zoom,
        y: (py - panY) / zoom,
      };
    },
    [panX, panY, zoom],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as SVGElement;
      const nodeGroup = target.closest('[data-node]');
      if (nodeGroup) {
        const nodeId = nodeGroup.getAttribute('data-node-id');
        if (nodeId) {
          draggingRef.current = nodeId;
          const node = nodesRef.current.find((n) => n.id === nodeId);
          if (node) {
            node.fx = node.x;
            node.fy = node.y;
          }
          e.stopPropagation();
          return;
        }
      }
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY, panX, panY };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [panX, panY],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingRef.current) {
        const pos = getPointerGraphPos(e);
        const node = nodesRef.current.find((n) => n.id === draggingRef.current);
        if (node) {
          node.fx = pos.x;
          node.fy = pos.y;
          node.x = pos.x;
          node.y = pos.y;
          setTick((t) => t + 1);
        }
        return;
      }
      if (!isPanning) return;
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPanX(panStartRef.current.panX + dx);
      setPanY(panStartRef.current.panY + dy);
    },
    [isPanning, getPointerGraphPos],
  );

  const handlePointerUp = useCallback(() => {
    if (draggingRef.current) {
      const node = nodesRef.current.find((n) => n.id === draggingRef.current);
      if (node) {
        node.fx = null;
        node.fy = null;
      }
      draggingRef.current = null;
      return;
    }
    setIsPanning(false);
  }, []);

  const nodePositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const node of nodesRef.current) {
      map.set(node.id, { x: node.x, y: node.y });
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick triggers recalculation when simulation mutates refs
  }, [tick]);

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {fields.map((field) => {
            const color = FIELD_COLORS[field] ?? '#9ca3af';
            const active = activeFields.has(field);
            return (
              <button
                key={field}
                type="button"
                onClick={() => handleFieldToggle(field)}
                className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all"
                style={{
                  borderColor: active ? color : 'rgba(255,255,255,0.1)',
                  backgroundColor: active ? `${color}20` : 'transparent',
                  color: active ? color : 'rgba(255,255,255,0.4)',
                }}
              >
                {field}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索概念…"
              className="w-36 rounded-lg border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-white/80 placeholder:text-white/25 focus:border-indigo-400/40 focus:outline-none sm:w-48"
            />
          </div>
          <button
            type="button"
            onClick={handleFitToScreen}
            className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80"
            aria-label="适应屏幕"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
              <rect x="3" y="3" width="10" height="10" rx="1.5" />
              <path d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(5, z * 1.2))}
              className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80"
              aria-label="放大"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M8 4v8M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.2, z * 0.8))}
              className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80"
              aria-label="缩小"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden"
        style={{ height: 'calc(100vh - 220px)', minHeight: 400, touchAction: 'none' }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          viewBox={viewBox}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            {Object.entries(RELATION_COLORS).map(([type, color]) => (
              <marker
                key={type}
                id={`arrow-${type}`}
                viewBox="0 0 6 6"
                refX="6"
                refY="3"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0 0L6 3L0 6z" fill={color} opacity="0.6" />
              </marker>
            ))}
          </defs>

          <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
            {filteredRelations.map((rel) => {
              const sPos = nodePositions.get(rel.source);
              const tPos = nodePositions.get(rel.target);
              if (!sPos || !tPos) return null;

              const isHighlighted =
                selectedId &&
                (rel.source === selectedId || rel.target === selectedId);
              const dimmed =
                selectedId &&
                !isHighlighted &&
                !(connectedIds.has(rel.source) && connectedIds.has(rel.target));
              const color = RELATION_COLORS[rel.type];
              const opacity = dimmed ? 0.06 : isHighlighted ? 0.7 : 0.2;

              const dx = tPos.x - sPos.x;
              const dy = tPos.y - sPos.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const offsetX = (dx / dist) * NODE_RADIUS;
              const offsetY = (dy / dist) * NODE_RADIUS;

              return (
                <g key={`${rel.source}-${rel.target}`}>
                  <line
                    x1={sPos.x + offsetX}
                    y1={sPos.y + offsetY}
                    x2={tPos.x - offsetX}
                    y2={tPos.y - offsetY}
                    stroke={color}
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeOpacity={opacity}
                    strokeDasharray={rel.type === 'opposes' ? '4,3' : undefined}
                    markerEnd={
                      rel.type === 'extends' || rel.type === 'requires'
                        ? `url(#arrow-${rel.type})`
                        : undefined
                    }
                  />
                  {isHighlighted && (
                    <text
                      x={(sPos.x + tPos.x) / 2}
                      y={(sPos.y + tPos.y) / 2 - 6}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                      fontFamily={LABEL_FONT}
                    >
                      {rel.description}
                    </text>
                  )}
                </g>
              );
            })}

            {filteredNodes.map((node) => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;
              const color = FIELD_COLORS[node.field] ?? '#9ca3af';
              const isHovered = hoveredId === node.id;
              const isSelected = selectedId === node.id;
              const dimmed =
                selectedId && !isSelected && !connectedIds.has(node.id);
              const r = isSelected ? NODE_RADIUS + 4 : isHovered ? NODE_RADIUS + 2 : NODE_RADIUS;

              return (
                <g
                  key={node.id}
                  data-node
                  data-node-id={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onPointerEnter={() => setHoveredId(node.id)}
                  onPointerLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    if (draggingRef.current) return;
                    e.stopPropagation();
                    handleNodeClick(node.id);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(node.id);
                  }}
                  style={{ cursor: draggingRef.current === node.id ? 'grabbing' : 'grab' }}
                >
                  <circle
                    r={r + 6}
                    fill={color}
                    opacity={isSelected ? 0.15 : isHovered ? 0.08 : 0}
                    className="transition-opacity duration-200"
                  />
                  <circle
                    r={r}
                    fill={`${color}20`}
                    stroke={color}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                    strokeOpacity={dimmed ? 0.2 : isSelected ? 1 : 0.6}
                    className="transition-all duration-200"
                  />
                  <text
                    textAnchor="middle"
                    dy="-2"
                    fill={dimmed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)'}
                    fontSize="13"
                    fontWeight="600"
                    fontFamily={LABEL_FONT}
                    className="pointer-events-none select-none"
                  >
                    {node.label}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="12"
                    fill={dimmed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)'}
                    fontSize="8"
                    fontFamily={LABEL_FONT}
                    className="pointer-events-none select-none"
                  >
                    {node.label_en}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {selectedId && (
          <div className="absolute bottom-4 left-4 z-10 max-w-xs rounded-xl border border-white/10 bg-[#111118]/90 p-4 backdrop-blur-xl">
            {(() => {
              const node = CONCEPT_NODES.find((n) => n.id === selectedId);
              if (!node) return null;
              const color = FIELD_COLORS[node.field] ?? '#9ca3af';
              const rels = CONCEPT_RELATIONS.filter(
                (r) => r.source === selectedId || r.target === selectedId,
              );
              return (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color }}>
                      {node.field}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {node.label}
                    <span className="ml-2 text-xs font-normal text-white/40">{node.label_en}</span>
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-white/30">
                    {rels.length} 个关联
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate(selectedId)}
                      className="rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs text-indigo-300 transition-colors hover:bg-indigo-500/30"
                    >
                      查看详情
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
                    >
                      取消选择
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 px-4 py-3">
        {(
          Object.entries(RELATION_COLORS) as [ConceptRelationType, string][]
        ).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="h-px w-4"
              style={{
                backgroundColor: color,
                borderTop: type === 'opposes' ? `1px dashed ${color}` : undefined,
              }}
            />
            <span className="font-mono text-[9px] text-white/40">
              {type === 'opposes'
                ? '对立'
                : type === 'requires'
                  ? '依赖'
                  : type === 'extends'
                    ? '延伸'
                    : '关联'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
