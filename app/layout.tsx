import type { Metadata, Viewport } from "next";
import { serializeJsonLd } from "@/lib/jsonld";
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
  // Match the brand gold accent in each theme (观测台 dark / 手记 light).
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#d9a441" },
    { media: "(prefers-color-scheme: light)", color: "#b8862f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app"),
  title: "Episteme · 格致 — 重现人类认识世界的旅程",
  description:
    "重现人类认识世界的旅程——宇宙物理、人类历史、哲学思想、生命科学、数学、经济学、心理学、计算机科学、政治学等领域的深度知识平台。",
  manifest: "/manifest.json",
  openGraph: {
    title: "Episteme · 格致 — 重现人类认识世界的旅程",
    description: "探索人类知识的边界：宇宙物理、人类历史、哲学思想、生命科学",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("探索人类知识的边界")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Episteme · 格致 — 重现人类认识世界的旅程",
    description: "探索人类知识的边界：宇宙物理、人类历史、哲学思想、生命科学",
    images: [
      `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("探索人类知识的边界")}`,
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Episteme · 格致",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app",
  description:
    "重现人类认识世界的旅程——宇宙物理、人类历史、哲学思想、生命科学、数学、经济学、心理学、计算机科学、政治学等领域的深度知识平台。",
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
            __html: serializeJsonLd(organizationJsonLd),
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
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
            }}
          />
        )}
      </body>
    </html>
  );
}
