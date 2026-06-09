import { HISTORY_TODAY } from "./history-today";
import { PHYSICS_TODAY } from "./physics-today";
import { PHILOSOPHY_TODAY } from "./philosophy-today";
import { ECONOMICS_TODAY } from "./daily-economics";
import { PSYCHOLOGY_TODAY } from "./daily-psychology";
import { ON_THIS_DAY } from "./on-this-day";
export type { OnThisDayEvent } from "./on-this-day";

export type DailyItem = {
  id: string;
  title: string;
  description: string;
  domain: "physics" | "history" | "philosophy" | "life-science" | "economics" | "psychology";
  url: string;
  year?: number;
  icon: string;
};

export type DailyKnowledge = {
  date: string;
  items: DailyItem[];
  fact: string;
  onThisDay: import("./on-this-day").OnThisDayEvent[];
};

const FUN_FACTS: Record<string, string[]> = {
  "01": ["1月是罗马神话中双面神雅努斯的月份，象征回顾过去与展望未来", "地球上1月份地球距太阳最近（近日点），约1.47亿公里"],
  "02": ["2月是全年最短的月份，平年28天，闰年29天", "2月14日情人节的圣瓦伦丁是古罗马的一位基督教殉道者"],
  "03": ["3月的英文March来自罗马战神马尔斯", "春分通常在3月20日或21日，全球昼夜几乎等长"],
  "04": ["4月的英文April来自拉丁语aperire，意为\"开放\"", "清明节通常在4月4日或5日，是中国传统节日"],
  "05": ["5月的英文May来自希腊春天女神玛雅", "5月5日是日本的儿童节，也叫端午节"],
  "06": ["6月的英文June来自罗马婚姻女神朱诺", "夏至通常在6月21日，北半球白昼最长"],
  "07": ["7月以凯撒大帝尤利乌斯（Julius）命名", "7月和8月是北半球最热的月份"],
  "08": ["8月以罗马首位皇帝奥古斯都（Augustus）命名", "英仙座流星雨通常在8月中旬达到极大"],
  "09": ["9月的英文September来自拉丁语septem（七），因古罗马历法从3月开始", "秋分通常在9月22日或23日"],
  "10": ["10月的英文October来自拉丁语octo（八）", "10月的夜空中可以看到猎户座流星雨"],
  "11": ["11月的英文November来自拉丁语novem（九）", "11月11日是光棍节，也是中国最大的购物节"],
  "12": ["12月的英文December来自拉丁语decem（十）", "冬至通常在12月21日或22日，北半球黑夜最长"],
};

const DOMAIN_ICONS: Record<string, string> = {
  physics: "🔬",
  history: "📜",
  philosophy: "💭",
  "life-science": "🧬",
  economics: "📊",
  psychology: "🧠",
};

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthDay(date: Date): { month: number; day: number } {
  return { month: date.getMonth() + 1, day: date.getDate() };
}

export function getDailyKnowledge(date?: Date): DailyKnowledge {
  const now = date ?? new Date();
  const dateStr = formatDate(now);
  const { month, day } = getMonthDay(now);

  const historyEvents = HISTORY_TODAY.filter(
    (e) => e.month === month && e.day === day
  );
  const physicsEvents = PHYSICS_TODAY.filter(
    (e) => e.month === month && e.day === day
  );
  const philosophyEvents = PHILOSOPHY_TODAY.filter(
    (e) => e.month === month && e.day === day
  );
  const economicsEvents = ECONOMICS_TODAY.filter(
    (e) => e.month === month && e.day === day
  );
  const psychologyEvents = PSYCHOLOGY_TODAY.filter(
    (e) => e.month === month && e.day === day
  );
  const onThisDayEvents = ON_THIS_DAY.filter(
    (e) => e.month === month && e.day === day
  );

  const items: DailyItem[] = [];

  for (const event of historyEvents) {
    items.push({
      id: `history-${event.month}-${event.day}-${event.year}`,
      title: event.title,
      description: event.description,
      domain: "history",
      url: event.url,
      year: event.year,
      icon: DOMAIN_ICONS.history ?? "📜",
    });
  }

  for (const event of physicsEvents) {
    items.push({
      id: `physics-${event.month}-${event.day}-${event.year}`,
      title: event.title,
      description: event.description,
      domain: "physics",
      url: event.url,
      year: event.year,
      icon: DOMAIN_ICONS.physics ?? "🔬",
    });
  }

  for (const event of philosophyEvents) {
    items.push({
      id: `philosophy-${event.month}-${event.day}-${event.year}`,
      title: event.title,
      description: event.description,
      domain: "philosophy",
      url: event.url,
      year: event.year,
      icon: DOMAIN_ICONS.philosophy ?? "💭",
    });
  }

  for (const event of economicsEvents) {
    items.push({
      id: `economics-${event.month}-${event.day}-${event.year}`,
      title: event.title,
      description: event.description,
      domain: "economics",
      url: event.url,
      year: event.year,
      icon: DOMAIN_ICONS.economics ?? "📊",
    });
  }

  for (const event of psychologyEvents) {
    items.push({
      id: `psychology-${event.month}-${event.day}-${event.year}`,
      title: event.title,
      description: event.description,
      domain: "psychology",
      url: event.url,
      year: event.year,
      icon: DOMAIN_ICONS.psychology ?? "🧠",
    });
  }

  if (items.length === 0) {
    for (const event of onThisDayEvents) {
      const domain = event.domain as DailyItem["domain"];
      items.push({
        id: `otd-${event.month}-${event.day}-${event.year}`,
        title: event.title,
        description: event.description,
        domain,
        url: event.url,
        year: event.year,
        icon: DOMAIN_ICONS[domain] ?? "📅",
      });
    }
  }

  const monthKey = String(month).padStart(2, "0");
  const facts = FUN_FACTS[monthKey] ?? ["每一天都值得探索"];
  const dayIndex = (day - 1) % facts.length;
  const fact = facts[dayIndex] ?? facts[0] ?? "每一天都值得探索";

  return { date: dateStr, items, fact, onThisDay: onThisDayEvents };
}
