"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup } from "./nav-data";

export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Pull-to-close gesture state (armed only when the drawer is scrolled to top).
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef<number | null>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    if (menuRef.current && menuRef.current.scrollTop <= 0) {
      touchStartY.current = e.touches[0]!.clientY;
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = e.touches[0]!.clientY - touchStartY.current;
    if (dy > 0) setDragY(dy);
    else touchStartY.current = null; // upward scroll intent — hand back to the list
  };
  const onTouchEnd = () => {
    if (dragY > 80) closeMenu();
    setDragY(0);
    touchStartY.current = null;
  };

  // Back/forward or programmatic navigation should never leave the drawer open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;
    let rafId = requestAnimationFrame(() => {
      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      first?.focus();

      handleKeyDown = function (e: KeyboardEvent) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeMenu();
          return;
        }

        if (e.key !== "Tab" || focusable.length === 0) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (handleKeyDown) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [open, closeMenu]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        className="border-border-subtle hover:border-accent-gold flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border transition-colors"
        aria-label={open ? "关闭菜单" : "打开菜单"}
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span
          className="bg-fg-muted block h-[2px] w-5 rounded-full transition-transform duration-200"
          style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
        />
        <span
          className="bg-fg-muted block h-[2px] w-5 rounded-full transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="bg-fg-muted block h-[2px] w-5 rounded-full transition-transform duration-200"
          style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
        />
      </button>
      {open && (
        <div
          className="mobile-nav-scrim bg-scrim fixed inset-0 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      {open && (
        <div
          ref={menuRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={
            dragY > 0
              ? { transform: `translateY(${dragY}px)`, transition: "none" }
              : { transition: "transform 0.18s ease-out" }
          }
          className="mobile-nav-panel border-border-subtle bg-bg-panel absolute top-14 right-0 left-0 z-[60] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b shadow-2xl"
        >
          <div aria-hidden="true" className="flex justify-center pt-2">
            <span className="bg-border-strong h-1 w-10 rounded-full" />
          </div>
          <ul role="menu" className="m-0 flex list-none flex-col gap-1 p-4">
            <li role="none">
              <Link
                role="menuitem"
                href="/"
                className={`focus-visible:ring-accent-gold flex min-h-[44px] items-center rounded px-4 py-3 text-[0.95rem] transition-colors focus-visible:ring-1 focus-visible:outline-none ${
                  isActive("/")
                    ? "bg-hover-bg text-accent-gold font-medium"
                    : "text-fg-muted hover:bg-hover-bg hover:text-accent-gold"
                }`}
                onClick={closeMenu}
              >
                首页
              </Link>
            </li>
            {groups.map((group) => (
              <li key={group.label} role="none" className="mt-2 first:mt-0">
                <div
                  aria-hidden="true"
                  className="text-fg-disabled px-4 pt-2 pb-1 font-mono text-[10px] tracking-[0.28em] uppercase"
                >
                  {group.label}
                </div>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {group.sections.flatMap((section) =>
                    section.items.map((item) => (
                      <li key={item.href} role="none">
                        <Link
                          role="menuitem"
                          href={item.href}
                          className={`focus-visible:ring-accent-gold flex min-h-[44px] items-center rounded px-4 py-3 text-[0.95rem] transition-colors focus-visible:ring-1 focus-visible:outline-none ${
                            isActive(item.href)
                              ? "bg-hover-bg text-accent-gold font-medium"
                              : "text-fg-muted hover:bg-hover-bg hover:text-accent-gold"
                          }`}
                          onClick={closeMenu}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") {
                              e.preventDefault();
                              closeMenu();
                            }
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="mr-3 inline-block h-4 w-[3px] shrink-0 rounded-full"
                            style={{ backgroundColor: item.color, opacity: 0.6 }}
                          />
                          {item.label}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
