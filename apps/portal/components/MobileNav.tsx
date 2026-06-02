'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
        aria-label={open ? '关闭菜单' : '打开菜单'}
        aria-expanded={open}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-transform duration-200"
          style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
        />
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block w-5 h-[2px] bg-[#9ca3af] rounded-full transition-transform duration-200"
          style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
        />
      </button>
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl border-b border-[#1e1e2e] z-50">
          <ul className="flex flex-col list-none m-0 p-4 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2.5 px-4 text-[0.95rem] text-[#9ca3af] hover:text-[#818cf8] hover:bg-white/[0.03] rounded transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
