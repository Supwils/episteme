import { HISTORY_TODAY } from "./daily-history";
import { PHYSICS_TODAY } from "./daily-physics";
import { PHILOSOPHY_TODAY } from "./philosophy-today";
import { ECONOMICS_TODAY } from "./daily-economics";
import { PSYCHOLOGY_TODAY } from "./daily-psychology";
import { SOCIOLOGY_FACTS } from "./daily-sociology";
import { ON_THIS_DAY } from "./on-this-day";
import { getAllCuriosities } from "./curiosities";
import {
  DAILY_QUESTIONS,
  MONTHLY_FACTS,
  MATH_FACTS,
  LIFE_SCIENCE_FACTS,
  COSMOLOGY_FACTS,
  ECONOMICS_FACTS,
  PSYCHOLOGY_FACTS,
  COMPUTER_SCIENCE_FACTS,
  POLITICAL_SCIENCE_FACTS,
  EARTH_SCIENCE_FACTS,
  MEDICINE_FACTS,
  CHEMISTRY_FACTS,
} from "./daily-facts";

export interface DailySelected {
  date: string;
  seed: number;
  physics: DailySelectedEvent;
  history: DailySelectedEvent;
  philosophy: DailySelectedEvent;
  economics: DailySelectedEvent;
  psychology: DailySelectedEvent;
  mathematics: DailySelectedFact;
  lifeScience: DailySelectedFact;
  cosmology: DailySelectedFact;
  computerScience: DailySelectedFact;
  politicalScience: DailySelectedFact;
  earthScience: DailySelectedFact;
  medicine: DailySelectedFact;
  chemistry: DailySelectedFact;
  sociology: DailySelectedFact;
  curiosity: { title: string; detail: string; url?: string };
  question: string;
  fact: string;
  onThisDay: OnThisDayMatch[];
}

export interface DailySelectedEvent {
  title: string;
  description: string;
  year?: number;
  url: string;
}

export interface DailySelectedFact {
  title: string;
  description: string;
  url: string;
}

export interface OnThisDayMatch {
  month: number;
  day: number;
  year: number;
  title: string;
  description: string;
  domain: string;
  domainColor: string;
  url: string;
}

