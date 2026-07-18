# 逻辑一：主路径设计（Path-First）

> 回答：**先梳理几条端到端主路径，再在每个步骤下就地拆测试项**。  
> 每条主路径从**一个入口**出发，沿用户/业务过程推演，直到**交付完成**。  
> JiaZhuang 落地：`docs/Testing/{N}-*-主路径与用例.md`（阶段 1）。

---

## 1. 测试目的

测试的目的，是用可复现的证据证明：当前版本在关键业务路径上可用、可控、可恢复。  
测试的价值，不是「跑了多少用例」，而是提前识别高风险问题并给出明确的放行、补测或阻断结论。

---

## 2. 核心原则

| 原则 | 说明 |
|---|---|
| **入口到交付** | 每条主路径从一个入口开始（操作入口或业务入口），推演至交付完成（用户可见结果、状态落库、对端反馈齐备） |
| **路径优先** | 先写完整业务故事（Layer 1），再拆 case ID（Layer 2） |
| **一步一变体** | 某步 normal 测完后，**立刻**测该步 boundary，再进入下一步 |
| **跨端/跨角色是路径的一部分** | 一条主路径内可切换小程序角色、小程序↔管理后台、必要时 `[api]` 只读断言；不必单独建「跨模块」文档 |
| **case 四段式** | 意图、步骤、预期、证据要求（输入并入步骤；入口/交付留在路径头，不进串联稿） |
| **三阶段分离** | 阶段 1 只维护主路径文件；阶段 2/3 在 `完整测试流程.md` / 串联稿，不在主路径文件内混写串联顺序 |
| **六类作自检** | 功能/边界/衔接/联动/场景/稳定性仅作设计 checklist，**不作**文档目录或执行批次 |

**不要**先按模块或 FUN/BND/INT 分类堆 case，再补跨模块文件。

---

## 3. 三层产出

| Layer | 产物 | 路径 |
|-------|------|------|
| **0** | 项目主规划 | `docs/Testing/测试规划.md` — 范围、环境、证据、放行、不覆盖 |
| **1** | 主路径叙事 | 各 `{N}-*-主路径与用例.md` 文首 — 入口→交付、每步操作+期望 |
| **2** | 测试项 | 同上文件内步骤下 — 标准 case 结构，顺序=路径内步骤序 |

数量不设硬性上限：主路径条数、每路径步骤数、总 case 数视项目复杂度而定。

---

## 4. Layer 1：主路径叙事

每条主路径一个二级标题。叙事阶段**不写 case ID**，只写故事。

完整空白模板见 [templates/main-path.md](templates/main-path.md)。

要点：

- 「跨模块」若业务上是一条用户旅程，就应该是**一条主路径**
- 步骤端标注：`[mp-opc]`、`[mp-station]`、`[mp-partner]`、`[admin]`、`[api]`（只读断言）

---

## 5. Layer 2：从步骤就地拆测试项

在 Layer 1 每个步骤下挂测试项。**执行顺序**：步骤 1 的全部变体 → 步骤 2 的全部变体 → …

```markdown
### 步骤 2 · <步骤简称>

- TC_P03_S2_001 — normal — …
- TC_P03_S2_002 — boundary-空输入 — …
- TC_P03_S2_003 — boundary-非法格式 — …
```

**边界贴着步骤走**：不要在整条路径所有 normal 跑完后，再集中跑 boundary。

**case ID 命名**（项目可自定）：

- `TC_{PATH}_{STEP}_{SEQ}`，如 `TC_P03_S2_001`
- 或保留模块语义 `TC_FORUM_FUN_001`，但在元数据中标注 `path` / `step`

每条 case 标准结构见 [templates/case.md](templates/case.md)。

---

## 6. 元数据字段

| 字段 | 说明 |
|---|---|
| `case_id` | 全局唯一 |
| `path` | 所属主路径与步骤，如 `P07 · 步骤 1` |
| `step` | 步骤序号（数字） |
| `variant` | `normal` / `boundary-*` / …（操作模式） |
| `requires` | 执行前语义状态（稳定语义名，不写 DB ID） |
| `provides` | 成功后产出 |
| `mutates` | 会修改的数据域 |
| `mode` | `flow-first`（默认）或 `seed-first` |
| `isolation` | `fresh-user` / `shared-user` / `namespace` |
| `idempotent` | 是否可重复执行 |
| `priority` | `P0` / `P1` / `P2` |

规则：

- 跨端 case 在 `requires` 列出各端前置；步骤标注 `[mp-*]`、`[admin]`、`[api]`
- `mode=seed-first` 时步骤分 `[seed]` 与 `[verify]`；seed 不替代被测 UI 动作

---

## 7. 账号与 seed（设计侧）

**账号策略**

| 策略 | 适用 |
|---|---|
| `fresh-user` | 身份/封禁/首次绑定等污染敏感 |
| `shared-user` | 稳定冒烟、只读；须 `idempotent=true` 或声明 `mutates` |

**seed 纪律**（写在 case 元数据与步骤中，执行细节见跑测 skill）

1. 最小化：只满足 `requires`
2. 不替代被测行为
3. 与 `mode` 一致：`[seed]` / `[verify]` 分段

---

## 8. 设计自检清单（六类，非目录）

| # | 自检项 | 问 |
|---|---|---|
| 1 | 功能 | 每步 happy path 是否有 normal case？ |
| 2 | 边界 | 关键输入是否在同一步骤下挂了 boundary 变体？ |
| 3 | 衔接 | 上步 `provides` 是否覆盖下步 `requires`？ |
| 4 | 联动 | 路径内 mp/admin/api 状态是否一致断言？ |
| 5 | 场景 | 是否至少有一条端到端闭环路径（非孤立单页）？ |
| 6 | 稳定性 | 写操作是否验证落库，而非仅 toast？ |

未命中项不必强行补 case，但须在 `测试规划.md` 说明「本轮不覆盖」或 DEFERRED。

---

## 9. 测试规划.md 必含章节

Layer 0 与路径/case 分文件；**不写具体 case 步骤**。

1. 测试目的与范围
2. 不覆盖范围
3. 环境前置检查清单（未通过则 ABORT）
4. 角色与账号约定
5. 放行标准（P0/P1/P2、DEFERRED 处理）
6. 证据目录约定
7. 指向各主路径文件与 `完整测试流程.md`

---

## 10. 从旧规划迁移（可选）

若已有按模块/六类拆分的 case 库：

1. 先写 Layer 1 主路径叙事（可合并原「跨模块 SCN」）
2. 将现有 `TC_*` 映射到 `Pxx · step N`
3. 把 orphan 的 BND case 挪到对应步骤下
4. 串联顺序在阶段 2 重排，见 [path-linking.md](path-linking.md)

---

## 11. 相关文档

| 话题 | 文档 |
|---|---|
| 多路径串联 | [path-linking.md](path-linking.md) |
| 三阶段维护 | [doc-lifecycle.md](doc-lifecycle.md) |
| case 模板 | [templates/case.md](templates/case.md) |
| 跑测执行 | [`web-miniprogram-manual-testing`](../web-miniprogram-manual-testing/SKILL.md) |
