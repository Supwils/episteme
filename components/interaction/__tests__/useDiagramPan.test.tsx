// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDiagramPan } from "../useDiagramPan";
import { TouchPanButton } from "../TouchPanButton";

const clicked = vi.fn();
let captures: WeakMap<Element, Set<number>>;

beforeEach(() => {
  captures = new WeakMap();
  Object.defineProperty(Element.prototype, "setPointerCapture", {
    configurable: true,
    value: vi.fn(function (this: Element, id: number) {
      const ids = captures.get(this) ?? new Set<number>();
      ids.add(id);
      captures.set(this, ids);
    }),
  });
  Object.defineProperty(Element.prototype, "hasPointerCapture", {
    configurable: true,
    value: vi.fn(function (this: Element, id: number) {
      return captures.get(this)?.has(id) ?? false;
    }),
  });
  Object.defineProperty(Element.prototype, "releasePointerCapture", {
    configurable: true,
    value: vi.fn(function (this: Element, id: number) {
      captures.get(this)?.delete(id);
    }),
  });
  clicked.mockReset();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  for (const key of ["setPointerCapture", "hasPointerCapture", "releasePointerCapture"])
    Reflect.deleteProperty(Element.prototype, key);
});

function Diagram({ scale = 1 } = {}) {
  const [pan, setPan] = useState({ x: 10, y: 20 });
  const diagram = useDiagramPan<HTMLDivElement>({
    pan,
    onPan: setPan,
    toPanDelta: (x, y) => ({ x: x * scale, y: y * scale }),
  });
  return (
    <>
      <TouchPanButton
        armed={diagram.armed}
        controls={diagram.surfaceId}
        onToggle={diagram.toggle}
        onCancel={diagram.cancel}
      />
      <div
        id={diagram.surfaceId}
        data-testid="surface"
        data-panning={diagram.isPanning}
        style={{ touchAction: diagram.touchAction }}
        {...diagram.handlers}
      >
        <button onClick={clicked}>节点</button>
      </div>
      <output>
        {pan.x},{pan.y}
      </output>
      <button onClick={diagram.cancel}>重置</button>
    </>
  );
}

function pointer(target: Element, phase: string, overrides = {}) {
  act(() => {
    target.dispatchEvent(
      new PointerEvent(phase, {
        bubbles: true,
        pointerId: 1,
        pointerType: "touch",
        isPrimary: true,
        button: 0,
        buttons: 1,
        clientX: 100,
        clientY: 100,
        ...overrides,
      })
    );
  });
}
function setup(armed = false) {
  render(<Diagram />);
  const surface = screen.getByTestId("surface"),
    node = screen.getByText("节点");
  if (armed) fireEvent.click(screen.getByText("触屏平移"));
  return { surface, node };
}
function expectRestored(surface: HTMLElement) {
  expect(surface.style.touchAction).toBe("manipulation");
  expect(surface.dataset.panning).toBe("false");
  expect(screen.getByText("触屏平移").getAttribute("aria-pressed")).toBe("false");
  expect(surface.hasPointerCapture(1)).toBe(false);
}

