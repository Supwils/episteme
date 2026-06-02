import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isValidHwTheme, type HandwrittenTheme } from "@/lib/handwritten-theme";

export type PhysicsPalette = "paper" | "night";
export type UniverseBackdrop = "stars" | "grid";

type State = {
  theme: HandwrittenTheme;
  flourishesEnabled: boolean;
  /** Physics-only palette switch. Default `paper` = warm light theme;
   *  `night` forces the universe-style dark theme via data-force-night. */
  physicsPalette: PhysicsPalette;
  /** Universe handwritten background — star scatter or engineering grid. */
  universeBackdrop: UniverseBackdrop;
  setTheme: (t: HandwrittenTheme) => void;
  toggleTheme: () => void;
  setFlourishes: (b: boolean) => void;
  setPhysicsPalette: (p: PhysicsPalette) => void;
  setUniverseBackdrop: (b: UniverseBackdrop) => void;
};

export const useHandwrittenStore = create<State>()(
  persist(
    (set) => ({
      theme: "night",
      flourishesEnabled: true,
      physicsPalette: "paper",
      universeBackdrop: "stars",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "night" ? "day" : "night" })),
      setFlourishes: (b) => set({ flourishesEnabled: b }),
      setPhysicsPalette: (physicsPalette) => set({ physicsPalette }),
      setUniverseBackdrop: (universeBackdrop) => set({ universeBackdrop }),
    }),
    {
      name: "universe-physics-handwritten",
      partialize: (s) => ({
        theme: s.theme,
        flourishesEnabled: s.flourishesEnabled,
        physicsPalette: s.physicsPalette,
        universeBackdrop: s.universeBackdrop,
      }),
      // ignore corrupted persisted state
      merge: (persisted, current) => {
        const p = persisted as Partial<State> | undefined;
        return {
          ...current,
          ...(p && isValidHwTheme(p.theme) ? { theme: p.theme } : {}),
          ...(p && typeof p.flourishesEnabled === "boolean"
            ? { flourishesEnabled: p.flourishesEnabled }
            : {}),
          ...(p && (p.physicsPalette === "paper" || p.physicsPalette === "night")
            ? { physicsPalette: p.physicsPalette }
            : {}),
          ...(p && (p.universeBackdrop === "stars" || p.universeBackdrop === "grid")
            ? { universeBackdrop: p.universeBackdrop }
            : {}),
        };
      },
    },
  ),
);
