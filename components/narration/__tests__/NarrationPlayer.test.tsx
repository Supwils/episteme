// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NarrationPlayer } from "../NarrationPlayer";
import { useNarrationStore } from "../narration-store";

afterEach(() => {
  cleanup();
  useNarrationStore.setState({ active: null });
  document.documentElement.removeAttribute("data-narration-active");
  vi.restoreAllMocks();
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

  it("restarts browser-voice playback at the newly chosen rate", () => {
    const rates: number[] = [];
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        lang = "";
        rate = 1;
        voice: unknown = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
        constructor(readonly text: string) {}
      }
    );
    vi.stubGlobal("speechSynthesis", {
      cancel: vi.fn(),
      speak: (utterance: { rate: number }) => {
        rates.push(utterance.rate);
      },
      getVoices: () => [],
    });

    render(<NarrationPlayer />);
    act(() => {
      useNarrationStore.getState().open({
        id: "voice",
        title: "预览讲解",
        script: "脚本文本",
        audioUrl: null,
      });
    });
    expect(rates.at(-1)).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "调整语速" }));
    expect(rates.at(-1)).toBe(1.25);
    expect(screen.getByRole("button", { name: "调整语速" }).textContent).toBe("1.25×");
  });

  it("keeps showing pause when the replaced utterance reports its cancellation late", () => {
    const spoken: { onerror: (() => void) | null }[] = [];
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        lang = "";
        rate = 1;
        voice: unknown = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
        constructor(readonly text: string) {}
      }
    );
    vi.stubGlobal("speechSynthesis", {
      cancel: vi.fn(),
      speak: (utterance: { onerror: (() => void) | null }) => spoken.push(utterance),
      getVoices: () => [],
    });

    render(<NarrationPlayer />);
    act(() => {
      useNarrationStore.getState().open({
        id: "voice-late",
        title: "预览讲解",
        script: "脚本文本",
        audioUrl: null,
      });
    });
    fireEvent.click(screen.getByRole("button", { name: "调整语速" }));
    expect(spoken).toHaveLength(2);
    // The browser delivers the first utterance's "interrupted" error after the
    // second one has started.
    act(() => spoken[0]!.onerror?.());
    expect(screen.getByRole("button", { name: "暂停讲解" })).toBeTruthy();
  });

  it("seeks with a slider when audio is attached", () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => new Promise(() => {}));
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

    render(<NarrationPlayer />);
    act(() => {
      useNarrationStore.getState().open({
        id: "audio",
        title: "有声讲解",
        script: "脚本文本",
        audioUrl: "/audio/test.mp3",
      });
    });

    const slider = screen.getByRole("slider", { name: "讲解进度" });
    const audio = document.querySelector("audio");
    expect(audio).not.toBeNull();
    Object.defineProperty(audio!, "duration", { configurable: true, value: 200 });
    let currentTime = 0;
    Object.defineProperty(audio!, "currentTime", {
      configurable: true,
      get: () => currentTime,
      set: (value: number) => {
        currentTime = value;
      },
    });

    fireEvent.change(slider, { target: { value: "250" } });
    expect(currentTime).toBe(50);
  });
});
