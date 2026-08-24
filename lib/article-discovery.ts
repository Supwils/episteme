import { extractH2Headings } from "@/lib/markdown-heading";

const APPARATUS = new Set(["参考文献", "延伸阅读", "跨域连接"]);

function stripMd(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")
    .replace(/\[\[[^\]]+\]\]/g, "")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function sectionBody(content: string, headingPrefix: string): string | null {
  const lines = content.split("\n");
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i]!.match(/^##\s+(.+)$/);
    if (!m) continue;
    const title = m[1]!.replace(/\s*\{#[A-Za-z0-9_-]+\}\s*$/, "").trim();
    if (title.startsWith(headingPrefix)) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return null;
  const body: string[] = [];
  for (let i = start; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]!)) break;
    body.push(lines[i]!);
  }
  return body.join("\n").trim() || null;
}

function pickInsightSentence(section: string): string | null {
  const paras = section
    .split(/\n\s*\n/)
    .map((p) => stripMd(p.replace(/\n/g, " ")))
    .filter((p) => p.length >= 24 && !p.startsWith("|") && !p.startsWith("-"));
  if (paras.length === 0) return null;

  const candidates = [...paras].reverse().flatMap((p) => sentences(p).reverse());
  for (const s of candidates) {
    if (s.length >= 24 && s.length <= 110) return s;
  }
  const first = sentences(paras[0]!)[0];
  if (first && first.length >= 24 && first.length <= 140) return first;
  return null;
}

/**
 * One-sentence "原来如此" for the article footer.
 * Prefers explicit frontmatter, then the 破除误解 section, else null (hide).
 */
export function deriveTakeaway(content: string, frontmatterInsight?: string): string | null {
  const explicit = frontmatterInsight?.trim();
  if (explicit && explicit.length >= 12) {
    return explicit.length > 140 ? `${explicit.slice(0, 139)}…` : explicit;
  }
  const myth = sectionBody(content, "破除误解");
  if (myth) {
    const pick = pickInsightSentence(myth);
    if (pick) return pick;
  }
  return null;
}

export interface AskPrompt {
  label: string;
  href: string;
}

/**
 * Static Socratic prompts that deep-link to real h2 anchors in the article.
 * Only returns prompts whose targets exist — never invents anchors.
 */
export function deriveAskPrompts(content: string): AskPrompt[] {
  const headings = extractH2Headings(content);
  const prompts: AskPrompt[] = [];

  const myth = headings.find((h) => h.text.startsWith("破除误解"));
  if (myth) {
    prompts.push({ label: "这篇在破除什么误解？", href: `#${myth.id}` });
  }

  const mechanism = headings.find((h) => {
    if (APPARATUS.has(h.text) || h.text.startsWith("破除误解")) return false;
    return /^(核心|增长|机制|原理|通胀|财政|认同|规范|霸权|制度|方法)/.test(h.text);
  });
  if (mechanism) {
    prompts.push({ label: "关键机制或规律是什么？", href: `#${mechanism.id}` });
  } else {
    const firstBody = headings.find(
      (h) => !APPARATUS.has(h.text) && !h.text.startsWith("破除误解") && !h.text.startsWith("代价")
    );
    if (firstBody) {
      prompts.push({ label: "往下看核心章节", href: `#${firstBody.id}` });
    }
  }

  const cross = headings.find((h) => h.text === "跨域连接" || h.text.startsWith("跨域连接"));
  if (cross) {
    prompts.push({ label: "和其他领域怎么连？", href: `#${cross.id}` });
  }

  return prompts;
}
