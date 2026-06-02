/* JS modules from human-history Vite app — declarations for TS interop */

declare module "@/src-history/data/events" {
  export const EVENTS: {
    year: number;
    title: string;
    desc: string;
    longDesc: string;
    era: string;
    region: string;
    cat: string;
    references: string[];
  }[];
}

declare module "@/src-history/data/figures" {
  export const FIGURES: {
    name: string;
    title: string;
    desc: string;
    longDesc: string;
    era: string;
    region: string;
    born: string;
    death: string;
    achievements: string[];
  }[];
}

declare module "@/src-history/data/scholarly-titles" {
  export const SCHOLARLY_TITLES: Set<string>;
}

declare module "@/src-history/data/atlas-content" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const ATLAS_ERAS: any[];
}

declare module "@/src-history/page-renderers/figures" {
  export function renderFigures(): void;
  export function cleanupFigures(): void;
}

declare module "@/src-history/page-renderers/timeline" {
  export function renderTimeline(): void;
  export function cleanupTimeline(): void;
}

declare module "@/src-history/page-renderers/home" {
  export function renderHome(): void;
  export function cleanupHome(): void;
}

declare module "@/src-history/page-renderers/map" {
  export function renderMap(): void;
  export function cleanupMap(): void;
}

declare module "@/src-history/page-renderers/graph" {
  export function renderGraph(): void;
  export function cleanupGraph(): void;
}

declare module "@/src-history/page-renderers/scholarly" {
  export function renderScholarly(): void;
  export function cleanupScholarly(): void;
}

declare module "@/src-history/page-renderers/lessons" {
  export function renderLessons(): void;
  export function cleanupLessons(): void;
}

declare module "@/src-history/components/PageWrapper" {
  import type { ComponentType, ReactNode } from "react";
  interface PageWrapperProps {
    render: (app: unknown) => Promise<(() => void) | void>;
    children?: ReactNode;
  }
  const PageWrapper: ComponentType<PageWrapperProps>;
  export default PageWrapper;
}

declare module "@/src-history/features/atlas/atlas-geometry" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function scaleValue(value: any, scaleRatio: any): number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function hitTestNodes(nodes: any, mx: any, my: any, radius: any, scaleRatio: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function isNearNodes(nodes: any, mx: any, my: any, radius: any, scaleRatio: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function getNodeBounds(nodes: any, scaleRatio: any): any;
}

declare module "@/src-history/components/atlas/atlas-renderer" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function drawMain(...args: any[]): void;
}
