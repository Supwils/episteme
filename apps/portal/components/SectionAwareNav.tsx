'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { SearchTrigger } from './SearchTrigger';

interface NavLink {
  href: string;
  label: string;
}

const SECTION_PREFIXES = ['/universe-physics', '/human-history', '/philosophy'];

function isInSection(pathname: string) {
  return SECTION_PREFIXES.some((p) => pathname.startsWith(p));
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: '首页' },
  { href: '/universe-physics', label: '宇宙物理' },
  { href: '/human-history', label: '人类历史' },
  { href: '/philosophy', label: '哲学' },
];

export function SectionAwareNav() {
  const pathname = usePathname();
  const inSection = isInSection(pathname);

  if (inSection) {
    return (
      <header className="sticky top-0 z-[100] h-10 border-b border-[#1e1e2e] bg-[rgba(10,10,15,0.92)] backdrop-blur-xl">
        <nav
          aria-label="返回导航"
          className="max-w-[1400px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/50 hover:text-white/90 transition-colors"
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
            <span>返回首页</span>
          </Link>
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/25 font-medium">
            Universe Knowledge
          </span>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[rgba(10,10,15,0.85)] backdrop-blur-xl">
      <nav
        aria-label="主导航"
        className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between"
      >
        <Link
          href="/"
          className="text-lg font-bold text-[#e8e8f0] tracking-tight"
        >
          Universe Knowledge
        </Link>
        <DesktopNav links={NAV_LINKS} />
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
