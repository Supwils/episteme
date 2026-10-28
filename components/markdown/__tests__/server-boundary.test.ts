import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("MarkdownRenderer server boundary", () => {
  it("keeps article parsing, wiki resolution and KaTeX out of the client module", () => {
    const renderer = readFileSync(join(process.cwd(), "components/MarkdownRenderer.tsx"), "utf8");
    // Inline parsing (KaTeX, wiki-link resolution) moved to components/markdown/inline.tsx.
    const inline = readFileSync(join(process.cwd(), "components/markdown/inline.tsx"), "utf8");
    const segments = readFileSync(
      join(process.cwd(), "components/markdown/inline-segments.tsx"),
      "utf8"
    );
    const interactions = readFileSync(
      join(process.cwd(), "components/markdown/MarkdownInteractions.tsx"),
      "utf8"
    );
    const articleExtras = readFileSync(
      join(process.cwd(), "components/domain/DomainArticleExtras.tsx"),
      "utf8"
    );
    const mathScroll = readFileSync("components/markdown/InlineMathScroll.tsx", "utf8");

    expect(renderer.startsWith('"use client"')).toBe(false);
    expect(renderer).not.toContain("usePathname");
    expect(renderer).not.toContain("useState");
    expect(inline.startsWith('"use client"')).toBe(false);
    expect(inline).toContain("takeInlineSegment");
    expect(inline).not.toContain('from "katex"');
    expect(segments.startsWith('"use client"')).toBe(false);
    expect(segments).toContain('import katex from "katex"');
    expect(segments).toContain('from "@/lib/wiki-link-index"');
    expect(segments).toContain("isInlineMath");
    expect(interactions.startsWith('"use client"')).toBe(true);
    expect(interactions).not.toContain("wiki-link-index");
    expect(interactions).not.toContain('from "katex"');
    expect(mathScroll).not.toContain('from "katex"');
    expect(mathScroll).not.toContain("wiki-link-index");
    expect(articleExtras.startsWith('"use client"')).toBe(true);
    expect(articleExtras).toContain('from "next/dynamic"');
  });
});
