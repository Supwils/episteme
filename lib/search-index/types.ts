export interface SearchDocument {
  id: string;
  title: string;
  subtitle: string;
  /** Person ids and other recall tokens. Indexed, never shown. */
  aliases?: string;
  content: string;
  section: string;
  url: string;
  type:
    | "thinker"
    | "school"
    | "ism"
    | "concept"
    | "question"
    | "experiment"
    | "dialogue"
    | "species"
    | "scientist"
    | "extinction"
    | "event"
    | "figure"
    | "simulation"
    | "article"
    | "cosmos"
    | "physics"
    | "era"
    | "timeline"
    | "page"
    | "economist"
    | "theory"
    | "phenomenon"
    | "disorder"
    | "psychologist"
    | "knowledgeBase"
    | "frontier"
    | "entry"
    | "curiosity";
}
