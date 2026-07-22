import { KNOWLEDGE_DOMAINS } from "../lib/knowledge-continuum.ts";
import {
  LAUNCHED_SUBJECT_CANDIDATE_IDS,
  RANKED_SUBJECT_CANDIDATES,
  SUBJECT_SCORE_DIMENSIONS,
  RECOMMENDED_SUBJECT_CANDIDATE,
  calculateCandidateScore,
} from "../lib/subject-candidate-matrix.ts";
import {
  ALL_LINGUISTICS_ARTICLES,
  LINGUISTICS_GLOBAL_COVERAGE,
  LINGUISTICS_SECTIONS,
  LINGUISTICS_VISUALIZATIONS,
} from "../lib/linguistics-subject-plan.ts";

const issues: string[] = [];
const domainIds = new Set(Object.keys(KNOWLEDGE_DOMAINS));

for (const candidate of RANKED_SUBJECT_CANDIDATES) {
  const levels = candidate.learningSpine.map((stage) => stage.level).join(",");
  if (levels !== "1,2,3,4,5") issues.push(`${candidate.id}: incomplete L1-L5 spine`);
  if (candidate.releaseArticleCount < 30 || candidate.releaseArticleCount > 50) {
    issues.push(`${candidate.id}: release size must be 30-50 articles`);
  }
  if (candidate.visualizations.length < 3 || candidate.visualizations.length > 5) {
    issues.push(`${candidate.id}: release must include 3-5 visualizations`);
  }
  for (const domain of candidate.bridgeDomains) {
    if (!domainIds.has(domain)) issues.push(`${candidate.id}: unknown bridge domain ${domain}`);
  }
}

const linguisticsCandidate = RANKED_SUBJECT_CANDIDATES.find(
  (candidate) => candidate.id === "linguistics"
);
if (!linguisticsCandidate) {
  issues.push("linguistics: missing candidate record");
} else if (ALL_LINGUISTICS_ARTICLES.length !== linguisticsCandidate.releaseArticleCount) {
  issues.push("linguistics: article inventory does not match the candidate matrix");
}

const articleSlugs = new Set(ALL_LINGUISTICS_ARTICLES.map((article) => article.slug));
if (articleSlugs.size !== ALL_LINGUISTICS_ARTICLES.length) {
  issues.push("linguistics: duplicate article slugs");
}
for (const visualization of LINGUISTICS_VISUALIZATIONS) {
  for (const slug of visualization.prerequisiteSlugs) {
    if (!articleSlugs.has(slug)) issues.push(`${visualization.id}: missing prerequisite ${slug}`);
  }
}

console.log("New Subject Candidate Audit\n");
console.log("Weighted dimensions:");
for (const dimension of Object.values(SUBJECT_SCORE_DIMENSIONS)) {
  console.log(`  ${dimension.label}: ${(dimension.weight * 100).toFixed(0)}%`);
}
console.log("\nCandidate ranking:");
RANKED_SUBJECT_CANDIDATES.forEach((candidate, index) => {
  const status = LAUNCHED_SUBJECT_CANDIDATE_IDS.has(candidate.id) ? "launched" : "candidate";
  console.log(
    `  ${index + 1}. ${candidate.label}: ${calculateCandidateScore(candidate.scores).toFixed(2)}/5, ${candidate.bridgeDomains.length} bridges, ${candidate.releaseArticleCount} articles, ${candidate.visualizations.length} visualizations [${status}]`
  );
});
console.log("\nLaunched subject: 语言学");
console.log(`  Sections: ${LINGUISTICS_SECTIONS.length}`);
console.log(`  Articles: ${ALL_LINGUISTICS_ARTICLES.length}`);
console.log(`  Visualizations: ${LINGUISTICS_VISUALIZATIONS.length}`);
console.log(`  Global coverage clusters: ${LINGUISTICS_GLOBAL_COVERAGE.length}`);
console.log(`\nRecommended next launch: ${RECOMMENDED_SUBJECT_CANDIDATE.label}`);
console.log(`  Sections: ${RECOMMENDED_SUBJECT_CANDIDATE.releaseSections.length}`);
console.log(`  Articles: ${RECOMMENDED_SUBJECT_CANDIDATE.releaseArticleCount}`);
console.log(`  Visualizations: ${RECOMMENDED_SUBJECT_CANDIDATE.visualizations.length}`);
console.log(
  `  Global coverage clusters: ${RECOMMENDED_SUBJECT_CANDIDATE.globalCoverageCommitments.length}`
);
console.log(`  Launch gate: ${RECOMMENDED_SUBJECT_CANDIDATE.launchGate}`);

if (issues.length > 0) {
  console.error(`\nAudit failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exitCode = 1;
} else {
  console.log(
    "\nAudit passed: candidate constraints, launched-subject status, and the next recommendation are internally consistent."
  );
}
