"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBacklinks } from "@/lib/backlinks-index";

/**
 * "Referenced by" panel — the reverse of the inline `[[wiki-links]]`. Resolves
 * the current article from the pathname and lists the other articles that link
 * to it, so the cross-reference web is navigable in both directions. Renders
 * nothing when an article has no inbound links. Self-resolving (no props), so a
 * single placement in ArticleLayout covers every detail page.
 */
export function Backlinks() {
  const pathname = usePathname() ?? "";
  const links = getBacklinks(pathname);
  if (links.length === 0) return null;

  return (
    <section className="border-border-faint mt-14 border-t pt-6" aria-label="被引用">
      <h2 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        被其他条目引用 · {links.length}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((b) => (
          <li key={b.url}>
            <Link
              href={b.url}
              className="border-border-faint text-fg-secondary hover:border-accent-gold hover:text-accent-gold inline-block rounded-full border px-3 py-1.5 text-[13px] transition-colors"
            >
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