function dateSeed(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function seededSelect<T>(items: readonly T[], seed: number): T {
  const index = Math.abs(seed) % items.length;
  return items[index]!;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Pick one "on this day" event: prefer events matching today's date, else fall
 * back to the full list, then project to the display shape. Seeded so a given
 * (date, seedOffset) always yields the same pick.
 */
function pickDailyEvent<T extends DailySelectedEvent>(
  todayMatches: readonly T[],
  fullList: readonly T[],
  seed: number
): DailySelectedEvent {
  const pool = todayMatches.length > 0 ? todayMatches : fullList;
  const { title, description, year, url } = seededSelect(pool, seed);
  return { title, description, year, url };
}

export function getDailySelected(date?: Date, seedOffset = 0): DailySelected {
  const now = date ?? new Date();
  const seed = dateSeed(now) + seedOffset * 7919;
  const dateStr = formatDate(now);
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const historyEvents = HISTORY_TODAY.filter((e) => e.month === month && e.day === day);
  const physicsEvents = PHYSICS_TODAY.filter((e) => e.month === month && e.day === day);
  const philosophyEvents = PHILOSOPHY_TODAY.filter((e) => e.month === month && e.day === day);
  const economicsEvents = ECONOMICS_TODAY.filter((e) => e.month === month && e.day === day);
  const psychologyEvents = PSYCHOLOGY_TODAY.filter((e) => e.month === month && e.day === day);
  const onThisDayEvents = ON_THIS_DAY.filter((e) => e.month === month && e.day === day);

  const physics = pickDailyEvent(physicsEvents, PHYSICS_TODAY, seed);
  const history = pickDailyEvent(historyEvents, HISTORY_TODAY, seed + 1);
  const philosophy = pickDailyEvent(philosophyEvents, PHILOSOPHY_TODAY, seed + 2);
  const economics = pickDailyEvent(economicsEvents, ECONOMICS_TODAY, seed + 8);
  const psychology = pickDailyEvent(psychologyEvents, PSYCHOLOGY_TODAY, seed + 9);

  const mathematics = seededSelect(MATH_FACTS, seed + 3);
  const lifeScience = seededSelect(LIFE_SCIENCE_FACTS, seed + 4);
  const cosmology = seededSelect(COSMOLOGY_FACTS, seed + 5);
  const computerScience = seededSelect(COMPUTER_SCIENCE_FACTS, seed + 12);
  const politicalScience = seededSelect(POLITICAL_SCIENCE_FACTS, seed + 13);
  const earthScience = seededSelect(EARTH_SCIENCE_FACTS, seed + 14);
  const medicine = seededSelect(MEDICINE_FACTS, seed + 15);
  const chemistry = seededSelect(CHEMISTRY_FACTS, seed + 16);
  const sociology = seededSelect(SOCIOLOGY_FACTS, seed + 17);

  const curiosityItem = seededSelect(getAllCuriosities(), seed + 14);
  const curiosity = {
    title: curiosityItem.title,
    detail: curiosityItem.detail,
    url: curiosityItem.url,
  };
  const economicsFact = seededSelect(ECONOMICS_FACTS, seed + 10);
  const psychologyFact = seededSelect(PSYCHOLOGY_FACTS, seed + 11);

  const question = seededSelect(DAILY_QUESTIONS, seed + 6);

  const monthKey = String(month).padStart(2, "0");
  const facts = MONTHLY_FACTS[monthKey] ?? ["每一天都值得探索"];
  const fact = seededSelect(facts, seed + 7);

  const onThisDay: OnThisDayMatch[] = onThisDayEvents.map((e) => ({
    month: e.month,
    day: e.day,
    year: e.year,
    title: e.title,
    description: e.description,
    domain: e.domain,
    domainColor: e.domainColor,
    url: e.url,
  }));

  return {
    date: dateStr,
    seed,
    physics,
    history,
    philosophy,
    economics,
    psychology,
    mathematics,
    lifeScience,
    cosmology,
    computerScience,
    politicalScience,
    earthScience,
    medicine,
    chemistry,
    sociology,
    curiosity,
    question,
    fact,
    onThisDay,
  };
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const y = parts[0] ?? "";
  const m = parts[1] ?? "";
  const d = parts[2] ?? "";
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

export function getWeekday(dateStr: string): string {
  const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;
  const d = new Date(dateStr + "T00:00:00");
  return `星期${WEEKDAYS[d.getDay()]}`;
}

export function buildShareText(daily: DailySelected): string {
  const displayDate = formatDisplayDate(daily.date);
  const weekday = getWeekday(daily.date);

  const lines = [
    `📚 每日知识 · ${displayDate} ${weekday}`,
    "",
    `🔬 物理：${daily.physics.title}`,
    `📜 历史：${daily.history.title}`,
    `💭 哲学：${daily.philosophy.title}`,
    `📊 经济：${daily.economics.title}`,
    `🧠 心理：${daily.psychology.title}`,
    `📐 数学：${daily.mathematics.title}`,
    `🧬 生命：${daily.lifeScience.title}`,
    `🌌 宇宙：${daily.cosmology.title}`,
    `💻 计算机：${daily.computerScience.title}`,
    `⚖️ 政治：${daily.politicalScience.title}`,
    `🌍 地球科学：${daily.earthScience.title}`,
    `⚕️ 医学：${daily.medicine.title}`,
    `⚗️ 化学：${daily.chemistry.title}`,
    `🏙 社会学：${daily.sociology.title}`,
    "",
    `❓ 今日一问：${daily.question}`,
    "",
    `💡 ${daily.fact}`,
    "",
    `— Episteme · 格致`,
  ];

  return lines.join("\n");
}

export { simpleHash };
