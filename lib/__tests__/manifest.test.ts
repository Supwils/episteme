import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The manifest shipped "Universe Knowledge" branding and icons declared as
 * image/png while pointing at SVG files — which blocks install on Android. These
 * checks keep the manifest honest: every icon file exists and its declared type
 * matches its extension.
 */
const PUBLIC = join(process.cwd(), "public");
const manifest = JSON.parse(readFileSync(join(PUBLIC, "manifest.json"), "utf-8")) as {
  name: string;
  short_name: string;
  icons: { src: string; type: string; sizes: string; purpose?: string }[];
};

const EXTENSION_TYPE: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
};

describe("web app manifest", () => {
  it("carries the current brand, not the retired one", () => {
    expect(manifest.name).toContain("格致");
    expect(manifest.name).not.toContain("Universe Knowledge");
    expect(manifest.short_name).not.toBe("UniverseK");
  });

  it("points every icon at a file that exists", () => {
    for (const icon of manifest.icons) {
      expect(existsSync(join(PUBLIC, icon.src)), `${icon.src} missing`).toBe(true);
    }
  });

  it("declares a type that matches each icon's real format", () => {
    for (const icon of manifest.icons) {
      const ext = icon.src.split(".").pop()!;
      expect(icon.type, `${icon.src} type mismatch`).toBe(EXTENSION_TYPE[ext]);
    }
  });

  it("provides both a maskable and an any-purpose raster icon for install", () => {
    const raster = manifest.icons.filter((i) => i.type === "image/png");
    expect(raster.some((i) => i.purpose === "maskable")).toBe(true);
    expect(raster.some((i) => i.purpose === "any" || i.purpose === undefined)).toBe(true);
  });
});
