"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
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
    <div className="md:hidden">
      <button
        ref={buttonRef}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
        aria-label={open ? "关闭菜单" : "打开菜单"}
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span
          className="block h-[2px] w-5 rounded-full bg-[#9ca3af] transition-transform duration-200"
          style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
        />
        <span
          className="block h-[2px] w-5 rounded-full bg-[#9ca3af] transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block h-[2px] w-5 rounded-full bg-[#9ca3af] transition-transform duration-200"
          style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
        />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={closeMenu} aria-hidden="true" />
      )}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-14 z-[60] border-b border-[#1e1e2e] bg-[rgba(10,10,15,0.97)] backdrop-blur-xl"
        >
          <ul role="menu" className="m-0 flex list-none flex-col gap-1 p-4">
            {links.map((link) => (
              <li key={link.href} role="none">
                <Link
                  role="menuitem"
                  href={link.href}
                  className={`block flex min-h-[44px] items-center rounded px-4 py-3 text-[0.95rem] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#818cf8] ${
                    isActive(link.href)
                      ? "bg-white/[0.05] font-medium text-[#818cf8]"
                      : "text-[#9ca3af] hover:bg-white/[0.03] hover:text-[#818cf8]"
                  }`}
                  onClick={closeMenu}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      closeMenu();
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
