import { HISTORY_TODAY } from "./history-today";
import { PHYSICS_TODAY } from "./physics-today";
import { PHILOSOPHY_TODAY } from "./philosophy-today";
import { ECONOMICS_TODAY } from "./daily-economics";
import { PSYCHOLOGY_TODAY } from "./daily-psychology";
import { ON_THIS_DAY } from "./on-this-day";
import { MONTHLY_FACTS } from "./daily-facts";
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

  const historyEvents = HISTORY_TODAY.filter((e) => e.month === month && e.day === day);
  const physicsEvents = PHYSICS_TODAY.filter((e) => e.month === month && e.day === day);
  const philosophyEvents = PHILOSOPHY_TODAY.filter((e) => e.month === month && e.day === day);
  const economicsEvents = ECONOMICS_TODAY.filter((e) => e.month === month && e.day === day);
  const psychologyEvents = PSYCHOLOGY_TODAY.filter((e) => e.month === month && e.day === day);
  const onThisDayEvents = ON_THIS_DAY.filter((e) => e.month === month && e.day === day);

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
  const facts = MONTHLY_FACTS[monthKey] ?? ["每一天都值得探索"];
  const dayIndex = (day - 1) % facts.length;
  const fact = facts[dayIndex] ?? facts[0] ?? "每一天都值得探索";

  return { date: dateStr, items, fact, onThisDay: onThisDayEvents };
}