describe("diagram gesture ownership", () => {
  it.each(["touch", "pen"])("leaves default %s gestures to the browser", (pointerType) => {
    const { surface } = setup();
    pointer(surface, "pointerdown", { pointerType });
    pointer(surface, "pointermove", { pointerType, clientY: 160 });
    expect(screen.getByRole("status").textContent).toBe("10,20");
    expectRestored(surface);
  });

  it("keeps mouse panning without arming and captures the surface instead of a child", () => {
    const { surface, node } = setup();
    pointer(node, "pointerdown", { pointerType: "mouse" });
    pointer(node, "pointermove", { pointerType: "mouse", clientX: 130, clientY: 140 });
    expect(surface.hasPointerCapture(1)).toBe(true);
    expect(node.hasPointerCapture(1)).toBe(false);
    expect(screen.getByRole("status").textContent).toBe("40,60");
    pointer(surface, "pointerup");
    expectRestored(surface);
  });

  it("does not capture a tap or activate panning below the movement threshold", () => {
    const { surface, node } = setup(true);
    pointer(node, "pointerdown");
    pointer(node, "pointermove", { clientX: 102, clientY: 102 });
    expect(surface.hasPointerCapture(1)).toBe(false);
    pointer(node, "pointerup");
    fireEvent.click(node, { detail: 1 });
    expect(clicked).toHaveBeenCalledOnce();
    expectRestored(surface);
  });

  it("suppresses drag clicks while preserving keyboard activation and the next tap", () => {
    const { surface, node } = setup(true);
    pointer(node, "pointerdown");
    pointer(node, "pointermove", { clientX: 120 });
    pointer(surface, "pointerup");
    fireEvent.click(node, { detail: 0 });
    expect(clicked).toHaveBeenCalledTimes(1);
    fireEvent.click(node, { detail: 1 });
    expect(clicked).toHaveBeenCalledTimes(1);
    pointer(node, "pointerdown");
    pointer(node, "pointerup");
    fireEvent.click(node, { detail: 1 });
    expect(clicked).toHaveBeenCalledTimes(2);
  });

  it.each(["pointerup", "pointercancel", "lostpointercapture"])(
    "restores scrolling after %s",
    (phase) => {
      const { surface } = setup(true);
      pointer(surface, "pointerdown");
      pointer(surface, "pointermove", { clientX: 130, clientY: 140 });
      if (phase === "lostpointercapture") surface.releasePointerCapture(1);
      pointer(surface, phase);
      expect(screen.getByRole("status").textContent).toBe("40,60");
      expectRestored(surface);
      pointer(surface, "pointerdown");
      pointer(surface, "pointermove", { clientX: 150 });
      expect(screen.getByRole("status").textContent).toBe("40,60");
    }
  );

  it("ignores a child's bubbling capture loss and continues outside after capture", () => {
    const { surface, node } = setup(true);
    pointer(node, "pointerdown");
    pointer(node, "pointermove", { clientX: 130 });
    pointer(node, "lostpointercapture");
    pointer(surface, "pointerleave");
    pointer(surface, "pointermove", { clientX: 150 });
    expect(screen.getByRole("status").textContent).toBe("60,20");
    pointer(surface, "pointerup");
    expectRestored(surface);
  });

  it("ignores a second contact and its release without stealing the primary drag", () => {
    const { surface } = setup(true);
    pointer(surface, "pointerdown");
    pointer(surface, "pointerdown", { pointerId: 2, isPrimary: false });
    pointer(surface, "pointermove", { pointerId: 2, clientX: 200 });
    pointer(surface, "pointerup", { pointerId: 2 });
    pointer(surface, "pointermove", { clientX: 130 });
    expect(screen.getByRole("status").textContent).toBe("40,20");
    expect(surface.hasPointerCapture(1)).toBe(true);
  });

  it("does not start with secondary contacts or a right mouse button", () => {
    const { surface } = setup(true);
    pointer(surface, "pointerdown", { isPrimary: false });
    pointer(surface, "pointermove", { clientX: 130 });
    pointer(surface, "pointerdown", { pointerType: "mouse", button: 2 });
    pointer(surface, "pointermove", { pointerType: "mouse", clientX: 130 });
    expect(screen.getByRole("status").textContent).toBe("10,20");
  });

  it("recovers from a missed release when the next move has no buttons", () => {
    const { surface } = setup(true);
    pointer(surface, "pointerdown");
    pointer(surface, "pointermove", { clientX: 130 });
    pointer(surface, "pointermove", { clientX: 150, buttons: 0 });
    expect(screen.getByRole("status").textContent).toBe("40,20");
    expectRestored(surface);
  });

  it.each(["重置", "Escape", "触屏平移"])("can cancel an armed mode through %s", (action) => {
    const { surface } = setup(true);
    if (action === "Escape") fireEvent.keyDown(screen.getByText("触屏平移"), { key: action });
    else fireEvent.click(screen.getByText(action));
    expectRestored(surface);
  });

  it("maps pointer movement into graph coordinates", () => {
    render(<Diagram scale={0.25} />);
    const surface = screen.getByTestId("surface");
    pointer(surface, "pointerdown", { pointerType: "mouse" });
    pointer(surface, "pointermove", { pointerType: "mouse", clientX: 120, clientY: 140 });
    expect(screen.getByRole("status").textContent).toBe("15,30");
  });
});
