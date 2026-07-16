"use client";

import Link from "next/link";
import type { ReactNode, RefObject } from "react";
import type { DeferredKnowledgeStatus } from "./useDeferredKnowledgeData";

export function DeferredKnowledgePanel({
  children,
  containerRef,
  description,
  onLoad,
  onRetry,
  status,
  testId,
  title,
  triggerTestIds = [],
  fallbackLinks = [],
}: {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  description: string;
  onLoad: () => void;
  onRetry: () => void;
  status: DeferredKnowledgeStatus;
  testId: string;
  title: string;
  triggerTestIds?: readonly string[];
  fallbackLinks?: readonly { href: string; label: string }[];
}) {
  if (status === "ready") {
    return (
      <div ref={containerRef} data-testid={testId}>
        {children}
      </div>
    );
  }

  const titleId = `${testId}-deferred-title`;
  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className="border-border-faint bg-bg-near mt-8 flex flex-col justify-between border px-4 py-5 sm:px-6"
      style={{ minHeight: "100vh" }}
      aria-labelledby={titleId}
    >
      {triggerTestIds.map((triggerTestId) => (
        <span key={triggerTestId} data-testid={triggerTestId} aria-hidden="true" />
      ))}
      <div>
        <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
          deferred knowledge module
        </p>
        <h3 id={titleId} className="font-display text-fg-primary mt-1 text-xl font-semibold">
          {title}
        </h3>
        <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">{description}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        {status === "loading" ? (
          <p className="text-fg-muted text-xs" role="status" aria-live="polite">
            正在载入这一部分的策展数据…
          </p>
        ) : status === "error" ? (
          <button
            type="button"
            onClick={onRetry}
            className="border-border-faint text-fg-primary min-h-10 border px-4 text-xs"
          >
            重新载入
          </button>
        ) : (
          <button
            type="button"
            onClick={onLoad}
            className="border-border-faint text-fg-primary min-h-10 border px-4 text-xs"
          >
            立即载入
          </button>
        )}
        <Link
          href="/knowledge-graph"
          className="text-fg-secondary hover:text-fg-primary inline-flex min-h-10 items-center border-b border-current text-xs transition-colors"
        >
          直接进入完整知识图谱 →
        </Link>
      </div>

      <noscript>
        <div className="mt-4">
          <p className="text-fg-muted text-xs leading-5">
            交互工具需要 JavaScript；核心认知阶段与正文入口仍可在本页和知识图谱中阅读。
          </p>
          {fallbackLinks.length > 0 ? (
            <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label={`${title}正文入口`}>
              {fallbackLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-fg-secondary border-b border-current text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </noscript>
    </div>
  );
}
