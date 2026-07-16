"use client";

import { useCallback, useEffect } from "react";
import type { GraphNode, GraphEdge } from "../data/types";
import type { GraphRenderer } from "@/lib/graph-engine";
import { animateFocus } from "@/lib/graph-engine";
import { toRenderNodes, toRenderEdges } from "../lib/constants";
import { buildPrimaryPrerequisitePath } from "../data/cognitive-metadata";

type InteractionDeps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rendererRef: React.MutableRefObject<GraphRenderer | null>;
  positionsRef: React.MutableRefObject<Map<string, { x: number; y: number }>>;
  cancelAnimRef: React.MutableRefObject<(() => void) | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  setHoveredNodeId: (v: string | null) => void;
  setSelectedNodeId: (v: string | null) => void;
  setSearchQuery: (v: string) => void;
  setZoom: (v: number) => void;
  setOffsetX: (v: number) => void;
  setOffsetY: (v: number) => void;
  setFocusedNodeIndex: (v: number) => void;
  setCursorPos: (v: { x: number; y: number }) => void;
  setShowMinimap: (v: boolean | ((prev: boolean) => boolean)) => void;
  nodeDomainMap: Map<string, string>;
  filteredNodes: GraphNode[];
  isMobile: boolean;
  stablePositions?: Map<string, { x: number; y: number }>;
};

