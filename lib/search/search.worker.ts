import { loadEngine, type SearchEngine } from "./engine";
import { loadArtifact } from "./client";

interface Request {
  id: number;
  query: string;
  limit: number;
}

let enginePromise: Promise<SearchEngine | null> | null = null;

function engine(): Promise<SearchEngine | null> {
  enginePromise ??= loadArtifact()
    .then(loadEngine)
    .catch(() => null);
  return enginePromise;
}

self.onmessage = async (event: MessageEvent<Request>) => {
  const { id, query, limit } = event.data;
  const hits = (await engine())?.search(query, limit) ?? [];
  self.postMessage({ id, hits });
};
