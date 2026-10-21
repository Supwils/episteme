import { NextResponse } from "next/server";
import { getDailySelected } from "@/lib/daily-selector";
import { dailyResponseHeaders } from "@/lib/daily-refresh";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  const daily = getDailySelected(now);

  return NextResponse.json(daily, {
    headers: dailyResponseHeaders(now),
  });
}
