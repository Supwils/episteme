"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  year: number;
  title: string;
  desc: string;
  longDesc?: string;
  era: string;
  region: string;
  cat: string;
}

interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  color: string;
}

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  politics: { label: "政治", color: "#C8A951" },
  military: { label: "军事", color: "#8B1A1A" },
  economy: { label: "经济", color: "#2D6A4F" },
  culture: { label: "文化", color: "#1E3A5F" },
  science: { label: "科学", color: "#4A148C" },
  technology: { label: "技术", color: "#8B4513" },
};

const FEATURED_EVENTS: TimelineEvent[] = [
  {
    year: -3000,
    title: "埃及金字塔",
    desc: "吉萨大金字塔建成，古代世界七大奇迹中唯一存世者",
    longDesc:
      "约公元前2560年，埃及法老胡夫的金字塔在吉萨建成。它由约230万块石灰岩堆砌而成，每块平均重达2.5吨，建造过程历时约20年。金字塔不仅是法老的陵墓，更是古埃及国家组织能力、天文知识和工程技艺的巅峰体现。",
    era: "classical",
    region: "africa",
    cat: "culture",
  },
  {
    year: -776,
    title: "首届奥林匹克运动会",
    desc: "古希腊在奥林匹亚举办首届奥运会，开启了体育竞技传统",
    longDesc:
      `公元前776年，古希腊人在伯罗奔尼撒半岛西部的奥林匹亚举办了第一届有记载的奥林匹克运动会。最初只有一项赛事——约192米的短跑（stadion）。奥运会每四年举办一次，期间各城邦实行"神圣休战"。这一传统延续了近1200年，直到公元393年被罗马皇帝狄奥多西一世禁止。`,
    era: "classical",
    region: "europe",
    cat: "culture",
  },
  {
    year: -509,
    title: "罗马共和国建立",
    desc: "罗马推翻王政，建立共和制度，开创西方民主先河",
    longDesc:
      `公元前509年，罗马人推翻了最后一位国王"傲慢者"塔克文，建立了罗马共和国。共和制度的核心是元老院（Senate）和两位每年选举产生的执政官。这一制度虽非现代意义上的民主（贵族主导），但权力制衡和法治原则深刻影响了后来的西方政治思想。`,
    era: "classical",
    region: "europe",
    cat: "politics",
  },
  {
    year: -221,
    title: "秦统一六国",
    desc: "秦始皇统一中国，建立中央集权制度，影响延续两千年",
    longDesc:
      `公元前221年，秦王嬴政灭齐，完成了对六国的统一，建立秦朝，自称"始皇帝"。他推行郡县制、统一文字（小篆）、统一度量衡、修建驰道和长城。秦朝虽仅存15年，但其建立的中央集权制度框架被后世王朝继承，延续了两千多年。`,
    era: "classical",
    region: "asia",
    cat: "politics",
  },
  {
    year: 476,
    title: "西罗马帝国灭亡",
    desc: "日耳曼蛮族废黜最后一位西罗马皇帝，古典时代终结",
    longDesc:
      "公元476年，日耳曼蛮族首领奥多亚克废黜了西罗马最后一位皇帝罗慕路斯·奥古斯都路斯。这一事件传统上被视为古代与中世纪的分界线。西罗马的灭亡是长期衰落的结果：经济衰退、军事力量削弱、蛮族入侵、政治腐败等多重因素共同作用。",
    era: "medieval",
    region: "europe",
    cat: "politics",
  },
  {
    year: 1215,
    title: "《大宪章》签署",
    desc: "英国贵族迫使约翰王签署《大宪章》，限制王权，奠定法治基础",
    longDesc:
      `1215年6月15日，英国贵族在与国王约翰的冲突中迫使其签署《大宪章》（Magna Carta）。这份文件确立了"王在法下"的原则，规定未经合法审判不得逮捕或监禁任何人。虽然后来多次被修改和重新颁布，但《大宪章》成为宪政和法治的重要象征。`,
    era: "medieval",
    region: "europe",
    cat: "politics",
  },
  {
    year: 1347,
    title: "黑死病爆发",
    desc: "鼠疫席卷欧洲，夺去三分之一人口，深刻改变社会结构",
    longDesc:
      "1347年，黑死病（鼠疫）经由热那亚商船从克里米亚传入欧洲。在随后的六年间，这场瘟疫夺去了欧洲约三分之一到二分之一的人口——估计2500万至5000万人死亡。劳动力短缺导致农奴制瓦解、工资上涨，间接推动了社会变革和文艺复兴的到来。",
    era: "medieval",
    region: "europe",
    cat: "science",
  },
  {
    year: 1492,
    title: "哥伦布到达美洲",
    desc: "哥伦布横渡大西洋到达加勒比海，开启全球化时代",
    longDesc:
      `1492年10月12日，克里斯托弗·哥伦布率领三艘帆船横渡大西洋，到达巴哈马群岛。他以为自己到了亚洲，实际上发现了"新大陆"。这一事件开启了"哥伦布大交换"——美洲的玉米、马铃薯传入旧大陆，旧大陆的天花、麻疹则摧毁了美洲原住民社会。`,
    era: "earlyModern",
    region: "americas",
    cat: "economy",
  },
  {
    year: 1776,
    title: "美国独立",
    desc: "《独立宣言》发表，美利坚合众国诞生，民主实验开始",
    longDesc:
      `1776年7月4日，大陆会议通过了托马斯·杰斐逊起草的《独立宣言》，宣告北美十三个殖民地脱离英国独立。宣言提出"人人生而平等"的理念，虽在当时并未真正实现（奴隶制仍存在），但成为后来民主运动的精神灯塔。`,
    era: "earlyModern",
    region: "americas",
    cat: "politics",
  },
  {
    year: 1789,
    title: "法国大革命",
    desc: "巴黎人民攻占巴士底狱，封建旧制度终结，现代政治诞生",
    longDesc:
      `1789年7月14日，巴黎人民攻占巴士底狱，法国大革命爆发。革命推翻了波旁王朝的绝对君主制，发表了《人权宣言》，提出了"自由、平等、博爱"的口号。法国大革命彻底改变了政治观念：主权在民取代了君权神授。`,
    era: "earlyModern",
    region: "europe",
    cat: "politics",
  },
  {
    year: 1848,
    title: "《共产党宣言》发表",
    desc: "马克思和恩格斯发表《共产党宣言》，共产主义运动兴起",
    longDesc:
      `1848年2月，卡尔·马克思和弗里德里希·恩格斯发表了《共产党宣言》。这份不到30页的小册子以"一个幽灵，共产主义的幽灵，在欧洲游荡"开篇，系统阐述了阶级斗争理论和共产主义理想。它成为19世纪最具影响力的政治理论文献之一。`,
    era: "modern",
    region: "europe",
    cat: "politics",
  },
  {
    year: 1914,
    title: "第一次世界大战爆发",
    desc: "萨拉热窝事件引爆全球大战，四大帝国覆灭，世界秩序重塑",
    longDesc:
      "1914年6月28日，奥匈帝国皇储斐迪南大公在萨拉热窝被塞尔维亚民族主义者刺杀，引发了一系列连锁反应。在一个月内，欧洲各大国因同盟体系相继卷入战争。四年间，约1000万军人死亡，四大帝国（奥匈、奥斯曼、德意志、俄罗斯）覆灭。",
    era: "modern",
    region: "europe",
    cat: "military",
  },
  {
    year: 1945,
    title: "第二次世界大战结束",
    desc: "反法西斯同盟胜利，联合国成立，核时代降临",
    longDesc:
      "1945年5月8日德国投降、9月2日日本投降，第二次世界大战正式结束。这场战争造成约7000万至8500万人死亡，是人类历史上最惨烈的冲突。战争催生了联合国、核武器、冷战格局，彻底重塑了世界秩序。",
    era: "modern",
    region: "europe",
    cat: "military",
  },
  {
    year: 1969,
    title: "人类登月",
    desc: "阿波罗11号成功登月，阿姆斯特朗踏上月球，太空时代巅峰",
    longDesc:
      `1969年7月20日，美国宇航员尼尔·阿姆斯特朗踏上月球表面，说出"这是个人的一小步，却是人类的一大步"。阿波罗11号任务是美苏太空竞赛的高潮，也是20世纪科技成就的象征。此后直到1972年，共有12人登上月球。`,
    era: "contemporary",
    region: "americas",
    cat: "science",
  },
  {
    year: 1989,
    title: "柏林墙倒塌",
    desc: "柏林墙被推倒，冷战走向终结，东西德统一在望",
    longDesc:
      "1989年11月9日，东德政府宣布开放边境，数以万计的东柏林市民涌向柏林墙。在欢呼声中，人们开始用锤子和凿子拆除这道存在了28年的混凝土屏障。柏林墙的倒塌标志着冷战的实质性结束。",
    era: "contemporary",
    region: "europe",
    cat: "politics",
  },
  {
    year: 2001,
    title: "9·11事件",
    desc: "恐怖分子劫持飞机撞击世贸中心和五角大楼，全球反恐时代开始",
    longDesc:
      "2001年9月11日，19名基地组织恐怖分子劫持四架客机，撞击纽约世贸中心双子塔和五角大楼。近3000人遇难。这一事件深刻改变了21世纪的国际政治走向，催生了全球反恐战争、阿富汗战争和伊拉克战争。",
    era: "contemporary",
    region: "americas",
    cat: "military",
  },
];

