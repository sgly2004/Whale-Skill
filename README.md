# Whale-Skill

Whale 工作流用的 Agent Skills 集合。

## 目录

```text
General/
├── browser/                             # UI / 浏览器行为验证
├── grill-me/                            # 需求澄清追问
├── grill-with-docs/                     # 基于文档的需求澄清追问
└── kami/                                # 文档、产品页、方案页排版

自媒体/
├── self-media-agent-skill-suite.md       # 自媒体 Agent 标准 Skill 套件与使用流程
├── article-cover-director/               # 文章与小红书封面策划
├── publishable-article-structurer/       # 草稿整理成可发布文章
├── social-card-splitter/                 # 文章拆成图卡脚本
├── url-to-markdown-rewriter/             # URL / 文章转 Markdown 与原创改写
├── wechat-weibo-adapter/                 # 公众号与微博渠道改写
└── xiaohongshu-visual-director/          # 小红书视觉策划总导演

科研/
├── research-agent-skill-suite.md         # 科研 Agent 标准 Skill 套件与使用流程
├── research-agent-instructions-draft.md  # 科研 Agent SOUL / Instructions 草案
├── ai-research-writing-prompts/          # 学术写作 prompt 索引 wrapper
├── anti-autoresearch/                    # 取证式自洽审计工作流
├── brainstorming-research-ideas/         # 结构化 research ideation
├── doc-coauthoring/                      # 结构化文档共写
├── evidence-ledger/                      # 证据账本（审计前置）
├── literature-trace/                     # 真实文献检索与可追溯链接
├── paper-obsidian-review/                # 论文笔记沉淀到 Obsidian
├── paperlocus/                           # 文献脉络与叙事定位
├── research-manager/                     # Agent 原生研究计划与推进
└── rigor-reviewer/                       # 主张—证据对齐审查

Engineering/
├── engineering-agent-skill-suite.md      # 工程类 Agent 标准 Skill 套件与使用流程
├── code-review/                         # 完成后代码审查
├── codebase-design/                     # 仓库级代码结构设计
├── design-an-interface/                 # 模块接口方案探索
├── design-logic-visualization/          # 设计逻辑 Git 图式交互 HTML / 静态全景图
├── diagnosing-bugs/                     # Debug 与复现验证闭环
├── module-design-maintainer/            # 产品逻辑与模块设计文档
├── nano-banana-pro-prompts-recommend-skill/
├── prototype/                           # 原型验证
├── software-product-advisor/            # 产品判断与优先级建议
├── test-doc-maintainer/                 # 测试文档设计与维护
├── ui-styling/                          # UI 样式与组件体系
├── ui-ux-pro-max/                       # UI/UX 设计判断
├── verification-before-completion/      # 完成前验证
└── web-artifacts-builder/               # 复杂交互 HTML artifact
```

各 skill 目录内含 `SKILL.md` 入口与配套模板/说明文档。

通用 Agent 基础技能以 `General/` 为准：`browser`、`grill-me`、`grill-with-docs`、`kami` 应默认启用到所有 Agent。

工程类 Agent 的标准工作流以 `Engineering/engineering-agent-skill-suite.md` 为准：先澄清需求和产品判断，再做前端设计、原型和仓库/模块设计，完成代码后补测试文档，最后做 Debug、Code Review、UI 验证和完成前验证。

自媒体类 Agent 的标准工作流以 `自媒体/self-media-agent-skill-suite.md` 为准：先做 URL/资料转写和小红书视觉总导演 Brief，再整理文章、拆图卡、策划封面，并分别适配公众号和微博。暂不安装通用图片生成 Skill；实际出图使用运行环境已有的稳定图片生成能力。

科研类 Agent 的标准工作流以 `科研/research-agent-skill-suite.md` 为准：先澄清研究目标，再读文献建坐标、做「明确困难」立项，按计划推进实验与代码，在里程碑处用 rigor-reviewer 与 anti-autoresearch 审计，最后协作写作并交接知识库维护助手。Obsidian 默认 vault：`/Users/liuqiyuan/Documents/obsidian/科研空间`。
