/**
 * 段型识别（T-DESIGN-06d）：把正文按二级标题切成段，再按标题认出语料里反复出现的
 * 结构（破除误解、事实卡、关键洞察……），交给专门的组件渲染。只读标题，
 * 从不改写内容；认不出的段一律按普通叙事渲染。
 */
import { parseHeadingLine, takeHeadingId } from "@/lib/markdown-heading";
import { DISCLAIMER } from "@/lib/article-discovery";
import { splitMarkdownFences } from "@/lib/markdown-fences";

export type SectionKind =
  | "narrative"
  | "misconception"
  | "facts"
  | "insight"
  | "quotes"
  | "cross-domain"
  | "references"
  | "keywords";

export type Heading = { text: string; id: string };

export type Section = {
  heading: Heading | null;
  kind: SectionKind;
  blocks: string[];
};

// Exact titles only (after stripping a 「第N页 · 」 page prefix), so a narrative
// heading that merely contains one of these words is never restyled.
const KIND_BY_TITLE: Record<string, SectionKind> = {
  破除误解: "misconception",
  打破一个常见误解: "misconception",
  常见误区: "misconception",
  常见误解: "misconception",
  事实卡: "facts",
  核心事实卡: "facts",
  关键洞察: "insight",
  经典名言: "quotes",
  引用: "quotes",
  原典引文: "quotes",
  跨域连接: "cross-domain",
  参考文献: "references",
  延伸阅读: "references",
  学术文献: "references",
  关键词: "keywords",
};

export function sectionKind(title: string): SectionKind {
  const bare = title.replace(/^第\s*\d+\s*页\s*·\s*/, "").trim();
  return Object.hasOwn(KIND_BY_TITLE, bare) ? KIND_BY_TITLE[bare]! : "narrative";
}

/**
 * Footnote ids are any run without `]` or whitespace: the corpus cites
 * `[^1]`, `[^fpp]` and `[^katrin-2022]`. Definitions and references share it,
 * so a definition is never dropped while its references stay raw.
 */
export const FOOTNOTE_ID = String.raw`[^\]\s]+`;
const FOOTNOTE_DEFINITION_LINE = new RegExp(String.raw`^\[\^${FOOTNOTE_ID}\]:`);

const HEADING_LINE = /^#{1,4} /;
export const LIST_ITEM_LINE = /^\s*(?:[-*]|\d+\.)\s/;

/** Fences are already isolated; paired display-math delimiters protect their lines. */
function togglesVerbatim(line: string): boolean {
  return (line.match(/\$\$/g)?.length ?? 0) % 2 === 1;
}

/**
 * Authors sometimes omit the blank line before a heading or a list. CommonMark
 * still starts a new block there, so a glued `## 参考文献` or `- 条目` must not
 * collapse into the paragraph above. Lines inside a formula or fence are verbatim.
 */
function splitGluedBlock(block: string): string[] {
  const groups: string[][] = [[]];
  let verbatim = false;
  let afterHeading = false;
  for (const line of block.split("\n")) {
    const current = groups.at(-1)!;
    if (!verbatim && current.length > 0) {
      const heading = HEADING_LINE.test(line);
      const listStart = LIST_ITEM_LINE.test(line) && !LIST_ITEM_LINE.test(current[0]!);
      if (heading || afterHeading || listStart) groups.push([]);
    }
    groups.at(-1)!.push(line);
    afterHeading = !verbatim && HEADING_LINE.test(line);
    if (togglesVerbatim(line)) verbatim = !verbatim;
  }
  return groups.map((lines) => lines.join("\n").trim()).filter(Boolean);
}

/** The corpus separates blocks with blank lines; footnote definitions live elsewhere. */
export function splitBlocks(content: string): string[] {
  return splitMarkdownFences(content).flatMap(({ text, fenced }) => {
    if (fenced) return [text.trim()];
    return text
      .split("\n\n")
      .map((block) =>
        block
          .split("\n")
          .filter((line) => !FOOTNOTE_DEFINITION_LINE.test(line.trim()))
          .join("\n")
          .trim()
      )
      .filter(Boolean)
      .flatMap(splitGluedBlock);
  });
}

