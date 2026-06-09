"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/philosophy/thinkers", label: "哲学家" },
  { href: "/philosophy/schools", label: "流派" },
  { href: "/philosophy/isms", label: "主义" },
  { href: "/philosophy/concepts", label: "概念" },
  { href: "/philosophy/experiments", label: "思想实验" },
  { href: "/philosophy/dialogues", label: "对话" },
  { href: "/philosophy/questions", label: "大问题" },
  { href: "/philosophy/timeline", label: "时间线" },
] as const;

const CROSS_APP_LINKS = [
  { href: "/universe-physics", label: "宇宙物理 · Universe Physics" },
  { href: "/human-history", label: "人类历史 · Human History" },
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleEscape);

    const rafId = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      first?.focus();

      function handleTab(e: KeyboardEvent) {
        if (e.key !== "Tab" || focusable.length === 0) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
      tabHandlerRef.current = handleTab;
      document.addEventListener("keydown", handleTab);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleEscape);
      if (tabHandlerRef.current) {
        document.removeEventListener("keydown", tabHandlerRef.current);
        tabHandlerRef.current = null;
      }
    };
  }, [isOpen, close]);

  return (
    <div className="show-mobile-only">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="touch-target text-fg-secondary hover:text-fg-primary flex items-center justify-center transition-colors"
        aria-label="打开导航菜单"
        aria-expanded={isOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="3" y1="5" x2="17" y2="5" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="15" x2="17" y2="15" />
        </svg>
      </button>

      {isOpen && <div className="mobile-menu-overlay" onClick={close} aria-hidden="true" />}

      <div
        ref={panelRef}
        className="mobile-menu-panel"
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="导航菜单"
      >
        <div className="border-border-faint flex items-center justify-between border-b px-5 py-4">
          <span className="font-display text-fg-primary text-sm italic tracking-wide">
            Philosophy
          </span>
          <button
            type="button"
            onClick={close}
            className="touch-target text-fg-secondary hover:text-fg-primary flex items-center justify-center transition-colors"
            aria-label="关闭导航菜单"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </svg>
          </button>
        </div>

        <nav className="px-5 py-6">
          <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.38em]">
            板块
          </p>
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className={clsx(
                    "touch-target text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated",
                    "flex items-center rounded px-3 font-mono text-sm tracking-wide transition-colors"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-border-faint border-t px-5 py-6">
          <p className="text-fg-muted mb-4 font-mono text-[10px] uppercase tracking-[0.38em]">
            其他领域
          </p>
          <ul className="flex flex-col gap-1" role="list">
            {CROSS_APP_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={close}
                  className={clsx(
                    "touch-target text-fg-muted hover:text-fg-secondary hover:bg-bg-elevated",
                    "flex items-center rounded px-3 font-mono text-[11px] tracking-wide transition-colors"
                  )}
                >
                  → {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border-faint border-t px-5 py-4">
          <Link
            href="/"
            onClick={close}
            className="touch-target text-fg-muted hover:text-fg-secondary flex items-center font-mono text-[10px] uppercase tracking-[0.32em] transition-colors"
          >
            ← 首页
          </Link>
        </div>
      </div>
    </div>
  );
}
