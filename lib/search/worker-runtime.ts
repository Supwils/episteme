import { loadArtifact } from "./artifact";
import { loadEngine, type SearchEngine, type SearchHit } from "./engine";

let enginePromise: Promise<SearchEngine> | null = null;

function engine(): Promise<SearchEngine> {
  enginePromise ??= loadArtifact().then(loadEngine);
  return enginePromise;
}

export type WorkerRequest =
  | { type: "warmup" }
  | { type: "search"; id: number; query: string; limit: number };

export type WorkerResponse =
  | { type: "ready" }
  | { type: "result"; id: number; hits: SearchHit[] }
  | { type: "error"; id?: number; message: string };

/** Same cap as `/api/search` and the overlay input `maxLength`. */
const MAX_QUERY_LENGTH = 120;
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 20;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function parseSearchLimit(value: unknown): number | null {
  if (value === undefined) return DEFAULT_LIMIT;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(MAX_LIMIT, Math.max(1, Math.trunc(value)));
}

function invalid(id?: number): WorkerResponse {
  return { type: "error", id, message: "invalid search request" };
}

/**
 * Worker `onmessage` data is untyped at the boundary. Reject anything that is
 * not a warmup/search payload before touching MiniSearch, and clamp query
 * length / hit cap so a bad postMessage cannot force an unbounded scan.
 */
export async function handleWorkerRequest(data: unknown): Promise<WorkerResponse> {
  const payload = asRecord(data);
  if (!payload) return invalid();

  try {
    if (payload.type === "warmup") {
      await engine();
      return { type: "ready" };
    }
    if (payload.type !== "search") return invalid();

    const id = payload.id;
    if (typeof id !== "number" || !Number.isInteger(id)) return invalid();
    if (typeof payload.query !== "string") return invalid(id);
    const limit = parseSearchLimit(payload.limit);
    if (limit === null) return invalid(id);

    const hits = (await engine()).search(payload.query.slice(0, MAX_QUERY_LENGTH), limit);
    return { type: "result", id, hits };
  } catch (error) {
    enginePromise = null;
    const id =
      payload.type === "search" && typeof payload.id === "number" && Number.isInteger(payload.id)
        ? payload.id
        : undefined;
    return {
      type: "error",
      id,
      message: error instanceof Error ? error.message : "search worker failed",
    };
  }
}
