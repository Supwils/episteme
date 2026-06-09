export interface SearchDocument {
  id: string;
  title: string;
  subtitle: string;
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
    | "knowledgeBase";
}
