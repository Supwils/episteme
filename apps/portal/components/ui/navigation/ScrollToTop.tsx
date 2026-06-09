"use client";

import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full",
        "bg-bg-panel/80 backdrop-blur border border-white/10",
        "text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated",
        "transition-all duration-200 flex items-center justify-center",
        className
      )}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
