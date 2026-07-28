import { loadArtifact } from "./artifact";
import { loadEngine, type SearchEngine, type SearchHit } from "./engine";

export type { SearchHit } from "./engine";
export { loadArtifact } from "./artifact";

export interface SearchClient {
  search(query: string, limit?: number): Promise<SearchHit[]>;
  dispose(): void;
}

/** Restoring the index costs ~360ms of parsing and every keystroke costs more,
 *  which is exactly the kind of main-thread work the graph's TBT budget was
 *  fought over. Do it in a Worker, and only fall back when there isn't one. */
function createWorkerClient(): SearchClient | null {
  if (typeof Worker === "undefined") return null;

  let worker: Worker;
  try {
    // Must be a RELATIVE specifier — bundlers don't resolve the `@/` alias
    // inside `new URL(..., import.meta.url)` and the worker silently fails.
    worker = new Worker(new URL("./search.worker.ts", import.meta.url));
  } catch {
    return null;
  }

  let nextId = 0;
  const pending = new Map<number, (hits: SearchHit[]) => void>();

  worker.onmessage = (event: MessageEvent<{ id: number; hits: SearchHit[] }>) => {
    pending.get(event.data.id)?.(event.data.hits);
    pending.delete(event.data.id);
  };
  worker.onerror = (event) => {
    // Keep the dev overlay from rendering this as `[object Event]`; an empty
    // result set is a better failure than a broken search box.
    event.preventDefault();
    for (const resolve of pending.values()) resolve([]);
    pending.clear();
  };

  return {
    search(query, limit = 20) {
      return new Promise<SearchHit[]>((resolve) => {
        const id = nextId++;
        pending.set(id, resolve);
        worker.postMessage({ id, query, limit });
      });
    },
    dispose() {
      worker.terminate();
      pending.clear();
    },
  };
}

function createMainThreadClient(): SearchClient {
  let enginePromise: Promise<SearchEngine | null> | null = null;

  const engine = () => {
    enginePromise ??= loadArtifact()
      .then(loadEngine)
      .catch(() => null);
    return enginePromise;
  };

  return {
    async search(query, limit = 20) {
      return (await engine())?.search(query, limit) ?? [];
    },
    dispose() {
      enginePromise = null;
    },
  };
}

export function createSearchClient(): SearchClient {
  return createWorkerClient() ?? createMainThreadClient();
}
