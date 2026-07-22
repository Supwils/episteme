import type { ThoughtTour } from "./thought-tours";

export const COMPUTER_SECURITY_TOUR: ThoughtTour = {
  id: "from-data-entry-to-auditable-trust",
  title: "从数据进入系统到可审计信任",
  subtitle: "通信、密码、身份、供应链与隐私如何组成一条仍可验证的安全边界",
  waypoints: [
    "computer-science:networking-protocols",
    "computer-science:computer-security-principles",
    "computer-science:encryption-basics",
    "computer-science:authentication-authorization",
    "computer-science:software-supply-chain-security",
    "computer-science:privacy-engineering",
    "computer-science:formal-methods-and-verification",
  ],
  steps: [
    {
      nodeId: "computer-science:networking-protocols",
      title: "数据先穿过不受单方控制的网络",
      summary:
        "分层协议解决互操作，却不会自动提供端点身份、机密性或消息完整性；每个代理、解析器和中间设备都可能改变信任边界。",
      focus: "数据入口",
    },
    {
      nodeId: "computer-science:computer-security-principles",
      title: "先明确资产、对手和失败后果",
      summary:
        "安全控制必须绑定具体资产、攻击者能力、数据寿命和残余风险，否则最小权限与纵深防御只会停留在口号。",
      focus: "威胁模型",
    },
    {
      nodeId: "computer-science:encryption-basics",
      title: "密码协议保护通信而不是消除端点风险",
      summary:
        "AEAD、认证密钥交换和密钥轮换分别处理篡改、冒充与长期暴露；nonce、随机数和私钥生命周期仍可能让正确算法失效。",
      focus: "协议组合",
    },
    {
      nodeId: "computer-science:authentication-authorization",
      title: "确认主体后仍要逐次判断权限",
      summary:
        "认证回答当前会话由谁控制，授权回答它能对哪个对象执行什么操作；恢复流程、令牌受众和租户隔离都是独立边界。",
      focus: "身份与策略",
    },
    {
      nodeId: "computer-science:software-supply-chain-security",
      title: "运行代码的来源本身必须可追溯",
      summary:
        "依赖锁定、隔离构建、SBOM、签名和来源证明提供不同证据；任何单项控制都不能证明产物无漏洞或构建环境未被接管。",
      focus: "构建与发布",
    },
    {
      nodeId: "computer-science:privacy-engineering",
      title: "合法访问不等于隐私风险已经消失",
      summary:
        "系统还需限制目的、保留期、链接能力和推断范围，并为匿名化攻击、差分隐私预算与第三方处理保留可复核记录。",
      focus: "数据治理",
    },
    {
      nodeId: "computer-science:formal-methods-and-verification",
      title: "最终把保证写成可以反驳的性质",
      summary:
        "测试、模型检查和证明只能覆盖明确写出的系统模型与性质；审计必须同时记录假设、未覆盖组件和运行期证据。",
      focus: "验证证据",
    },
  ],
};
