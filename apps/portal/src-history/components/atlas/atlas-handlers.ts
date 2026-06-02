import { ATLAS_ERAS } from '@/content/human-history/data/atlas-content';
import {
  getMousePos,
  hitTestEra,
  hitTestTopic,
  isNearAnyTopic,
  buildEraTooltip,
  buildTopicTooltip,
  positionTooltip,
  resize,
  DRAG_CLICK_TOLERANCE,
} from './atlas-draw';

type HandlerDeps = {
  draw: () => void;
  markDirty: () => void;
  selectEra: (era: any) => void;
  selectTopic: (topic: any) => void;
  returnToEra: () => void;
  returnToRoot: (restoreHelp?: boolean) => void;
  zoomTo: (target: number, cx: number, cy: number) => void;
};

export function setupEventHandlers(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  state: any,
  tooltipRef: React.RefObject<HTMLDivElement | null>,
  scenePanelRef: React.RefObject<HTMLElement | null>,
  deps: HandlerDeps,
): () => void {
  const { draw, markDirty, selectEra, selectTopic, returnToEra, returnToRoot, zoomTo } = deps;

  function onMove(e: MouseEvent) {
    const pos = getMousePos(canvas, state.pan, state.zoom, e.clientX, e.clientY);
    let needsRedraw = false;

    if (state.level === 1) {
      const era = hitTestEra(ATLAS_ERAS, pos.x, pos.y, state.scaleRatio);
      const newHover = era ? era.id : null;
      if (newHover !== state.hoveredEra) { state.hoveredEra = newHover; needsRedraw = true; }
      canvas.style.cursor = era ? 'pointer' : 'grab';
      if (era && tooltipRef.current) {
        tooltipRef.current.innerHTML = buildEraTooltip(era);
        tooltipRef.current.style.display = 'block';
        positionTooltip(tooltipRef.current, e.clientX, e.clientY);
      } else if (tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
      }
    } else if (state.level === 2) {
      const topic = hitTestTopic(state.activeEra, pos.x, pos.y, state.scaleRatio);
      const newHover = topic ? topic.id : null;
      if (newHover !== state.hoveredTopic) { state.hoveredTopic = newHover; needsRedraw = true; }
      canvas.style.cursor = topic ? 'pointer' : (isNearAnyTopic(state.activeEra, pos.x, pos.y, state.scaleRatio) ? 'default' : 'pointer');
      if (topic && tooltipRef.current) {
        tooltipRef.current.innerHTML = buildTopicTooltip(topic, state.activeEra.name);
        tooltipRef.current.style.display = 'block';
        positionTooltip(tooltipRef.current, e.clientX, e.clientY);
      } else if (tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
      }
    }

    if (needsRedraw) markDirty();
  }

  function onClick(e: MouseEvent) {
    if (state.suppressClick) { state.suppressClick = false; return; }
    const pos = getMousePos(canvas, state.pan, state.zoom, e.clientX, e.clientY);
    if (state.level === 1) {
      const era = hitTestEra(ATLAS_ERAS, pos.x, pos.y, state.scaleRatio);
      if (era) selectEra(era);
    } else if (state.level === 2) {
      const topic = hitTestTopic(state.activeEra, pos.x, pos.y, state.scaleRatio);
      if (topic) selectTopic(topic);
      else if (!isNearAnyTopic(state.activeEra, pos.x, pos.y, state.scaleRatio)) returnToRoot(false);
    }
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    const newZoom = Math.max(0.4, Math.min(5, state.zoom * delta));
    state.pan.x = mx - (mx - state.pan.x) * (newZoom / state.zoom);
    state.pan.y = my - (my - state.pan.y) * (newZoom / state.zoom);
    state.zoom = newZoom;
    markDirty();
  }

  function onMousedown(e: MouseEvent) {
    if (e.button !== 0) return;
    state.isPanning = true;
    state.pointerStart = { x: e.clientX, y: e.clientY };
    state.suppressClick = false;
    state.panStart = { x: e.clientX - state.pan.x, y: e.clientY - state.pan.y };
    canvas.style.cursor = 'grabbing';
  }

  function onMousemove(e: MouseEvent) {
    if (state.isPanning) {
      if (state.pointerStart) {
        const dx = e.clientX - state.pointerStart.x;
        const dy = e.clientY - state.pointerStart.y;
        if (Math.sqrt(dx * dx + dy * dy) > DRAG_CLICK_TOLERANCE) state.suppressClick = true;
      }
      state.pan.x = e.clientX - state.panStart.x;
      state.pan.y = e.clientY - state.panStart.y;
      markDirty();
    }
  }

  function onMouseup() {
    state.isPanning = false;
    state.pointerStart = null;
    canvas.style.cursor = 'grab';
    window.setTimeout(() => { state.suppressClick = false; }, 80);
  }

  function onTouchstart(e: TouchEvent) {
    if (e.touches.length === 1) {
      const t = e.touches[0]!;
      state.isPanning = true;
      state.touchStartTime = Date.now();
      state.touchStartPos = { x: t.clientX, y: t.clientY };
      state.panStart = { x: t.clientX - state.pan.x, y: t.clientY - state.pan.y };
    }
  }

  function onTouchmove(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 1 && state.isPanning) {
      const t = e.touches[0]!;
      state.pan.x = t.clientX - state.panStart.x;
      state.pan.y = t.clientY - state.panStart.y;
      markDirty();
    }
  }

  function onTouchend(e: TouchEvent) {
    if (e.changedTouches.length !== 1) return;
    const t = e.changedTouches[0]!;
    const elapsed = Date.now() - state.touchStartTime;
    const dx = t.clientX - (state.touchStartPos?.x ?? 0);
    const dy = t.clientY - (state.touchStartPos?.y ?? 0);
    const moved = Math.sqrt(dx * dx + dy * dy);
    state.isPanning = false;

    if (elapsed < 300 && moved < 10) {
      const pos = getMousePos(canvas, state.pan, state.zoom, t.clientX, t.clientY);
      if (state.level === 1) {
        const era = hitTestEra(ATLAS_ERAS, pos.x, pos.y, state.scaleRatio);
        if (era) selectEra(era);
      } else if (state.level === 2) {
        const topic = hitTestTopic(state.activeEra, pos.x, pos.y, state.scaleRatio);
        if (topic) selectTopic(topic);
        else if (!isNearAnyTopic(state.activeEra, pos.x, pos.y, state.scaleRatio)) returnToRoot(false);
      }
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (scenePanelRef.current?.classList.contains('open')) returnToEra();
      else if (state.level === 2) returnToRoot(false);
    }
    if (e.key === '+' || e.key === '=') { state.zoom = Math.min(5, state.zoom * 1.15); markDirty(); }
    if (e.key === '-') { state.zoom = Math.max(0.4, state.zoom * 0.87); markDirty(); }
    if (e.key === '0') { zoomTo(1, state.W / 2, state.H / 2); }
  }

  const resizeHandler = () => resize(canvas, container, state, markDirty);

  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('click', onClick);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('mousedown', onMousedown);
  canvas.addEventListener('touchstart', onTouchstart, { passive: true });
  canvas.addEventListener('touchmove', onTouchmove, { passive: false });
  canvas.addEventListener('touchend', onTouchend);
  canvas.addEventListener('keydown', onKeydown);
  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
  window.addEventListener('resize', resizeHandler);

  return () => {
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('click', onClick);
    canvas.removeEventListener('wheel', onWheel);
    canvas.removeEventListener('mousedown', onMousedown);
    canvas.removeEventListener('touchstart', onTouchstart);
    canvas.removeEventListener('touchmove', onTouchmove);
    canvas.removeEventListener('touchend', onTouchend);
    canvas.removeEventListener('keydown', onKeydown);
    window.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);
    window.removeEventListener('resize', resizeHandler);
  };
}
