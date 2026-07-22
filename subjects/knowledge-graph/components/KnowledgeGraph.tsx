"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import type { GraphNode, GraphEdge } from "../data/types";
import { GraphFilterBar } from "./GraphFilterBar";
import { GraphMinimap } from "./GraphMinimap";
import { GraphLegend } from "./GraphLegend";
import { GraphDetailPanel } from "./GraphDetailPanel";
import { GraphA11yAnnouncer } from "./GraphA11yAnnouncer";
import { GraphTooltip } from "./GraphTooltip";
import { CognitiveLevelAxis } from "./CognitiveLevelAxis";
import { SpatialGraphControls } from "./SpatialGraphControls";
import { SpatialClusterSummary } from "./SpatialClusterSummary";
import { THOUGHT_TOURS } from "../data/thought-tours";
import { useGraphState, useIsMobile } from "../hooks/useGraphState";
import { useGraphRenderer } from "../hooks/useGraphRenderer";
import { useGraphAnimations } from "../hooks/useGraphAnimations";
import { useGraphInteractions } from "../hooks/useGraphInteractions";
import { parseKnowledgeLevel, type KnowledgeLevel } from "@/lib/knowledge-levels";
import { buildCognitiveSubgraph } from "../data/cognitive-metadata";
import { buildCognitiveLayoutPositions, type GraphLayoutMode } from "../lib/cognitive-layout";
import { buildSpatialGraphProjection, rotationForSpatialDomain } from "../lib/spatial-layout";
import { buildSpatialDomainSummary } from "../lib/spatial-aggregation";
import {
  graphViewUrlKey,
  parseGraphViewUrlState,
  writeGraphViewUrlState,
} from "../lib/graph-view-url-state";
import { CLUSTER_CENTERS } from "../lib/constants";
import type { LayoutConfig } from "@/lib/graph-engine";
import { CURATED_LEARNING_PATHS } from "../data/curated-learning-paths";
import {
  getCuratedConfluenceNodeIds,
  getCuratedConfluenceEdgeKeys,
  getCuratedConfluenceBridgeEdges,
  getCuratedConfluenceTargetNodeId,
  getCuratedKnowledgeConfluence,
} from "../data/curated-confluences";
import { ConfluenceGraphNotice } from "./ConfluenceGraphNotice";
import {
  buildKnowledgeFrontierSnapshot,
  KNOWLEDGE_FRONTIER_STATUS_META,
  type KnowledgeFrontierStatus,
} from "@/lib/knowledge-frontier";
import { setKnowledgeNodeMastered, useKnowledgeProfile } from "@/lib/knowledge-profile";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function parseFrontierStatus(value: string | null): KnowledgeFrontierStatus | null {
  return value && value in KNOWLEDGE_FRONTIER_STATUS_META
    ? (value as KnowledgeFrontierStatus)
    : null;
}

export type KnowledgeGraphProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick?: (node: GraphNode) => void;
  onNodeHover?: (node: GraphNode | null) => void;
  initialFocus?: string;
};

