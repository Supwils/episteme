"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { subscribeToScrollFrame } from "@/lib/scroll-frame";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  // When a reading path is active the bottom bar occupies the lower edge, so
  // lift this button above it to avoid overlap (collision on < ~1420px).
  const pathActive = useSearchParams().get("path") !== null;

  useEffect(() => {
    let previousVisible: boolean | undefined;
    return subscribeToScrollFrame(({ scrollY }) => {
      const nextVisible = scrollY > 300;
      if (nextVisible === previousVisible) return;
      previousVisible = nextVisible;
      setVisible(nextVisible);
    });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        window.scrollTo({ top: 0, behavior: mq.matches ? "auto" : "smooth" });
      }}
      aria-label="回到顶部"
      className={`print-hidden fixed right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--muted)] backdrop-blur-md transition-[bottom,color,border-color] duration-200 hover:border-[var(--accent)] hover:text-[var(--foreground)] ${pathActive ? "bottom-24" : "bottom-6"} [[data-narration-active]_&]:bottom-24`}
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}
