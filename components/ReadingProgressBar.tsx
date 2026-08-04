"use client";

import { useEffect, useState } from "react";

/**
 * Thin fixed progress bar at the very top of every article page. The sidebar
 * TOC has its own progress indicator, but that one is desktop-only and sits
 * below the fold — this one is visible on every viewport from the first
 * pixel of scrolling. Purely decorative: aria-hidden and pointer-transparent.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="print-hidden pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        className="bg-accent-gold/70 h-full transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
