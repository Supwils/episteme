// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownZoomableImage } from "../MarkdownInteractions";

afterEach(cleanup);

describe("zoomed image keyboard access", () => {
  it("opens a native modal and focuses its close control", () => {
    render(<MarkdownZoomableImage src="/example.png" alt="示意图" accentColor="#fff" />);
    fireEvent.click(screen.getByRole("button"));
    const dialog = screen.getByRole("dialog", { name: "示意图" });
    expect(dialog).toBeInstanceOf(HTMLDialogElement);
    expect((dialog as HTMLDialogElement).open).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "关闭图片预览" }));
  });

  it.each(["cancel", "button"])("closes via %s and restores the image trigger focus", (method) => {
    render(<MarkdownZoomableImage src="/example.png" alt="示意图" accentColor="#fff" />);
    const trigger = screen.getByRole("button");
    trigger.focus();
    fireEvent.click(trigger);
    if (method === "cancel")
      fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
    else fireEvent.click(screen.getByRole("button", { name: "关闭图片预览" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("provides a named trigger for an image without alt text", () => {
    render(<MarkdownZoomableImage src="/example.png" alt="" accentColor="#fff" />);
    expect(screen.getByRole("button", { name: "放大图片" })).toBeTruthy();
  });
});
