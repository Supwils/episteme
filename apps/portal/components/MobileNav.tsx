'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key !== 'Tab' || focusable.length === 0) return;

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
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeMenu]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
        aria-label={open ? '关闭菜单' : '打开菜单'}
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-transform duration-200"
          style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
        />
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-transform duration-200"
          style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
        />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute top-14 left-0 right-0 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl border-b border-[#1e1e2e] z-50"
        >
          <ul role="menu" className="flex flex-col list-none m-0 p-4 gap-1">
            {links.map((link) => (
              <li key={link.href} role="none">
                <Link
                  role="menuitem"
                  href={link.href}
                  className={`block py-2.5 px-4 text-[0.95rem] rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#818cf8] ${
                    isActive(link.href)
                      ? 'text-[#818cf8] bg-white/[0.05] font-medium'
                      : 'text-[#9ca3af] hover:text-[#818cf8] hover:bg-white/[0.03]'
                  }`}
                  onClick={closeMenu}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
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
