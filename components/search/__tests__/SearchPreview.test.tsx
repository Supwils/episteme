// @vitest-environment happy-dom
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadLinkPreviews } from "@/lib/link-preview-client";
import { SearchPreview } from "../SearchPreview";
import type { SearchResult } from "../types";
import type { LinkPreview } from "@/lib/link-preview-shards";

vi.mock("@/lib/link-preview-client", () => ({ loadLinkPreviews: vi.fn() }));

const result: SearchResult = {
  title: "量子退相干",
  subtitle: "量子物理",
  url: "/universe-physics/knowledge-base/量子物理--quantum-decoherence",
  section: "physics",
  kind: "knowledgeBase",
};

beforeEach(() => {
  vi.mocked(loadLinkPreviews).mockReset();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("search result previews", () => {
  it("loads an article lead alongside its classification", async () => {
    vi.mocked(loadLinkPreviews).mockResolvedValue({
      [result.url]: {
        t: result.title,
        e: "退相干使干涉难以观测，却没有选出唯一结果。",
        d: "universe-physics",
      },
    });
    render(<SearchPreview result={result} onNavigate={vi.fn()} />);
    expect(await screen.findByText("退相干使干涉难以观测，却没有选出唯一结果。")).toBeTruthy();
    expect(screen.getByRole("link", { name: "打开 ↵" }).getAttribute("href")).toBe(result.url);
  });

  it("does not let a late shard replace the newly selected result", async () => {
    let finishOld!: (preview: Record<string, LinkPreview>) => void;
    vi.mocked(loadLinkPreviews).mockReturnValueOnce(
      new Promise((resolve) => {
        finishOld = resolve;
      })
    );
    const next = {
      ...result,
      title: "信息论",
      url: "/computer-science/theory/information-theory",
      section: "computer-science",
    };
    vi.mocked(loadLinkPreviews).mockResolvedValueOnce({
      [next.url]: { t: next.title, e: "这是新选中文章的导语。", d: "computer-science" },
    });
    const view = render(<SearchPreview result={result} onNavigate={vi.fn()} />);
    view.rerender(<SearchPreview result={next} onNavigate={vi.fn()} />);
    await screen.findByText("这是新选中文章的导语。");
    await act(async () =>
      finishOld({
        [result.url]: { t: result.title, e: "这是迟到的旧导语。", d: "universe-physics" },
      })
    );
    expect(screen.queryByText("这是迟到的旧导语。")).toBeNull();
    expect(screen.getByText("这是新选中文章的导语。")).toBeTruthy();
  });

  it("uses existing body context without downloading a shard", () => {
    render(
      <SearchPreview
        result={{ ...result, snippet: "系统与环境纠缠后，干涉效应消失。" }}
        onNavigate={vi.fn()}
      />
    );
    expect(loadLinkPreviews).not.toHaveBeenCalled();
    expect(screen.getByText(/系统与环境纠缠/)).toBeTruthy();
  });

  it("does not fetch a preview hidden on a narrow viewport", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    );
    render(<SearchPreview result={result} onNavigate={vi.fn()} />);
    expect(loadLinkPreviews).not.toHaveBeenCalled();
  });
});
