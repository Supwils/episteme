"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FAILSAFE_MS = 6_000;

function isNavigationLink(event: MouseEvent): HTMLAnchorElement | null {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return null;

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin) return null;
  if (
    destination.pathname === window.location.pathname &&
    destination.search === window.location.search
  ) {
    return null;
  }
  return anchor;
}

/**
 * Restores immediate feedback for client-side navigation without adding a
 * route-level loading boundary (those boundaries turn dynamic notFound()
 * responses into soft 404s after headers have streamed).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    const stop = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      setActive(false);
    };

    const start = (event: MouseEvent) => {
      if (!isNavigationLink(event)) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setActive(true);
      // Covers query-only transitions and failed/cancelled navigations, where
      // usePathname does not change and therefore cannot clear the indicator.
      timerRef.current = setTimeout(stop, FAILSAFE_MS);
    };

    document.addEventListener("click", start, true);
    window.addEventListener("pageshow", stop);
    window.addEventListener("popstate", stop);
    return () => {
      document.removeEventListener("click", start, true);
      window.removeEventListener("pageshow", stop);
      window.removeEventListener("popstate", stop);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      setActive(false);
    }
  }, [pathname]);

  return active ? (
    <div className="navigation-progress" role="status" aria-label="正在打开页面">
      <span className="sr-only">正在打开页面</span>
    </div>
  ) : null;
}
