"use client";

import { useEffect, useRef, useCallback } from "react";
import { ATLAS_ERAS } from "@/content/human-history/data/atlas-content";
import { drawMain } from "@/src-history/components/atlas/atlas-renderer";
import {
  zoomTo as zoomToImpl,
  zoomToNodes as zoomToNodesImpl,
  resize as resizeCanvas,
  killActiveZoomTween,
  BASE_W,
  BASE_H,
} from "@/src-history/components/atlas/atlas-draw";
import { setupEventHandlers } from "@/src-history/components/atlas/atlas-handlers";
import {
  refreshOverview as refreshOverviewImpl,
  showScenePanel as showScenePanelImpl,
} from "@/src-history/components/atlas/atlas-ui";
import type { AtlasEra, AtlasTopic, AtlasState } from "@/src-history/types/atlas";

export default function AtlasCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const scenePanelRef = useRef<HTMLElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef<AtlasState>({
    level: 1,
    activeEra: null,
    activeTopic: null,
    pan: { x: 0, y: 0 },
    zoom: 1,
    isPanning: false,
    panStart: { x: 0, y: 0 },
    pointerStart: null,
    suppressClick: false,
    dirty: true,
    rafId: null,
    hoveredEra: null,
    hoveredTopic: null,
    clickPulse: null,
    W: BASE_W,
    H: BASE_H,
    scaleRatio: 1,
    showHelp: true,
    touchStartTime: 0,
    touchStartPos: null,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;
    drawMain(
      ctx,
      s.W,
      s.H,
      s.pan,
      s.zoom,
      s.level,
      ATLAS_ERAS,
      s.activeEra,
      s.hoveredEra,
      s.hoveredTopic,
      s.scaleRatio,
      s.showHelp,
      s.clickPulse
    );
    if (s.clickPulse && Date.now() - s.clickPulse.time > 600) s.clickPulse = null;
  }, []);

  const renderLoop = useCallback(() => {
    const s = stateRef.current;
    if (!s.dirty) {
      s.rafId = null;
      return;
    }
    s.dirty = false;
    draw();
    s.rafId = requestAnimationFrame(renderLoop);
  }, [draw]);

  const markDirty = useCallback(() => {
    const s = stateRef.current;
    s.dirty = true;
    if (!s.rafId) {
      s.rafId = requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  const zoomTo = useCallback(
    (target: number, cx: number, cy: number, cb?: () => void) => {
      zoomToImpl(stateRef.current, markDirty, target, cx, cy, cb);
    },
    [markDirty]
  );

  const zoomToNodes = useCallback(
    (nodes: AtlasTopic[], maxZoom = 2.2, cb?: () => void) => {
      zoomToNodesImpl(stateRef.current, markDirty, nodes, maxZoom, cb);
    },
    [markDirty]
  );

  const closeScenePanel = useCallback(() => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  }, []);

  const openScenePanel = useCallback(() => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    panel.removeAttribute("aria-hidden");
    panel.classList.add("open");
  }, []);

  const updateBreadcrumb = useCallback(() => {
    const el = breadcrumbRef.current;
    if (!el) return;
    const s = stateRef.current;
    const items: { label: string; action: (() => void) | null }[] = [];
    items.push({
      label: "知识图谱",
      action: () => {
        if (s.level > 1) returnToRoot(false);
      },
    });
    if (s.activeEra)
      items.push({
        label: s.activeEra.name,
        action: () => {
          if (s.level > 2) returnToEra();
        },
      });
    if (s.activeTopic) items.push({ label: s.activeTopic.name, action: null });

    el.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "atlas-bc-sep";
        sep.textContent = "›";
        el.appendChild(sep);
      }
      const isLast = i === items.length - 1;
      const item = document.createElement("span");
      const entry = items[i]!;
      item.className = `atlas-bc-item${isLast ? " active" : ""}`;
      item.textContent = entry.label;
      if (entry.action) item.addEventListener("click", entry.action);
      el.appendChild(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollSceneCard = useCallback((index: number) => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    const cards = panel.querySelectorAll(".scene-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const refreshOverview = useCallback(() => {
    refreshOverviewImpl(overviewRef, stateRef.current, { selectEra, selectTopic, scrollSceneCard });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doShowScenePanel = useCallback(
    (topic: AtlasTopic) => {
      showScenePanelImpl(scenePanelRef, topic, stateRef.current, {
        updateBreadcrumb,
        closeScenePanel,
        openScenePanel,
        returnToEra,
        returnToRoot,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateBreadcrumb, closeScenePanel, openScenePanel]
  );

  const selectEra = useCallback(
    (era: AtlasEra) => {
      const s = stateRef.current;
      s.showHelp = false;
      s.activeEra = era;
      s.activeTopic = null;
      s.level = 2;
      s.hoveredEra = null;
      closeScenePanel();
      if (tooltipRef.current) tooltipRef.current.style.display = "none";
      updateBreadcrumb();
      refreshOverview();
      zoomToNodes(era.topics, 2.2, () => {
        markDirty();
      });
    },
    [closeScenePanel, updateBreadcrumb, refreshOverview, zoomToNodes, markDirty]
  );

  const selectTopic = useCallback(
    (topic: AtlasTopic) => {
      const s = stateRef.current;
      s.level = 3;
      s.activeTopic = topic;
      s.hoveredTopic = null;
      if (tooltipRef.current) tooltipRef.current.style.display = "none";
      updateBreadcrumb();
      refreshOverview();
      doShowScenePanel(topic);
    },
    [updateBreadcrumb, refreshOverview, doShowScenePanel]
  );

  const returnToEra = useCallback(() => {
    const s = stateRef.current;
    closeScenePanel();
    s.activeTopic = null;
    s.level = 2;
    updateBreadcrumb();
    refreshOverview();
    markDirty();
  }, [closeScenePanel, updateBreadcrumb, refreshOverview, markDirty]);

  const returnToRoot = useCallback(
    (restoreHelp = true) => {
      const s = stateRef.current;
      closeScenePanel();
      s.activeEra = null;
      s.activeTopic = null;
      s.hoveredEra = null;
      s.hoveredTopic = null;
      s.level = 1;
      s.showHelp = restoreHelp;
      if (tooltipRef.current) tooltipRef.current.style.display = "none";
      updateBreadcrumb();
      refreshOverview();
      zoomTo(1, s.W / 2, s.H / 2, () => {
        markDirty();
      });
    },
    [closeScenePanel, updateBreadcrumb, refreshOverview, zoomTo, markDirty]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;
    const s = stateRef.current;

    s.level = 1;
    s.activeEra = null;
    s.activeTopic = null;
    s.hoveredEra = null;
    s.hoveredTopic = null;
    s.clickPulse = null;
    s.pan = { x: 0, y: 0 };
    s.zoom = 1;
    s.dirty = true;
    s.showHelp = true;

    updateBreadcrumb();
    refreshOverview();

    const outerId = requestAnimationFrame(() => {
      resizeCanvas(canvas, container, s, markDirty);
      markDirty();
    });

    const cleanup = setupEventHandlers(canvas, container, s, tooltipRef, scenePanelRef, {
      draw,
      markDirty,
      selectEra,
      selectTopic,
      returnToEra,
      returnToRoot,
      zoomTo,
    });

    return () => {
      cancelAnimationFrame(outerId);
      if (s.rafId) cancelAnimationFrame(s.rafId);
      s.rafId = null;
      killActiveZoomTween();
      cleanup();
    };
  }, [
    draw,
    markDirty,
    renderLoop,
    selectEra,
    selectTopic,
    returnToEra,
    returnToRoot,
    zoomTo,
    refreshOverview,
    updateBreadcrumb,
  ]);

  const handleZoomIn = useCallback(() => {
    stateRef.current.zoom = Math.min(5, stateRef.current.zoom * 1.25);
    markDirty();
  }, [markDirty]);

  const handleZoomOut = useCallback(() => {
    stateRef.current.zoom = Math.max(0.4, stateRef.current.zoom * 0.8);
    markDirty();
  }, [markDirty]);

  const handleBack = useCallback(() => {
    const s = stateRef.current;
    if (scenePanelRef.current?.classList.contains("open")) returnToEra();
    else if (s.level === 2) returnToRoot(false);
  }, [returnToEra, returnToRoot]);

  return (
    <div className="atlas-page">
      <div className="atlas-toolbar">
        <div className="atlas-breadcrumb" ref={breadcrumbRef} />
        <div className="atlas-controls">
          <button
            className="atlas-ctrl-btn"
            title="返回上级 (Esc)"
            aria-label="返回"
            onClick={handleBack}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="atlas-ctrl-btn"
            title="缩小 (-)"
            aria-label="缩小"
            onClick={handleZoomOut}
          >
            −
          </button>
          <button
            className="atlas-ctrl-btn"
            title="放大 (+)"
            aria-label="放大"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button
            className="atlas-ctrl-btn"
            title="重置 (0)"
            aria-label="重置"
            onClick={() => returnToRoot(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="atlas-container" ref={containerRef}>
        <canvas ref={canvasRef} className="atlas-canvas" tabIndex={0} />
        <div className="atlas-tooltip" ref={tooltipRef} />
        <aside className="atlas-overview" aria-label="知识图谱目录" ref={overviewRef} />
        <aside
          className="scene-panel"
          aria-label="历史场景详情"
          aria-hidden="true"
          ref={scenePanelRef}
        />
      </div>
    </div>
  );
}
