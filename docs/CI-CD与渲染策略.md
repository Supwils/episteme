# CI/CD 与渲染策略

## 一、交付流水线

GitHub Actions 的唯一生产工作流是`.github/workflows/ci.yml`，在`main`推送、面向`main`的PR和手动触发时运行。仅修改`docs/`不会触发部署。

| 作业    | 职责                                                                      | 生产门禁               |
| ------- | ------------------------------------------------------------------------- | ---------------------- |
| Quality | 生成索引幂等性、类型、Lint、内容与图谱审计、单元测试                      | 是                     |
| Build   | Next生产构建、SSG/ISR manifest、OG函数资产、bundle、smoke与Lighthouse预算 | 是                     |
| Deploy  | Vercel生产环境构建与预构建产物部署                                        | 同时依赖Quality与Build |

Quality与Build并行以缩短反馈时间。Deploy只在非PR的`main`运行；任一上游失败都禁止生产部署。工作流只有`contents: read`权限，Vercel CLI固定版本，所有作业都有超时。

三个作业固定在`ubuntu-24.04`，不随`ubuntu-latest`漂到新系统（GitHub 2026-10-19 起把`ubuntu-latest`切到 26.04）；换系统要单独一轮验证 Lighthouse 与冒烟。

另有`.github/workflows/e2e-nightly.yml`：每天 UTC 10:17 在生产构建上跑冒烟以外的全部 spec（`pnpm test:e2e:full`），也可手动触发。它不部署、不拦 push。部署门禁只跑冒烟，其余 spec 以前只在有人手动跑时才暴露过期：2026-09-25 第一次全量跑出 15 条失败，多是写死的篇数、写死的旋转角、小地图改画布后出现两个 canvas，外加一个真实的手机端布局问题（连接引擎面板一半在屏幕外）。

`e2e/reading-width.spec.ts` 覆盖 320 / 390px 双主题正文、原生键盘滚动、宽度变化、站内软导航和无 JavaScript。它随既有夜间全量运行，手动 `pnpm test:e2e:webkit` 也使用同一专项；WebKit 验收仍不能替代 Safari 真机。

`e2e/chinese-math.spec.ts` 同样进入夜间全量与手动 WebKit，覆盖真实中文集合定义、下标、超宽分段式与价格，以及生成语料的搜索 API 和页面摘要。自然换行的公式不强制滚动；只用真实超宽样本验证键盘访问，无 JavaScript 也须可读。

`e2e/diagram-touch.spec.ts` 进入同一套夜间全量与手动 WebKit 专项，覆盖函数绘图器/生命树的点按、鼠标跨边界捕获、键盘取消、重置、缩放与 320 / 390px 双主题单行标签。原生触屏滑动以手机 Chromium 的 CDP 输入验证默认滚页、一次平移、松手及取消后恢复；桌面 Chromium 和两种 WebKit 项目明确跳过这两条原生滑动用例，不能用合成 DOM 触摸事件冒充 Safari 真机。布局需等待字体与既有进场动画稳定，比较文档坐标以排除焦点自动滚动，pageerror 继续完整断言。

`e2e/modal-lifecycle.spec.ts` 同时进入夜间全量和手动 WebKit，验证导航图册完整加载、领域跳转、折叠/内部滚动/下拉取消、搜索背景滚动与关闭恢复、叠层 Escape、焦点归还、断点和历史导航，以及空白/检索/清空时 ARIA 目标存在。原生触摸两条仅在手机 Chromium 的 CDP 中运行，WebKit 手机滚轮另按能力跳过；其余语义、键盘、点按和版式由两引擎共同检查。不依赖硬编码领域数，不用只查静态探索链接证明完整图册。允许规范中的浏览器控件焦点，但任何仍获页面焦点的背景控件均须失败。

