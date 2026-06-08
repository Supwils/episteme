'use client';

import { useEffect, useCallback } from 'react';
import type { GraphNode, GraphEdge } from '../data/types';
import type { GraphRenderer, RenderNode, HighlightState, RenderConfig } from '@universe/graph-engine';
import { GraphRenderer as GraphRendererClass } from '@universe/graph-engine';
import type { ForceLayout } from '@universe/graph-engine';
import { animateEntrance, animateFocus, animateNodePositions } from '@universe/graph-engine';
import {
  buildLayoutNodes,
  buildLayoutEdges,
  toRenderNodes,
  toRenderEdges,
  NODE_RADIUS,
  DOMAIN_COLORS,
} from '../lib/constants';

type RendererDeps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rendererRef: React.MutableRefObject<GraphRenderer | null>;
  layoutRef: React.MutableRefObject<ForceLayout | null>;
  positionsRef: React.MutableRefObject<Map<string, { x: number; y: number }>>;
  animFrameRef: React.MutableRefObject<number>;
  cancelAnimRef: React.MutableRefObject<(() => void) | null>;
  spreadOffsetsRef: React.MutableRefObject<Map<string, { x: number; y: number }>>;
  setIsLoading: (v: boolean) => void;
  setHoveredNodeId: (v: string | null) => void;
  setSelectedNodeId: (v: string | null) => void;
  setZoom: (v: number) => void;
  setOffsetX: (v: number) => void;
  setOffsetY: (v: number) => void;
  setTooltipNode: (v: GraphNode | null) => void;
  setTooltipPos: (v: { x: number; y: number }) => void;
  nodeMap: Map<string, GraphNode>;
  activeDomains: Set<string>;
  nodeDomainMap: Map<string, string>;
  renderConfig: RenderConfig;
  highlightState: HighlightState;
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  reducedMotion: boolean;
  searchMatchedIds: Set<string>;
};

