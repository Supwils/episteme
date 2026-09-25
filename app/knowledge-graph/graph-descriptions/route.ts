import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import { packGraphDescriptions } from "@/subjects/knowledge-graph/lib/graph-wire";

// Second half of the graph payload (wire v3): node descriptions, fetched after
// the graph has drawn. Force-static like graph-data, so it is one cached JSON.
export const dynamic = "force-static";

export function GET() {
  return Response.json(packGraphDescriptions(ALL_NODES));
}
