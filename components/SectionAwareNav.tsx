"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchTrigger } from "./SearchTrigger";
import { ReadingPanel } from "./ReadingPanel";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS_FLAT } from "./nav-data";

const SECTION_PREFIXES = [
  "/universe-physics",
  "/cosmology",
  "/human-history",
  "/philosophy",
  "/mathematics",
  "/life-science",
  "/economics",
  "/psychology",
  "/computer-science",
  "/political-science",
  "/read",
  "/knowledge-graph",
  "/curiosities",
];

export function SectionAwareNav() {
  const pathname = usePathname();

  if (SECTION_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <header className="border-border-faint bg-bg-base/75 sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav
        id="site-navigation"
        aria-label="主导航"
        className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6"
      >
        <Link
          href="/"
          className="text-fg-primary hover:text-accent-gold font-display text-lg font-semibold tracking-tight transition-colors"
        >
          Universe Knowledge
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-3">
          <ReadingPanel />
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav links={NAV_LINKS_FLAT} />
        </div>
      </nav>
    </header>
  );
}
