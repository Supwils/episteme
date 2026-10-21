"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

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
 * Reports each committed change of pathname or query string. Kept in its own
 * Suspense boundary because useSearchParams would otherwise opt every
 * statically rendered page out to client rendering.
 */
function RouteCommitWatcher({ onCommit }: { onCommit: () => void }) {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() ?? "";
  const route = `${pathname}?${search}`;
  const previousRouteRef = useRef(route);

  useEffect(() => {
    if (previousRouteRef.current === route) return;
    previousRouteRef.current = route;
    onCommit();
  }, [route, onCommit]);

  return null;
}

/**
 * Restores immediate feedback for client-side navigation without adding a
 * route-level loading boundary (those boundaries turn dynamic notFound()
 * responses into soft 404s after headers have streamed).
 */
export function NavigationProgress() {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setActive(false);
  }, []);

  useEffect(() => {
    const start = (event: MouseEvent) => {
      // Bubble phase so React handlers run first: a link that called
      // preventDefault (touch wiki previews) must not light the indicator.
      if (event.defaultPrevented || !isNavigationLink(event)) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setActive(true);
      // Covers failed or cancelled navigations, where no route ever commits.
      timerRef.current = setTimeout(stop, FAILSAFE_MS);
    };

    document.addEventListener("click", start);
    window.addEventListener("pageshow", stop);
    window.addEventListener("popstate", stop);
    return () => {
      document.removeEventListener("click", start);
      window.removeEventListener("pageshow", stop);
      window.removeEventListener("popstate", stop);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stop]);

  return (
    <>
      <Suspense fallback={null}>
        <RouteCommitWatcher onCommit={stop} />
      </Suspense>
      {active ? (
        <div className="navigation-progress" role="status" aria-label="正在打开页面">
          <span className="sr-only">正在打开页面</span>
        </div>
      ) : null}
    </>
  );
}
