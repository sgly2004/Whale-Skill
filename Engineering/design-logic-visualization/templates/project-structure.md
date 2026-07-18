# Artifact 目录结构模板

用 `web-artifacts-builder` 初始化后，按此组织（名称可换模块）：

```text
docs/un-commit/preview/{module}-flow-artifact/
├── index.html
├── package.json
├── src/
│   ├── App.tsx                 # 壳：标题 + GitGraph
│   ├── main.tsx
│   ├── index.css               # 引入 tokens + tailwind
│   ├── data/
│   │   └── git-graph-data.ts   # paths / tables / nodeMap（见 data-skeleton.ts）
│   ├── lib/
│   │   ├── git-layout.ts       # 布局估高 + resolveCollisions
│   │   └── utils.ts            # cn()
│   ├── hooks/
│   │   └── useAnimatedPositions.ts
│   └── components/
│       ├── GitGraph.tsx        # 吸附上下、汇入线、SVG
│       ├── GitNodeCard.tsx     # 入口 / 逻辑 / 决策
│       ├── TableHubCard.tsx    # 横表字段 + 生命周期分支卡
│       └── Toolbar.tsx         # 搜索 / 展开 / 缩放
├── bundle.html                 # 打包产物
└── …

交付：
  bash ~/.cursor/skills/web-artifacts-builder/scripts/bundle-artifact.sh
  cp bundle.html ../{module}-interactive-flow.html
```

## 组件职责（勿混）

| 文件 | 只做 |
|------|------|
| `git-graph-data.ts` | 文档映射；无布局坐标 |
| `git-layout.ts` | x/y/w/h、碰撞；无 React |
| `GitGraph.tsx` | 编排：dock / jump / edges |
| `GitNodeCard.tsx` | 单卡 UI + 展开 |
| `TableHubCard.tsx` | 表 UI；字段横表；生命周期分支 |

## 必实现的交互钩子

1. `detailOpen` / `expandedBranches` / `focusedId` / `activeJump`
2. 表卡 dock：`above` | `below` only
3. `revealJump(fromId, targetId)`：画虚线 + scrollIntoView
4. ResizeObserver → `measuredH` → 再碰撞
