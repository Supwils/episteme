// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DailySelected, DailySelectedEvent, DailySelectedFact } from "@/lib/daily-selector";
import { DailyShuffle } from "../DailyShuffle";
import DailyPage from "@/app/daily/page";
import { getDailySelected } from "@/lib/daily-selector";

const ARTICLE = "/law/judgment-analyses/carlill-v-carbolic-smoke-ball";

function event(title: string): DailySelectedEvent {
  return { title, description: "说明", url: ARTICLE };
}

function fact(title: string): DailySelectedFact {
  return { title, description: "说明", url: ARTICLE };
}

function selection(curiosityTitle: string): DailySelected {
  return {
    date: "2026-10-07",
    seed: 1,
    physics: event("物理"),
    history: event("历史"),
    philosophy: event("哲学"),
    economics: event("经济"),
    psychology: event("心理"),
    mathematics: fact("数学"),
    lifeScience: fact("生命"),
    cosmology: fact("宇宙"),
    computerScience: fact("计算"),
    politicalScience: fact("政治"),
    earthScience: fact("地球"),
    medicine: fact("医学"),
    chemistry: fact("化学"),
    sociology: fact("社会"),
    linguistics: fact("语言"),
    law: fact("法学"),
    arts: fact("艺术"),
    literature: fact("文学"),
    religion: fact("宗教"),
    engineering: fact("工程"),
    education: fact("教育"),
    anthropology: fact("人类"),
    curiosity: { title: curiosityTitle, detail: "细节。", url: ARTICLE },
    question: "今天问什么？",
    fact: "一条事实",
    onThisDay: [],
  };
}

function mockMatchMedia() {
  window.matchMedia = ((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-07T00:00:00+08:00"));
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("DailyShuffle roll label", () => {
  it("advances the page date and historical events together when a roll crosses midnight", async () => {
    mockMatchMedia();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-12-31T15:59:50Z"));
    const next = getDailySelected(new Date("2026-12-31T16:00:01Z"), 1);
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(next), {
            headers: { "X-Daily-Refresh-After": "86399000" },
          })
        )
      )
    );
    render(DailyPage());
    expect(screen.getByText(/2026年12月31日/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "换一批知识" }));
    expect(await screen.findByText(/2027年1月1日/)).toBeTruthy();
    expect(screen.getByText("2027-01-01")).toBeTruthy();
    expect(screen.queryByText(/2026年12月31日/)).toBeNull();
  });

  it("keeps today's label when the roll does not return a selection", async () => {
    mockMatchMedia();
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false, json: () => Promise.resolve(null) }))
    );
    render(<DailyShuffle initial={selection("原来的巧合")} />);
    fireEvent.click(screen.getByRole("button", { name: "换一批知识" }));
    expect(await screen.findByText("换一批")).toBeTruthy();
    expect(screen.getByText("今日精选")).toBeTruthy();
    expect(screen.getByText("原来的巧合")).toBeTruthy();
  });

  it("labels a successful roll as a fresh set", async () => {
    mockMatchMedia();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          headers: new Headers({ "X-Daily-Refresh-After": "86400000" }),
          json: () => Promise.resolve(selection("换来的巧合")),
        })
      )
    );
    render(<DailyShuffle initial={selection("原来的巧合")} />);
    fireEvent.click(screen.getByRole("button", { name: "换一批知识" }));
    expect(await screen.findByText("换来的巧合")).toBeTruthy();
    expect(screen.getByText("随机一组")).toBeTruthy();
    expect(screen.queryByText("原来的巧合")).toBeNull();
  });
});
