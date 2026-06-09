"use client";

import Link from "next/link";

interface SkipTarget {
  id: string;
  label: string;
}

const SKIP_TARGETS: SkipTarget[] = [
  { id: "main-content", label: "跳转到内容" },
  { id: "site-navigation", label: "跳转到导航" },
];

export function SkipNav() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:left-2 focus-within:top-2 focus-within:z-[9999] focus-within:flex focus-within:gap-2">
      {SKIP_TARGETS.map((target) => (
        <Link
          key={target.id}
          href={`#${target.id}`}
          className="rounded bg-[#1a1a2e] px-4 py-2 text-sm text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#6366f1]"
        >
          {target.label}
        </Link>
      ))}
    </div>
  );
}
