import { SEARCH_INDEX_URL, SEARCH_INDEX_VERSION, type SearchIndexArtifact } from "./types";

/** Lives apart from `client.ts` so the artifact loader stays a leaf module
 *  with no imports that reach back into the client. (An earlier Worker-based
 *  client needed this separation to avoid a Turbopack chunk cycle; the worker
 *  is gone — see client.ts — but the leaf-module discipline is kept.) */
export async function loadArtifact(signal?: AbortSignal): Promise<SearchIndexArtifact> {
  const response = await fetch(SEARCH_INDEX_URL, { signal });
  if (!response.ok) throw new Error(`search index request failed: ${response.status}`);

  const artifact = (await response.json()) as SearchIndexArtifact;
  if (artifact.v !== SEARCH_INDEX_VERSION) {
    throw new Error(`search index version ${artifact.v} != expected ${SEARCH_INDEX_VERSION}`);
  }
  return artifact;
}
