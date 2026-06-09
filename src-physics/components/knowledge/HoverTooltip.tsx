"use client";

import { AnimatePresence, motion } from "framer-motion";
import { parseCrossLink, tierSection } from "@/src-physics/lib/cross-link";
import { getSectionConfig } from "@/src-physics/lib/section";
import { useUiStore } from "@/src-physics/store/useUiStore";

const PRODUCT_EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Floating tooltip that appears when the user hovers over a 3D scene marker.
 * Positioned via mouse coordinates tracked in useUiStore. Renders above the
 * Canvas but below the HUD layer.
 */
export function HoverTooltip() {
  const marker = useUiStore((state) => state.hoveredMarker);
  const pos = useUiStore((state) => state.hoverMousePos);

  return (
    <AnimatePresence>
      {marker ? (
        <motion.div
          key={marker.id}
          role="tooltip"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18, ease: PRODUCT_EASE }}
          className="pointer-events-none fixed z-30 max-w-sm"
          style={{
            left: Math.min(pos.x + 16, window.innerWidth - 340),
            top: Math.min(pos.y - 12, window.innerHeight - 260),
          }}
        >
          <div className="border-fg-disabled/35 bg-bg-deep/90 relative overflow-hidden border shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <CornerTicks />

            <div className="flex flex-col gap-2.5 p-4">
              <div className="flex items-baseline gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: marker.color ?? "#ffb45a" }}
                />
                <h3 className="font-display text-fg-primary text-base leading-tight tracking-tight">
                  {marker.name.latin}
                </h3>
              </div>

              <p className="text-fg-secondary text-[11px] tracking-wide">{marker.name.primary}</p>

              <p className="text-fg-muted text-[12px] leading-relaxed">{marker.description}</p>

              {marker.data && marker.data.length > 0 ? (
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5">
                  {marker.data.map((d) => {
                    const link = parseCrossLink(d.value);
                    if (link) {
                      const meta = getSectionConfig(tierSection(link.tier)).tiers[link.tier];
                      return (
                        <li key={d.label} className="flex flex-col">
                          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
                            {d.label}
                          </span>
                          <span className="flex items-baseline gap-1.5 font-mono text-[11px] tracking-tight">
                            <span className="text-accent-cool inline-block">→</span>
                            <span data-num className="text-accent-cool">
                              {link.tier}
                            </span>
                            <span className="text-fg-primary">{meta?.shortLabel ?? link.rest}</span>
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={d.label} className="flex flex-col">
                        <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
                          {d.label}
                        </span>
                        <span
                          data-num
                          className="text-fg-primary font-mono text-[11px] tracking-tight"
                        >
                          {d.value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {marker.data?.some((d) => parseCrossLink(d.value)) ? (
                <p className="text-fg-disabled mt-1 font-mono text-[9px] tracking-[0.22em] uppercase">
                  click marker · 打开 atlas 跳转
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="border-fg-secondary/50 absolute top-0 left-0 h-2 w-2 border-t border-l" />
      <span className="border-fg-secondary/50 absolute top-0 right-0 h-2 w-2 border-t border-r" />
      <span className="border-fg-secondary/50 absolute bottom-0 left-0 h-2 w-2 border-b border-l" />
      <span className="border-fg-secondary/50 absolute right-0 bottom-0 h-2 w-2 border-r border-b" />
    </>
  );
}
