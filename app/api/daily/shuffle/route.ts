import { NextResponse } from "next/server";
import { getDailySelected } from "@/lib/daily-selector";
import { getRequestId, withRequestId } from "@/lib/api-request-id";
import { checkRateLimit, getClientIdentifier } from "@/lib/api-rate-limiter";
import { logRateLimitHit } from "@/lib/api-validation-logger";

// Dynamic (reads ?offset) so the "换一批" button can re-roll a fresh selection
// for the same day without waiting for the calendar to advance.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const clientId = getClientIdentifier(request);

  const rateLimitResult = checkRateLimit(clientId, {
    capacity: 40,
    refillRate: 0.5,
    keyPrefix: "daily-shuffle:",
  });

  if (!rateLimitResult.allowed) {
    logRateLimitHit(
      { requestId, endpoint: "/api/daily/shuffle", clientId },
      rateLimitResult.retryAfter!
    );
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: withRequestId(requestId, {
          "Retry-After": String(rateLimitResult.retryAfter),
        }),
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const raw = Number(searchParams.get("offset") ?? "0");
  const offset = Number.isFinite(raw) ? Math.abs(Math.trunc(raw)) % 100000 : 0;
  const daily = getDailySelected(new Date(), offset);
  return NextResponse.json(daily, {
    headers: withRequestId(requestId, { "Cache-Control": "no-store" }),
  });
}
