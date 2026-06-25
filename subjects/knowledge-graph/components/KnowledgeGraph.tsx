"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { GraphNode, GraphEdge } from "../data/types";
import { GraphFilterBar } from "./GraphFilterBar";
import { GraphMinimap } from "./GraphMinimap";
import { GraphLegend } from "./GraphLegend";
import { GraphDetailPanel } from "./GraphDetailPanel";
import { GraphA11yAnnouncer } from "./GraphA11yAnnouncer";
import { GraphTooltip } from "./GraphTooltip";
import { THOUGHT_TOURS } from "../data/thought-tours";
import { useGraphState, useIsMobile } from "../hooks/useGraphState";
import { useGraphRenderer } from "../hooks/useGraphRenderer";
import { useGraphAnimations } from "../hooks/useGraphAnimations";
import { useGraphInteractions } from "../hooks/useGraphInteractions";

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

  const state = useGraphState(nodes, edges, isMobile);

  const { pushRenderData } = useGraphRenderer(
    nodes,
    edges,
    initialFocus,
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
    }
  );

  const { handleDomainToggle, handleClusterToggle } = useGraphAnimations(
    nodes,
    edges,
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
    }
  );

  const interactions = useGraphInteractions(
    nodes,
    edges,
    state.activeDomains,
    state.zoom,
    state.offsetX,
    state.offsetY,
    state.focusedNodeIndex,
    state.selectedNodeId,
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
    }
  );

  const [crossDomainOnly, setCrossDomainOnly] = useState(false);
  const handleCrossDomainToggle = () => {
    const next = !crossDomainOnly;
    setCrossDomainOnly(next);
    state.rendererRef.current?.setCrossDomainOnly(next);
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
  };

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

      <div className="relative z-30 shrink-0 px-3 py-2 sm:px-4 sm:py-2.5">
        <GraphFilterBar
          activeDomains={state.activeDomains}
          onDomainToggle={onDomainToggleWithAnimation}
          searchQuery={state.searchQuery}
          onSearchChange={interactions.handleSearchChange}
          searchResults={state.searchResults}
          onSearchSelect={interactions.handleSearchSelect}
          zoom={state.zoom}
          onZoomIn={interactions.handleZoomIn}
          onZoomOut={interactions.handleZoomOut}
          onFitToScreen={interactions.handleFitToScreen}
          clusterMode={state.clusterMode}
          onClusterToggle={handleClusterToggle}
          crossDomainOnly={crossDomainOnly}
          onCrossDomainToggle={handleCrossDomainToggle}
          isMobile={isMobile}
          searchInputRef={state.searchInputRef}
          nodes={nodes}
          pathStartId={state.pathStartId}
          pathEndId={state.pathEndId}
          pathResult={state.pathResult}
          onPathFind={state.handlePathFind}
          onPathClear={state.handlePathClear}
          nodeMap={state.nodeMap}
          edgeLabelMap={state.edgeLabelMap}
          tours={THOUGHT_TOURS}
          onTourSelect={state.handleTourSelect}
        />
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div
          ref={state.containerRef}
          className="relative flex-1 overflow-hidden"
          role="application"
          aria-label="知识图谱可视化区域"
          aria-roledescription="交互式知识图谱"
        >
          <canvas
            ref={state.canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ touchAction: "none" }}
            tabIndex={0}
            role="img"
            aria-label={`知识图谱，包含 ${nodes.length} 个节点和 ${edges.length} 条边。使用方向键浏览节点，回车键查看详情，斜杠键搜索。`}
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
                  nodes={state.minimapNodes}
                  viewport={state.viewport}
                  worldBounds={state.worldBounds}
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
          onClose={interactions.handleDetailPanelClose}
          onNodeClick={interactions.handleDetailNodeClick}
        />
      </div>

      <div className="hidden shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 md:block">
        <GraphLegend nodeCounts={state.nodeCounts} edgeCounts={state.edgeCounts} />
      </div>
    </div>
  );
}
