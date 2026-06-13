import type { CrossReference } from "./types";

/**
 * Cross-domain links anchored in computer science. Bare-slug ids match the
 * entityId the detail pages pass; fromPath/toPath give the real nested routes.
 */
export const COMPUTER_SCIENCE_REFS: CrossReference[] = [
  {
    fromDomain: "computer-science",
    fromId: "alan-turing",
    fromTitle: "艾伦·图灵",
    fromPath: "/computer-science/pioneers/alan-turing",
    toDomain: "philosophy",
    toId: "can-machines-think",
    toTitle: "机器能思考吗",
    toPath: "/philosophy/questions/can-machines-think",
    relation: "图灵 1950 年的「模仿游戏」把「机器能否思考」从形而上问题改写为可操作的行为测试",
  },
  {
    fromDomain: "computer-science",
    fromId: "large-language-models",
    fromTitle: "大语言模型",
    fromPath: "/computer-science/frontier/large-language-models",
    toDomain: "philosophy",
    toId: "llm-language-understanding",
    toTitle: "大语言模型真的理解语言吗",
    toPath: "/philosophy/frontier/llm-language-understanding",
    relation: "LLM 的能力边界（CS）与「它是否真正理解」（心灵哲学）是同一前沿的两面",
  },
  {
    fromDomain: "computer-science",
    fromId: "john-von-neumann",
    fromTitle: "冯·诺伊曼",
    fromPath: "/computer-science/pioneers/john-von-neumann",
    toDomain: "economics",
    toId: "john-nash",
    toTitle: "约翰·纳什",
    toPath: "/economics/economists/john-nash",
    relation: "冯·诺伊曼与摩根斯坦创立博弈论，纳什均衡是其在经济学中的关键发展",
  },
  {
    fromDomain: "computer-science",
    fromId: "public-key-rsa",
    fromTitle: "RSA 公钥密码",
    fromPath: "/computer-science/algorithms/public-key-rsa",
    toDomain: "mathematics",
    toId: "euler",
    toTitle: "欧拉",
    toPath: "/mathematics/mathematicians/euler",
    relation: "RSA 的正确性与安全性建立在数论之上——欧拉定理是其数学核心",
  },
];
