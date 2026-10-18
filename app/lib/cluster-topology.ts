/**
 * The hero's "cluster": server nodes on a flattened shell, each wired to its
 * nearest neighbours. Pure and deterministic (seeded), so the WebGL scene and
 * the phone SVG draw the same network and tests can pin it down.
 */

export interface ClusterNode {
  x: number;
  y: number;
  z: number;
  /** Edge length of the node's box, in scene units. */
  size: number;
}

export interface ClusterTopology {
  nodes: ClusterNode[];
  /** Undirected, unique pairs of node indices (a < b). */
  edges: [number, number][];
  /** For each node, the indices of the nodes it is wired to. */
  neighbours: number[][];
}

/** Mulberry32: tiny, fast, good enough for layout. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildClusterTopology(count: number, seed = 7, linksPerNode = 3): ClusterTopology {
  const random = seededRandom(seed);
  const nodes: ClusterNode[] = [];

  // Fibonacci sphere for an even spread, squashed into an ellipsoid and jittered.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = () => (random() - 0.5) * 0.35;
    nodes.push({
      x: Math.cos(theta) * radius * 3.2 + jitter(),
      y: y * 1.9 + jitter(),
      z: Math.sin(theta) * radius * 2.2 + jitter(),
      size: 0.14 + random() * 0.14,
    });
  }

  const distance = (a: ClusterNode, b: ClusterNode) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  const neighbours: number[][] = nodes.map(() => []);

  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: distance(node, other) }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, linksPerNode);
    for (const { j } of nearest) {
      const [a, b] = i < j ? [i, j] : [j, i];
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b]);
      neighbours[a].push(b);
      neighbours[b].push(a);
    }
  });

  return { nodes, edges, neighbours };
}

/**
 * Shared, mutable scroll progress of the hero (0 at the top, 1 once it has
 * scrolled away). Written by the scroll choreography, read every frame by the
 * 3D scene — a plain object, not React state, so nothing re-renders.
 */
export const heroScroll = { progress: 0 };
