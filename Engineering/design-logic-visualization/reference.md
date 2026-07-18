# 设计逻辑可视化 · 细则与参考实现

配合 [SKILL.md](SKILL.md)。此处放尺寸、碰撞、当前版本设计逻辑与静态导出步骤；主 skill 只保留规范。

---

## 当前版本的设计逻辑（官方服务参考）

从多次试错收敛而来，意图如下：

| 曾用方案 | 问题 | 收敛 |
|----------|------|------|
| 飞书 lane / Obsidian canvas | 叠卡、难找主线 | HTML 自控布局 |
| 纯线性阶段卡 | 丢掉「否」分支、难把握全局 | 决策菱形 + 多 branch |
| 状态机主轴 + 动作层 | 仍偏仪表盘分层 | 取消分层，单图 Git 链 |
| 横向思维导图树 | 丢掉时序 | **Git 图：同入口串联、异入口并行** |

**核心因果**

1. 文档怎么写入口与数据流 → 图就怎么分路径（不按「C端/回调/旁路」自行重分类入口）。
2. 时序是结构本身 → 主视觉必须是左→右的链；分叉只发生在真实条件。
3. 表是节点的读写附件 → 吸附在卡的上下，避免被读成流程后继。
4. 共享中段只维护一份 → 其它路径用 jump 指向；线按需显示，保主链可读。
5. 交互解决密度 → 折叠细节、点选吸附表、点选汇入线；静态全景则预展开分支并减负正文。

**参考目录**

```
docs/un-commit/preview/official-service-flow-artifact/
  src/data/git-graph-data.ts    # 路径 / 节点 / 表 / jump
  src/lib/git-layout.ts         # 布局、估高、碰撞
  src/components/GitGraph.tsx   # 吸附、汇入线、SVG
  src/components/GitNodeCard.tsx
  src/components/TableHubCard.tsx
```

打包：

```bash
cd docs/un-commit/preview/{module}-flow-artifact
bash ~/.cursor/skills/web-artifacts-builder/scripts/bundle-artifact.sh
cp bundle.html ../{module}-interactive-flow.html
```

---

## 布局参数（建议默认）

| 项 | 建议值 | 说明 |
|----|--------|------|
| 逻辑卡宽（普通） | ~220–260px | 决策卡可略窄 |
| 逻辑卡折叠高 | ~56px 内 | 含标题行；避免高低差过大 |
| 卡水平间距 | ≥ 48px | 给贝塞尔边与 label |
| 卡垂直间距（碰撞后） | ≥ 16–18px | `resolveCollisions` |
| 路径间垂直 gap | 视内容，宁松勿叠 | 顶对齐各 path 的 entry |
| 表栏 | 全图右侧 | `TABLE_COL_GAP` 与主图分开 |
| 表卡吸附宽 | ~440px | 展开字段横表需要宽度 |
| 表与逻辑卡间隙 | 20px | 仅上或下 |
| 主时序线 | 墨蓝 2–2.5px | branch 略透明 |
| 汇入线 | 深红虚线，点击后显示 ~4–5s | 带箭头与端点圆 |
| 表连线（聚焦） | 翠绿竖向曲线 | 非聚焦可极淡横连到表栏 |

**碰撞策略**

1. 逻辑卡 vs 逻辑卡：重叠则推开（优先改 y，保持时序 x）。
2. 表卡吸附后作障碍物：重叠的其他逻辑卡沿上下推开，**禁止**把表挪到该卡左右。
3. 实测高度（ResizeObserver）回写后再跑一轮碰撞，避免展开后盖住邻居。
4. 连线 label：布局阶段为决策边预留垂直错位；若仍撞卡，加大 branch 的 y 偏移。

**吸附策略**

1. 仅 `above` | `below`（默认 below）。
2. below 与后续时序碰撞次数明显更多，且 above 不严重穿出画布时 → 改 above。
3. 多表时在同一侧竖向堆叠，间距 ≥ 16px。

---

## 三类卡片：怎么写（模板）

### 入口卡

```text
标题：动词 + 业务对象（用户/管理员可见动作）
标记：isTrigger + pathStart（路径起点）
bullet：入口健全与文档一致；保留英文名（中文注释）
tableRefs：本步读/写的表
```

### 逻辑卡

```text
标题：一步意图（折叠可见）
statusTag：若本步稳定落到某枚举
bullets：3～7 条，因果句，非关键词堆叠
tableRefs / jumps：按需
```

### 决策卡

```text
kind: decision
title：条件本身（如 need_review？）
branches[]：label 短、可读；每支一棵子树（含「否」）
```

### 表卡数据

```text
fields[]: { name: "price_fen", zh: "标价（分）" }  → 渲染为两行横表
lifecycles[]: { title: "路线1 — …", steps: ["1. status…（因果）", ...] }
```

字段 UI：**一行一组字段**，上行 `name`（mono），下行中文；不要做成左右两列长列表冒充「横表」。

---

## 汇入（Jump）语义

| 做法 | 何时 |
|------|------|
| `jumps: [{ label: "→ 时序：…", targetId }]` | 分支逻辑已结束，后续与已有链相同 |
| 点击画线 + `reveal(targetId)` | 交互默认 |
| 静态淡虚线或「见路径X」脚注 | 无交互导出 |

禁止：只写「汇入时序」四字却不指向真实节点 id。

---

## 静态全景设计清单

1. 数据与交互版同一 `paths` / `tables`，禁止另维护一份互相漂移的文案。
2. 渲染模式 `presentation: "static"`（或导出前 `expandAll` + `detailOpen` 仅对决策）：
   - 全开 branches
   - 逻辑卡默认不展开长 bullet（或只展开含「待确认」的卡）
   - 主表：每条主干下固定一张，字段横表精简列
3. 汇入：全局显示 opacity ~0.35 的 jump 边，或纯文字交叉引用。
4. 画布留白：四边 ≥ 40px；路径间距加大 1.25×，减少截图像素里的重叠幻觉。
5. 导出：整页截图或打印 PDF（背景色保留羊皮纸）；文件放入 `docs/un-commit/preview/` 旁注日期。

---

## 与飞书画板 skill 的差异（避免混用）

| 点 | 本 skill（HTML Git 图） | logic-design-whiteboard |
|----|-------------------------|-------------------------|
| 载体 | 单文件 HTML / 静态图 | 飞书画板 |
| 入口色 | 深红触发 | 按画板规则 |
| 相关健全 | 允许合并同卡 | 画板另有分卡细则 |
| 表字段 | 横表两行（英/中） | frame 内合并卡片等 |
| 表位置 | 上下吸附 | lane / frame 布局 |
| 汇入 | 点击连线 | 画板连线规则 |

同一模块可两套都做，但**不要**把飞书 DSL 规则硬套进 HTML，反之亦然。
