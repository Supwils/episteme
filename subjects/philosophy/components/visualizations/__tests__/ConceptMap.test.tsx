// @vitest-environment happy-dom
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConceptMap } from "../ConceptMap";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/use-prefers-reduced-motion", () => ({
  usePrefersReducedMotion: () => true,
}));

function nodeGroup(): SVGGElement {
  const node = document.querySelector("[data-node]");
  if (!(node instanceof SVGGElement)) throw new Error("concept node missing");
  return node;
}

afterEach(cleanup);

describe("ConceptMap drag cursor", () => {
  it("returns the node cursor to grab after the pointer is released", () => {
    if (typeof ResizeObserver === "undefined") {
      vi.stubGlobal(
        "ResizeObserver",
        class {
          observe() {}
          disconnect() {}
        }
      );
    }
    render(<ConceptMap />);
    expect(nodeGroup().style.cursor).toBe("grab");

    fireEvent.pointerDown(nodeGroup(), { clientX: 20, clientY: 20, pointerId: 1 });
    expect(nodeGroup().style.cursor).toBe("grabbing");

    fireEvent.pointerUp(nodeGroup().ownerSVGElement!);
    expect(nodeGroup().style.cursor).toBe("grab");
  });

  it("selects a tapped node and leaves a dragged node unselected", () => {
    if (typeof ResizeObserver === "undefined") {
      vi.stubGlobal(
        "ResizeObserver",
        class {
          observe() {}
          disconnect() {}
        }
      );
    }
    const { unmount } = render(<ConceptMap />);
    const svg = nodeGroup().ownerSVGElement!;
    fireEvent.pointerDown(nodeGroup(), { clientX: 20, clientY: 20, pointerId: 1 });
    fireEvent.pointerMove(svg, { clientX: 90, clientY: 90, pointerId: 1 });
    fireEvent.pointerUp(svg);
    fireEvent.click(nodeGroup());
    expect(document.body.textContent?.includes("查看详情")).toBe(false);

    unmount();
    render(<ConceptMap />);
    fireEvent.pointerDown(nodeGroup(), { clientX: 20, clientY: 20, pointerId: 1 });
    fireEvent.pointerUp(nodeGroup().ownerSVGElement!);
    fireEvent.click(nodeGroup());
    expect(document.body.textContent?.includes("查看详情")).toBe(true);
  });
});
