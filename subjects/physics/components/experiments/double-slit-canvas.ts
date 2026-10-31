import { screenDensity, type SlitMode } from "./double-slit-model";

type Layout = ReturnType<typeof layoutFor>;
export type SlitHit = { position: number; spread: number };

function layoutFor(w: number, h: number) {
  return {
    sourceX: w * 0.08,
    barrierX: w * 0.4,
    screenX: w * 0.78,
    centerY: h * 0.5,
    slitTop: h * 0.42,
    slitBottom: h * 0.58,
    slitHalfWidth: h * 0.018,
  };
}

function drawApparatus(ctx: CanvasRenderingContext2D, w: number, h: number, mode: SlitMode) {
  const layout = layoutFor(w, h);
  const { barrierX, sourceX, centerY, slitTop, slitBottom, slitHalfWidth } = layout;
  ctx.fillStyle = "#6ad0ff";
  ctx.beginPath();
  ctx.arc(sourceX, centerY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#555b6d";
  ctx.fillRect(barrierX, 0, 4, slitTop - slitHalfWidth);
  ctx.fillRect(barrierX, slitTop + slitHalfWidth, 4, slitBottom - slitTop - 2 * slitHalfWidth);
  ctx.fillRect(barrierX, slitBottom + slitHalfWidth, 4, h - slitBottom - slitHalfWidth);
  ctx.font = "10px monospace";
  ctx.textAlign = "right";
  ctx.fillStyle = "#a8adbd";
  ctx.fillText("A", barrierX - 6, slitTop + 3);
  ctx.fillText("B", barrierX - 6, slitBottom + 3);
  if (mode === "observe") {
    ctx.fillStyle = "#ffb45a";
    for (const y of [slitTop, slitBottom])
      ctx.fillRect(barrierX + 6, y - slitHalfWidth, 5, 2 * slitHalfWidth);
  }
  return layout;
}

function drawDensity(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mode: SlitMode,
  layout: Layout
) {
  const curveX = w * 0.87;
  const curveWidth = w * 0.1;
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(layout.screenX, h * 0.05, w * 0.065, h * 0.9);
  ctx.strokeStyle = mode === "wave" ? "#6ad0ff" : "#ffb45a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i <= 240; i++) {
    const u = (2 * i) / 240 - 1;
    const x = curveX + screenDensity(u, mode) * curveWidth;
    const y = h * (0.5 + 0.45 * u);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#a8adbd";
  ctx.font = "10px monospace";
  ctx.textAlign = "center";
  ctx.fillText("落点", layout.screenX + w * 0.0325, h * 0.04);
}

function drawHits(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mode: SlitMode,
  hits: SlitHit[],
  layout: Layout
) {
  ctx.fillStyle = mode === "wave" ? "rgba(106,208,255,0.75)" : "rgba(255,180,90,0.75)";
  for (const hit of hits) {
    ctx.beginPath();
    ctx.arc(
      layout.screenX + (0.01 + 0.045 * hit.spread) * w,
      h * (0.5 + 0.45 * hit.position),
      1.2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

export function drawDoubleSlit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mode: SlitMode,
  hits: SlitHit[]
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, "#060814");
  gradient.addColorStop(1, "#0f1320");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  const layout = drawApparatus(ctx, w, h, mode);
  drawDensity(ctx, w, h, mode, layout);
  drawHits(ctx, w, h, mode, hits, layout);
}
