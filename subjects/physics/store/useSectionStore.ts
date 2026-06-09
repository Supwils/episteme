import { create } from "zustand";
import type { SectionId } from "@/subjects/physics/lib/section";
import { SECTIONS } from "@/subjects/physics/lib/section";
import type { AnyTierId, TransitionKind } from "@/subjects/physics/lib/tier";

/**
 * Cross-section navigation store. State shape is a superset of the
 * legacy useUniverseStore so existing call sites that read `currentTier`
 * or `transition` keep working without code changes.
 *
 * Design: docs/design/10-section-architecture.md §5
 */

type Transition = {
  active: boolean;
  from: AnyTierId | null;
  to: AnyTierId | null;
  kind: TransitionKind | null;
  /** 0..1 during the transition. */
  progress: number;
};

type State = {
  section: SectionId;
  currentTier: AnyTierId;
  /** Id of the object the user has focused (drillable target). */
  targetObjectId: string | null;
  transition: Transition;
  /** Active page within a physics tier (0-indexed). Resets on tier change. */
  physicsPage: number;

  setSection: (section: SectionId, tier?: AnyTierId) => void;
  setTier: (tier: AnyTierId) => void;
  setTarget: (id: string | null) => void;
  startTransition: (from: AnyTierId, to: AnyTierId, kind: TransitionKind) => void;
  setTransitionProgress: (progress: number) => void;
  finishTransition: () => void;
  cancelTransition: () => void;
  setPhysicsPage: (page: number) => void;
};

const IDLE_TRANSITION: Readonly<Transition> = Object.freeze({
  active: false,
  from: null,
  to: null,
  kind: null,
  progress: 0,
});

export const useSectionStore = create<State>((set) => ({
  section: "universe",
  currentTier: "T0",
  targetObjectId: null,
  transition: IDLE_TRANSITION,
  physicsPage: 0,

  setSection: (section, tier) =>
    set((state) => {
      const cfg = SECTIONS[section];
      const targetTier =
        tier ?? (cfg.isOwnedTier(state.currentTier) ? state.currentTier : cfg.defaultTier);
      return { section, currentTier: targetTier as AnyTierId, physicsPage: 0 };
    }),

  setTier: (currentTier) =>
    set((state) => {
      // If the tier belongs to another section, auto-switch section too
      const owningSection = SECTIONS.physics.isOwnedTier(currentTier) ? "physics" : "universe";
      return owningSection === state.section
        ? { currentTier, transition: IDLE_TRANSITION, physicsPage: 0 }
        : { section: owningSection, currentTier, transition: IDLE_TRANSITION, physicsPage: 0 };
    }),

  setTarget: (targetObjectId) => set({ targetObjectId }),

  startTransition: (from, to, kind) =>
    set({ transition: { active: true, from, to, kind, progress: 0 } }),

  setTransitionProgress: (progress) =>
    set((state) => ({
      transition: state.transition.active ? { ...state.transition, progress } : state.transition,
    })),

  finishTransition: () =>
    set((state) => {
      if (!state.transition.active) return state;
      return {
        currentTier: state.transition.to ?? state.currentTier,
        transition: IDLE_TRANSITION,
        physicsPage: 0,
      };
    }),

  cancelTransition: () => set({ transition: IDLE_TRANSITION }),

  setPhysicsPage: (physicsPage) => set({ physicsPage }),
}));