export function useGraphRenderer(
  nodes: GraphNode[],
  edges: GraphEdge[],
  initialFocus: string | undefined,
  onNodeClick: ((node: GraphNode) => void) | undefined,
  onNodeHover: ((node: GraphNode | null) => void) | undefined,
  deps: RendererDeps,
) {
  const {
    canvasRef,
    containerRef,
    rendererRef,
    layoutRef,
    positionsRef,
    animFrameRef,
    cancelAnimRef,
    spreadOffsetsRef,
    setIsLoading,
    setHoveredNodeId,
    setSelectedNodeId,
    setZoom,
    setOffsetX,
    setOffsetY,
    setTooltipNode,
    setTooltipPos,
    nodeMap,
    activeDomains,
    nodeDomainMap,
    renderConfig,
    highlightState,
    hoveredNodeId,
    selectedNodeId,
    reducedMotion,
    searchMatchedIds,
  } = deps;

  const pushRenderData = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rNodes = toRenderNodes(nodes, positionsRef.current, hoveredNodeId, selectedNodeId, activeDomains, spreadOffsetsRef.current, searchMatchedIds);
    const rEdges = toRenderEdges(edges, positionsRef.current, activeDomains, nodeDomainMap);
    renderer.render(rNodes, rEdges);
    renderer.setHighlight(highlightState);
  }, [nodes, edges, hoveredNodeId, selectedNodeId, activeDomains, nodeDomainMap, highlightState, rendererRef, positionsRef, spreadOffsetsRef, searchMatchedIds]);

  useEffect(() => {
    pushRenderData();
  }, [pushRenderData]);

  useEffect(() => {
    if (!selectedNodeId) {
      spreadOffsetsRef.current = new Map();
      pushRenderData();
      return;
    }

    const selectedPos = positionsRef.current.get(selectedNodeId);
    if (!selectedPos) return;

    const connected = new Set<string>();
    for (const edge of edges) {
      if (edge.source === selectedNodeId) connected.add(edge.target);
      if (edge.target === selectedNodeId) connected.add(edge.source);
    }
    if (connected.size === 0) return;

    const SPREAD_DISTANCE = 40;
    const targetOffsets = new Map<string, { x: number; y: number }>();
    for (const id of connected) {
      const pos = positionsRef.current.get(id);
      if (!pos) continue;
      const dx = pos.x - selectedPos.x;
      const dy = pos.y - selectedPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      targetOffsets.set(id, {
        x: (dx / dist) * SPREAD_DISTANCE,
        y: (dy / dist) * SPREAD_DISTANCE,
      });
    }

    const startOffsets = new Map<string, { x: number; y: number }>();
    for (const [id] of targetOffsets) {
      startOffsets.set(id, { x: 0, y: 0 });
    }

    animateNodePositions(
      startOffsets,
      targetOffsets,
      300,
      (offsets) => {
        spreadOffsetsRef.current = offsets;
        pushRenderData();
      },
    );
  }, [selectedNodeId, edges, pushRenderData, spreadOffsetsRef, positionsRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const layoutNodes = buildLayoutNodes(nodes);
    const layoutEdges = buildLayoutEdges(edges);

    setIsLoading(true);

    let cancelled = false;

    const initRenderer = (positions: Map<string, { x: number; y: number }>) => {
      if (cancelled) return;
      const finalPositions = positions;

      const renderer = new GraphRendererClass(canvas, renderConfig);
      rendererRef.current = renderer;

      renderer.setCallbacks({
        onNodeHover: (renderNode) => {
          const id = renderNode?.id ?? null;
          setHoveredNodeId(id);
          if (onNodeHover) {
            onNodeHover(id ? nodeMap.get(id) ?? null : null);
          }
        },
        onNodeSelect: (renderNode) => {
          const id = renderNode?.id ?? null;
          setSelectedNodeId(id);
          if (id && onNodeClick) {
            const node = nodeMap.get(id);
            if (node) onNodeClick(node);
          }
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
            const node = nodeMap.get(id);
            if (node) {
              setTooltipNode(node);
              setTooltipPos({ x: screenX, y: screenY });
              window.setTimeout(() => setTooltipNode(null), 3000);
            }
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
              renderer.setTransform(targetScale, w / 2 - pos.x * targetScale, h / 2 - pos.y * targetScale);
              setZoom(targetScale);
            }
            setSelectedNodeId(id);
            setTooltipNode(null);
          }
        },
      });

      const nodesByDomain = new Map<string, string[]>();
      for (const node of nodes) {
        if (!nodesByDomain.has(node.domain)) nodesByDomain.set(node.domain, []);
        nodesByDomain.get(node.domain)!.push(node.id);
      }

      setIsLoading(false);

      cancelAnimRef.current = animateEntrance(
        nodesByDomain,
        finalPositions,
        600,
        120,
        (posMap, alphas) => {
          if (cancelled) return;
          positionsRef.current = posMap;
          const rNodes: RenderNode[] = nodes
            .filter((n) => activeDomains.has(n.domain))
            .map((node) => {
              const pos = posMap.get(node.id) ?? { x: 0, y: 0 };
              return {
                id: node.id,
                x: pos.x,
                y: pos.y,
                label: node.label,
                domain: node.domain,
                type: node.type,
                radius: NODE_RADIUS[node.type] ?? 16,
                color: DOMAIN_COLORS[node.domain] ?? '#9ca3af',
                hovered: false,
                selected: false,
                searchMatched: false,
                alpha: alphas.get(node.id) ?? 0,
              };
            });
          const rEdges = toRenderEdges(edges, posMap, activeDomains, nodeDomainMap);
          renderer.render(rNodes, rEdges);
        },
        () => {
          if (cancelled) return;
          positionsRef.current = finalPositions;
          const rNodes = toRenderNodes(nodes, finalPositions, null, null, activeDomains, undefined, searchMatchedIds);
          const rEdges = toRenderEdges(edges, finalPositions, activeDomains, nodeDomainMap);
          renderer.render(rNodes, rEdges);

          if (initialFocus) {
            const pos = finalPositions.get(initialFocus);
            if (pos) {
              const container = containerRef.current;
              if (container) {
                const w = container.clientWidth;
                const h = container.clientHeight;
                const targetScale = 1.5;
                animateFocus(
                  { scale: 1, offsetX: 0, offsetY: 0 },
                  pos,
                  targetScale,
                  400,
                  { width: w, height: h },
                  (t) => {
                    renderer.setTransform(t.scale, t.offsetX, t.offsetY);
                    setZoom(t.scale);
                    setOffsetX(t.offsetX);
                    setOffsetY(t.offsetY);
                  },
                );
                setSelectedNodeId(initialFocus);
              }
            }
          }
        },
      );
    };

    const runSync = async () => {
      const { ForceLayout: ForceLayoutClass } = await import('@universe/graph-engine');
      if (cancelled) return;
      const layout = new ForceLayoutClass(layoutNodes, layoutEdges);
      layoutRef.current = layout;
      layout.runToStability();
      initRenderer(layout.getPositions());
    };

    let worker: Worker | null = null;
    if (typeof Worker !== 'undefined' && !reducedMotion) {
      try {
        worker = new Worker(
          new URL('../engine/force-layout.worker.ts', import.meta.url),
        );
        worker.onmessage = (e: MessageEvent<{ type: string; positions: [string, { x: number; y: number }][] }>) => {
          if (e.data.type === 'result') {
            const positions = new Map(e.data.positions);
            initRenderer(positions);
          }
        };
        worker.onerror = () => {
          runSync();
        };
        worker.postMessage({
          type: 'run',
          nodes: layoutNodes,
          edges: layoutEdges,
        });
      } catch {
        runSync();
      }
    } else {
      runSync();
    }

    const currentAnimFrame = animFrameRef.current;
    return () => {
      cancelAnimationFrame(currentAnimFrame);
      cancelAnimRef.current?.();
      worker?.terminate();
      rendererRef.current?.destroy();
      rendererRef.current = null;
      layoutRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  return { pushRenderData };
}

