export type HistoryHomeTimelineEvent = {
  year: number;
  title: string;
  desc: string;
};

export type HistoryHomeFigure = {
  name: string;
  title: string;
  desc: string;
};

export const HISTORY_HOME_COUNTS: {
  events: number;
  figures: number;
};
export const HOME_TIMELINE_EVENTS: HistoryHomeTimelineEvent[];
export const HOME_FEATURED_FIGURES: HistoryHomeFigure[];
export function formatHomeYear(year: number): string;