`e2e/search-navigation.spec.ts` 进入同两套浏览器配置，覆盖真实 NextLink 后的路径前进/返回、仅查询参数的原生 History 变化、相同 URL 不误关和重新搜索。浏览器探针只观察搜索 fetch 的取消信号，响应闸门保证请求已到达拦截边界；逐例确认文档标识未变，不能用整页替换掩盖共享组件的清理缺口。精确的输入/正文防抖时点与迟到结果由组件回归控制，浏览器层不依赖小于 100ms 的机器时序。最简探索页通过全站快捷入口打开搜索，手机视口的该步骤不代表真机键盘或触摸验收。

`e2e/curiosities.spec.ts` 同样进入夜间与手动 WebKit：直接筛选地址、重新载入、每个登记学科、真实文章往返、原生查询历史与洗牌顺序都核对选中按钮和完整卡片集合；无 JavaScript 检查静态全墙和文章链接。计数与标题集合读真实奇趣注册表，不把按钮处于 pressed 状态等同于内容正确，也不手写现有卡数。

领域计数文案的回归直接读取真实 metadata 导出与 SSR 输出，以 23 域的统计替身复核首页、共享社交摘要、图册/格致仪和奇趣介绍的依赖；正常统计另与注册表核对。这只是文案来源试验，不是新增领域验收。服务端文案只向客户端传短文本；生产检查同时比较对应路由初始 JS，保留原有静态渲染门禁。

## 二、可复现构建

`pnpm build`先通过`prebuild`执行`pnpm gen-all`，再用Next 15 Turbopack生产构建。Quality会提前执行同一生成链并要求工作区零差异，因此：

- 内容索引、wiki-link、反向链接和预览必须已经提交且可重复生成。
- 生成器必须主动使用仓库Prettier配置，不能依赖提交钩子二次改写。
- 业务目录名不能被宽泛`.gitignore`规则误排除；测试覆盖率目录只允许用根级`/coverage/`规则忽略。

### 运行时依赖与本地补丁复核

Next.js 维护版本升级先核对官方公告与实际安装路径，配套 MDX / ESLint 同步固定；当前为 15.5.28。sharp 由内容生成器直接使用，声明为直接依赖并固定 0.35.5，同时约束 `next@15.5.28>sharp`；Next 的宽松可选范围不能代替实际子依赖验证。保留已安装的 React 19.2.6 与 Playwright 1.60.0，避免借安全修补扩展到大版本迁移。

每次升级先在临时目录检查官方包是否仍需要 React 重放补丁，再用 frozen 安装核对两份补丁和实际依赖。应用层验收包括 gen-all 幂等、受信图像的新目录再生成、quality、生产构建/三项产物审计、五路 Lighthouse、全量 Chrome 与 WebKit、部署同款 smoke；Next 内置四运行时另在系统 Chrome 和安装版 Chromium 跑确定性水合重放，真实不匹配必须仍然上报。开发服务的关键入口也要实际读取。

`pnpm audit --prod` 会计入旧 `apps/portal` importer，不能把其 Next 15.5.18 公告计成根应用漏洞，也不能把构建依赖或有前提的输入路径直接称为公网可利用。保留原始回执，按路径与调用条件记录剩余项，不手工剪裁 importer，不用全局 audit fix 清数字。补丁原理、版本约束和移除条件见 [`patches/README.md`](../patches/README.md)。

传递依赖维护从真实父包目录解析实际实例；Next 的 PostCSS 不能用 Tailwind 的根目录实例代验。source map 回归同时保留无基准、目录外及合法同目录三类对照；KaTeX 既验证继承选项不授予权限，也验证显式信任与展开预算。KaTeX 0.18 内部类名前缀迁移需扫描现有选择器，并对中文定义、宽分段式、上下标的双主题窄屏版式以及本地分享图作前后比较；不改变正文识别规则或为消除告警扩大图片/公式信任。

## 三、页面渲染类型

