"use client";

import { useEffect, useRef, type ReactNode } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * One delegated pointer listener per grid: writes the pointer position into
 * `--mx/--my` on whichever `[data-spotlight]` card is under the cursor so the
 * CSS lens (globals.css "Motion layer") can follow it. Touch devices and
 * coarse pointers never attach the listener — they get the plain hover state.
 */
export function SpotlightGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia(FINE_POINTER_QUERY).matches) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const paint = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;
      const card = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${(event.clientX - rect.left).toFixed(1)}px`);
      card.style.setProperty("--my", `${(event.clientY - rect.top).toFixed(1)}px`);
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={className} data-spotlight-root>
      {children}
    </div>
  );
}
