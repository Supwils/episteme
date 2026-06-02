// @ts-nocheck
// @ts-check

import { getNodeBounds, hitTestNodes, isNearNodes, scaleValue } from '../../features/atlas/atlas-geometry.js';
import {
  atlasColor as hsl,
  drawAtlasTitle,
  drawCompassRose,
  drawConnections,
  drawGlowCircle,
  drawHelpOverlay,
  drawPaperGrain,
  drawSeaDecorations,
  drawTopoGrid,
  drawWobblePath,
} from '../../features/atlas/atlas-canvas.js';

const BASE_W = 960;
const BASE_H = 520;

function sx(v, sr) { return v * sr; }
function sy(v, sr) { return v * sr; }

export function drawLevel1(ctx, ATLAS_ERAS, hoveredEra, sr) {
  drawConnections({ ctx, items: ATLAS_ERAS, color: '#c8a951', scaleRatio: sr });
  for (const era of ATLAS_ERAS) {
    const isHov = hoveredEra === era.id;
    const r = 48 * sr + (isHov ? 6 * sr : 0);
    const cx = sx(era.x, sr), cy = sy(era.y, sr);
    if (isHov) drawGlowCircle(ctx, cx, cy, r * 1.3, era.hue, 0.08);
    ctx.save();
    drawWobblePath(ctx, cx, cy, r, r * 0.7, era.id.length);
    ctx.fillStyle = hsl(era.hue, isHov ? 0.28 : 0.15); ctx.fill();
    ctx.strokeStyle = hsl(era.hue, isHov ? 0.7 : 0.3); ctx.lineWidth = isHov ? 2 : 1; ctx.stroke();
    ctx.beginPath(); drawWobblePath(ctx, cx, cy, r + 8 * sr, r * 0.7 + 6 * sr, era.id.length + 3);
    ctx.fillStyle = hsl(era.hue, 0.06); ctx.fill(); ctx.restore();
    ctx.textAlign = 'center';
    ctx.font = `bold ${16 * sr}px "Noto Serif SC", serif`; ctx.fillStyle = isHov ? hsl('#f4e8c1', 1) : hsl('#f4e8c1', 0.85); ctx.fillText(era.name, cx, cy + 2 * sr);
    ctx.font = `${10 * sr}px "Noto Sans SC", sans-serif`; ctx.fillStyle = hsl('#a0916e', 0.7); ctx.fillText(era.sub, cx, cy + 18 * sr);
    ctx.font = `${9 * sr}px "Noto Sans SC", sans-serif`; ctx.fillStyle = hsl('#a0916e', 0.5); ctx.fillText(`${era.topics.length} 个主题`, cx, cy + 32 * sr);
    if (isHov) { ctx.font = `${8 * sr}px "Noto Sans SC", sans-serif`; ctx.fillStyle = hsl('#c8a951', 0.6); ctx.fillText('点击探索 →', cx, cy + 46 * sr); }
  }
  drawAtlasTitle({ ctx, title: '人类历史知识图谱', subtitle: '点击时代深入探索 · 滚轮缩放 · 拖拽平移', scaleRatio: sr });
}

