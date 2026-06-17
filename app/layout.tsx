import type { Metadata, Viewport } from "next";
import { spaceGrotesk, plexMono } from "@/lib/fonts";
import { ThemeProvider } from "../components/ThemeProvider";
import { SectionAwareNav } from "../components/SectionAwareNav";
import { SectionAwareFooter } from "../components/SectionAwareFooter";
import { SkipNav } from "../components/SkipNav";
import { ClientShell } from "../components/ClientShell";
import { MotionProvider } from "../components/MotionProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://universe-knowledge.vercel.app"
  ),
  title: "Universe Knowledge",
  description:
    "A knowledge platform covering human history, universe physics, philosophy, and life science",
  manifest: "/manifest.json",
  openGraph: {
    title: "Universe Knowledge",
    description: "探索人类知识的边界：宇宙物理、人类历史、哲学思想、生命科学",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Universe Knowledge")}&description=${encodeURIComponent("探索人类知识的边界")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universe Knowledge",
    description: "探索人类知识的边界：宇宙物理、人类历史、哲学思想、生命科学",
    images: [
      `/api/og?title=${encodeURIComponent("Universe Knowledge")}&description=${encodeURIComponent("探索人类知识的边界")}`,
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Universe Knowledge",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://universe-knowledge.vercel.app",
  description:
    "A knowledge platform covering human history, universe physics, philosophy, and life science",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hans"
      className={`${spaceGrotesk.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* CJK + 楷体 via Google Fonts (too large to subset through next/font).
            Space Grotesk / IBM Plex Mono are self-hosted by next/font above.
            The stylesheet is injected after the page is interactive so the
            multi-megabyte CJK subset requests never block first paint or the
            window `load` event; `display=swap` shows the system-CJK fallback
            (PingFang / Songti / YaHei) until the web fonts arrive. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function f(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600&family=LXGW+WenKai+TC:wght@400&display=swap';document.head.appendChild(l);}if('requestIdleCallback'in window){requestIdleCallback(f,{timeout:2000})}else{addEventListener('load',f)}})()",
          }}
        />
        <noscript>
          {/* CJK fonts (Noto SC, LXGW) can't be subset via next/font; a plain
              stylesheet link is the no-JS fallback for the idle-injected link above. */}
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600&family=LXGW+WenKai+TC:wght@400&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SkipNav />
          <SectionAwareNav />
          <main id="main-content">
            <MotionProvider>{children}</MotionProvider>
          </main>
          <SectionAwareFooter />
          <ClientShell />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
