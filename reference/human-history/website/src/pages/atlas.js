import { gsap } from 'gsap';
import { ATLAS_ERAS } from '../data/atlas-content.js';
import { el, clearApp, prefersReducedMotion } from '../lib/dom.js';
import { buildEraTooltip, buildTopicTooltip, buildPreviewText, createAtlasToolbar, createOverviewButton, renderScenePanel, scrollSceneCard, eraSceneCount, updateOverviewPanel } from '../components/history/atlas-components.js';
import { getNodeBounds, hitTestNodes, isNearNodes, scaleValue } from '../features/atlas/atlas-geometry.js';
import { drawMain } from '../components/history/atlas-renderer.js';

const BASE_W = 960;
const BASE_H = 520;
const DRAG_CLICK_TOLERANCE = 6;

let level = 1;
let activeEra = null;
let activeTopic = null;
let pan = { x: 0, y: 0 };
let zoom = 1;
let isPanning = false;
let panStart = { x: 0, y: 0 };
let pointerStart = null;
let suppressClick = false;
let canvas, ctx, container, tooltip, scenePanel, overviewPanel, toolbar, breadcrumbEl;
let cleanupFns = [];
let dirty = true;
let rafId = null;
let hoveredEra = null;
let hoveredTopic = null;
let clickPulse = null;
let W = BASE_W;
let H = BASE_H;
let scaleRatio = 1;
let showHelp = true;

function refreshOverview() {
  updateOverviewPanel({ overviewPanel, level, activeEra, activeTopic, ATLAS_ERAS, selectEra, selectTopic, scrollSceneCardFn: scrollSceneCard, scenePanel });
}

function sx(v) { return scaleValue(v, scaleRatio); }
function sy(v) { return scaleValue(v, scaleRatio); }

function drawClickPulse() {}
function draw() {
  drawMain(ctx, W, H, pan, zoom, level, ATLAS_ERAS, activeEra, hoveredEra, hoveredTopic, scaleRatio, showHelp, clickPulse);
  if (clickPulse && Date.now() - clickPulse.time > 600) clickPulse = null;
  dirty = false;
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: (e.clientX - rect.left - pan.x) / zoom, y: (e.clientY - rect.top - pan.y) / zoom };
}
function hitTestEra(mx, my) { return hitTestNodes(ATLAS_ERAS, mx, my, 55 * scaleRatio, scaleRatio); }
function hitTestTopic(mx, my) { if (!activeEra) return null; return hitTestNodes(activeEra.topics, mx, my, 40 * scaleRatio, scaleRatio); }
function isNearAnyTopic(mx, my) { if (!activeEra) return false; return isNearNodes(activeEra.topics, mx, my, 60 * scaleRatio, scaleRatio); }
function markDirty() { if (!dirty) dirty = true; }

function updateBreadcrumb() {
  if (!breadcrumbEl) return;
  const items = [];
  items.push({ label: '知识图谱', action: () => { if (level > 1) returnToRoot(false); } });
  if (activeEra) items.push({ label: activeEra.name, action: () => { if (level > 2) returnToEra(); } });
  if (activeTopic) items.push({ label: activeTopic.name, action: null });

  breadcrumbEl.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    if (i > 0) {
      breadcrumbEl.appendChild(el('span', { class: 'atlas-bc-sep' }, '›'));
    }
    const isLast = i === items.length - 1;
    const item = el('span', {
      class: `atlas-bc-item${isLast ? ' active' : ''}`,
      onClick: items[i].action,
    }, items[i].label);
    breadcrumbEl.appendChild(item);
  }
}

function updateScenePanel() {
  closeScenePanel();
  activeTopic = null;
  updateBreadcrumb();
  refreshOverview();
}

function closeScenePanel() {
  if (!scenePanel) return;
  scenePanel.classList.remove('open');
  scenePanel.setAttribute('aria-hidden', 'true');
  scenePanel.inert = true;
}

function openScenePanel() {
  if (!scenePanel) return;
  scenePanel.removeAttribute('aria-hidden');
  scenePanel.inert = false;
  scenePanel.classList.add('open');
}

