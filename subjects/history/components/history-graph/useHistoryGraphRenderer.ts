"use client";

import { useEffect, useCallback } from "react";
import { ForceLayout, GraphRenderer, animateEntrance } from "@/lib/graph-engine";
import type { LayoutNode, LayoutEdge, RenderNode, RenderEdge } from "@/lib/graph-engine";
import type { HistoryGraphState } from "./useHistoryGraphState";
import { NODE_RADIUS, NODE_COLORS, EDGE_COLORS, EDGE_WIDTHS } from "./constants";

export function useHistoryGraphRenderer(state: HistoryGraphState, reducedMotion: boolean | null) {
  const {
    canvasRef,
    containerRef,
    rendererRef,
    layoutRef,
    positionsRef,
    filteredNodes,
    filteredEdges,
    nodeMap,
    renderConfig,
    hoveredNodeId,
    selectedNodeId,
    setIsLoading,
    setHoveredNodeId,
    setSelectedNodeId,
    setTooltipNode,
    setTooltipPos,
    setZoom,
    setOffsetX,
    setOffsetY,
    filterOptions,
  } = state;

  const toRenderNodesFn = useCallback(
    (positions: Map<string, { x: number; y: number }>): RenderNode[] => {
      return filteredNodes.map((node) => {
        const pos = positions.get(node.id);
        return {
          id: node.id,
          x: pos?.x ?? 0,
          y: pos?.y ?? 0,
          label: node.label,
          domain: "history",
          type: node.type,
          radius: NODE_RADIUS[node.type] ?? 12,
          color: NODE_COLORS[node.type] ?? "#f59e0b",
          hovered: node.id === hoveredNodeId,
          selected: node.id === selectedNodeId,
          searchMatched: false,
          alpha: 1,
        };
      });
    },
    [filteredNodes, hoveredNodeId, selectedNodeId]
  );

  const toRenderEdgesFn = useCallback(
    (positions: Map<string, { x: number; y: number }>): RenderEdge[] => {
      return filteredEdges.map((edge) => {
        const s = positions.get(edge.source);
        const t = positions.get(edge.target);
        return {
          x1: s?.x ?? 0,
          y1: s?.y ?? 0,
          x2: t?.x ?? 0,
          y2: t?.y ?? 0,
          color: EDGE_COLORS[edge.type] ?? "rgba(255, 255, 255, 0.06)",
          width: EDGE_WIDTHS[edge.type] ?? 0.8,
          alpha: 0.6,
          sourceId: edge.source,
          targetId: edge.target,
        };
      });
    },
    [filteredEdges]
  );

  const pushRenderData = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rNodes = toRenderNodesFn(positionsRef.current);
    const rEdges = toRenderEdgesFn(positionsRef.current);
    renderer.render(rNodes, rEdges);

    if (selectedNodeId) {
      const connected = new Set<string>();
      for (const edge of filteredEdges) {
        if (edge.source === selectedNodeId) connected.add(edge.target);
        if (edge.target === selectedNodeId) connected.add(edge.source);
      }
      connected.add(selectedNodeId);
      renderer.setHighlight({
        nodeIds: connected,
        edgeKeys: new Set(
          filteredEdges
            .filter(
              (e) =>
                (e.source === selectedNodeId && connected.has(e.target)) ||
                (e.target === selectedNodeId && connected.has(e.source))
            )
            .map((e) => `${e.source}->${e.target}`)
        ),
        pathNodes: [],
        dimAlpha: 0.25,
      });
    } else {
      renderer.setHighlight({
        nodeIds: new Set(),
        edgeKeys: new Set(),
        pathNodes: [],
        dimAlpha: 1,
      });
    }
  }, [selectedNodeId, filteredEdges, rendererRef, positionsRef, toRenderNodesFn, toRenderEdgesFn]);

  useEffect(() => {
    pushRenderData();
  }, [pushRenderData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const layoutNodes: LayoutNode[] = filteredNodes.map((node) => {
      const eraIndex = node.era ? filterOptions.eras.findIndex((e) => e.id === node.era) : 0;
      const angle =
        (2 * Math.PI * (eraIndex >= 0 ? eraIndex : 0)) / Math.max(filterOptions.eras.length, 1);
      const jitterR = 80 + Math.random() * 200;
      const jitterA = angle + (Math.random() - 0.5) * 1.2;
      return {
        id: node.id,
        x: Math.cos(jitterA) * jitterR,
        y: Math.sin(jitterA) * jitterR,
        vx: 0,
        vy: 0,
        domain: "history",
      };
    });

    const layoutEdges: LayoutEdge[] = filteredEdges.map((e) => ({
      source: e.source,
      target: e.target,
      strength: e.type === "era-seq" ? 0.5 : e.type === "figure-event" ? 1.2 : 0.8,
    }));

    setIsLoading(true);
    let cancelled = false;

    const initRenderer = (positions: Map<string, { x: number; y: number }>) => {
      if (cancelled) return;
      positionsRef.current = positions;

      const renderer = new GraphRenderer(canvas, renderConfig);
      rendererRef.current = renderer;

      renderer.setCallbacks({
        onNodeHover: (renderNode) => {
          const id = renderNode?.id ?? null;
          setHoveredNodeId(id);
          if (id) {
            const node = nodeMap.get(id) ?? null;
            setTooltipNode(node);
          } else {
            setTooltipNode(null);
          }
        },
        onNodeSelect: (renderNode) => {
          const id = renderNode?.id ?? null;
          setSelectedNodeId(id);
          setTooltipNode(null);
        },
        onPan: (ox, oy) => {
          setOffsetX(ox);
          setOffsetY(oy);
        },
        onZoom: (scale, ox, oy) => {
          setZoom(scale);
          setOffsetX(ox);
          setOffsetY(oy);
        },
        onLongPress: (renderNode, screenX, screenY) => {
          const id = renderNode?.id ?? null;
          if (id) {
            const node = nodeMap.get(id) ?? null;
            setTooltipNode(node);
            setTooltipPos({ x: screenX, y: screenY });
            window.setTimeout(() => setTooltipNode(null), 3000);
          }
        },
        onDoubleTap: (renderNode) => {
          const id = renderNode?.id ?? null;
          if (id) {
            const pos = positionsRef.current.get(id);
            const container = containerRef.current;
            if (pos && container) {
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
            setSelectedNodeId(id);
            setTooltipNode(null);
          }
        },
      });

      setIsLoading(false);

      const nodesByType = new Map<string, string[]>();
      for (const node of filteredNodes) {
        const type = node.type;
        if (!nodesByType.has(type)) nodesByType.set(type, []);
        nodesByType.get(type)!.push(node.id);
      }

      animateEntrance(
        nodesByType,
        positions,
        600,
        120,
        (posMap, alphas) => {
          if (cancelled) return;
          positionsRef.current = posMap;
          const rNodes: RenderNode[] = filteredNodes.map((node) => {
            const pos = posMap.get(node.id) ?? { x: 0, y: 0 };
            return {
              id: node.id,
              x: pos.x,
              y: pos.y,
              label: node.label,
              domain: "history",
              type: node.type,
              radius: NODE_RADIUS[node.type] ?? 12,
              color: NODE_COLORS[node.type] ?? "#f59e0b",
              hovered: false,
              selected: false,
              searchMatched: false,
              alpha: alphas.get(node.id) ?? 0,
            };
          });
          const rEdges = toRenderEdgesFn(posMap);
          renderer.render(rNodes, rEdges);
        },
        () => {
          if (cancelled) return;
          positionsRef.current = positions;
          const rNodes = toRenderNodesFn(positions);
          const rEdges = toRenderEdgesFn(positions);
          renderer.render(rNodes, rEdges);
        }
      );
    };

    const runSync = () => {
      const layout = new ForceLayout(layoutNodes, layoutEdges, {
        repulsionStrength: 600,
        attractionStrength: 0.008,
        centerGravity: 0.08,
        domainClusterStrength: 0.2,
        damping: 0.88,
        minDistance: 25,
        maxIterations: 300,
      });
      layoutRef.current = layout;
      layout.runToStability();
      initRenderer(layout.getPositions());
    };

    let worker: Worker | null = null;
    if (typeof Worker !== "undefined" && !reducedMotion) {
      try {
        // Must be a RELATIVE specifier — bundlers don't resolve the `@/` alias
        // inside `new URL(..., import.meta.url)`, which silently fails to load
        // the worker and surfaces as an `[object Event]` error overlay.
        worker = new Worker(
          new URL("../../../knowledge-graph/engine/force-layout.worker.ts", import.meta.url)
        );
        worker.onmessage = (
          e: MessageEvent<{ type: string; positions: [string, { x: number; y: number }][] }>
        ) => {
          if (e.data.type === "result") {
            const positions = new Map(e.data.positions);
            initRenderer(positions);
          }
        };
        worker.onerror = (event) => {
          // Stop the ErrorEvent from bubbling to the global handler (dev overlay
          // would otherwise render it as `[object Event]`); fall back to sync.
          event.preventDefault();
          worker?.terminate();
          runSync();
        };
        worker.postMessage({
          type: "run",
          nodes: layoutNodes,
          edges: layoutEdges,
        });
      } catch {
        runSync();
      }
    } else {
      runSync();
    }

    return () => {
      cancelled = true;
      worker?.terminate();
      rendererRef.current?.destroy();
      rendererRef.current = null;
      layoutRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredNodes, filteredEdges]);
}
