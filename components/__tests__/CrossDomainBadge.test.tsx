// @vitest-environment happy-dom
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { GroupedBacklinks } from "@/lib/backlinks";

// The badge must follow the generated-index grouping, not the live index
// itself — content edits elsewhere would otherwise break this test.
const groupBacklinks = vi.fn<(url: string) => GroupedBacklinks>();
vi.mock("@/lib/backlinks", () => ({
  groupBacklinks: (url: string) => groupBacklinks(url),
}));

import { CrossDomainBadge } from "../CrossDomainBadge";

afterEach(() => {
  cleanup();
  groupBacklinks.mockReset();
});

function grouped(crossDomain: GroupedBacklinks["crossDomain"]): GroupedBacklinks {
  return {
    sameDomain: [],
    crossDomain,
    total: crossDomain.reduce((n, d) => n + d.links.length, 0),
  };
}

function group(domain: string, label: string, count: number) {
  return {
    domain,
    label,
    links: Array.from({ length: count }, (_, i) => ({
      url: `/${domain}/x/${i}`,
      title: `${label} ${i}`,
    })),
  };
}

describe("CrossDomainBadge", () => {
  it("renders nothing when no other domain references the article", () => {
    groupBacklinks.mockReturnValue(grouped([]));
    const { container } = render(<CrossDomainBadge url="/chemistry/concepts/x" />);
    expect(container.firstChild).toBeNull();
  });

  it("shows the referencing-domain count and their names", () => {
    groupBacklinks.mockReturnValue(
      grouped([group("earth-science", "地球科学", 2), group("medicine", "医学与公共卫生", 1)])
    );
    render(<CrossDomainBadge url="/chemistry/concepts/x" />);
    expect(screen.getByText(/被 2 个领域引用/)).toBeTruthy();
    expect(screen.getByText("（地球科学、医学与公共卫生）")).toBeTruthy();
  });

  it("caps the accent dots while the count text stays exact", () => {
    groupBacklinks.mockReturnValue(
      grouped([
        group("earth-science", "地球科学", 1),
        group("medicine", "医学与公共卫生", 1),
        group("physics", "宇宙物理", 1),
        group("cosmology", "宇宙学", 1),
        group("mathematics", "数学", 1),
        group("economics", "经济学", 1),
      ])
    );
    const { container } = render(<CrossDomainBadge url="/chemistry/concepts/x" />);
    expect(screen.getByText(/被 6 个领域引用/)).toBeTruthy();
    expect(container.querySelectorAll("[aria-hidden] > span")).toHaveLength(5);
  });
});
