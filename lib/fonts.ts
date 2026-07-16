import { IBM_Plex_Mono } from "next/font/google";
export { spaceGrotesk } from "@/lib/display-font";

// Observatory/Notebook design system — the compact Latin display face is
// self-hosted. Utility labels use the platform monospace stack so they do not
// compete with critical CSS through extra font preloads.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
