"use client";

import { useEffect, useRef, useState } from "react";
import { buildLearningRouteUrl, type LearningRouteUrlState } from "@/lib/learning-route-url";

export function LearningRouteShareButton({ state }: { state: LearningRouteUrlState }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  const copyRoute = async () => {
    const url = buildLearningRouteUrl(window.location.href, state);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => void copyRoute()}
      className="text-fg-muted hover:text-fg-primary mt-2 min-h-8 border-b border-current text-[10px] transition-colors motion-reduce:transition-none"
    >
      <span aria-live="polite">{copied ? "路线链接已复制" : "复制当前路线链接"}</span>
    </button>
  );
}
