"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/cosmology", label: "宇宙学", exact: true },
  { href: "/cosmology/universe", label: "宇宙地图" },
  { href: "/cosmology/timeline", label: "时间线" },
  { href: "/cosmology/stellar-evolution", label: "恒星演化" },
  { href: "/cosmology/frontier", label: "前沿" },
];

export function CosmologyNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070c]/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/cosmology" className="text-sm font-semibold text-white">
          宇宙学
        </Link>
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive ? "text-white" : "text-[#9ca3af] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/" className="text-sm text-[#9ca3af] transition-colors hover:text-white">
            首页
          </Link>
        </div>
      </div>
    </nav>
  );
}