function selectEra(era) {
  showHelp = false;
  activeEra = era;
  activeTopic = null;
  level = 2;
  hoveredEra = null;
  closeScenePanel();
  tooltip.style.display = 'none';
  updateBreadcrumb();
  refreshOverview();
  triggerClickPulse(sx(era.x), sy(era.y), 48 * scaleRatio, era.hue);
  zoomToNodes(era.topics, 2.2, () => { markDirty(); });
}

function selectTopic(topic) {
  level = 3;
  activeTopic = topic;
  hoveredTopic = null;
  tooltip.style.display = 'none';
  updateBreadcrumb();
  refreshOverview();
  triggerClickPulse(sx(topic.x), sy(topic.y), 36 * scaleRatio, activeEra.hue);
  showScenePanel(topic);
}

function returnToEra() {
  closeScenePanel();
  activeTopic = null;
  level = 2;
  updateBreadcrumb();
  refreshOverview();
  markDirty();
}

function returnToRoot(restoreHelp = true) {
  closeScenePanel();
  activeEra = null;
  activeTopic = null;
  hoveredEra = null;
  hoveredTopic = null;
  level = 1;
  showHelp = restoreHelp;
  tooltip.style.display = 'none';
  updateBreadcrumb();
  refreshOverview();
  diveOut(() => { markDirty(); });
}

function zoomTo(target, cx, cy, cb) {
  const reduce = prefersReducedMotion();
  const dur = reduce ? 0.01 : 0.5;
  const startZoom = zoom;
  const startPan = { ...pan };
  const targetPan = {
    x: W / 2 - cx * target,
    y: H / 2 - cy * target,
  };

  const obj = { t: 0 };
  gsap.to(obj, {
    t: 1,
    duration: dur,
    ease: 'power2.inOut',
    onUpdate: () => {
      zoom = startZoom + (target - startZoom) * obj.t;
      pan.x = startPan.x + (targetPan.x - startPan.x) * obj.t;
      pan.y = startPan.y + (targetPan.y - startPan.y) * obj.t;
      markDirty();
    },
    onComplete: () => {
      if (cb) cb();
    },
  });
}

function zoomToNodes(nodes, maxZoom = 2.2, cb) {
  if (!nodes || nodes.length === 0) {
    resetViewport(cb);
    return;
  }

  const { minX, maxX, minY, maxY } = getNodeBounds(nodes, scaleRatio);
  const pad = 140 * scaleRatio;
  const contentW = Math.max(1, maxX - minX + pad * 2);
  const contentH = Math.max(1, maxY - minY + pad * 2);
  const targetZoom = Math.max(0.7, Math.min(maxZoom, W / contentW, H / contentH));
  zoomTo(targetZoom, (minX + maxX) / 2, (minY + maxY) / 2, cb);
}

function diveOut(cb) {
  resetViewport(cb);
}

function resetViewport(cb) {
  zoomTo(1, W / 2, H / 2, cb);
}

function triggerClickPulse(x, y, r, color) {
  clickPulse = { x, y, r, color, time: Date.now() };
  markDirty();
}

function showScenePanel(topic) {
  updateBreadcrumb();
  renderScenePanel({
    scenePanel,
    topic,
    era: activeEra,
    onBack: returnToEra,
    onClose: () => returnToRoot(true),
    onOpen: openScenePanel,
  });
}

function onMove(e) {
  const pos = getMousePos(e);
  let needsRedraw = false;

  if (level === 1) {
    const era = hitTestEra(pos.x, pos.y);
    const newHover = era ? era.id : null;
    if (newHover !== hoveredEra) {
      hoveredEra = newHover;
      needsRedraw = true;
    }
    canvas.style.cursor = era ? 'pointer' : 'grab';
    if (era) {
      tooltip.innerHTML = buildEraTooltip(era);
      tooltip.style.display = 'block';
      positionTooltip(e);
    } else {
      tooltip.style.display = 'none';
    }
  } else if (level === 2) {
    const topic = hitTestTopic(pos.x, pos.y);
    const newHover = topic ? topic.id : null;
    if (newHover !== hoveredTopic) {
      hoveredTopic = newHover;
      needsRedraw = true;
    }
    canvas.style.cursor = topic ? 'pointer' : (isNearAnyTopic(pos.x, pos.y) ? 'default' : 'pointer');
    if (topic) {
      tooltip.innerHTML = buildTopicTooltip(topic, activeEra.name);
      tooltip.style.display = 'block';
      positionTooltip(e);
    } else {
      tooltip.style.display = 'none';
    }
  }

  if (needsRedraw) markDirty();
}

