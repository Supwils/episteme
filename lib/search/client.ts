import type { SearchEngine, SearchHit } from "./engine";
import type { WorkerRequest, WorkerResponse } from "./worker-runtime";

export type { SearchHit } from "./engine";
export { loadArtifact } from "./artifact";

export const SEARCH_WORKER_URL = "/search.worker.js";

export interface SearchClient {
  search(query: string, limit?: number): Promise<SearchHit[]>;
  /** Start loading + parsing the index before the first query (overlay open). */
  warmup(): void;
  dispose(): void;
}

/**
 * Title-tier search. Prefer a classic Worker served from `public/search.worker.js`
 * (esbuild IIFE, no Turbopack chunk wrapper). Turbopack's `new Worker(new URL())`
 * path still crashes in real browsers: the chunk runtime reads
 * `document.currentScript` inside the worker. If the worker 404s or errors, fall
 * back to a main-thread client that dynamic-imports MiniSearch so the layout
 * bundle does not pay for it on the happy path.
 *
 * `warmup()` starts fetch+parse after overlay-open, on idle (200ms timeout) for
 * the main-thread fallback so the open interaction is not itself a long task.
 */
function createMainThreadClient(): SearchClient {
  let enginePromise: Promise<SearchEngine | null> | null = null;
  let idleHandle: number | null = null;

  const engine = () => {
    enginePromise ??= Promise.all([import("./artifact"), import("./engine")])
      .then(([{ loadArtifact }, { loadEngine }]) => loadArtifact().then(loadEngine))
      .catch(() => {
        enginePromise = null;
        return null;
      });
    return enginePromise;
  };

  const startEngine = () => {
    idleHandle = null;
    void engine();
  };

  return {
    async search(query, limit = 20) {
      if (idleHandle !== null && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleHandle);
        idleHandle = null;
      }
      return (await engine())?.search(query, limit) ?? [];
    },
    warmup() {
      if (enginePromise || idleHandle !== null) return;
      if (typeof requestIdleCallback === "function") {
        idleHandle = requestIdleCallback(startEngine, { timeout: 200 });
        return;
      }
      startEngine();
    },
    dispose() {
      if (idleHandle !== null && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleHandle);
      }
      idleHandle = null;
      enginePromise = null;
    },
  };
}

type PendingSearch = {
  query: string;
  limit: number;
  resolve: (hits: SearchHit[]) => void;
};

function createWorkerClient(): SearchClient | null {
  if (typeof Worker === "undefined") return null;

  let worker: Worker;
  try {
    worker = new Worker(SEARCH_WORKER_URL);
  } catch {
    return null;
  }

  const main = createMainThreadClient();
  let nextId = 1;
  let failed = false;
  const pending = new Map<number, PendingSearch>();

  const failToMain = async () => {
    if (failed) return;
    failed = true;
    const waiting = [...pending.values()];
    pending.clear();
    worker.terminate();
    for (const item of waiting) {
      item.resolve(await main.search(item.query, item.limit));
    }
  };

  worker.onerror = () => {
    void failToMain();
  };

  worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
    const data = event.data;
    if (!data) return;
    if (data.type === "error") {
      const id = data.id;
      const item = id === undefined ? undefined : pending.get(id);
      if (item && id !== undefined) {
        pending.delete(id);
        void main.search(item.query, item.limit).then(item.resolve);
        return;
      }
      void failToMain();
      return;
    }
    if (data.type === "result") {
      const item = pending.get(data.id);
      if (!item) return;
      pending.delete(data.id);
      item.resolve(data.hits);
    }
  };

  return {
    async search(query, limit = 20) {
      if (failed) return main.search(query, limit);
      const id = nextId++;
      return new Promise<SearchHit[]>((resolve) => {
        pending.set(id, { query, limit, resolve });
        const message: WorkerRequest = { type: "search", id, query, limit };
        worker.postMessage(message);
      });
    },
    warmup() {
      if (failed) {
        main.warmup();
        return;
      }
      const message: WorkerRequest = { type: "warmup" };
      worker.postMessage(message);
    },
    dispose() {
      for (const item of pending.values()) item.resolve([]);
      pending.clear();
      worker.terminate();
      main.dispose();
    },
  };
}

export function createSearchClient(): SearchClient {
  return createWorkerClient() ?? createMainThreadClient();
}
