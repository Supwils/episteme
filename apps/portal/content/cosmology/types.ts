export type DataCard = {
  label: string;
  latinLabel?: string;
  value: string;
  hint?: string;
};

export type NarrativeSection = {
  heading: string;
  body: string[];
};

export type SourceRef = {
  label: string;
  url: string;
  kind: "paper" | "agency" | "encyclopedia";
};

export type SceneMarker = {
  id: string;
  name: { primary: string; latin: string };
  position: [number, number, number];
  description: string;
  data?: Array<{ label: string; value: string }>;
  color?: string;
  size?: number;
};

export type TierContent = {
  tier: string;
  name: { primary: string; latin: string };
  tagline: string;
  whisper?: string;
  dataCards: DataCard[];
  narrative: NarrativeSection[];
  sources: SourceRef[];
  markers?: SceneMarker[];
  discussionQuestions?: string[];
};
