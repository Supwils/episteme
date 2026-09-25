# CI/CD 与渲染策略

## 一、交付流水线

GitHub Actions 的唯一生产工作流是`.github/workflows/ci.yml`，在`main`推送、面向`main`的PR和手动触发时运行。仅修改`docs/`不会触发部署。

| 作业    | 职责                                                          | 生产门禁               |
| ------- | ------------------------------------------------------------- | ---------------------- |
| Quality | 生成索引幂等性、类型、Lint、内容与图谱审计、单元测试          | 是                     |
| Build   | Next生产构建、SSG/ISR manifest、bundle、smoke与Lighthouse预算 | 是                     |
| Deploy  | Vercel生产环境构建与预构建产物部署                            | 同时依赖Quality与Build |

Quality与Build并行以缩短反馈时间。Deploy只在非PR的`main`运行；任一上游失败都禁止生产部署。工作流只有`contents: read`权限，Vercel CLI固定版本，所有作业都有超时。

三个作业固定在`ubuntu-24.04`，不随`ubuntu-latest`漂到新系统（GitHub 2026-10-19 起把`ubuntu-latest`切到 26.04）；换系统要单独一轮验证 Lighthouse 与冒烟。

另有`.github/workflows/e2e-nightly.yml`：每天 UTC 10:17 在生产构建上跑冒烟以外的全部 spec（`pnpm test:e2e:full`），也可手动触发。它不部署、不拦 push。部署门禁只跑冒烟，其余 spec 以前只在有人手动跑时才暴露过期：2026-09-25 第一次全量跑出 15 条失败，多是写死的篇数、写死的旋转角、小地图改画布后出现两个 canvas，外加一个真实的手机端布局问题（连接引擎面板一半在屏幕外）。

## 二、可复现构建

`pnpm build`先通过`prebuild`执行`pnpm gen-all`，再用Next 15 Turbopack生产构建。Quality会提前执行同一生成链并要求工作区零差异，因此：

- 内容索引、wiki-link、反向链接和预览必须已经提交且可重复生成。
- 生成器必须主动使用仓库Prettier配置，不能依赖提交钩子二次改写。
- 业务目录名不能被宽泛`.gitignore`规则误排除；测试覆盖率目录只允许用根级`/coverage/`规则忽略。

## 三、页面渲染类型

| 类型            | 当前用途                                                 | 更新方式                         |
| --------------- | -------------------------------------------------------- | -------------------------------- |
| 构建期静态生成  | 知识图谱外壳、固定阅读页、部分专题页                     | 新部署                           |
| 构建期SSG + ISR | 首页、每日页、每日API、连续体API、五个知识汇流页面/API   | 1小时或24小时后台重验证          |
| 首次访问SSG     | 通用学科文章动态slug；`generateStaticParams()`返回空数组 | 首次请求生成，缓存到下次部署     |
| 动态运行时      | 随机每日内容、学习目标查询、用户档案与前沿规划、OG图片   | 每次请求；私有数据使用`no-store` |

通用文章的正文来自随部署发布的本地内容文件。对它们设置定时ISR不会获得新内容，只会增加函数重算，因此采用首次访问生成并缓存到下一部署，同时避免在构建阶段生成数千文件。

首页和每日内容包含日期选择，使用1小时ISR。连续体与知识汇流是公开、确定性数据，使用24小时ISR和共享CDN缓存。用户学习档案只保存在本地浏览器，相关POST接口必须保持动态和`private, no-store`。

## 四、自动渲染审计

`pnpm audit-rendering`优先读取生产构建的聚合`.next/prerender-manifest.json`。本地若在生产构建后继续使用同一`.next`启动Next 15.5 Turbopack开发服务器，聚合清单可能被局部覆盖为空；此时审计自动切换到分散产物模式：核对静态HTML/API body、完整`app-path-routes-manifest.json`，并通过TypeScript AST读取页面模块的`revalidate`、`dynamicParams`和`generateStaticParams`契约。CI在构建后直接审计，正常使用聚合模式。

