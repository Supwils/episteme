"use client";

import { useEffect, useRef } from "react";
import { subscribeToScrollFrame } from "@/lib/scroll-frame";

/**
 * Thin fixed progress bar at the very top of every article page. The sidebar
 * TOC has its own progress indicator, but that one is desktop-only and sits
 * below the fold — this one is visible on every viewport from the first
 * pixel of scrolling. Purely decorative: aria-hidden and pointer-transparent.
 */
export function ReadingProgressBar() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeToScrollFrame(({ progress }) => {
      if (indicatorRef.current) indicatorRef.current.style.transform = `scaleX(${progress})`;
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="print-hidden pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        ref={indicatorRef}
        className="bg-accent-gold/70 h-full origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
