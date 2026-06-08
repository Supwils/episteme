export type GraphNodeType =
  | 'thinker'
  | 'school'
  | 'concept'
  | 'experiment'
  | 'question'
  | 'ism'
  | 'event'
  | 'figure'
  | 'era'
  | 'cosmos-tier'
  | 'physics-tier'
  | 'species'
  | 'scientist'
  | 'extinction'
  | 'economist'
  | 'theory'
  | 'theorist'
  | 'phenomenon';

export type GraphNode = {
  id: string;
  label: string;
  domain: 'philosophy' | 'history' | 'physics' | 'life-science' | 'economics' | 'psychology';
  type: GraphNodeType;
  slug: string;
  era?: string;
  year?: number;
  tags: string[];
  description: string;
  section?: string;
  url?: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  type: 'cross-reference' | 'temporal' | 'hierarchy' | 'domain-link';
  label?: string;
};