审计会验证关键路由是否产生正确构建产物、重验证周期是否准确、固定参数集合是否关闭未知slug、通用文章是否保持首次访问SSG，以及私有/查询接口是否仍为动态运行时。源码注释或Next构建日志不能替代这一门禁；源码AST只负责补足Turbopack空聚合清单不再携带的路由配置，静态与动态判定仍必须有生产产物佐证。

Lighthouse保留逐路由固定预算。每条路由和每次确认采样都启动独立Chrome进程。有效首测直接决定通过；仅当trace无效或超预算时再跑最多**两次**确认（共最多 3 条 trace），全部失败才阻断部署。这样不放宽预算，同时吸收共享 CI runner 的冷启动抖动。首页 TBT 仍为 250ms（决策记录第 2 条）。

Bundle门禁按App Router的逐路由manifest对JS与CSS资源去重求和，不使用全目录总量替代用户实际加载量。全目录JS只作为库存，并拆分报告“路由引用资产”和“延迟资产”；真正阻断部署的是共享首载、通用文章、逐路由CSS、最大单块与搜索索引预算。门户和所有领域路由CSS均不得超过48 KB gzip（2026-08-02 按决策记录第 1 条的预设触发条件由40 KB提额，因六个领域引入katex.min.css）；`app/globals.css`必须是`app/`下唯一Tailwind编译入口，领域样式通过`@reference`向根入口注册主题token。该约束防止新学科再次生成一份完整工具类，同时允许领域变量和页面组件样式继续按路由加载。完整预算表见`docs/工程原则.md`第四节。

Playwright smoke在同一Build作业内复用已完成的`.next`生产产物，不重复构建，不使用Turbopack开发服务器。门禁用runner已有Chrome执行桌面和移动端各两次核心旅程：门户搜索到首次请求SSG文章，以及知识图谱深链恢复与步骤推进。Lighthouse先于smoke执行，避免性能基准继承功能浏览器测试的runner资源压力；两者仍都是部署硬门禁。CI保留一次重试以生成trace，但启用`failOnFlakyTests`，任何依赖重试的用例仍会阻断部署。smoke失败时上传HTML报告、截图和trace并保留7天；完整E2E仍留在本地或专项回归，避免每次push运行138项造成慢反馈。

## 五、Vercel部署

原生Vercel Git部署在`vercel.json`中关闭，避免同一次`main`推送产生重复部署。GitHub Actions使用以下顺序：

1. `vercel pull --environment=production`获取项目设置和生产环境变量。
2. `vercel build --prod`生成`.vercel/output`。
3. `vercel deploy --prebuilt --prod --archive=tgz`部署已构建产物。

归档模式用于绕过大规模Next函数产物的文件数和符号链接校验问题。`VERCEL_TOKEN`只存在GitHub Secrets；组织ID和项目ID是资源标识，不是凭证。

## 六、本地复现

`pnpm prepush` 镜像 Quality 作业里的确定性命令（类型、Lint、内容、四项图谱/学科审计、图像权利、单测）。它**不**跑 `gen-all` 幂等，也**不**跑 Build 作业。

内容或前端轮次在授权 `git push origin main` 之前，跑 **`pnpm predeploy`**。这条命令按 CI 顺序在本地做完全集：

1. `pnpm gen-all`，工作区必须干净（上次文学预览 excerpt 漂移就是这里拦的）。
2. `pnpm prepush`
3. `pnpm build` → `audit-rendering` → `bundle-check --skip-build`（三者都认 `NEXT_DIST_DIR`，所以 `NEXT_DIST_DIR=.next-prod pnpm predeploy` 可以不碰开发用的 `.next`）
4. 在独占端口 **3069** 起生产 `next start`，跑 Lighthouse（本机 3000 常被占用，不能拿错进程的结果当预算）。
5. `CI=1 pnpm test:e2e:smoke`（冒烟自己在 3068 起服务）

不要把 `predeploy` 挂进 husky：生产构建和 TBT 抖动不该挡住只改 `docs/` 的 push。云端 Deploy（`vercel pull` / `vercel build --prod` / `--prebuilt --archive`）仍只在 GitHub Actions 上跑，本地没有 `VERCEL_TOKEN` 也不该替生产部署。

```bash
pnpm install --frozen-lockfile
pnpm predeploy
```