export function KnowledgeGraph({
  nodes,
  edges,
  onNodeClick,
  onNodeHover,
  initialFocus,
}: KnowledgeGraphProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedGraphView = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      key: graphViewUrlKey(params),
      state: parseGraphViewUrlState(params),
    };
  }, [searchParams]);
  const requestedCuratedPathId = searchParams.get("path");
  const requestedFocusNodeId = searchParams.get("focus");
  const requestedDomainId = searchParams.get("domain");
  const requestedConfluenceId = searchParams.get("confluence");
  const requestedFrontierValue = searchParams.get("frontier");
  const requestedFrontierStatus = parseFrontierStatus(requestedFrontierValue);
  const profile = useKnowledgeProfile();
  const knownIds = useMemo(() => profile.entries.map((entry) => entry.nodeId), [profile.entries]);
  const frontierSnapshot = useMemo(
    () => buildKnowledgeFrontierSnapshot(nodes, knownIds),
    [knownIds, nodes]
  );
  const activeConfluence = getCuratedKnowledgeConfluence(requestedConfluenceId);
  const activeConfluenceNodeIds = useMemo(
    () => (activeConfluence ? getCuratedConfluenceNodeIds(activeConfluence) : []),
    [activeConfluence]
  );
  const activeConfluenceNodeIdSet = useMemo(
    () => new Set(activeConfluenceNodeIds),
    [activeConfluenceNodeIds]
  );
  const activeConfluenceEdgeKeys = useMemo(
    () => (activeConfluence ? getCuratedConfluenceEdgeKeys(activeConfluence) : new Set<string>()),
    [activeConfluence]
  );
  const activeConfluenceTargetNodeId = activeConfluence
    ? getCuratedConfluenceTargetNodeId(activeConfluence)
    : null;
  const requestedDomainIsValid = requestedDomainId
    ? nodes.some((node) => node.domain === requestedDomainId)
    : false;
  const activeCuratedPath = activeConfluence
    ? undefined
    : CURATED_LEARNING_PATHS.find((path) => path.id === requestedCuratedPathId);
  const activeCuratedFocusStep = activeCuratedPath?.steps.find(
    (step) => step.nodeId === requestedFocusNodeId
  );
  const activeCuratedTargetStep = activeCuratedFocusStep ?? activeCuratedPath?.steps.at(-1);
  const frontierStatus = activeConfluence || activeCuratedPath ? null : requestedFrontierStatus;
  const frontierNodes = useMemo(
    () =>
      frontierStatus
        ? nodes.filter((node) => frontierSnapshot.states.get(node.id)?.status === frontierStatus)
        : nodes,
    [frontierSnapshot.states, frontierStatus, nodes]
  );
  const activeCuratedTraceNodes = useMemo(() => {
    if (!activeCuratedPath || !activeCuratedTargetStep) return null;
    const targetIndex = activeCuratedPath.steps.indexOf(activeCuratedTargetStep);
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    return activeCuratedPath.steps
      .slice(0, targetIndex + 1)
      .map((step) => nodeMap.get(step.nodeId))
      .filter((node): node is GraphNode => Boolean(node));
  }, [activeCuratedPath, activeCuratedTargetStep, nodes]);
  const knowledgeLevel = activeConfluence
    ? 5
    : activeCuratedPath
      ? (activeCuratedTargetStep?.level ?? 5)
      : parseKnowledgeLevel(searchParams.get("level"));
  const defaultLayoutMode: GraphLayoutMode = knowledgeLevel ? "cognitive" : "force";
  const [selectedType, setSelectedType] = useState<GraphNode["type"] | null>(null);
  const [layoutMode, setLayoutMode] = useState<GraphLayoutMode>(
    () => requestedGraphView.state.layoutMode ?? defaultLayoutMode
  );
  const [spatialRotation, setSpatialRotation] = useState(
    () => requestedGraphView.state.spatialRotation
  );
  const [spatialLevel, setSpatialLevel] = useState<KnowledgeLevel | null>(
    () => requestedGraphView.state.spatialLevel
  );
  const graphFilterLevel = layoutMode === "spatial" ? null : knowledgeLevel;

  const cognitiveSubgraph = useMemo(
    () => buildCognitiveSubgraph(frontierNodes, graphFilterLevel, selectedType),
    [frontierNodes, graphFilterLevel, selectedType]
  );
  const visibleNodes = cognitiveSubgraph.nodes;
  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map((node) => node.id)),
    [visibleNodes]
  );
  const visibleEdges = useMemo(() => {
    const filtered = edges.filter(
      (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );
    if (!activeConfluence) return filtered;
    const pairKeys = new Set(
      filtered.map((edge) =>
        edge.source < edge.target
          ? `${edge.source}|${edge.target}`
          : `${edge.target}|${edge.source}`
      )
    );
    for (const edge of getCuratedConfluenceBridgeEdges(activeConfluence)) {
      const key =
        edge.source < edge.target
          ? `${edge.source}|${edge.target}`
          : `${edge.target}|${edge.source}`;
      if (pairKeys.has(key)) continue;
      filtered.push(edge);
      pairKeys.add(key);
    }
    return filtered;
  }, [activeConfluence, edges, visibleNodeIds]);
  const cognitivePositions = useMemo(
    () =>
      layoutMode === "cognitive"
        ? buildCognitiveLayoutPositions(
            visibleNodes,
            visibleEdges,
            isMobile ? "vertical" : "horizontal"
          )
        : undefined,
    [isMobile, layoutMode, visibleEdges, visibleNodes]
  );
  const spatialProjection = useMemo(
    () =>
      layoutMode === "spatial"
        ? buildSpatialGraphProjection(visibleNodes, visibleEdges, spatialRotation)
        : undefined,
    [layoutMode, spatialRotation, visibleEdges, visibleNodes]
  );
  const spatialFrontDomainId = spatialProjection?.frontDomainId ?? null;
  const spatialSummary = useMemo(
    () =>
      spatialProjection && spatialFrontDomainId
        ? buildSpatialDomainSummary(
            visibleNodes,
            visibleEdges,
            spatialFrontDomainId,
            spatialProjection.importanceByNode
          )
        : null,
    [spatialFrontDomainId, spatialProjection, visibleEdges, visibleNodes]
  );
  const deterministicPositions = spatialProjection?.positions ?? cognitivePositions;
  const forceLayoutConfig = useMemo<Partial<LayoutConfig> | undefined>(
    () =>
      layoutMode === "cluster"
        ? {
            clusterMode: true,
            clusterCenters: CLUSTER_CENTERS,
            clusterStrength: 0.5,
          }
        : undefined,
    [layoutMode]
  );
  const emphasizedNodeIds = useMemo(() => {
    const emphasized = new Set<string>(
      activeConfluence
        ? activeConfluenceNodeIdSet
        : layoutMode === "cognitive" && knowledgeLevel
          ? cognitiveSubgraph.targetNodeIds
          : []
    );
    if (layoutMode === "spatial" && spatialFrontDomainId && spatialLevel) {
      for (const node of visibleNodes) {
        if (
          node.domain === spatialFrontDomainId &&
          (node.knowledgeLevel ?? 2) === spatialLevel
        ) {
          emphasized.add(node.id);
        }
      }
    }
    return emphasized;
  }, [
    activeConfluence,
    activeConfluenceNodeIdSet,
    cognitiveSubgraph.targetNodeIds,
    knowledgeLevel,
    layoutMode,
    spatialFrontDomainId,
    spatialLevel,
    visibleNodes,
  ]);

  const state = useGraphState(
    visibleNodes,
    visibleEdges,
    isMobile,
    emphasizedNodeIds,
    activeConfluenceEdgeKeys,
    layoutMode === "cognitive" && !activeConfluence
  );
  const selectedNodeId = state.selectedNodeId;
  const setSelectedNodeId = state.setSelectedNodeId;
  const setActiveDomains = state.setActiveDomains;
  const allNodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);
  const selectedFrontierState = selectedNodeId
    ? frontierSnapshot.states.get(selectedNodeId)
    : undefined;
  const selectedFrontierGapNodes = selectedFrontierState
    ? selectedFrontierState.gapIds
        .slice(0, 5)
        .flatMap((id) => (allNodeMap.has(id) ? [allNodeMap.get(id)!] : []))
    : [];
  const appliedCuratedPathRef = useRef<string | null>(null);
  const appliedFocusNodeRef = useRef<string | null>(null);
  const appliedDomainRef = useRef<string | null>(null);
  const appliedConfluenceRef = useRef<string | null>(null);
  const appliedGraphViewKeyRef = useRef(requestedGraphView.key);

  useEffect(() => {
    if (appliedGraphViewKeyRef.current === requestedGraphView.key) return;
    appliedGraphViewKeyRef.current = requestedGraphView.key;
    setLayoutMode(requestedGraphView.state.layoutMode ?? defaultLayoutMode);
    if (requestedGraphView.state.layoutMode === "spatial") {
      setSpatialRotation(requestedGraphView.state.spatialRotation);
      setSpatialLevel(requestedGraphView.state.spatialLevel);
    } else {
      setSpatialLevel(null);
    }
  }, [defaultLayoutMode, requestedGraphView]);

  useEffect(() => {
    if (
      layoutMode !== "spatial" ||
      requestedGraphView.state.layoutMode !== "spatial" ||
      !spatialProjection
    ) {
      return;
    }
    const timeout = window.setTimeout(
      () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        const nextParams = writeGraphViewUrlState(
          currentParams,
          "spatial",
          spatialRotation,
          spatialProjection.frontDomainId,
          spatialLevel
        );
        if (nextParams.toString() === currentParams.toString()) return;
        router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
      },
      reducedMotion ? 0 : 160
    );
    return () => window.clearTimeout(timeout);
  }, [
    layoutMode,
    pathname,
    reducedMotion,
    requestedGraphView.state.layoutMode,
    router,
    searchParams,
    spatialProjection,
    spatialLevel,
    spatialRotation,
  ]);

  useEffect(() => {
    if (!requestedFrontierValue || requestedFrontierStatus) return;
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("frontier");
    if (nextParams.get("source") === "knowledge-frontier") nextParams.delete("source");
    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, requestedFrontierStatus, requestedFrontierValue, router, searchParams]);

  useEffect(() => {
    if (requestedConfluenceId && !activeConfluence) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("confluence");
      if (nextParams.get("source") === "knowledge-confluence") nextParams.delete("source");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }
    if (!activeConfluence || !activeConfluenceTargetNodeId) {
      appliedConfluenceRef.current = null;
      return;
    }

    const requestedFocusIsValid = requestedFocusNodeId
      ? activeConfluenceNodeIdSet.has(requestedFocusNodeId)
      : false;
    const nextFocus = requestedFocusIsValid ? requestedFocusNodeId! : activeConfluenceTargetNodeId;
    const spatialViewRequested = requestedGraphView.state.layoutMode === "spatial";
    if (
      (spatialViewRequested
        ? searchParams.has("level")
        : searchParams.get("level") !== "5") ||
      searchParams.get("focus") !== nextFocus ||
      searchParams.has("path") ||
      (requestedGraphView.state.layoutMode !== null &&
        requestedGraphView.state.layoutMode !== "cognitive" &&
        requestedGraphView.state.layoutMode !== "spatial")
    ) {
      let nextParams = new URLSearchParams(searchParams.toString());
      if (spatialViewRequested) {
        nextParams.delete("level");
      } else {
        nextParams.set("level", "5");
      }
      nextParams.set("focus", nextFocus);
      nextParams.delete("path");
      nextParams.set("source", "knowledge-confluence");
      if (requestedGraphView.state.layoutMode !== "spatial") {
        nextParams = writeGraphViewUrlState(nextParams, "cognitive", 0, null);
      }
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
      return;
    }

    if (requestedGraphView.state.layoutMode !== "spatial") {
      setLayoutMode("cognitive");
    }
    if (appliedConfluenceRef.current !== activeConfluence.id) {
      const domains = new Set(
        nodes.filter((node) => activeConfluenceNodeIdSet.has(node.id)).map((node) => node.domain)
      );
      if (domains.size > 0) setActiveDomains(domains);
      appliedConfluenceRef.current = activeConfluence.id;
    }
  }, [
    activeConfluence,
    activeConfluenceNodeIdSet,
    activeConfluenceTargetNodeId,
    nodes,
    pathname,
    requestedConfluenceId,
    requestedFocusNodeId,
    requestedGraphView.state.layoutMode,
    router,
    searchParams,
    setActiveDomains,
  ]);

  useEffect(() => {
    if (requestedDomainId && !requestedDomainIsValid) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("domain");
      if (nextParams.get("source") === "terrain-diagnostic") nextParams.delete("source");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }
    if (!requestedDomainId || appliedDomainRef.current === requestedDomainId) return;
    appliedDomainRef.current = requestedDomainId;
    setActiveDomains(new Set([requestedDomainId]));
  }, [pathname, requestedDomainId, requestedDomainIsValid, router, searchParams, setActiveDomains]);

  useEffect(() => {
    if (selectedNodeId && !visibleNodeIds.has(selectedNodeId)) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId, setSelectedNodeId, visibleNodeIds]);

  const { pushRenderData } = useGraphRenderer(
    visibleNodes,
    visibleEdges,
    initialFocus,
    deterministicPositions,
    spatialProjection?.depthByNode,
    spatialProjection?.importanceByNode,
    spatialProjection?.guides,
    forceLayoutConfig,
    onNodeClick,
    onNodeHover,
    {
      canvasRef: state.canvasRef,
      containerRef: state.containerRef,
      rendererRef: state.rendererRef,
      layoutRef: state.layoutRef,
      positionsRef: state.positionsRef,
      animFrameRef: state.animFrameRef,
      cancelAnimRef: state.cancelAnimRef,
      spreadOffsetsRef: state.spreadOffsetsRef,
      setIsLoading: state.setIsLoading,
      setHoveredNodeId: state.setHoveredNodeId,
      setSelectedNodeId: state.setSelectedNodeId,
      setZoom: state.setZoom,
      setOffsetX: state.setOffsetX,
      setOffsetY: state.setOffsetY,
      setTooltipNode: state.setTooltipNode,
      setTooltipPos: state.setTooltipPos,
      nodeMap: state.nodeMap,
      activeDomains: state.activeDomains,
      nodeDomainMap: state.nodeDomainMap,
      renderConfig: state.renderConfig,
      highlightState: state.highlightState,
      hoveredNodeId: state.hoveredNodeId,
      selectedNodeId: state.selectedNodeId,
      reducedMotion: reducedMotion ?? false,
      searchMatchedIds: state.searchMatchedIds,
      fitScaleMultiplier: layoutMode === "spatial" && isMobile ? 1.7 : 1,
    }
  );

  const { handleDomainToggle } = useGraphAnimations(
    visibleNodes,
    visibleEdges,
    state.hoveredNodeId,
    state.selectedNodeId,
    {
      rendererRef: state.rendererRef,
      layoutRef: state.layoutRef,
      positionsRef: state.positionsRef,
      animFrameRef: state.animFrameRef,
      cancelAnimRef: state.cancelAnimRef,
      setClusterMode: state.setClusterMode,
      nodeDomainMap: state.nodeDomainMap,
      pushRenderData,
      reducedMotion: reducedMotion ?? false,
      searchMatchedIds: state.searchMatchedIds,
      nodeDepth: spatialProjection?.depthByNode,
      nodeImportance: spatialProjection?.importanceByNode,
    }
  );

  const interactions = useGraphInteractions(
    visibleNodes,
    visibleEdges,
    state.activeDomains,
    state.zoom,
    state.offsetX,
    state.offsetY,
    state.focusedNodeIndex,
    state.selectedNodeId,
    layoutMode === "cognitive",
    {
      canvasRef: state.canvasRef,
      containerRef: state.containerRef,
      rendererRef: state.rendererRef,
      positionsRef: state.positionsRef,
      cancelAnimRef: state.cancelAnimRef,
      searchInputRef: state.searchInputRef,
      setHoveredNodeId: state.setHoveredNodeId,
      setSelectedNodeId: state.setSelectedNodeId,
      setSearchQuery: state.setSearchQuery,
      setZoom: state.setZoom,
      setOffsetX: state.setOffsetX,
      setOffsetY: state.setOffsetY,
      setFocusedNodeIndex: state.setFocusedNodeIndex,
      setCursorPos: state.setCursorPos,
      setShowMinimap: state.setShowMinimap,
      nodeDomainMap: state.nodeDomainMap,
      filteredNodes: state.filteredNodes,
      isMobile,
      stablePositions: deterministicPositions,
      nodeDepth: spatialProjection?.depthByNode,
      nodeImportance: spatialProjection?.importanceByNode,
      fitScaleMultiplier: layoutMode === "spatial" && isMobile ? 1.7 : 1,
    }
  );
  const focusCuratedPathTarget = interactions.handleSearchSelect;
  const focusTourStep = useCallback(
    (nodeId: string) => {
      focusCuratedPathTarget(nodeId);
      if (isMobile) setSelectedNodeId(null);
    },
    [focusCuratedPathTarget, isMobile, setSelectedNodeId]
  );
  const fitToScreenRef = useRef(interactions.handleFitToScreen);
  fitToScreenRef.current = interactions.handleFitToScreen;

  useEffect(() => {
    if (layoutMode !== "cognitive" && layoutMode !== "spatial") return;
    const timeout = window.setTimeout(() => fitToScreenRef.current(), reducedMotion ? 0 : 320);
    return () => window.clearTimeout(timeout);
  }, [isMobile, layoutMode, reducedMotion]);

  useEffect(() => {
    if (requestedCuratedPathId && !activeCuratedPath) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("path");
      if (nextParams.get("source") === "curated-path") nextParams.delete("source");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }

    if (
      activeCuratedPath &&
      ((requestedGraphView.state.layoutMode === "spatial"
        ? searchParams.has("level")
        : searchParams.get("level") !== String(activeCuratedTargetStep?.level ?? 5)) ||
        (requestedFocusNodeId && !activeCuratedFocusStep))
    ) {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (requestedGraphView.state.layoutMode === "spatial") {
        nextParams.delete("level");
      } else {
        nextParams.set("level", String(activeCuratedTargetStep?.level ?? 5));
      }
      if (requestedFocusNodeId && !activeCuratedFocusStep) nextParams.delete("focus");
      nextParams.set("source", "curated-path");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }

    if (!activeCuratedPath) {
      appliedCuratedPathRef.current = null;
      return;
    }
    const targetNodeId = activeCuratedTargetStep?.nodeId;
    const appliedKey = targetNodeId ? `${activeCuratedPath.id}:${targetNodeId}` : null;
    if (state.isLoading || !appliedKey || appliedCuratedPathRef.current === appliedKey) return;

    if (!targetNodeId || !visibleNodeIds.has(targetNodeId)) return;
    appliedCuratedPathRef.current = appliedKey;
    focusCuratedPathTarget(targetNodeId);
  }, [
    activeCuratedPath,
    activeCuratedFocusStep,
    activeCuratedTargetStep,
    focusCuratedPathTarget,
    pathname,
    requestedCuratedPathId,
    requestedFocusNodeId,
    requestedGraphView.state.layoutMode,
    router,
    searchParams,
    state.isLoading,
    visibleNodeIds,
  ]);

  useEffect(() => {
    if (activeCuratedPath) return;
    if (!requestedFocusNodeId) {
      appliedFocusNodeRef.current = null;
      return;
    }

    const focusNode = nodes.find((node) => node.id === requestedFocusNodeId);
    if (!focusNode) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("focus");
      if (nextParams.get("source") === "continuum-node") nextParams.delete("source");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }
    if (
      layoutMode !== "spatial" &&
      !activeConfluence &&
      focusNode.knowledgeLevel !== knowledgeLevel
    ) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.set("level", String(focusNode.knowledgeLevel));
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
      return;
    }
    if (
      state.isLoading ||
      appliedFocusNodeRef.current === requestedFocusNodeId ||
      !visibleNodeIds.has(requestedFocusNodeId)
    ) {
      return;
    }
    appliedFocusNodeRef.current = requestedFocusNodeId;
    focusCuratedPathTarget(requestedFocusNodeId);
  }, [
    activeCuratedPath,
    activeConfluence,
    focusCuratedPathTarget,
    knowledgeLevel,
    layoutMode,
    nodes,
    pathname,
    requestedFocusNodeId,
    router,
    searchParams,
    state.isLoading,
    visibleNodeIds,
  ]);

  const [crossDomainOnly, setCrossDomainOnly] = useState(false);
  const handleCrossDomainToggle = () => {
    const next = !crossDomainOnly;
    setCrossDomainOnly(next);
    state.rendererRef.current?.setCrossDomainOnly(next);
  };

  const handleKnowledgeLevelChange = (level: KnowledgeLevel | null) => {
    if (level) setLayoutMode("cognitive");
    let nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("path");
    nextParams.delete("focus");
    nextParams.delete("confluence");
    if (
      ["curated-path", "continuum-node", "knowledge-confluence"].includes(
        nextParams.get("source") ?? ""
      )
    ) {
      nextParams.delete("source");
    }
    if (level) {
      nextParams.set("level", String(level));
      nextParams = writeGraphViewUrlState(nextParams, "cognitive", 0, null);
    } else {
      nextParams.delete("level");
    }
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleFrontierStatusChange = (status: KnowledgeFrontierStatus | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    setSelectedType(null);
    setSelectedNodeId(null);
    if (status) {
      nextParams.set("frontier", status);
      nextParams.delete("path");
      nextParams.delete("confluence");
      nextParams.delete("focus");
      nextParams.set("source", "knowledge-frontier");
    } else {
      nextParams.delete("frontier");
      if (nextParams.get("source") === "knowledge-frontier") nextParams.delete("source");
    }
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleCuratedPathChange = (pathId: string | null) => {
    let nextParams = new URLSearchParams(searchParams.toString());
    setSelectedType(null);
    if (pathId) {
      setLayoutMode("cognitive");
      nextParams.delete("focus");
      nextParams.delete("domain");
      nextParams.delete("confluence");
      nextParams.delete("frontier");
      nextParams.set("path", pathId);
      nextParams.set("level", "5");
      nextParams.set("source", "curated-path");
      nextParams = writeGraphViewUrlState(nextParams, "cognitive", 0, null);
    } else {
      nextParams.delete("path");
      if (nextParams.get("source") === "curated-path") nextParams.delete("source");
    }
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleLayoutModeChange = (mode: GraphLayoutMode) => {
    setLayoutMode(mode);
    const nextParams = writeGraphViewUrlState(
      new URLSearchParams(searchParams.toString()),
      mode,
      spatialRotation,
      mode === "spatial" ? (spatialProjection?.frontDomainId ?? null) : null,
      mode === "spatial" ? spatialLevel : null
    );
    if (
      mode !== "cognitive" &&
      mode !== "spatial" &&
      (activeCuratedPath || activeConfluence || requestedFocusNodeId)
    ) {
      nextParams.delete("path");
      nextParams.delete("focus");
      nextParams.delete("confluence");
      if (
        ["curated-path", "continuum-node", "knowledge-confluence"].includes(
          nextParams.get("source") ?? ""
        )
      ) {
        nextParams.delete("source");
      }
    }
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSpatialLevelChange = (level: KnowledgeLevel | null) => {
    if (!spatialProjection) return;
    setSpatialLevel(level);
    const nextParams = writeGraphViewUrlState(
      new URLSearchParams(searchParams.toString()),
      "spatial",
      spatialRotation,
      spatialProjection.frontDomainId,
      level
    );
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleConfluenceExit = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("confluence");
    nextParams.delete("focus");
    if (nextParams.get("source") === "knowledge-confluence") nextParams.delete("source");
    appliedConfluenceRef.current = null;
    setSelectedNodeId(null);
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const onDomainToggleWithAnimation = (domain: string) => {
    const prev = state.activeDomains;
    const next = new Set(prev);
    const isRemoving = next.has(domain);
    if (isRemoving) {
      if (next.size > 1) next.delete(domain);
    } else {
      next.add(domain);
    }
    state.setActiveDomains(next);
    handleDomainToggle(domain, prev, next);
    if (requestedDomainId) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("domain");
      if (nextParams.get("source") === "terrain-diagnostic") nextParams.delete("source");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      appliedDomainRef.current = null;
    }
  };

  const spatialMinimap = useMemo(() => {
    if (!spatialProjection) return null;
    const nodes = state.filteredNodes.flatMap((node) => {
      const position = spatialProjection.positions.get(node.id);
      return position ? [{ ...position, domain: node.domain }] : [];
    });
    if (nodes.length === 0) return null;
    const minX = Math.min(...nodes.map((node) => node.x));
    const maxX = Math.max(...nodes.map((node) => node.x));
    const minY = Math.min(...nodes.map((node) => node.y));
    const maxY = Math.max(...nodes.map((node) => node.y));
    const padding = 200;
    return {
      nodes,
      bounds: {
        minX: minX - padding,
        maxX: maxX + padding,
        minY: minY - padding,
        maxY: maxY + padding,
      },
    };
  }, [spatialProjection, state.filteredNodes]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#08080f] text-white">
      <GraphA11yAnnouncer
        nodeCount={state.announcerProps.nodeCount ?? 0}
        edgeCount={state.announcerProps.edgeCount ?? 0}
        selectedLabel={state.announcerProps.selectedLabel}
        selectedType={state.announcerProps.selectedType}
        selectedDomain={state.announcerProps.selectedDomain}
        filteredNodeCount={state.announcerProps.filteredNodeCount}
      />

      <div className="relative z-[60] shrink-0 px-3 py-2 sm:px-4 sm:py-2.5">
        <GraphFilterBar
          activeDomains={state.activeDomains}
          onDomainToggle={onDomainToggleWithAnimation}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          knowledgeLevel={knowledgeLevel}
          onKnowledgeLevelChange={handleKnowledgeLevelChange}
          frontierStatus={frontierStatus}
          frontierSummary={frontierSnapshot.summary}
          onFrontierStatusChange={handleFrontierStatusChange}
          searchQuery={state.searchQuery}
          onSearchChange={interactions.handleSearchChange}
          searchResults={state.searchResults}
          onSearchSelect={interactions.handleSearchSelect}
          zoom={state.zoom}
          onZoomIn={interactions.handleZoomIn}
          onZoomOut={interactions.handleZoomOut}
          onFitToScreen={interactions.handleFitToScreen}
          crossDomainOnly={crossDomainOnly}
          onCrossDomainToggle={handleCrossDomainToggle}
          layoutMode={layoutMode}
          onLayoutModeChange={handleLayoutModeChange}
          curatedPaths={CURATED_LEARNING_PATHS}
          activeCuratedPathId={activeCuratedPath?.id ?? null}
          onCuratedPathChange={handleCuratedPathChange}
          isMobile={isMobile}
          searchInputRef={state.searchInputRef}
          nodes={visibleNodes}
          pathStartId={state.pathStartId}
          pathEndId={state.pathEndId}
          pathResult={state.pathResult}
          onPathFind={state.handlePathFind}
          onPathClear={state.handlePathClear}
          nodeMap={state.nodeMap}
          edgeLabelMap={state.edgeLabelMap}
          tours={THOUGHT_TOURS}
          onTourSelect={state.handleTourSelect}
          onTourStepSelect={focusTourStep}
          isGraphReady={!state.isLoading}
          detailPanelOpen={Boolean(state.selectedNode)}
        />
      </div>

      {activeConfluence ? (
        <ConfluenceGraphNotice
          confluence={activeConfluence}
          highlightedNodeCount={activeConfluenceNodeIds.length}
          onExit={handleConfluenceExit}
        />
      ) : null}

      <div className="relative flex min-h-0 flex-1">
        <div
          ref={state.containerRef}
          className="relative flex-1 overflow-hidden"
          role="application"
          aria-label="知识图谱可视化区域"
          aria-roledescription="交互式知识图谱"
        >
          {layoutMode === "cognitive" ? (
            <CognitiveLevelAxis activeLevel={knowledgeLevel} isMobile={isMobile} />
          ) : null}
          {spatialProjection ? (
            <>
              <SpatialGraphControls
                rotation={spatialRotation}
                frontDomainId={spatialProjection.frontDomainId}
                activeDomains={state.activeDomains}
                onRotationChange={setSpatialRotation}
                onFocusDomain={(domainId) => setSpatialRotation(rotationForSpatialDomain(domainId))}
                isMobile={isMobile}
              />
              {spatialSummary ? (
                <SpatialClusterSummary
                  summary={spatialSummary}
                  selectedLevel={spatialLevel}
                  onLevelSelect={handleSpatialLevelChange}
                  onNodeFocus={interactions.handleSearchSelect}
                  isMobile={isMobile}
                />
              ) : null}
            </>
          ) : null}
          <canvas
            ref={state.canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ touchAction: "none" }}
            tabIndex={0}
            role="img"
            aria-label={`知识图谱，包含 ${visibleNodes.length} 个节点和 ${visibleEdges.length} 条边。使用方向键浏览节点，回车键查看详情，斜杠键搜索。`}
            onKeyDown={interactions.handleCanvasKeyDown}
            onFocus={() => {
              if (state.focusedNodeIndex < 0 && state.filteredNodes.length > 0) {
                interactions.focusNodeByIndex(0);
              }
            }}
            onBlur={() => {
              state.setFocusedNodeIndex(-1);
            }}
          />

          {state.isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#08080f]/80 backdrop-blur-sm">
              <div
                className="flex flex-col items-center gap-3"
                style={{
                  animation: reducedMotion ? "none" : "kg-fade-in 0.3s ease-out forwards",
                  opacity: reducedMotion ? 1 : 0,
                }}
              >
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400" />
                <p className="text-sm text-white/40">正在计算力导向布局…</p>
              </div>
            </div>
          )}

          <GraphTooltip
            node={
              state.tooltipNode ??
              (!state.selectedNodeId && state.hoveredNodeId
                ? (state.nodeMap.get(state.hoveredNodeId) ?? null)
                : null)
            }
            position={state.tooltipNode ? state.tooltipPos : state.cursorPos}
            connectedCount={state.hoveredNodeConnectedCount}
          />

          {!state.isLoading && (
            <div className={clsx("absolute z-20", "bottom-4 left-4", "md:bottom-4 md:left-4")}>
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => state.setShowMinimap((v) => !v)}
                  className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl md:h-8 md:w-8"
                  aria-label={state.showMinimap ? "隐藏小地图" : "显示小地图"}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <rect x="2" y="2" width="12" height="12" rx="1.5" />
                    <rect x="5" y="5" width="6" height="4" rx="0.5" />
                  </svg>
                </button>
              ) : null}
              {(state.showMinimap || !isMobile) && (
                <GraphMinimap
                  nodes={spatialMinimap?.nodes ?? state.minimapNodes}
                  viewport={state.viewport}
                  worldBounds={spatialMinimap?.bounds ?? state.worldBounds}
                  onNavigate={interactions.handleMinimapNavigate}
                />
              )}
            </div>
          )}

          {isMobile && !state.isLoading && (
            <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-2">
              <button
                type="button"
                onClick={interactions.handleZoomIn}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="放大"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path d="M8 4v8M4 8h8" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={interactions.handleZoomOut}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="缩小"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path d="M4 8h8" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={interactions.handleFitToScreen}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="适应屏幕"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <rect x="3" y="3" width="10" height="10" rx="1.5" />
                  <path
                    d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <GraphDetailPanel
          node={state.selectedNode}
          connectedNodes={state.connectedNodes}
          connectedEdges={state.connectedEdges}
          prerequisitePathNodes={activeCuratedTraceNodes ?? state.prerequisitePathNodes}
          frontierState={selectedFrontierState}
          frontierGapNodes={selectedFrontierGapNodes}
          onSetMastered={(mastered) => {
            if (state.selectedNodeId) setKnowledgeNodeMastered(state.selectedNodeId, mastered);
          }}
          curatedPath={activeCuratedPath}
          onClose={interactions.handleDetailPanelClose}
          onNodeClick={interactions.handleDetailNodeClick}
          isMobile={isMobile}
        />
      </div>

      <div className="hidden shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 md:block">
        <GraphLegend
          nodeCounts={state.nodeCounts}
          edgeCounts={state.edgeCounts}
          knowledgeLevel={knowledgeLevel}
          targetNodeCount={cognitiveSubgraph.targetNodeIds.size}
        />
      </div>
    </div>
  );
}
