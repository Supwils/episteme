import { NextResponse } from "next/server";
import { getHomeToday } from "@/lib/home-today";
import { dailyResponseHeaders } from "@/lib/daily-refresh";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  return NextResponse.json(getHomeToday(now), { headers: dailyResponseHeaders(now) });
}
