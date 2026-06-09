import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Display face: variable serif with optical-sizing and "soft" axes.
 * Used for English subject names ("Observable Universe"), section
 * headings, and the few moments where a serif amplifies the
 * scientific-publication feel. Chinese display falls back to the
 * system serif stack (PingFang SC / Songti SC) declared in globals.css.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
