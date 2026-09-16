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
  });
});
