import fs from "node:fs";
import path from "node:path";

/**
 * Count and newest mtime of content files under `dir`.
 * Dev servers keep parsed article lists for the life of the process. A new
 * file would otherwise stay off the list, and knowledge-base lookup 404s,
 * until restart. Callers compare this stamp and rebuild only when it changes.
 */
export function contentTreeStamp(dir: string): string {
  if (!fs.existsSync(dir)) return "missing";
  let count = 0;
  let newest = 0;
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name.endsWith(".narration.md")) continue;
      if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) continue;
      count += 1;
      const mtime = fs.statSync(full).mtimeMs;
      if (mtime > newest) newest = mtime;
    }
  };
  walk(dir);
  return `${count}:${newest}`;
}
