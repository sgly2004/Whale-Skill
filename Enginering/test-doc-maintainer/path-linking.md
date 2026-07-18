# 逻辑二：多路径串联

> 主路径设计完成后（见 [path-design.md](path-design.md)），将多条主路径**打散后重新串联**。  
> 目的：避免重复执行操作（如先建依赖环境、同一账号只造一次、完整操作只做一遍）。

---

## 1. 输入与产出

| 输入 | 产出 |
|------|------|
| 各 `{N}-*-主路径与用例.md` | `docs/Testing/完整测试流程.md`（阶段 2） |
| `docs/Testing/目录.md` | 含账号台账、`FLOW_SEGMENTS`、一句话主链 |
| 路径间依赖分析 | 脚本生成 `完整测试流程-串联稿.md`（阶段 3） |

阶段 2 空白模板见 [templates/flow-plan.md](templates/flow-plan.md)。

---

## 2. 串联思路

### 2.1 打散与重组

路径间关系**不全是严格前置**：

- **前置**：A 路径产出是 B 路径 `requires` → A 的 relevant 步骤须在 B 之前
- **部分重叠**：A 路径步骤 3 与 B 路径步骤 1–2 测同一业务 → 串联时只保留一次
- **并行**：互不依赖的路径块可标注「并行、另备账号」，不阻塞主链

重组后仍按**主路径编号**为骨架排布：主路径内步骤保持原有顺序，中间可**插入**其他主路径的步骤块。

### 2.2 基本顺序规则

**路径内**

- 同一步骤：**normal 先于 boundary 变体**
- 同一步骤多个 boundary：按输入严重度或依赖从简到繁

**路径间（串联后）**

- 依赖环境构建的主路径/步骤块优先
- 同一操作（如基地创建、工位订阅完整流程、账号注册）**只做一遍**
- 异常/边界测试可插在对应 normal 之后，但**不重复**已完成的正常操作

**不要**

- 先跑完全项目 normal 再跑 boundary
- 按模块 FUN/BND/INT 分批
- 按文件 1→20 顺序跑测（应跟 `FLOW_SEGMENTS` / 总览表）

### 2.3 FLOW_SEGMENTS

JiaZhuang 在 [`scripts/audit/build-complete-flow-with-evidence.py`](../../../scripts/audit/build-complete-flow-with-evidence.py) 中定义 `FLOW_SEGMENTS`：

```python
# (phase_id, path_num, section_keys|None, title)
# section_keys: 只取主路径文件中匹配的 ### 步骤；None = 全文
```

维护阶段 2 时，更新 `完整测试流程.md` 中的阶段表与一句话主链；脚本侧 `FLOW_SEGMENTS` 须与之对齐。

### 2.4 环境与特殊路径

- **preflight**：见 `测试规划.md`；失败 → 整轮 **ABORT**（`ENV_BLOCK`）
- **需切换 env_vars 的路径**：在 `完整测试流程.md` 标注独立段；段前重启服务或改 env 并复检

---

## 3. 失败传播（串联规划约束）

跑测时的 BLOCK/ABORT 规则；设计串联时应考虑依赖，避免下游大量 BLOCK。

| 上游结果 | 下游处理 | 记录状态 |
|---|---|---|
| 通过 | 正常执行 | — |
| 失败（业务/断言） | 依赖其 `provides` 的下游 case **BLOCK** | `BLOCKED_BY: {case_id}` |
| 失败（环境） | 整轮 **ABORT** | `ENV_BLOCK` |

- BLOCK **不算** FAIL
- preflight 失败不进入任何路径
- 同路径内：步骤 N 的 **normal** FAIL → 该步 boundary 可 SKIP/BLOCK；步骤 N+1 依赖 N 的 `provides` 则 BLOCK

---

## 4. 可选：runlist 清单

需要 Agent 逐步勾选时，可从串联顺序扁平化为 `runlist-{YYYYMMDD}.md`（**非必产物**）。

```
Run ID: {run_id}
Plan: docs/Testing/测试规划.md
Flow: docs/Testing/完整测试流程.md

=== preflight ===
- [ ] ENV-001: backend health 200
…

=== 阶段 A · 路径 1 ===
- [ ] TC_xxx: normal · …
```

并行分组：以整条主路径或路径内连续步骤块为单位；组头声明依赖。

---

## 5. 与旧 L0/L1/L2 批次的关系

旧式「L0 冒烟 / L1 主路径 / L2 边界 / L3 跨模块」**不再作为编排维度**。

若需冒烟段，定义为 **最短路径的前几步**，写在 `完整测试流程.md` 最前。

---

## 6. 再测试检查（M1 主链示例）

格式稳定后，按串联稿 **总览表顺序** 跑测（非文件 1→20 顺序）。

**一句话主链（JiaZhuang M1）：**

`1 → 2(+7部分) → 3(到4.1) → 5 → 6(到3.2) → 18 → 3(收尾) → 12 → 13 → 14 → 8 → 6(3.3) → 9 → 7(补测) → 10 → 11 → 15 → 16 → 17 → 12(报名审核) → 19 → 20`

| 检查项 | 标准 |
|--------|------|
| 账号 | OPC-A / Partner-P / Station-S 只造一次 |
| 不重复 | 基地创建、工位订阅完整操作各只做一遍 |
| 会员价 | 阶段 E 记原价 → 买会员 → 6.3.3 对比 |
| 证据 | 新截图进 `证据/<批次>/<TC_ID>/`；重生串联稿 |
| 飞书 | 见 [feishu-publish.md](feishu-publish.md) |

**并行（不阻塞主链）：** 路径 4 独立服务站；路径 3 步骤 6 邀请边界 — 另备账号。

详细 checklist 维护在 `完整测试流程.md` 末尾附录。

---

## 7. 相关文档

| 话题 | 文档 |
|---|---|
| 主路径设计 | [path-design.md](path-design.md) |
| 三阶段与串联稿格式 | [doc-lifecycle.md](doc-lifecycle.md) |
| 跑测执行 | [`web-miniprogram-manual-testing`](../web-miniprogram-manual-testing/SKILL.md) |
