import type { CSSProperties } from "react";
import { buildClusterTopology } from "../../lib/cluster-topology";

const NODE_COUNT = 26;
const PACKET_EDGES = 9;
const SCALE = 46;

/**
 * Phone version of the hero cluster: the same seeded network, projected flat
 * into an SVG, with a few packets travelling the cables (CSS offset-path).
 * Server-rendered, no JavaScript; frozen with reduced motion. Decorative.
 */
export function ClusterSvg() {
  const { nodes, edges } = buildClusterTopology(NODE_COUNT, 11);
  // Slight perspective: nodes further back sit higher and smaller.
  const project = (n: (typeof nodes)[number]) => ({ x: n.x * SCALE, y: (n.y - n.z * 0.35) * SCALE, depth: (n.z + 2.4) / 4.8 });
  const points = nodes.map(project);
  const packetEdges = edges.filter((_, i) => i % Math.ceil(edges.length / PACKET_EDGES) === 0);

  return (
    <svg aria-hidden="true" viewBox="-180 -140 360 280" className="absolute inset-x-0 top-0 h-[60%] w-full opacity-70 md:hidden" data-testid="cluster-svg">
      <g stroke="var(--cyan)" strokeOpacity="0.18" strokeWidth="0.8">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={points[a].x} y1={points[a].y} x2={points[b].x} y2={points[b].y} />
        ))}
      </g>
      <g>
        {points.map((p, i) => {
          const size = 5 + nodes[i].size * 22 * (0.6 + p.depth * 0.4);
          return (
            <rect
              key={i}
              x={p.x - size / 2}
              y={p.y - size * 0.65}
              width={size}
              height={size * 1.3}
              rx="1.5"
              fill="var(--panel-bar)"
              stroke="var(--line)"
              opacity={0.5 + p.depth * 0.5}
            />
          );
        })}
      </g>
      <g>
        {packetEdges.map(([a, b], i) => (
          <circle
            key={`${a}-${b}`}
            r="2.2"
            className="cluster-packet"
            fill={i % 3 === 0 ? "var(--amber)" : "var(--cyan)"}
            style={
              {
                offsetPath: `path("M ${points[a].x} ${points[a].y} L ${points[b].x} ${points[b].y}")`,
                animationDelay: `${(i * 0.37) % 2}s`,
                animationDuration: `${1.6 + (i % 4) * 0.4}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
