"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDomainConfig } from "@/lib/new-domains";

export function DomainNav({ domain }: { domain: string }) {
  const config = getDomainConfig(domain);
  const pathname = usePathname();
  if (!config) return null;

  const items = [
    ...config.sections.map((s) => ({ href: `/${domain}/${s.key}`, label: s.label })),
    { href: `/${domain}/frontier`, label: "前沿" },
  ];

  return (
    <nav className="domain-nav-bar" aria-label={`${config.label}导航`}>
      <Link
        href="/"
        className="text-fg-muted hover:text-fg-primary inline-flex shrink-0 items-center gap-1 font-mono text-[12px] transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        首页
      </Link>
      <Link
        href={`/${domain}`}
        className="font-display text-fg-primary shrink-0 text-sm font-semibold"
        style={{ color: config.accent }}
      >
        {config.label}
      </Link>
      <div className="flex items-center gap-4">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 font-mono text-[12px] tracking-wide transition-colors ${
                active ? "text-fg-primary" : "text-fg-muted hover:text-fg-secondary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
