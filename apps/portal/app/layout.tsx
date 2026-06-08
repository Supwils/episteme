import type { Metadata, Viewport } from "next";
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
    <html lang="zh-Hans" suppressHydrationWarning>
      <head>
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
