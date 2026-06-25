"use client";

import { useEffect, useRef } from "react";

// A faint drifting constellation behind the hero — nodes joined by thin lines,
// echoing the platform's knowledge-graph identity. Purely decorative: it sits
// below the content (pointer-events-none) and never affects the LCP text.
const LINK_DIST = 130; // px in CSS space within which two nodes are joined
const DENSITY = 14000; // one node per this many CSS px² (capped below)
const MAX_NODES = 70;
const NODE_RGB = "212, 175, 95"; // accent-gold

type P = { x: number; y: number; vx: number; vy: number };

export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let nodes: P[] = [];
    let raf = 0;

    const seed = (count: number) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        // slow drift; ~6–18 px/s
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_NODES, Math.round((w * h) / DENSITY));
      nodes = seed(count);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(${NODE_RGB}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${NODE_RGB}, 0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x += w;
        else if (n.x > w) n.x -= w;
        if (n.y < 0) n.y += h;
        else if (n.y > h) n.y -= h;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    let onScreen = true;
    const canRun = () => !reduced && !document.hidden && onScreen;
    const play = () => {
      cancelAnimationFrame(raf);
      if (canRun()) raf = requestAnimationFrame(step);
    };

    resize();
    if (reduced)
      draw(); // single static frame, no motion
    else play();

    const onResize = () => {
      resize();
      if (reduced) draw();
      else play();
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else play();
    };
    // Stop the loop while the hero is scrolled out of view — no point burning
    // frames (or battery) animating pixels nobody can see.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
        if (onScreen) play();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
    </div>
  );
}
