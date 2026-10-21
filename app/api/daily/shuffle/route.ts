import { NextResponse } from "next/server";
import { getDailySelected } from "@/lib/daily-selector";
import { dailyResponseHeaders } from "@/lib/daily-refresh";

// Dynamic (reads ?offset) so the "换一批" button can re-roll a fresh selection
// for the same day without waiting for the calendar to advance.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = Number(searchParams.get("offset") ?? "0");
  const offset = Number.isFinite(raw) ? Math.abs(Math.trunc(raw)) % 100000 : 0;
  const now = new Date();
  const daily = getDailySelected(now, offset);
  return NextResponse.json(daily, {
    headers: dailyResponseHeaders(now),
  });
}
