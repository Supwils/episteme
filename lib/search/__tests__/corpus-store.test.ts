import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { collectArticles } from "../articles";
import { buildCorpus } from "../corpus";
import { toSearchableText } from "../extract";
import { isEmptyPhraseCorpus, parsePhraseCorpusArtifact } from "../corpus-store";
import type { SearchDoc } from "../types";

/**
 * Production reads the generated corpus; `pnpm dev` rebuilds it from `content/`
 * because `generated/` is gitignored. If those two ever diverge, a phrase would
 * be findable locally and missing in production — the worst kind of bug to
 * notice. This pins them together.
 *
 * `generated/` is gitignored, so a clone that has not run `pnpm gen-all` yet has
 * nothing to compare against. CI regenerates before running tests, so the skip
 * never applies there.
 */
describe.skipIf(!existsSync("generated/corpus.txt"))("phrase corpus", () => {
  const generated = readFileSync("generated/corpus.txt", "utf-8");
  const meta = JSON.parse(readFileSync("generated/corpus-meta.json", "utf-8")) as {
    offsets: number[];
    docs: SearchDoc[];
  };

  const rebuilt = buildCorpus(collectArticles().map((a) => toSearchableText(a.body)));

  it("rebuilds byte-identically from content/", () => {
    expect(rebuilt.text).toBe(generated);
  });

  it("keeps the same article boundaries", () => {
    expect(rebuilt.offsets).toEqual(meta.offsets);
  });

  it("has one metadata entry per article body", () => {
    expect(meta.docs.length).toBe(meta.offsets.length);
    expect(meta.docs.every((d) => d.u.startsWith("/"))).toBe(true);
  });
});

describe("parsePhraseCorpusArtifact", () => {
  it("rejects metadata whose offsets and docs do not line up", () => {
    expect(() =>
      parsePhraseCorpusArtifact("abc", JSON.stringify({ offsets: [0], docs: [] }))
    ).toThrow(/mismatch/);
    expect(() =>
      parsePhraseCorpusArtifact("abc", JSON.stringify({ offsets: "nope", docs: [] }))
    ).toThrow(/invalid corpus meta/);
  });

  it("accepts a matching artifact", () => {
    const parsed = parsePhraseCorpusArtifact(
      "abc",
      JSON.stringify({
        offsets: [0],
        docs: [
          {
            t: "熵",
            s: "",
            u: "/universe-physics/physics/thermodynamics",
            c: "physics",
            k: "article",
          },
        ],
      })
    );
    expect(parsed.docs).toHaveLength(1);
    expect(isEmptyPhraseCorpus(parsed)).toBe(false);
  });

  it("treats a zero-length fallback as empty so it is not process-cached", () => {
    expect(isEmptyPhraseCorpus({ corpus: { text: "", offsets: [] }, docs: [] })).toBe(true);
  });
});