function headingOf(block: string, used: Set<string>): Heading | null {
  // `# ` (demoted to h2) and `## ` open a section; `###` and below stay inside it.
  const match = block.match(/^#{1,2} (.+)$/);
  if (!match || block.includes("\n")) return null;
  const parsed = parseHeadingLine(match[1]!.trim());
  return { text: parsed.text, id: takeHeadingId(parsed.id, used) };
}

/**
 * Splits prose into sections. A leading `# 标题` block is dropped — the page
 * shell owns the document h1. Blocks are otherwise kept verbatim and in order.
 */
export function splitSections(content: string, usedHeadingIds: Set<string> = new Set()): Section[] {
  const blocks = splitBlocks(content);
  if (blocks[0]?.startsWith("# ") && !blocks[0].includes("\n")) blocks.shift();

  const sections: Section[] = [{ heading: null, kind: "narrative", blocks: [] }];
  let insightSeen = false;
  for (const block of blocks) {
    const heading = headingOf(block, usedHeadingIds);
    if (!heading) {
      sections.at(-1)!.blocks.push(block);
      continue;
    }
    let kind = sectionKind(heading.text);
    // One insight plate per article: it is the page's most prominent element.
    if (kind === "insight") {
      if (insightSeen) kind = "narrative";
      insightSeen = true;
    }
    sections.push({ heading, kind, blocks: [] });
  }
  return sections.filter((section) => section.heading || section.blocks.length > 0);
}

/** `more` holds the fact's further blocks when a bold claim stands alone on its line. */
export type Myth = { claim: string | null; rest: string; more: string[] };

const MYTH_OPENING =
  /^\**(第[一二三四五六七八九十\d]+个?(常见)?误解|误解[一二三四五六七八九十\d]+)/;
// A first sentence is only struck through when it states the misconception.
const STATES_MISCONCEPTION = /误解|误区|以为|常被|流行的说法|很多人|人们常/;
const OPENING_BOLD = /^\*\*((?:(?!\*\*)[\s\S])+)\*\*([。！？]?)\s*([\s\S]*)$/;
const ENDS_SENTENCE = /[。！？][」』”"）)]*$/;

function firstSentence(paragraph: string): [string, string] {
  const match = paragraph.match(/^[\s\S]*?[。！？](?=[^」』”）)]|$)/);
  if (!match) return [paragraph, ""];
  return [match[0], paragraph.slice(match[0].length).trim()];
}

/**
 * `**误解一：……。**` (or `**……**。`) bolds the whole claim; cutting at the `。`
 * inside it would split the bold. A short bold label (`**误解一**：…`) is not
 * a sentence, so that paragraph is cut at its first sentence as usual.
 */
function splitClaim(paragraph: string): [string, string] {
  const bold = paragraph.match(OPENING_BOLD);
  if (!bold || !(bold[2] || ENDS_SENTENCE.test(bold[1]!))) return firstSentence(paragraph);
  return [bold[1]! + bold[2]!, bold[3]!.trim()];
}

/**
 * 破除误解段的结构：「第一个误解，……」各段成为一张卡；卡的首句是误解本身，
 * 其余是实情。免责声明单独拿出来，其余块原样保留在卡后。
 */
export function parseMisconceptions(blocks: string[]): {
  intro: string[];
  myths: Myth[];
  after: string[];
  notes: string[];
} {
  const intro: string[] = [];
  const myths: Myth[] = [];
  const after: string[] = [];
  const notes: string[] = [];
  const isParagraph = (block: string) => !/^([#>|!-]|\d+\.|```)/.test(block);
  // A bold claim alone on its line takes the blocks under it as its fact,
  // up to the next claim, sub-heading or rule.
  let collecting: Myth | null = null;

  for (const block of blocks) {
    if (isParagraph(block) && DISCLAIMER.test(block) && block.length < 160) {
      notes.push(block);
    } else if (isParagraph(block) && MYTH_OPENING.test(block)) {
      const [claim, rest] = splitClaim(block);
      const myth: Myth = { claim, rest, more: [] };
      myths.push(myth);
      collecting = rest || !block.startsWith("**") ? null : myth;
    } else if (collecting && !/^(#|---)/.test(block)) {
      if (!collecting.rest && isParagraph(block)) collecting.rest = block;
      else collecting.more.push(block);
    } else {
      collecting = null;
      (myths.length === 0 ? intro : after).push(block);
    }
  }

  // No numbered myths: one card, striking the opening sentence only when it
  // really states the misconception.
  if (myths.length === 0) {
    const index = intro.findIndex(isParagraph);
    if (index >= 0) {
      const [claim, rest] = splitClaim(intro[index]!);
      const struck = STATES_MISCONCEPTION.test(claim);
      const following = intro.splice(index + 1);
      // A bold claim alone on its line is answered by the paragraph under it.
      const fact =
        struck && !rest && following[0] && isParagraph(following[0]) ? following.shift()! : rest;
      myths.push({ claim: struck ? claim : null, rest: struck ? fact : intro[index]!, more: [] });
      after.push(...following);
      intro.splice(index, 1);
    }
  }
  return { intro, myths, after, notes };
}

export type FactCard = { label: string | null; text: string };

/** 「- **卡1**：……」→ 编号与正文；没有编号的列表项也各成一张卡。 */
export function parseFactCards(block: string): FactCard[] | null {
  const lines = block.split("\n");
  if (!lines.every((line) => /^[-*]\s|^\d+\.\s/.test(line))) return null;
  return lines.map((line) => {
    const item = line.replace(/^([-*]|\d+\.)\s+/, "");
    const labelled = item.match(/^\*\*([^*]{1,12})\*\*[：:]\s*([\s\S]+)$/);
    return labelled ? { label: labelled[1]!, text: labelled[2]! } : { label: null, text: item };
  });
}

export type Quote = { text: string; source: string | null };

/** `> 「……」——《书》` → 引文与出处。 */
export function parseQuote(block: string): Quote | null {
  if (!block.startsWith(">")) return null;
  const text = block
    .split("\n")
    .map((line) => line.replace(/^>\s?/, ""))
    .join(" ")
    .trim();
  const split = text.match(/^([\s\S]+?)\s*(?:——|—|－－)\s*([^「」"“”]+)$/);
  if (!split) return { text, source: null };
  return { text: split[1]!.trim(), source: split[2]!.trim() };
}

export type Neighbor = { target: string; label: string };

/** 跨域连接列表项开头的 `[[slug|名称]]`（可包在 ** 里）。 */
export function parseNeighbors(blocks: string[]): Neighbor[] {
  const neighbors: Neighbor[] = [];
  for (const block of blocks) {
    for (const line of block.split("\n")) {
      const match = line.match(/^[-*]\s+\**\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
      if (match)
        neighbors.push({ target: match[1]!.trim(), label: (match[2] ?? match[1])!.trim() });
    }
  }
  return neighbors;
}

/** 「甲; 乙；丙、丁」→ 词表。 */
export function parseKeywords(blocks: string[]): string[] | null {
  if (blocks.length !== 1 || /^[#>|!-]/.test(blocks[0]!)) return null;
  const terms = blocks[0]!
    .split(/[;；、,，]\s*/)
    .map((term) => term.trim())
    .filter(Boolean);
  return terms.length >= 2 && terms.every((term) => term.length <= 24) ? terms : null;
}
