// @vitest-environment happy-dom
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

// The entrance animation is irrelevant to navigation; a plain div keeps the
// ref and event props intact.
vi.mock("framer-motion", () => ({
  useReducedMotion: () => true,
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function MotionDiv(
      { children, ...props },
      ref
    ) {
      const domProps = { ...props } as Record<string, unknown>;
      delete domProps.initial;
      delete domProps.animate;
      delete domProps.transition;
      return (
        <div ref={ref} {...(domProps as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }),
  },
}));

import { GraphMinimap } from "../GraphMinimap";

afterEach(cleanup);

const worldBounds = { minX: -500, maxX: 1000, minY: 200, maxY: 1200 };

function renderMinimap(onNavigate: (x: number, y: number) => void) {
  render(
    <GraphMinimap
      nodes={[]}
      viewport={{ x: 0, y: 0, width: 100, height: 100 }}
      worldBounds={worldBounds}
      onNavigate={onNavigate}
    />
  );
  return screen.getByRole("button", { name: /图谱导航小地图/ });
}

describe("GraphMinimap keyboard activation", () => {
  it.each(["Enter", " "])("recentres on the world centre with %j, never NaN", (key) => {
    const onNavigate = vi.fn();
    const minimap = renderMinimap(onNavigate);

    fireEvent.keyDown(minimap, { key });

    expect(onNavigate).toHaveBeenCalledTimes(1);
    const [x, y] = onNavigate.mock.calls[0] as [number, number];
    expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
    expect(x).toBeCloseTo(250);
    expect(y).toBeCloseTo(700);
  });

  it("ignores other keys", () => {
    const onNavigate = vi.fn();
    fireEvent.keyDown(renderMinimap(onNavigate), { key: "a" });
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
