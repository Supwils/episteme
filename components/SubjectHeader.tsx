"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { getSubjectNav } from "@/lib/subject-nav";

function isItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * The one header every subject shares. Driven entirely by lib/subject-nav so
 * the markup + style are identical across domains and only the tabs + accent
 * differ. Layout: back-to-platform · subject brand · horizontally-scrollable
 * accent-pill tabs · search (⌘K) · theme toggle. Token-driven, so it adapts to
 * the Observatory (dark) / Notebook (light) themes automatically.
 */
export function SubjectHeader({ subject }: { subject: string }) {
  const pathname = usePathname();
  const config = getSubjectNav(subject);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Keep the active tab in view when landing deep in a subject.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  if (!config) return null;
  const { home, label, accent, items } = config;
  const onHome = pathname === home;

  // On an immersive splash home the header would cover the splash's own top
  // chrome — hide it there, but keep it on every sub-page.
  if (onHome && config.immersiveHome) return null;

  return (
    <header className="border-border-faint bg-bg-overlay sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav
        aria-label={`${label}导航`}
        className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="text-fg-muted hover:text-fg-primary flex shrink-0 items-center gap-1 font-mono text-[11px] tracking-[0.04em] transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          <span className="hidden sm:inline">知识平台</span>
        </Link>

        <span aria-hidden className="bg-border-subtle h-4 w-px shrink-0" />

        <Link
          href={home}
          aria-current={onHome ? "page" : undefined}
          className="font-display shrink-0 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
          style={{ color: accent }}
        >
          {label}
        </Link>

        <div className="flex min-w-0 flex-1 [scrollbar-width:none] items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = isItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={active ? activeRef : undefined}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
                  active ? "font-medium" : "text-fg-secondary hover:text-fg-primary"
                }`}
                style={
                  active
                    ? {
                        color: accent,
                        backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`,
                      }
                    : undefined
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
