import { readdirSync } from "node:fs";
import { join } from "node:path";

/** Article files in a content section, so list-page counts track the content. */
export function contentArticleCount(section: string): number {
  return readdirSync(join(process.cwd(), "content", section)).filter((name) => /\.mdx?$/.test(name))
    .length;
}
