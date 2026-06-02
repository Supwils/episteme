'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ATLAS_ERAS } from '@/data/atlas-content';
import { getNodeBounds, hitTestNodes, isNearNodes, scaleValue } from '@/features/atlas/atlas-geometry';
import { drawMain } from '@/components/atlas/atlas-renderer';

const BASE_W = 960;
const BASE_H = 520;
const DRAG_CLICK_TOLERANCE = 6;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function AtlasCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const scenePanelRef = useRef<HTMLElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    level: 1,
    activeEra: null as any,
    activeTopic: null as any,
    pan: { x: 0, y: 0 },
    zoom: 1,
    isPanning: false,
    panStart: { x: 0, y: 0 },
    pointerStart: null as { x: number; y: number } | null,
    suppressClick: false,
    dirty: true,
    rafId: null as number | null,
    hoveredEra: null as string | null,
    hoveredTopic: null as string | null,
    clickPulse: null as any,
    W: BASE_W,
    H: BASE_H,
    scaleRatio: 1,
    showHelp: true,
    touchStartTime: 0,
    touchStartPos: null as { x: number; y: number } | null,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;
    drawMain(ctx, s.W, s.H, s.pan, s.zoom, s.level, ATLAS_ERAS, s.activeEra, s.hoveredEra, s.hoveredTopic, s.scaleRatio, s.showHelp, s.clickPulse);
    if (s.clickPulse && Date.now() - s.clickPulse.time > 600) s.clickPulse = null;
    s.dirty = false;
  }, []);

  const markDirty = useCallback(() => {
    stateRef.current.dirty = true;
  }, []);

  const getMousePos = useCallback((e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const s = stateRef.current;
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left - s.pan.x) / s.zoom, y: (e.clientY - rect.top - s.pan.y) / s.zoom };
  }, []);

  const hitTestEra = useCallback((mx: number, my: number) => {
    return hitTestNodes(ATLAS_ERAS, mx, my, 55 * stateRef.current.scaleRatio, stateRef.current.scaleRatio);
  }, []);

  const hitTestTopic = useCallback((mx: number, my: number) => {
    const s = stateRef.current;
    if (!s.activeEra) return null;
    return hitTestNodes(s.activeEra.topics, mx, my, 40 * s.scaleRatio, s.scaleRatio);
  }, []);

  const isNearAnyTopic = useCallback((mx: number, my: number) => {
    const s = stateRef.current;
    if (!s.activeEra) return false;
    return isNearNodes(s.activeEra.topics, mx, my, 60 * s.scaleRatio, s.scaleRatio);
  }, []);

  const zoomTo = useCallback((target: number, cx: number, cy: number, cb?: () => void) => {
    const s = stateRef.current;
    const reduce = prefersReducedMotion();
    const dur = reduce ? 0.01 : 0.5;
    const startZoom = s.zoom;
    const startPan = { ...s.pan };
    const targetPan = { x: s.W / 2 - cx * target, y: s.H / 2 - cy * target };
    const obj = { t: 0 };
    gsap.to(obj, {
      t: 1,
      duration: dur,
      ease: 'power2.inOut',
      onUpdate: () => {
        s.zoom = startZoom + (target - startZoom) * obj.t;
        s.pan.x = startPan.x + (targetPan.x - startPan.x) * obj.t;
        s.pan.y = startPan.y + (targetPan.y - startPan.y) * obj.t;
        markDirty();
      },
      onComplete: () => { if (cb) cb(); },
    });
  }, [markDirty]);

  const zoomToNodes = useCallback((nodes: any[], maxZoom = 2.2, cb?: () => void) => {
    if (!nodes || nodes.length === 0) {
      zoomTo(1, stateRef.current.W / 2, stateRef.current.H / 2, cb);
      return;
    }
    const s = stateRef.current;
    const { minX, maxX, minY, maxY } = getNodeBounds(nodes, s.scaleRatio);
    const pad = 140 * s.scaleRatio;
    const contentW = Math.max(1, maxX - minX + pad * 2);
    const contentH = Math.max(1, maxY - minY + pad * 2);
    const targetZoom = Math.max(0.7, Math.min(maxZoom, s.W / contentW, s.H / contentH));
    zoomTo(targetZoom, (minX + maxX) / 2, (minY + maxY) / 2, cb);
  }, [zoomTo]);

  const closeScenePanel = useCallback(() => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }, []);

  const openScenePanel = useCallback(() => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    panel.removeAttribute('aria-hidden');
    panel.classList.add('open');
  }, []);

  const updateBreadcrumb = useCallback(() => {
    const el = breadcrumbRef.current;
    if (!el) return;
    const s = stateRef.current;
    const items: { label: string; action: (() => void) | null }[] = [];
    items.push({ label: '知识图谱', action: () => { if (s.level > 1) returnToRoot(false); } });
    if (s.activeEra) items.push({ label: s.activeEra.name, action: () => { if (s.level > 2) returnToEra(); } });
    if (s.activeTopic) items.push({ label: s.activeTopic.name, action: null });

    el.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'atlas-bc-sep';
        sep.textContent = '›';
        el.appendChild(sep);
      }
      const isLast = i === items.length - 1;
      const item = document.createElement('span');
      item.className = `atlas-bc-item${isLast ? ' active' : ''}`;
      item.textContent = items[i].label;
      if (items[i].action) item.addEventListener('click', items[i].action!);
      el.appendChild(item);
    }
  }, []);

  const refreshOverview = useCallback(() => {
    const panel = overviewRef.current;
    if (!panel) return;
    const s = stateRef.current;
    panel.innerHTML = '';

    const heading = s.level === 1 ? '时代目录' : s.activeTopic ? s.activeTopic.name : s.activeEra?.name;
    const meta = s.level === 1
      ? `${ATLAS_ERAS.length} 个时代 · ${ATLAS_ERAS.reduce((sum: number, era: any) => sum + era.topics.length, 0)} 个主题`
      : s.activeTopic
        ? `${s.activeEra.name} · ${s.activeTopic.scenes.length} 个场景`
        : `${s.activeEra?.sub} · ${s.activeEra?.topics.length} 个主题`;

    const head = document.createElement('div');
    head.className = 'atlas-overview-head';
    head.innerHTML = `<strong>${heading}</strong><span>${meta}</span>`;
    panel.appendChild(head);

    const list = document.createElement('div');
    list.className = 'atlas-overview-list';

    if (s.level === 1) {
      for (const era of ATLAS_ERAS) {
        const btn = document.createElement('button');
        btn.className = `atlas-overview-item${s.activeEra === era ? ' active' : ''}`;
        btn.type = 'button';
        const topicNames = era.topics.map((t: any) => t.name).join('、');
        const sceneCount = era.topics.reduce((sum: number, t: any) => sum + t.scenes.length, 0);
        btn.innerHTML = `<span class="atlas-overview-title">${era.name}</span><span class="atlas-overview-meta">${era.topics.length} 个主题 · ${sceneCount} 个场景</span><span class="atlas-overview-desc">${topicNames}</span>`;
        btn.addEventListener('click', () => selectEra(era));
        list.appendChild(btn);
      }
    } else if (s.activeTopic) {
      for (let i = 0; i < s.activeTopic.scenes.length; i++) {
        const scene = s.activeTopic.scenes[i];
        const btn = document.createElement('button');
        btn.className = 'atlas-overview-item';
        btn.type = 'button';
        const preview = scene.body.length > 68 ? `${scene.body.slice(0, 68)}...` : scene.body;
        btn.innerHTML = `<span class="atlas-overview-title">${scene.title}</span><span class="atlas-overview-meta">场景 ${i + 1}</span><span class="atlas-overview-desc">${preview}</span>`;
        btn.addEventListener('click', () => scrollSceneCard(i));
        list.appendChild(btn);
      }
    } else if (s.activeEra) {
      for (const topic of s.activeEra.topics) {
        const btn = document.createElement('button');
        btn.className = `atlas-overview-item${s.activeTopic === topic ? ' active' : ''}`;
        btn.type = 'button';
        const sceneNames = topic.scenes.map((sc: any) => sc.title).join('、');
        btn.innerHTML = `<span class="atlas-overview-title">${topic.name}</span><span class="atlas-overview-meta">${topic.scenes.length} 个场景</span><span class="atlas-overview-desc">${sceneNames}</span>`;
        btn.addEventListener('click', () => selectTopic(topic));
        list.appendChild(btn);
      }
    }

    panel.appendChild(list);
  }, []);

  const scrollSceneCard = useCallback((index: number) => {
    const panel = scenePanelRef.current;
    if (!panel) return;
    const cards = panel.querySelectorAll('.scene-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  }, []);

  const showScenePanel = useCallback((topic: any) => {
    const s = stateRef.current;
    updateBreadcrumb();
    const panel = scenePanelRef.current;
    if (!panel) return;

    closeScenePanel();
    panel.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'scene-header';
    const topRow = document.createElement('div');
    topRow.className = 'scene-top-row';
    const backBtn = document.createElement('button');
    backBtn.className = 'scene-back';
    backBtn.textContent = '← 返回主题';
    backBtn.addEventListener('click', returnToEra);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'scene-close';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => returnToRoot(true));
    topRow.appendChild(backBtn);
    topRow.appendChild(closeBtn);
    header.appendChild(topRow);

    const title = document.createElement('h2');
    title.className = 'scene-title';
    title.textContent = topic.name;
    header.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'scene-meta';
    meta.textContent = `${s.activeEra.name} · ${topic.scenes.length} 个场景`;
    header.appendChild(meta);

    const progressBar = document.createElement('div');
    progressBar.className = 'scene-progress';
    progressBar.innerHTML = '<div class="scene-progress-fill" style="width:0%"></div>';
    header.appendChild(progressBar);
    panel.appendChild(header);

    const cardsWrap = document.createElement('div');
    cardsWrap.className = 'scene-cards';
    for (let i = 0; i < topic.scenes.length; i++) {
      const scene = topic.scenes[i];
      const card = document.createElement('div');
      card.className = 'scene-card';
      card.innerHTML = `
        <div class="scene-step">
          <span class="scene-num">${i + 1}</span>
          ${i < topic.scenes.length - 1 ? '<div class="scene-line"></div>' : ''}
        </div>
        <div class="scene-body">
          <h3 class="scene-card-title">${scene.title}</h3>
          <p class="scene-card-body">${scene.body}</p>
        </div>
      `;
      cardsWrap.appendChild(card);
    }
    panel.appendChild(cardsWrap);

    cardsWrap.addEventListener('scroll', () => {
      const scrollable = cardsWrap.scrollHeight - cardsWrap.clientHeight;
      const pct = scrollable > 0 ? (cardsWrap.scrollTop / scrollable) * 100 : 100;
      const fill = panel.querySelector('.scene-progress-fill') as HTMLElement;
      if (fill) fill.style.width = `${Math.min(100, pct)}%`;
    });

    requestAnimationFrame(openScenePanel);
  }, [updateBreadcrumb, closeScenePanel, openScenePanel]);

  const selectEra = useCallback((era: any) => {
    const s = stateRef.current;
    s.showHelp = false;
    s.activeEra = era;
    s.activeTopic = null;
    s.level = 2;
    s.hoveredEra = null;
    closeScenePanel();
    if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    updateBreadcrumb();
    refreshOverview();
    zoomToNodes(era.topics, 2.2, () => { markDirty(); });
  }, [closeScenePanel, updateBreadcrumb, refreshOverview, zoomToNodes, markDirty]);

  const selectTopic = useCallback((topic: any) => {
    const s = stateRef.current;
    s.level = 3;
    s.activeTopic = topic;
    s.hoveredTopic = null;
    if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    updateBreadcrumb();
    refreshOverview();
    showScenePanel(topic);
  }, [updateBreadcrumb, refreshOverview, showScenePanel]);

  const returnToEra = useCallback(() => {
    const s = stateRef.current;
    closeScenePanel();
    s.activeTopic = null;
    s.level = 2;
    updateBreadcrumb();
    refreshOverview();
    markDirty();
  }, [closeScenePanel, updateBreadcrumb, refreshOverview, markDirty]);

  const returnToRoot = useCallback((restoreHelp = true) => {
    const s = stateRef.current;
    closeScenePanel();
    s.activeEra = null;
    s.activeTopic = null;
    s.hoveredEra = null;
    s.hoveredTopic = null;
    s.level = 1;
    s.showHelp = restoreHelp;
    if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    updateBreadcrumb();
    refreshOverview();
    zoomTo(1, s.W / 2, s.H / 2, () => { markDirty(); });
  }, [closeScenePanel, updateBreadcrumb, refreshOverview, zoomTo, markDirty]);

  const positionTooltip = useCallback((e: MouseEvent) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    const ttW = tooltip.offsetWidth;
    const ttH = tooltip.offsetHeight;
    let x = e.clientX + 16;
    let y = e.clientY - 8;
    if (x + ttW > window.innerWidth - 8) x = e.clientX - ttW - 16;
    if (y + ttH > window.innerHeight - 8) y = e.clientY - ttH - 8;
    if (y < 8) y = 8;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }, []);

  const buildEraTooltip = useCallback((era: any) => {
    const topicCount = era.topics.length > 0 ? `${era.topics.length} 个主题` : '';
    let preview = '';
    if (era.topics.length > 0) {
      preview = era.topics.slice(0, 2).map((t: any) => t.name).join('、');
      if (era.topics.length > 2) preview += '…';
    }
    return `
      <div class="atlas-tt-head" style="border-left:3px solid ${era.hue}">
        <strong>${era.name}</strong>
        <span class="atlas-tt-sub">${era.sub}</span>
      </div>
      <div class="atlas-tt-meta">${topicCount}</div>
      ${preview ? `<div class="atlas-tt-preview">涵盖：${preview}</div>` : ''}
      <div class="atlas-tt-hint">点击深入探索 →</div>
    `;
  }, []);

  const buildTopicTooltip = useCallback((topic: any, eraName: string) => {
    const firstScene = topic.scenes.length > 0 ? topic.scenes[0].title : '';
    return `
      <div class="atlas-tt-head" style="border-left:3px solid var(--gold)">
        <strong>${topic.name}</strong>
        <span class="atlas-tt-sub">${eraName}</span>
      </div>
      <div class="atlas-tt-meta">${topic.scenes.length} 个历史场景</div>
      ${firstScene ? `<div class="atlas-tt-preview">首个场景：${firstScene}</div>` : ''}
      <div class="atlas-tt-hint">点击查看详细内容 →</div>
    `;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const s = stateRef.current;
    const rect = container.getBoundingClientRect();
    s.W = rect.width;
    s.H = rect.height;
    canvas.width = Math.round(s.W * devicePixelRatio);
    canvas.height = Math.round(s.H * devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    s.scaleRatio = Math.min(rect.width / BASE_W, rect.height / BASE_H);
    markDirty();
  }, [markDirty]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const renderLoop = () => {
      if (s.dirty) draw();
      s.rafId = requestAnimationFrame(renderLoop);
    };

    requestAnimationFrame(() => {
      resize();
      renderLoop();
    });

    function onMove(e: MouseEvent) {
      const pos = getMousePos(e);
      let needsRedraw = false;

      if (s.level === 1) {
        const era = hitTestEra(pos.x, pos.y);
        const newHover = era ? era.id : null;
        if (newHover !== s.hoveredEra) { s.hoveredEra = newHover; needsRedraw = true; }
        canvas!.style.cursor = era ? 'pointer' : 'grab';
        if (era && tooltipRef.current) {
          tooltipRef.current.innerHTML = buildEraTooltip(era);
          tooltipRef.current.style.display = 'block';
          positionTooltip(e);
        } else if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      } else if (s.level === 2) {
        const topic = hitTestTopic(pos.x, pos.y);
        const newHover = topic ? topic.id : null;
        if (newHover !== s.hoveredTopic) { s.hoveredTopic = newHover; needsRedraw = true; }
        canvas!.style.cursor = topic ? 'pointer' : (isNearAnyTopic(pos.x, pos.y) ? 'default' : 'pointer');
        if (topic && tooltipRef.current) {
          tooltipRef.current.innerHTML = buildTopicTooltip(topic, s.activeEra.name);
          tooltipRef.current.style.display = 'block';
          positionTooltip(e);
        } else if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      }

      if (needsRedraw) markDirty();
    }

    function onClick(e: MouseEvent) {
      if (s.suppressClick) { s.suppressClick = false; return; }
      const pos = getMousePos(e);
      if (s.level === 1) {
        const era = hitTestEra(pos.x, pos.y);
        if (era) selectEra(era);
      } else if (s.level === 2) {
        const topic = hitTestTopic(pos.x, pos.y);
        if (topic) selectTopic(topic);
        else if (!isNearAnyTopic(pos.x, pos.y)) returnToRoot(false);
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const delta = e.deltaY > 0 ? 0.92 : 1.08;
      const newZoom = Math.max(0.4, Math.min(5, s.zoom * delta));
      s.pan.x = mx - (mx - s.pan.x) * (newZoom / s.zoom);
      s.pan.y = my - (my - s.pan.y) * (newZoom / s.zoom);
      s.zoom = newZoom;
      markDirty();
    }

    function onMousedown(e: MouseEvent) {
      if (e.button !== 0) return;
      s.isPanning = true;
      s.pointerStart = { x: e.clientX, y: e.clientY };
      s.suppressClick = false;
      s.panStart = { x: e.clientX - s.pan.x, y: e.clientY - s.pan.y };
      canvas!.style.cursor = 'grabbing';
    }

    function onMousemove(e: MouseEvent) {
      if (s.isPanning) {
        if (s.pointerStart) {
          const dx = e.clientX - s.pointerStart.x;
          const dy = e.clientY - s.pointerStart.y;
          if (Math.sqrt(dx * dx + dy * dy) > DRAG_CLICK_TOLERANCE) s.suppressClick = true;
        }
        s.pan.x = e.clientX - s.panStart.x;
        s.pan.y = e.clientY - s.panStart.y;
        markDirty();
      }
    }

    function onMouseup() {
      s.isPanning = false;
      s.pointerStart = null;
      canvas!.style.cursor = 'grab';
      window.setTimeout(() => { s.suppressClick = false; }, 80);
    }

    function onTouchstart(e: TouchEvent) {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        s.isPanning = true;
        s.touchStartTime = Date.now();
        s.touchStartPos = { x: t.clientX, y: t.clientY };
        s.panStart = { x: t.clientX - s.pan.x, y: t.clientY - s.pan.y };
      }
    }

    function onTouchmove(e: TouchEvent) {
      e.preventDefault();
      if (e.touches.length === 1 && s.isPanning) {
        const t = e.touches[0];
        s.pan.x = t.clientX - s.panStart.x;
        s.pan.y = t.clientY - s.panStart.y;
        markDirty();
      }
    }

    function onTouchend(e: TouchEvent) {
      if (e.changedTouches.length !== 1) return;
      const t = e.changedTouches[0];
      const elapsed = Date.now() - s.touchStartTime;
      const dx = t.clientX - (s.touchStartPos?.x ?? 0);
      const dy = t.clientY - (s.touchStartPos?.y ?? 0);
      const moved = Math.sqrt(dx * dx + dy * dy);
      s.isPanning = false;

      if (elapsed < 300 && moved < 10) {
        const pos = getMousePos(t);
        if (s.level === 1) {
          const era = hitTestEra(pos.x, pos.y);
          if (era) selectEra(era);
        } else if (s.level === 2) {
          const topic = hitTestTopic(pos.x, pos.y);
          if (topic) selectTopic(topic);
          else if (!isNearAnyTopic(pos.x, pos.y)) returnToRoot(false);
        }
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (scenePanelRef.current?.classList.contains('open')) returnToEra();
        else if (s.level === 2) returnToRoot(false);
      }
      if (e.key === '+' || e.key === '=') { s.zoom = Math.min(5, s.zoom * 1.15); markDirty(); }
      if (e.key === '-') { s.zoom = Math.max(0.4, s.zoom * 0.87); markDirty(); }
      if (e.key === '0') { zoomTo(1, s.W / 2, s.H / 2); }
    }

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

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
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
      window.removeEventListener('resize', resize);
    };
  }, [draw, markDirty, getMousePos, hitTestEra, hitTestTopic, isNearAnyTopic, buildEraTooltip, buildTopicTooltip, positionTooltip, selectEra, selectTopic, returnToEra, returnToRoot, resize, zoomTo, refreshOverview, updateBreadcrumb]);

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
    if (scenePanelRef.current?.classList.contains('open')) returnToEra();
    else if (s.level === 2) returnToRoot(false);
  }, [returnToEra, returnToRoot]);

  return (
    <div className="atlas-page">
      <div className="atlas-toolbar">
        <div className="atlas-breadcrumb" ref={breadcrumbRef} />
        <div className="atlas-controls">
          <button className="atlas-ctrl-btn" title="返回上级 (Esc)" aria-label="返回" onClick={handleBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button className="atlas-ctrl-btn" title="缩小 (-)" aria-label="缩小" onClick={handleZoomOut}>−</button>
          <button className="atlas-ctrl-btn" title="放大 (+)" aria-label="放大" onClick={handleZoomIn}>+</button>
          <button className="atlas-ctrl-btn" title="重置 (0)" aria-label="重置" onClick={() => returnToRoot(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
      </div>

      <div className="atlas-container" ref={containerRef}>
        <canvas ref={canvasRef} className="atlas-canvas" tabIndex={0} />
        <div className="atlas-tooltip" ref={tooltipRef as any} />
        <aside className="atlas-overview" aria-label="知识图谱目录" ref={overviewRef as any} />
        <aside className="scene-panel" aria-label="历史场景详情" aria-hidden="true" ref={scenePanelRef as any} />
      </div>
    </div>
  );
}
