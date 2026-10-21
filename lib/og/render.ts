import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { loadOgFonts } from "./fonts";
import { OG_HEIGHT, OG_WIDTH, type OgCard } from "./card";
import { renderShareCard } from "@/components/og/ShareCard";

const require = createRequire(import.meta.url);
const runtimeKey = Symbol.for("episteme.og.resvg.2.4.0");
const runtime = globalThis as typeof globalThis & { [runtimeKey]?: Promise<void> };

function ready() {
  return (runtime[runtimeKey] ??= readFile(require.resolve("@resvg/resvg-wasm/index_bg.wasm"))
    .then((bytes) => initWasm(bytes))
    .catch((error) => {
      delete runtime[runtimeKey];
      throw error;
    }));
}

export async function renderOgPng(card: OgCard): Promise<Uint8Array> {
  const [fonts] = await Promise.all([loadOgFonts(), ready()]);
  const svg = await satori(renderShareCard(card), { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  const renderer = new Resvg(svg);
  try {
    const image = renderer.render();
    try {
      return image.asPng();
    } finally {
      image.free();
    }
  } finally {
    renderer.free();
  }
}
