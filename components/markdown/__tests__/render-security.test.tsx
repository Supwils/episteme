import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownImage } from "@/components/markdown/image";
import { renderInline } from "@/components/markdown/inline";

function html(nodes: ReactNode): string {
  return renderToStaticMarkup(<>{nodes}</>);
}

describe("markdown link and image boundaries", () => {
  it("drops script and data destinations instead of emitting them", () => {
    const link = html(renderInline("[打开](javascript:alert(1))", new Map(), "philosophy"));
    expect(link).not.toContain("<a");
    expect(link).toContain("打开");

    const image = renderToStaticMarkup(
      <MarkdownImage src="data:text/html,<script>alert(1)</script>" alt="图" />
    );
    expect(image).toBe("");
  });

  it("keeps a DOI on doi.org when the identifier contains markup", () => {
    const rendered = html(
      renderInline('DOI: 10.1000/foo"><img src=x onerror=alert(1)>', new Map(), "philosophy")
    );
    expect(rendered).not.toContain("<img");
    expect(rendered).toContain('href="https://doi.org/10.1000/foo');
    expect(rendered).toContain("&quot;");
  });
});
