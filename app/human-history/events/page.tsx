import { redirect } from "next/navigation";

// `events/[slug]` provides event detail pages, but there is no event index — the
// timeline is the canonical "browse all events" surface. Redirect the bare path
// so typed/deep-linked `/human-history/events` lands somewhere useful instead of 404.
export default function EventsIndexPage() {
  redirect("/human-history/timeline");
}