function positionTooltip(e) {
  const ttW = tooltip.offsetWidth;
  const ttH = tooltip.offsetHeight;
  let x = e.clientX + 16;
  let y = e.clientY - 8;
  if (x + ttW > window.innerWidth - 8) x = e.clientX - ttW - 16;
  if (y + ttH > window.innerHeight - 8) y = e.clientY - ttH - 8;
  if (y < 8) y = 8;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function onClick(e) {
  if (suppressClick) {
    suppressClick = false;
    return;
  }

  const pos = getMousePos(e);
  if (level === 1) {
    const era = hitTestEra(pos.x, pos.y);
    if (era) {
      selectEra(era);
    }
  } else if (level === 2) {
    const topic = hitTestTopic(pos.x, pos.y);
    if (topic) {
      selectTopic(topic);
    } else if (!isNearAnyTopic(pos.x, pos.y)) {
      returnToRoot(false);
    }
  }
}

function onWheel(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const delta = e.deltaY > 0 ? 0.92 : 1.08;
  const newZoom = Math.max(0.4, Math.min(5, zoom * delta));
  pan.x = mx - (mx - pan.x) * (newZoom / zoom);
  pan.y = my - (my - pan.y) * (newZoom / zoom);
  zoom = newZoom;
  markDirty();
}

function onMousedown(e) {
  if (e.button !== 0) return;
  isPanning = true;
  pointerStart = { x: e.clientX, y: e.clientY };
  suppressClick = false;
  panStart = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  canvas.style.cursor = 'grabbing';
}

function onMousemove(e) {
  if (isPanning) {
    if (pointerStart) {
      const dx = e.clientX - pointerStart.x;
      const dy = e.clientY - pointerStart.y;
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_CLICK_TOLERANCE) suppressClick = true;
    }
    pan.x = e.clientX - panStart.x;
    pan.y = e.clientY - panStart.y;
    markDirty();
  }
}

function onMouseup() {
  isPanning = false;
  pointerStart = null;
  canvas.style.cursor = 'grab';
  window.setTimeout(() => { suppressClick = false; }, 80);
}

let touchStartTime = 0;
let touchStartPos = null;

function onTouchstart(e) {
  if (e.touches.length === 1) {
    const t = e.touches[0];
    isPanning = true;
    touchStartTime = Date.now();
    touchStartPos = { x: t.clientX, y: t.clientY };
    panStart = { x: t.clientX - pan.x, y: t.clientY - pan.y };
  }
}

function onTouchmove(e) {
  e.preventDefault();
  if (e.touches.length === 1 && isPanning) {
    const t = e.touches[0];
    pan.x = t.clientX - panStart.x;
    pan.y = t.clientY - panStart.y;
    markDirty();
  }
}

function onTouchend(e) {
  if (e.changedTouches.length !== 1) return;
  const t = e.changedTouches[0];
  const elapsed = Date.now() - touchStartTime;
  const dx = t.clientX - touchStartPos.x;
  const dy = t.clientY - touchStartPos.y;
  const moved = Math.sqrt(dx * dx + dy * dy);
  isPanning = false;

  if (elapsed < 300 && moved < 10) {
    const pos = getMousePos(t);
    if (level === 1) {
      const era = hitTestEra(pos.x, pos.y);
      if (era) {
        selectEra(era);
      }
    } else if (level === 2) {
      const topic = hitTestTopic(pos.x, pos.y);
      if (topic) {
        selectTopic(topic);
      } else if (!isNearAnyTopic(pos.x, pos.y)) {
        returnToRoot(false);
      }
    }
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (scenePanel.classList.contains('open')) {
      returnToEra();
    } else if (level === 2) {
      returnToRoot(false);
    }
  }
  if (e.key === '+' || e.key === '=') {
    zoom = Math.min(5, zoom * 1.15);
    markDirty();
  }
  if (e.key === '-') {
    zoom = Math.max(0.4, zoom * 0.87);
    markDirty();
  }
  if (e.key === '0') {
    resetViewport();
  }
  if (e.key === 'f' || e.key === 'F') {
    zoomToFit();
  }
}

