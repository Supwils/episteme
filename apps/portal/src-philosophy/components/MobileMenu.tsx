"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/philosophy/thinkers", label: "哲学家" },
  { href: "/philosophy/schools", label: "流派" },
  { href: "/philosophy/isms", label: "主义" },
  { href: "/philosophy/experiments", label: "思想实验" },
  { href: "/philosophy/questions", label: "大问题" },
  { href: "/philosophy/timeline", label: "时间线" },
] as const;

const CROSS_APP_LINKS = [
  { href: "/universe-physics", label: "宇宙物理 · Universe Physics" },
  { href: "/human-history", label: "人类历史 · Human History" },
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
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

      {isOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div
        className="mobile-menu-panel"
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="导航菜单"
      >
        <div className="flex items-center justify-between border-b border-border-faint px-5 py-4">
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
          <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.38em] uppercase">
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

        <div className="border-t border-border-faint px-5 py-6">
          <p className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.38em] uppercase">
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

        <div className="border-t border-border-faint px-5 py-4">
          <a
            href="/"
            onClick={close}
            className="text-fg-muted hover:text-fg-secondary font-mono text-[10px] tracking-[0.32em] uppercase transition-colors"
          >
            ← 返回 portal
          </a>
        </div>
      </div>
    </div>
  );
}
