// @ts-nocheck
import { CAT_LABELS, REGION_LABELS, REGIONS, formatYear } from '../../data/index.js';
import { EVENT_DETAILS } from '../../data/event-details.js';
import { EXTRA_DETAILS } from '../../data/extra-details.js';
import { FINAL_DETAILS } from '../../data/final-details.js';
import { LAST_DETAILS } from '../../data/last-details.js';
import { GEO_ENRICHMENT_1 } from '../../data/geo-enrichment-ancient.js';
import { GEO_ENRICHMENT_2 } from '../../data/geo-enrichment-modern.js';

export const MAP_EVENT_DETAILS = {
  ...EVENT_DETAILS,
  ...EXTRA_DETAILS,
  ...FINAL_DETAILS,
  ...LAST_DETAILS,
  ...GEO_ENRICHMENT_1,
  ...GEO_ENRICHMENT_2,
};

const REGION_NAMES = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  americas: '美洲',
  oceania: '大洋洲',
  global: '全球',
};

const REGION_COLORS = {
  asia: '#C8A951',
  europe: '#1E3A5F',
  africa: '#8B4513',
  americas: '#2D6A4F',
  oceania: '#4A148C',
  global: '#4A148C',
};

export function getMapEventSummary(event) {
  const detail = MAP_EVENT_DETAILS[event.title];
  const page = detail?.pages?.[0];
  if (page?.body) return `${page.body.slice(0, 92)}...`;
  return event.desc || '点击事件查看上下文与同区域历史线索。';
}

const CATEGORY_STAKES = {
  politics: '它改变了权力组织方式、制度边界与治理秩序，往往会把周边社会拖入新的联盟、竞争或整合周期。',
  military: '它让军事技术、动员能力与地缘通道同时暴露出来，战后的边界、记忆和安全结构通常会长期延续。',
  economy: '它说明资源、贸易、金融和劳动力如何被重新连接，许多看似局部的交换最终会改变跨区域依赖关系。',
  culture: '它通过宗教、文字、艺术、迁徙或观念传播影响共同体认同，常常比政权本身持续得更久。',
  science: '它扩展了人类解释世界的能力，也会改变教育、技术路线和社会对未来的想象。',
  technology: '它把知识转化为可复制的工具、基础设施或生产方式，并重塑了速度、距离和组织成本。',
};

const REGION_CONTEXT = {
  asia: '亚洲节点通常连接草原、绿洲、河谷、季风海洋与帝国边疆，事件之间经常通过商路、宗教网络和国家能力相互放大。',
  europe: '欧洲节点常处在地中海、大西洋、北海与内陆平原之间，制度竞争、战争财政和知识传播会形成连锁反应。',
  africa: '非洲节点需要同时看撒哈拉、尼罗河、红海、印度洋和大西洋通道，贸易、迁徙与殖民压力共同塑造区域节奏。',
  americas: '美洲节点跨越白令迁徙、安第斯高地、中美洲文明、北大西洋殖民和现代全球化，需要把生态与海洋联系一起看。',
  oceania: '大洋洲节点强调远洋航行、岛链网络和生态适应，空间距离本身就是历史结构的一部分。',
  global: '全球节点不是单一地点，而是多个区域被同一技术、制度或危机连接后的共同转折。',
};

function fallbackStoryPages(event) {
  const catLabel = CAT_LABELS[event.cat] || event.cat;
  const regionLabel = REGION_LABELS[event.region] || event.region;
  const timeLabel = formatYear(event.year);
  const summary = event.desc || `${event.title} 是 ${timeLabel} 前后发生在${regionLabel}的重要${catLabel}事件。`;

  return [
    {
      title: '发生了什么',
      body: `${timeLabel}，${summary} 这个节点被放在地图上，是因为它能帮助我们把时间线和具体空间位置联系起来，而不是只把历史理解成抽象年代。`,
    },
    {
      title: '为什么重要',
      body: CATEGORY_STAKES[event.cat] || '它的重要性来自对周边社会、后续制度和跨区域联系的持续影响。',
    },
    {
      title: '怎样在地图上阅读',
      body: `${REGION_CONTEXT[event.region] || REGION_CONTEXT.global} 阅读这个点时，可以把它与附近同色或同一时期的节点一起看：密集区域通常代表制度、贸易、战争或知识网络的高频交汇。`,
    },
  ];
}

export function getEventStory(event) {
  const detail = MAP_EVENT_DETAILS[event.title];
  const detailPages = detail?.pages
    ?.filter(page => page.title && page.body)
    .map(page => ({ title: page.title, body: page.body }));

  return {
    pages: detailPages?.length ? detailPages : fallbackStoryPages(event),
    facts: detail?.facts?.length ? detail.facts : [
      formatYear(event.year),
      REGION_LABELS[event.region] || event.region,
      CAT_LABELS[event.cat] || event.cat,
    ],
  };
}

export function getRegionProfile(regionId) {
  return REGIONS.find(region => region.id === regionId) || {
    id: regionId,
    name: REGION_NAMES[regionId] || regionId,
    color: REGION_COLORS[regionId] || '#c8a951',
    desc: '该区域正在补充更完整的区域叙事。',
    highlights: [],
  };
}
