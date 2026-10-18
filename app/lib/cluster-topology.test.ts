import { describe, expect, it } from "vitest";
import { buildClusterTopology, seededRandom } from "./cluster-topology";

describe("seededRandom", () => {
  it("is deterministic and stays in [0, 1)", () => {
    const a = seededRandom(3);
    const b = seededRandom(3);
    for (let i = 0; i < 100; i++) {
      const value = a();
      expect(value).toBe(b());
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("buildClusterTopology", () => {
  const topology = buildClusterTopology(46);

  it("is the same network for the same seed (WebGL and SVG agree)", () => {
    expect(buildClusterTopology(46)).toEqual(topology);
    expect(buildClusterTopology(46, 8)).not.toEqual(topology);
  });

  it("wires every node, with unique undirected edges", () => {
    expect(topology.nodes).toHaveLength(46);
    const keys = topology.edges.map(([a, b]) => `${a}-${b}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const [a, b] of topology.edges) expect(a).toBeLessThan(b);
    // Packets random-walk the graph: a node without links would trap them.
    topology.neighbours.forEach((links, i) => expect(links.length, `node ${i}`).toBeGreaterThan(0));
  });

  it("keeps neighbour lists symmetric with the edge list", () => {
    for (const [a, b] of topology.edges) {
      expect(topology.neighbours[a]).toContain(b);
      expect(topology.neighbours[b]).toContain(a);
    }
  });
});
