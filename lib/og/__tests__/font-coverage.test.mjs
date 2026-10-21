import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import opentype from "opentype.js";
import { expect, it } from "vitest";
import manifest from "@/assets/og/fonts.json";
import { parseMatterSafe } from "@/lib/content-article";

function metadataStrings(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return metadataStrings(path);
    if (!/\.mdx?$/.test(entry.name)) return [];
    const raw = readFileSync(path, "utf8");
    const { data } = parseMatterSafe(raw);
    const header = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    return [
      ...[data.title, data.summary, data.description, data.dek].filter(
        (value) => typeof value === "string"
      ),
      ...[...header.matchAll(/^(?:title|summary|description|dek):\s*(.*)$/gm)].map(
        (match) => match[1]
      ),
    ];
  });
}

it("covers published titles and authored descriptions with local glyphs", () => {
  const fonts = manifest.map((font) => {
    const bytes = readFileSync(join("assets/og", font.file));
    return opentype.parse(
      bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
    );
  });
  const corpus = JSON.parse(readFileSync("generated/corpus-meta.json", "utf8"));
  const strings = [...metadataStrings("content"), ...corpus.docs.flatMap((doc) => [doc.t, doc.s])];
  const missing = Array.from(new Set(strings.join(""))).filter(
    (char) =>
      !/[\s\p{Cf}\p{Variation_Selector}]/u.test(char) && !fonts.some((font) => font.hasChar(char))
  );
  expect(missing).toEqual([]);
});
