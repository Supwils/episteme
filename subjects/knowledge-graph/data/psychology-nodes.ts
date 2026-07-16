import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GraphNode, GraphEdge } from "./types";
import { PSYCHOLOGY_METHOD_EDGES, PSYCHOLOGY_METHOD_NODES } from "./psychology-methods-nodes";
import { PSYCHOLOGY_COVERAGE_EDGES, PSYCHOLOGY_COVERAGE_NODES } from "./psychology-coverage";

interface MdxEntry {
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
}

const PHENOMENON_GRAPH_SLUG_OVERRIDES: Record<string, string> = {
  "learned-helplessness": "learned-helplessness-phenomenon",
};

function phenomenonGraphId(slug: string): string {
  return `psychology:${PHENOMENON_GRAPH_SLUG_OVERRIDES[slug] ?? slug}`;
}

function findMonorepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function readMdxFiles(dir: string): MdxEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), frontmatter: data, content };
    });
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  let desc = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (desc) break;
      continue;
    }
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("---")) continue;
    if (trimmed.startsWith("|")) continue;
    if (trimmed.startsWith(">")) continue;
    desc += (desc ? " " : "") + trimmed;
    if (desc.length > 200) break;
  }
  desc = desc.replace(/\*\*(.*?)\*\*/g, "$1");
  desc = desc.replace(/\*(.*?)\*/g, "$1");
  desc = desc.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  if (desc.length > 150) {
    desc = desc.slice(0, 147) + "...";
  }
  return desc;
}

function normalizeEdgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function buildPsychologyGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const root = findMonorepoRoot();

  const theoristsData = readMdxFiles(path.join(root, "content/psychology/theorists"));
  const experimentsData = readMdxFiles(path.join(root, "content/psychology/experiments"));
  const phenomenaData = readMdxFiles(path.join(root, "content/psychology/phenomena"));

  const theoristSlugToId = new Map<string, string>();
  const allSlugs = new Set<string>();
  for (const t of theoristsData) {
    allSlugs.add(t.slug);
    theoristSlugToId.set(t.slug, `psychology:${t.slug}`);
  }
  for (const e of experimentsData) {
    allSlugs.add(e.slug);
  }
  for (const p of phenomenaData) {
    allSlugs.add(p.slug);
  }

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seenEdges = new Set<string>();

  function addEdge(source: string, target: string, type: GraphEdge["type"], label?: string): void {
    if (source === target) return;
    const key = normalizeEdgeKey(source, target);
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ source, target, type, label });
  }

  for (const t of theoristsData) {
    nodes.push({
      id: `psychology:${t.slug}`,
      label: t.frontmatter.title as string,
      domain: "psychology",
      type: "theorist",
      slug: t.slug,
      era: t.frontmatter.era as string | undefined,
      tags: (t.frontmatter.tags as string[]) ?? [],
      description: extractDescription(t.content),
    });
  }

  for (const e of experimentsData) {
    nodes.push({
      id: `psychology:${e.slug}`,
      label: e.frontmatter.title as string,
      domain: "psychology",
      type: "experiment",
      slug: e.slug,
      year: e.frontmatter.year as number | undefined,
      tags: (e.frontmatter.tags as string[]) ?? [],
      description: extractDescription(e.content),
    });
  }

  for (const p of phenomenaData) {
    nodes.push({
      id: phenomenonGraphId(p.slug),
      label: p.frontmatter.title as string,
      domain: "psychology",
      type: "phenomenon",
      slug: p.slug,
      tags: (p.frontmatter.tags as string[]) ?? [],
      description: extractDescription(p.content),
    });
  }

  const macroPsychologyNodes: GraphNode[] = [
    {
      id: "psychology:inflation-psychology",
      label: "通胀心理",
      domain: "psychology",
      type: "phenomenon",
      slug: "inflation-psychology",
      section: "knowledge-base",
      url: "/psychology/knowledge-base/inflation-psychology",
      tags: ["通胀", "预期", "损失厌恶", "消费者信心"],
      description: "解释价格记忆、公平感、通胀预期和政治归因如何影响经济行为。",
    },
    {
      id: "psychology:risk-perception-and-macro-decisions",
      label: "风险感知与宏观决策",
      domain: "psychology",
      type: "phenomenon",
      slug: "risk-perception-and-macro-decisions",
      section: "knowledge-base",
      url: "/psychology/knowledge-base/risk-perception-and-macro-decisions",
      tags: ["风险感知", "不确定性", "消费者信心", "金融行为"],
      description: "把可得性、损失厌恶和控制感接入消费、投资和金融市场波动。",
    },
    {
      id: "psychology:political-polarization-psychology",
      label: "政治极化心理",
      domain: "psychology",
      type: "phenomenon",
      slug: "political-polarization-psychology",
      section: "knowledge-base",
      url: "/psychology/knowledge-base/political-polarization-psychology",
      tags: ["政治极化", "群体身份", "确认偏误", "情绪"],
      description: "分析情感极化、身份威胁、动机性推理和宏观压力之间的关系。",
    },
    {
      id: "psychology:inflation-expectations-and-trust",
      label: "通胀预期与信任",
      domain: "psychology",
      type: "phenomenon",
      slug: "inflation-expectations-and-trust",
      section: "knowledge-base",
      url: "/psychology/knowledge-base/inflation-expectations-and-trust",
      tags: ["通胀预期", "信任", "央行沟通", "消费者信心"],
      description: "解释公众信任、价格记忆和政策沟通如何共同锚定或扰动通胀预期。",
    },
    {
      id: "psychology:political-psychology-of-fiscal-austerity",
      label: "财政紧缩的政治心理",
      domain: "psychology",
      type: "phenomenon",
      slug: "political-psychology-of-fiscal-austerity",
      section: "knowledge-base",
      url: "/psychology/knowledge-base/political-psychology-of-fiscal-austerity",
      tags: ["财政紧缩", "信任", "损失厌恶", "分配冲突"],
      description: "把财政调整中的损失厌恶、公平感、信任和政治稳定风险连接起来。",
    },
  ];
  nodes.push(...macroPsychologyNodes);
  nodes.push(...PSYCHOLOGY_METHOD_NODES);
  nodes.push(...PSYCHOLOGY_COVERAGE_NODES);
  for (const edge of PSYCHOLOGY_METHOD_EDGES) {
    addEdge(edge.source, edge.target, edge.type, edge.label);
  }
  for (const edge of PSYCHOLOGY_COVERAGE_EDGES) {
    addEdge(edge.source, edge.target, edge.type, edge.label);
  }
  addEdge(
    "psychology:inflation-expectations-and-trust",
    "psychology:inflation-psychology",
    "cross-reference",
    "预期锚定"
  );
  addEdge(
    "psychology:inflation-expectations-and-trust",
    "psychology:risk-perception-and-macro-decisions",
    "cross-reference",
    "信任与不确定性"
  );
  addEdge(
    "psychology:political-psychology-of-fiscal-austerity",
    "psychology:risk-perception-and-macro-decisions",
    "cross-reference",
    "安全感"
  );
  addEdge(
    "psychology:political-psychology-of-fiscal-austerity",
    "psychology:political-polarization-psychology",
    "cross-reference",
    "分配归因"
  );
  addEdge(
    "psychology:inflation-psychology",
    "psychology:framing-effect",
    "cross-reference",
    "价格框架"
  );
  addEdge(
    "psychology:risk-perception-and-macro-decisions",
    "psychology:availability-heuristic",
    "cross-reference",
    "可得性启发"
  );
  addEdge(
    "psychology:political-polarization-psychology",
    "psychology:social-identity",
    "cross-reference",
    "群体身份"
  );
  addEdge(
    "psychology:inflation-psychology",
    "economics:modern-money-fiscal-deficits",
    "domain-link",
    "通胀预期"
  );
  addEdge(
    "psychology:risk-perception-and-macro-decisions",
    "economics:country-macro-diagnostics-forecasting",
    "domain-link",
    "信心与情景分析"
  );
  addEdge(
    "psychology:political-polarization-psychology",
    "political-science:budget-governance",
    "domain-link",
    "预算冲突心理"
  );
  addEdge(
    "psychology:inflation-expectations-and-trust",
    "political-science:central-bank-communication-public-understanding",
    "domain-link",
    "公众信任"
  );
  addEdge(
    "psychology:political-psychology-of-fiscal-austerity",
    "political-science:budget-governance",
    "domain-link",
    "紧缩合法性"
  );

  for (const t of theoristsData) {
    const id = `psychology:${t.slug}`;
    for (const ref of (t.frontmatter.related as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(id, `psychology:${ref}`, "cross-reference");
      }
    }
  }

  for (const e of experimentsData) {
    const expId = `psychology:${e.slug}`;
    for (const ref of (e.frontmatter.relatedTheorists as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(expId, `psychology:${ref}`, "hierarchy", "研究者");
      }
    }
    for (const ref of (e.frontmatter.related as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(expId, `psychology:${ref}`, "hierarchy", "研究者");
      }
    }
  }

  for (const p of phenomenaData) {
    const phenId = phenomenonGraphId(p.slug);
    for (const ref of (p.frontmatter.relatedTheorists as string[]) ?? []) {
      if (theoristSlugToId.has(ref)) {
        addEdge(phenId, `psychology:${ref}`, "cross-reference", "研究者");
      }
    }
    for (const ref of (p.frontmatter.relatedExperiments as string[]) ?? []) {
      if (allSlugs.has(ref)) {
        addEdge(phenId, `psychology:${ref}`, "cross-reference", "相关实验");
      }
    }
  }

  const eraGroups = new Map<string, string[]>();
  for (const t of theoristsData) {
    const era = t.frontmatter.era as string | undefined;
    if (!era) continue;
    if (!eraGroups.has(era)) eraGroups.set(era, []);
    eraGroups.get(era)!.push(t.slug);
  }
  for (const slugs of eraGroups.values()) {
    slugs.sort();
    for (let i = 0; i < slugs.length - 1; i++) {
      addEdge(`psychology:${slugs[i]!}`, `psychology:${slugs[i + 1]!}`, "temporal", "同时代");
    }
  }

  return { nodes, edges };
}

const graph = buildPsychologyGraph();
export const psychologyNodes: GraphNode[] = graph.nodes;
export const psychologyEdges: GraphEdge[] = graph.edges;
