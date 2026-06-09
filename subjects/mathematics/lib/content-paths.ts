import path from "node:path";
import { getDomainContentDir } from "@/lib/content-paths";

export const MATH_CONTENT_ROOT = getDomainContentDir("mathematics");

export const MATHEMATICIANS_DIR = path.join(MATH_CONTENT_ROOT, "mathematicians");
export const THEOREMS_DIR = path.join(MATH_CONTENT_ROOT, "theorems");
export const CONCEPTS_DIR = path.join(MATH_CONTENT_ROOT, "concepts");
export const DIALOGUES_DIR = path.join(MATH_CONTENT_ROOT, "dialogues");
export const PARADOXES_DIR = path.join(MATH_CONTENT_ROOT, "paradoxes");
