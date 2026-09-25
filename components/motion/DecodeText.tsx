"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const GLYPHS = "·:/-_=+<>|\\^~0123456789abcdef";
const SETTLE_MS = 720;
const STAGGER_MS = 28;
const FRAME_MS = 45;

/**
 * Instrument-readout reveal for short mono labels: every character cycles
 * through glyphs and settles left to right. Server markup carries the final
 * text; the scramble only runs after hydration and under no-preference motion.
 */
export function DecodeText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    const chars = Array.from(text);
    const start = performance.now();
    let timer = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      let done = true;
      const out = chars.map((char, i) => {
        if (char === " ") return char;
        if (elapsed >= SETTLE_MS + i * STAGGER_MS) return char;
        done = false;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      node.textContent = out.join("");
      if (!done) timer = window.setTimeout(tick, FRAME_MS);
    };
    timer = window.setTimeout(tick, 60);
    return () => {
      window.clearTimeout(timer);
      node.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
