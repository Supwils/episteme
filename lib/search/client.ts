import { isSafeInternalPath } from "@/lib/urls";
import type { SearchEngine, SearchHit } from "./engine";
import type { WorkerRequest, WorkerResponse } from "./worker-runtime";

export type { SearchHit } from "./engine";
export { loadArtifact } from "./artifact";

export const SEARCH_WORKER_URL = "/search.worker.js";
/** Hung workers (404 that never fires `error`, frozen isolate) must not leave
 *  overlay searches pending forever. After this, fall back to the main thread. */
export const SEARCH_WORKER_TIMEOUT_MS = 4000;
/** Before the worker reports `ready` the first answer includes fetching and
 *  parsing the ~3.9 MB index; falling back to the main thread at 4 s would
 *  redo exactly that work on the UI thread on slow connections. */
export const SEARCH_WORKER_COLD_TIMEOUT_MS = 20000;

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
  timer: ReturnType<typeof setTimeout>;
};

/** Title-index hits must be same-origin article paths. A compromised or
 *  confused worker must not be able to hand the overlay `javascript:` or
 *  protocol-relative URLs. */
export function isSafeSearchHit(hit: unknown): hit is SearchHit {
  if (!hit || typeof hit !== "object") return false;
  const candidate = hit as Partial<SearchHit>;
  if (typeof candidate.title !== "string" || typeof candidate.url !== "string") return false;
  return isSafeInternalPath(candidate.url);
}

function safeHits(hits: unknown): SearchHit[] {
  return Array.isArray(hits) ? hits.filter(isSafeSearchHit) : [];
}

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
  let ready = false;
  const pending = new Map<number, PendingSearch>();

  const takePending = (id: number): PendingSearch | undefined => {
    const item = pending.get(id);
    if (!item) return undefined;
    pending.delete(id);
    clearTimeout(item.timer);
    return item;
  };

  const failToMain = async () => {
    if (failed) return;
    failed = true;
    const waiting = [...pending.values()];
    pending.clear();
    for (const item of waiting) clearTimeout(item.timer);
    worker.terminate();
    for (const item of waiting) {
      try {
        item.resolve(safeHits(await main.search(item.query, item.limit)));
      } catch {
        item.resolve([]);
      }
    }
  };

  worker.onerror = () => {
    void failToMain();
  };

  worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
    const data = event.data;
    if (!data) return;
    if (data.type === "error") {
      void failToMain();
      return;
    }
    if (data.type === "ready") {
      ready = true;
      return;
    }
    if (data.type === "result") {
      ready = true;
      const item = takePending(data.id);
      if (!item) return;
      item.resolve(safeHits(data.hits));
    }
  };

  return {
    async search(query, limit = 20) {
      if (failed) return safeHits(await main.search(query, limit));
      const id = nextId++;
      return new Promise<SearchHit[]>((resolve) => {
        const timer = setTimeout(
          () => {
            void failToMain();
          },
          ready ? SEARCH_WORKER_TIMEOUT_MS : SEARCH_WORKER_COLD_TIMEOUT_MS
        );
        pending.set(id, { query, limit, resolve, timer });
        const message: WorkerRequest = { type: "search", id, query, limit };
        try {
          worker.postMessage(message);
        } catch {
          void failToMain();
        }
      });
    },
    warmup() {
      if (failed) {
        main.warmup();
        return;
      }
      const message: WorkerRequest = { type: "warmup" };
      try {
        worker.postMessage(message);
      } catch {
        void failToMain();
      }
    },
    dispose() {
      failed = true;
      for (const item of pending.values()) {
        clearTimeout(item.timer);
        item.resolve([]);
      }
      pending.clear();
      worker.terminate();
      main.dispose();
    },
  };
}

export function createSearchClient(): SearchClient {
  return createWorkerClient() ?? createMainThreadClient();
}
