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

export async function handleWorkerRequest(data: WorkerRequest): Promise<WorkerResponse> {
  try {
    if (data.type === "warmup") {
      await engine();
      return { type: "ready" };
    }
    const hits = (await engine()).search(data.query, data.limit);
    return { type: "result", id: data.id, hits };
  } catch (error) {
    enginePromise = null;
    return {
      type: "error",
      id: data.type === "search" ? data.id : undefined,
      message: error instanceof Error ? error.message : "search worker failed",
    };
  }
}
