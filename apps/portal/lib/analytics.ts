export type AnalyticsEvent =
  | { type: "page_view"; section: string; slug: string }
  | { type: "search"; query: string; resultCount: number };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window !== "undefined" && "va" in window && typeof window.va === "function") {
    window.va("event", event);
  }
}
