"use client";

import { clsx } from "clsx";

type CrossDomainToggleProps = {
  active: boolean;
  onToggle: () => void;
  isMobile?: boolean;
};

// Toggles "only cross-domain edges": hides every same-domain link so the graph
// becomes a pure interdisciplinary map — visual proof that knowledge is one web.
export function CrossDomainToggle({ active, onToggle, isMobile = false }: CrossDomainToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
        "border transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]",
        active
          ? "border-[#d9a441]/40 bg-[#d9a441]/10 text-[#e8c879]"
          : "border-white/[0.04] text-white/40 hover:border-white/[0.08] hover:text-white/60"
      )}
      aria-pressed={active}
      aria-label={active ? "显示全部连接" : "只看跨学科连接"}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-3.5 w-3.5"
      >
        <circle cx="3.5" cy="8" r="2" />
        <circle cx="12.5" cy="8" r="2" />
        <path d="M5.5 8h5" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      </svg>
      <span className={isMobile ? "inline" : "hidden sm:inline"}>跨域桥</span>
    </button>
  );
}
