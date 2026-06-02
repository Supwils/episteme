"use client";

/**
 * Keyboard-only "skip to main content" link. Visually hidden until
 * focused, then becomes a high-contrast button anchored to the top
 * of the viewport. Required by WCAG 2.4.1 (bypass blocks) — without
 * it, screen-reader / keyboard users would have to tab through every
 * floating HUD element before reaching the scene.
 */
export function SkipLink({ targetId = "main-content" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="bg-bg-deep text-fg-primary border-accent-cool sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-1/2 focus:z-[100] focus:-translate-x-1/2 focus:border focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:shadow-lg focus:outline-none"
    >
      skip to scene
    </a>
  );
}
