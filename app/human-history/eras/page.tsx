import { redirect } from "next/navigation";

// `eras/[slug]` provides era detail pages, but there is no era index — the
// timeline is the canonical "browse by era" surface. Redirect the bare path so
// typed/deep-linked `/human-history/eras` lands somewhere useful instead of 404.
export default function ErasIndexPage() {
  redirect("/human-history/timeline");
}
