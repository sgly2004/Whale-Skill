---
name: ai-research-writing-prompts
description: >
  AI 科研写作表达层 prompt 合集。用于论文翻译、润色、缩写扩写、逻辑检查、
  图表标题、实验分析、Reviewer 视角审视等表达与呈现任务；不负责研究内容构建。
  上游来源：Leey21/awesome-ai-research-writing。与 doc-coauthoring（内容共写）
  和 humanizer-zh（去 AI 味）配合使用。
---

# AI Research Writing Prompts

表达层 Skill：优化**怎么写、怎么呈现**，不替代 idea、实验与证据链构建。

## 何时使用

- 论文段落需要中译英 / 英译中（LaTeX 或 Word）
- 缩写、扩写、逻辑检查、Reviewer 视角审视
- 图/表标题、实验分析段落、架构图说明
- 需要按场景选用成熟 prompt 模板，而不是从零写 prompt

## 何时不用

- 还在定义研究问题、设计实验、审计证据 → 用 brainstorming / research-manager / anti-autoresearch
- 需要结构化共写整篇文档 → 用 `doc-coauthoring`

## 工作方式

1. 从 `references/prompt-index.md` 识别场景，选用对应 prompt 模板。
2. 把用户提供的**具体段落/图表/约束**填入模板，不要空跑通用 prompt。
3. 输出后若仍有 AI 味，交给 `humanizer-zh`；需要排版交付用 `kami`。

## 默认协作顺序

内容定稿（doc-coauthoring + 证据链）→ 本 Skill 做表达优化 → humanizer-zh → kami

## 参考

- 完整 prompt 原文与更新：[awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing)
- 本地索引：`references/prompt-index.md`
