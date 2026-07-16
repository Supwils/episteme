"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "../../lib/constants";

type CellType = "animal" | "plant";

interface Organelle {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  function: string;
  details: string[];
  animalOnly?: boolean;
  plantOnly?: boolean;
}

const ORGANELLES: Organelle[] = [
  {
    id: "nucleus",
    name: "细胞核",
    nameEn: "Nucleus",
    color: "#5a9ad8",
    function: "DNA 存储，基因表达调控",
    details: [
      "含有细胞的遗传物质 DNA",
      "通过核膜与细胞质分离",
      "核仁负责核糖体 RNA 的合成",
      "控制细胞的生长、代谢和繁殖",
    ],
  },
  {
    id: "mitochondria",
    name: "线粒体",
    nameEn: "Mitochondria",
    color: "#e06c75",
    function: "能量生产，ATP 合成",
    details: [
      "细胞的「动力工厂」",
      "通过有氧呼吸产生 ATP",
      "拥有自身的环状 DNA",
      "内膜折叠形成嵴，增大反应面积",
    ],
  },
  {
    id: "er",
    name: "内质网",
    nameEn: "Endoplasmic Reticulum",
    color: "#c678dd",
    function: "蛋白质合成与运输",
    details: [
      "粗面内质网上附着核糖体",
      "滑面内质网参与脂质合成",
      "形成连续的膜网络系统",
      "新合成的蛋白质在此折叠和修饰",
    ],
  },
  {
    id: "golgi",
    name: "高尔基体",
    nameEn: "Golgi Apparatus",
    color: "#98c379",
    function: "蛋白质修饰与分选",
    details: [
      "对蛋白质进行糖基化修饰",
      "分选并包装蛋白质到不同目的地",
      "由一系列扁平膜囊堆叠而成",
      "参与细胞壁多糖的合成（植物细胞）",
    ],
  },
  {
    id: "lysosome",
    name: "溶酶体",
    nameEn: "Lysosome",
    color: "#d19a66",
    function: "细胞内消化",
    details: [
      "含有 50 多种水解酶",
      "分解细胞吞噬的物质",
      "清除衰老的细胞器（自噬）",
      "pH 值约为 4.5-5.0，维持酸性环境",
    ],
  },
  {
    id: "membrane",
    name: "细胞膜",
    nameEn: "Cell Membrane",
    color: "#7f8490",
    function: "选择性通透屏障",
    details: [
      "磷脂双分子层构成基本骨架",
      "控制物质进出细胞",
      "含有受体蛋白，接收信号",
      "流动镶嵌模型描述其结构",
    ],
  },
  {
    id: "ribosome",
    name: "核糖体",
    nameEn: "Ribosome",
    color: "#e5c07b",
    function: "蛋白质合成工厂",
    details: [
      "由 rRNA 和蛋白质组成",
      "读取 mRNA 密码子合成蛋白质",
      "游离核糖体和附着核糖体功能不同",
      "原核和真核细胞中都存在",
    ],
  },
  {
    id: "cytoplasm",
    name: "细胞质",
    nameEn: "Cytoplasm",
    color: "#56b6c2",
    function: "细胞内液体基质",
    details: [
      "由细胞质基质和细胞器组成",
      "含有水、无机盐和有机分子",
      "是许多代谢反应的场所",
      "为细胞器提供结构支撑",
    ],
  },
  {
    id: "cellwall",
    name: "细胞壁",
    nameEn: "Cell Wall",
    color: "#81b29a",
    function: "保护与结构支撑",
    details: [
      "由纤维素组成，提供刚性支撑",
      "位于细胞膜外侧",
      "维持细胞形态，防止过度吸水",
      "是植物细胞特有的结构",
    ],
    plantOnly: true,
  },
  {
    id: "chloroplast",
    name: "叶绿体",
    nameEn: "Chloroplast",
    color: "#3d8b6e",
    function: "光合作用",
    details: [
      "含有叶绿素，吸收光能",
      "将 CO₂ 和 H₂O 转化为有机物",
      "类囊体堆叠形成基粒",
      "拥有自身的 DNA，源于内共生",
    ],
    plantOnly: true,
  },
  {
    id: "vacuole",
    name: "液泡",
    nameEn: "Central Vacuole",
    color: "#a88adf",
    function: "储存与维持膨压",
    details: [
      "植物细胞中央大液泡占 90% 体积",
      "储存水分、离子和营养物质",
      "维持细胞的膨压和形态",
      "含有色素，可影响花和叶的颜色",
    ],
    plantOnly: true,
  },
];

