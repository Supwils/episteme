import type { Metadata, Viewport } from "next";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "universe-physics — scale atlas",
  description:
    "A browser-delivered scale atlas of the universe, from the observable horizon to a single planet.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-deep text-fg-primary antialiased">{children}</body>
    </html>
  );
}
