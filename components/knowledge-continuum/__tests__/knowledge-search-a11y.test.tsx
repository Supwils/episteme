// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KnowledgeProfileSearch } from "../KnowledgeProfileSearch";
import { KnowledgeTargetSearch } from "../KnowledgeTargetSearch";
import type { KnowledgeTargetSearchResult } from "@/lib/knowledge-branch";

const result = (id: string, label: string): KnowledgeTargetSearchResult => ({
  id,
  label,
  domainLabel: "哲学",
  domainColor: "#a88adf",
  level: 1,
  levelSource: "curated",
  anchorLabel: label,
  distance: 1,
  confidence: "direct",
  candidateCount: 1,
});

const socrates = result("philosophy:socrates", "苏格拉底");
const plato = result("philosophy:plato", "柏拉图");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mockTargets(results: KnowledgeTargetSearchResult[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results }),
    })
  );
}

describe("knowledge search comboboxes", () => {
  it("marks the highlighted profile option as selected, not the mastered one", async () => {
    mockTargets([socrates, plato]);
    render(
      <KnowledgeProfileSearch masteredIds={new Set(["philosophy:socrates"])} onConfirm={() => {}} />
    );
    fireEvent.focus(screen.getByRole("combobox", { name: "搜索已掌握知识节点" }));
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2));
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    const options = screen.getAllByRole("option");
    expect(options[0]!.getAttribute("aria-selected")).toBe("true");
    expect(options[1]!.getAttribute("aria-selected")).toBe("false");
    expect((options[0] as HTMLButtonElement).disabled).toBe(true);
  });

  it("marks the highlighted target option as selected", async () => {
    mockTargets([socrates, plato]);
    render(
      <KnowledgeTargetSearch
        selectedTarget={null}
        filter={null}
        onClearFilter={() => {}}
        onSelect={async () => {}}
      />
    );
    fireEvent.focus(screen.getByRole("combobox"));
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2));
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    const options = screen.getAllByRole("option");
    expect(options[0]!.getAttribute("aria-selected")).toBe("false");
    expect(options[1]!.getAttribute("aria-selected")).toBe("true");
  });
});
