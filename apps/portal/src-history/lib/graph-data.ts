import { ERAS } from '@/content/human-history/data/eras';
import { EVENTS } from '@/content/human-history/data/events';
import { FIGURES } from '@/content/human-history/data/figures';

export type HistoryNodeType = 'event' | 'figure' | 'era';

export type HistoryGraphNode = {
  id: string;
  label: string;
  type: HistoryNodeType;
  slug: string;
  era?: string;
  year?: number;
  tags: string[];
  description: string;
  region?: string;
};

export type HistoryGraphEdge = {
  source: string;
  target: string;
  type: 'figure-event' | 'era-event' | 'era-figure' | 'temporal' | 'era-seq';
  label?: string;
};

interface EraRecord {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  desc: string;
  highlights: string[];
  color?: string;
}

interface EventRecord {
  year: number;
  title: string;
  desc: string;
  era: string;
  region: string;
  cat: string;
  references?: string[];
}

interface FigureRecord {
  name: string;
  birth: number;
  death: number | null;
  desc: string;
  era: string;
  region: string;
  domain: string;
  impact: string[];
}

const FIGURE_EVENT_LINKS: { figure: string; eventTitle: string }[] = [
  { figure: '孔子', eventTitle: '春秋时期' },
  { figure: '老子', eventTitle: '春秋时期' },
  { figure: '孟子', eventTitle: '春秋时期' },
  { figure: '释迦牟尼', eventTitle: '释迦牟尼诞生' },
  { figure: '秦始皇', eventTitle: '秦统一六国' },
  { figure: '亚历山大大帝', eventTitle: '亚历山大东征' },
  { figure: '凯撒', eventTitle: '罗马共和国' },
  { figure: '柏拉图', eventTitle: '罗马共和国' },
  { figure: '亚里士多德', eventTitle: '亚历山大东征' },
  { figure: '蔡伦', eventTitle: '蔡伦改进造纸' },
  { figure: '唐太宗', eventTitle: '唐朝建立' },
  { figure: '武则天', eventTitle: '唐朝建立' },
  { figure: '穆罕默德', eventTitle: '阿拔斯王朝' },
  { figure: '伊本·西那', eventTitle: '阿拔斯王朝' },
  { figure: '成吉思汗', eventTitle: '蒙古帝国' },
  { figure: '曼萨·穆萨', eventTitle: '黑死病' },
  { figure: '郑和', eventTitle: '蒙古帝国' },
  { figure: '哥伦布', eventTitle: '哥伦布发现新大陆' },
  { figure: '达芬奇', eventTitle: '古腾堡印刷术' },
  { figure: '哥白尼', eventTitle: '日心说' },
  { figure: '莎士比亚', eventTitle: '宗教改革' },
  { figure: '伽利略', eventTitle: '日心说' },
  { figure: '牛顿', eventTitle: '牛顿力学' },
  { figure: '洛克', eventTitle: '美国独立' },
  { figure: '伏尔泰', eventTitle: '法国大革命' },
  { figure: '卢梭', eventTitle: '法国大革命' },
  { figure: '拿破仑', eventTitle: '法国大革命' },
  { figure: '贝多芬', eventTitle: '法国大革命' },
  { figure: '马克思', eventTitle: '《共产党宣言》' },
  { figure: '恩格斯', eventTitle: '《共产党宣言》' },
  { figure: '达尔文', eventTitle: '牛顿力学' },
  { figure: '诺贝尔', eventTitle: '牛顿力学' },
  { figure: '黑格尔', eventTitle: '法国大革命' },
  { figure: '甘地', eventTitle: '一战爆发' },
  { figure: '孙中山', eventTitle: '辛亥革命' },
  { figure: '爱因斯坦', eventTitle: '一战爆发' },
  { figure: '居里夫人', eventTitle: '一战爆发' },
  { figure: '弗莱明', eventTitle: '二战爆发' },
  { figure: '图灵', eventTitle: '二战爆发' },
  { figure: '毛泽东', eventTitle: '新中国成立' },
  { figure: '图森·卢维杜尔', eventTitle: '海地独立' },
  { figure: '邓小平', eventTitle: '改革开放' },
  { figure: '曼德拉', eventTitle: '柏林墙倒塌' },
  { figure: '马丁·路德·金', eventTitle: '人类登月' },
  { figure: '屠呦呦', eventTitle: '改革开放' },
  { figure: '蒂姆·伯纳斯-李', eventTitle: 'AI大爆发' },
  { figure: '乔布斯', eventTitle: 'AI大爆发' },
  { figure: '马斯克', eventTitle: '火星殖民' },
  { figure: '汉尼拔', eventTitle: '罗马共和国' },
  { figure: '阿育王', eventTitle: '释迦牟尼诞生' },
  { figure: '汉武帝', eventTitle: '张骞出使西域' },
  { figure: '奥古斯都', eventTitle: '罗马帝国' },
  { figure: '居鲁士大帝', eventTitle: '波斯帝国' },
  { figure: '萨拉丁', eventTitle: '十字军东征' },
  { figure: '朱熹', eventTitle: '宋朝建立' },
  { figure: '伊本·鲁世德', eventTitle: '阿拔斯王朝' },
  { figure: '圣女贞德', eventTitle: '十字军东征' },
  { figure: '忽必烈', eventTitle: '蒙古帝国' },
  { figure: '伊丽莎白一世', eventTitle: '宗教改革' },
  { figure: '马丁·路德', eventTitle: '宗教改革' },
  { figure: '南丁格尔', eventTitle: '一战爆发' },
  { figure: '李白', eventTitle: '唐朝建立' },
  { figure: '杜甫', eventTitle: '唐朝建立' },
  { figure: '鉴真', eventTitle: '唐朝建立' },
  { figure: '麦哲伦', eventTitle: '麦哲伦环球航行' },
  { figure: '瓦斯科·达·伽马', eventTitle: '哥伦布发现新大陆' },
  { figure: '开普勒', eventTitle: '日心说' },
  { figure: '薛定谔', eventTitle: '量子力学诞生' },
  { figure: '哈特谢普苏特', eventTitle: '埃及统一' },
  { figure: '埃拉托色尼', eventTitle: '亚历山大东征' },
  { figure: '切·格瓦拉', eventTitle: '古巴导弹危机' },
  { figure: '李光耀', eventTitle: '万隆会议' },
  { figure: '杜鲁门', eventTitle: '二战结束' },
  { figure: '罗莎·卢森堡', eventTitle: '十月革命' },
  { figure: '弗里达·卡罗', eventTitle: '墨西哥独立' },
  { figure: '丰臣秀吉', eventTitle: '明治维新' },
  { figure: '利玛窦', eventTitle: '东印度公司' },
  { figure: '特库姆塞', eventTitle: '美国独立' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toId(type: string, name: string): string {
  return `history:${type}-${slugify(name)}`;
}

const ERA_ID_MAP: Record<string, string> = {
  prehistoric: 'prehistoric',
  classical: 'classical',
  medieval: 'medieval',
  earlyModern: 'early-modern',
  modern: 'modern',
  contemporary: 'contemporary',
  future: 'future',
};

function eraNodeId(eraId: string): string {
  return `history:era-${ERA_ID_MAP[eraId] ?? eraId}`;
}

const eras = ERAS as unknown as EraRecord[];
const events = EVENTS as unknown as EventRecord[];
const figures = FIGURES as unknown as FigureRecord[];

const ERA_NAMES: Record<string, string> = {};
for (const era of eras) {
  ERA_NAMES[era.id] = era.name;
}

const ERA_COLORS: Record<string, string> = {};
for (const era of eras) {
  ERA_COLORS[era.id] = era.color ?? '#c8a951';
}

export const ERA_ID_MAP_EXPORT = ERA_ID_MAP;

export function getEraColor(eraId: string): string {
  return ERA_COLORS[eraId] ?? '#c8a951';
}

export function buildHistoryNodes(): HistoryGraphNode[] {
  const eraNodes: HistoryGraphNode[] = eras.map((era) => ({
    id: eraNodeId(era.id),
    label: era.name,
    type: 'era' as const,
    slug: ERA_ID_MAP[era.id] ?? era.id,
    tags: era.highlights ?? [],
    description: era.desc ?? '',
  }));

  const eventNodes: HistoryGraphNode[] = events.map((ev) => ({
    id: toId('event', ev.title),
    label: ev.title,
    type: 'event' as const,
    slug: slugify(ev.title),
    era: ERA_ID_MAP[ev.era] ?? ev.era,
    year: ev.year,
    tags: [ev.cat, ev.region, ...(ev.references ?? [])],
    description: ev.desc ?? '',
    region: ev.region,
  }));

  const figureNodes: HistoryGraphNode[] = figures.map((fig) => ({
    id: toId('figure', fig.name),
    label: fig.name,
    type: 'figure' as const,
    slug: slugify(fig.name),
    era: ERA_ID_MAP[fig.era] ?? fig.era,
    year: fig.birth,
    tags: [fig.domain, fig.region, ...(fig.impact ?? []).slice(0, 3)],
    description: fig.desc ?? '',
    region: fig.region,
  }));

  return [...eraNodes, ...eventNodes, ...figureNodes];
}

export function buildHistoryEdges(): HistoryGraphEdge[] {
  const nodeIds = new Set(buildHistoryNodes().map((n) => n.id));
  const edges: HistoryGraphEdge[] = [];

  for (const ev of events) {
    const eid = eraNodeId(ev.era);
    const eventId = toId('event', ev.title);
    if (nodeIds.has(eid) && nodeIds.has(eventId)) {
      edges.push({ source: eid, target: eventId, type: 'era-event' });
    }
  }

  for (const fig of figures) {
    const eid = eraNodeId(fig.era);
    const figureId = toId('figure', fig.name);
    if (nodeIds.has(eid) && nodeIds.has(figureId)) {
      edges.push({ source: eid, target: figureId, type: 'era-figure' });
    }
  }

  for (const link of FIGURE_EVENT_LINKS) {
    const figureId = toId('figure', link.figure);
    const eventId = toId('event', link.eventTitle);
    if (nodeIds.has(figureId) && nodeIds.has(eventId)) {
      edges.push({
        source: figureId,
        target: eventId,
        type: 'figure-event',
        label: `${link.figure} → ${link.eventTitle}`,
      });
    }
  }

  for (let i = 0; i < eras.length - 1; i++) {
    const currentId = eraNodeId(eras[i]!.id);
    const nextId = eraNodeId(eras[i + 1]!.id);
    if (nodeIds.has(currentId) && nodeIds.has(nextId)) {
      edges.push({ source: currentId, target: nextId, type: 'era-seq' });
    }
  }

  const eventsByRegion: Record<string, EventRecord[]> = {};
  for (const ev of events) {
    if (!eventsByRegion[ev.region]) eventsByRegion[ev.region] = [];
    eventsByRegion[ev.region]!.push(ev);
  }

  const YEAR_THRESHOLD = 50;
  for (const region of Object.keys(eventsByRegion)) {
    const regionEvents = eventsByRegion[region]!.sort((a, b) => a.year - b.year);
    for (let i = 0; i < regionEvents.length; i++) {
      for (let j = i + 1; j < regionEvents.length; j++) {
        const a = regionEvents[i]!;
        const b = regionEvents[j]!;
        if (b.year - a.year > YEAR_THRESHOLD) break;
        if (a.era === b.era) {
          const aId = toId('event', a.title);
          const bId = toId('event', b.title);
          if (nodeIds.has(aId) && nodeIds.has(bId)) {
            edges.push({ source: aId, target: bId, type: 'temporal' });
          }
        }
      }
    }
  }

  return deduplicateEdges(edges);
}

function deduplicateEdges(edges: HistoryGraphEdge[]): HistoryGraphEdge[] {
  const seen = new Set<string>();
  const result: HistoryGraphEdge[] = [];
  for (const edge of edges) {
    const key = `${edge.source}|${edge.target}|${edge.type}`;
    const reverseKey = `${edge.target}|${edge.source}|${edge.type}`;
    if (!seen.has(key) && !seen.has(reverseKey)) {
      seen.add(key);
      result.push(edge);
    }
  }
  return result;
}

export function getUniqueRegions(): string[] {
  const regions = new Set<string>();
  for (const ev of events) regions.add(ev.region);
  for (const fig of figures) regions.add(fig.region);
  return [...regions].sort();
}

export function getUniqueEras(): { id: string; name: string }[] {
  return eras.map((era) => ({ id: ERA_ID_MAP[era.id] ?? era.id, name: era.name }));
}

export function getUniqueCategories(): string[] {
  const cats = new Set<string>();
  for (const ev of events) cats.add(ev.cat);
  return [...cats].sort();
}
