// @vitest-environment happy-dom
import type { AnchorHTMLAttributes } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchResults } from "../SearchResults";
import type { SearchResult } from "../types";

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));
afterEach(cleanup);

const curiosity = (title: string): SearchResult => ({
  title,
  subtitle: "",
  url: "/curiosities",
  section: "physics",
  kind: "curiosity",
});

describe("SearchResults", () => {
  it("gives rows that share a URL and kind their own id and active state", () => {
    const results = [curiosity("黑洞会蒸发"), curiosity("黑洞没有毛")];
    render(
      <SearchResults
        query="黑洞"
        titleResults={results}
        bodyResults={[]}
        flatResults={results}
        activeIndex={0}
        onActivate={() => {}}
        onSelect={() => {}}
      />
    );
    const options = screen.getAllByRole("option");
    expect(options.map((option) => option.id)).toEqual(["gs-item-0", "gs-item-1"]);
    expect(options.map((option) => option.getAttribute("data-active"))).toEqual(["true", "false"]);
  });
});
