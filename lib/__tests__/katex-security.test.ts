import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import katex from "katex";
import { KATEX_OPTIONS } from "@/components/markdown/katex-options";

const link = String.raw`\href{https://example.invalid/reference}{reference}`;
const expansion = String.raw`\def\one{1}\one+\one+\one`;

describe("KaTeX renderer option ownership", () => {
  it("does not inherit permission to create external links", () => {
    const options = { throwOnError: false };
    Object.setPrototypeOf(options, { trust: true });
    expect(katex.renderToString(link, options)).not.toContain(
      'href="https://example.invalid/reference"'
    );
  });

  it("retains the caller's explicit trusted rendering option", () => {
    expect(katex.renderToString(link, { trust: true })).toContain(
      'href="https://example.invalid/reference"'
    );
  });

  it("does not inherit a replacement expansion limit", () => {
    const options = { throwOnError: false };
    Object.setPrototypeOf(options, { maxExpand: 1 });
    expect(katex.renderToString(expansion, options)).not.toContain("katex-error");
  });

  it("still enforces an explicitly supplied expansion limit", () => {
    expect(() => katex.renderToString(expansion, { maxExpand: 1 })).toThrow("Too many expansions");
  });

  it("renders article formulas without links or an expansion hang", () => {
    expect(KATEX_OPTIONS).not.toHaveProperty("trust");
    for (const file of [
      "components/markdown/inline.tsx",
      "components/markdown/inline-segments.tsx",
      "components/markdown/katex-options.ts",
    ]) {
      expect(readFileSync(file, "utf8")).not.toMatch(/trust\s*:/);
    }
    const href = katex.renderToString(String.raw`\href{javascript:alert(1)}{x}`, {
      ...KATEX_OPTIONS,
      displayMode: false,
    });
    expect(href).not.toMatch(/<a\b/i);
    const broken = katex.renderToString(`"></span><img src=x onerror=alert(1)>`, {
      ...KATEX_OPTIONS,
      displayMode: false,
    });
    expect(broken).not.toContain("<img");
    expect(broken).toContain("&lt;");
    const started = Date.now();
    const bomb = katex.renderToString(String.raw`\def\a{\a\a}\a`, {
      ...KATEX_OPTIONS,
      displayMode: false,
    });
    expect(Date.now() - started).toBeLessThan(1000);
    expect(bomb).toContain("katex-error");
  });
});
