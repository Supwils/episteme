/**
 * Rasterizes the brand SVG marks in public/icons/ to the PNG sizes the web app
 * manifest references. PNGs (not SVGs) are what guarantees installability across
 * Android and iOS, where SVG manifest icons are still unevenly supported.
 *
 * The SVGs are the source of truth; the PNGs are generated and committed (like
 * the WebP textures). Icons change rarely, so this is intentionally not part of
 * gen-all. Re-run after editing an icon SVG:  pnpm gen-icons
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ICONS = join(process.cwd(), "public", "icons");

const targets = [
  { svg: "icon.svg", png: "icon-192.png", size: 192 },
  { svg: "icon.svg", png: "icon-512.png", size: 512 },
  { svg: "icon-maskable.svg", png: "icon-maskable-192.png", size: 192 },
  { svg: "icon-maskable.svg", png: "icon-maskable-512.png", size: 512 },
];

async function main(): Promise<void> {
  for (const { svg, png, size } of targets) {
    const source = readFileSync(join(ICONS, svg));
    const output = await sharp(source, { density: 384 })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();
    writeFileSync(join(ICONS, png), output);
    console.log(`✅ ${png} (${size}×${size}, ${(output.byteLength / 1024).toFixed(1)}KB)`);
  }
}

void main();
