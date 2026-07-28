import { SEARCH_INDEX_URL, SEARCH_INDEX_VERSION, type SearchIndexArtifact } from "./types";

/** Lives apart from `client.ts` on purpose. `client.ts` spawns
 *  `search.worker.ts` via `new Worker(new URL(...))`, so anything the worker
 *  imports must not lead back to `client.ts`: that cycle makes the worker's
 *  chunk group depend on the module that owns it, and Turbopack deadlocks
 *  building it — `next build` hangs at "Creating an optimized production
 *  build" with every worker thread parked, producing no output and no error.
 *  Keep this module free of imports that reach `client.ts`. */
export async function loadArtifact(signal?: AbortSignal): Promise<SearchIndexArtifact> {
  const response = await fetch(SEARCH_INDEX_URL, { signal });
  if (!response.ok) throw new Error(`search index request failed: ${response.status}`);

  const artifact = (await response.json()) as SearchIndexArtifact;
  if (artifact.v !== SEARCH_INDEX_VERSION) {
    throw new Error(`search index version ${artifact.v} != expected ${SEARCH_INDEX_VERSION}`);
  }
  return artifact;
}
