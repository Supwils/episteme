import path from "node:path";

const WORKSPACE_ROOT = path.join(process.cwd(), "..", "..");

export function getContentDir(): string {
  return path.join(WORKSPACE_ROOT, "content");
}

export function getDomainContentDir(domain: string): string {
  return path.join(getContentDir(), domain);
}
