import { create } from "zustand";

export interface ActiveNarration {
  /** Stable id so a button knows whether it is the one currently playing. */
  id: string;
  title: string;
  script: string;
  audioUrl: string | null;
}

interface NarrationStore {
  active: ActiveNarration | null;
  open: (n: ActiveNarration) => void;
  close: () => void;
}

/** Holds which article's 讲解 is currently loaded into the global player. */
export const useNarrationStore = create<NarrationStore>((set) => ({
  active: null,
  open: (active) => set({ active }),
  close: () => set({ active: null }),
}));
