"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Glyph } from "@/components/design/Glyph";
import { EXPLORE_GROUP } from "./nav-data";

const loadAtlas = () => import("./chrome/AtlasGrid").then((m) => m.AtlasGrid);
const AtlasGrid = dynamic(loadAtlas, { ssr: false });

/**
 * The phone drawer: the atlas as collapsible clusters (lazy, so seal glyphs
 * load only when the drawer opens) followed by the explore entries.
 */
export function MobileNav() {
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

  // The drawer is `lg:hidden`. Crossing to desktop hides it with CSS but would
  // otherwise leave `open` true and keep `body` overflow locked with no close control.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const unlock = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", unlock);
    return () => media.removeEventListener("change", unlock);
  }, []);

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
    // The atlas loads lazily, so the focusable set is read on every Tab.
    const focusables = () =>
      menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    let rafId = requestAnimationFrame(() => {
      focusables()[0]?.focus();

      handleKeyDown = function (e: KeyboardEvent) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeMenu();
          return;
        }

        const focusable = focusables();
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
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
        onPointerEnter={() => void loadAtlas()}
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
          <div className="p-4 pt-2">
            <AtlasGrid variant="sheet" onNavigate={closeMenu} />
            <h2 className="text-fg-muted mt-4 mb-1 px-1 text-xs">探索</h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">
              {EXPLORE_GROUP.sections[0]!.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-[44px] items-center gap-2.5 rounded px-2 text-[0.95rem] transition-colors ${
                      isActive(item.href)
                        ? "bg-hover-bg text-accent-gold"
                        : "text-fg-secondary hover:bg-hover-bg hover:text-fg-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.glyph && <Glyph name={item.glyph} size={20} className="text-fg-muted" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
