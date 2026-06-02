import type { TierContent } from "@/src-physics/lib/content";

const content: TierContent = {
  tier: "T7",
  name: { primary: "地球", latin: "Earth · Terra" },
  tagline: "我们站着的这颗",
  whisper: "蓝白色的薄壳，挂在百亿光年深的黑里。",
  dataCards: [
    {
      label: "赤道半径",
      latinLabel: "Equatorial radius",
      value: "6378.137 km",
      hint: "WGS84",
    },
    {
      label: "质量",
      latinLabel: "Mass",
      value: "5.972 × 10²⁴ kg",
    },
    {
      label: "表面平均温度",
      latinLabel: "Surface temperature",
      value: "+14.9 °C",
      hint: "1991–2020 NOAA",
    },
    {
      label: "公转周期",
      latinLabel: "Orbital period",
      value: "365.256 d",
    },
    {
      label: "自转周期",
      latinLabel: "Sidereal day",
      value: "23h 56m 4.1s",
    },
    {
      label: "大气主要成分",
      latinLabel: "Atmosphere",
      value: "N₂ 78% · O₂ 21%",
    },
    {
      label: "月球轨道半径",
      latinLabel: "Lunar distance",
      value: "60.3 R⊕",
      hint: "384 399 km",
    },
    {
      label: "地球年龄",
      latinLabel: "Age",
      value: "4.54 Gyr",
      hint: "±0.05",
    },
    {
      label: "内核半径",
      latinLabel: "Inner core radius",
      value: "1 221 km",
      hint: "Lehmann 1936 · 地震波",
    },
    {
      label: "大氧化事件",
      latinLabel: "Great Oxidation Event",
      value: "≈ 2.4 Gya",
      hint: "Bekker 2004 · S 同位素",
    },
    {
      label: "最近一次地磁反转",
      latinLabel: "Brunhes–Matuyama",
      value: "0.78 Mya",
      hint: "古地磁同位素年代",
    },
    {
      label: "五大灭绝最严重",
      latinLabel: "End-Permian extinction",
      value: "≈ 252 Mya",
      hint: "海洋物种损失 ~96%",
    },
  ],
  narrative: [
    {
      heading: "薄到不可思议的家",
      body: [
        "地球的「可居住层」其实极薄：海洋平均深度 3.7 km，对流层顶 ~12 km。把这层和地球半径 (6378 km) 比一比，可居住带占地球半径不到 0.2%。如果地球缩到苹果大，这一层比果皮还薄。",
        "我们在这层壳里完成了所有的故事 — 一切已知生命、一切人类历史、一切「外部世界」。从这张图上看，地球不过是一颗 12 千公里直径的蓝色球，但它在所有已知宇宙物体里是独一无二的。",
      ],
    },
    {
      heading: "大气是颜色，也是护盾",
      body: [
        "你看到的「地球蓝」来自两件事：海洋反射的天空蓝，以及大气本身的 Rayleigh 散射。短波长光被空气分子优先散射，所以从外太空看地球边缘有一圈薄薄的蓝光晕 — 这就是「Earthrise」(Apollo 8, 1968) 那张照片里最打动人的一笔。",
        "大气还把我们和真空、太阳风、紫外线、流星雨隔开。臭氧层 (O₃, 25 km 处) 阻挡了 97%–99% 的 UV-B；磁层在 10 R⊕ 外把太阳风偏折掉。少了任何一个，地表都难维持复杂生命。",
      ],
    },
    {
      heading: "月球：被绑架的同伴",
      body: [
        "月球是太阳系里相对母体最大的卫星 (月-地质量比 1:81)。主流假说 (Giant Impact, Hartmann & Davis 1975) 是 ~45 亿年前一颗火星大小的天体 Theia 撞击原始地球，溅射出的物质重凝成月球。这能解释月球与地幔的同位素相似性，以及月球缺乏铁核的事实。",
        "月球正在以 3.8 cm/年的速度远离地球 (Lunar Laser Ranging, 1969 起)，这是潮汐摩擦在搬运角动量。如果时间足够长，月球最终会与地球的自转潮汐锁定 — 不过那要等到太阳变红巨星之后。",
      ],
    },
    {
      heading: "我们离开过这里",
      body: [
        "1961 (Gagarin 进入轨道) — 1969 (Apollo 11 登月) — 2024 (Artemis I 测试) 之间，有 24 个人见过整个地球作为一个球体的样子。在那 600 多公里高度的近地轨道之上，看下去的视角永远把所有的国界都抹掉了。",
        "目前国际空间站 (ISS) 在 400 km 处持续有人驻守 (2000 起)。商业航天 (SpaceX Crew Dragon, Blue Origin) 把这个高度的票价拉低到 7 位数美元。我们距离「家门」越来越近，但回头看那颗蓝色球时，仍然只有一个。",
      ],
    },
    {
      heading: "「淡蓝色圆点」",
      body: [
        "1990 年 2 月 14 日，旅行者 1 号从 60 亿公里外回望地球，拍下那张 0.12 像素大小的「淡蓝色圆点 (Pale Blue Dot)」。在那张照片里，地球是阳光散射条纹中的一颗粒尘。",
        "Carl Sagan 写下名句：「On it everyone you love, everyone you know, every human being who ever was, lived out their lives.」这是从尺度最大处俯瞰，回到本档的注脚 —— 我们整个尺度阶梯，最终终结于这粒蓝色尘埃。",
      ],
    },
    {
      heading: "生物圈：唯一的样本",
      body: [
        "Drake 方程粗算银河系里通讯文明的数量从 1 到百万；Fermi 悖论问：那「他们」在哪？我们目前唯一拥有的「生命」样本就是脚下这一颗。从厌氧古菌、光合作用到大氧化事件、寒武纪大爆发、智人，这层壳里发生过自然界已知最复杂的现象。",
        "今天 (2026)：陆地森林正以 ~10⁵ km²/年的速率丢失；海洋酸化 pH 已下降 ~0.1；全球均温较 1880 年高 +1.2 °C。气候模型 (IPCC AR6) 给出 1.5°C / 2.0°C 两道阈值 —— 我们正在测试我们这层 ±20 km 的壳还能承受多少。",
      ],
    },
    {
      heading: "地球内部 · 用地震波切的洋葱",
      body: [
        "地球内部我们无法直接钻达 —— 最深的科拉超深钻孔也只到 12.3 km，连地壳都没穿透。所有的内部知识都来自地震波：P 波 (纵波) 能穿过液体，S 波 (横波) 不能。Mohorovičić 1909 用 P 波折射界面发现了地壳-地幔的「莫霍面」(~35 km 下方)；Gutenberg 1914 用 S 波在 2890 km 深处消失证明那里是液态外核；Lehmann 1936 又用 P 波弱折射在 5150 km 处发现了固态内核。",
        "今天的图像更精细：内核 1 221 km 半径、温度 ~5400 K，主要是 Fe-Ni 合金；外核 2 260 km 厚，电流回路产生地磁场；地幔 2 890 km 厚，固态但在地质时间尺度上像极慢的流体，是板块运动的引擎；最外层是几十 km 的脆性岩石圈。互文 P5 凝聚态：内核虽然温度比太阳表面还高，但 300+ GPa 的巨压让铁保持固态。",
      ],
    },
    {
      heading: "板块、灭绝、大氧化 · 把 45 亿年压成一段叙事",
      body: [
        "1912 年 Wegener 提出大陆漂移，被讥讽了半个世纪；1960 年代海底磁异常条带 (Vine-Matthews 1963) 证实了海底扩张，板块构造一夜之间从异端变成主流，Wilson cycle 把超大陆 ~500 Myr 一次的聚散写成可预测的节律 —— Pangaea (250 Mya) 是上一个，Amasia 可能是下一个。板块边界还驱动了五次大灭绝中的两次：二叠纪末 (252 Mya) 西伯利亚大火成岩省、白垩纪-古近纪界 (66 Mya) 撞击叠加德干 Traps。",
        "更深的故事在大气层。在 ~2.4 Gya 之前地球大气几乎没有 O₂；蓝藻光合作用慢慢积累的氧把海洋里的 Fe²⁺ 一次性氧化成 Fe₃O₄ 沉积成带状铁矿 (BIF)，再过剩的 O₂ 涌进大气 —— Bekker 2004 用硫同位素 Δ³³S 信号锁住了这次「大氧化事件 (GOE)」。氧化的大气在 0.7 Gya 又催生了 Snowball Earth，再过 1 亿多年化解出寒武纪大爆发。Anthropocene 起点 (1950s 核试验放射性峰值 vs 工业革命) 至今仍在 IUGS 表决中。",
      ],
    },
  ],
  sources: [
    {
      label: "NASA Earth Fact Sheet",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html",
      kind: "agency",
    },
    {
      label: "WGS 84 — World Geodetic System",
      url: "https://nsgreg.nga.mil/doc/view?i=4085",
      kind: "agency",
    },
    {
      label: "Hartmann & Davis 1975 — Giant impact origin of the Moon",
      url: "https://www.sciencedirect.com/science/article/pii/0019103575900702",
      kind: "paper",
    },
    {
      label: "NOAA Global Climate Report",
      url: "https://www.ncei.noaa.gov/access/monitoring/monthly-report/global",
      kind: "agency",
    },
    {
      label: "IPCC AR6 — Climate Change 2023 synthesis",
      url: "https://www.ipcc.ch/report/ar6/syr/",
      kind: "agency",
    },
    {
      label: "Sagan 1994 — Pale Blue Dot",
      url: "https://www.planetary.org/articles/pale-blue-dot",
      kind: "encyclopedia",
    },
    {
      label: "Bekker et al. 2004 — Dating the Great Oxidation Event",
      url: "https://www.nature.com/articles/nature02260",
      kind: "paper",
    },
    {
      label: "Vine & Matthews 1963 — Seafloor spreading magnetic anomalies",
      url: "https://www.nature.com/articles/199947a0",
      kind: "paper",
    },
    {
      label: "USGS — Earth's interior structure",
      url: "https://www.usgs.gov/special-topics/water-science-school/science/earths-interior",
      kind: "agency",
    },
  ],
  markers: [
    {
      id: "earth-surface",
      name: { primary: "地球表面", latin: "Earth Surface" },
      position: [0, 1.0, 0],
      description:
        "薄到 0.2% 半径的可居住层在这里。海洋占 71%，陆地 29%。已知生命的全部都活在这层 ±20 km 的壳里。",
      data: [
        { label: "海洋占比", value: "71%" },
        { label: "陆地占比", value: "29%" },
        { label: "已知生物多样性", value: "~870 万种" },
      ],
      color: "#a3c9ff",
      size: 0.08,
    },
    {
      id: "atmosphere",
      name: { primary: "大气层", latin: "Atmosphere" },
      position: [0, 0, 1.12],
      description:
        "78% N₂ + 21% O₂ + 1% Ar、CO₂、水蒸气等。Rayleigh 散射让短波长（蓝光）优先被散射，这就是天蓝色和地球边缘蓝光晕的成因。臭氧层 (O₃) 在 25 km 高度挡掉了 97%–99% 的 UV-B。",
      data: [
        { label: "对流层顶", value: "~12 km" },
        { label: "Kármán 线", value: "100 km" },
        { label: "外大气层", value: "~10 000 km" },
      ],
      color: "#7cbcff",
      size: 0.1,
    },
    {
      id: "geostationary",
      name: { primary: "地球同步轨道", latin: "Geostationary Orbit" },
      position: [6.6, 0, 0],
      description:
        "高度 35 786 km (6.6 R⊕)，公转周期与地球自转同步 (23h 56m)。卫星在这条轨道上对地面看起来「悬停」，是通信和气象卫星的主要驻留地。GOES / Himawari / Inmarsat 系列都在这里。",
      data: [
        { label: "半径", value: "6.6 R⊕" },
        { label: "高度", value: "35 786 km" },
        { label: "周期", value: "23h 56m 4s" },
      ],
      color: "#6ad0ff",
      size: 0.12,
    },
    {
      id: "moon",
      name: { primary: "月球", latin: "Moon · Luna" },
      // Visually compressed: real Moon orbits at 60.3 R⊕; placed at 5 R⊕
      // here for framing. The marker carries the real value.
      position: [5, 0.15, 0],
      description:
        "地球唯一的天然卫星，半径 1737 km (0.273 R⊕)，质量比 1:81。Giant Impact 起源 (Hartmann & Davis 1975)。当前以 3.8 cm/年的速度远离地球，由地月系统的潮汐摩擦驱动。本图把月距从真实的 60.3 R⊕ 压缩到 5 R⊕，方便构图；marker 数据保留真值。",
      data: [
        { label: "真实轨道半径", value: "60.3 R⊕ (384 399 km)" },
        { label: "半径", value: "0.273 R⊕" },
        { label: "起源", value: "Giant Impact" },
      ],
      color: "#e6e6f0",
      size: 0.32,
    },
    {
      id: "inner-core",
      name: { primary: "内核", latin: "Inner Core" },
      // 1221 km / 6378 km ≈ 0.191 R⊕ — embedded under the sphere surface (marker
      // floats just inside the equator so the hover halo reads above the planet).
      position: [0.0, 0.0, 0.5],
      description:
        "Lehmann 1936 用 P 波弱折射在 5150 km 深处发现了固态内核。今天的图像更精细：半径 1 221 km，温度 ~5400 K，主要是 Fe-Ni 合金；外层 2 260 km 厚的液态外核电流回路产生地磁场。虽然温度比太阳表面还高，但 300+ GPa 的巨压让铁保持固态 —— 互文 P5 凝聚态。",
      data: [
        { label: "半径", value: "1 221 km" },
        { label: "温度", value: "~5400 K" },
        { label: "压强", value: "330 – 360 GPa" },
        { label: "发现", value: "Lehmann 1936" },
      ],
      color: "#ffb066",
      size: 0.12,
    },
    {
      id: "plate-tectonics",
      name: { primary: "板块构造", latin: "Plate Tectonics" },
      // Surface, opposite hemisphere from earth-surface marker.
      position: [-0.95, 0.18, -0.25],
      description:
        "Wegener 1912 提出大陆漂移；Vine-Matthews 1963 用海底磁异常条带证实海底扩张，板块构造一夜之间从异端变成主流。Wilson cycle 把超大陆的聚散写成 ~500 Myr 节律 (Pangaea ↔ Amasia)。板块边界也驱动了五次大灭绝中的两次：二叠纪末 (252 Mya) 西伯利亚 LIP、白垩纪末 (66 Mya) 撞击叠加德干 Traps。",
      data: [
        { label: "节律", value: "Wilson cycle ~500 Myr" },
        { label: "Pangaea", value: "~250 Mya" },
        { label: "首份证据", value: "Vine-Matthews 1963" },
      ],
      color: "#c3a880",
      size: 0.085,
    },
  ],
};

export default content;
