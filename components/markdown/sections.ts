/**
 * 段型识别（T-DESIGN-06d）：把正文按二级标题切成段，再按标题认出语料里反复出现的
 * 结构（破除误解、事实卡、关键洞察……），交给专门的组件渲染。只读标题，
 * 从不改写内容；认不出的段一律按普通叙事渲染。
 */
import { parseHeadingLine } from "@/lib/markdown-heading";
import { DISCLAIMER } from "@/lib/article-discovery";

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
  return KIND_BY_TITLE[bare] ?? "narrative";
}

/** Blank lines inside a ``` fence belong to the fence, not the paragraph grid. */
function joinFences(chunks: string[]): string[] {
  const joined: string[] = [];
  let open: string[] | null = null;
  for (const chunk of chunks) {
    if (open) {
      open.push(chunk);
    } else if (chunk.trimStart().startsWith("```")) {
      open = [chunk];
    } else {
      joined.push(chunk);
      continue;
    }
    const fenceLines = open
      .join("\n\n")
      .split("\n")
      .filter((line) => line.trimStart().startsWith("```"));
    if (fenceLines.length >= 2) {
      joined.push(open.join("\n\n"));
      open = null;
    }
  }
  if (open) joined.push(open.join("\n\n"));
  return joined;
}

/** The corpus separates blocks with blank lines; footnote definitions live elsewhere. */
export function splitBlocks(content: string): string[] {
  return joinFences(content.split("\n\n"))
    .map((block) =>
      block.startsWith("```")
        ? block.trim()
        : block
            .split("\n")
            .filter((line) => !/^\[\^[^\]]+\]:/.test(line.trim()))
            .join("\n")
            .trim()
    )
    .filter(Boolean)
    .flatMap((block) => {
      // A heading glued to the text under it (no blank line) is still a heading.
      const newline = block.indexOf("\n");
      return newline > 0 && /^#{1,4} /.test(block)
        ? [block.slice(0, newline), block.slice(newline + 1).trim()].filter(Boolean)
        : [block];
    });
}

function headingOf(block: string): Heading | null {
  // `# ` (demoted to h2) and `## ` open a section; `###` and below stay inside it.
  const match = block.match(/^#{1,2} (.+)$/);
  if (!match || block.includes("\n")) return null;
  return parseHeadingLine(match[1]!.trim());
}

/**
 * Splits prose into sections. A leading `# 标题` block is dropped — the page
 * shell owns the document h1. Blocks are otherwise kept verbatim and in order.
 */
export function splitSections(content: string): Section[] {
  const blocks = splitBlocks(content);
  if (blocks[0]?.startsWith("# ") && !blocks[0].includes("\n")) blocks.shift();

  const sections: Section[] = [{ heading: null, kind: "narrative", blocks: [] }];
  let insightSeen = false;
  for (const block of blocks) {
    const heading = headingOf(block);
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

export type Myth = { claim: string | null; rest: string };

const MYTH_OPENING = /^(第[一二三四五六七八九十\d]+个?(常见)?误解|误解[一二三四五六七八九十\d]+)/;
// A first sentence is only struck through when it states the misconception.
const STATES_MISCONCEPTION = /误解|误区|以为|常被|流行的说法|很多人|人们常/;

function firstSentence(paragraph: string): [string, string] {
  const match = paragraph.match(/^[\s\S]*?[。！？](?=[^」』”）)]|$)/);
  if (!match) return [paragraph, ""];
  return [match[0], paragraph.slice(match[0].length).trim()];
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

  for (const block of blocks) {
    if (isParagraph(block) && DISCLAIMER.test(block) && block.length < 160) {
      notes.push(block);
    } else if (isParagraph(block) && MYTH_OPENING.test(block)) {
      const [claim, rest] = firstSentence(block);
      myths.push({ claim, rest });
    } else if (myths.length === 0) {
      intro.push(block);
    } else {
      after.push(block);
    }
  }

  // No numbered myths: one card, striking the opening sentence only when it
  // really states the misconception.
  if (myths.length === 0) {
    const index = intro.findIndex(isParagraph);
    if (index >= 0) {
      const [claim, rest] = firstSentence(intro[index]!);
      const struck = STATES_MISCONCEPTION.test(claim);
      myths.push({ claim: struck ? claim : null, rest: struck ? rest : intro[index]! });
      after.push(...intro.splice(index + 1));
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
