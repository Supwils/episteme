# docs/ 索引

本目录是 universe-physics 项目的**单一文档源**。所有产品、设计、工程决策都从这里出发。

## 总览

| 文件                         | 用途                                                   |
| ---------------------------- | ------------------------------------------------------ |
| [`WORKLOG.md`](./WORKLOG.md) | 工作日志 — 每次会话结束必须更新                        |
| [`design/`](./design)        | 产品定位、体验设计、内容模型、视觉风格                 |
| [`develop/`](./develop)      | 技术选型、架构、工程规范、动画策略、性能预算、阶段计划 |

## design/

| 文件                                                                    | 内容                                                        |
| ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| [`01-vision-and-scope.md`](./design/01-vision-and-scope.md)             | 项目愿景、目标用户、阶段范围                                |
| [`02-design-principles.md`](./design/02-design-principles.md)           | 产品设计原则 (做什么 / 不做什么)                            |
| [`03-ui-ux-guidelines.md`](./design/03-ui-ux-guidelines.md)             | UI/UX 指南 — 布局、交互、响应式、可访问性                   |
| [`04-universe-experience.md`](./design/04-universe-experience.md)       | **核心** — 宇宙板块跨尺度浏览体验设计                       |
| [`05-content-and-data-model.md`](./design/05-content-and-data-model.md) | 宇宙知识数据模型与内容来源                                  |
| [`06-visual-style.md`](./design/06-visual-style.md)                     | 视觉系统 — 配色、字体、光感、粒子风格                       |
| [`07-3d-visual-upgrade.md`](./design/07-3d-visual-upgrade.md)           | 3D 视觉升级方向 — 当前粗糙点、目标气质、视觉锚点、效果分级  |
| [`08-handwritten-universe.md`](./design/08-handwritten-universe.md)     | SVG 手绘宇宙双主题规范（夜版/日版）                         |
| [`09-physics-vision.md`](./design/09-physics-vision.md)                 | **Physics 板块** — 9 档主题主线、深度阶梯、与 Universe 互文 |
| [`10-section-architecture.md`](./design/10-section-architecture.md)     | Section 抽象层 — Section × Tier × ViewMode 三层关系         |

## develop/

| 文件                                                                             | 内容                                                             |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`01-tech-stack.md`](./develop/01-tech-stack.md)                                 | 技术栈选型与版本                                                 |
| [`02-architecture-overview.md`](./develop/02-architecture-overview.md)           | 仓库结构、模块边界、状态管理                                     |
| [`03-engineering-guidelines.md`](./develop/03-engineering-guidelines.md)         | 编码规范、命名、目录、Git 流程                                   |
| [`04-animation-strategy.md`](./develop/04-animation-strategy.md)                 | 动画与渲染策略 (跨尺度相机、LOD、过场)                           |
| [`05-performance-budget.md`](./develop/05-performance-budget.md)                 | 性能预算与监控                                                   |
| [`06-phase-1-plan.md`](./develop/06-phase-1-plan.md)                             | **真相源** — 一期有序任务清单                                    |
| [`07-3d-implementation-plan.md`](./develop/07-3d-implementation-plan.md)         | 3D 视觉升级实施清单 — P0/P1/P2 分级与文件改动                    |
| [`08-handwritten-implementation.md`](./develop/08-handwritten-implementation.md) | 手绘宇宙板块实施指南 — 目录、组件契约、过场实现                  |
| [`09-physics-implementation.md`](./develop/09-physics-implementation.md)         | **Physics 板块实施指南** — 目录、9 档文件契约、新 marker variant |
| [`10-section-refactor.md`](./develop/10-section-refactor.md)                     | Section 抽象重构指南 — 影响面、迁移步骤、回归清单                |
| [`asset-credits.md`](./develop/asset-credits.md)                                 | 资产 / 字体 / 科研数据 / 工程依赖来源与 license 集中清单         |

## 阅读顺序建议

第一次进入仓库的代理 / 协作者：

1. `/CLAUDE.md` (项目根)
2. `docs/design/01-vision-and-scope.md`
3. `docs/design/04-universe-experience.md`
4. `docs/develop/01-tech-stack.md`
5. `docs/develop/06-phase-1-plan.md`
6. `docs/WORKLOG.md` (看最近一次会话的接力点)
