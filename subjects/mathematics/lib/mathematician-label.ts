import { thinkerDisplayName } from "@/lib/mdx";
import { chineseNameBesideLatin } from "@/lib/reader-person-label";
import { getMathematicianBySlug } from "./mathematicians";

const HAN = /[一-鿿]/;

// People cited on a theorem who have no mathematician page. The string is the
// name that theorem already uses; the frontmatter slug stays the entity id.
const LABEL_WITHOUT_PAGE: Record<string, string> = {
  appel: "阿佩尔",
  banach: "巴拿赫",
  bayes: "贝叶斯",
  bernoulli: "伯努利",
  bolzano: "波尔查诺",
  brouwer: "布劳威尔",
  cantor: "康托尔",
  cook: "库克",
  green: "格林",
  hadamard: "阿达马",
  lagrange: "拉格朗日",
  laplace: "拉普拉斯",
  matiyasevich: "Matiyasevich",
  perelman: "佩雷尔曼",
  pythagoras: "毕达哥拉斯",
  stokes: "斯托克斯",
  taylor: "泰勒",
};

export function mathematicianDisplayName(slug: string): string {
  const registered = getMathematicianBySlug(slug);
  if (registered?.title) return registered.title;
  return LABEL_WITHOUT_PAGE[slug] ?? slug;
}

export function mathematicianPageHref(slug: string): string | null {
  return getMathematicianBySlug(slug) ? `/mathematics/mathematicians/${slug}` : null;
}

export function mathFigureLabel(id: string, articleText: string): string {
  if (HAN.test(id)) return id;
  const mathematician = mathematicianDisplayName(id);
  if (mathematician !== id) return mathematician;
  const thinker = thinkerDisplayName(id);
  if (thinker !== id) return thinker;
  const beside = chineseNameBesideLatin(articleText, id);
  if (beside !== null) return beside;
  // Not a person. The envelope paradox names this term in frontmatter, and the
  // body never writes it as 「期望值（expected value）」, so the pass above misses it.
  if (id === "expected_value") return "期望值";
  return id;
}
