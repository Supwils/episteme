import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CLUSTER_PIGMENTS, PALETTE, contrastRatio, type ThemeName } from "../palette";
import { DOMAIN_CLUSTERS } from "@/lib/domain-clusters";

const THEMES: ThemeName[] = ["dark", "light"];
const TEXT = 4.5;
const GRAPHIC = 3;

function surfaces(theme: ThemeName): [string, string][] {
  return Object.entries(PALETTE[theme].surface);
}

function expectOnEverySurface(theme: ThemeName, label: string, color: string, min: number) {
  for (const [surface, background] of surfaces(theme)) {
    const ratio = contrastRatio(color, background);
    expect(ratio, `${theme} ${label} ${color} on ${surface} ${background}`).toBeGreaterThanOrEqual(
      min
    );
  }
}

describe("palette contrast", () => {
  it("computes WCAG ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#777777")).toBe(1);
  });

  it.each(THEMES)("keeps every %s text ink readable on every surface", (theme) => {
    for (const [role, color] of Object.entries(PALETTE[theme].fg)) {
      expectOnEverySurface(theme, `fg-${role}`, color, TEXT);
    }
    for (const instrument of ["brass", "verdigris", "cinnabar"] as const) {
      expectOnEverySurface(theme, `${instrument}-ink`, PALETTE[theme][instrument].ink, TEXT);
      expectOnEverySurface(theme, instrument, PALETTE[theme][instrument].mark, GRAPHIC);
    }
  });

  it.each(THEMES)("keeps every %s cluster pigment legible as a mark and as text", (theme) => {
    for (const [cluster, pigment] of Object.entries(CLUSTER_PIGMENTS)) {
      expectOnEverySurface(theme, `${cluster} mark`, pigment.mark[theme], GRAPHIC);
      expectOnEverySurface(theme, `${cluster} ink`, pigment.ink[theme], TEXT);
    }
  });

  it("names one pigment per cluster", () => {
    expect(Object.keys(CLUSTER_PIGMENTS).sort()).toEqual(DOMAIN_CLUSTERS.map((c) => c.id).sort());
    expect(new Set(Object.values(CLUSTER_PIGMENTS).map((p) => p.mark.dark)).size).toBe(6);
  });
});

// The same token set is restated in the portal sheet and in each domain sheet
// that compiles its own @theme; these files must only ever hold palette values.
const TOKEN_SHEETS = [
  "app/globals.css",
  "app/domain-shared.css",
  "app/economics/globals.css",
  "app/mathematics/globals.css",
  "app/philosophy/globals.css",
  "app/psychology/globals.css",
];

function declaredValues(css: string, property: string): string[] {
  const pattern = new RegExp(`${property}:\\s*(#[0-9a-fA-F]{6})\\b`, "g");
  return [...css.matchAll(pattern)].map((match) => match[1]!.toLowerCase());
}

describe("palette ↔ CSS token sheets", () => {
  const roles = [
    ...(["deep", "base", "panel", "floating"] as const).map(
      (role) => [`--color-bg-${role}`, (t: ThemeName) => PALETTE[t].surface[role]] as const
    ),
    ...(["primary", "secondary", "muted", "disabled"] as const).map(
      (role) => [`--color-fg-${role}`, (t: ThemeName) => PALETTE[t].fg[role]] as const
    ),
  ];

  it.each(TOKEN_SHEETS)("%s restates only palette values", (sheet) => {
    // The print remap (paper white) is the one sanctioned exception.
    const css = readFileSync(path.join(process.cwd(), sheet), "utf8").split(
      "/* Print token remap"
    )[0]!;
    for (const [property, valueFor] of roles) {
      const allowed = new Set(THEMES.map(valueFor));
      for (const value of declaredValues(css, property)) {
        expect(allowed, `${sheet} ${property}: ${value}`).toContain(value);
      }
    }
  });

  it("declares every instrument color and pigment on the portal root", () => {
    const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    for (const instrument of ["brass", "verdigris", "cinnabar"] as const) {
      for (const theme of THEMES) {
        expect(declaredValues(css, `--${instrument}`)).toContain(PALETTE[theme][instrument].mark);
        expect(declaredValues(css, `--${instrument}-ink`)).toContain(
          PALETTE[theme][instrument].ink
        );
      }
    }
    for (const [cluster, pigment] of Object.entries(CLUSTER_PIGMENTS)) {
      for (const theme of THEMES) {
        expect(declaredValues(css, `--pigment-${cluster}`)).toContain(pigment.mark[theme]);
        expect(declaredValues(css, `--pigment-${cluster}-ink`)).toContain(pigment.ink[theme]);
      }
    }
  });
});

// Each domain restyles --color-accent-gold for its links and emphasized text,
// so every value must read as text on every surface of its theme.
describe("domain accent text colors", () => {
  const sheets = readdirSync(path.join(process.cwd(), "app"))
    .map((dir) => path.join("app", dir, "globals.css"))
    .filter((file) => existsSync(path.join(process.cwd(), file)));

  it.each(sheets)("%s keeps its accent at ≥ 4.5:1", (sheet) => {
    const css = readFileSync(path.join(process.cwd(), sheet), "utf8");
    for (const block of css.split(/(?=\n[^\n{}]*\{)/)) {
      const selector = block.split("{")[0]!.trim();
      const theme: ThemeName = /light/.test(selector) ? "light" : "dark";
      for (const value of declaredValues(block, "--color-accent-gold")) {
        expectOnEverySurface(theme, `${sheet} ${selector} accent`, value, TEXT);
      }
    }
  });
});

// Human history keeps its own parchment token table instead of PALETTE, and
// its card surfaces are translucent, so each is composited over --bg first.
describe("human-history parchment tokens", () => {
  const css = readFileSync(path.join(process.cwd(), "app/human-history/styles/base.css"), "utf8");
  const blocks: [ThemeName, string][] = [
    ["dark", css.split(".light .human-history-root")[0]!],
    ["light", css.split(".light .human-history-root")[1]!.split("}")[0]!],
  ];

  function token(block: string, name: string): string {
    const match = block.match(new RegExp(`--${name}:\\s*([^;]+);`));
    expect(match, `--${name}`).not.toBeNull();
    return match![1]!.trim();
  }

  function opaque(color: string, backdrop: string): string {
    const rgba = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (!rgba) return color;
    const alpha = Number(rgba[4]);
    const under = [1, 3, 5].map((i) => parseInt(backdrop.slice(i, i + 2), 16));
    const mixed = [1, 2, 3].map((i) =>
      Math.round(Number(rgba[i]) * alpha + under[i - 1]! * (1 - alpha))
    );
    return `#${mixed.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }

  it.each(blocks)("keeps %s parchment inks at ≥ 4.5:1 on every card surface", (theme, block) => {
    const backdrop = token(block, "bg");
    for (const surface of ["bg", "bg-card", "bg-card-hover", "bg-elev"]) {
      const background = opaque(token(block, surface), backdrop);
      for (const ink of ["parchment", "parchment-dim", "parchment-mute"]) {
        const ratio = contrastRatio(token(block, ink), background);
        expect(ratio, `${theme} --${ink} on --${surface}`).toBeGreaterThanOrEqual(TEXT);
      }
    }
  });
});
