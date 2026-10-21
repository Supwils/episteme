import { splitMarkdownFences } from "@/lib/markdown-fences";
import { FOOTNOTE_ID } from "./sections";

export type Footnotes = Map<string, string>;

const FOOTNOTE_DEF = new RegExp(String.raw`\[\^(${FOOTNOTE_ID})\]:\s*`, "g");

export function extractFootnotes(content: string): Footnotes {
  const footnotes = new Map<string, string>();
  const prose = splitMarkdownFences(content).filter((segment) => !segment.fenced);
  for (const rawLine of prose.flatMap((segment) => segment.text.split("\n"))) {
    const line = rawLine.trim();
    const marks = [...line.matchAll(FOOTNOTE_DEF)];
    const first = marks[0];
    if (!first || first.index !== 0) continue;
    for (let i = 0; i < marks.length; i++) {
      const mark = marks[i]!;
      const bodyStart = mark.index! + mark[0].length;
      const bodyEnd = i + 1 < marks.length ? marks[i + 1]!.index! : line.length;
      const body = line.slice(bodyStart, bodyEnd).trim();
      if (body) footnotes.set(mark[1]!, body);
    }
  }
  return footnotes;
}

export type FootnoteReference = { anchor: string; target: string };
type FootnoteAnchors = {
  references: Map<string, FootnoteReference[]>;
  definitions: Map<string, string>;
};

const articleAnchors = new WeakMap<Footnotes, FootnoteAnchors>();

function anchorsFor(footnotes: Footnotes): FootnoteAnchors {
  let anchors = articleAnchors.get(footnotes);
  if (!anchors) {
    anchors = { references: new Map(), definitions: new Map() };
    articleAnchors.set(footnotes, anchors);
  }
  return anchors;
}

/** Metadata is collected synchronously; IDs resolve after every heading is known. */
export function registerFootnoteReference(footnotes: Footnotes, id: string): FootnoteReference {
  const anchors = anchorsFor(footnotes);
  const references = anchors.references.get(id) ?? [];
  const reference = { anchor: "", target: "" };
  references.push(reference);
  anchors.references.set(id, references);
  return reference;
}

function takeFootnoteId(
  base: string,
  occupied: Set<string>,
  reserved: Set<string>,
  counters: Map<string, number>
): string {
  let index = counters.get(base) ?? 1;
  let id: string;
  do {
    id = index === 1 ? base : `${base}-${index}`;
    index += 1;
  } while (occupied.has(id) || (id !== base && reserved.has(id)));
  counters.set(base, index);
  occupied.add(id);
  return id;
}

/** Headings keep their public IDs; generated note IDs avoid the entire article. */
export function finalizeFootnoteAnchors(footnotes: Footnotes, headingIds: Set<string>): void {
  const anchors = anchorsFor(footnotes);
  const occupied = new Set(headingIds);
  const reserved = new Set(
    Array.from(footnotes.keys(), (id) => [
      `fn-${id}`.toWellFormed(),
      `fnref-${id}`.toWellFormed(),
    ]).flat()
  );
  const counters = new Map<string, number>();
  for (const id of footnotes.keys()) {
    anchors.definitions.set(
      id,
      takeFootnoteId(`fn-${id}`.toWellFormed(), occupied, reserved, counters)
    );
  }
  for (const [id, references] of anchors.references) {
    for (const reference of references) {
      reference.anchor = takeFootnoteId(`fnref-${id}`.toWellFormed(), occupied, reserved, counters);
      reference.target = anchors.definitions.get(id)!;
    }
  }
}

export function footnoteDefinitionAnchor(footnotes: Footnotes, id: string): string {
  return anchorsFor(footnotes).definitions.get(id)!;
}

export function footnoteFragment(id: string): string {
  return `#${encodeURIComponent(id)}`;
}

export function footnoteReturnAnchors(footnotes: Footnotes, id: string): readonly string[] {
  return (
    anchorsFor(footnotes)
      .references.get(id)
      ?.map((reference) => reference.anchor) ?? []
  );
}
