import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { THINKERS_DATA } from "@/content/philosophy/thinkers-data";

describe("thinker era mirror", () => {
  it("keeps the search mirror on the same era as each article", () => {
    const mirrored = new Map(THINKERS_DATA.map((thinker) => [thinker.slug, thinker.era]));
    const dir = join(process.cwd(), "content/philosophy/thinkers");
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".mdx")) continue;
      const slug = name.replace(/\.mdx$/, "");
      const era = String(matter(readFileSync(join(dir, name), "utf8"), {}).data.era ?? "");
      expect(mirrored.get(slug), slug).toBe(era);
    }
  });
});
