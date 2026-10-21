import satori, { type SatoriNode } from "satori";
import { expect, it } from "vitest";
import { renderShareCard } from "@/components/og/ShareCard";
import { loadOgFonts } from "../fonts";
import { ogCard, OG_HEIGHT, OG_WIDTH } from "../card";

it.each([
  "知识如何改变我们理解世界的方式".repeat(20),
  "W".repeat(200),
  "🧠🌍".repeat(100),
  "e\u0301".repeat(100),
])("keeps bounded text and branding inside the rendered card: %.18s", async (title) => {
  const nodes: SatoriNode[] = [];
  await satori(
    renderShareCard(
      ogCard(new URLSearchParams({ title, description: "知识".repeat(80), section: "chemistry" }))
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: await loadOgFonts(),
      onNodeDetected: (node) => nodes.push(node),
    }
  );
  const heading = nodes.find((node) => node.type === "h1");
  const description = nodes.find((node) => node.type === "p");
  const brand = nodes.find((node) => node.textContent === "EPISTEME · 格致");
  expect(heading).toBeDefined();
  expect(description).toBeDefined();
  expect(brand).toBeDefined();
  for (const node of [heading!, description!, brand!]) {
    expect(node.left).toBeGreaterThanOrEqual(60);
    expect(node.left + node.width).toBeLessThanOrEqual(OG_WIDTH - 60);
    expect(node.top).toBeGreaterThanOrEqual(60);
    expect(node.top + node.height).toBeLessThanOrEqual(OG_HEIGHT - 60);
  }
  expect(heading!.top + heading!.height).toBeLessThanOrEqual(description!.top);
  expect(description!.top + description!.height).toBeLessThanOrEqual(brand!.top - 20);
});
