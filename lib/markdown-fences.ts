export type MarkdownSegment = { text: string; fenced: boolean };

/** A fence may contain shorter runs or backticks in its literal body. */
export function fenceOpening(line: string): { mark: string; length: number; info: string } | null {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
  if (!match || (match[1]![0] === "`" && match[2]!.includes("`"))) return null;
  return { mark: match[1]![0]!, length: match[1]!.length, info: match[2]!.trim() };
}

function closesFence(line: string, fence: NonNullable<ReturnType<typeof fenceOpening>>): boolean {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})\s*$/);
  return Boolean(match && match[1]![0] === fence.mark && match[1]!.length >= fence.length);
}

/** Share literal boundaries between block parsing and footnote extraction. */
export function splitMarkdownFences(content: string): MarkdownSegment[] {
  const segments: MarkdownSegment[] = [];
  let lines: string[] = [];
  let fence: ReturnType<typeof fenceOpening> = null;
  for (const line of content.split("\n")) {
    if (fence) {
      lines.push(line);
      if (closesFence(line, fence)) {
        segments.push({ text: lines.join("\n"), fenced: true });
        lines = [];
        fence = null;
      }
    } else {
      fence = fenceOpening(line);
      if (fence && lines.length) {
        segments.push({ text: lines.join("\n"), fenced: false });
        lines = [];
      }
      lines.push(line);
    }
  }
  if (lines.length) segments.push({ text: lines.join("\n"), fenced: fence !== null });
  return segments;
}

export function fencedCode(text: string): { language: string; code: string } | null {
  const lines = text.split("\n");
  const opening = fenceOpening(lines[0] ?? "");
  if (!opening) return null;
  const closed = lines.length > 1 && closesFence(lines.at(-1)!, opening);
  return { language: opening.info, code: lines.slice(1, closed ? -1 : undefined).join("\n") };
}
