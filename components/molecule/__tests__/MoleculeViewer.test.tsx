// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("disposes the failed viewer before a retry creates another", async () => {
    const first = { loadPdb: () => Promise.reject(new Error("404")), dispose: vi.fn() };
    const second = { loadPdb: () => Promise.resolve(), dispose: vi.fn() };
    const create = vi.fn().mockResolvedValueOnce(first).mockResolvedValueOnce(second);
    (globalThis as { molstar?: unknown }).molstar = { Viewer: { create } };

    render(<MoleculeViewer pdbId="1ZNI" title="胰岛素" />);
    fireEvent.click(screen.getByRole("button", { name: /查看 3D 结构/ }));
    fireEvent.click(await screen.findByRole("button", { name: "重试" }));

    await vi.waitFor(() => expect(create).toHaveBeenCalledTimes(2));
    expect(first.dispose).toHaveBeenCalledTimes(1);
    expect(second.dispose).not.toHaveBeenCalled();
  });

  it("disposes a viewer that finishes creating after unmount", async () => {
    const viewer = { loadPdb: vi.fn(() => Promise.resolve()), dispose: vi.fn() };
    let finishCreate: (v: typeof viewer) => void = () => {};
    const create = vi.fn(() => new Promise<typeof viewer>((resolve) => (finishCreate = resolve)));
    (globalThis as { molstar?: unknown }).molstar = { Viewer: { create } };

    const { unmount } = render(<MoleculeViewer pdbId="1ZNI" title="胰岛素" />);
    fireEvent.click(screen.getByRole("button", { name: /查看 3D 结构/ }));
    await vi.waitFor(() => expect(create).toHaveBeenCalled());
    unmount();
    await act(async () => finishCreate(viewer));

    expect(viewer.dispose).toHaveBeenCalledTimes(1);
    expect(viewer.loadPdb).not.toHaveBeenCalled();
  });
});
