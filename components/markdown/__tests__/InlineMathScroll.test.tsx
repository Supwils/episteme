// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InlineMathScroll } from "../InlineMathScroll";

let update: () => void;
const observe = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  observe.mockClear();
  disconnect.mockClear();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        update = callback;
      }
      observe = observe;
      disconnect = disconnect;
    }
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement
  ) {
    return DOMRect.fromRect({ width: Number(this.dataset.extent ?? 0), height: 20 });
  });
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (
    this: HTMLElement
  ) {
    return Number(this.dataset.width ?? 0);
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function Prose({ width = 272, extent = 452 } = {}) {
  return (
    <div data-width={width} style={{ padding: 0 }}>
      <span className="md-math-inline" tabIndex={0}>
        <span className="katex" data-extent="30">
          x
        </span>
      </span>
      <span className="md-math-inline" tabIndex={0}>
        <span className="katex" data-extent={extent}>
          <span className="base">long formula</span>
        </span>
      </span>
      <InlineMathScroll />
    </div>
  );
}

describe("inline math keyboard access", () => {
  it("keeps only overflowing formulas in the tab sequence", () => {
    const { container } = render(<Prose />);
    const [short, long] = container.querySelectorAll<HTMLElement>(".md-math-inline");
    expect(short!.hasAttribute("tabindex")).toBe(false);
    expect(long!.tabIndex).toBe(0);
    expect(long!.getAttribute("aria-description")).toContain("左右方向键");
    expect(observe).toHaveBeenCalledWith(long!.querySelector(".base"));
  });

  it("updates keyboard access as width or fonts change", () => {
    const { container, rerender } = render(<Prose />);
    const long = container.querySelectorAll<HTMLElement>(".md-math-inline")[1]!;
    rerender(<Prose width={640} />);
    expect(long.hasAttribute("tabindex")).toBe(false);
    (long.firstElementChild as HTMLElement).dataset.extent = "700";
    update();
    expect(long.tabIndex).toBe(0);
  });

  it("measures the available content width inside a padded reading block", () => {
    const { container } = render(<Prose width={320} extent={300} />);
    const root = container.firstElementChild as HTMLElement;
    root.style.padding = "0 24px";
    update();
    const long = container.querySelectorAll<HTMLElement>(".md-math-inline")[1]!;
    expect(long.hasAttribute("data-overflow")).toBe(true);
    expect(long.tabIndex).toBe(0);
  });

  it("disconnects observations when the prose is replaced", () => {
    const view = render(<Prose />);
    view.rerender(<Prose width={640} />);
    expect(disconnect).toHaveBeenCalledOnce();
    view.unmount();
    expect(disconnect).toHaveBeenCalledTimes(2);
  });

  it("preserves focusable server markup when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { container } = render(<Prose />);
    expect(container.querySelectorAll('[tabindex="0"]').length).toBe(2);
  });
});
