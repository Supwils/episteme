import { describe, expect, it } from "vitest";
import { isSafeInternalPath, isSafeHref } from "@/lib/urls";

describe("isSafeInternalPath", () => {
  it("accepts same-origin article paths", () => {
    expect(isSafeInternalPath("/philosophy/thinkers/socrates")).toBe(true);
    expect(isSafeInternalPath("/search?q=熵")).toBe(true);
    expect(isSafeInternalPath(`/human-history/figures/${encodeURIComponent("孔子")}`)).toBe(true);
  });

  it("rejects protocol-relative, external, and script URLs", () => {
    expect(isSafeInternalPath("//evil.example/phish")).toBe(false);
    expect(isSafeInternalPath("https://evil.example/phish")).toBe(false);
    expect(isSafeInternalPath("javascript:alert(1)")).toBe(false);
    expect(isSafeInternalPath("/\\evil.example")).toBe(false);
    expect(isSafeInternalPath("")).toBe(false);
    expect(isSafeInternalPath("/foo\r\nSet-Cookie: a=b")).toBe(false);
    expect(isSafeInternalPath("/foo\nbar")).toBe(false);
    expect(isSafeInternalPath("/foo\u0000bar")).toBe(false);
  });
});

describe("isSafeHref", () => {
  it("allows internal paths, hashes, and http(s)", () => {
    expect(isSafeHref("/philosophy/thinkers/socrates")).toBe(true);
    expect(isSafeHref("#fn-1")).toBe(true);
    expect(isSafeHref("https://doi.org/10.1038/example")).toBe(true);
    expect(isSafeHref("http://example.org/paper")).toBe(true);
  });

  it("rejects script, data, and protocol-relative URLs", () => {
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("data:text/html,<script>alert(1)</script>")).toBe(false);
    expect(isSafeHref("//evil.example/phish")).toBe(false);
    expect(isSafeHref("https://example.org/\r\nX-Injected: 1")).toBe(false);
    expect(isSafeHref("#fn\n-1")).toBe(false);
    expect(isSafeHref("\u2028javascript:alert(1)")).toBe(false);
    expect(isSafeHref("java\u2028script:alert(1)")).toBe(false);
    expect(isSafeHref("\uFEFFjavascript:alert(1)")).toBe(false);
  });

  it("keeps a special scheme without slashes on that scheme", () => {
    expect(isSafeHref("https:example.org/paper")).toBe(true);
    expect(new URL("https:example.org/paper").href).toBe("https://example.org/paper");
  });
});
