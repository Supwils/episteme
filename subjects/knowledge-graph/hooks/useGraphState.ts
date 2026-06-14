"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { GraphNode, GraphEdge } from "../data/types";
import type { GraphRenderer, HighlightState, RenderConfig } from "@/lib/graph-engine";
import type { ForceLayout } from "@/lib/graph-engine";
import { buildAdjacency, getNodesWithinHops, findShortestPath } from "@/lib/graph-engine";
import { searchNodes } from "@/lib/graph-engine";
import type { GroupedSearchResult } from "../components/GraphFilterBar";
import type { GraphA11yAnnouncerProps } from "../components/GraphA11yAnnouncer";
import {
  DOMAIN_COLORS,
  NODE_RADIUS,
  EDGE_COLOR,
  BG_COLOR,
  LABEL_FONT,
  LABEL_COLOR,
  HIGHLIGHT_COLOR,
  NODE_TYPE_LABELS,
  ALL_DOMAINS,
  computeNodeCounts,
  computeEdgeCounts,
} from "../lib/constants";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function useGraphState(nodes: GraphNode[], edges: GraphEdge[], isMobile: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<GraphRenderer | null>(null);
  const layoutRef = useRef<ForceLayout | null>(null);
  const positionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const animFrameRef = useRef<number>(0);
  const cancelAnimRef = useRef<(() => void) | null>(null);
  const spreadOffsetsRef = useRef<Map<string, { x: number; y: number }>>(new Map());

  const [isLoading, setIsLoading] = useState(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  // Show all 10 domains by default (the old 4-domain default predated the
  // economics/psychology/CS/political-science/cosmology/mathematics additions,
  // which left 6 domains hidden until toggled). Users can filter down.
  const [activeDomains, setActiveDomains] = useState<Set<string>>(() => new Set(ALL_DOMAINS));
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [animatedPath, setAnimatedPath] = useState<string[]>([]);
  const [clusterMode, setClusterMode] = useState(false);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState<number>(-1);
  const [announcerProps, setAnnouncerProps] = useState<Partial<GraphA11yAnnouncerProps>>({});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showMinimap, setShowMinimap] = useState(!isMobile);
  const [tooltipNode, setTooltipNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [pathStartId, setPathStartId] = useState<string | null>(null);
  const [pathEndId, setPathEndId] = useState<string | null>(null);
  const [pathResult, setPathResult] = useState<string[] | null>(null);

  const renderConfig = useMemo<RenderConfig>(
    () => ({
      nodeRadius: Object.fromEntries(
        Object.entries(NODE_RADIUS).map(([k, v]) => [k, isMobile ? v * 1.5 : v])
      ),
      domainColors: DOMAIN_COLORS,
      edgeColor: EDGE_COLOR,
      backgroundColor: BG_COLOR,
      labelFont: LABEL_FONT,
      labelColor: LABEL_COLOR,
      highlightColor: HIGHLIGHT_COLOR,
    }),
    [isMobile]
  );

  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    for (const node of nodes) map.set(node.id, node);
    return map;
  }, [nodes]);

  const nodeDomainMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const node of nodes) map.set(node.id, node.domain);
    return map;
  }, [nodes]);

  // One search pass (top 30) feeds both the grouped result list (top 12) and
  // the highlight id set — previously the same 960-node scan ran twice.
  const searchRaw = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchNodes(searchQuery, nodes, { maxResults: 30 });
  }, [nodes, searchQuery]);

  const searchResults = useMemo<GroupedSearchResult[]>(() => {
    const grouped = new Map<string, GroupedSearchResult>();
    for (const result of searchRaw.slice(0, 12)) {
      const domain = result.node.domain;
      let group = grouped.get(domain);
      if (!group) {
        group = { domain, items: [] };
        grouped.set(domain, group);
      }
      group.items.push({
        node: {
          id: result.node.id,
          label: result.node.label,
          domain: result.node.domain,
          type: result.node.type,
        },
        score: result.score,
        matchField: result.matchField,
      });
    }
    return Array.from(grouped.values());
  }, [searchRaw]);

  const searchMatchedIds = useMemo<Set<string>>(
    () => new Set(searchRaw.map((r) => r.node.id)),
    [searchRaw]
  );

  const adjacency = useMemo(() => buildAdjacency(edges), [edges]);

  const handlePathFind = useCallback(
    (startId: string, endId: string) => {
      setPathStartId(startId);
      setPathEndId(endId);
      const path = findShortestPath(startId, endId, adjacency);
      setPathResult(path);
      setAnimatedPath(path ?? []);
    },
    [adjacency]
  );

  const handlePathClear = useCallback(() => {
    setPathStartId(null);
    setPathEndId(null);
    setPathResult(null);
    setAnimatedPath([]);
  }, []);

  const filteredNodes = useMemo(
    () => nodes.filter((n) => activeDomains.has(n.domain)),
    [nodes, activeDomains]
  );

  const filteredEdges = useMemo(
    () =>
      edges.filter((e) => {
        const sd = nodeDomainMap.get(e.source);
        const td = nodeDomainMap.get(e.target);
        return (
          sd !== undefined && td !== undefined && activeDomains.has(sd) && activeDomains.has(td)
        );
      }),
    [edges, nodeDomainMap, activeDomains]
  );

  const selectedNode = selectedNodeId ? (nodeMap.get(selectedNodeId) ?? null) : null;

  const connectedNodes = useMemo<GraphNode[]>(() => {
    if (!selectedNodeId) return [];
    const ids = new Set<string>();
    for (const edge of edges) {
      if (edge.source === selectedNodeId) ids.add(edge.target);
      if (edge.target === selectedNodeId) ids.add(edge.source);
    }
    return nodes.filter((n) => ids.has(n.id));
  }, [selectedNodeId, edges, nodes]);

  const connectedEdges = useMemo<GraphEdge[]>(() => {
    if (!selectedNodeId) return [];
    return edges.filter((e) => e.source === selectedNodeId || e.target === selectedNodeId);
  }, [selectedNodeId, edges]);

  const highlightState = useMemo<HighlightState>(() => {
    if (!selectedNodeId) {
      return { nodeIds: new Set(), edgeKeys: new Set(), pathNodes: [], dimAlpha: 1 };
    }
    const highlightedNodeIds = getNodesWithinHops(selectedNodeId, 1, adjacency);
    const highlightedEdgeKeys = new Set<string>();
    for (const edge of edges) {
      if (
        (edge.source === selectedNodeId && highlightedNodeIds.has(edge.target)) ||
        (edge.target === selectedNodeId && highlightedNodeIds.has(edge.source))
      ) {
        highlightedEdgeKeys.add(`${edge.source}->${edge.target}`);
      }
    }
    if (animatedPath.length > 1) {
      for (let i = 0; i < animatedPath.length - 1; i++) {
        highlightedEdgeKeys.add(`${animatedPath[i]}->${animatedPath[i + 1]}`);
        highlightedEdgeKeys.add(`${animatedPath[i + 1]}->${animatedPath[i]}`);
      }
      for (const id of animatedPath) highlightedNodeIds.add(id);
    }
    return {
      nodeIds: highlightedNodeIds,
      edgeKeys: highlightedEdgeKeys,
      pathNodes: animatedPath,
      dimAlpha: 0.3,
    };
  }, [selectedNodeId, adjacency, edges, animatedPath]);

  const nodeCounts = useMemo(() => computeNodeCounts(nodes, activeDomains), [nodes, activeDomains]);

  const edgeCounts = useMemo(() => computeEdgeCounts(edges), [edges]);

  // Recompute once the force layout has populated positions (isLoading flips
  // false after positionsRef is filled). With an empty-deps array this used to
  // run only at mount on an empty Map, leaving Infinity bounds → NaN minimap.
  const worldBounds = useMemo(() => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const pos of positionsRef.current.values()) {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }
    const pad = 200;
    // Positions not laid out yet — return a finite default so the minimap math
    // (worldWidth = maxX - minX) never produces NaN.
    if (!Number.isFinite(minX)) {
      return { minX: -2000, maxX: 2000, minY: -2000, maxY: 2000 };
    }
    return {
      minX: minX - pad,
      maxX: maxX + pad,
      minY: minY - pad,
      maxY: maxY + pad,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, nodes]);

  const viewport = useMemo(() => {
    const renderer = rendererRef.current;
    if (!renderer) return { x: 0, y: 0, width: 1, height: 1 };
    const tl = renderer.screenToWorld(0, 0);
    const br = renderer.screenToWorld(
      containerRef.current?.clientWidth ?? 800,
      containerRef.current?.clientHeight ?? 600
    );
    return { x: tl.x, y: tl.y, width: br.x - tl.x, height: br.y - tl.y };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, offsetX, offsetY]);

  const minimapNodes = useMemo(
    () =>
      filteredNodes.map((n) => ({
        x: positionsRef.current.get(n.id)?.x ?? 0,
        y: positionsRef.current.get(n.id)?.y ?? 0,
        domain: n.domain,
      })),
    [filteredNodes]
  );

  const hoveredNodeConnectedCount = useMemo(() => {
    if (!hoveredNodeId) return 0;
    let count = 0;
    for (const edge of edges) {
      if (edge.source === hoveredNodeId || edge.target === hoveredNodeId) count++;
    }
    return count;
  }, [hoveredNodeId, edges]);

  useEffect(() => {
    if (selectedNode) {
      setAnnouncerProps((prev) => ({
        ...prev,
        selectedLabel: selectedNode.label,
        selectedType: NODE_TYPE_LABELS[selectedNode.type] ?? selectedNode.type,
        selectedDomain: selectedNode.domain,
      }));
    }
  }, [selectedNode]);

  useEffect(() => {
    const count = filteredNodes.length;
    if (!isLoading) {
      setAnnouncerProps((prev) => ({
        ...prev,
        nodeCount: nodes.length,
        edgeCount: edges.length,
        filteredNodeCount: count !== nodes.length ? count : null,
      }));
    }
  }, [filteredNodes.length, nodes.length, edges.length, isLoading]);

  return {
    canvasRef,
    containerRef,
    rendererRef,
    layoutRef,
    positionsRef,
    searchInputRef,
    animFrameRef,
    cancelAnimRef,
    spreadOffsetsRef,
    isLoading,
    setIsLoading,
    hoveredNodeId,
    setHoveredNodeId,
    selectedNodeId,
    setSelectedNodeId,
    activeDomains,
    setActiveDomains,
    searchQuery,
    setSearchQuery,
    zoom,
    setZoom,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    animatedPath,
    setAnimatedPath,
    clusterMode,
    setClusterMode,
    focusedNodeIndex,
    setFocusedNodeIndex,
    announcerProps,
    cursorPos,
    setCursorPos,
    showMinimap,
    setShowMinimap,
    tooltipNode,
    setTooltipNode,
    tooltipPos,
    setTooltipPos,
    renderConfig,
    nodeMap,
    nodeDomainMap,
    searchResults,
    searchMatchedIds,
    filteredNodes,
    filteredEdges,
    selectedNode,
    connectedNodes,
    connectedEdges,
    adjacency,
    highlightState,
    nodeCounts,
    edgeCounts,
    worldBounds,
    viewport,
    minimapNodes,
    hoveredNodeConnectedCount,
    pathStartId,
    pathEndId,
    pathResult,
    handlePathFind,
    handlePathClear,
  };
}
