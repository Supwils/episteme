import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { serializeJsonLd } from "@/lib/jsonld";
import { getServiceWorkerLifecycleScript } from "@/lib/service-worker-lifecycle";
import { ThemeProvider } from "../components/ThemeProvider";
import { SITE_URL } from "@/lib/constants";
import { BrandSeal } from "@/components/design/BrandSeal";
import { SectionAwareNav } from "../components/SectionAwareNav";
import { SectionAwareFooter } from "../components/SectionAwareFooter";
import { SkipNav } from "../components/SkipNav";
import { ClientShell } from "../components/ClientShell";
import { MotionProvider } from "../components/MotionProvider";
import { READING_MODE_BOOT_SCRIPT } from "@/lib/reading-mode";
import { SITE_DESCRIPTION } from "@/lib/site-copy";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Match the brand gold accent in each theme (观测台 dark / 手记 light).
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#c39a45" },
    { media: "(prefers-color-scheme: light)", color: "#b8862f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Every page without its own canonical gets its path; articles still set theirs.
  alternates: { canonical: "./" },
  title: "Episteme · 格致 — 重现人类认识世界的旅程",
  description:
    "重现人类认识世界的旅程——宇宙物理、人类历史、哲学思想、生命科学、数学、经济学、心理学、计算机科学、政治学等领域的深度知识平台。",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    // iOS home-screen icon — ignores the manifest and needs an explicit PNG.
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Episteme · 格致 — 重现人类认识世界的旅程",
    description: SITE_DESCRIPTION,
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("从问题出发，顺着知识的线索继续读下去")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Episteme · 格致 — 重现人类认识世界的旅程",
    description: SITE_DESCRIPTION,
    images: [
      `/api/og?title=${encodeURIComponent("Episteme · 格致")}&description=${encodeURIComponent("从问题出发，顺着知识的线索继续读下去")}`,
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Episteme · 格致",
  url: SITE_URL,
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
        <script dangerouslySetInnerHTML={{ __html: READING_MODE_BOOT_SCRIPT }} />
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
          <SectionAwareNav brandMark={<BrandSeal size={28} />} />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            <MotionProvider>{children}</MotionProvider>
          </main>
          <SectionAwareFooter />
          <ClientShell />
        </ThemeProvider>
        <Script
          id="service-worker-lifecycle"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: getServiceWorkerLifecycleScript(process.env.NODE_ENV),
          }}
        />
      </body>
    </html>
  );
}
