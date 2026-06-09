"use client";

import { useEffect, useState } from "react";
import { getSectionConfig } from "@/src-physics/lib/section";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

/**
 * Off-screen ARIA live region that announces tier transitions to
 * screen readers. We debounce announcements so a rapid drill-through
 * (e.g. holding ↑) doesn't fire a queue of overlapping messages.
 */
export function TierAriaLive() {
  const tier = useUniverseStore((s) => s.currentTier);
  const section = useUniverseStore((s) => s.section);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cfg = getSectionConfig(section);
    const meta = cfg.tiers[tier];
    if (!meta) return;
    const id = window.setTimeout(() => {
      setMessage(`${section} · ${tier} · ${meta.label}`);
    }, 220);
    return () => window.clearTimeout(id);
  }, [tier, section]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
