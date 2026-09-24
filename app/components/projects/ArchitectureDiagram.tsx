import type { ArchitectureNode, ArchitectureNodeKind } from "../../data/types";

const KIND_LABEL: Record<ArchitectureNodeKind, string> = {
  trigger: "Trigger",
  process: "Step",
  store: "Data",
  deploy: "Deploy",
};

const KIND_DOT: Record<ArchitectureNodeKind, string> = {
  trigger: "border-info",
  process: "border-subtle",
  store: "border-warn",
  deploy: "border-ok",
};

/**
 * The flow as a quiet vertical timeline: numbered steps joined by a hairline.
 * An ordered list, so screen readers get the sequence without decoration.
 */
export function ArchitectureDiagram({ nodes, title }: { nodes: ArchitectureNode[]; title: string }) {
  return (
    <ol aria-label={`${title} architecture`} className="relative">
      {nodes.map((node, i) => (
        <li key={node.label} className="relative flex gap-4 pb-6 last:pb-0">
          {i < nodes.length - 1 && (
            <span aria-hidden="true" className="absolute left-[0.4375rem] top-5 h-full w-px bg-border" />
          )}
          <span aria-hidden="true" className={`relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 bg-bg ${KIND_DOT[node.kind]}`} />
          <div>
            <p className="font-medium">
              {node.label}
              <span className="ml-2 text-xs font-normal text-subtle">{KIND_LABEL[node.kind]}</span>
            </p>
            {node.detail && <p className="text-sm text-muted">{node.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
