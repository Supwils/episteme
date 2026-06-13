import { Block } from "./content-parser";

function InlineFormatted({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-fg-primary font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="bg-bg-elevated text-accent-gold rounded px-1.5 py-0.5 font-mono text-[0.85em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const url = linkMatch[2] ?? "";
          const safeUrl =
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("/") ||
            url.startsWith("#")
              ? url
              : "#";
          return (
            <a
              key={i}
              href={safeUrl}
              className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h1":
      return (
        <h1 className="font-display text-fg-primary mt-10 mb-4 text-2xl leading-tight font-bold first:mt-0">
          <InlineFormatted text={block.text} />
        </h1>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="border-accent-gold/30 font-display text-fg-primary mt-10 mb-4 flex scroll-mt-24 items-center gap-3 border-l-3 pl-4 text-xl leading-snug font-semibold"
        >
          <InlineFormatted text={block.text} />
        </h2>
      );
    case "h3":
      return (
        <h3
          id={block.id}
          className="font-display text-fg-primary mt-8 mb-3 scroll-mt-24 text-lg leading-snug font-semibold"
        >
          <InlineFormatted text={block.text} />
        </h3>
      );
    case "h4":
      return (
        <h4
          id={block.id}
          className="font-display text-fg-primary mt-6 mb-2 scroll-mt-24 text-base leading-snug font-semibold"
        >
          <InlineFormatted text={block.text} />
        </h4>
      );
    case "blockquote":
      return (
        <blockquote className="border-accent-gold/20 bg-accent-gold/[0.03] my-6 border-l-2 py-4 pr-4 pl-6">
          {block.lines.map((line, i) =>
            line ? (
              <p key={i} className="font-display text-fg-primary text-base leading-relaxed italic">
                <InlineFormatted text={line} />
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </blockquote>
      );
    case "list":
      if (block.ordered) {
        return (
          <ol className="text-fg-secondary my-4 space-y-2 text-[0.93rem] leading-relaxed">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="font-mono text-[11px] tabular-nums"
                  style={{ color: "var(--color-accent-gold)" }}
                >
                  {i + 1}.
                </span>
                <span>
                  <InlineFormatted text={item} />
                </span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="text-fg-secondary my-4 space-y-2 text-[0.93rem] leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-accent-gold)" }}
              />
              <span>
                <InlineFormatted text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="border-border-faint my-6 overflow-x-auto border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-elevated">
                {block.header.map((h, i) => (
                  <th
                    key={i}
                    className="text-fg-primary border-border-faint border-b px-4 py-2.5 text-left font-mono text-[11px] font-semibold tracking-[0.12em] uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-border-faint hover:bg-bg-elevated/50 border-t transition-colors first:border-t-0"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="text-fg-secondary border-border-faint border-x px-4 py-2 text-[13px] leading-relaxed first:border-l-0 last:border-r-0"
                    >
                      <InlineFormatted text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "divider":
      return (
        <div className="my-8 flex items-center gap-4">
          <div className="border-border-subtle flex-1 border-t" />
          <span className="text-fg-disabled font-display text-xs italic">§</span>
          <div className="border-border-subtle flex-1 border-t" />
        </div>
      );
    case "paragraph":
      return (
        <p className="text-fg-secondary my-3 text-[0.93rem] leading-[1.85]">
          <InlineFormatted text={block.text} />
        </p>
      );
  }
}

export default function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </>
  );
}
