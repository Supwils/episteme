"use client";

import dynamic from "next/dynamic";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";
import { domainCluster } from "@/lib/knowledge-geometry";

// Client surfaces that show a seal only after an interaction (search results,
// link previews) load the glyph outlines then, not with the page.
const Seal = dynamic(() => import("./Seal").then((m) => m.Seal), {
  ssr: false,
  loading: () => <span className="inline-block h-4 w-4 shrink-0" aria-hidden />,
});

/** A domain seal in its cluster pigment, loaded on first render. Decorative. */
export function LazySeal({ domain, size = 16 }: { domain: string; size?: number }) {
  const cluster = domainCluster(domain);
  if (!isSealDomain(domain) || !cluster) return null;
  return <Seal domain={domain} size={size} color={pigmentVar(cluster)} label={false} />;
}
