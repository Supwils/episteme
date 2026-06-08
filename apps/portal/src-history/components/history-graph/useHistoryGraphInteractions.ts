'use client';

import { useCallback } from 'react';
import { animateFocus } from '@universe/graph-engine';
import type { HistoryGraphState } from './useHistoryGraphState';

export function useHistoryGraphInteractions(state: HistoryGraphState) {
  const {
    rendererRef,
    containerRef,
    positionsRef,
    zoom,
    offsetX,
    offsetY,
    setSelectedNodeId,
    setSearchQuery,
    setZoom,
    setOffsetX,
    setOffsetY,
  } = state;

  const handleSearchSelect = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);
      setSearchQuery('');
      const pos = positionsRef.current.get(nodeId);
      const renderer = rendererRef.current;
      const container = containerRef.current;
      if (pos && renderer && container) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const targetScale = 1.5;
        animateFocus(
          { scale: zoom, offsetX, offsetY },
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
      }
    },
    [zoom, offsetX, offsetY, setSelectedNodeId, setSearchQuery, positionsRef, rendererRef, containerRef, setZoom, setOffsetX, setOffsetY],
  );

  const handleZoomIn = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const newScale = Math.min(5, zoom * 1.2);
    const cx = w / 2;
    const cy = h / 2;
    const newOX = cx - (cx - offsetX) * (newScale / zoom);
    const newOY = cy - (cy - offsetY) * (newScale / zoom);
    renderer.setTransform(newScale, newOX, newOY);
    setZoom(newScale);
    setOffsetX(newOX);
    setOffsetY(newOY);
  }, [zoom, offsetX, offsetY, rendererRef, containerRef, setZoom, setOffsetX, setOffsetY]);

  const handleZoomOut = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const newScale = Math.max(0.05, zoom / 1.2);
    const cx = w / 2;
    const cy = h / 2;
    const newOX = cx - (cx - offsetX) * (newScale / zoom);
    const newOY = cy - (cy - offsetY) * (newScale / zoom);
    renderer.setTransform(newScale, newOX, newOY);
    setZoom(newScale);
    setOffsetX(newOX);
    setOffsetY(newOY);
  }, [zoom, offsetX, offsetY, rendererRef, containerRef, setZoom, setOffsetX, setOffsetY]);

  const handleFitToScreen = useCallback(() => {
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!renderer || !container) return;
    const positions = positionsRef.current;
    if (positions.size === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pos of positions.values()) {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }
    const pad = 100;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const worldW = maxX - minX + pad * 2;
    const worldH = maxY - minY + pad * 2;
    const newScale = Math.min(w / worldW, h / worldH, 2);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const newOX = w / 2 - centerX * newScale;
    const newOY = h / 2 - centerY * newScale;
    renderer.setTransform(newScale, newOX, newOY);
    setZoom(newScale);
    setOffsetX(newOX);
    setOffsetY(newOY);
  }, [rendererRef, containerRef, positionsRef, setZoom, setOffsetX, setOffsetY]);

  const handleDetailNodeClick = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);
      const pos = positionsRef.current.get(nodeId);
      const renderer = rendererRef.current;
      const container = containerRef.current;
      if (pos && renderer && container) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const targetScale = 1.5;
        renderer.setTransform(targetScale, w / 2 - pos.x * targetScale, h / 2 - pos.y * targetScale);
        setZoom(targetScale);
      }
    },
    [setSelectedNodeId, positionsRef, rendererRef, containerRef, setZoom],
  );

  return {
    handleSearchSelect,
    handleZoomIn,
    handleZoomOut,
    handleFitToScreen,
    handleDetailNodeClick,
  };
}
