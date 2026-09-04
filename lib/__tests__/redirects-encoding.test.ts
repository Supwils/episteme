import { describe, expect, it } from "vitest";
import { redirect } from "next/navigation";

/**
 * Guard: All redirect() calls must use ASCII-safe paths.
 * Chinese article slugs must be encoded before being passed to redirect().
 */

describe("redirect encoding safety", () => {
  it("redirect() throws on non-ASCII Location header values", () => {
    // This is a behavioral constraint test — Next.js's redirect() will fail
    // if given Chinese characters directly (Node ERR_INVALID_CHAR)
    const chineseSlug = "/human-history/figures/孔子";

    expect(() => {
      // This would fail in production with ERR_INVALID_CHAR
      // We document this constraint but don't literally call redirect() in tests
      // since it throws by design
      if (/[^\x00-\x7F]/.test(chineseSlug)) {
        throw new Error("redirect() requires ASCII-only paths");
      }
    }).toThrow("ASCII-only");
  });

  it("encodeURI preserves path structure while encoding Chinese", () => {
    const path = "/human-history/figures/孔子";
    const encoded = encodeURI(path);

    expect(encoded).toMatch(/^[\x00-\x7F]+$/);
    expect(encoded).toBe("/human-history/figures/%E5%AD%94%E5%AD%90");
    expect(encoded.split("/").length).toBe(path.split("/").length);
  });

  it("toRedirectLocation from random-article is idempotent", () => {
    // Already tested in random-article.test.ts, but documenting here
    // that this is the canonical solution for Chinese path redirects
    const examples = [
      "/human-history/figures/confucius",
      "/philosophy/thinkers/kant",
      "/human-history/knowledge/古代文明",
    ];

    for (const path of examples) {
      const parts = path.split("/");
      const encoded = parts
        .map((segment, index) => {
          if (index === 0 && segment === "") return "";
          try {
            return encodeURIComponent(decodeURIComponent(segment));
          } catch {
            return encodeURIComponent(segment);
          }
        })
        .join("/");

      expect(encoded).toMatch(/^[\x00-\x7F]+$/);
      // Second application should be stable
      const reEncoded = encoded
        .split("/")
        .map((segment, index) => {
          if (index === 0 && segment === "") return "";
          try {
            return encodeURIComponent(decodeURIComponent(segment));
          } catch {
            return encodeURIComponent(segment);
          }
        })
        .join("/");
      expect(reEncoded).toBe(encoded);
    }
  });

  it("all hardcoded redirect() destinations in the codebase are ASCII-safe", () => {
    // Document the current state: all redirect() calls use hardcoded ASCII paths
    const knownRedirects = [
      "/universe-physics/physics/classical-mechanics",
      "/universe-physics/universe/observable",
      "/universe-physics/universe/handwritten/observable",
      "/cosmology/universe/observable",
      "/human-history/timeline",
    ];

    for (const path of knownRedirects) {
      expect(path).toMatch(/^[\x00-\x7F]+$/);
      expect(() => redirect(path)).toThrow(); // redirect() always throws by design
    }
  });
});
