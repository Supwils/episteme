'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <ul className="hidden md:flex gap-8 list-none m-0 p-0">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`nav-link-item ${isActive(link.href) ? 'nav-link-active' : ''}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