export function useGraphInteractions(
  nodes: GraphNode[],
  edges: GraphEdge[],
  activeDomains: Set<string>,
  zoom: number,
  offsetX: number,
  offsetY: number,
  focusedNodeIndex: number,
  selectedNodeId: string | null,
  focusPrerequisitePath: boolean,
  deps: InteractionDeps
) {
  const {
    canvasRef,
    containerRef,
    rendererRef,
    positionsRef,
    cancelAnimRef,
    searchInputRef,
    setHoveredNodeId,
    setSelectedNodeId,
    setSearchQuery,
    setZoom,
    setOffsetX,
    setOffsetY,
    setFocusedNodeIndex,
    setCursorPos,
    nodeDomainMap,
    filteredNodes,
    isMobile,
    stablePositions,
  } = deps;

  const getFocusTarget = useCallback(
    (nodeId: string) => {
      const focusPositions = stablePositions ?? positionsRef.current;
      const fallback = focusPositions.get(nodeId);
      const container = containerRef.current;
      if (!fallback || !container) return null;

      const pathIds = focusPrerequisitePath ? buildPrimaryPrerequisitePath(nodeId, nodes) : [];
      const pathPositions = pathIds.flatMap((id) => {
        const position = focusPositions.get(id);
        return position ? [position] : [];
      });
      if (pathPositions.length < 2) {
        return {
          position: fallback,
          scale: 1.5,
          viewport: { width: container.clientWidth, height: container.clientHeight },
        };
      }

      const minX = Math.min(...pathPositions.map((position) => position.x));
      const maxX = Math.max(...pathPositions.map((position) => position.x));
      const minY = Math.min(...pathPositions.map((position) => position.y));
      const maxY = Math.max(...pathPositions.map((position) => position.y));
      const availableWidth = isMobile
        ? container.clientWidth
        : Math.max(container.clientWidth - 440, 360);
      const availableHeight = container.clientHeight;
      const padding = isMobile ? 100 : 72;
      const scale = Math.min(
        (availableWidth - padding * 2) / Math.max(maxX - minX, 1),
        (availableHeight - padding * 2) / Math.max(maxY - minY, 1),
        1.1
      );
      return {
        position: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
        scale,
        viewport: { width: availableWidth, height: availableHeight },
      };
    },
    [containerRef, focusPrerequisitePath, isMobile, nodes, positionsRef, stablePositions]
  );

  const restoreStablePositions = useCallback(() => {
    const renderer = rendererRef.current;
    if (!stablePositions || !renderer) return;
    positionsRef.current = stablePositions;
    renderer.render(
      toRenderNodes(nodes, stablePositions, null, selectedNodeId, activeDomains),
      toRenderEdges(edges, stablePositions, activeDomains, nodeDomainMap)
    );
  }, [
    activeDomains,
    edges,
    nodeDomainMap,
    nodes,
    positionsRef,
    rendererRef,
    selectedNodeId,
    stablePositions,
  ]);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  const handleSearchSelect = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);
      setSearchQuery("");

      const renderer = rendererRef.current;
      const focusTarget = getFocusTarget(nodeId);
      if (!renderer || !focusTarget) return;

      cancelAnimRef.current?.();
      restoreStablePositions();

      cancelAnimRef.current = animateFocus(
        { scale: zoom, offsetX, offsetY },
        focusTarget.position,
        focusTarget.scale,
        400,
        focusTarget.viewport,
        (t) => {
          renderer.setTransform(t.scale, t.offsetX, t.offsetY);
          setZoom(t.scale);
          setOffsetX(t.offsetX);
          setOffsetY(t.offsetY);
        }
      );
    },
    [
      zoom,
      offsetX,
      offsetY,
      rendererRef,
      cancelAnimRef,
      setSelectedNodeId,
      setSearchQuery,
      setZoom,
      setOffsetX,
      setOffsetY,
      getFocusTarget,
      restoreStablePositions,
    ]
  );

  const handleZoomIn = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const newScale = Math.min(5, zoom * 1.25);
    const cx = w / 2;
    const cy = h / 2;
    const worldCX = (cx - offsetX) / zoom;
    const worldCY = (cy - offsetY) / zoom;
    renderer.setTransform(newScale, cx - worldCX * newScale, cy - worldCY * newScale);
    setZoom(newScale);
  }, [zoom, offsetX, offsetY, rendererRef, containerRef, setZoom]);

  const handleZoomOut = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const newScale = Math.max(0.05, zoom / 1.25);
    const cx = w / 2;
    const cy = h / 2;
    const worldCX = (cx - offsetX) / zoom;
    const worldCY = (cy - offsetY) / zoom;
    renderer.setTransform(newScale, cx - worldCX * newScale, cy - worldCY * newScale);
    setZoom(newScale);
  }, [zoom, offsetX, offsetY, rendererRef, containerRef, setZoom]);

  const handleFitToScreen = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;

    const positions = positionsRef.current;
    if (positions.size === 0) return;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const pos of positions.values()) {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }

    const pad = 100;
    const worldW = maxX - minX + pad * 2 || 1;
    const worldH = maxY - minY + pad * 2 || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const scale = Math.min(w / worldW, h / worldH, 2);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    renderer.setTransform(scale, w / 2 - centerX * scale, h / 2 - centerY * scale);
    setZoom(scale);
  }, [rendererRef, containerRef, positionsRef, setZoom]);

  const handleMinimapNavigate = useCallback(
    (worldX: number, worldY: number) => {
      const renderer = rendererRef.current;
      const container = containerRef.current;
      if (!renderer || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setTransform(zoom, w / 2 - worldX * zoom, h / 2 - worldY * zoom);
    },
    [zoom, rendererRef, containerRef]
  );

  const handleDetailPanelClose = useCallback(() => {
    setSelectedNodeId(null);
    canvasRef.current?.focus();
  }, [setSelectedNodeId, canvasRef]);

  const handleDetailNodeClick = useCallback(
    (nodeId: string) => {
      const renderer = rendererRef.current;
      const focusTarget = getFocusTarget(nodeId);
      if (!renderer || !focusTarget) return;

      cancelAnimRef.current?.();
      restoreStablePositions();

      cancelAnimRef.current = animateFocus(
        { scale: zoom, offsetX, offsetY },
        focusTarget.position,
        focusTarget.scale,
        400,
        focusTarget.viewport,
        (t) => {
          renderer.setTransform(t.scale, t.offsetX, t.offsetY);
          setZoom(t.scale);
          setOffsetX(t.offsetX);
          setOffsetY(t.offsetY);
        }
      );

      setSelectedNodeId(nodeId);
    },
    [
      zoom,
      offsetX,
      offsetY,
      rendererRef,
      cancelAnimRef,
      setSelectedNodeId,
      setZoom,
      setOffsetX,
      setOffsetY,
      getFocusTarget,
      restoreStablePositions,
    ]
  );

  const focusNodeByIndex = useCallback(
    (index: number) => {
      const visibleNodes = filteredNodes;
      if (visibleNodes.length === 0) return;
      const clampedIndex =
        ((index % visibleNodes.length) + visibleNodes.length) % visibleNodes.length;
      setFocusedNodeIndex(clampedIndex);
      const node = visibleNodes[clampedIndex];
      if (!node) return;
      const pos = positionsRef.current.get(node.id);
      const renderer = rendererRef.current;
      if (!pos || !renderer) return;
      setHoveredNodeId(node.id);
      rendererRef.current?.render(
        toRenderNodes(nodes, positionsRef.current, node.id, selectedNodeId, activeDomains),
        toRenderEdges(edges, positionsRef.current, activeDomains, nodeDomainMap)
      );
    },
    [
      filteredNodes,
      nodes,
      edges,
      selectedNodeId,
      activeDomains,
      nodeDomainMap,
      positionsRef,
      rendererRef,
      setFocusedNodeIndex,
      setHoveredNodeId,
    ]
  );

  const handleCanvasKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (selectedNodeId) {
          setSelectedNodeId(null);
        }
        setFocusedNodeIndex(-1);
        setHoveredNodeId(null);
        return;
      }

      if (selectedNodeId) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          focusNodeByIndex(focusedNodeIndex + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          focusNodeByIndex(focusedNodeIndex - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedNodeIndex >= 0 && focusedNodeIndex < filteredNodes.length) {
            const node = filteredNodes[focusedNodeIndex];
            if (node) {
              setSelectedNodeId(node.id);
              const pos = positionsRef.current.get(node.id);
              const renderer = rendererRef.current;
              const container = containerRef.current;
              if (pos && renderer && container) {
                const w = container.clientWidth;
                const h = container.clientHeight;
                const targetScale = 1.5;
                renderer.setTransform(
                  targetScale,
                  w / 2 - pos.x * targetScale,
                  h / 2 - pos.y * targetScale
                );
                setZoom(targetScale);
              }
            }
          }
          break;
        case "/":
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
      }
    },
    [
      selectedNodeId,
      focusedNodeIndex,
      filteredNodes,
      focusNodeByIndex,
      setSelectedNodeId,
      setZoom,
      setFocusedNodeIndex,
      setHoveredNodeId,
      searchInputRef,
      positionsRef,
      rendererRef,
      containerRef,
    ]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, [containerRef, setCursorPos]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [searchInputRef]);

  return {
    handleSearchChange,
    handleSearchSelect,
    handleZoomIn,
    handleZoomOut,
    handleFitToScreen,
    handleMinimapNavigate,
    handleDetailPanelClose,
    handleDetailNodeClick,
    focusNodeByIndex,
    handleCanvasKeyDown,
  };
}
