import { NextResponse } from "next/server";
import { buildKnowledgeConfluence } from "@/lib/knowledge-confluence-catalog";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";

const learningCatalog = buildLearningPlanCatalog();
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

interface KnowledgeConfluenceRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: KnowledgeConfluenceRouteContext
): Promise<NextResponse> {
  const { id } = await context.params;
  const confluence = buildKnowledgeConfluence(id, learningCatalog);
  if (!confluence) {
    return NextResponse.json({ error: "Unknown knowledge confluence" }, { status: 404 });
  }
  return NextResponse.json(
    { confluence },
    {
      headers: {
        "Cache-Control": CACHE_CONTROL,
        "X-Content-Strategy": "on-demand",
      },
    }
  );
}
