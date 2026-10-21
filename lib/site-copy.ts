import { SITE_TOTALS } from "./site-stats";
import { formatChineseCount } from "./format-count";

export const SITE_DOMAIN_COUNT_TEXT = formatChineseCount(SITE_TOTALS.domains);
export const SITE_DESCRIPTION = `整理${SITE_DOMAIN_COUNT_TEXT}个领域的文章、知识图谱与阅读路线，帮助你顺着概念之间的联系继续阅读。`;
export const CURIOSITY_DESCRIPTION = `横跨${SITE_DOMAIN_COUNT_TEXT}个学科的冷知识、跨学科巧合与「原来如此」时刻`;
