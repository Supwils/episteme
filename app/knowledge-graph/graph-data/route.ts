import { ALL_NODES, ALL_EDGES } from "@/subjects/knowledge-graph/data/graph-data";

// The graph dataset is derived from the content tree via fs, so it must be
// computed server-side. Serving it as a force-static route handler keeps it
// out of the page's RSC payload AND the client JS bundle: it becomes one
// cacheable static JSON the client fetches once when the graph mounts.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ nodes: ALL_NODES, edges: ALL_EDGES });
}