function zoomToFit() {
  const nodes = level === 1 ? ATLAS_ERAS : (activeEra ? activeEra.topics : []);
  if (nodes.length === 0) return;
  const { minX, maxX, minY, maxY } = getNodeBounds(nodes, scaleRatio);
  const pad = 100 * scaleRatio;
  const contentW = (maxX - minX) + pad * 2;
  const contentH = (maxY - minY) + pad * 2;
  const fitZoom = Math.min(W / contentW, H / contentH) * 0.85;
  const targetZoom = Math.max(0.5, Math.min(3, fitZoom));
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  zoomTo(targetZoom, centerX, centerY);
}

function resize() {
  const rect = container.getBoundingClientRect();
  W = rect.width;
  H = rect.height;
  canvas.width = Math.round(W * devicePixelRatio);
  canvas.height = Math.round(H * devicePixelRatio);
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  scaleRatio = Math.min(rect.width / BASE_W, rect.height / BASE_H);
  markDirty();
}

function renderLoop() {
  if (dirty) draw();
  rafId = requestAnimationFrame(renderLoop);
}

export function renderAtlas() {
  const app = clearApp();

  const page = el('div', { class: 'atlas-page' });

  const toolbarParts = createAtlasToolbar({
    onBack: () => {
      if (scenePanel.classList.contains('open')) {
        returnToEra();
      } else if (level === 2) {
        returnToRoot(false);
      }
    },
    onZoomOut: () => { zoom = Math.max(0.4, zoom * 0.8); markDirty(); },
    onZoomIn: () => { zoom = Math.min(5, zoom * 1.25); markDirty(); },
    onFit: zoomToFit,
    onReset: () => returnToRoot(true),
  });
  toolbar = toolbarParts.toolbar;
  breadcrumbEl = toolbarParts.breadcrumbEl;
  page.appendChild(toolbar);

  container = el('div', { class: 'atlas-container' });
  canvas = el('canvas', { class: 'atlas-canvas', tabindex: '0' });
  tooltip = el('div', { class: 'atlas-tooltip' });
  overviewPanel = el('aside', { class: 'atlas-overview', 'aria-label': '知识图谱目录' });
  scenePanel = el('aside', { class: 'scene-panel', 'aria-label': '历史场景详情', 'aria-hidden': 'true' });
  scenePanel.inert = true;

  container.appendChild(canvas);
  container.appendChild(tooltip);
  container.appendChild(overviewPanel);
  container.appendChild(scenePanel);
  page.appendChild(container);
  app.appendChild(page);

  ctx = canvas.getContext('2d');

  level = 1;
  activeEra = null;
  activeTopic = null;
  hoveredEra = null;
  hoveredTopic = null;
  clickPulse = null;
  pan = { x: 0, y: 0 };
  zoom = 1;
  dirty = true;
  showHelp = true;

  updateBreadcrumb();
  refreshOverview();

  requestAnimationFrame(() => {
    resize();
    renderLoop();
  });

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
  window.addEventListener('resize', resize);
  // Keyboard shortcuts are scoped to the focusable canvas (tabindex=0) to avoid
  // double-firing (canvas + window) and hijacking keys typed in other inputs.

  cleanupFns = [
    () => { if (rafId) cancelAnimationFrame(rafId); },
    () => canvas.removeEventListener('mousemove', onMove),
    () => canvas.removeEventListener('click', onClick),
    () => canvas.removeEventListener('wheel', onWheel),
    () => canvas.removeEventListener('mousedown', onMousedown),
    () => canvas.removeEventListener('touchstart', onTouchstart),
    () => canvas.removeEventListener('touchmove', onTouchmove),
    () => canvas.removeEventListener('touchend', onTouchend),
    () => canvas.removeEventListener('keydown', onKeydown),
    () => window.removeEventListener('mousemove', onMousemove),
    () => window.removeEventListener('mouseup', onMouseup),
    () => window.removeEventListener('resize', resize),
  ];
}

export function cleanupAtlas() {
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
}
