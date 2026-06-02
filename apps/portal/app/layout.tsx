import type { Metadata, Viewport } from "next";
import { SectionAwareNav } from "../components/SectionAwareNav";
import { SectionAwareFooter } from "../components/SectionAwareFooter";
import { GlobalSearch } from "../components/GlobalSearch";
import { ScrollToTop } from "../components/ScrollToTop";
import { VitalsReporter } from "../components/VitalsReporter";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:rounded focus:bg-[#1a1a2e] focus:px-4 focus:py-2 focus:text-white"
        >
          跳转到内容
        </a>
        <SectionAwareNav />
        <main id="main-content">{children}</main>
        <SectionAwareFooter />
        <GlobalSearch />
        <ScrollToTop />
        <VitalsReporter />
      </body>
    </html>
  );
}
