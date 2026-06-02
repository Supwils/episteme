"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        window.scrollTo({ top: 0, behavior: mq.matches ? "auto" : "smooth" });
      }}
      aria-label="回到顶部"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border border-[#2a2a3a] bg-[rgba(17,17,24,0.9)] backdrop-blur-md text-[#9ca3af] hover:text-[#e8e8f0] hover:border-[#6366f1] transition-colors duration-200"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
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
