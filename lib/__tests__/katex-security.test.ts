import { describe, expect, it } from "vitest";
import katex from "katex";

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
});