const ERA_FILTERS: { id: string; label: string }[] = [
  { id: "classical", label: "古典时期" },
  { id: "medieval", label: "中世纪" },
  { id: "earlyModern", label: "近代" },
  { id: "modern", label: "现代" },
  { id: "contemporary", label: "当代" },
];

function formatYear(year: number): string {
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `${year}年`;
}

export interface EventTimelineProps {
  className?: string;
}

export default function EventTimeline({ className }: EventTimelineProps) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredEvents = useMemo(() => {
    let events = FEATURED_EVENTS;
    if (activeCategory) {
      events = events.filter((e) => e.cat === activeCategory);
    }
    if (activeEra) {
      events = events.filter((e) => e.era === activeEra);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.desc.toLowerCase().includes(q)
      );
    }
    return events;
  }, [activeCategory, activeEra, searchQuery]);

  const handleToggle = useCallback((index: number) => {
    setExpandedEvent((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(idx));
          }
        }
      },
      { threshold: 0.15 }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  const itemRefCallback = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      if (el) {
        el.setAttribute("data-index", String(index));
        observerRef.current?.observe(el);
      }
    },
    []
  );

  return (
    <section className={className} style={{ width: "100%" }}>
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="搜索事件..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
          aria-label="搜索历史事件"
        />
        <div style={filterRowStyle}>
          <span style={filterLabelStyle}>分类：</span>
          <button
            style={{
              ...chipStyle,
              ...(activeCategory === null ? chipActiveStyle : {}),
            }}
            onClick={() => setActiveCategory(null)}
          >
            全部
          </button>
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button
              key={key}
              style={{
                ...chipStyle,
                borderColor: meta.color,
                ...(activeCategory === key
                  ? { background: meta.color, color: "#fff" }
                  : {}),
              }}
              onClick={() =>
                setActiveCategory((prev) => (prev === key ? null : key))
              }
            >
              {meta.label}
            </button>
          ))}
        </div>
        <div style={filterRowStyle}>
          <span style={filterLabelStyle}>时代：</span>
          <button
            style={{
              ...chipStyle,
              ...(activeEra === null ? chipActiveStyle : {}),
            }}
            onClick={() => setActiveEra(null)}
          >
            全部
          </button>
          {ERA_FILTERS.map((era) => (
            <button
              key={era.id}
              style={{
                ...chipStyle,
                ...(activeEra === era.id ? chipActiveStyle : {}),
              }}
              onClick={() =>
                setActiveEra((prev) => (prev === era.id ? null : era.id))
              }
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "48px 0" }}>
          没有匹配的事件
        </p>
      )}

      <div style={timelineContainerStyle}>
        <div style={verticalLineStyle} />
        {filteredEvents.map((event, index) => {
          const isLeft = index % 2 === 0;
          const isExpanded = expandedEvent === index;
          const catColor = CATEGORY_META[event.cat]?.color ?? "#C8A951";
          const isVisible = visibleItems.has(index);

          return (
            <div
              key={`${event.title}-${event.year}`}
              ref={(el) => itemRefCallback(el, index)}
              style={{
                ...eventRowStyle,
                justifyContent: isLeft ? "flex-end" : "flex-start",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : `translateY(30px)`,
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div
                style={{
                  ...(isLeft ? eventCardLeftStyle : eventCardRightStyle),
                  cursor: "pointer",
                }}
                onClick={() => handleToggle(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(index);
                  }
                }}
                aria-expanded={isExpanded}
              >
                <div style={eventCardHeaderStyle}>
                  <span
                    style={{
                      ...categoryDotStyle,
                      background: catColor,
                      boxShadow: `0 0 8px ${catColor}60`,
                    }}
                  />
                  <span style={yearBadgeStyle}>{formatYear(event.year)}</span>
                  <span
                    style={{
                      ...categoryLabelStyle,
                      color: catColor,
                      borderColor: `${catColor}40`,
                    }}
                  >
                    {CATEGORY_META[event.cat]?.label ?? event.cat}
                  </span>
                </div>
                <h3 style={eventTitleStyle}>{event.title}</h3>
                <p style={eventDescStyle}>{event.desc}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={expandedBodyStyle}>
                        {event.longDesc ?? event.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={expandIndicatorStyle}>
                  {isExpanded ? "收起 ▴" : "展开 ▾"}
                </div>
              </div>

              <div
                style={{
                  ...nodeDotStyle,
                  background: catColor,
                  boxShadow: `0 0 0 4px ${catColor}30, 0 0 12px ${catColor}40`,
                  left: isLeft ? "calc(50% - 8px)" : "calc(50% - 8px)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

const controlsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "0 16px 24px",
};

const searchInputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  padding: "10px 16px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  width: "100%",
  maxWidth: 400,
};

const filterRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const filterLabelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "rgba(255,255,255,0.45)",
  minWidth: 40,
};

const chipStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 16,
  padding: "4px 14px",
  fontSize: 12,
  color: "rgba(255,255,255,0.65)",
  cursor: "pointer",
  transition: "all 0.2s",
  whiteSpace: "nowrap",
};

const chipActiveStyle: React.CSSProperties = {
  background: "rgba(200,169,81,0.25)",
  borderColor: "#C8A951",
  color: "#C8A951",
};

const timelineContainerStyle: React.CSSProperties = {
  position: "relative",
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 16px",
};

const verticalLineStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: 2,
  background:
    "linear-gradient(to bottom, transparent, rgba(200,169,81,0.3) 5%, rgba(200,169,81,0.3) 95%, transparent)",
  transform: "translateX(-50%)",
};

const eventRowStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  width: "100%",
  marginBottom: 32,
  alignItems: "flex-start",
};

const eventCardBaseStyle: React.CSSProperties = {
  width: "calc(50% - 40px)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "16px 20px",
  transition: "border-color 0.2s, background 0.2s",
};

const eventCardLeftStyle: React.CSSProperties = {
  ...eventCardBaseStyle,
  marginRight: 40,
  textAlign: "right",
};

const eventCardRightStyle: React.CSSProperties = {
  ...eventCardBaseStyle,
  marginLeft: 40,
  textAlign: "left",
};

const eventCardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 6,
};

const categoryDotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  flexShrink: 0,
};

const yearBadgeStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(255,255,255,0.7)",
};

const categoryLabelStyle: React.CSSProperties = {
  fontSize: 10,
  padding: "1px 8px",
  border: "1px solid",
  borderRadius: 10,
};

const eventTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#fff",
  margin: "0 0 4px",
  lineHeight: 1.4,
};

const eventDescStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.55)",
  margin: 0,
  lineHeight: 1.6,
};

const expandedBodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.7)",
  lineHeight: 1.8,
  paddingTop: 12,
  borderTop: "1px solid rgba(255,255,255,0.08)",
  marginTop: 12,
  whiteSpace: "pre-line",
};

const expandIndicatorStyle: React.CSSProperties = {
  fontSize: 11,
  color: "rgba(200,169,81,0.6)",
  marginTop: 8,
};

const nodeDotStyle: React.CSSProperties = {
  position: "absolute",
  top: 18,
  width: 16,
  height: 16,
  borderRadius: "50%",
  zIndex: 2,
};
