"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup } from "./nav-data";

/**
 * A single category trigger + dropdown panel. Opens on hover (with a small
 * intent delay so the cursor can travel into the panel) and on click/keyboard;
 * closes on Escape or outside click. Keyboard: ArrowDown/ArrowUp on the
 * trigger opens the panel and focuses the first/last item; arrows + Home/End
 * cycle items; Tab moves on and closes (menubar pattern). Entrance animation
 * is gated on prefers-reduced-motion in globals.css.
 */
export function NavDropdown({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `nav-dropdown-${group.label}`;

  const isItemActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const allItems = group.sections.flatMap((s) => s.items);
  const isActive = allItems.some((i) => isItemActive(i.href));
  const multiSection = group.sections.length > 1;

  const openSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    // Small intent delay so sweeping the cursor across the nav doesn't flash panels.
    openTimer.current = setTimeout(() => setOpen(true), 80);
  };
  const closeSoon = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const getMenuItems = () =>
    Array.from(ref.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []);

  const openAndFocus = (edge: "first" | "last") => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    requestAnimationFrame(() => {
      const items = getMenuItems();
      (edge === "first" ? items[0] : items[items.length - 1])?.focus();
    });
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openAndFocus("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus("last");
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    const items = getMenuItems();
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(current + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(current - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={openSoon} onMouseLeave={closeSoon}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
          open
            ? "text-fg-primary"
            : isActive
              ? // fg (not accent-gold) so the active state stays readable on
                // domains that re-pin surfaces, e.g. cosmology's permanent dark
                // canvas under a light global theme.
                "text-fg-primary font-medium"
              : "text-fg-secondary hover:text-accent-gold"
        }`}
      >
        {group.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${
            isActive || open ? "text-accent-gold" : ""
          }`}
          aria-hidden
        >
          <path
            d="M2 3.5 L5 6.5 L8 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        // Wrapper spans the 10px gap as a transparent hover bridge so the cursor
        // can travel from trigger to panel without crossing a dead zone.
        <div
          id={panelId}
          onKeyDown={onPanelKeyDown}
          className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2.5 ${
            multiSection ? "w-[32rem]" : "w-64"
          }`}
        >
          <div
            role="menu"
            aria-label={group.label}
            className="nav-dropdown-panel border-border-subtle bg-bg-floating relative rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
          >
            <div
              aria-hidden
              className="border-border-subtle bg-bg-floating absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l"
            />
            <div className="text-fg-disabled px-3 pt-1 pb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
              {group.en}
            </div>
            <div className={multiSection ? "grid grid-cols-2 gap-x-2" : undefined}>
              {group.sections.map((section) => (
                <div key={section.label}>
                  {multiSection && (
                    <div className="text-fg-muted px-3 pt-1.5 pb-1 font-mono text-[9px] tracking-[0.28em] uppercase">
                      {section.label}
                    </div>
                  )}
                  {section.items.map((item, i) => {
                    const active = isItemActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        style={{ animationDelay: `${Math.min(i, 6) * 35}ms` }}
                        className="nav-dropdown-item hover:bg-bg-elevated group/item flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:translate-x-0.5"
                      >
                        <span
                          className="h-7 w-[3px] shrink-0 rounded-full transition-all group-hover/item:h-8"
                          style={{ backgroundColor: item.color, opacity: active ? 1 : 0.5 }}
                        />
                        <span className="flex min-w-0 flex-col">
                          <span
                            className={`truncate text-sm transition-colors ${active ? "text-accent-gold" : "text-fg-primary group-hover/item:text-accent-gold"}`}
                          >
                            {item.label}
                          </span>
                          <span className="text-fg-muted truncate font-mono text-[10px] tracking-wide">
                            {item.en}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
