// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarkdownCodeBlock } from "../MarkdownInteractions";

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
function clipboard(value: unknown) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value });
}
function renderCode() {
  return render(<MarkdownCodeBlock code="const value = 42;" language="js" accentColor="#fff" />);
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("code clipboard boundary", () => {
  it("reports denied permission and allows a successful retry", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error("denied"))
      .mockResolvedValue(undefined);
    clipboard({ writeText });
    renderCode();
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    expect((await screen.findByRole("status")).textContent).toContain("复制失败");
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    await screen.findByRole("button", { name: "已复制" });
    expect(screen.getByRole("status").textContent).not.toContain("失败");
    expect(writeText).toHaveBeenCalledTimes(2);
  });

  it("reports unavailable Clipboard API without throwing", async () => {
    clipboard(undefined);
    renderCode();
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    expect((await screen.findByRole("status")).textContent).toContain("手动选择");
  });

  it("cleans up the success feedback timer on unmount", async () => {
    vi.useFakeTimers();
    clipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    const { unmount } = renderCode();
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "复制代码" })));
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not schedule feedback when a pending copy resolves after unmount", async () => {
    vi.useFakeTimers();
    let release!: () => void;
    clipboard({
      writeText: () =>
        new Promise<void>((resolve) => {
          release = resolve;
        }),
    });
    const { unmount } = renderCode();
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    unmount();
    await act(async () => release());
    expect(vi.getTimerCount()).toBe(0);
  });

  it("ignores an older failure after a newer copy succeeds", async () => {
    let reject!: (error: Error) => void;
    const writeText = vi
      .fn()
      .mockReturnValueOnce(
        new Promise<void>((_resolve, fail) => {
          reject = fail;
        })
      )
      .mockResolvedValue(undefined);
    clipboard({ writeText });
    renderCode();
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    fireEvent.click(screen.getByRole("button", { name: "复制代码" }));
    await screen.findByRole("button", { name: "已复制" });
    await act(async () => reject(new Error("old failure")));
    expect(screen.getByRole("status").textContent).not.toContain("失败");
    expect(screen.getByRole("button", { name: "已复制" })).toBeTruthy();
  });
});
