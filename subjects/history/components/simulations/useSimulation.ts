'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Scenario, Choice, SimulationState } from './types';

export function useSimulation(scenario: Scenario) {
  const [state, setState] = useState<SimulationState>({
    currentScenario: scenario,
    selectedChoice: null,
    phase: 'intro',
    consequenceIndex: 0,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startChoosing = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'choosing' }));
  }, []);

  const selectChoice = useCallback((choice: Choice) => {
    setState((prev) => ({
      ...prev,
      selectedChoice: choice,
      phase: 'consequences',
      consequenceIndex: 0,
    }));
  }, []);

  const advanceConsequence = useCallback(() => {
    setState((prev) => {
      if (!prev.selectedChoice) return prev;
      const nextIndex = prev.consequenceIndex + 1;
      if (nextIndex >= prev.selectedChoice.consequences.length) {
        return { ...prev, phase: 'complete' };
      }
      return { ...prev, consequenceIndex: nextIndex };
    });
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState({
      currentScenario: scenario,
      selectedChoice: null,
      phase: 'intro',
      consequenceIndex: 0,
    });
  }, [scenario]);

  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return { state, startChoosing, selectChoice, advanceConsequence, reset };
}
