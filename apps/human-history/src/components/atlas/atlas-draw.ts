import { gsap } from 'gsap';
import { getNodeBounds, hitTestNodes, isNearNodes } from '@/features/atlas/atlas-geometry';

export const BASE_W = 960;
export const BASE_H = 520;
export const DRAG_CLICK_TOLERANCE = 6;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getMousePos(
  canvas: HTMLCanvasElement,
  pan: { x: number; y: number },
  zoom: number,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - pan.x) / zoom,
    y: (clientY - rect.top - pan.y) / zoom,
  };
}

export function hitTestEra(atlasEras: readonly any[], mx: number, my: number, scaleRatio: number) {
  return hitTestNodes(atlasEras, mx, my, 55 * scaleRatio, scaleRatio);
}

export function hitTestTopic(activeEra: any, mx: number, my: number, scaleRatio: number) {
  if (!activeEra) return null;
  return hitTestNodes(activeEra.topics, mx, my, 40 * scaleRatio, scaleRatio);
}

export function isNearAnyTopic(activeEra: any, mx: number, my: number, scaleRatio: number): boolean {
  if (!activeEra) return false;
  return isNearNodes(activeEra.topics, mx, my, 60 * scaleRatio, scaleRatio);
}

export function zoomTo(
  state: any,
  markDirty: () => void,
  target: number,
  cx: number,
  cy: number,
  cb?: () => void,
) {
  const reduce = prefersReducedMotion();
  const dur = reduce ? 0.01 : 0.5;
  const startZoom = state.zoom;
  const startPan = { ...state.pan };
  const targetPan = { x: state.W / 2 - cx * target, y: state.H / 2 - cy * target };
  const obj = { t: 0 };
  gsap.to(obj, {
    t: 1,
    duration: dur,
    ease: 'power2.inOut',
    onUpdate: () => {
      state.zoom = startZoom + (target - startZoom) * obj.t;
      state.pan.x = startPan.x + (targetPan.x - startPan.x) * obj.t;
      state.pan.y = startPan.y + (targetPan.y - startPan.y) * obj.t;
      markDirty();
    },
    onComplete: () => { if (cb) cb(); },
  });
}

export function zoomToNodes(
  state: any,
  markDirty: () => void,
  nodes: any[],
  maxZoom = 2.2,
  cb?: () => void,
) {
  if (!nodes || nodes.length === 0) {
    zoomTo(state, markDirty, 1, state.W / 2, state.H / 2, cb);
    return;
  }
  const { minX, maxX, minY, maxY } = getNodeBounds(nodes, state.scaleRatio);
  const pad = 140 * state.scaleRatio;
  const contentW = Math.max(1, maxX - minX + pad * 2);
  const contentH = Math.max(1, maxY - minY + pad * 2);
  const targetZoom = Math.max(0.7, Math.min(maxZoom, state.W / contentW, state.H / contentH));
  zoomTo(state, markDirty, targetZoom, (minX + maxX) / 2, (minY + maxY) / 2, cb);
}

export function positionTooltip(tooltip: HTMLElement, clientX: number, clientY: number) {
  const ttW = tooltip.offsetWidth;
  const ttH = tooltip.offsetHeight;
  let x = clientX + 16;
  let y = clientY - 8;
  if (x + ttW > window.innerWidth - 8) x = clientX - ttW - 16;
  if (y + ttH > window.innerHeight - 8) y = clientY - ttH - 8;
  if (y < 8) y = 8;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

export function buildEraTooltip(era: any): string {
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
}

export function buildTopicTooltip(topic: any, eraName: string): string {
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
}

export function resize(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  state: any,
  markDirty: () => void,
) {
  const rect = container.getBoundingClientRect();
  state.W = rect.width;
  state.H = rect.height;
  canvas.width = Math.round(rect.width * devicePixelRatio);
  canvas.height = Math.round(rect.height * devicePixelRatio);
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  state.scaleRatio = Math.min(rect.width / BASE_W, rect.height / BASE_H);
  markDirty();
}
