export interface Choice {
  id: string;
  label: string;
  description: string;
  consequences: Consequence[];
}

export interface Consequence {
  year: string;
  event: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Scenario {
  id: string;
  title: string;
  year: string;
  description: string;
  context: string;
  choices: Choice[];
}

export interface SimulationState {
  currentScenario: Scenario;
  selectedChoice: Choice | null;
  phase: 'intro' | 'choosing' | 'consequences' | 'complete';
  consequenceIndex: number;
}
