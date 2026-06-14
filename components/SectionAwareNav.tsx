"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchTrigger } from "./SearchTrigger";
import { ReadingPanel } from "./ReadingPanel";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "首页" },
  { href: "/universe-physics", label: "物理学" },
  { href: "/cosmology", label: "宇宙学" },
  { href: "/human-history", label: "人类历史" },
  { href: "/philosophy", label: "哲学" },
  { href: "/life-science", label: "生命科学" },
  { href: "/mathematics", label: "数学与逻辑" },
  { href: "/economics", label: "经济学" },
  { href: "/psychology", label: "心理学" },
  { href: "/computer-science", label: "计算机科学" },
  { href: "/political-science", label: "政治学" },
  { href: "/read", label: "阅读路线" },
  { href: "/knowledge-graph", label: "知识图谱" },
  { href: "/curiosities", label: "奇趣知识" },
];

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
    <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[rgba(10,10,15,0.85)] backdrop-blur-xl">
      <nav
        id="site-navigation"
        aria-label="主导航"
        className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6"
      >
        <Link href="/" className="text-lg font-bold tracking-tight text-[#e8e8f0]">
          Universe Knowledge
        </Link>
        <DesktopNav links={NAV_LINKS} />
        <div className="flex items-center gap-3">
          <ReadingPanel />
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
