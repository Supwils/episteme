import type { Metadata } from "next";
import Link from "next/link";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import { MobileMenu } from "@/components/philosophy/MobileMenu";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "philosophy — ideas atlas",
  description:
    "A text-driven atlas of philosophy — from Ancient Greece to contemporary thought, East and West.",
};

const NAV_LINKS = [
  { href: "/philosophy/thinkers", label: "哲学家" },
  { href: "/philosophy/schools", label: "流派" },
  { href: "/philosophy/isms", label: "主义" },
  { href: "/philosophy/experiments", label: "思想实验" },
  { href: "/philosophy/questions", label: "大问题" },
  { href: "/philosophy/timeline", label: "时间线" },
] as const;

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;

  return (
    <div className={`philosophy-root ${fontVars}`}>
      <header className="nav-capsule fixed top-10 right-0 left-0 z-40 border-b border-border-faint bg-[rgba(6,6,10,0.85)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/philosophy"
              className="font-display text-fg-primary text-sm italic tracking-wide"
            >
              Philosophy
            </Link>
          </div>

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

          <MobileMenu />
        </nav>
      </header>

      <main className="pt-28"><PageTransition>{children}</PageTransition></main>

      <footer className="border-border-faint border-t px-4 sm:px-6 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            philosophy · ideas atlas
          </span>
        </div>
      </footer>
    </div>
  );
}