export function drawLevel2(ctx, activeEra, hoveredTopic, sr) {
  if (!activeEra) return;
  drawConnections({ ctx, items: activeEra.topics, color: activeEra.hue, scaleRatio: sr });
  for (const t of activeEra.topics) {
    const isHov = hoveredTopic === t.id;
    const r = 36 * sr + (isHov ? 5 * sr : 0);
    const cx = sx(t.x, sr), cy = sy(t.y, sr);
    if (isHov) drawGlowCircle(ctx, cx, cy, r * 1.3, activeEra.hue, 0.1);
    ctx.save();
    drawWobblePath(ctx, cx, cy, r, r * 0.75, t.id.length + 10);
    ctx.fillStyle = hsl(activeEra.hue, isHov ? 0.35 : 0.18); ctx.fill();
    ctx.strokeStyle = hsl(activeEra.hue, isHov ? 0.8 : 0.4); ctx.lineWidth = isHov ? 2 : 1; ctx.stroke(); ctx.restore();
    ctx.textAlign = 'center';
    ctx.font = `bold ${14 * sr}px "Noto Serif SC", serif`; ctx.fillStyle = isHov ? hsl('#f4e8c1', 1) : hsl('#f4e8c1', 0.85); ctx.fillText(t.name, cx, cy + 2 * sr);
    ctx.font = `${9 * sr}px "Noto Sans SC", sans-serif`; ctx.fillStyle = hsl('#a0916e', 0.6); ctx.fillText(`${t.scenes.length} 个场景`, cx, cy + 16 * sr);
    if (isHov && t.scenes.length > 0) { ctx.font = `${8 * sr}px "Noto Sans SC", sans-serif`; ctx.fillStyle = hsl('#c8a951', 0.6); ctx.fillText('点击查看场景 →', cx, cy + 28 * sr); }
  }
  drawAtlasTitle({ ctx, title: activeEra.name, subtitle: '点击主题查看场景 · 点空白处返回 · Esc 返回', scaleRatio: sr });
}

export function drawMinimap(ctx, W, H, zoom, pan, level, ATLAS_ERAS, activeEra, sr) {
  if (zoom <= 1.2) return;
  const mmW = 120, mmH = 65, mmX = W - mmW - 12, mmY = 12;
  ctx.save();
  ctx.fillStyle = 'rgba(15,13,10,0.8)'; ctx.strokeStyle = hsl('#c8a951', 0.3); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(mmX, mmY, mmW, mmH, 4); ctx.fill(); ctx.stroke();
  const viewW = W / zoom, viewH = H / zoom, viewX = -pan.x / zoom, viewY = -pan.y / zoom;
  ctx.strokeStyle = hsl('#c8a951', 0.6); ctx.lineWidth = 1;
  ctx.strokeRect(mmX + (viewX / W) * mmW, mmY + (viewY / H) * mmH, (viewW / W) * mmW, (viewH / H) * mmH);
  const nodes = level === 1 ? ATLAS_ERAS : (activeEra ? activeEra.topics : []);
  for (const n of nodes) {
    ctx.fillStyle = hsl(level === 1 ? n.hue : activeEra.hue, 0.7);
    ctx.beginPath(); ctx.arc(mmX + (n.x / BASE_W) * mmW, mmY + (n.y / BASE_H) * mmH, 2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

export function drawMain(ctx, W, H, pan, zoom, level, ATLAS_ERAS, activeEra, hoveredEra, hoveredTopic, sr, showHelp, clickPulse) {
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0f0d0a';
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(pan.x, pan.y); ctx.scale(zoom, zoom);
  drawPaperGrain({ ctx, width: W, height: H });
  drawTopoGrid({ ctx, width: W, height: H, scaleRatio: sr });
  drawSeaDecorations({ ctx, width: W, height: H, scaleRatio: sr });
  drawCompassRose({ ctx, cx: W - 50 * sr, cy: H - 50 * sr, scaleRatio: sr });
  if (level === 1) drawLevel1(ctx, ATLAS_ERAS, hoveredEra, sr);
  else if (level === 2) drawLevel2(ctx, activeEra, hoveredTopic, sr);
  ctx.restore();
  if (clickPulse) {
    const elapsed = Date.now() - clickPulse.time;
    if (elapsed <= 600) {
      const t = elapsed / 600, r = clickPulse.r + t * 60 * sr, alpha = 0.4 * (1 - t);
      ctx.beginPath(); ctx.arc(clickPulse.x, clickPulse.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = hsl(clickPulse.color, alpha); ctx.lineWidth = 2 * (1 - t); ctx.stroke();
    }
  }
  drawMinimap(ctx, W, H, zoom, pan, level, ATLAS_ERAS, activeEra, sr);
  drawHelpOverlay({ ctx, width: W, height: H, scaleRatio: sr, level, showHelp });
}
