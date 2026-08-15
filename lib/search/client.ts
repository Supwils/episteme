import { loadArtifact } from "./artifact";
import { loadEngine, type SearchEngine, type SearchHit } from "./engine";

export type { SearchHit } from "./engine";
export { loadArtifact } from "./artifact";

export interface SearchClient {
  search(query: string, limit?: number): Promise<SearchHit[]>;
  /** Start loading + parsing the index before the first query (overlay open). */
  warmup(): void;
  dispose(): void;
}

/**
 * Main-thread client. There used to be a Worker tier here, but Turbopack's
 * worker chunk runtime crashes on load in every real browser (the chunk
 * wrapper passes `document.currentScript`, which is undefined inside a
 * worker, and the fallback path reads it unconditionally) — the title tier
 * silently returned nothing while the body tier covered for it in e2e. The
 * graph layout worker masks the same bundler bug with its own sync fallback.
 *
 * The one-time cost is ~360ms of index parsing on the main thread; `warmup()`
 * moves it to overlay-open time so typing never waits on it.
 */
function createMainThreadClient(): SearchClient {
  let enginePromise: Promise<SearchEngine | null> | null = null;

  const engine = () => {
    enginePromise ??= loadArtifact()
      .then(loadEngine)
      .catch(() => {
        // Allow retry on the next query instead of caching a transient
        // failure as a permanently dead search box.
        enginePromise = null;
        return null;
      });
    return enginePromise;
  };

  return {
    async search(query, limit = 20) {
      return (await engine())?.search(query, limit) ?? [];
    },
    warmup() {
      void engine();
    },
    dispose() {
      enginePromise = null;
    },
  };
}

export function createSearchClient(): SearchClient {
  return createMainThreadClient();
}
