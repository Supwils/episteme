import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("MarkdownRenderer server boundary", () => {
  it("keeps article parsing, wiki resolution and KaTeX out of the client module", () => {
    const renderer = readFileSync(join(process.cwd(), "components/MarkdownRenderer.tsx"), "utf8");
    const interactions = readFileSync(
      join(process.cwd(), "components/markdown/MarkdownInteractions.tsx"),
      "utf8"
    );
    const articleExtras = readFileSync(
      join(process.cwd(), "components/domain/DomainArticleExtras.tsx"),
      "utf8"
    );

    expect(renderer.startsWith('"use client"')).toBe(false);
    expect(renderer).not.toContain("usePathname");
    expect(renderer).not.toContain("useState");
    expect(renderer).toContain('import katex from "katex"');
    expect(renderer).toContain('from "@/lib/wiki-link-index"');
    expect(interactions.startsWith('"use client"')).toBe(true);
    expect(interactions).not.toContain("wiki-link-index");
    expect(interactions).not.toContain('from "katex"');
    expect(articleExtras.startsWith('"use client"')).toBe(true);
    expect(articleExtras).toContain('from "next/dynamic"');
  });
});
