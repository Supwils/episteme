import path from "node:path";

// The app now lives at the repo root, so content sits at <cwd>/content.
export function getContentDir(): string {
  return path.join(process.cwd(), "content");
}

export function getDomainContentDir(domain: string): string {
  return path.join(getContentDir(), domain);
}
