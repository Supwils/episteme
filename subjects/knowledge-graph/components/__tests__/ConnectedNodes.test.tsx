// @vitest-environment happy-dom
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { GraphNode } from "../../data/types";

// Reveal animates via framer-motion; the tag logic under test doesn't.
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, variants: _variants, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

import { ConnectedNodes } from "../detail-panel/ConnectedNodes";

afterEach(cleanup);

function node(id: string, domain: GraphNode["domain"]): GraphNode {
  return { id, label: id, domain, type: "concept", slug: id, tags: [], description: "" };
}

const baseProps = {
  nodeId: "self",
  edges: [],
  prerequisiteIds: [],
  onNodeClick: () => {},
};

describe("ConnectedNodes cross-domain tags", () => {
  it("tags neighbours from other domains and counts them in the heading", () => {
    render(
      <ConnectedNodes
        {...baseProps}
        nodeDomain="chemistry"
        nodes={[node("a", "chemistry"), node("b", "earth-science"), node("c", "medicine")]}
      />
    );
    expect(screen.getByText(/2 条跨域/)).toBeTruthy();
    expect(screen.getAllByText("跨域")).toHaveLength(2);
  });

  it("stays silent when every neighbour is in the same domain", () => {
    render(
      <ConnectedNodes
        {...baseProps}
        nodeDomain="chemistry"
        nodes={[node("a", "chemistry"), node("b", "chemistry")]}
      />
    );
    expect(screen.queryByText("跨域")).toBeNull();
    expect(screen.queryByText(/条跨域/)).toBeNull();
  });
});
