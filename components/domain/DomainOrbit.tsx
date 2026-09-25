"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { OrbitPayload } from "@/lib/domain-orbit";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const RING_INNER = 0.16; // fraction of max radius for L1
const RING_SPEEDS = [0.05, -0.036, 0.028, -0.022, 0.017]; // rad/s per level, alternating
const HIT_RADIUS = 16; // px
const SPINE_START = -0.95; // rad — spine leaves the core toward the upper right
const SPINE_TWIST = 0.38; // rad per level
const LABEL_FONT = '11px ui-monospace, "SFMono-Regular", Menlo, monospace';

type Placed = { angle: number; ring: number; x: number; y: number };

function hexToRgb(color: string): string {
  const hex = /^#([0-9a-f]{6})$/i.exec(color)?.[1];
  if (!hex) return "230, 227, 218";
  const n = parseInt(hex, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * The domain's knowledge graph as an orrery: one ring per cognitive level
 * (L1 at the centre, L5 outermost), nodes drifting along their rings, the
 * curated learning spine lit as a path through them. Hover lights a node
 * and its edges; click opens the article. Decorative on top of the same
 * links the spine preview renders as HTML, so nothing is only reachable here.
 */
export function DomainOrbit({
  payload,
  accent,
  className = "absolute inset-y-0 right-0 hidden h-full w-[46%] lg:block",
}: {
  payload: OrbitPayload;
  accent: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const accentRgb = hexToRgb(accent);
    let inkRgb = "230, 227, 218";
    const readInk = () => {
      // Canvas normalises whatever the theme token resolves to into #rrggbb.
      ctx.fillStyle = getComputedStyle(canvas).color;
      inkRgb = hexToRgb(String(ctx.fillStyle));
    };

    const { nodes, edges } = payload;
    const perRing = [0, 0, 0, 0, 0];
    const slot = nodes.map((node) => perRing[node.level - 1]!++);
    const placed: Placed[] = nodes.map((node, i) => {
      const count = perRing[node.level - 1]!;
      // Spine nodes sit on a fixed gentle spiral so the lit path stays legible
      // while everything else orbits; golden-angle jitter keeps the rest from
      // reading as a perfect clock face.
      const angle = node.spine
        ? SPINE_START + (node.level - 1) * SPINE_TWIST
        : (slot[i]! / count) * Math.PI * 2 + ((i * 0.618) % 0.4);
      return { angle, ring: node.level - 1, x: 0, y: 0 };
    });
    const adjacency = nodes.map(() => new Set<number>());
    for (const [a, b] of edges) {
      adjacency[a]!.add(b);
      adjacency[b]!.add(a);
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let hovered = -1;
    let px = NaN;
    let py = NaN;
    let last = performance.now();
    const phase = [0, 0, 0, 0, 0];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readInk();
    };

    const layout = () => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - 30;
      for (let i = 0; i < placed.length; i++) {
        const p = placed[i]!;
        const r = maxR * (RING_INNER + (1 - RING_INNER) * (p.ring / 4));
        const a = p.angle + (nodes[i]!.spine ? 0 : phase[p.ring]!);
        p.x = cx + Math.cos(a) * r;
        p.y = cy + Math.sin(a) * r;
      }
    };

    const pickHovered = () => {
      if (Number.isNaN(px)) return -1;
      let best = -1;
      let bestD2 = HIT_RADIUS * HIT_RADIUS;
      for (let i = 0; i < placed.length; i++) {
        const p = placed[i]!;
        const d2 = (p.x - px) ** 2 + (p.y - py) ** 2;
        if (d2 < bestD2) {
          bestD2 = d2;
          best = i;
        }
      }
      return best;
    };

    const drawLabel = (text: string, x: number, y: number, strong: boolean) => {
      ctx.font = LABEL_FONT;
      const width = ctx.measureText(text).width;
      const left = Math.min(Math.max(x + 10, 4), w - width - 10);
      const top = Math.min(Math.max(y - 8, 4), h - 20);
      if (strong) {
        ctx.fillStyle = `rgba(${inkRgb}, 0.12)`;
        ctx.fillRect(left - 5, top - 3, width + 10, 20);
      }
      ctx.fillStyle = `rgba(${inkRgb}, ${strong ? 0.95 : 0.62})`;
      ctx.textBaseline = "top";
      ctx.fillText(text, left, top);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - 30;
      // A hidden canvas (the orbit is desktop-only) measures 0×0.
      if (maxR <= 0) return;

      // Orbit guides
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 5; ring++) {
        ctx.strokeStyle = `rgba(${inkRgb}, ${ring === 0 ? 0.1 : 0.055})`;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (RING_INNER + (1 - RING_INNER) * (ring / 4)), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Edges
      for (const [a, b] of edges) {
        const pa = placed[a]!;
        const pb = placed[b]!;
        const touchesHover = hovered === a || hovered === b;
        const onSpine = nodes[a]!.spine && nodes[b]!.spine;
        if (touchesHover) {
          ctx.strokeStyle = `rgba(${accentRgb}, 0.85)`;
          ctx.lineWidth = 1.2;
        } else if (onSpine) {
          ctx.strokeStyle = `rgba(${accentRgb}, 0.55)`;
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = `rgba(${inkRgb}, ${hovered >= 0 ? 0.035 : 0.075})`;
          ctx.lineWidth = 0.7;
        }
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Nodes
      for (let i = 0; i < placed.length; i++) {
        const p = placed[i]!;
        const node = nodes[i]!;
        const isHover = i === hovered;
        const neighbour = hovered >= 0 && adjacency[hovered]!.has(i);
        const lit = isHover || neighbour || node.spine;
        const radius = isHover ? 5 : node.spine ? 3.6 : neighbour ? 3 : 2.1;
        ctx.fillStyle = lit
          ? `rgba(${accentRgb}, ${isHover ? 1 : node.spine ? 0.9 : 0.75})`
          : `rgba(${inkRgb}, ${hovered >= 0 ? 0.28 : 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        if (isHover) {
          ctx.strokeStyle = `rgba(${accentRgb}, 0.35)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Labels: spine always, hovered on top
      for (let i = 0; i < placed.length; i++) {
        if (nodes[i]!.spine && i !== hovered)
          drawLabel(nodes[i]!.label, placed[i]!.x, placed[i]!.y, false);
      }
      if (hovered >= 0)
        drawLabel(nodes[hovered]!.label, placed[hovered]!.x, placed[hovered]!.y, true);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (let ring = 0; ring < 5; ring++) phase[ring] = phase[ring]! + RING_SPEEDS[ring]! * dt;
      layout();
      const next = pickHovered();
      if (next !== hovered) {
        hovered = next;
        canvas.style.cursor = hovered >= 0 ? "pointer" : "";
      }
      draw();
      raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      layout();
      const next = pickHovered();
      hovered = next;
      canvas.style.cursor = hovered >= 0 ? "pointer" : "";
      draw();
    };

    let onScreen = true;
    const canRun = () => !reduced && !document.hidden && onScreen;
    const play = () => {
      cancelAnimationFrame(raf);
      if (canRun()) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    if (reduced) renderStatic();
    else play();

    const onResize = () => {
      resize();
      if (reduced) renderStatic();
      else play();
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else play();
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
      if (reduced) renderStatic();
    };
    const onPointerLeave = () => {
      px = NaN;
      py = NaN;
      if (reduced) renderStatic();
    };
    const onClick = () => {
      const target = hovered >= 0 ? nodes[hovered] : undefined;
      if (target) router.push(target.url);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
        if (onScreen) play();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    const themeWatcher = new MutationObserver(() => {
      readInk();
      if (reduced) renderStatic();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeWatcher.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [payload, accent, router]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`text-fg-primary ${className}`} />;
}
