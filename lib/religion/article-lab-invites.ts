import type { LabInviteData } from "@/lib/lab-invite";

const RITUAL: LabInviteData = {
  href: "/religion/ritual-lab",
  label: "仪式结构实验室",
  tease: "用分离—阈限—聚合看一场公开仪礼。不是操作手册。",
};

const MAP: LabInviteData = {
  href: "/religion/world-map",
  label: "世界宗教示意地图",
  tease: "点一条传统，看它被放在哪条历史带子上。椭圆不是地球。",
};

const CANON: LabInviteData = {
  href: "/religion/canon-comparator",
  label: "经典开篇比较器",
  tease: "并置三段公有领域起句，看宇宙论怎样被写成句子。",
};

const SECULAR: LabInviteData = {
  href: "/religion/secularization-chart",
  label: "世俗化指标示意",
  tease: "切换参与、认同与制度席位。同一句「宗教在消退」测的往往不是同一件事。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "ritual-and-practice": RITUAL,
  "pilgrimage-and-sacred-space": RITUAL,
  "sacred-and-profane": RITUAL,
  "religious-experience": RITUAL,
  "scripture-and-canon": CANON,
  "translation-of-sacred-texts": CANON,
  "commentary-and-interpretation": CANON,
  "oral-and-written-transmission": CANON,
  "apocrypha-and-canon-contests": CANON,
  "myth-and-cosmos": CANON,
  "what-is-religion": MAP,
  "formation-of-world-religions": MAP,
  "empire-and-mission": MAP,
  "axial-age-religions": MAP,
  "comparing-religions": MAP,
  "religion-in-the-twentieth-century": MAP,
  "reform-and-revival": MAP,
  "secularization-debate": SECULAR,
  "atheism-and-nonreligion": SECULAR,
  "disenchantment-and-reenchantment": SECULAR,
  "civil-religion": SECULAR,
  "religion-and-science": SECULAR,
  "nones-plateau-after-rls": SECULAR,
  "global-religious-demography-switching": SECULAR,
  "climate-faith-publics": SECULAR,
  "christian-nationalism-measurement": SECULAR,
  "digital-religion-ai-authority": CANON,
  "cognitive-science-religion-replication": RITUAL,
  "religion-and-politics": MAP,
  "religion-and-violence": MAP,
  "religion-and-gender": MAP,
  "diaspora-and-conversion": MAP,
};

const BY_SECTION: Record<string, LabInviteData> = {
  "religion-foundations": RITUAL,
  "texts-and-canons": CANON,
  "religious-history": MAP,
  "comparative-religion": MAP,
  "religion-and-society": MAP,
  secularization: SECULAR,
  frontier: SECULAR,
};

export function religionLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? MAP;
}
