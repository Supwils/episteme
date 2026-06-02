import type { Metadata } from "next";
import Link from "next/link";
import { APP_URLS } from "../lib/urls";
import { MobileNav } from "../components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universe Knowledge",
  description:
    "A knowledge platform covering human history, universe physics, and philosophy",
  openGraph: {
    title: "Universe Knowledge",
    description: "探索人类知识的边界",
    type: "website",
  },
};

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: APP_URLS["universe-physics"], label: "宇宙物理" },
  { href: APP_URLS["human-history"], label: "人类历史" },
  { href: APP_URLS["philosophy"], label: "哲学" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:rounded focus:bg-[#1a1a2e] focus:px-4 focus:py-2 focus:text-white">
          跳转到内容
        </a>
        <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[rgba(10,10,15,0.85)] backdrop-blur-xl">
          <nav aria-label="主导航" className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold text-[#e8e8f0] tracking-tight"
            >
              Universe Knowledge
            </Link>
            <ul className="hidden md:flex gap-8 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link-item"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MobileNav links={NAV_LINKS} />
          </nav>
        </header>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
