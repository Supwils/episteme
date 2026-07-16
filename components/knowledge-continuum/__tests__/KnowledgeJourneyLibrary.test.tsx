// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GraphNode } from "@/lib/graph-engine";
import { buildKnowledgeGapPlan } from "@/lib/knowledge-gap-plan";
import { createKnowledgeGapJourneyArchive } from "@/lib/knowledge-gap-journey-archive";
import {
  resetKnowledgeGapJourneys,
  saveKnowledgeGapJourney,
  KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY,
} from "@/lib/knowledge-gap-journey-store";
import {
  createKnowledgeGapJourney,
  updateKnowledgeGapCheckpoint,
} from "@/lib/knowledge-gap-journey";
import { KnowledgeJourneyLibrary } from "../KnowledgeJourneyLibrary";

function node(id: string, level: 1 | 2, prerequisiteIds: string[] = []): GraphNode {
  return {
    id,
    label: id,
    domain: "sociology",
    type: "concept",
    slug: id,
    tags: [],
    description: id,
    knowledgeLevel: level,
    knowledgeLevelSource: "curated",
    prerequisiteIds,
    evidenceMode: "comparative",
  };
}

const plan = buildKnowledgeGapPlan(
  [node("root", 1), node("target", 2, ["root"])],
  [],
  "target",
  [],
  45
);

beforeEach(() => {
  resetKnowledgeGapJourneys();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ plans: [plan], unavailableTargetIds: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    )
  );
});

afterEach(() => {
  cleanup();
  resetKnowledgeGapJourneys();
  vi.unstubAllGlobals();
});

describe("KnowledgeJourneyLibrary", () => {
  it("loads versions on demand and filters a route by lifecycle and evidence", async () => {
    saveKnowledgeGapJourney(plan);
    render(
      <KnowledgeJourneyLibrary knownIds={[]} masteredIds={new Set()} onOpenJourney={vi.fn()} />
    );

    expect(fetch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "打开档案库" }));
    await screen.findByText("当前版本");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText("尚未记录 · 0/8")).toBeDefined();
    expect(screen.getByText("root · 阅读正文")).toBeDefined();

    fireEvent.change(screen.getByLabelText("路线版本状态筛选"), {
      target: { value: "pending" },
    });
    expect(screen.getByText("没有符合当前筛选的路线。")).toBeDefined();
    fireEvent.change(screen.getByLabelText("路线版本状态筛选"), {
      target: { value: "current" },
    });
    expect(screen.getByLabelText("target路线档案")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "删除" }));
    fireEvent.click(screen.getByRole("button", { name: "确认删除" }));
    expect(screen.getByText("尚未保存学习路线。")).toBeDefined();
  });

  it("previews an import conflict and applies only the explicit replacement choice", async () => {
    saveKnowledgeGapJourney(plan);
    render(
      <KnowledgeJourneyLibrary knownIds={[]} masteredIds={new Set()} onOpenJourney={vi.fn()} />
    );
    fireEvent.click(screen.getByRole("button", { name: "打开档案库" }));
    await screen.findByText("当前版本");

    const incoming = updateKnowledgeGapCheckpoint(
      createKnowledgeGapJourney(plan, "2026-07-13T02:00:00.000Z"),
      "root",
      { reading: true },
      "2026-07-13T02:10:00.000Z"
    );
    const file = new File(
      [JSON.stringify(createKnowledgeGapJourneyArchive([incoming]))],
      "routes.json",
      { type: "application/json" }
    );
    fireEvent.change(screen.getByLabelText("导入路线档案 JSON"), {
      target: { files: [file] },
    });

    await screen.findByText("导入前预览");
    expect(screen.getByText(/新增 0 条，冲突 1 条/)).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "采用导入版本" }));
    fireEvent.click(screen.getByRole("button", { name: "确认导入" }));
    await waitFor(() =>
      expect(window.localStorage.getItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY)).toContain(
        '"reading":true'
      )
    );
    fireEvent.click(screen.getByRole("button", { name: "清空全部路线" }));
    fireEvent.click(screen.getByRole("button", { name: "确认清空" }));
    expect(window.localStorage.getItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY)).toContain(
      '"journeys":{}'
    );
  });
});
