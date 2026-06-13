export type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "h4"; text: string; id: string }
  | { type: "blockquote"; lines: string[] }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "divider" }
  | { type: "paragraph"; text: string };

export function parseContent(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.split("\n");
  let current: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let listOrdered = false;
  let inTable = false;
  let tableLines: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  function flushParagraph() {
    if (current.length > 0) {
      blocks.push({ type: "paragraph", text: current.join(" ") });
      current = [];
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems, ordered: listOrdered });
      listItems = [];
      inList = false;
    }
  }

  function flushBlockquote() {
    if (blockquoteLines.length > 0) {
      blocks.push({ type: "blockquote", lines: blockquoteLines });
      blockquoteLines = [];
      inBlockquote = false;
    }
  }

  function flushTable() {
    const firstLine = tableLines[0];
    if (firstLine && tableLines.length >= 2) {
      const header = firstLine
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      const rows = tableLines.slice(2).map((line) =>
        line
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean)
      );
      blocks.push({ type: "table", header, rows });
    }
    tableLines = [];
    inTable = false;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) flushList();
      if (inTable) flushTable();
      if (inBlockquote) flushBlockquote();
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (!inTable) {
        flushParagraph();
        flushList();
        if (inBlockquote) flushBlockquote();
        inTable = true;
      }
      tableLines.push(trimmed);
      continue;
    }
    if (inTable) flushTable();

    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      if (inBlockquote) flushBlockquote();
      blocks.push({ type: "h1", text: parseHeading(trimmed.slice(2)).text });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      if (inBlockquote) flushBlockquote();
      blocks.push({ type: "h2", ...parseHeading(trimmed.slice(3)) });
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      if (inBlockquote) flushBlockquote();
      blocks.push({ type: "h3", ...parseHeading(trimmed.slice(4)) });
      continue;
    }
    if (trimmed.startsWith("#### ")) {
      flushParagraph();
      flushList();
      if (inBlockquote) flushBlockquote();
      blocks.push({ type: "h4", ...parseHeading(trimmed.slice(5)) });
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      if (!inBlockquote) inBlockquote = true;
      blockquoteLines.push(trimmed.slice(2));
      continue;
    }
    if (trimmed === ">") {
      flushParagraph();
      flushList();
      if (!inBlockquote) inBlockquote = true;
      blockquoteLines.push("");
      continue;
    }
    if (inBlockquote) flushBlockquote();

    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      blocks.push({ type: "divider" });
      continue;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList || listOrdered) {
        flushList();
        flushParagraph();
        inList = true;
        listOrdered = false;
      }
      listItems.push(trimmed.slice(2));
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || !listOrdered) {
        flushList();
        flushParagraph();
        inList = true;
        listOrdered = true;
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    if (inList) flushList();
    current.push(trimmed);
  }

  flushParagraph();
  flushList();
  if (inTable) flushTable();
  if (inBlockquote) flushBlockquote();

  return blocks;
}

/**
 * Authors mark explicit anchors as `## 标题 {#anchor}` (a third of the thinker
 * corpus uses this); the suffix is metadata, never display text.
 */
function parseHeading(text: string): { text: string; id: string } {
  const match = text.match(/^(.*?)\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
  if (match) return { text: match[1]!.trim(), id: match[2]! };
  return { text, id: slugify(text) };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractH2Headings(blocks: Block[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is { type: "h2"; text: string; id: string } => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}

export type TocEntry = {
  id: string;
  text: string;
  children: { id: string; text: string }[];
};

export function extractToc(blocks: Block[]): TocEntry[] {
  const toc: TocEntry[] = [];
  let current: TocEntry | null = null;

  for (const b of blocks) {
    if (b.type === "h2") {
      current = { id: b.id, text: b.text, children: [] };
      toc.push(current);
    } else if (b.type === "h3" && current) {
      current.children.push({ id: b.id, text: b.text });
    }
  }

  return toc;
}
