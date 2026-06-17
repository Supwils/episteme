import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "@/lib/fonts";
import { DomainNav } from "@/components/domain/DomainNav";
import { PageTransition } from "@/components/PageTransition";
import { getDomainConfig } from "@/lib/new-domains";
import "./globals.css";

const DOMAIN = "political-science";
const config = getDomainConfig(DOMAIN)!;

export const metadata: Metadata = {
  title: `${config.label} — Episteme · 格致`,
  description: config.tagline,
  openGraph: {
    title: `${config.label} — Episteme · 格致`,
    description: config.tagline,
    type: "website",
  },
};

export default function DomainLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;
  return (
    <div className={`domain-root ${fontVars}`}>
      <DomainNav domain={DOMAIN} />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            {config.labelEn}
          </span>
        </div>
      </footer>
    </div>
  );
}
