"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_LINK, NAV_GROUPS } from "./nav-data";
import { NavDropdown } from "./NavDropdown";

export function DesktopNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/";

  return (
    <div className="hidden items-center gap-1 lg:flex">
      <Link
        href={HOME_LINK.href}
        aria-current={homeActive ? "page" : undefined}
        className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
          homeActive ? "text-accent-gold" : "text-fg-secondary hover:text-accent-gold"
        }`}
      >
        {HOME_LINK.label}
      </Link>
      {NAV_GROUPS.map((group) => (
        <NavDropdown key={group.label} group={group} />
      ))}
    </div>
  );
}
