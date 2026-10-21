export const READING_MODES = ["standard", "focus", "spacious"] as const;
export type ReadingMode = (typeof READING_MODES)[number];

export const READING_MODE_STORAGE_KEY = "episteme-reading-mode";

export function isReadingMode(value: string | null): value is ReadingMode {
  return (READING_MODES as readonly string[]).includes(value ?? "");
}

/**
 * Runs in <head> before first paint. The article width and type size key off
 * html[data-reading-mode]; set only after hydration, a saved 专注 / 宽松 mode
 * would visibly reflow the whole article on every load.
 */
export const READING_MODE_BOOT_SCRIPT = `try{var m=localStorage.getItem(${JSON.stringify(
  READING_MODE_STORAGE_KEY
)});if(${JSON.stringify(READING_MODES)}.indexOf(m)>-1)document.documentElement.dataset.readingMode=m}catch(e){}`;
