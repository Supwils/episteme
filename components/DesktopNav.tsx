"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <ul className="m-0 hidden list-none items-center gap-4 p-0 whitespace-nowrap xl:flex">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`nav-link-item ${isActive(link.href) ? "nav-link-active" : ""}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
