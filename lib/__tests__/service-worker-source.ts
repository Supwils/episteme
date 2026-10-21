import { readFileSync } from "node:fs";

/** Expand the classic worker's fixed import so unit tests run the shipped bytes. */
export function readServiceWorkerSource() {
  return readFileSync("public/sw.js", "utf8").replace('importScripts("/sw-reading.js");', () =>
    readFileSync("public/sw-reading.js", "utf8")
  );
}
