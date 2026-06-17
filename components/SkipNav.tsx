"use client";

import Link from "next/link";

interface SkipTarget {
  id: string;
  label: string;
}

// Only #main-content is present on every route (the global nav is replaced by
// per-domain navs that don't carry #site-navigation), so skip-to-nav would
// dead-link on most pages. Skip-to-content is the WCAG-critical one.
const SKIP_TARGETS: SkipTarget[] = [{ id: "main-content", label: "跳转到内容" }];

export function SkipNav() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-2 focus-within:left-2 focus-within:z-[9999] focus-within:flex focus-within:gap-2">
      {SKIP_TARGETS.map((target) => (
        <Link
          key={target.id}
          href={`#${target.id}`}
          className="bg-bg-floating text-fg-primary focus:outline-accent-gold rounded px-4 py-2 text-sm focus:outline-2 focus:outline-offset-2"
        >
          {target.label}
        </Link>
      ))}
    </div>
  );
}
