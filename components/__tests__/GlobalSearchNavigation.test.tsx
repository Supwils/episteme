// @vitest-environment happy-dom
import React, { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GlobalSearch } from "../GlobalSearch";
import type { SearchHit } from "@/lib/search/client";

const state = vi.hoisted(() => ({
  pathname: "/earth-science",
  params: "",
  searchTitles: vi.fn(),
  warmup: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  usePathname: () => state.pathname,
  useSearchParams: () => new URLSearchParams(state.params),
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("@/lib/search/client", () => ({
  createSearchClient: () => ({
    search: state.searchTitles,
    warmup: state.warmup,
    dispose: () => {},
  }),
}));

const advance = (ms: number) => act(async () => vi.advanceTimersByTimeAsync(ms));
async function startBodyRequest() {
  await advance(100);
  await advance(180);
}
const type = (value: string) =>
  fireEvent.change(screen.getByRole("textbox", { name: "搜索" }), { target: { value } });
function open() {
  const view = render(<GlobalSearch />);
  act(() => document.dispatchEvent(new Event("open-global-search")));
  return view;
}
function navigate(view: ReturnType<typeof render>, kind: string) {
  if (kind === "pathname") state.pathname = "/philosophy";
  else state.params = "filter=cross-domain";
  view.rerender(<GlobalSearch />);
}

beforeEach(() => {
  vi.useFakeTimers();
  state.pathname = "/earth-science";
  state.params = "";
  state.searchTitles.mockReset().mockReturnValue(new Promise(() => {}));
  state.warmup.mockClear();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe.each(["pathname", "search parameters"])("search session on %s navigation", (kind) => {
  it("cancels typed input before it can start either search tier", async () => {
    const view = open();
    type("旧查询");
    navigate(view, kind);
    expect(screen.queryByRole("dialog")).toBeNull();
    await advance(500);
    expect(state.searchTitles).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("cancels the queued body search after title search has started", async () => {
    const view = open();
    type("旧查询");
    await advance(100);
    expect(state.searchTitles).toHaveBeenCalledTimes(1);
    navigate(view, kind);
    expect(screen.queryByRole("dialog")).toBeNull();
    await advance(500);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("aborts a request that has already left the browser", async () => {
    const view = open();
    type("旧查询");
    await startBodyRequest();
    expect(fetch).toHaveBeenCalledTimes(1);
    const signal = vi.mocked(fetch).mock.calls[0]![1]!.signal!;
    expect(signal.aborted).toBe(false);
    navigate(view, kind);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(signal.aborted).toBe(true);
  });
});

it("keeps the active query during an unrelated rerender of the same URL", async () => {
  const view = open();
  type("当前查询");
  await startBodyRequest();
  const signal = vi.mocked(fetch).mock.calls[0]![1]!.signal!;
  view.rerender(<GlobalSearch />);
  expect(screen.getByRole("dialog")).toBeTruthy();
  expect(screen.getByRole("textbox", { name: "搜索" })).toHaveProperty("value", "当前查询");
  expect(signal.aborted).toBe(false);
  expect(state.searchTitles).toHaveBeenCalledTimes(1);
});

it("ignores old completions after navigation and can search again in the new session", async () => {
  const titleResolvers: Array<(hits: SearchHit[]) => void> = [];
  state.searchTitles.mockImplementation(
    () => new Promise<SearchHit[]>((resolve) => titleResolvers.push(resolve))
  );
  type PhraseResponse = { ok: true; json(): Promise<{ query: string; hits: SearchHit[] }> };
  const responses: Array<(value: PhraseResponse) => void> = [];
  vi.mocked(fetch).mockImplementation(
    () => new Promise<Response>((resolve) => responses.push((value) => resolve(value as Response)))
  );
  const view = open();
  type("旧查询");
  await startBodyRequest();
  navigate(view, "pathname");
  act(() => document.dispatchEvent(new Event("open-global-search")));
  type("新查询");
  await startBodyRequest();
  const oldHit: SearchHit = {
    title: "旧结果",
    subtitle: "",
    url: "/old",
    section: "physics",
    kind: "article",
    score: 1,
  };
  await act(async () => {
    titleResolvers[0]!([oldHit]);
    responses[0]!({ ok: true, json: async () => ({ query: "旧查询", hits: [oldHit] }) });
  });
  expect(screen.queryByRole("option")).toBeNull();
  expect(screen.getByRole("textbox", { name: "搜索" })).toHaveProperty("value", "新查询");
  await act(async () => {
    titleResolvers[1]!([{ ...oldHit, title: "新结果", url: "/new" }]);
    responses[1]!({ ok: true, json: async () => ({ query: "新查询", hits: [] }) });
  });
  expect(screen.getByRole("option").getAttribute("href")).toBe("/new");
});

it("opens the lazily requested session under StrictMode and releases work on unmount", async () => {
  const view = render(
    <StrictMode>
      <GlobalSearch openOnMount />
    </StrictMode>
  );
  expect(screen.getByRole("dialog")).toBeTruthy();
  type("当前查询");
  await startBodyRequest();
  const signal = vi.mocked(fetch).mock.calls[0]![1]!.signal!;
  view.unmount();
  expect(signal.aborted).toBe(true);
  expect(document.documentElement.style.overflowY).toBe("");
});
