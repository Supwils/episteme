import { ERAS } from '@/content/human-history/data/eras';
import { EVENTS } from '@/content/human-history/data/events';

export type EventRelationType = 'caused' | 'influenced' | 'contemporary' | 'reacted-to';

export type EventRelation = {
  source: string;
  target: string;
  type: EventRelationType;
  description: string;
};

export type FigureEventRole = 'initiated' | 'participated' | 'influenced' | 'opposed';

export type FigureEventLink = {
  figureId: string;
  eventId: string;
  role: FigureEventRole;
};

interface EventRecord {
  year: number;
  title: string;
  desc: string;
  era: string;
  region: string;
  cat: string;
}

interface EraRecord {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
}

const eras = ERAS as unknown as EraRecord[];
const events = EVENTS as unknown as EventRecord[];

const eventTitleSet = new Set(events.map((e) => e.title));

const FIGURE_EVENT_LINKS_RAW: { figure: string; eventTitle: string }[] = [
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

const CAUSAL_CHAINS: { source: string; target: string; type: EventRelationType; desc: string }[] = [
  { source: '认知革命', target: '走出非洲', type: 'caused', desc: '认知能力突破使远距离迁徙成为可能' },
  { source: '走出非洲', target: '与尼安德特人共存', type: 'caused', desc: '智人进入欧洲后与尼安德特人相遇' },
  { source: '走出非洲', target: '洞窟壁画', type: 'influenced', desc: '迁徙至欧洲的智人发展出艺术表达' },
  { source: '控制用火', target: '农业革命', type: 'influenced', desc: '用火技术为定居和农业准备了条件' },
  { source: '农业革命', target: '杰里科建城', type: 'caused', desc: '食物盈余催生了永久定居点' },
  { source: '杰里科建城', target: '加泰土丘', type: 'influenced', desc: '定居文化向更大规模聚落发展' },
  { source: '农业革命', target: '仰韶文化', type: 'influenced', desc: '黄河流域农业定居催生彩陶文化' },
  { source: '农业革命', target: '铜器时代', type: 'influenced', desc: '定居社会的需求推动了金属冶炼' },
  { source: '铜器时代', target: '古腾堡印刷术', type: 'influenced', desc: '冶金传统最终发展为铸造活字' },
  { source: '蔡伦改进造纸', target: '古腾堡印刷术', type: 'influenced', desc: '造纸术西传为印刷术提供了载体' },
  { source: '古腾堡印刷术', target: '宗教改革', type: 'caused', desc: '印刷术使路德的论纲迅速传播' },
  { source: '宗教改革', target: '日心说', type: 'influenced', desc: '宗教改革释放了思想自由空间' },
  { source: '日心说', target: '牛顿力学', type: 'influenced', desc: '哥白尼革命开启了科学革命' },
  { source: '牛顿力学', target: '美国独立', type: 'influenced', desc: '科学革命的理性精神催生启蒙运动' },
  { source: '牛顿力学', target: '法国大革命', type: 'influenced', desc: '启蒙思想的传播动摇了旧制度根基' },
  { source: '法国大革命', target: '海地独立', type: 'caused', desc: '法国大革命的自由平等理念激发海地革命' },
  { source: '美国独立', target: '法国大革命', type: 'influenced', desc: '美国革命的成功为法国提供了范例' },
  { source: '法国大革命', target: '《共产党宣言》', type: 'influenced', desc: '法国革命传统影响了社会主义思想' },
  { source: '秦统一六国', target: '罗马共和国', type: 'contemporary', desc: '东西方同时建立大一统帝国' },
  { source: '张骞出使西域', target: '罗马帝国', type: 'influenced', desc: '丝绸之路将汉朝与罗马世界连接' },
  { source: '一战爆发', target: '十月革命', type: 'caused', desc: '一战的惨烈催生了俄国革命' },
  { source: '一战爆发', target: '辛亥革命', type: 'influenced', desc: '国际格局变动加速了中国帝制终结' },
  { source: '十月革命', target: '新中国成立', type: 'influenced', desc: '马列主义传入中国改变了革命道路' },
  { source: '二战爆发', target: '二战结束', type: 'caused', desc: '全面战争必然走向终战' },
  { source: '二战结束', target: '新中国成立', type: 'influenced', desc: '二战后东亚格局重组' },
  { source: '二战结束', target: '人类登月', type: 'influenced', desc: '二战火箭技术发展为太空竞赛奠基' },
  { source: '柏林墙倒塌', target: '改革开放', type: 'influenced', desc: '冷战结束推动了全球化进程' },
  { source: '改革开放', target: 'AI大爆发', type: 'influenced', desc: '中国融入全球体系加速了技术扩散' },
  { source: '蒙古帝国', target: '黑死病', type: 'influenced', desc: '蒙古和平促进了欧亚交流但也传播了瘟疫' },
  { source: '十字军东征', target: '文艺复兴', type: 'influenced', desc: '十字军带回了阿拉伯保存的古典文献' },
  { source: '阿拔斯王朝', target: '十字军东征', type: 'reacted-to', desc: '伊斯兰世界的扩张引发了基督教世界的回应' },
  { source: '麦哲伦环球航行', target: '哥伦布发现新大陆', type: 'influenced', desc: '大航海时代的延续与深入' },
  { source: '蒙古帝国', target: '明朝建立', type: 'reacted-to', desc: '蒙古统治的瓦解催生了明朝' },
];

function buildContemporaryRelations(): EventRelation[] {
  const relations: EventRelation[] = [];
  const seen = new Set<string>();

  const eventsByEra: Record<string, EventRecord[]> = {};
  for (const ev of events) {
    if (!eventsByEra[ev.era]) eventsByEra[ev.era] = [];
    eventsByEra[ev.era]!.push(ev);
  }

  for (const era of eras) {
    const eraEvents = eventsByEra[era.id];
    if (!eraEvents || eraEvents.length < 2) continue;

    const eraObj = ERAS.find((e) => e.id === era.id);
    const keyEvents = (eraObj as unknown as { keyEvents?: string[] })?.keyEvents ?? [];

    for (let i = 0; i < eraEvents.length; i++) {
      for (let j = i + 1; j < eraEvents.length; j++) {
        const a = eraEvents[i]!;
        const b = eraEvents[j]!;

        if (a.region !== b.region) {
          const key = `${a.title}|${b.title}|contemporary`;
          const reverseKey = `${b.title}|${a.title}|contemporary`;
          if (seen.has(key) || seen.has(reverseKey)) continue;

          const isKeyA = keyEvents.includes(a.title);
          const isKeyB = keyEvents.includes(b.title);
          if (isKeyA || isKeyB || Math.abs(a.year - b.year) < 200) {
            seen.add(key);
            relations.push({
              source: a.title,
              target: b.title,
              type: 'contemporary',
              description: `${a.title}与${b.title}发生于同一时代但不同地区`,
            });
          }
        }
      }
    }
  }

  return relations;
}

function buildCausalRelations(): EventRelation[] {
  const relations: EventRelation[] = [];

  for (const chain of CAUSAL_CHAINS) {
    if (!eventTitleSet.has(chain.source) || !eventTitleSet.has(chain.target)) continue;
    relations.push({
      source: chain.source,
      target: chain.target,
      type: chain.type,
      description: chain.desc,
    });
  }

  return relations;
}

function assignRole(figureName: string, eventTitle: string): FigureEventRole {
  const INITIATORS: Record<string, string> = {
    '秦始皇': '秦统一六国',
    '哥伦布': '哥伦布发现新大陆',
    '麦哲伦': '麦哲伦环球航行',
    '穆罕默德': '阿拔斯王朝',
    '成吉思汗': '蒙古帝国',
    '牛顿': '牛顿力学',
    '哥白尼': '日心说',
    '达尔文': '牛顿力学',
    '马克思': '《共产党宣言》',
    '恩格斯': '《共产党宣言》',
    '孙中山': '辛亥革命',
    '毛泽东': '新中国成立',
    '邓小平': '改革开放',
    '爱因斯坦': '一战爆发',
    '蔡伦': '蔡伦改进造纸',
  };

  const OPPOSED: Record<string, string> = {
    '曼德拉': '柏林墙倒塌',
    '甘地': '一战爆发',
  };

  if (INITIATORS[figureName] === eventTitle) return 'initiated';
  if (OPPOSED[figureName] === eventTitle) return 'opposed';

  const INFLUENCERS = ['老子', '孔子', '孟子', '柏拉图', '亚里士多德', '洛克', '伏尔泰', '卢梭', '黑格尔', '莎士比亚', '达芬奇', '伽利略', '诺贝尔', '弗莱明', '屠呦呦'];
  if (INFLUENCERS.includes(figureName)) return 'influenced';

  return 'participated';
}

let cachedEventRelations: EventRelation[] | null = null;
let cachedFigureEventLinks: FigureEventLink[] | null = null;

export function getEventRelationships(): EventRelation[] {
  if (cachedEventRelations) return cachedEventRelations;

  const contemporary = buildContemporaryRelations();
  const causal = buildCausalRelations();

  const all = [...causal, ...contemporary];
  const deduped = deduplicateRelations(all);

  cachedEventRelations = deduped;
  return deduped;
}

export function getFigureEventLinks(): FigureEventLink[] {
  if (cachedFigureEventLinks) return cachedFigureEventLinks;

  const raw = FIGURE_EVENT_LINKS_RAW;
  const links: FigureEventLink[] = [];

  for (const link of raw) {
    if (!eventTitleSet.has(link.eventTitle)) continue;
    links.push({
      figureId: link.figure,
      eventId: link.eventTitle,
      role: assignRole(link.figure, link.eventTitle),
    });
  }

  cachedFigureEventLinks = links;
  return links;
}

export function getEventRelationsByTitle(title: string): EventRelation[] {
  return getEventRelationships().filter(
    (r) => r.source === title || r.target === title,
  );
}

export function getFigureLinksByEvent(eventTitle: string): FigureEventLink[] {
  return getFigureEventLinks().filter((l) => l.eventId === eventTitle);
}

export function getFigureLinksByFigure(figureId: string): FigureEventLink[] {
  return getFigureEventLinks().filter((l) => l.figureId === figureId);
}

function deduplicateRelations(relations: EventRelation[]): EventRelation[] {
  const seen = new Set<string>();
  const result: EventRelation[] = [];
  for (const rel of relations) {
    const key = `${rel.source}|${rel.target}|${rel.type}`;
    const reverseKey = `${rel.target}|${rel.source}|${rel.type}`;
    if (!seen.has(key) && !seen.has(reverseKey)) {
      seen.add(key);
      result.push(rel);
    }
  }
  return result;
}
