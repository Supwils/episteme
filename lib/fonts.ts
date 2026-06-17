import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

// Observatory/Notebook design system — Latin display + mono come from
// next/font (self-hosted, no layout shift). CJK + 楷体 (Noto Sans SC /
// Noto Serif SC / LXGW WenKai TC) are loaded via <link> in app/layout.tsx
// because they are too large to subset through next/font/google.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
