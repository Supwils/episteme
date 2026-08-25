import fs from "node:fs";
import path from "node:path";

type SearchDoc = { t: string; u: string; c: string; k?: string };

function encodeLastSegment(url: string): string {
  if (!url.startsWith("/human-history/figures/") && !url.startsWith("/human-history/events/")) {
    return url;
  }
  const parts = url.split("/");
  const last = parts.at(-1);
  if (!last) return url;
  try {
    parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
  } catch {
    parts[parts.length - 1] = encodeURIComponent(last);
  }
  return parts.join("/");
}

let cachedUrls: string[] | null = null;

function loadArticleUrls(): string[] {
  if (cachedUrls) return cachedUrls;
  const file = path.join(process.cwd(), "public/search-index.json");
  const raw = JSON.parse(fs.readFileSync(file, "utf-8")) as { docs: SearchDoc[] };
  cachedUrls = [
    ...new Set(
      raw.docs
        .filter((d) => typeof d.u === "string" && d.u.startsWith("/"))
        .map((d) => encodeLastSegment(d.u))
        .filter((u) => u.split("/").filter(Boolean).length >= 3)
    ),
  ];
  return cachedUrls;
}

/** Article-depth URLs the random picker draws from (thinkers, entries, KB, …). */
export function listRandomArticleUrls(): string[] {
  return loadArticleUrls();
}

/** Pick a stable-ish random article URL from the full article-depth index. */
export function pickRandomArticleUrl(): string {
  const urls = loadArticleUrls();
  if (urls.length === 0) return "/daily";
  const i = Math.floor(Math.random() * urls.length);
  return urls[i] ?? "/daily";
}

/** Node refuses non-ASCII `Location` values (`ERR_INVALID_CHAR`). */
export function toRedirectLocation(url: string): string {
  return url
    .split("/")
    .map((segment, index) => {
      if (index === 0 && segment === "") return "";
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}
