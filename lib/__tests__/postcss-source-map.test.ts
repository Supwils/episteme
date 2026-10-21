import { afterAll, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const require = createRequire(import.meta.url);
// Next pins its own PostCSS; the hoisted Tailwind instance can differ.
const fromNext = createRequire(require.resolve("next/package.json"));
const postcss = fromNext("postcss");
const directory = mkdtempSync(join(tmpdir(), "episteme-postcss-"));
const cssFile = join(directory, "css", "input.css");
const marker = "episteme-owned-source-map";
const sourceMap = JSON.stringify({
  version: 3,
  names: [],
  sources: ["owned-input.css"],
  sourcesContent: [marker],
  mappings: "AAAA",
});
mkdirSync(join(directory, "css"));
writeFileSync(join(directory, "outside.map"), sourceMap);
writeFileSync(`${cssFile}.map`, sourceMap);
afterAll(() => rmSync(directory, { recursive: true }));

describe("Next's PostCSS source-map boundary", () => {
  it.each([
    ["unbased absolute map", join(directory, "outside.map"), undefined, false],
    ["map outside the CSS directory", "../outside.map", cssFile, false],
    ["map beside the CSS file", "input.css.map", cssFile, true],
  ])("handles %s without widening file access", async (_name, annotation, from, allowed) => {
    const result = await postcss([]).process(
      `a{color:red}\n/*# sourceMappingURL=${annotation} */`,
      {
        from,
        map: { inline: false, annotation: false },
      }
    );
    expect(JSON.stringify(result.map?.toJSON() ?? null).includes(marker)).toBe(allowed);
  });
});
