// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MoleculeViewer } from "../MoleculeViewer";

afterEach(() => {
  cleanup();
  delete (globalThis as { molstar?: unknown }).molstar;
});

describe("MoleculeViewer", () => {
  it("offers a retry after a failed load", async () => {
    (globalThis as { molstar?: unknown }).molstar = {
      Viewer: {
        create: () => Promise.reject(new Error("offline")),
      },
    };
    render(<MoleculeViewer pdbId="1ZNI" title="胰岛素" />);
    fireEvent.click(screen.getByRole("button", { name: /查看 3D 结构/ }));
    expect(await screen.findByRole("button", { name: "重试" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "RCSB PDB" }).getAttribute("href")).toBe(
      "https://www.rcsb.org/structure/1ZNI"
    );
  });
});
