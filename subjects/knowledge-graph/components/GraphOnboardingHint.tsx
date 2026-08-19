"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kg-onboarding-dismissed";

/**
 * First-visit onboarding hint for the knowledge graph: one dismissible line
 * explaining what the canvas is and how to interact with it. Dismissal is
 * session-scoped (sessionStorage) — this is orientation, not progress
 * persistence. The graph page forces a dark canvas in both themes, so the
 * hint uses the canvas palette (kg-tooltip style) rather than theme tokens.
 * No entrance animation, so prefers-reduced-motion is trivially respected.
 * No backdrop-blur: over the continuously repainting canvas it forces a
 * re-blur per frame under software rendering (CI Lighthouse regression:
 * LCP 15.3s / TBT ~900ms, run 32145137685).
 */
export function GraphOnboardingHint() {
  // Render nothing until mounted: sessionStorage is client-only.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage unavailable (private mode) — dismissal just won't persist.
    }
  };

  return (
    <div
      role="note"
      className="pointer-events-none absolute top-3 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-3"
    >
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#111118]/90 py-2 pr-1.5 pl-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <p className="m-0 flex-1 text-center text-[0.78rem] leading-relaxed text-[#e8e8f0]">
          人类知识的关联网络——点击节点查看详情，拖拽旋转，滚轮缩放
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="关闭引导提示"
          className="shrink-0 rounded px-2 py-1 text-[0.72rem] text-[#a0a4b8] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#818cf8]"
        >
          知道了
        </button>
      </div>
    </div>
  );
}