const CELL_SIZES = {
  animal: { label: "10-30 μm", width: 420, height: 340 },
  plant: { label: "10-100 μm", width: 440, height: 360 },
};

interface OrganelleShape {
  id: string;
  d: string;
  labelX: number;
  labelY: number;
}

function getAnimalCellShapes(): OrganelleShape[] {
  return [
    {
      id: "cytoplasm",
      d: "M210,40 C340,40 400,120 400,170 C400,260 340,310 210,310 C80,310 20,260 20,170 C20,120 80,40 210,40 Z",
      labelX: 50,
      labelY: 30,
    },
    {
      id: "membrane",
      d: "M210,30 C350,30 415,115 415,170 C415,270 350,325 210,325 C70,325 5,270 5,170 C5,115 70,30 210,30 Z",
      labelX: 430,
      labelY: 170,
    },
    {
      id: "nucleus",
      d: "M210,120 C260,120 290,140 290,170 C290,200 260,220 210,220 C160,220 130,200 130,170 C130,140 160,120 210,120 Z",
      labelX: 210,
      labelY: 170,
    },
    {
      id: "mitochondria",
      d: "M80,100 C95,85 130,85 140,100 C150,115 145,135 125,140 C105,145 80,135 80,100 Z",
      labelX: 85,
      labelY: 215,
    },
    {
      id: "er",
      d: "M270,100 C280,90 320,85 340,95 L350,110 C330,115 290,110 275,115 L270,130 C290,135 330,130 345,140 L340,155 C320,150 280,155 270,160 Z",
      labelX: 330,
      labelY: 80,
    },
    {
      id: "golgi",
      d: "M100,200 C110,190 140,188 150,195 L155,202 C140,205 115,204 105,208 L108,215 C120,218 145,216 155,222 L150,228 C138,225 112,228 100,230 Z",
      labelX: 55,
      labelY: 248,
    },
    {
      id: "lysosome",
      d: "M310,220 C325,210 345,215 348,230 C350,245 340,255 325,255 C310,255 300,245 310,220 Z",
      labelX: 360,
      labelY: 248,
    },
    {
      id: "ribosome",
      d: "M170,240 C178,234 190,234 194,240 C198,246 194,254 184,254 C174,254 168,248 170,240 Z",
      labelX: 280,
      labelY: 290,
    },
  ];
}

function getPlantCellShapes(): OrganelleShape[] {
  return [
    {
      id: "cellwall",
      d: "M220,15 C370,15 430,90 430,180 C430,280 370,350 220,350 C70,350 10,280 10,180 C10,90 70,15 220,15 Z",
      labelX: 445,
      labelY: 180,
    },
    {
      id: "cytoplasm",
      d: "M220,35 C355,35 410,105 410,180 C410,265 355,330 220,330 C85,330 30,265 30,180 C30,105 85,35 220,35 Z",
      labelX: 50,
      labelY: 30,
    },
    {
      id: "membrane",
      d: "M220,30 C360,30 418,100 418,180 C418,270 360,340 220,340 C80,340 22,270 22,180 C22,100 80,30 220,30 Z",
      labelX: 50,
      labelY: 348,
    },
    {
      id: "vacuole",
      d: "M220,80 C320,80 370,130 370,180 C370,235 320,280 220,280 C120,280 70,235 70,180 C70,130 120,80 220,80 Z",
      labelX: 220,
      labelY: 180,
    },
    {
      id: "nucleus",
      d: "M100,140 C140,135 165,150 165,170 C165,190 140,200 100,195 C60,190 40,175 40,160 C40,145 60,140 100,140 Z",
      labelX: 100,
      labelY: 170,
    },
    {
      id: "chloroplast",
      d: "M310,80 C330,68 355,72 360,88 C365,104 350,115 330,112 C310,110 298,98 310,80 Z",
      labelX: 360,
      labelY: 100,
    },
    {
      id: "mitochondria",
      d: "M120,65 C132,55 155,55 162,65 C168,75 165,88 150,92 C135,96 115,88 120,65 Z",
      labelX: 130,
      labelY: 58,
    },
    {
      id: "er",
      d: "M300,140 C308,132 335,130 348,138 L352,150 C338,153 310,150 302,155 L305,165 C318,168 340,166 350,172 L345,182 C332,178 312,182 300,185 Z",
      labelX: 360,
      labelY: 155,
    },
    {
      id: "golgi",
      d: "M80,230 C90,220 115,218 125,224 L128,230 C115,233 95,232 86,236 L89,242 C100,245 120,243 128,248 L124,254 C112,251 92,254 80,256 Z",
      labelX: 50,
      labelY: 240,
    },
    {
      id: "lysosome",
      d: "M340,240 C350,232 365,236 368,248 C370,260 362,268 350,268 C338,268 332,258 340,240 Z",
      labelX: 375,
      labelY: 255,
    },
    {
      id: "ribosome",
      d: "M180,60 C186,54 196,54 200,60 C204,66 200,73 192,73 C184,73 178,67 180,60 Z",
      labelX: 250,
      labelY: 298,
    },
  ];
}

