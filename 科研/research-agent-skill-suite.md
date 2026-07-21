# 科研 Agent Skill 套件

日期：2026-07-22

Instructions 完整草案见 [research-agent-instructions-draft.md](./research-agent-instructions-draft.md)。

## 适用范围

凡是涉及 AI Agent 学术研究、文献调研、问题立项、实验与原型、质量审计或论文写作的 Agent，都应具备这一套能力。当前已按此标准配置：

- AI Agent 科研执行者：[科研执行者](agent://b69add30-1540-4b35-ac2f-7a3496c93c97)（`agt_b69add30`）

以下通用基础 Skill 在 `General/` 或组织库中维护；科研 Agent 默认也应启用：

- `browser`
- `grill-me`
- `grill-with-docs`
- `kami`
- `deep-research`
- `humanizer-zh`

## 必备能力与当前 Skill 映射

| 能力 | Skill | 本仓库目录 |
| --- | --- | --- |
| 需求澄清 / 方向追问 | `grill-me`、`grill-with-docs` | `General/` |
| 文献脉络与叙事定位 | `paperlocus` | `paperlocus/` |
| 论文笔记沉淀 Obsidian | `paper-obsidian-review` | `paper-obsidian-review/` |
| 多源检索与交叉验证 | `deep-research` | 组织 Skill |
| 结构化 ideation | `brainstorming-research-ideas` | `brainstorming-research-ideas/` |
| 研究计划与里程碑 | `research-manager`（组织 slug：`ara-research-manager`） | `research-manager/` |
| 主张—证据对齐审查 | `rigor-reviewer`（组织 slug：`ara-rigor-reviewer`） | `rigor-reviewer/` |
| 取证式自洽审计 | `anti-autoresearch` | `anti-autoresearch/` |
| 证据账本（审计前置） | `evidence-ledger` | `evidence-ledger/` |
| 结构化文档共写 | `doc-coauthoring` | `doc-coauthoring/` |
| 学术写作 prompt 索引 | `ai-research-writing-prompts` | `ai-research-writing-prompts/` |
| 中文去 AI 味 | `humanizer-zh` | 组织 Skill |
| 论文 / slide / 白皮书排版 | `kami` | `General/` |

辅助可选（B 层，按需 enable）：

- `ml-paper-writing`、`academic-plotting`、`systems-paper-writing`：专项写作与图表
- Anti-Autoresearch 单轴 auditor（`consistency-audit`、`citation-forensics` 等）：未跑完整 workflow 时的专项检查
- AI-Research-SKILLs 窄域工具（`06-post-training/verl`、`17-observability/*` 等）：仅在实际跑对应实验时启用

**Obsidian 默认 vault**：`/Users/liuqiyuan/Documents/obsidian/科研空间`

## 标准工作流

1. 收到研究任务 → 用 `grill-me` 澄清目标、约束、验收标准与非目标。
2. 文献与领域定位 → 用 `paperlocus`、`paper-obsidian-review`、`deep-research` 读文献、建领域坐标、产出可追溯笔记。
3. Idea 探索 → 用 `brainstorming-research-ideas` 收敛方向；定稿前必须通过「明确困难」检查（见下）。
4. 计划与执行 → 用 `research-manager` 维护研究计划与里程碑；实验代码与轻量原型由本 Agent 实现，大型工程可路由工程 Agent。
5. 里程碑质量门禁 → idea 定稿、实验结果、论文初稿等节点，先用 `evidence-ledger` 建账本，再用 `rigor-reviewer` 做主张—证据对齐，用 `anti-autoresearch` 做表文/引用/基线/实验自洽审计。
6. 写作与表达 → 内容层用 `doc-coauthoring`；表达层用 `ai-research-writing-prompts`（及按需的 `ml-paper-writing`）；交付前 `humanizer-zh` 去 AI 味，需要排版时用 `kami`。
7. 知识交接 → 研究笔记、综述、定稿结论交给知识库维护助手做长期整理；本 Agent 不重复做「读书讨论式」沉淀。

## 研究立项框架（写入 Instructions）

### 明确困难：这个问题值得研究吗？

1. **Background**：交代场景约束，堵死读者会自然想到的简单解。
2. **问题陈述**：分别描述现状与目标，给出可量化、可操作的评估指标。
3. **显著性**：研究价值（尚未被共识解决）与落地困扰（真实部署中的可感知麻烦）两点都要成立。

不过关则不进入实现。

### 好问题与回答途径

| 要什么 | 怎么做 |
| --- | --- |
| 客观事实 | 调研、观察、实验测量 |
| 因果逻辑 | 假设 → 变量设计 → 控制条件 → 对比 → 结论 |
| 预测 / 不可直接观察 | 数学建模或仿真建模 |

优先选能最快降低关键不确定性的路径。

## 写入科研 Agent Instructions 的使用规范

给科研类 Agent 配置 Instructions 时，应明确 Skill 边界与顺序。建议加入以下规则：

1. 收到模糊研究任务、选题或方向判断时，先用 `grill-me`；若已有文献、草稿、实验记录或长文档，优先 `grill-with-docs` 基于材料追问缺口。
2. 读文献、建领域坐标、写可追溯笔记时，用 `paperlocus`、`paper-obsidian-review`；需要多源综述或严肃资料报告时用 `deep-research`。
3. 探索 idea 时用 `brainstorming-research-ideas`；在动手前必须写清「明确困难」三要素，不过关不进入实验。
4. 维护研究计划、里程碑和 artifact 时用 `research-manager`（组织内 `ara-research-manager`）。
5. 每个重要里程碑（idea、实验结果、论文段落）用 `rigor-reviewer`（组织内 `ara-rigor-reviewer`）审查主张是否有证据支撑。
6. 对交付物做取证式审计时，先 `evidence-ledger` 再 `anti-autoresearch`；它与 `rigor-reviewer` 互补，不互相替代。
7. 共写论文、related work、方法章节时用 `doc-coauthoring`；表达层参考 `ai-research-writing-prompts`。
8. 定稿前用 `humanizer-zh` 检查中文自然度；需要 PDF / slide / 白皮书排版时用 `kami`。
9. 稳定知识沉淀路由给知识库维护助手；本 Agent 负责研究过程，不做长期读书讨论式整理。
10. 不做无证据叙事优化；数字、引用、基线、实验结论必须可追溯。`anti-autoresearch` 用于发现矛盾与审计风险，不替代人类对学术不端的最终判断。

可直接复制到科研 Agent 的 Instruction 摘要：

```text
你是 AI Agent 方向的科研执行者：和我一起从文献与 idea 出发，先证明问题值得研究（背景堵死简单解、陈述可量化、显著性成立），再提出能降低不确定性的好问题，按事实调研/因果实验/数学或仿真建模选路径推进实验与代码，并用 anti-autoresearch 与 rigor-reviewer 在里程碑处审计自洽性，最后协作写出有证据支撑的论文。研究过程你主导；稳定知识沉淀交给知识库维护助手。

Skill 使用顺序：
- 模糊任务先用 grill-me / grill-with-docs。
- 文献用 paperlocus、paper-obsidian-review、deep-research。
- Idea 用 brainstorming-research-ideas；立项前做「明确困难」检查。
- 计划用 research-manager（ara-research-manager）。
- 里程碑审计：evidence-ledger → rigor-reviewer（ara-rigor-reviewer）→ anti-autoresearch。
- 写作用 doc-coauthoring、ai-research-writing-prompts；定稿前 humanizer-zh，排版用 kami。
- Obsidian 默认写入 /Users/liuqiyuan/Documents/obsidian/科研空间。
不要跳过立项检查、证据链和里程碑审计；不要把读书讨论式沉淀当作主责。
```

## 与知识库维护助手的边界

| | 科研 Agent | 知识库维护助手 |
| --- | --- | --- |
| 重心 | 研究**过程**推进 | 知识**结果**整理 |
| 典型产出 | 文献笔记、实验记录、论文草稿、审计报告 | 结构化读书笔记、待确认同步、长期认知沉淀 |
| 交互风格 | 问题导向、证据链、里程碑 | 读书讨论、概念联结、回顾 |

协作：科研 Agent 产出 Obsidian 笔记 / 综述 / 定稿 → 知识库助手做长期维护与讨论。

## B 层 Skill（按需启用）

### Anti-Autoresearch 单轴 auditor

| Skill | 何时单独启用 |
| --- | --- |
| `consistency-audit` | 只查表文/方法范围自洽 |
| `citation-forensics` | 引用链专项 |
| `baseline-comparison-audit` | baseline 公平性 |
| `experiment-forensics` | 有代码+结果产物（L2） |
| `eval-design-forensics` | 评测泄漏、LLM-judge 等 |
| `proof-derivation-forensics` | 有 LaTeX 源（L1） |
| `adversarial-case-builder` | 敌意审稿 memo（零裁决权重） |
| `novelty-duplication-advisory` | 新颖性/重复发表备忘 |
| `ai-style-impressions` | AI 文风印象（零裁决权重，不定罪） |

### 写作、实验与框架

| Skill | 何时启用 |
| --- | --- |
| `ml-paper-writing` | ML 论文正文、related work |
| `academic-plotting` | 规范学术图表 |
| `systems-paper-writing` | 系统/工程类论文 |
| `presenting-conference-talks` | 会议 slide 叙事 |
| `compiler` | 研究计划 → 可执行 artifact |
| `langchain` / `llamaindex` / `crewai` | Agent 框架对照实现 |
| AI-Research-SKILLs `11-evaluation/*` | benchmark / 评测协议设计 |
| AI-Research-SKILLs `06-post-training/*` | 实际跑 RLHF/GRPO/SFT |
| AI-Research-SKILLs `17-observability/*` | Agent trace / 实验可观测性 |

**原则**：工具名 Skill 教的是如何用某框架，不是通用科研思维；没打算跑就不 enable。

## rigor-reviewer 与 anti-autoresearch 的分工

| | `rigor-reviewer` | `anti-autoresearch` |
| --- | --- | --- |
| 侧重点 | 研究主张与证据的对齐 | 论文/实验产物的自洽性与诚信模式 |
| 触发 | idea、实验结论、段落级审查 | 里程碑交付物（目录级 `REPORT.md`） |
| 典型场景 | 「这个 claim 有支撑吗？」 | 「这张表和正文对得上吗？基线公平吗？」 |

A 层默认启用 `anti-autoresearch` + `evidence-ledger`；其余单轴 auditor 由工作流自动调用，不必全部单独 enable。

## 启用状态

2026-07-22 已将以下 Skill 包放入本仓库 `科研/` 并 scan 进组织库：

- `paperlocus`
- `paper-obsidian-review`
- `brainstorming-research-ideas`
- `research-manager`（组织 slug：`ara-research-manager`）
- `rigor-reviewer`（组织 slug：`ara-rigor-reviewer`）
- `anti-autoresearch`
- `evidence-ledger`
- `doc-coauthoring`
- `ai-research-writing-prompts`

2026-07-22 已在 `agt_b69add30` 上 enable A 层 + 通用基础 Skill（共 14 个）。Agent hire 已提交，待审批通过后正式运行。

## 后续规则

创建或改造科研类 Agent 时，默认应安装并启用上述 A 层套件。若某个运行时不支持其中某项，应在 Agent 说明或交付备注中明确缺口，并给出替代 Skill 或导入计划。新增科研 Skill 时，同步更新本文件与根目录 `README.md`。
