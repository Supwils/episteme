import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadEngine } from "../engine";
import type { SearchIndexArtifact } from "../types";

const artifact = JSON.parse(
  readFileSync("public/search-index.json", "utf-8")
) as SearchIndexArtifact;
const engine = loadEngine(artifact);

/**
 * Hand-reviewed reader intents complement the generated recall sample. These
 * pin cross-domain, bilingual and real-object queries whose expected article
 * is unambiguous; additions should represent a real user question, not merely
 * copy a complete title.
 */
const QUALITY_CASES = [
  ["Loper Bright Chevron", "/law/judgment-analyses/loper-bright-chevron-deference-overruled"],
  ["挑战者号 密封失效", "/engineering/frontiers/challenger-o-ring-organizational-failure"],
  ["宫娥 画外观看", "/arts/methods/las-meninas-close-reading"],
  ["Wug 儿童 没听过的词", "/linguistics/acquisition-and-mind/wug-test-morphology-analysis"],
  [
    "Coleman Report 学校 家庭 同伴",
    "/sociology/methods/coleman-report-educational-opportunity-analysis",
  ],
  ["因果推断 可信性革命", "/economics/frontier/causal-inference-credibility-revolution"],
  ["合成控制 未发生世界", "/political-science/methods/synthetic-control-method"],
  ["碳税 总量交易", "/economics/debates/carbon-tax-vs-cap-and-trade"],
  ["知情同意 共同决策", "/medicine/ethics/informed-consent-and-shared-decision-making"],
  ["群论 对称", "/mathematics/knowledge-base/代数--群论与对称"],
  ["量子纠缠", "/universe-physics/knowledge-base/量子物理--量子纠缠"],
  ["板块构造", "/earth-science/processes/plate-tectonics"],
  ["CRISPR 走向临床", "/life-science/frontier/crispr-clinical-revolution"],
  ["零知识证明 隐私计算", "/computer-science/frontier/zero-knowledge-proofs"],
  ["生成艺术 作者性", "/arts/methods/generative-art-and-ai"],
  ["社会分层 流动", "/sociology/concepts/social-stratification"],
  ["第一语言习得", "/linguistics/acquisition-and-mind/first-language-acquisition"],
  ["斯坦福监狱实验", "/psychology/experiments/stanford-prison"],
  ["黎曼猜想", "/mathematics/theorems/riemann-hypothesis"],
] as const;

describe("hand-reviewed search quality corpus", () => {
  for (const [query, expectedUrl] of QUALITY_CASES) {
    it(`keeps “${query}” in the first five results`, () => {
      const urls = engine.search(query, 5).map((hit) => hit.url);
      expect(urls, `${query}: ${urls.join(", ")}`).toContain(expectedUrl);
    });
  }
});
