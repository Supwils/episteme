# CI/CD 与渲染策略

## 一、交付流水线

GitHub Actions 的唯一生产工作流是`.github/workflows/ci.yml`，在`main`推送、面向`main`的PR和手动触发时运行。仅修改`docs/`不会触发部署。

| 作业    | 职责                                                          | 生产门禁               |
| ------- | ------------------------------------------------------------- | ---------------------- |
| Quality | 生成索引幂等性、类型、Lint、内容与图谱审计、单元测试          | 是                     |
| Build   | Next生产构建、SSG/ISR manifest、bundle、smoke与Lighthouse预算 | 是                     |
| Deploy  | Vercel生产环境构建与预构建产物部署                            | 同时依赖Quality与Build |

Quality与Build并行以缩短反馈时间。Deploy只在非PR的`main`运行；任一上游失败都禁止生产部署。工作流只有`contents: read`权限，Vercel CLI固定版本，所有作业都有超时。

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

`pnpm audit-rendering`读取生产构建的`.next/prerender-manifest.json`和`.next/server/app-paths-manifest.json`。

审计会验证关键路由是否出现在正确manifest、重验证周期是否准确、固定参数集合是否关闭未知slug、通用文章是否保持首次访问SSG，以及私有/查询接口是否仍为动态运行时。源码注释或Next构建日志不能替代这一门禁。

Lighthouse保留逐路由固定预算。每条路由和每次确认采样都启动独立Chrome进程，避免长时共享浏览器在最后一条路由累积缓存、内存与主线程状态。有效首测直接决定通过；仅当trace无效或超预算时执行一次独立确认采样，两次都失败才阻断部署。这样不放宽预算，同时避免共享CI runner的单次调度抖动制造假失败。

Playwright smoke在同一Build作业内复用已完成的`.next`生产产物，不重复构建，不使用Turbopack开发服务器。门禁用runner已有Chrome执行桌面和移动端各两次核心旅程：门户搜索到首次请求SSG文章，以及知识图谱深链恢复与步骤推进。Lighthouse先于smoke执行，避免性能基准继承功能浏览器测试的runner资源压力；两者仍都是部署硬门禁。CI保留一次重试以生成trace，但启用`failOnFlakyTests`，任何依赖重试的用例仍会阻断部署。smoke失败时上传HTML报告、截图和trace并保留7天；完整E2E仍留在本地或专项回归，避免每次push运行138项造成慢反馈。

## 五、Vercel部署

原生Vercel Git部署在`vercel.json`中关闭，避免同一次`main`推送产生重复部署。GitHub Actions使用以下顺序：

1. `vercel pull --environment=production`获取项目设置和生产环境变量。
2. `vercel build --prod`生成`.vercel/output`。
3. `vercel deploy --prebuilt --prod --archive=tgz`部署已构建产物。

归档模式用于绕过大规模Next函数产物的文件数和符号链接校验问题。`VERCEL_TOKEN`只存在GitHub Secrets；组织ID和项目ID是资源标识，不是凭证。

## 六、本地复现

```bash
pnpm install --frozen-lockfile
pnpm gen-all
git status --short
pnpm typecheck
pnpm lint
pnpm check-content
pnpm audit-graph-coverage
pnpm audit-learning-continuum
pnpm audit-subject-candidates
pnpm audit-linguistics-foundation
pnpm test
pnpm build
pnpm audit-rendering
pnpm bundle-check -- --skip-build
CI=1 pnpm test:e2e:smoke
```

生产Lighthouse必须指向当前项目的独占端口。若本机`3000`已被其他应用占用，使用其他端口启动Next并设置`LH_BASE`，不能把其他应用的结果当成本项目指标。
