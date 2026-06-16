"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup } from "./nav-data";

/**
 * A single category trigger + dropdown panel. Opens on hover (with a small
 * close delay so the cursor can travel into the panel) and on click/keyboard;
 * closes on Escape or outside click. Entrance animation is gated on
 * prefers-reduced-motion in globals.css.
 */
export function NavDropdown({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = group.items.some((i) => pathname.startsWith(i.href));

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
    <div ref={ref} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
          isActive || open
            ? "text-[var(--accent-gold,#c8a45a)]"
            : "text-fg-secondary hover:text-fg-primary"
        }`}
      >
        {group.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
        <div
          role="menu"
          aria-label={group.label}
          className="nav-dropdown-panel border-border-subtle bg-bg-panel/95 absolute top-[calc(100%+10px)] left-1/2 z-50 w-64 -translate-x-1/2 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
        >
          <div
            aria-hidden
            className="border-border-subtle bg-bg-panel/95 absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l"
          />
          <div className="text-fg-disabled px-3 pt-1 pb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            {group.en}
          </div>
          {group.items.map((item, i) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 35}ms` }}
                className="nav-dropdown-item hover:bg-bg-elevated/70 group/item flex items-center gap-3 rounded-xl px-3 py-2 transition-colors"
              >
                <span
                  className="h-7 w-[3px] shrink-0 rounded-full transition-all group-hover/item:h-8"
                  style={{ backgroundColor: item.color, opacity: active ? 1 : 0.5 }}
                />
                <span className="flex min-w-0 flex-col">
                  <span
                    className={`truncate text-sm transition-colors ${active ? "text-[var(--accent-gold,#c8a45a)]" : "text-fg-primary"}`}
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
      )}
    </div>
  );
}
