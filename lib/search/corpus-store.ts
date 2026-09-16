import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildCorpus, type Corpus } from "./corpus";
import { toSearchableText } from "./extract";
import type { SearchDoc } from "./types";

export interface PhraseCorpus {
  corpus: Corpus;
  docs: SearchDoc[];
}

const GENERATED = join(process.cwd(), "generated");

/** Fast path: the artifact `pnpm gen-search-index` writes during `prebuild`.
 *  ~60ms for 10M characters, versus ~560ms to rebuild it from `content/`. */
export function parsePhraseCorpusArtifact(text: string, metaJson: string): PhraseCorpus {
  const meta = JSON.parse(metaJson) as { offsets?: unknown; docs?: unknown };
  if (!Array.isArray(meta.offsets) || !Array.isArray(meta.docs)) {
    throw new Error("invalid corpus meta");
  }
  if (meta.offsets.length !== meta.docs.length) {
    throw new Error("corpus offsets/docs length mismatch");
  }
  if (meta.offsets.some((offset) => typeof offset !== "number" || !Number.isFinite(offset))) {
    throw new Error("invalid corpus offsets");
  }
  return {
    corpus: { text, offsets: meta.offsets as number[] },
    docs: meta.docs as SearchDoc[],
  };
}

function fromArtifact(): PhraseCorpus {
  return parsePhraseCorpusArtifact(
    readFileSync(join(GENERATED, "corpus.txt"), "utf-8"),
    readFileSync(join(GENERATED, "corpus-meta.json"), "utf-8")
  );
}

/** Dev path: `generated/` is gitignored, so a fresh clone running `pnpm dev`
 *  has no artifact. Rebuilding from source produces a byte-identical corpus.
 *  Only viable outside a deployed function, where `app/` still exists on disk. */
async function fromContent(): Promise<PhraseCorpus> {
  const { collectArticles } = await import("./articles");
  const { toCorpusSearchDoc } = await import("./article-meta");
  const articles = collectArticles();
  return {
    corpus: buildCorpus(articles.map((a) => toSearchableText(a.body))),
    docs: articles.map(toCorpusSearchDoc),
  };
}

const EMPTY: PhraseCorpus = { corpus: { text: "", offsets: [] }, docs: [] };

let cached: Promise<PhraseCorpus> | null = null;

export function isEmptyPhraseCorpus(value: PhraseCorpus): boolean {
  return value.docs.length === 0 && value.corpus.text.length === 0;
}

async function load(): Promise<PhraseCorpus> {
  try {
    return fromArtifact();
  } catch {
    try {
      return await fromContent();
    } catch (error) {
      // An empty corpus degrades body search to nothing; a throw would take the
      // whole search endpoint down. Production smoke tests catch the difference.
      console.error("[search] no phrase corpus available:", error);
      return EMPTY;
    }
  }
}

/** Loaded once per process. Fluid Compute reuses instances, so warm requests
 *  pay nothing and a cold one pays the ~60ms read. A failed empty fallback is
 *  not remembered — the next request may find a freshly generated artifact. */
export function getPhraseCorpus(): Promise<PhraseCorpus> {
  if (!cached) {
    const pending = load().then((result) => {
      if (isEmptyPhraseCorpus(result) && cached === pending) cached = null;
      return result;
    });
    cached = pending;
  }
  return cached;
}
