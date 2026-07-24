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
function fromArtifact(): PhraseCorpus {
  const text = readFileSync(join(GENERATED, "corpus.txt"), "utf-8");
  const meta = JSON.parse(readFileSync(join(GENERATED, "corpus-meta.json"), "utf-8")) as {
    offsets: number[];
    docs: SearchDoc[];
  };
  return { corpus: { text, offsets: meta.offsets }, docs: meta.docs };
}

/** Dev path: `generated/` is gitignored, so a fresh clone running `pnpm dev`
 *  has no artifact. Rebuilding from source produces a byte-identical corpus.
 *  Only viable outside a deployed function, where `app/` still exists on disk. */
async function fromContent(): Promise<PhraseCorpus> {
  const { collectArticles } = await import("./articles");
  const articles = collectArticles();
  return {
    corpus: buildCorpus(articles.map((a) => toSearchableText(a.body))),
    docs: articles.map((a) => ({ t: a.title, s: "", u: a.url, c: a.domain, k: "article" })),
  };
}

const EMPTY: PhraseCorpus = { corpus: { text: "", offsets: [] }, docs: [] };

let cached: Promise<PhraseCorpus> | null = null;

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
 *  pay nothing and a cold one pays the ~60ms read. */
export function getPhraseCorpus(): Promise<PhraseCorpus> {
  cached ??= load();
  return cached;
}
