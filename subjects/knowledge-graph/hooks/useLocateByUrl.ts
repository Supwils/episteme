"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { GraphNode } from "../data/types";
import { resolveNodeUrl } from "../components/detail-panel/constants";

/**
 * `?at=<article url>` → `?focus=<node id>`. Callers outside the graph (the ⌘K
 * preview's 「在图谱中定位」) know an article's URL but not its node id; the
 * graph owns that mapping. An URL with no node simply opens the graph unfocused.
 */
export function findNodeIdByUrl(nodes: readonly GraphNode[], url: string): string | null {
  const path = url.split(/[?#]/)[0];
  return nodes.find((node) => resolveNodeUrl(node) === path)?.id ?? null;
}

export function useLocateByUrl(nodes: readonly GraphNode[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const at = searchParams.get("at");

  useEffect(() => {
    if (!at || nodes.length === 0) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("at");
    const nodeId = findNodeIdByUrl(nodes, at);
    if (nodeId) next.set("focus", nodeId);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [at, nodes, pathname, router, searchParams]);
}
