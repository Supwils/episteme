import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Display serif: Fraunces with optical sizing and "SOFT" axis.
 * Used for philosopher names, article headings, and pull quotes.
 * Chinese display text falls back to the system serif stack.
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
