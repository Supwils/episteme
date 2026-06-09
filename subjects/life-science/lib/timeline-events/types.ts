export type TimelineEvent = {
  id: string;
  era: string;
  event: string;
  detail: string;
  accent: string;
  category: "microorganisms" | "animals" | "plants" | "earth";
  significance: string;
  keyFigures: string[];
  context: {
    before: string;
    after: string;
  };
  connections: string[];
  openQuestions: string[];
  deepReading: {
    introduction: string;
    sections: { title: string; content: string[] }[];
    citations: {
      id: string;
      authors: string;
      year: number;
      title: string;
      journal: string;
      doi?: string;
    }[];
  };
};
