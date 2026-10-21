/** A reader-supplied archive. Larger files are refused before `JSON.parse`. */
export const MAX_LOCAL_JSON_BYTES = 1_000_000;

/** Browsers can drop a download if the object URL is revoked in the same turn. */
const REVOKE_BLOB_AFTER_MS = 1000;

export function downloadJson(filename: string, value: unknown): void {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" })
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), REVOKE_BLOB_AFTER_MS);
}

export async function readBoundedJson(
  file: Blob,
  maxBytes = MAX_LOCAL_JSON_BYTES
): Promise<unknown> {
  if (file.size > maxBytes) {
    throw new Error("JSON file exceeds the import limit");
  }
  return JSON.parse(await file.text()) as unknown;
}
