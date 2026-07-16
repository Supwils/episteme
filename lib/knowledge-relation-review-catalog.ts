import { buildKnowledgeRelationReviewView } from "./knowledge-relation-review";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";
import {
  CONFLUENCE_MULTIPARENT_RELEASE_META,
  CONFLUENCE_MULTIPARENT_RELEASE_TARGETS,
} from "@/subjects/knowledge-graph/data/confluence-prerequisite-release";
import { REVIEWED_LEARNING_RELATIONS } from "@/subjects/knowledge-graph/data/frontier-prerequisite-relations";

export function buildCatalogKnowledgeRelationReview(requestedKnownIds: readonly string[]) {
  return buildKnowledgeRelationReviewView(
    ALL_NODES,
    REVIEWED_LEARNING_RELATIONS,
    CONFLUENCE_MULTIPARENT_RELEASE_TARGETS,
    CONFLUENCE_MULTIPARENT_RELEASE_META,
    requestedKnownIds
  );
}
