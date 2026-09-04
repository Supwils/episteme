import { randomUUID } from "node:crypto";

/**
 * Extract or generate a request correlation ID for API routes.
 * Reads from common correlation headers or generates a UUID.
 */
export function getRequestId(request: Request): string {
  const incoming = request.headers.get("x-request-id") ?? request.headers.get("x-correlation-id");
  return incoming?.trim() || randomUUID();
}

/**
 * Create response headers with the request ID echoed back.
 * Merge with other headers as needed.
 */
export function withRequestId(requestId: string, headers?: HeadersInit): Headers {
  const result = new Headers(headers);
  result.set("x-request-id", requestId);
  return result;
}
