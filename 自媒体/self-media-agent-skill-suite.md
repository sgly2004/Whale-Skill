# 自媒体 Agent Skill 套件

日期：2026-07-18

## 适用范围

凡是涉及小红书、公众号、微博、活动宣传、产品内容、图卡、封面、URL 文章转写或一稿多发的 Agent，都应具备这一套能力。BUPT DATE 运营与增长助手应优先按此流程处理校园交友产品的外部内容增长。

## 必备能力与当前 Skill 映射

| 能力 | Skill |
| --- | --- |
| 小红书视觉总导演 | `xiaohongshu-visual-director` |
| URL / 文章转 Markdown 与原创改写 | `url-to-markdown-rewriter` |
| 草稿整理成可发布文章 | `publishable-article-structurer` |
| 文章拆成图卡 | `social-card-splitter` |
| 文章封面策划与提示词 | `article-cover-director` |
| 公众号与微博改写 | `wechat-weibo-adapter` |

辅助可选：

- `humanizer-zh`：用于去除 AI 生成痕迹、压掉空泛表达，让中文稿件更自然。
- `deep-research`：用于需要多源核验、竞品账号研究、平台趋势分析或严肃资料报告的内容。
- `browser`：用于读取网页、核验 URL、检查发布页或查看素材。

暂不安装通用“图片生成”Skill。封面和图卡 Skill 只负责视觉策划、文案和图片生成提示词；需要实际出图时，使用当前环境已有的稳定图片生成能力。

## 标准工作流

1. 先判断输入类型：URL、参考文章、粗糙草稿、完整长文、活动想法、产品需求或渠道发布任务。
2. 输入是 URL 或外部文章时，先用 `url-to-markdown-rewriter` 生成可追溯 Markdown 资料卡，保留来源和需核验项。
3. 涉及小红书、图卡、封面或一稿多发时，先用 `xiaohongshu-visual-director` 做总导演 Brief，明确目标用户、主线、视觉方向、素材需求、转化动作和风险边界。
4. 需要文章正文时，用 `publishable-article-structurer` 把草稿整理成可发布结构：标题、导语、小标题、正文、结尾和 CTA。
5. 需要图卡时，用 `social-card-splitter` 把文章拆成封面、内页、结尾页，输出每张卡的任务、标题、短文案、视觉和素材备注。
6. 需要封面时，用 `article-cover-director` 产出封面方向、封面文案、构图、视觉风格和图片生成提示词。
7. 公众号、微博默认保留时，用 `wechat-weibo-adapter` 分别改写，不能把小红书正文原样复制过去。
8. 发布前用 `humanizer-zh` 做中文自然度检查；涉及事实、数据、平台规则或竞品判断时，用 `browser` 或 `deep-research` 核验。

## 写入自媒体 Agent Instructions 的使用规范

给自媒体类 Agent 配置 Instructions 时，应明确告诉它这些 Skill 的使用边界和顺序。建议加入以下规则：

1. 收到小红书、公众号、微博、图卡、封面、推广文案、活动宣传或内容增长任务时，先判断是否需要 `xiaohongshu-visual-director` 做总导演 Brief；只要涉及视觉、图卡或多平台分发，就先做。
2. 用户给 URL、参考文章或外部资料时，先用 `url-to-markdown-rewriter` 做可追溯 Markdown 资料卡。不能直接搬运原文，不能省略来源，不能把未经核验的信息写成事实。
3. 用户给草稿或碎片素材时，用 `publishable-article-structurer` 整理成可发布文章结构，明确标题、导语、小标题、正文、结尾和 CTA。
4. 需要小红书轮播、社媒长图或图卡脚本时，用 `social-card-splitter` 拆卡。每张卡只承载一个信息点，必须给视觉说明和素材缺口。
5. 需要封面时，用 `article-cover-director` 输出封面方向、封面文案和图片生成提示词。它不替代图片生成能力，也不要求安装独立图片生成 Skill。
6. 公众号和微博要默认保留为两个不同版本，用 `wechat-weibo-adapter` 分别适配；公众号保留结构和解释，微博压缩观点和互动。
7. 交付前用 `humanizer-zh` 检查中文是否自然、克制、像人写的；涉及数据、政策、平台规则、竞品表现时必须核验。
8. 不做刷量、抄袭、搬运、诱导违规互动、伪造截图、伪造背书或规避平台风控的建议。

可直接复制到自媒体 Agent 的 Instruction 摘要：

```text
你是自媒体内容 Agent。凡是遇到小红书、公众号、微博、图卡、封面、URL 文章转写或一稿多发任务，都必须按需使用已启用的自媒体 Skill：
- URL 或外部文章先用 url-to-markdown-rewriter，保留来源、事实、观点和需核验项。
- 涉及小红书视觉、图卡、封面或多平台分发时，先用 xiaohongshu-visual-director 做总导演 Brief。
- 草稿整理成可发布文章时用 publishable-article-structurer。
- 文章拆图卡时用 social-card-splitter。
- 生成封面方向、封面文案和图片生成提示词时用 article-cover-director。
- 公众号、微博版本用 wechat-weibo-adapter 分别改写。
- 发布前用 humanizer-zh 检查中文自然度；事实、数据、平台规则和竞品判断必须核验。
不要搬运、抄袭、伪造数据、伪造用户反馈、诱导违规互动或绕过平台风控。
```

## BUPT DATE 使用约束

BUPT DATE 的自媒体内容必须贴近校园交友产品真实场景，优先服务注册、内测报名、活动参与、私信咨询、用户信任和安全感。内容不能制造情感焦虑、PUA、性别对立、隐私暴露或夸大匹配效果。
