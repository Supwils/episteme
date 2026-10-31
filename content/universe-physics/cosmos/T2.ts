import type { TierContent } from "@/subjects/physics/lib/content";

const content: TierContent = {
  tier: "T2",
  name: { primary: "拉尼亚凯亚超星系团", latin: "Laniakea Supercluster" },
  tagline: "我们所在的引力分水岭",
  whisper: "Laniakea，夏威夷语：「广阔的天」。",
  dataCards: [
    {
      label: "2014重建尺度",
      latinLabel: "Diameter",
      value: "≈160 Mpc",
      hint: "约5.2亿光年；流盆地的特征尺度",
    },
    {
      label: "2014速度场输入",
      latinLabel: "CF2 sample",
      value: ">8 000星系",
      hint: "独立距离与径向本动；不是盆地全部成员数",
    },
    {
      label: "2014估计质量",
      latinLabel: "Mass",
      value: "≈10¹⁷ M⊙",
      hint: "数量级估计；未给统一0.1dex误差",
    },
    {
      label: "历史巨引源拟合方向",
      latinLabel: "Great Attractor",
      value: "ℓ≈307° · b≈+9°",
      hint: "1988流入模型；不是Norma团的精确坐标",
    },
    {
      label: "本动速度",
      latinLabel: "Peculiar velocity",
      value: "相对哈勃流的偏离",
      hint: "须标参考系；盆地内各处速度不同",
    },
    {
      label: "场的重建",
      latinLabel: "Wiener reconstruction",
      value: "ΛCDM先验",
      hint: "线性近似、距离误差与覆盖度影响结果",
    },
    {
      label: "命名",
      latinLabel: "Etymology",
      value: "夏威夷语「广阔的天」",
      hint: "Tully等2014",
    },
    {
      label: "Shapley集中区",
      latinLabel: "Shapley distance",
      value: "约200 Mpc",
      hint: "更大尺度流场的质量集中区",
    },
    {
      label: "太阳系CMB偶极",
      latinLabel: "Solar dipole",
      value: "3.362 mK",
      hint: "对应约370km/s；不是本星系群的约630km/s",
    },
    {
      label: "Cosmicflows-4",
      latinLabel: "CF4 distances",
      value: "55 877星系",
      hint: "归为38 065群；Tully等2023",
    },
    {
      label: "ACO1989目录",
      latinLabel: "Rich clusters",
      value: "4 073富星系团",
      hint: "星系团目录；不是超星系团目录",
    },
  ],
  narrative: [
    {
      heading: "用流向定义一个超星系团",
      body: [
        "星系沿丝状体、片层和团簇分布，给密度图选不同阈值，会得到不同的超星系团边界。Tully等2014改用重建的本动速度场：先扣除平均宇宙膨胀，再分离更远结构产生的潮汐流，寻找流线汇入同一吸引区的体积。这就是Laniakea的流盆地定义。",
        "其2014重建尺度约160Mpc、质量约10¹⁷个太阳质量，涵盖本星系群、室女座及Hydra–Centaurus等邻近结构。它不是已经整体维里化的巨大星系团，也不能由这张瞬时流图断言全部成员将来必定合并。",
      ],
    },
    {
      heading: "巨引源：一片质量集中区",
      body: [
        "1988年Lynden-Bell等用椭圆星系运动拟合巨引源，得到银河坐标ℓ≈307°、b≈+9°，红移距离尺度约4350km/s。这是特定流入模型的参数，不是发现了一颗在该精确位置的单一天体。2014局部流线汇聚区域与Norma、Centaurus等结构有关。",
        "银河前景尘埃和恒星使低银纬的“避带”难以观测。光学红移、近红外与X射线等资料共同补出被遮蔽的结构；不能说Norma直到1996年X射线巡天才首次现形。约600km/s的数值也不能赋给盆地中所有星系：速度会随位置和参考系变化。",
      ],
    },
    {
      heading: "更大的Shapley盆地仍有概率边界",
      body: [
        "Shapley集中区距我们约200Mpc，对较大尺度本动场有重要贡献。巨引源和Shapley并非给每个星系各加一个固定600km/s；要把不同尺度的引力贡献作为矢量场共同重建。",
        "Valade等2024在ΛCDM假设下，以Cosmicflows-4的约3.8万个星系群作Hamiltonian Monte Carlo重建。结果对Laniakea属于更大Shapley吸引盆地给出略占优势的概率，而不是证明了一个唯一、永久的新边界。数据、分组方式与重建不确定度会影响我们的“宇宙地址”。",
      ],
    },
    {
      heading: "测的是径向速度，重建的是三维场",
      body: [
        "在低红移近似下，径向本动可以写成v_pec≈cz−H₀d；这里红移需转到选定参考系，距离还依赖独立标尺。较远处要使用相应宇宙学距离与红移关系，不能把这一式无条件外推。Tully–Fisher、基本平面、Ia型超新星、表面亮度涨落等提供距离，近邻造父变星、红巨星支尖与几何测距帮助校准。",
        "单个距离误差可产生比本动信号还大的误差。2014工作采用有ΛCDM先验的维纳滤波，从稀疏的视向约束重建三维速度和密度；覆盖稀疏处更依赖先验。分水岭是不同流线吸引域之间的分界，并不一般是同一引力势值的等势面。",
      ],
    },
    {
      heading: "V-web：剪切张量，而非只看散度",
      body: [
        "Pomarède等2017的Cosmic V-Web用速度剪切张量的三个本征值及选定阈值分类：超过收缩阈值的本征值有三个、两个、一个或零个时，分别归为节点、丝状体、片层或空洞。阈值不必为零，因此空洞分类不要求三个方向的瞬时速度梯度都表示膨胀。散度只给三个方向的总和，单凭正负不能区分所有形态。",
        "本页手绘流线和边界用于说明汇聚与分水岭概念，未载入作者公开的观测速度网格，也不表示星系绕巨引源作统一螺旋运动。需要数据可视化时，应进入文献所附的原团队影片和交互模型。",
      ],
    },
    {
      heading: "先数星系团，再比较超星系团定义",
      body: [
        "Abell、Corwin与Olowin的1989目录包含4073个富星系团，带有成员亮度区间、丰富度等选择规则。它不是首份超星系团目录，也不是全部后续研究唯一出发点：红移、X射线与速度场选样会各自突出不同结构。",
        "Cosmicflows-4于2023年发表，汇编55877个星系的距离并归入38065群。这个目录提供测距与分组基础，复杂速度场的解释留给后续分析，不能把目录本身写成已证明Shapley边界的论文。对比不同目录时，应同时问清对象是星系、星系群还是富团。",
      ],
    },
    {
      heading: "CMB偶极：先说清谁在运动",
      body: [
        "Planck2018结果I的太阳系偶极振幅为3362.08±0.99微开尔文，方向ℓ=264.021°、b=48.253°；按主要为运动学偶极解释，对应太阳系质心相对CMB约370km/s。它与本星系群或本地薄片参考系中的约630km/s不是同一个速度。",
        "换参考系需作速度矢量变换；本星系群朝室女座的流入是要解释的宇宙学运动之一，不应再作为太阳系内部运动一并“减掉”。偶极告诉我们运动的总结果，单靠它不能唯一定位巨引源、Shapley或证明Laniakea分水岭；还须距离巡天和场重建。",
      ],
    },
  ],
  sources: [
    {
      label: "Tully等2014 · Laniakea的流盆地定义与重建",
      url: "https://arxiv.org/abs/1409.0880",
      kind: "paper",
    },
    {
      label: "Valade等2024 · 本地宇宙吸引盆地的概率重建",
      url: "https://arxiv.org/abs/2409.17261",
      kind: "paper",
    },
    {
      label: "Tully等2023 · Cosmicflows-4距离目录",
      url: "https://arxiv.org/abs/2209.11238",
      kind: "paper",
    },
    {
      label: "Pomarède等2017 · Cosmic V-Web剪切本征值分类",
      url: "https://arxiv.org/abs/1706.03413",
      kind: "paper",
    },
    {
      label: "Lynden-Bell等1988 · 巨引源流入模型",
      url: "https://www.adsabs.harvard.edu/pdf/1988ApJ...326...19L",
      kind: "paper",
    },
    {
      label: "Woudt等2008 · Norma团动力学",
      url: "https://arxiv.org/abs/0706.2227",
      kind: "paper",
    },
    {
      label: "ACO1989原目录 · CDS ReadMe与选择规则",
      url: "https://cdsarc.cds.unistra.fr/viz-bin/ReadMe/VII/110?format=html&tex=true",
      kind: "agency",
    },
    {
      label: "Planck2018结果I · §2.1/Table2太阳系偶极",
      url: "https://arxiv.org/html/1807.06205v2#S2.SS1",
      kind: "paper",
    },
    {
      label: "Tully等2008 · 本动矢量与参考系分解",
      url: "https://arxiv.org/abs/0705.4139",
      kind: "paper",
    },
    {
      label: "Cantiello等2024 · 室女座团表面亮度涨落距离",
      url: "https://arxiv.org/abs/2403.16235",
      kind: "paper",
    },
    {
      label: "Binggeli等1985 · VCC明确/候选成员分类",
      url: "https://doi.org/10.1086/113874",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "local-group",
      name: { primary: "本星系群", latin: "Local Group" },
      position: [0, 0, 0],
      description:
        "以银河系和M31为主要质量中心的近邻星系群，成员名录随微弱矮星系巡天更新；不能把太阳附近3Mpc内所有星系都算作本群成员。它是这张示意图的出发点。",
      data: [
        { label: "成员名录", value: "持续更新；依边界与确认口径" },
        { label: "主成员", value: "MW + M31" },
        { label: "下钻", value: "T3" },
      ],
      color: "#ffd29a",
      size: 0.024,
    },
    {
      id: "virgo-cluster",
      name: { primary: "室女座星系团", latin: "Virgo Cluster" },
      position: [0.35, 0.32, -0.18],
      description:
        "距离约16.5Mpc的近邻富团，含以M87和M49为中心的子结构。经典1985 VCC将1277个对象列为成员、另有候选，不能当2026完整计数。指向室女座的局部流入是本动的一部分，速率依重建与参考系。",
      data: [
        { label: "距离", value: "~16.5 Mpc" },
        { label: "经典VCC", value: "1277明确成员（1985）" },
        { label: "主星系", value: "M87" },
      ],
      color: "#c5d5ff",
      size: 0.028,
    },
    {
      id: "norma-cluster",
      name: { primary: "矩尺座星系团 / ACO 3627", latin: "Norma Cluster" },
      position: [0.95, -0.05, 0.22],
      description:
        "巨引源区域的重要富团，红移距离尺度约70Mpc，2008动力学分析在Abell半径内给约10¹⁵个太阳质量（H₀=73的标度）。银河前景遮蔽妨碍成员识别；其研究结合光学红移与多波段资料，并非1996才首次被X射线发现。",
      data: [
        { label: "距离", value: "~70 Mpc" },
        { label: "质量", value: "~10¹⁵ M⊙" },
        { label: "ZoA 中", value: "是" },
      ],
      color: "#ffb45a",
      size: 0.03,
    },
    {
      id: "centaurus-cluster",
      name: { primary: "半人马座星系团", latin: "Centaurus Cluster" },
      position: [0.72, 0.28, 0.55],
      description:
        "Abell3526是Hydra–Centaurus结构中的主要富团之一，处于距我们数十Mpc的尺度。它参与局部质量集中及本动场，不能在未统一质量估计半径与方法时断言为Laniakea第二重的团。",
      data: [
        { label: "尺度", value: "数十Mpc" },
        { label: "Abell", value: "A3526" },
        { label: "结构", value: "Hydra–Centaurus" },
      ],
      color: "#c5d5ff",
      size: 0.026,
    },
    {
      id: "hydra-cluster",
      name: { primary: "长蛇座星系团", latin: "Hydra Cluster" },
      position: [0.62, -0.42, -0.32],
      description:
        "Abell1060是Hydra–Centaurus区域的主要富团之一，距我们数十Mpc。它与Centaurus、Norma和Virgo等结构共同帮助勾画本地密度与速度场；各团不是整齐排列、独立相加的点引力源。",
      data: [
        { label: "尺度", value: "数十Mpc" },
        { label: "Abell", value: "A1060" },
        { label: "结构", value: "Hydra–Centaurus" },
      ],
      color: "#c5d5ff",
      size: 0.024,
    },
    {
      id: "great-attractor",
      name: { primary: "巨引源", latin: "Great Attractor" },
      position: [1.05, -0.18, 0.35],
      description:
        "巨引源是依据本动场提出的质量集中区。ℓ≈307°、b≈+9°是1988流入拟合的历史方向，约60Mpc是其距离量级，不是Norma团精确坐标。2014的局部汇聚区与Norma、Centaurus等结构相关；各位置本动不同，不能给全盆地统一600km/s。",
      data: [
        { label: "方向", value: "ℓ=307° · b=+9°" },
        { label: "距离量级", value: "约60Mpc；依流场模型" },
        { label: "速度场", value: "随位置和参考系变化" },
      ],
      color: "#fff0c4",
      size: 0.036,
    },
    {
      id: "shapley-basin",
      name: { primary: "Shapley 引力盆地", latin: "Shapley Basin" },
      // Illustrative layout; not an observed three-dimensional position or a nested-boundary measurement.
      position: [1.4, -0.32, 0.55],
      description:
        "Shapley集中区距我们约200Mpc，是较大尺度的重要质量集中区。Valade等2024利用分组CF4距离作概率重建，略倾向Laniakea与更大的Shapley盆地相连。该结果依ΛCDM、输入及重建，不是已确定的下一层边界，也不意味着每个对象都将合并。",
      data: [
        { label: "距离", value: "~200 Mpc" },
        { label: "状态", value: "更大流盆地的概率重建" },
        { label: "证据", value: "Valade等2024 · 分组CF4" },
      ],
      color: "#a48bff",
      size: 0.034,
    },
  ],
  relatedArticles: [
    { href: "/cosmology/knowledge-base/宇宙大尺度结构", title: "宇宙大尺度结构" },
    { href: "/cosmology/knowledge-base/星系天文学--galaxy-clusters", title: "星系团" },
    { href: "/cosmology/knowledge-base/星系形成与演化", title: "星系形成与演化" },
  ],
};

export default content;
