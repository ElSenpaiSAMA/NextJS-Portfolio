import type { ArchitectureNode, ArchitectureNodeKind } from "../../data/types";

const KIND_STYLE: Record<ArchitectureNodeKind, string> = {
  trigger: "border-info/50",
  process: "border-border",
  store: "border-warn/50",
  deploy: "border-ok/50",
};

const KIND_LABEL: Record<ArchitectureNodeKind, string> = {
  trigger: "trigger",
  process: "step",
  store: "data",
  deploy: "deploy",
};

/**
 * Left-to-right flow on wide screens, top-to-bottom on mobile. Rendered as an
 * ordered list so screen readers get the sequence without the arrows.
 */
export function ArchitectureDiagram({ nodes, title }: { nodes: ArchitectureNode[]; title: string }) {
  return (
    <figure>
      <ol aria-label={`${title} architecture`} className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-stretch">
        {nodes.map((node, i) => (
          <li key={node.label} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
            <div className={`rounded-md border-2 bg-bg px-3 py-2 ${KIND_STYLE[node.kind]}`}>
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{KIND_LABEL[node.kind]}</p>
              <p className="text-sm font-medium">{node.label}</p>
              {node.detail && <p className="font-mono text-xs text-muted">{node.detail}</p>}
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="self-center font-mono text-subtle">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
