/**
 * Handwritten universe theme tokens. The actual color values live in
 * src/app/globals.css as CSS variables under :root and [data-hw-theme="day"].
 * This module is the typed interface for code that needs to reason about
 * themes (e.g. ThemeToggle, useHandwrittenStore).
 */

export type HandwrittenTheme = "night" | "day";

export const HW_THEMES: readonly HandwrittenTheme[] = ["night", "day"] as const;

export function nextHwTheme(t: HandwrittenTheme): HandwrittenTheme {
  return t === "night" ? "day" : "night";
}

export function isValidHwTheme(value: unknown): value is HandwrittenTheme {
  return value === "night" || value === "day";
}

export const HW_THEME_LABEL: Record<HandwrittenTheme, { primary: string; latin: string }> = {
  night: { primary: "深空底", latin: "Deep" },
  day: { primary: "蓝调底", latin: "Near" },
};