export function CellExplorer() {
  const reduce = useReducedMotion();
  const [cellType, setCellType] = useState<CellType>("animal");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const shapes = useMemo(
    () => (cellType === "animal" ? getAnimalCellShapes() : getPlantCellShapes()),
    [cellType]
  );

  const visibleOrganelles = useMemo(
    () =>
      ORGANELLES.filter((o) => {
        if (cellType === "animal") return !o.plantOnly;
        return !o.animalOnly;
      }),
    [cellType]
  );

  const selected = useMemo(() => ORGANELLES.find((o) => o.id === selectedId) ?? null, [selectedId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleToggle = useCallback((type: CellType) => {
    setCellType(type);
    setSelectedId(null);
  }, []);

  const size = CELL_SIZES[cellType];

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-fg-primary text-lg font-semibold">细胞结构探索器</h3>
          <p className="text-fg-muted mt-1 font-mono text-[11px] tracking-wide">
            点击细胞器查看详细信息
          </p>
        </div>
        <div
          className="inline-flex rounded-full border p-0.5"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        >
          <button
            onClick={() => handleToggle("animal")}
            className="rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-300"
            style={{
              background: cellType === "animal" ? "rgba(224,122,95,0.15)" : "transparent",
              color: cellType === "animal" ? "#e07a5f" : "var(--color-fg-muted)",
              border:
                cellType === "animal" ? "1px solid rgba(224,122,95,0.3)" : "1px solid transparent",
            }}
          >
            动物细胞
          </button>
          <button
            onClick={() => handleToggle("plant")}
            className="rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-300"
            style={{
              background: cellType === "plant" ? "rgba(129,178,154,0.15)" : "transparent",
              color: cellType === "plant" ? "#81b29a" : "var(--color-fg-muted)",
              border:
                cellType === "plant" ? "1px solid rgba(129,178,154,0.3)" : "1px solid transparent",
            }}
          >
            植物细胞
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div
            className="relative overflow-hidden rounded-xl border p-4"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cellType}
                initial={reduce ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? {} : { opacity: 0, scale: 0.95 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: PRODUCT_EASE }}
              >
                <svg
                  viewBox={`0 0 ${size.width} ${size.height}`}
                  className="mx-auto h-auto w-full max-w-lg"
                  role="img"
                  aria-label={cellType === "animal" ? "动物细胞结构图" : "植物细胞结构图"}
                >
                  <defs>
                    <filter id="organelle-glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="soft-shadow">
                      <feDropShadow
                        dx="0"
                        dy="1"
                        stdDeviation="2"
                        floodColor="#000"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </defs>

                  {shapes.map((shape) => {
                    const organelle = ORGANELLES.find((o) => o.id === shape.id);
                    if (!organelle) return null;
                    const isSelected = selectedId === shape.id;
                    const isHovered = hoveredId === shape.id;
                    const isHighlighted = isSelected || isHovered;
                    const isBackground =
                      shape.id === "cytoplasm" ||
                      shape.id === "membrane" ||
                      shape.id === "cellwall";

                    return (
                      <g key={shape.id}>
                        <motion.path
                          d={shape.d}
                          fill={organelle.color}
                          fillOpacity={isBackground ? 0.06 : isHighlighted ? 0.35 : 0.15}
                          stroke={organelle.color}
                          strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                          strokeOpacity={isHighlighted ? 0.9 : 0.4}
                          filter={isHighlighted ? "url(#organelle-glow)" : undefined}
                          onClick={() => handleSelect(shape.id)}
                          onMouseEnter={() => setHoveredId(shape.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{ cursor: "pointer" }}
                          initial={reduce ? {} : { pathLength: 0, fillOpacity: 0 }}
                          animate={{
                            pathLength: 1,
                            fillOpacity: isBackground ? 0.06 : isHighlighted ? 0.35 : 0.15,
                          }}
                          transition={{
                            duration: reduce ? 0 : 0.6,
                            ease: PRODUCT_EASE,
                            delay: reduce ? 0 : 0.1,
                          }}
                        />

                        {isBackground && (
                          <TransportParticles
                            color={organelle.color}
                            path={shape.d}
                            reduce={reduce ?? false}
                          />
                        )}
                      </g>
                    );
                  })}

                  {shapes
                    .filter((s) => {
                      const o = ORGANELLES.find((org) => org.id === s.id);
                      return (
                        o && s.id !== "cytoplasm" && s.id !== "membrane" && s.id !== "cellwall"
                      );
                    })
                    .map((shape) => {
                      const organelle = ORGANELLES.find((o) => o.id === shape.id);
                      if (!organelle) return null;
                      const isHovered = hoveredId === shape.id;
                      const isSelected = selectedId === shape.id;
                      return (
                        <text
                          key={`label-${shape.id}`}
                          x={shape.labelX}
                          y={shape.labelY}
                          textAnchor="middle"
                          fill={organelle.color}
                          fontSize="9"
                          fontFamily="monospace"
                          opacity={isHovered || isSelected ? 1 : 0.7}
                          style={{ pointerEvents: "none" }}
                        >
                          {organelle.name}
                        </text>
                      );
                    })}
                </svg>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-fg-muted font-mono text-[10px] tracking-wider">
                比例尺: {size.label}
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleOrganelles.map((o) => (
              <button
                key={o.id}
                onClick={() => handleSelect(o.id)}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide transition-all duration-200"
                style={{
                  borderColor: selectedId === o.id ? `${o.color}60` : "rgba(255,255,255,0.06)",
                  color: selectedId === o.id ? o.color : "var(--color-fg-muted)",
                  background: selectedId === o.id ? `${o.color}12` : "transparent",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: o.color, opacity: selectedId === o.id ? 1 : 0.5 }}
                />
                {o.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-72">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={reduce ? {} : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? {} : { opacity: 0, x: -20 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: PRODUCT_EASE }}
                className="rounded-xl border p-5"
                style={{
                  borderColor: `${selected.color}30`,
                  background: `${selected.color}08`,
                }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4
                      className="font-display text-base font-semibold"
                      style={{ color: selected.color }}
                    >
                      {selected.name}
                    </h4>
                    <p className="font-mono text-[10px] tracking-wider text-[#888] italic">
                      {selected.nameEn}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="rounded-full p-1 transition-colors hover:bg-white/5"
                    aria-label="关闭详情"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 3l8 8M11 3l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-[#b0b0c0]">{selected.function}</p>

                <div className="space-y-2">
                  {selected.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? {} : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.25,
                        delay: reduce ? 0 : i * 0.06,
                        ease: PRODUCT_EASE,
                      }}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: selected.color }}
                      />
                      <span className="text-[12px] leading-relaxed text-[#9ca3af]">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[200px] items-center justify-center rounded-xl border p-5"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <p className="text-fg-muted text-center font-mono text-[11px] tracking-wide">
                  点击左侧细胞器
                  <br />
                  查看结构与功能详情
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TransportParticles({
  color,
  path,
  reduce,
}: {
  color: string;
  path: string;
  reduce: boolean;
}) {
  const particles = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      duration: 6 + i * 0.8,
    }));
  }, []);

  if (reduce) return null;

  return (
    <>
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          r="2"
          fill={color}
          fillOpacity={0.4}
          filter="url(#organelle-glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            offsetPath: `path("${path}")`,
          }}
        />
      ))}
    </>
  );
}
