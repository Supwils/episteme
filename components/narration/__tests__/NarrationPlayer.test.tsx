// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NarrationPlayer } from "../NarrationPlayer";
import { useNarrationStore } from "../narration-store";

afterEach(() => {
  cleanup();
  useNarrationStore.setState({ active: null });
  document.documentElement.removeAttribute("data-narration-active");
});

describe("NarrationPlayer data-narration-active flag", () => {
  it("flags <html> while a narration is loaded, clears on close and on unmount", () => {
    const root = document.documentElement;
    expect(root.hasAttribute("data-narration-active")).toBe(false);

    // Mounted globally in ClientShell; inactive → no flag.
    const { unmount } = render(<NarrationPlayer />);
    expect(root.hasAttribute("data-narration-active")).toBe(false);

    act(() => {
      useNarrationStore
        .getState()
        .open({ id: "a", title: "测试讲解", script: "脚本文本", audioUrl: null });
    });
    expect(root.hasAttribute("data-narration-active")).toBe(true);

    act(() => {
      useNarrationStore.getState().close();
    });
    expect(root.hasAttribute("data-narration-active")).toBe(false);

    act(() => {
      useNarrationStore
        .getState()
        .open({ id: "b", title: "测试讲解 2", script: "脚本文本", audioUrl: null });
    });
    expect(root.hasAttribute("data-narration-active")).toBe(true);
    unmount();
    expect(root.hasAttribute("data-narration-active")).toBe(false);
  });
});
