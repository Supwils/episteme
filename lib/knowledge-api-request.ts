import { NextResponse } from "next/server";

export const MAX_KNOWN_NODE_IDS = 2000;
export const MAX_KNOWLEDGE_ID_LENGTH = 200;
export const MAX_KNOWLEDGE_JOURNEYS = 16;
// Fully escaped IDs at all field limits need about 2.43 MB; 3 MiB leaves
// space for the remaining fields while bounding allocation before JSON.parse.
export const MAX_KNOWLEDGE_REQUEST_BYTES = 3 * 1024 * 1024;

export function knowledgeJsonResponse(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", "X-Profile-Storage": "local-only" },
  });
}

export function parseKnownNodeIds(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length > MAX_KNOWN_NODE_IDS) return null;
  const valid = value.filter(
    (id): id is string =>
      typeof id === "string" && id.length > 0 && id.length <= MAX_KNOWLEDGE_ID_LENGTH
  );
  return valid.length === value.length ? [...new Set(valid)] : null;
}

type KnowledgeBodyResult = { ok: true; body: unknown } | { ok: false; response: NextResponse };

function bodyError(error: string, status: 400 | 413): KnowledgeBodyResult {
  return { ok: false, response: knowledgeJsonResponse({ error }, status) };
}

function cancelRead(
  stream: ReadableStream<Uint8Array> | ReadableStreamDefaultReader<Uint8Array> | null
): void {
  // Transport cleanup can reject or never settle; it must not hold up a 413.
  void stream?.cancel().catch(() => undefined);
}

export async function readKnowledgeRequestBody(request: Request): Promise<KnowledgeBodyResult> {
  const declared = request.headers.get("Content-Length");
  if (declared && /^\d+$/.test(declared) && Number(declared) > MAX_KNOWLEDGE_REQUEST_BYTES) {
    cancelRead(request.body);
    return bodyError("Request body too large", 413);
  }
  if (!request.body) return bodyError("Invalid JSON body", 400);
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  try {
    reader = request.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_KNOWLEDGE_REQUEST_BYTES) {
        cancelRead(reader);
        return bodyError("Request body too large", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    return { ok: true, body: JSON.parse(text + decoder.decode()) as unknown };
  } catch {
    return bodyError("Invalid JSON body", 400);
  } finally {
    reader?.releaseLock();
  }
}
