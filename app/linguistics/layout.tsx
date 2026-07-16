import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "@/lib/fonts";
import { DomainNav } from "@/components/domain/DomainNav";
import { PageTransition } from "@/components/PageTransition";
import { getDomainConfig } from "@/lib/new-domains";
import "./globals.css";

const DOMAIN = "linguistics";
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

export default function LinguisticsLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;
  return (
    <div className={`domain-root ${fontVars}`}>
      <DomainNav domain={DOMAIN} />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            {config.labelEn}
          </span>
          <span className="text-fg-disabled text-xs">语言是能力，也是共同生活的基础设施</span>
        </div>
      </footer>
    </div>
  );
}
