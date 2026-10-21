import { afterEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { loadOgFonts } from "@/lib/og/fonts";
import manifest from "@/assets/og/fonts.json";

afterEach(() => vi.unstubAllGlobals());

describe("self-hosted OG fonts", () => {
  it("reuses one successful font load and never requests a remote font service", async () => {
    const remote = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", remote);
    const [first, concurrent] = await Promise.all([loadOgFonts(), loadOgFonts()]);
    expect(first).toBe(concurrent);
    expect(await loadOgFonts()).toBe(first);
    expect(first.map((font) => font.name)).toEqual(manifest.map((font) => font.name));
    expect(remote).not.toHaveBeenCalled();
  });

  it.each(manifest)("keeps the pinned licensed font $name intact", async (font) => {
    const bytes = await readFile(`assets/og/${font.file}`);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(font.sha256);
    expect(await readFile(`assets/og/${font.license}`, "utf8")).toContain(
      "SIL OPEN FONT LICENSE Version 1.1"
    );
  });
});
