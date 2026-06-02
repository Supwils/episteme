interface MarkdownRendererProps {
  content: string;
  accentColor?: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  accentColor = "#c8a45a",
  className,
}: MarkdownRendererProps) {
  return (
    <div className={className ?? "prose prose-invert max-w-none"}>
      {content.split("\n\n").map((para, i) => {
        const text = para.trim();
        if (!text) return null;

        if (text.startsWith("# ")) {
          return (
            <h1
              key={i}
              className="font-display text-fg-primary mb-4 mt-10 text-[1.6rem] font-semibold leading-tight first:mt-0"
            >
              {text.slice(2)}
            </h1>
          );
        }
        if (text.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-display mt-8 mb-3 text-[1.25rem] font-semibold leading-snug"
              style={{ color: accentColor }}
            >
              {text.slice(3)}
            </h2>
          );
        }
        if (text.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="font-display text-fg-primary mt-6 mb-2 text-lg font-semibold"
            >
              {text.slice(4)}
            </h3>
          );
        }
        if (text.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="my-6 border-l-3 py-3 pl-5"
              style={{
                borderColor: accentColor,
                background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
              }}
            >
              <p className="font-display text-fg-primary text-lg italic leading-relaxed">
                {renderInline(text.slice(2))}
              </p>
            </blockquote>
          );
        }
        if (text.startsWith("| ")) {
          const rows = text.split("\n").filter((r) => !r.match(/^\|[\s-|]+\|$/));
          return (
            <div key={i} className="my-5 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {rows.map((row, ri) => {
                    const cells = row
                      .split("|")
                      .filter(Boolean)
                      .map((c) => c.trim());
                    return (
                      <tr key={ri} className="border-border-faint border-b">
                        {cells.map((cell, ci) =>
                          ri === 0 ? (
                            <th
                              key={ci}
                              className="text-fg-primary px-3 py-2.5 text-left font-semibold"
                            >
                              {renderInline(cell)}
                            </th>
                          ) : (
                            <td key={ci} className="text-fg-secondary px-3 py-2.5">
                              {renderInline(cell)}
                            </td>
                          ),
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        if (text.startsWith("---")) {
          return (
            <div key={i} className="my-10 flex items-center gap-3" aria-hidden>
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, transparent, ${accentColor}40)`,
                }}
              />
              <span
                className="h-1.5 w-1.5 rotate-45"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to left, transparent, ${accentColor}40)`,
                }}
              />
            </div>
          );
        }
        if (text.startsWith("- ") || /^\d+\.\s/.test(text)) {
          const items = text.split("\n");
          const isOrdered = /^\d+\.\s/.test(items[0] ?? "");
          const Tag = isOrdered ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className="text-fg-secondary my-4 ml-5 space-y-1.5 text-[15px] leading-relaxed"
              style={{ listStyleType: isOrdered ? "decimal" : "disc" }}
            >
              {items.map((item, li) => (
                <li key={li} className="leading-relaxed">
                  {renderInline(item.replace(/^[-\d.]+\s*/, ""))}
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i} className="text-fg-secondary my-4 text-[15px] leading-[1.85]">
            {renderInline(text)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-fg-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