| 类型            | 当前用途                                                      | 更新方式                               |
| --------------- | ------------------------------------------------------------- | -------------------------------------- |
| 构建期静态生成  | 知识图谱外壳、固定阅读页、部分专题页                          | 新部署                                 |
| 构建期SSG + ISR | 首页、连续体API、五个知识汇流页面/API                         | 1小时或24小时后台重验证                |
| 首次访问SSG     | 通用学科文章动态slug；`generateStaticParams()`返回空数组      | 首次请求生成，缓存到下次部署           |
| 动态运行时      | 每日页与三个每日API、学习目标查询、用户档案与前沿规划、OG图片 | 每次请求；每日和私有数据使用`no-store` |

通用文章的正文来自随部署发布的本地内容文件。对它们设置定时ISR不会获得新内容，只会增加函数重算，因此采用首次访问生成并缓存到下一部署，同时避免在构建阶段生成数千文件。

首页保留1小时ISR首屏；日期区域初始 HTML 带有快照日期，水合后校正旧日快照，在北京时间午夜或休眠标签页恢复时刷新日期、书架与巧合。无 JavaScript 时首页保留标注日期的快照，`/daily` 提供请求当天的完整 HTML。ISR 是请求触发的后台重验证：过期后的首个请求仍可得到旧页，并非“至多延迟一小时”。

`/daily`、`/api/daily`、`/api/daily/home` 和 `/api/daily/shuffle` 按请求时钟选取，响应 `no-store`；API 用 `X-Daily-Refresh-After` 返回距下次北京时间午夜的毫秒数。一个快照同时拥有日期、条目和历史事件，换批与跨日共用取消、超时和过期响应保护。客户端接收响应后按服务端剩余时间调度，初始水合不读取浏览器时间来生成另一份正文。每日页不设段级 `loading.tsx`，避免禁用 JavaScript 时停在骨架；知识卡和历史事件的服务端初始状态须可见。

连续体与知识汇流是公开、确定性数据，使用24小时ISR和共享CDN缓存。用户学习档案只保存在本地浏览器，相关POST接口必须保持动态和`private, no-store`。

## 四、自动渲染审计

`pnpm audit-rendering`优先读取生产构建的聚合`.next/prerender-manifest.json`。本地若在生产构建后继续使用同一`.next`启动Next 15.5 Turbopack开发服务器，聚合清单可能被局部覆盖为空；此时审计自动切换到分散产物模式：核对静态HTML/API body、完整`app-path-routes-manifest.json`，并通过TypeScript AST读取页面模块的`revalidate`、`dynamicParams`和`generateStaticParams`契约。CI在构建后直接审计，正常使用聚合模式。

审计会验证关键路由是否产生正确构建产物、重验证周期是否准确、固定参数集合是否关闭未知slug、通用文章是否保持首次访问SSG，以及私有/查询接口是否仍为动态运行时。源码注释或Next构建日志不能替代这一门禁；源码AST只负责补足Turbopack空聚合清单不再携带的路由配置，静态与动态判定仍必须有生产产物佐证。

`/api/og` 使用 Node、Satori 和 Resvg WASM，在服务端读取固定版本的中文、拉丁及单色表情字体；完整 PNG 生成成功后才返回 200 与一天的公开 CDN 缓存，失败返回 503、`no-store`、`Retry-After: 60`。同进程复用成功的字体加载，读取失败不永久缓存。`pnpm audit-og-assets` 读取该路由的 NFT 追踪，核对字体哈希、许可证和 WASM 均随函数部署，并限制字体 14 MiB / 追踪资产 20 MiB；这些资源不进入页面首载。新增字形或语言先过元数据覆盖测试，再复核函数体积与许可证，依据见任务清单第 20 条。

Lighthouse保留逐路由固定预算。每条路由和每次确认采样都启动独立Chrome进程。有效首测直接决定通过；仅当trace无效或超预算时再跑最多**两次**确认（共最多 3 条 trace），全部失败才阻断部署。这样不放宽预算，同时吸收共享 CI runner 的冷启动抖动。首页 TBT 仍为 250ms（决策记录第 2 条）。

