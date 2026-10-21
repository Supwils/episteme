import { ogCard } from "@/lib/og/card";
import { renderOgPng } from "@/lib/og/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const png = await renderOgPng(ogCard(new URL(request.url).searchParams));
    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("OG image generation failed", error);
    return new Response("暂时无法生成分享图片", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
