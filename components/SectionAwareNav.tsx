"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_GROUPS } from "./nav-data";
import { SECTION_SHELL_PREFIXES } from "../lib/urls";
import { subscribeToScrollFrame } from "@/lib/scroll-frame";

export function SectionAwareNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const inSection = SECTION_SHELL_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    if (inSection) return;

    let previousScrolled: boolean | undefined;
    return subscribeToScrollFrame(({ scrollY }) => {
      const nextScrolled = scrollY > 8;
      if (nextScrolled === previousScrolled) return;
      previousScrolled = nextScrolled;
      setScrolled(nextScrolled);
    });
  }, [inSection]);

  if (inSection) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-border-subtle bg-bg-overlay shadow-[0_8px_30px_rgb(0_0_0/0.18)]"
          : "border-border-faint bg-bg-base/75"
      }`}
    >
      <nav
        id="site-navigation"
        aria-label="主导航"
        className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="text-fg-primary hover:text-accent-gold font-display shrink-0 text-base font-semibold tracking-tight whitespace-nowrap transition-colors sm:text-lg"
        >
          Episteme · 格致
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav groups={NAV_GROUPS} />
        </div>
      </nav>
    </header>
  );
}