Bundle门禁按App Router的逐路由manifest对JS与CSS资源去重求和，不使用全目录总量替代用户实际加载量。全目录JS只作为库存，并拆分报告“路由引用资产”和“延迟资产”；真正阻断部署的是共享首载、通用文章、逐路由CSS、最大单块与搜索索引预算。CSS 自 2026-09-23 起按 brotli 计：全站共享表 ≤30 KB、单路由增量 ≤10 KB、首访合计 ≤40 KB，依据见`任务清单.md`决策记录第 15 条；`app/globals.css`必须是`app/`下唯一Tailwind编译入口，领域样式通过`@reference`向根入口注册主题token。该约束防止新学科再次生成一份完整工具类，同时允许领域变量和页面组件样式继续按路由加载。完整预算表见`docs/工程原则.md`第四节。

Playwright smoke在同一Build作业内复用已完成的`.next`生产产物，不重复构建，不使用Turbopack开发服务器。门禁用runner已有Chrome执行桌面和移动端各两次核心旅程：门户搜索到首次请求SSG文章，以及知识图谱深链恢复与步骤推进。Lighthouse先于smoke执行，避免性能基准继承功能浏览器测试的runner资源压力；两者仍都是部署硬门禁。CI保留一次重试以生成trace，但启用`failOnFlakyTests`，任何依赖重试的用例仍会阻断部署。smoke失败时上传HTML报告、截图和trace并保留7天；完整E2E仍留在本地或专项回归，避免每次push运行138项造成慢反馈。

### Service Worker 与离线缓存

生产环境启用 `/sw.js`；开发环境保留注销旧 Worker 与一次性重载保护。v5 缓存使用 `episteme-` 命名空间，激活仅清理对应旧版本和历史 v1–v3 三类桶。迁移会淘汰旧离线副本，公开页面及资产须在联网访问后重新建立；同源其他缓存保留。

API、跨源、搜索 Worker、搜索索引和离线 Worker 代码保持直通。导航使用 network-first，只有当前页面 URL 的合规副本可离线回放；未命中返回带首页链接的 503/no-store。禁止存储的请求和响应不进入 CacheStorage，撤销许可会删除旧公开副本。哈希资产缓存优先，普通资产后台重验证；显式刷新先尝试网络，失败仍可回放合规资产。页面 / 哈希资产 / 普通资产分别为 60 / 400 / 200 条，限制按后台维护完成后的条目数计，浏览器配额负责实际字节容量。

