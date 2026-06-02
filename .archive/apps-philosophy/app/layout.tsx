import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import { MobileMenu } from "../components/MobileMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "philosophy — ideas atlas",
  description:
    "A text-driven atlas of philosophy — from Ancient Greece to contemporary thought, East and West.",
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  width: "device-width",
  initialScale: 1,
};

const NAV_LINKS = [
  { href: "/thinkers", label: "哲学家" },
  { href: "/schools", label: "流派" },
  { href: "/isms", label: "主义" },
  { href: "/experiments", label: "思想实验" },
  { href: "/questions", label: "大问题" },
  { href: "/timeline", label: "时间线" },
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-deep text-fg-primary antialiased">
        {/* Top navigation bar */}
        <header className="nav-capsule fixed top-0 right-0 left-0 z-50 border-b border-border-faint">
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 py-3">
            {/* Left: portal back-link + brand */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="/"
                className="text-fg-muted hover:text-fg-secondary touch-target hidden font-mono text-[10px] tracking-[0.32em] uppercase transition-colors sm:flex sm:items-center"
                aria-label="返回 Portal"
              >
                ← portal
              </a>
              <Link
                href="/"
                className="font-display text-fg-primary text-sm italic tracking-wide"
              >
                Philosophy
              </Link>
            </div>

            {/* Right: section links (desktop) */}
            <ul className="hidden items-center gap-6 sm:flex" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-fg-muted hover:text-fg-secondary touch-target font-mono text-[10px] tracking-[0.28em] uppercase transition-colors sm:flex sm:items-center"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: hamburger menu (mobile) */}
            <MobileMenu />
          </nav>
        </header>

        {/* Main content — offset by nav height */}
        <main className="pt-14">{children}</main>

        {/* Footer */}
        <footer className="border-border-faint border-t px-4 sm:px-6 py-6">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
              philosophy · ideas atlas
            </span>
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
              v.0.0.0
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
