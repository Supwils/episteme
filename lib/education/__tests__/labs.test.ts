import { describe, expect, it } from "vitest";
import { spacingById, SPACING_SCHEDULES } from "../spacing-schedules";
import { talkModeById, TALK_TURNS } from "../classroom-turns";
import { SCORE_PARTS, scoreCaseById, scorePartValue } from "../score-parts";
import { pathLensById, pathNodeById, PATH_NODES } from "../adaptive-paths";
import { educationLabInvite } from "../article-lab-invites";

describe("spacing schedules", () => {
  it("keeps massed higher on immediate performance and lower on delay", () => {
    const massed = spacingById("massed");
    const spaced = spacingById("spaced");
    expect(massed.immediate).toBeGreaterThan(spaced.immediate);
    expect(spaced.delayed).toBeGreaterThan(massed.delayed);
    expect(SPACING_SCHEDULES).toHaveLength(2);
    expect(massed.tease).toContain("即时表现");
  });
});

describe("classroom turns", () => {
  it("keeps IRE as three short turns and wait as a blank beat", () => {
    expect(TALK_TURNS.ire.map((turn) => turn.id)).toEqual(["i", "r", "e"]);
    expect(TALK_TURNS.wait.some((turn) => turn.speaker === "空白")).toBe(true);
    expect(talkModeById("wait").tease).toContain("展开");
  });
});

describe("score parts", () => {
  it("lets schematic totals equal the four parts and stay non-diagnostic", () => {
    const alpha = scoreCaseById("alpha");
    const beta = scoreCaseById("beta");
    const sum = (id: "alpha" | "beta") =>
      SCORE_PARTS.reduce((total, part) => total + scorePartValue(part, id), 0);
    expect(sum("alpha")).toBe(alpha.total);
    expect(sum("beta")).toBe(beta.total);
    expect(SCORE_PARTS.some((part) => part.id === "construct")).toBe(true);
  });
});

describe("adaptive path", () => {
  it("marks the green light as an inference in the system lens", () => {
    expect(pathLensById("system").tease).toContain("模型推断");
    expect(pathNodeById("green").system).toContain("不是已经学会");
    expect(PATH_NODES.map((node) => node.id)).toEqual(["start", "branch", "green", "next"]);
  });
});

describe("article lab invites", () => {
  it("routes memory, talk, scores, and adaptive articles to matching labs", () => {
    expect(educationLabInvite("learning-foundations", "what-is-learning").href).toBe(
      "/education/spacing-lab"
    );
    expect(educationLabInvite("cognition-and-memory", "memory-spacing-and-transfer").href).toBe(
      "/education/spacing-lab"
    );
    expect(educationLabInvite("curriculum-and-teaching", "classroom-as-time").href).toBe(
      "/education/classroom-talk-lab"
    );
    expect(educationLabInvite("assessment-and-equity", "assessment-as-inference").href).toBe(
      "/education/score-decomposer"
    );
    expect(educationLabInvite("education-technology", "adaptive-systems-are-not-tutors").href).toBe(
      "/education/adaptive-path-lab"
    );
    expect(educationLabInvite("comparison-and-policy", "pisa-is-not-civilization").href).toBe(
      "/education/score-decomposer"
    );
  });
});