`e2e/service-worker.spec.ts` 显式允许 Service Worker，其他功能测试仍隔离它；测试真实生产每日页 no-store、公开文章离线重载与水合、资产超量清理和控制中 Worker 的升级。升级验证等待 `activated`，因为 [Service Worker 激活算法](https://w3c.github.io/ServiceWorker/#activation-algorithm)在 activate 事件完成前就可能发送 controllerchange。这些回归加入既有夜间全量，缓存策略单测进入 Quality。另覆盖真实站内点击后离线刷新与阅读交互，以及带 brotli/Vary 的生产压缩代理；不能仅靠 CacheStorage 命中断言离线水合可用。共享文章外壳在公开文章实际打开后延迟请求 HTML 副本，只补缺少的同源哈希启动脚本与样式，完成后才保存正文；不存 RSC，不预取相关内容。预算、额外成本与尽力而为的边界见任务清单决策第 22 条。`/sw.js` 与 `/sw-reading.js` 须同步发布，注册使用 `updateViaCache: none`，更新不依赖模块的 HTTP 缓存过期。

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
3. `pnpm build` → `audit-rendering` → `audit-og-assets` → `bundle-check --skip-build`（均识别 `NEXT_DIST_DIR`，所以 `NEXT_DIST_DIR=.next-prod pnpm predeploy` 可以不碰开发用的 `.next`）
4. 在独占端口 **3069** 起生产 `next start`，跑 Lighthouse（本机 3000 常被占用，不能拿错进程的结果当预算）。
5. `CI=1 pnpm test:e2e:smoke`（冒烟自己在 3068 起服务）

不要把 `predeploy` 挂进 husky：生产构建和 TBT 抖动不该挡住只改 `docs/` 的 push。云端 Deploy（`vercel pull` / `vercel build --prod` / `--prebuilt --archive`）仍只在 GitHub Actions 上跑，本地没有 `VERCEL_TOKEN` 也不该替生产部署。

```bash
pnpm install --frozen-lockfile
pnpm predeploy
```

### 浏览器通道与关闭诊断

全量、冒烟和物理专项共用 `E2E_BROWSER_CHANNEL`：默认 `chrome`（系统 Chrome），显式设置 `chromium` 则使用锁文件对应 Playwright 安装的完整浏览器和新 headless 模式。所有桌面/手机项目都使用选定通道，报告元数据记录 `browserChannel`；非法值在启动测试前报错。选择是显式的，不会因某次失败自动换通道。CI 的默认浏览器及既有重试、跳过、断言策略保持原样。[通道与安装方式](https://playwright.dev/docs/browsers#chromium-new-headless-mode)以 Playwright 官方文档为准。

```bash
pnpm exec playwright install chromium --no-shell
NEXT_DIST_DIR=.next-prod E2E_BROWSER_CHANNEL=chromium pnpm test:e2e:full
pnpm test:e2e:browser-lifecycle
E2E_BROWSER_CHANNEL=chromium pnpm test:e2e:browser-lifecycle
```

关闭诊断不启动 Next、不访问外网，在 macOS/Linux 上执行默认 3 次独立的启动、点击交互、上下文关闭、客户端断开与浏览器服务关闭。总时限默认 30 秒（可用 `--cycles=1 --timeout-ms=5000` 调整）；JSON 保存到 `.cache/browser-lifecycle/`，也可用 `--output=路径` 指定。报告包含实际 Node/Playwright/浏览器版本、最后阶段、各阶段耗时，以及浏览器子进程的 `exit` 和 `close` 事件；后两者可区分进程已退出但管道仍未关闭的情况。只有完整采样后进程自然退出才记为通过；超时、错误或中断均非零退出，并清理本次启动句柄所属的进程组。

2026-10-20 的短样例在两个通道上各 3 次正常退出，但系统 Chrome 全量对照再次停在桌面项目结束。描述符对照确认浏览器已退出，其 stdout/stderr 仍由 crashpad 与 GoogleUpdater 辅助进程持有；只关闭测试工作进程的读端后，原有清理立即完成。现由 `playwright-core@1.60.0` 本地补丁在真实 `exit` 后排空 1 秒日志，再释放仍未关闭的本方标准流；正常关闭、失败退出码和既有进程树清理保持原逻辑。来源、范围、升级移除条件见 `patches/README.md`。

`pnpm test:e2e:browser-lifecycle:regression` 会主动注入真实浏览器的管道继承，以及启动进程退出码 42。未修复时正常关闭场景在 5 秒超时；修复后必须自然退出、持有管道的后代仍存活，失败场景仍返回非零并报告 42。样例最后仅清理自己创建的后代。[上游 #39736](https://github.com/microsoft/playwright/issues/39736)因缺少可运行复现已关闭；本地修复依据是本机因果证据和确定性回归，不能当作上游已合并修复。

### 整页替换期间的网络诊断

`pnpm diagnose:navigation` 不启动 Next，不访问外网；在两个自有环回端口上，对 WebKit 与所选 Chromium 通道各运行三轮：正常同源完整正文、真正的跨端口 CORS 预检拒绝、保持替换文档响应未发送时的旧文档新请求、已收到响应头与首段正文后的在途响应取消。替换阶段由服务器实际收到导航请求触发，500ms 仅是观察窗口；不靠固定延迟决定文档是否已开始替换。fetch 与 XHR 的结果、服务器入站方法/Origin/响应码、原始 pageerror、浏览器 requestfailed、DOM error/unhandledrejection、浏览器版本及进程 exit/close 一并写入 JSON。成功对照同时校验 200、完整正文和服务器完成状态，只有响应头不算完成。故意抛出的异常和 Promise 拒绝验证两层观察器仍有效。

```bash
pnpm diagnose:navigation
pnpm diagnose:navigation --cycles=1 --output=/tmp/navigation.json
E2E_BROWSER_CHANNEL=chromium pnpm diagnose:navigation
```

默认总时限 30 秒，`--timeout-ms=5000…120000`、`--cycles=1…10`、`--observation-ms=100…3000` 可调整；报告默认在 `.cache/navigation-cancellation/`。启动为清理预留时间，超时或中断报告非零，只处理本次取得的浏览器句柄与自有 HTTP 服务。观察期满未完成的请求记录为 `pending`；为避免在替换期间排队读取旧上下文，其 DOM 信号记 `null`。进程字段是最后观察状态，故障清理后的实际存活须核对报告中的具体 PID 与临时端口。`status: complete` 仅说明对照有效、矩阵完成；是否复现必须看各替换场景的 `finding`，不能用退出码 0 证明机制。

2026-10-21 本机 Playwright 1.60.0 / WebKit 26.4 三轮均观察到：同源控制两种 API 返回 200；真正跨域失败有带原始 Origin 和 POST 方法的 OPTIONS 入站、403、零 POST；文档替换中的同源新请求没有入站，fetch 拒绝、XHR error/status 0，产生两条访问控制 pageerror，但没有 DOM error 或未处理拒绝。Chrome 155 在相同阶段的观察窗口结束时仍等待且无 pageerror。另测已经流式传输的正文：两种引擎均发生未完成正文的取消，浏览器和服务器确认后才关闭测试上下文，避免把测试清理误算成导航取消；WebKit 在替换响应仍被保持时已关闭两条在途连接，Chrome 在该观察点尚未关闭，响应释放并完成导航后确认已关闭。这些是本机实验边界的观测，不是对浏览器内部提交时序的推断。这个无框架样例支持将本站快速 `goto` 的相同症状归因于文档替换边界，不能据此放宽 CORS、全局过滤 pageerror，或宣称所有 Safari 版本和请求取消均已验证。[上游 #43120](https://github.com/microsoft/playwright/issues/43120)、[#42823](https://github.com/microsoft/playwright/issues/42823)是相关报告，不能代替本机证据。独立页面断言使用独立上下文；真正的站内导航路径仍须保留完整验证。同一轮的真实生产构建对照中，六个经济学 RSC 入口在 WebKit / 系统 Chrome 共 12 次读取均为同源 200、正文完整且无重定向；真实 NextLink 进入学派页的两次软导航均无文档请求和 pageerror。该对照支持保留站点现有权限策略。

### Lighthouse 失败诊断

设置 `LH_ARTIFACT_DIR` 时，脚本在测量完成后保存每条路由（包括失败确认）的 LHR JSON，并保存图谱的 Chrome trace 与对应脚本。默认不写文件，本地可指向临时目录；CI 使用 runner 临时目录，始终上传 `lighthouse-diagnostics`，保留七天。产物用于核对 Linux 中的长任务、网络和页面异常，不改变阈值、确认次数、测量窗口或失败退出状态；不能用本地 Mac 的通过替代 CI 图谱失败。

### 函数运行输入与体积门禁

`pnpm audit-function-assets` 遍历生产 `.nft.json`，按每个函数实际文件的未压缩体积去重计数，225 MiB 上限为平台 250 MB 留出共享运行时和封装余量；缺文件、缺追踪或越界均失败，CI build 与本地 predeploy 同步执行。NFT 无法透过任意路径辅助调用恢复静态前缀，读取目录时应保持 `content` 前缀可见，避免把 `process.cwd()` 扩为整个工作区。函数不携带构建用原图、静态 WebP 和 reference；图像权利 JSON、manifest、对话和人物内容继续打包，静态图片仍由 public 资源发布。不能靠上传压缩率、删运行数据或开启大函数 beta 代替检查，最终仍需平台打包与隔离输入/线上读取验证。
