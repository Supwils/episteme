import { NextResponse } from "next/server";
import { getDailySelected } from "@/lib/daily-selector";

// Statically generated and revalidated hourly — it always serves "today".
// (A `?date=` query was removed: force-static routes can't read query params.)
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const daily = getDailySelected();

  return NextResponse.json(daily, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
