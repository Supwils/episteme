import type { TierContent } from "./types";

const content: TierContent = {
  tier: "T2",
  name: {
    primary: "拉尼亚凯亚超星系团",
    latin: "Laniakea Supercluster",
  },
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
      hint: "分组后38 065个约束条目，含单星系；2023摘要口径",
    },
    {
      label: "ACO1989目录",
      latinLabel: "Rich clusters",
      value: "4 073富星系团",
      hint: "星系团目录；不是超星系团目录",
    },
    {
      label: "速度观测分量",
      latinLabel: "Observed constraint",
      value: "视向本动",
      hint: "三维速度场由距离、红移与先验共同重建",
    },
    {
      label: "边界的含义",
      latinLabel: "Basin boundary",
      value: "流线吸引域分界",
      hint: "随输入和重建变化；不等于永久束缚或等势面",
    },
    {
      label: "V-web形态分类",
      latinLabel: "Velocity shear",
      value: "三个本征值",
      hint: "超过选定收缩阈值的方向数决定节点/纤维/片/空洞",
    },
    {
      label: "DES Y3超星系团样本",
      latinLabel: "Projected overdensities",
      value: "4 010个",
      hint: "Kovács等2022 Table1；光度红移切片中的二维识别",
    },
    {
      label: "DES Y3超团透镜叠合",
      latinLabel: "CMB lensing stack",
      value: "8.4σ",
      hint: "2022 DES×Planck；整样本叠合显著性，非单个盆地检出",
    },
    {
      label: "Einasto历史目录",
      latinLabel: "Supercluster catalogue",
      value: "220个",
      hint: "1996预印本、1997发表；富团选样与z≤0.12条件",
    },
    {
      label: "2024吸引盆地分析",
      latinLabel: "Probabilistic reconstruction",
      value: "ΛCDM + HMC",
      hint: "分组CF4数据；Laniakea归属更大Shapley盆地仅略占概率优势",
    },
  ],
  narrative: [
    {
      heading: "用流向定义一个超星系团",
      body: [
        "把星系画成三维点云，串珠、薄墙与空隙会逐渐浮现；要给其中一个超星系团画边界，却需要先选定义。密度阈值强调物质聚集的位置，速度场则提出另一个问题：扣除平均宇宙膨胀后，这些地方的流线汇向哪里？两种方法回答不同的问题，也会给出不同的成员范围。",
        "Tully等2014年在重建的本动场中分离局部与较远结构产生的潮汐流，再寻找汇入同一吸引区的流线体积，将我们所在的盆地命名为Laniakea，意为「广阔的天」。当时得到的特征尺度约160Mpc、质量约10¹⁷个太阳质量，包含本星系群、室女座以及Hydra–Centaurus等近邻结构。",
        "河流分水岭是一个有用的比喻，但宇宙里的流线描述指定时刻、指定重建下的本动场。星系并非沿固定河道流向不动的终点，盆地也没有一圈坚硬外壳。要进一步判断某片区域会不会停止膨胀、是否能长期束缚，还需要密度、速度与宇宙学背景共同决定其演化。",
      ],
    },
    {
      heading: "巨引源：被银河遮蔽的质量集中区",
      body: [
        "1988年Lynden-Bell等根据椭圆星系的运动拟合巨引源，得到银河坐标ℓ≈307°、b≈+9°及约4350km/s的红移距离尺度。这些数值属于当时的流入模型。后来更完整的红移和多波段资料揭示，相关质量分布跨越若干星系团及其间结构，而非一颗单独的巨大天体。",
        "银河前景的尘埃和恒星遮挡了低银纬的「避带」。光学红移、近红外与X射线资料从不同角度补出其中的星系与热气体；Norma团是巨引源区域的重要富团之一。2008年动力学研究在Abell半径内得到约10¹⁵个太阳质量，比较其他团的质量时还需统一半径和方法。",
        "本动有大小，也有方向和参考系。太阳系、本星系群与盆地中其他位置，所对应的速度并不相同。把巨引源理解为一片影响本地速度场的质量集中区，才能进一步讨论室女座、Norma、Centaurus以及更远结构分别贡献了什么，而不会将一个约600km/s的数值赋给整片宇宙。",
      ],
    },
    {
      heading: "Shapley：更大范围的宇宙地址",
      body: [
        "距我们约200Mpc的Shapley集中区是较大尺度的重要质量集中区。更远的过密度会影响本地区域的潮汐流，因此，研究者在讨论一个局部吸引盆地时，需要同时说明保留了哪些尺度、怎样分离外部贡献。图上相邻的几个中心共同构成场，无法简化为沿同一条直线依次相加的固定速度。",
        "Valade等2024年在ΛCDM假设下，用分组Cosmicflows-4数据和Hamiltonian Monte Carlo方法重建吸引盆地。结果对Laniakea属于更大的Shapley盆地给出略占优势的概率。这使「宇宙地址」成为带不确定性的推断：数据更密集、距离标尺或重建方式变化，都可能改变边界的概率分布。",
        "这样的概率表达保留了研究本身的信息。它既承认Shapley对更大尺度流场的作用，也没有将所有可能的流线组织压成唯一永久边界。阅读地图时，可以同时保留两层认识：Laniakea是理解本地汇聚的一种定义，而更大范围的盆地还需要在同一统计框架中比较。",
      ],
    },
    {
      heading: "从测距到三维速度场",
      body: [
        "红移给出视向运动信息，独立测距帮助分离平均膨胀与本动。低红移近似下可写v_pec≈cz−H₀d，其中红移须转到选定参考系；更远处要使用相应的宇宙学距离与红移关系。Tully–Fisher关系、基本平面、Ia型超新星和表面亮度涨落等提供不同距离线索，近邻标尺则帮助校准。",
        "Cosmicflows-4于2023年发表，汇编55877个星系的距离，摘要列出分组后38065个群与单星系条目。星系数、测距条目和分组约束各有含义；同群成员结合可降低某些随机误差，却不使所有标尺与校准误差彼此独立。该目录为后续速度场分析提供输入，目录本身与某项吸引盆地结论也应分开阅读。",
        "2014年的Laniakea工作采用有ΛCDM先验的维纳滤波，从稀疏的径向约束推断三维速度和密度。在覆盖稀疏或误差较大的区域，结果更依赖先验。有效分辨率还受距离、采样与平滑影响，不能用一个固定的全天角尺度概括。流线吸引域的分界也不一般等同于同一势值的等势面。",
      ],
    },
    {
      heading: "V-web：沿三个方向看收缩",
      body: [
        "速度场的散度描述局部体积变化，却不能独自区分片层和纤维。V-web进一步使用对称速度剪切张量的三个本征值：先约定张量符号和阈值，再数有几个方向超过收缩阈值。三个、两个、一个或零个方向，分别对应节点、纤维、片层或空洞类别。",
        "阈值不必取零，分类也受平滑尺度与重建方式影响。一个区域被归为空洞，不意味着其中每条轴都必须在当时膨胀；更不能仅凭散度的正负，给出全部四种形态。Pomarède等2017年的Cosmic V-Web将这种分类与重建流场结合，展示密度点云之外的动力学视角。",
        "本页流线用于说明汇聚、外部流与分水岭的概念，未载入原团队的观测速度网格。示意图上弯曲的轨迹也不代表所有星系绕巨引源统一旋转。若要研究实测数据中的方向、速度和置信范围，需要进入文献所附的原团队模型，连同它的选择与重建条件一起阅读。",
      ],
    },
    {
      heading: "从富星系团目录到超星系团目录",
      body: [
        "Abell、Corwin与Olowin的1989目录包含4073个富星系团，有成员亮度和丰富度等选择规则。星系团目录提供了识别更大聚集的示踪点；接下来还需选连通方法和红移范围，才会得到超星系团目录。母样本中的富团与最后识别的超团，是不同层级的对象。",
        "Einasto等在1996年预印、1997年发表的目录中，列出红移至0.12范围的220个富团超星系团。Chow-Martínez等2014年则用可调连通长度的FoF方法构建MSCC与南天SSCC，处理随红移变化的采样和不同天区的选择函数。加入较贫的团，既可能增加新结构，也可能连接或拆分原有结构。",
        "因此，目录数量的增长不能直接解释为宇宙多出了多少实体。比较时应记录母样本、覆盖、连通规则、最少成员和距离模型。速度流域、富团连接与平滑星系密度还可能对应不同边界；它们之间的一致与差异，帮助研究者区分真实结构、选样效果和模型解释。",
      ],
    },
    {
      heading: "CMB偶极：谁相对谁在运动",
      body: [
        "宇宙微波背景的天空叠加着显著偶极：一侧较热、另一侧较冷。Planck2018结果I给出的太阳系偶极振幅为3362.08±0.99微开尔文，方向ℓ=264.021°、b=48.253°。按其主要来自运动学效应解释，对应太阳系质心相对CMB约370km/s。",
        "本星系群或本地薄片参考系中的约630km/s，是另一组矢量变换后的量。太阳系内部和银河内部的运动需要按方向合成，不能只对速率作普通加减。指向室女座的局部流入本身也是待解释的宇宙学运动，不能作为太阳系内部运动一并扣除。",
        "偶极为运动总结果提供了重要约束，但单靠它无法唯一定位巨引源或Shapley，也无法单独确定Laniakea的边界。检验运动学解释还可使用其他观测；不同天体的数密度偶极另受偏置、选择和系统误差影响。出现方向或幅度差异时，须先在相同统计框架下评估这些因素。",
      ],
    },
    {
      heading: "瞬时流域与长期束缚",
      body: [
        "一张本动流图扣除了平均哈勃膨胀，显示的是相对于这层背景的运动。某方向有向内本动，并不保证物体之间的总物理距离正在缩短；它们也可能仍在膨胀，只是慢于背景。这是理解超星系团动力学时容易忽略的一步。",
        "星系群、星系团的某些核心可以已经束缚甚至接近维里化，更大的超星系团范围却可能仍在演化。判定长期命运，需要质量分布、速度与暗能量背景共同决定的动力学分析。整体流是指定体积内的平均运动，改变体积或参考系会改变它的含义，不能独自裁定整个区域的束缚性。",
        "数值模拟可以在同一宇宙学背景中跟踪这些过程，但模拟中的结构也必须用与观测一致的选法定义。若要报告某类超团的坍缩比例，应同时给出样本、分辨率、时间和判据。Valade等2024年的概率盆地结果回答的是吸引域重建问题，不能直接转译成一个已测出的未来合并比例。",
      ],
    },
    {
      heading: "光度红移与透镜：另一条普查路径",
      body: [
        "多波段成像能以较大覆盖获得大量对象的颜色，进而估计光度红移。DES Y3 Gold的2021年数据论文描述了近5000平方度、近3.9亿个成像对象；这是母数据集规模，包含不同类别与质量的对象，具体宇宙学分析还需进一步选样。大样本优势伴随视线距离误差，需要在结构识别中处理。",
        "Kovács等2022年用DES Y3的redMaGiC亮红星系，在0.15<z<0.8划出15个厚100h⁻¹Mpc的切片，分别对平滑二维密度图寻找空洞和过密度。其Table1含4010个超星系团对象。这里的定义是为投影透镜检验设计的，与测距和本动定义的Laniakea盆地有所不同。",
        "把这些对象与Planck的CMB透镜图叠合，得到超团样本8.4σ的透镜信号；相对于MICE模板的振幅为0.84±0.10。检测显著性描述信号是否存在，模板振幅描述与指定模拟的比较，两者回答不同问题。这种大样本统计检验也不等于每个超团都被单独精确称重或确定了长期束缚边界。",
      ],
    },
    {
      heading: "用多种地图交叉检验宇宙结构",
      body: [
        "速度地图、星系密度与透镜图各自突出物质分布的不同侧面。红移和独立距离约束本动；透镜对沿视线的总质量敏感；X射线、SZ与中性氢信号则选择不同气体条件。把它们放进一致的样本与空间尺度，才能判断一个重建的质量集中区是否得到其他观测支持。",
        "对拉尼亚凯亚这样的近邻大结构，银河前景、距离零点、稀疏采样和外部潮汐贡献仍是重要问题。更丰富的数据可改善约束，但红移条目增多并不自动变成同样多的独立精密测距，也不保证立刻得到无歧义的速度矢量。需要把新增信息怎样进入重建、又怎样传播不确定性讲清楚。",
        "从2014年的流域命名，到2023年的CF4目录及2024年的概率盆地分析，宇宙地址的变化体现了定义、数据和推断共同演进。读者可以沿着书目比较原始输入与方法，而不必等待某个预设年份宣布争论结束。一张好的宇宙地图，也应让人看见边界是怎样得到的、哪些地方仍留有不确定性。",
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
    {
      label: "Einasto等1997 — 富团超星系团目录",
      url: "https://arxiv.org/abs/astro-ph/9610088",
      kind: "paper",
    },
    {
      label: "Chow-Martínez等2014 — Abell/ACO超星系团目录与选择函数",
      url: "https://arxiv.org/abs/1409.5152",
      kind: "paper",
    },
    {
      label: "DES Y3 Gold2021 — 测光母数据集与分类",
      url: "https://arxiv.org/abs/2011.03407",
      kind: "paper",
    },
    {
      label: "Kovács等2022 — DES空洞/超星系团与Planck透镜",
      url: "https://academic.oup.com/mnras/article/515/3/4417/6649835",
      kind: "paper",
    },
  ],
  markers: [
    {
      id: "local-group",
      name: {
        primary: "本星系群",
        latin: "Local Group",
      },
      position: [0, 0, 0],
      description:
        "以银河系和M31为主要质量中心的近邻星系群，成员名录随微弱矮星系巡天更新；不能把太阳附近3Mpc内所有星系都算作本群成员。它是这张示意图的出发点。",
      data: [
        {
          label: "成员名录",
          value: "持续更新；依边界与确认口径",
        },
        {
          label: "主成员",
          value: "MW + M31",
        },
        {
          label: "下钻",
          value: "T3",
        },
      ],
      color: "#ffd29a",
      size: 0.024,
    },
    {
      id: "virgo-cluster",
      name: {
        primary: "室女座星系团",
        latin: "Virgo Cluster",
      },
      position: [0.35, 0.32, -0.18],
      description:
        "距离约16.5Mpc的近邻富团，含以M87和M49为中心的子结构。经典1985 VCC将1277个对象列为成员、另有候选，不能当2026完整计数。指向室女座的局部流入是本动的一部分，速率依重建与参考系。",
      data: [
        {
          label: "距离",
          value: "~16.5 Mpc",
        },
        {
          label: "经典VCC",
          value: "1277明确成员（1985）",
        },
        {
          label: "主星系",
          value: "M87",
        },
      ],
      color: "#c5d5ff",
      size: 0.028,
    },
    {
      id: "norma-cluster",
      name: {
        primary: "矩尺座星系团 / ACO 3627",
        latin: "Norma Cluster",
      },
      position: [0.95, -0.05, 0.22],
      description:
        "巨引源区域的重要富团，红移距离尺度约70Mpc，2008动力学分析在Abell半径内给约10¹⁵个太阳质量（H₀=73的标度）。银河前景遮蔽妨碍成员识别；其研究结合光学红移与多波段资料，并非1996才首次被X射线发现。",
      data: [
        {
          label: "距离",
          value: "~70 Mpc",
        },
        {
          label: "质量",
          value: "~10¹⁵ M⊙",
        },
        {
          label: "ZoA 中",
          value: "是",
        },
      ],
      color: "#ffb45a",
      size: 0.03,
    },
    {
      id: "centaurus-cluster",
      name: {
        primary: "半人马座星系团",
        latin: "Centaurus Cluster",
      },
      position: [0.72, 0.28, 0.55],
      description:
        "Abell3526是Hydra–Centaurus结构中的主要富团之一，处于距我们数十Mpc的尺度。它参与局部质量集中及本动场，不能在未统一质量估计半径与方法时断言为Laniakea第二重的团。",
      data: [
        {
          label: "尺度",
          value: "数十Mpc",
        },
        {
          label: "Abell",
          value: "A3526",
        },
        {
          label: "结构",
          value: "Hydra–Centaurus",
        },
      ],
      color: "#c5d5ff",
      size: 0.026,
    },
    {
      id: "hydra-cluster",
      name: {
        primary: "长蛇座星系团",
        latin: "Hydra Cluster",
      },
      position: [0.62, -0.42, -0.32],
      description:
        "Abell1060是Hydra–Centaurus区域的主要富团之一，距我们数十Mpc。它与Centaurus、Norma和Virgo等结构共同帮助勾画本地密度与速度场；各团不是整齐排列、独立相加的点引力源。",
      data: [
        {
          label: "尺度",
          value: "数十Mpc",
        },
        {
          label: "Abell",
          value: "A1060",
        },
        {
          label: "结构",
          value: "Hydra–Centaurus",
        },
      ],
      color: "#c5d5ff",
      size: 0.024,
    },
    {
      id: "great-attractor",
      name: {
        primary: "巨引源",
        latin: "Great Attractor",
      },
      position: [1.05, -0.18, 0.35],
      description:
        "巨引源是依据本动场提出的质量集中区。ℓ≈307°、b≈+9°是1988流入拟合的历史方向，约60Mpc是其距离量级，不是Norma团精确坐标。2014的局部汇聚区与Norma、Centaurus等结构相关；各位置本动不同，不能给全盆地统一600km/s。",
      data: [
        {
          label: "方向",
          value: "ℓ=307° · b=+9°",
        },
        {
          label: "距离量级",
          value: "约60Mpc；依流场模型",
        },
        {
          label: "速度场",
          value: "随位置和参考系变化",
        },
      ],
      color: "#fff0c4",
      size: 0.036,
    },
    {
      id: "shapley-basin",
      name: {
        primary: "Shapley 引力盆地",
        latin: "Shapley Basin",
      },
      position: [1.4, -0.32, 0.55],
      description:
        "Shapley集中区距我们约200Mpc，是较大尺度的重要质量集中区。Valade等2024利用分组CF4距离作概率重建，略倾向Laniakea与更大的Shapley盆地相连。该结果依ΛCDM、输入及重建，不是已确定的下一层边界，也不意味着每个对象都将合并。",
      data: [
        {
          label: "距离",
          value: "~200 Mpc",
        },
        {
          label: "状态",
          value: "更大流盆地的概率重建",
        },
        {
          label: "证据",
          value: "Valade等2024 · 分组CF4",
        },
      ],
      color: "#a48bff",
      size: 0.034,
    },
  ],
  discussionQuestions: [
    "密度连通、速度流域与长期引力束缚分别怎样定义超星系团？它们会在哪些条件下给出不同边界？",
    "径向本动、三维场重建与CMB偶极各自提供什么信息？误差与参考系如何影响比较？",
    "怎样比较光度红移切片中的超团透镜信号与Laniakea的流域重建，而不混淆样本和尺度？",
  ],
};

export default content;
