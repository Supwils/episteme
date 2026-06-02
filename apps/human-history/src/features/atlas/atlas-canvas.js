// @ts-check

import { scaleValue } from './atlas-geometry.js';

export function atlasColor(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function drawWobblePath(ctx, cx, cy, rx, ry, seed) {
  const pts = [];
  const count = 40;
  for (let i = 0; i <= count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const noise = Math.sin(angle * 3 + seed) * 4 + Math.cos(angle * 5 + seed * 2) * 3;
    pts.push({
      x: cx + (rx + noise) * Math.cos(angle),
      y: cy + (ry + noise) * Math.sin(angle),
    });
  }
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i += 2) {
    const xc = (pts[i].x + pts[i + 1].x) / 2;
    const yc = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
  }
  ctx.closePath();
}

export function drawPaperGrain({ ctx, width, height }) {
  const rng = (seed) => {
    seed = Math.sin(seed) * 43758.5453;
    return seed - Math.floor(seed);
  };
  ctx.fillStyle = atlasColor('#c8a951', 0.015);
  for (let i = 0; i < 200; i++) {
    const x = rng(i * 7.3) * width;
    const y = rng(i * 13.7) * height;
    const r = rng(i * 3.1) * 1.2 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawTopoGrid({ ctx, width, height, scaleRatio }) {
  ctx.strokeStyle = atlasColor('#c8a951', 0.04);
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 14]);
  const step = 80 * scaleRatio;
  for (let y = step; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let x = step; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

export function drawCompassRose({ ctx, cx, cy, scaleRatio }) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = atlasColor('#c8a951', 0.15);
  ctx.lineWidth = 0.8;
  const r = 22 * scaleRatio;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -r); ctx.lineTo(0, r);
  ctx.moveTo(-r, 0); ctx.lineTo(r, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -r - 4 * scaleRatio);
  ctx.lineTo(-3 * scaleRatio, -r);
  ctx.lineTo(3 * scaleRatio, -r);
  ctx.closePath();
  ctx.fillStyle = atlasColor('#c8a951', 0.2);
  ctx.fill();
  ctx.font = `${8 * scaleRatio}px "Noto Serif SC", serif`;
  ctx.fillStyle = atlasColor('#c8a951', 0.2);
  ctx.textAlign = 'center';
  ctx.fillText('N', 0, -r - 8 * scaleRatio);
  ctx.restore();
}

export function drawSeaDecorations({ ctx, width, height, scaleRatio }) {
  const rng = (seed) => {
    seed = Math.sin(seed) * 43758.5453;
    return seed - Math.floor(seed);
  };
  ctx.strokeStyle = atlasColor('#c8a951', 0.06);
  ctx.lineWidth = 0.6;
  for (let i = 0; i < 15; i++) {
    const x = rng(i * 11) * width;
    const y = rng(i * 17) * height;
    const len = (15 + rng(i * 5) * 20) * scaleRatio;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + len / 2, y - 3 * scaleRatio, x + len, y);
    ctx.stroke();
  }
}

export function drawConnectionLine({ ctx, x1, y1, x2, y2, color, alpha }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curve = dist * 0.1;
  const cpx = midX - (dy / dist) * curve;
  const cpy = midY + (dx / dist) * curve;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cpx, cpy, x2, y2);
  ctx.strokeStyle = atlasColor(color, alpha);
  ctx.lineWidth = 0.8;
  ctx.setLineDash([4, 6]);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawConnections({ ctx, items, color, scaleRatio }) {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      drawConnectionLine({
        ctx,
        x1: scaleValue(items[i].x, scaleRatio),
        y1: scaleValue(items[i].y, scaleRatio),
        x2: scaleValue(items[j].x, scaleRatio),
        y2: scaleValue(items[j].y, scaleRatio),
        color,
        alpha: 0.12,
      });
    }
  }
}

export function drawGlowCircle(ctx, x, y, r, color, intensity) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 1.5);
  grad.addColorStop(0, atlasColor(color, intensity));
  grad.addColorStop(1, atlasColor(color, 0));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.5, 0, Math.PI * 2);
  ctx.fill();
}

export function drawAtlasTitle({ ctx, title, subtitle, scaleRatio }) {
  ctx.textAlign = 'left';
  ctx.font = `bold ${20 * scaleRatio}px "Noto Serif SC", serif`;
  ctx.fillStyle = atlasColor('#f4e8c1', 0.9);
  ctx.fillText(title, 20 * scaleRatio, 36 * scaleRatio);
  ctx.font = `${12 * scaleRatio}px "Noto Sans SC", sans-serif`;
  ctx.fillStyle = atlasColor('#a0916e', 0.6);
  ctx.fillText(subtitle, 20 * scaleRatio, 54 * scaleRatio);
}

export function drawHelpOverlay({ ctx, width, height, scaleRatio, level, showHelp }) {
  if (!showHelp || level !== 1) return;

  const lines = [
    '拖拽平移视图',
    '滚轮缩放',
    '点击节点探索',
    'Esc 返回 / +− 缩放',
  ];
  const lineH = 20 * scaleRatio;
  const boxW = 180 * scaleRatio;
  const boxH = lines.length * lineH + 28 * scaleRatio;
  const boxX = width - boxW - 16 * scaleRatio;
  const boxY = height - boxH - 16 * scaleRatio;

  ctx.save();
  ctx.fillStyle = 'rgba(15,13,10,0.85)';
  ctx.strokeStyle = atlasColor('#c8a951', 0.25);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 6);
  ctx.fill();
  ctx.stroke();

  ctx.font = `${11}px "Noto Sans SC", sans-serif`;
  ctx.textAlign = 'left';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillStyle = atlasColor('#a0916e', 0.7);
    ctx.fillText(lines[i], boxX + 12, boxY + 20 + i * 16);
  }
  ctx.restore();
}
