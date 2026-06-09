"use client";

import { clsx } from "clsx";

type ClusterToggleProps = {
  clusterMode: boolean;
  onClusterToggle: () => void;
  isMobile?: boolean;
};

export function ClusterToggle({
  clusterMode,
  onClusterToggle,
  isMobile = false,
}: ClusterToggleProps) {
  return (
    <button
      type="button"
      onClick={onClusterToggle}
      className={clsx(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium",
        "border transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]",
        clusterMode
          ? "border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
          : "border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/[0.08]",
      )}
      aria-pressed={clusterMode}
      aria-label={clusterMode ? "切换到自由模式" : "切换到聚类模式"}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
        {clusterMode ? (
          <>
            <circle cx="5" cy="5" r="2.5" />
            <circle cx="11" cy="5" r="2.5" />
            <circle cx="5" cy="11" r="2.5" />
            <circle cx="11" cy="11" r="2.5" />
          </>
        ) : (
          <>
            <circle cx="4" cy="6" r="1.5" />
            <circle cx="12" cy="4" r="1.5" />
            <circle cx="8" cy="12" r="1.5" />
            <path d="M5.5 6L10.5 5M5.5 7.5L7 10.5M11 5.5L9 10.5" strokeLinecap="round" strokeWidth="0.8" />
          </>
        )}
      </svg>
      <span className={isMobile ? 'inline' : 'hidden sm:inline'}>{clusterMode ? "聚类模式" : "自由模式"}</span>
    </button>
  );
}
