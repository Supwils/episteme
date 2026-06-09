import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/a11y";
import {
  getNodeBounds,
  hitTestNodes,
  isNearNodes,
} from "@/src-history/features/atlas/atlas-geometry";
import type { AtlasEra, AtlasTopic, AtlasState } from "@/src-history/types/atlas";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const BASE_W = 960;
export const BASE_H = 520;
export const DRAG_CLICK_TOLERANCE = 6;

let _activeZoomTween: gsap.core.Tween | null = null;

export function killActiveZoomTween() {
  _activeZoomTween?.kill();
  _activeZoomTween = null;
}

export function getMousePos(
  canvas: HTMLCanvasElement,
  pan: { x: number; y: number },
  zoom: number,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - pan.x) / zoom,
    y: (clientY - rect.top - pan.y) / zoom,
  };
}

export function hitTestEra(
  atlasEras: readonly AtlasEra[],
  mx: number,
  my: number,
  scaleRatio: number
) {
  return hitTestNodes(atlasEras, mx, my, 55 * scaleRatio, scaleRatio);
}

export function hitTestTopic(
  activeEra: AtlasEra | null,
  mx: number,
  my: number,
  scaleRatio: number
) {
  if (!activeEra) return null;
  return hitTestNodes(activeEra.topics, mx, my, 40 * scaleRatio, scaleRatio);
}

export function isNearAnyTopic(
  activeEra: AtlasEra | null,
  mx: number,
  my: number,
  scaleRatio: number
): boolean {
  if (!activeEra) return false;
  return isNearNodes(activeEra.topics, mx, my, 60 * scaleRatio, scaleRatio);
}

export function zoomTo(
  state: AtlasState,
  markDirty: () => void,
  target: number,
  cx: number,
  cy: number,
  cb?: () => void
) {
  const reduce = prefersReducedMotion();
  const dur = reduce ? 0.01 : 0.5;
  const startZoom = state.zoom;
  const startPan = { ...state.pan };
  const targetPan = { x: state.W / 2 - cx * target, y: state.H / 2 - cy * target };
  const obj = { t: 0 };
  killActiveZoomTween();
  _activeZoomTween = gsap.to(obj, {
    t: 1,
    duration: dur,
    ease: "power2.inOut",
    onUpdate: () => {
      state.zoom = startZoom + (target - startZoom) * obj.t;
      state.pan.x = startPan.x + (targetPan.x - startPan.x) * obj.t;
      state.pan.y = startPan.y + (targetPan.y - startPan.y) * obj.t;
      markDirty();
    },
    onComplete: () => {
      if (cb) cb();
    },
  });
}

export function zoomToNodes(
  state: AtlasState,
  markDirty: () => void,
  nodes: AtlasTopic[],
  maxZoom = 2.2,
  cb?: () => void
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
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
}

export function buildEraTooltip(era: AtlasEra): string {
  const topicCount = era.topics.length > 0 ? `${era.topics.length} 个主题` : "";
  let preview = "";
  if (era.topics.length > 0) {
    preview = era.topics
      .slice(0, 2)
      .map((t) => escapeHtml(t.name))
      .join("、");
    if (era.topics.length > 2) preview += "…";
  }
  return `
    <div class="atlas-tt-head" style="border-left:3px solid ${escapeHtml(era.hue)}">
      <strong>${escapeHtml(era.name)}</strong>
      <span class="atlas-tt-sub">${escapeHtml(era.sub)}</span>
    </div>
    <div class="atlas-tt-meta">${escapeHtml(topicCount)}</div>
    ${preview ? `<div class="atlas-tt-preview">涵盖：${preview}</div>` : ""}
    <div class="atlas-tt-hint">点击深入探索 →</div>
  `;
}

export function buildTopicTooltip(topic: AtlasTopic, eraName: string): string {
  const firstScene = topic.scenes.length > 0 ? escapeHtml(topic.scenes[0]!.title) : "";
  return `
    <div class="atlas-tt-head" style="border-left:3px solid var(--gold)">
      <strong>${escapeHtml(topic.name)}</strong>
      <span class="atlas-tt-sub">${escapeHtml(eraName)}</span>
    </div>
    <div class="atlas-tt-meta">${escapeHtml(String(topic.scenes.length))} 个历史场景</div>
    ${firstScene ? `<div class="atlas-tt-preview">首个场景：${firstScene}</div>` : ""}
    <div class="atlas-tt-hint">点击查看详细内容 →</div>
  `;
}

export function resize(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  state: AtlasState,
  markDirty: () => void
) {
  const rect = container.getBoundingClientRect();
  state.W = rect.width;
  state.H = rect.height;
  canvas.width = Math.round(rect.width * devicePixelRatio);
  canvas.height = Math.round(rect.height * devicePixelRatio);
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  state.scaleRatio = Math.min(rect.width / BASE_W, rect.height / BASE_H);
  markDirty();
}
