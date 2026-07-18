/**
 * 卡片 JSX 结构模板（摘自参考实现，可直接对照改）
 * 完整交互逻辑见 official-service-flow-artifact/src/components/
 */

import type { GitNode, TableDef } from './data-types';

/** 入口 / 逻辑 / 决策 — 外壳 class 对照 styles.css */
export function NodeShellExample({ node }: { node: GitNode }) {
  const isDecision = node.kind === 'decision';
  const isTrigger = !!node.isTrigger;

  const shell = isTrigger
    ? 'dlv-card-trigger' + (node.pathStart ? ' path-start' : '')
    : isDecision
      ? 'dlv-card-decision'
      : 'dlv-card-step';

  return (
    <div className={shell} role="button">
      {isTrigger && (
        <div className="dlv-trigger-label">
          {node.pathStart ? '入口 · 流程起点' : '入口 · 用户/管理员触发'}
        </div>
      )}
      <div className="font-bold text-[15px]">
        {isDecision ? `◆ ${node.title}` : node.title}
      </div>
      {/* detailOpen 时：bullets 编号列表 + tableRefs chips + jumps */}
    </div>
  );
}

/** 表字段横表 — 必须「上行英名 / 下行中文」 */
export function FieldsTableExample({ table }: { table: TableDef }) {
  if (!table.fields?.length) return null;
  return (
    <div className="overflow-x-auto border border-emerald-300/70 rounded-md bg-white">
      <table className="dlv-fields-table">
        <thead>
          <tr>
            {table.fields.map((f) => (
              <th key={f.name}>{f.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {table.fields.map((f) => (
              <td key={f.name}>{f.desc}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** 生命周期 — 每条路线一张分支卡 */
export function LifecycleBranchesExample({ table }: { table: TableDef }) {
  if (!table.lifecycles?.length) return null;
  return (
    <div className="dlv-life-rail">
      {table.lifecycles.map((lc) => (
        <div key={lc.title} className="dlv-life-branch border-sky-300 bg-sky-50">
          <div className="font-bold text-[12px] text-[#1B365D] mb-1">{lc.title}</div>
          <ol className="list-decimal list-inside">
            {lc.states.map((s) => (
              <li key={s} className="text-[11px]">
                {s}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

/** 汇入芯片 — 点击后由 GitGraph 画到 targetId 的虚线 */
export function JumpChipExample({
  fromId,
  label,
  targetId,
  onJump,
}: {
  fromId: string;
  label: string;
  targetId: string;
  onJump: (fromId: string, targetId: string) => void;
}) {
  return (
    <button
      type="button"
      className="dlv-jump-chip"
      title="点击查看与目标时序节点的连线"
      onClick={(e) => {
        e.stopPropagation();
        onJump(fromId, targetId);
      }}
    >
      ⤷ {label}
    </button>
  );
}
