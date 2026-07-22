"use client";

import { useCallback } from "react";
import type { GraphNode, GraphEdge } from "../data/types";
import type { GraphRenderer } from "@/lib/graph-engine";
import type { ForceLayout } from "@/lib/graph-engine";
import { animateAlpha, animateNodePositions } from "@/lib/graph-engine";
import { toRenderNodes, toRenderEdges, CLUSTER_CENTERS } from "../lib/constants";

type AnimationDeps = {
  rendererRef: React.MutableRefObject<GraphRenderer | null>;
  layoutRef: React.MutableRefObject<ForceLayout | null>;
  positionsRef: React.MutableRefObject<Map<string, { x: number; y: number }>>;
  animFrameRef: React.MutableRefObject<number>;
  cancelAnimRef: React.MutableRefObject<(() => void) | null>;
  setClusterMode: React.Dispatch<React.SetStateAction<boolean>>;
  nodeDomainMap: Map<string, string>;
  pushRenderData: () => void;
  reducedMotion: boolean;
  searchMatchedIds: Set<string>;
  nodeDepth?: ReadonlyMap<string, number>;
  nodeImportance?: ReadonlyMap<string, number>;
};

export function useGraphAnimations(
  nodes: GraphNode[],
  edges: GraphEdge[],
  hoveredNodeId: string | null,
  selectedNodeId: string | null,
  deps: AnimationDeps
) {
  const {
    rendererRef,
    layoutRef,
    positionsRef,
    animFrameRef,
    cancelAnimRef,
    setClusterMode,
    nodeDomainMap,
    pushRenderData,
    reducedMotion,
    searchMatchedIds,
    nodeDepth,
    nodeImportance,
  } = deps;

  const handleDomainToggle = useCallback(
    (domain: string, activeDomains: Set<string>, nextDomains: Set<string>) => {
      const renderer = rendererRef.current;
      if (!renderer) return;

      const isRemoving = activeDomains.has(domain) && !nextDomains.has(domain);
      const affectedIds = nodes.filter((n) => n.domain === domain).map((n) => n.id);

      if (isRemoving) {
        cancelAnimRef.current?.();
        cancelAnimRef.current = animateAlpha(affectedIds, 1, 0, 250, 8, (alphas) => {
          const rNodes = toRenderNodes(
            nodes,
            positionsRef.current,
            hoveredNodeId,
            selectedNodeId,
            nextDomains,
            undefined,
            searchMatchedIds,
            nodeDepth,
            nodeImportance
          );
          for (const rNode of rNodes) {
            const a = alphas.get(rNode.id);
            if (a !== undefined) rNode.alpha = a;
          }
          const rEdges = toRenderEdges(
            edges,
            positionsRef.current,
            nextDomains,
            nodeDomainMap,
            nodeDepth,
            nodeImportance
          );
          renderer.render(rNodes, rEdges);
        });
      } else {
        cancelAnimRef.current?.();
        const rNodes = toRenderNodes(
          nodes,
          positionsRef.current,
          hoveredNodeId,
          selectedNodeId,
          nextDomains,
          undefined,
          searchMatchedIds,
          nodeDepth,
          nodeImportance
        );
        for (const rNode of rNodes) {
          if (rNode.domain === domain) rNode.alpha = 0;
        }
        const rEdges = toRenderEdges(
          edges,
          positionsRef.current,
          nextDomains,
          nodeDomainMap,
          nodeDepth,
          nodeImportance
        );
        renderer.render(rNodes, rEdges);

        cancelAnimRef.current = animateAlpha(affectedIds, 0, 1, 300, 12, (alphas) => {
          const rNodes2 = toRenderNodes(
            nodes,
            positionsRef.current,
            hoveredNodeId,
            selectedNodeId,
            nextDomains,
            undefined,
            searchMatchedIds,
            nodeDepth,
            nodeImportance
          );
          for (const rNode of rNodes2) {
            const a = alphas.get(rNode.id);
            if (a !== undefined) rNode.alpha = a;
          }
          const rEdges2 = toRenderEdges(
            edges,
            positionsRef.current,
            nextDomains,
            nodeDomainMap,
            nodeDepth,
            nodeImportance
          );
          renderer.render(rNodes2, rEdges2);
        });
      }
    },
    [
      nodes,
      edges,
      hoveredNodeId,
      selectedNodeId,
      nodeDomainMap,
      rendererRef,
      positionsRef,
      cancelAnimRef,
      searchMatchedIds,
      nodeDepth,
      nodeImportance,
    ]
  );

  const handleClusterToggle = useCallback(() => {
    const layout = layoutRef.current;
    const renderer = rendererRef.current;
    if (!layout || !renderer) return;

    cancelAnimRef.current?.();
    cancelAnimationFrame(animFrameRef.current);

    setClusterMode((prev) => {
      const next = !prev;
      const currentPositions = new Map(positionsRef.current);

      layout.updateConfig({
        clusterMode: next,
        clusterCenters: CLUSTER_CENTERS,
        clusterStrength: 0.5,
      });
      layout.restart();

      const steps = reducedMotion ? 1 : 60;
      for (let i = 0; i < steps; i++) layout.tick();
      const targetPositions = layout.getPositions();

      cancelAnimRef.current = animateNodePositions(
        currentPositions,
        targetPositions,
        500,
        (positions) => {
          positionsRef.current = positions;
          pushRenderData();
        }
      );

      return next;
    });
  }, [
    pushRenderData,
    reducedMotion,
    layoutRef,
    rendererRef,
    positionsRef,
    animFrameRef,
    cancelAnimRef,
    setClusterMode,
  ]);

  return { handleDomainToggle, handleClusterToggle };
}
