// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MobileNav } from "../MobileNav";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));
vi.mock("next/dynamic", () => ({ default: () => () => <a href="/philosophy">哲学思想</a> }));
afterEach(() => {
  cleanup();
  pathname = "/";
});
function open() {
  const view = render(<MobileNav />);
  const trigger = screen.getByRole("button", { name: "打开菜单" });
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "导航" }) as HTMLDialogElement;
  return { ...view, trigger, dialog, panel: dialog.firstElementChild as HTMLElement };
}

describe("mobile navigation modal", () => {
  it.each(["button", "backdrop", "cancel"])(
    "closes on %s and returns focus to its trigger",
    (action) => {
      const { trigger, dialog } = open();
      expect(dialog.open).toBe(true);
      expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);
      expect(document.documentElement.style.overflowY).toBe("hidden");
      if (action === "button") fireEvent.click(screen.getByRole("button", { name: "关闭导航" }));
      else if (action === "backdrop") fireEvent.click(dialog);
      else fireEvent(dialog, new Event("cancel", { cancelable: true }));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.activeElement).toBe(trigger);
      expect(document.documentElement.style.overflowY).toBe("");
    }
  );
  it("resets a cancelled pull without treating it as a dismissal", () => {
    const { panel } = open();
    fireEvent.touchStart(panel, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 220 }] });
    expect(panel.style.transform).toBe("translateY(120px)");
    fireEvent.touchCancel(panel);
    expect(panel.style.transform).toBe("");
    fireEvent.touchEnd(panel);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });
  it("retains pull-to-close and starts the next opening at its resting position", () => {
    const { panel, trigger } = open();
    fireEvent.touchStart(panel, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 220 }] });
    fireEvent.touchEnd(panel);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(trigger);
    expect((screen.getByRole("dialog").firstElementChild as HTMLElement).style.transform).toBe("");
  });
  it("closes on a route change and releases its owned scroll lock", () => {
    const view = open();
    pathname = "/read";
    view.rerender(<MobileNav />);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.documentElement.style.overflowY).toBe("");
  });
});
