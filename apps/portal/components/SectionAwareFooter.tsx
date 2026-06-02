'use client';

import { usePathname } from 'next/navigation';

const SECTION_PREFIXES = ['/universe-physics', '/human-history', '/philosophy'];

export function SectionAwareFooter() {
  const pathname = usePathname();
  const inSection = SECTION_PREFIXES.some((p) => pathname.startsWith(p));

  if (inSection) return null;

  return (
    <footer className="border-t border-[#1e1e2e] py-6 text-center text-xs text-[#6b7280]">
      <p>Universe Knowledge — 探索人类知识的边界</p>
    </footer>
  );
}
