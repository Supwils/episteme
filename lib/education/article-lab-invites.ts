import type { LabInviteData } from "@/lib/lab-invite";

const SPACING: LabInviteData = {
  href: "/education/spacing-lab",
  label: "遗忘与间隔练习示意",
  tease: "对照集中与间隔。即时更熟不是延迟还在。",
};

const TALK: LabInviteData = {
  href: "/education/classroom-talk-lab",
  label: "课堂互动结构图",
  tease: "IRE 与长等待。点一个话轮，不是课堂管理话术。",
};

const SCORE: LabInviteData = {
  href: "/education/score-decomposer",
  label: "测验分数分解器",
  tease: "把示意分数拆成机会、介质与构念。不是真实测量工具。",
};

const PATH: LabInviteData = {
  href: "/education/adaptive-path-lab",
  label: "自适应路径示意",
  tease: "像家教，还是系统记录了什么。绿灯是推断。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "what-is-learning": SPACING,
  "teaching-is-not-pouring": SPACING,
  "memory-spacing-and-transfer": SPACING,
  "desirable-difficulty-is-a-condition": SPACING,
  "worked-examples-and-self-explanation": SPACING,
  "working-memory-and-load": SPACING,
  "metacognition-is-a-judgment": SPACING,
  "randomized-trials-in-education": SPACING,
  "classroom-as-time": TALK,
  "lesson-study-is-professional-knowledge": TALK,
  "curriculum-as-selection": TALK,
  "tracking-and-grouping": TALK,
  "bilingual-education-is-a-design": TALK,
  "vocational-schooling-is-a-track": TALK,
  "school-is-an-institution": TALK,
  "early-childhood-is-an-institution": TALK,
  "homework-allocates-family-time": TALK,
  "teacher-education-is-preparation": TALK,
  "assessment-as-inference": SCORE,
  "validity-is-an-argument": SCORE,
  "high-stakes-exams-are-institutions": SCORE,
  "formative-assessment-in-use": SCORE,
  "funding-formulas-and-teachability": SCORE,
  "inclusive-education-and-disability": SCORE,
  "pisa-is-not-civilization": SCORE,
  "shadow-education-is-a-market": SCORE,
  "what-edtech-records": PATH,
  "adaptive-systems-are-not-tutors": PATH,
  "learning-analytics-are-inferences": PATH,
  "teacher-labor-and-platforms": PATH,
  "generative-models-change-conditions": PATH,
  "open-resources-are-not-neutral": PATH,
  "covid-learning-loss-is-not-one-curve": SCORE,
  "science-of-reading-statutes": TALK,
  "generative-assessment-after-2022": PATH,
  "ai-act-and-education-inference": PATH,
};

const BY_SECTION: Record<string, LabInviteData> = {
  "learning-foundations": SPACING,
  "cognition-and-memory": SPACING,
  "curriculum-and-teaching": TALK,
  "assessment-and-equity": SCORE,
  "education-technology": PATH,
  "comparison-and-policy": SCORE,
  frontier: PATH,
};

export function educationLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? SPACING;
}
