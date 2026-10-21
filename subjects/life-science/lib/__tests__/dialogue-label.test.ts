import { describe, expect, it } from "vitest";
import { getDialogueBySlug } from "@/subjects/life-science/lib/dialogues";
import { dialogueParticipantLabel } from "@/subjects/life-science/lib/dialogue-label";

function labels(slug: string): string[] {
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) throw new Error(slug);
  return dialogue.participants.map((id) =>
    dialogueParticipantLabel(id, dialogue.participants, dialogue.title, dialogue.body)
  );
}

describe("dialogueParticipantLabel", () => {
  it("uses the title's own Chinese side when the id has no person page", () => {
    expect(labels("franklin-wilkins")).toEqual(["罗莎琳德·富兰克林", "威尔金斯"]);
    expect(labels("mcclintock-mainstream")).toEqual(["芭芭拉·麦克林托克", "主流"]);
    expect(labels("mendel-morgan")).toEqual(["格雷戈尔·孟德尔", "摩尔根"]);
    expect(labels("wilson-mayr")).toEqual(["爱德华·威尔逊", "迈尔"]);
  });

  it("keeps a registered scientist name ahead of the shorter title", () => {
    expect(labels("darwin-lyell")[0]).toBe("查尔斯·达尔文");
  });
});
