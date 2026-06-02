import { ERAS, FIGURES, REGION_LABELS, formatYear } from '../../data/index.js';

export const DOMAIN_LABELS = {
  all: '全部领域',
  politics: '政治治理',
  philosophy: '思想哲学',
  science: '科学医学',
  technology: '技术工程',
  culture: '文化艺术',
  economy: '经济商业',
};

const DOMAIN_OVERRIDES = {
  孔子: 'philosophy',
  苏格拉底: 'philosophy',
  亚里士多德: 'science',
  释迦牟尼: 'philosophy',
  秦始皇: 'politics',
  凯撒: 'politics',
  唐太宗: 'politics',
  成吉思汗: 'politics',
  达芬奇: 'culture',
  牛顿: 'science',
  拿破仑: 'politics',
  爱因斯坦: 'science',
  毛泽东: 'politics',
  图灵: 'technology',
  乔布斯: 'technology',
  亚历山大大帝: 'politics',
  达尔文: 'science',
  居里夫人: 'science',
  穆罕默德: 'philosophy',
  孟子: 'philosophy',
  老子: 'philosophy',
  柏拉图: 'philosophy',
  莎士比亚: 'culture',
  哥白尼: 'science',
  洛克: 'philosophy',
  卢梭: 'philosophy',
  贝多芬: 'culture',
  诺贝尔: 'science',
  弗莱明: 'science',
  黑格尔: 'philosophy',
  恩格斯: 'philosophy',
  萨福: 'culture',
  郑成功: 'politics',
  恩克鲁玛: 'politics',
  '玛丽·沃斯通克拉夫特': 'philosophy',
  '图帕克·阿马鲁二世': 'politics',
};

export function getFigureDomain(figure) {
  return figure.domain || DOMAIN_OVERRIDES[figure.name] || 'politics';
}

export function getFigureDates(figure) {
  const birth = formatYear(figure.birth);
  const death = figure.death == null ? '至今' : formatYear(figure.death);
  return `${birth} - ${death}`;
}

export function getFigureLifespan(figure) {
  if (figure.death == null) return '在世';
  return `${figure.death - figure.birth}年`;
}

export function getFigureSearchText(figure) {
  return [
    figure.name,
    figure.title,
    figure.desc,
    figure.longDesc,
    figure.quote,
    REGION_LABELS[figure.region],
    ERAS.find(e => e.id === figure.era)?.name,
    DOMAIN_LABELS[getFigureDomain(figure)],
    ...(figure.impact || []),
  ].filter(Boolean).join(' ').toLowerCase();
}

export function getFilteredFigures({ selectedRegion, selectedEra, selectedDomain, query, sortMode }) {
  const text = query.trim().toLowerCase();
  const filtered = FIGURES.filter(figure => {
    if (selectedRegion !== 'all' && figure.region !== selectedRegion) return false;
    if (selectedEra !== 'all' && figure.era !== selectedEra) return false;
    if (selectedDomain !== 'all' && getFigureDomain(figure) !== selectedDomain) return false;
    if (text && !getFigureSearchText(figure).includes(text)) return false;
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortMode === 'name') return a.name.localeCompare(b.name, 'zh-Hans-CN');
    if (sortMode === 'region') return (a.region + a.name).localeCompare(b.region + b.name, 'zh-Hans-CN');
    if (sortMode === 'domain') return (getFigureDomain(a) + a.name).localeCompare(getFigureDomain(b) + b.name, 'zh-Hans-CN');
    return a.birth - b.birth;
  });
}
