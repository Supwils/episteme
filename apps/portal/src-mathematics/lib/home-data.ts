import { getAllMathematicians } from "./mathematicians";
import { getAllTheorems } from "./theorems";
import { getAllMathConcepts } from "./concepts";
import { getAllMathDialogues } from "./dialogues";
import { getAllMathEras } from "./eras";

export function getMathHomeStats() {
  const mathematicians = getAllMathematicians();
  const theorems = getAllTheorems();
  const concepts = getAllMathConcepts();
  const dialogues = getAllMathDialogues();
  const eras = getAllMathEras();

  return {
    mathematicianCount: mathematicians.length,
    theoremCount: theorems.length,
    conceptCount: concepts.length,
    dialogueCount: dialogues.length,
    eraCount: eras.length,
  };
}

export function getFeaturedMathematicians(limit = 4) {
  return getAllMathematicians()
    .filter((m) => m.status === "published")
    .slice(0, limit);
}

export function getFeaturedTheorems(limit = 4) {
  return getAllTheorems()
    .filter((t) => t.status === "published")
    .slice(0, limit);
}
