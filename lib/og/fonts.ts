import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Font } from "satori";
import manifest from "@/assets/og/fonts.json";

let loaded: Promise<Font[]> | undefined;
export function loadOgFonts(): Promise<Font[]> {
  if (!loaded) {
    loaded = Promise.all(
      manifest.map(async (font) => ({
        name: font.name,
        weight: font.weight as Font["weight"],
        style: "normal" as const,
        data: await readFile(join(process.cwd(), "assets/og", font.file)),
      }))
    ).catch((error) => {
      loaded = undefined;
      throw error;
    });
  }
  return loaded;
}
