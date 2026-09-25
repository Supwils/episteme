"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtlasMenu } from "./chrome/AtlasMenu";
import { MobileNav } from "./MobileNav";
import { NavDropdown } from "./NavDropdown";
import type { NavGroup } from "./nav-data";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { getSubjectNav } from "@/lib/subject-nav";

function isItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

type Indicator = { left: number; width: number } | null;

/**
 * The one header every subject shares (rendered through the server shell
 * components/chrome/DomainHeader, which supplies the domain seal as `mark`).
 * Layout: back-to-platform · seal + subject name · tabs · 更多 · 全部领域 ·
 * search · theme. The tabs never wrap: they scroll sideways with edge fades,
 * and one indicator slides to the active tab instead of each tab painting its
 * own pill.
 */
export function SubjectHeader({ subject, mark }: { subject: string; mark?: React.ReactNode }) {
  const pathname = usePathname();
  const config = getSubjectNav(subject);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [indicator, setIndicator] = useState<Indicator>(null);
  const [fade, setFade] = useState({ start: false, end: false });

  const measureFade = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const max = strip.scrollWidth - strip.clientWidth;
    setFade({ start: strip.scrollLeft > 2, end: strip.scrollLeft < max - 2 });
  }, []);

  useLayoutEffect(() => {
    const tab = activeRef.current;
    setIndicator(tab ? { left: tab.offsetLeft, width: tab.offsetWidth } : null);
  }, [pathname]);

  // Keep the active tab in view when landing deep in a subject.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
    measureFade();
  }, [pathname, measureFade]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const observer = new ResizeObserver(() => {
      measureFade();
      const tab = activeRef.current;
      setIndicator(tab ? { left: tab.offsetLeft, width: tab.offsetWidth } : null);
    });
    observer.observe(strip);
    return () => observer.disconnect();
  }, [measureFade]);

  if (!config) return null;
  const { home, label, accent, items } = config;
  const onHome = pathname === home;

  // On an immersive splash home the header would cover the splash's own top
  // chrome — hide it there, but keep it on every sub-page.
  if (onHome && config.immersiveHome) return null;

  const moreGroup: NavGroup | null = config.more
    ? {
        label: "更多",
        en: "More",
        sections: [
          {
            label: "更多",
            en: "More",
            items: config.more.map((item) => ({ ...item, en: "", color: accent })),
          },
        ],
      }
    : null;

  const tint = `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))`;
  const fadeMask = [
    fade.start ? "transparent 0, #000 1.5rem" : "#000 0",
    fade.end ? "#000 calc(100% - 1.5rem), transparent 100%" : "#000 100%",
  ].join(", ");

  return (
    <header className="border-border-faint bg-bg-overlay sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav
        aria-label={`${label}导航`}
        className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="返回首页"
          className="text-fg-secondary hover:text-fg-primary flex shrink-0 items-center gap-1 text-[12px] transition-colors"
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
          <span className="hidden sm:inline">首页</span>
        </Link>

        <span aria-hidden className="bg-border-subtle h-4 w-px shrink-0" />

        <Link
          href={home}
          aria-current={onHome ? "page" : undefined}
          className="font-display flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
          style={{ color: tint }}
        >
          {mark}
          <span className="hidden sm:inline">{label}</span>
          <span className="sr-only sm:hidden">{label}</span>
        </Link>

        <div
          ref={stripRef}
          onScroll={measureFade}
          className="relative flex min-w-0 flex-1 [scrollbar-width:none] items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ maskImage: `linear-gradient(to right, ${fadeMask})` }}
        >
          {/* Vertical centering lives in the inline transform: Tailwind v4's
              translate utilities use the separate `translate` property and
              would stack with it. */}
          {indicator && (
            <span
              aria-hidden
              className="subject-tab-indicator pointer-events-none absolute top-1/2 h-8 rounded-full"
              style={{
                left: 0,
                width: indicator.width,
                transform: `translate(${indicator.left}px, -50%)`,
                backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`,
              }}
            />
          )}
          {items.map((item) => {
            const active = isItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={active ? activeRef : undefined}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
                  active ? "font-medium" : "text-fg-secondary hover:text-fg-primary"
                }`}
                // Mix toward the theme's foreground so both themes keep the
                // subject hue while clearing WCAG AA.
                style={active ? { color: tint } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {moreGroup && (
          <div className="shrink-0">
            <NavDropdown group={moreGroup} />
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <AtlasMenu triggers="single" />
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
