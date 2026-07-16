import { NextResponse } from "next/server";
import { buildKnowledgeConfluence } from "@/lib/knowledge-confluence-catalog";
import { KNOWLEDGE_CONTINUUM_CACHE_CONTROL } from "@/lib/knowledge-continuum-payload";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { CURATED_KNOWLEDGE_CONFLUENCES } from "@/subjects/knowledge-graph/data/curated-confluences";

const learningCatalog = buildLearningPlanCatalog();

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => ({ id: confluence.id }));
}

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
        "Cache-Control": KNOWLEDGE_CONTINUUM_CACHE_CONTROL,
        "X-Content-Strategy": "static-isr",
      },
    }
  );
}
