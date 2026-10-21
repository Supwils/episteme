// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { StrictMode, useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useModalDialog } from "../useModalDialog";

afterEach(() => {
  cleanup();
  document.body.removeAttribute("style");
  document.documentElement.removeAttribute("style");
});

function Modal({ open = true, name = "弹层" }) {
  const ref = useRef<HTMLDialogElement>(null),
    input = useRef<HTMLInputElement>(null);
  useModalDialog(open, ref, { initialFocusRef: input });
  return open ? (
    <dialog ref={ref} aria-label={name}>
      <input ref={input} aria-label={name + "输入"} />
    </dialog>
  ) : null;
}

describe("native dialog lifecycle", () => {
  it("opens modally, focuses the field and restores the prior control without scrolling", () => {
    const trigger = document.createElement("button");
    document.body.append(trigger);
    trigger.focus();
    const restore = vi.spyOn(trigger, "focus");
    const view = render(<Modal />);
    expect((screen.getByRole("dialog") as HTMLDialogElement).open).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole("textbox"));
    view.rerender(<Modal open={false} />);
    expect(document.activeElement).toBe(trigger);
    expect(restore).toHaveBeenLastCalledWith({ preventScroll: true });
    expect(document.body.style.overflow).toBe("");
    trigger.remove();
  });
  it("keeps another modal's scroll lock when the lower dialog unmounts first", () => {
    const view = render(
      <>
        <Modal name="下层" />
        <Modal name="上层" />
      </>
    );
    view.rerender(
      <>
        <Modal name="下层" open={false} />
        <Modal name="上层" />
      </>
    );
    expect(document.documentElement.style.overflowY).toBe("hidden");
    expect(document.body.style.overflowY).toBe("hidden");
    view.unmount();
    expect(document.documentElement.style.overflowY).toBe("");
  });
  it("releases its styles on unmount and during Strict Mode replay", () => {
    const view = render(
      <StrictMode>
        <Modal />
      </StrictMode>
    );
    expect(document.documentElement.style.overflowY).toBe("hidden");
    view.unmount();
    expect(document.documentElement.style.overflowY).toBe("");
    expect(document.body.style.overflowY).toBe("");
  });
  it("does not focus a prior control that was removed during navigation", () => {
    const trigger = document.createElement("button");
    document.body.append(trigger);
    trigger.focus();
    const view = render(<Modal />);
    trigger.remove();
    const focus = vi.spyOn(trigger, "focus");
    view.unmount();
    expect(focus).not.toHaveBeenCalled();
  });
});
