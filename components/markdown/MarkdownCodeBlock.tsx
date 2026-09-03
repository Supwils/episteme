"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function MarkdownCodeBlock({
  code,
  language,
  accentColor,
}: {
  code: string;
  language: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const attempt = useRef(0);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCopied(false);
    setCopyError(false);
    return () => {
      attempt.current += 1;
      if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
      feedbackTimer.current = null;
    };
  }, [code]);

  const handleCopy = useCallback(async () => {
    const currentAttempt = ++attempt.current;
    if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = null;
    setCopied(false);
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(code);
      if (currentAttempt !== attempt.current) return;
      setCopied(true);
      feedbackTimer.current = setTimeout(() => {
        feedbackTimer.current = null;
        setCopied(false);
      }, 2000);
    } catch {
      // Permission and API availability vary; only the latest attempt owns feedback.
      if (currentAttempt === attempt.current) setCopyError(true);
    }
  }, [code]);

  return (
    <div className="group/code border-border-faint relative my-6 overflow-hidden rounded-lg border">
      {language ? (
        <div className="border-border-faint bg-bg-elevated/50 border-b px-4 py-1.5">
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: `color-mix(in oklab, ${accentColor} 42%, var(--color-fg-primary))` }}
          >
            {language}
          </span>
        </div>
      ) : null}
      <pre tabIndex={0} className="bg-bg-elevated overflow-x-auto p-4">
        <code className="text-fg-primary font-mono text-sm leading-relaxed">{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="border-border-faint bg-bg-panel/80 hover:bg-bg-elevated absolute top-2 right-2 rounded-md border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-focus-within/code:opacity-100 group-hover/code:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100"
        style={{ color: copied ? "#6bae8a" : accentColor }}
        aria-label={copied ? "已复制" : "复制代码"}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
      <span
        role="status"
        className={
          copyError
            ? "border-border-faint text-fg-muted block border-t px-4 py-2 text-xs"
            : "sr-only"
        }
      >
        {copyError ? "复制失败，请手动选择代码，或重试。" : copied ? "代码已复制。" : ""}
      </span>
    </div>
  );
}
