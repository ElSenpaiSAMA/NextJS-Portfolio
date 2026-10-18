import { describe, expect, it } from "vitest";
import { buildContainerYard, seededRandom } from "./hero-progress";

describe("seededRandom", () => {
  it("is deterministic and stays in [0, 1)", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    for (let i = 0; i < 100; i++) {
      const value = a();
      expect(value).toBe(b());
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("buildContainerYard", () => {
  it("builds the same city on every call", () => {
    expect(buildContainerYard({ columnsPerSide: 3, rows: 10 })).toEqual(buildContainerYard({ columnsPerSide: 3, rows: 10 }));
  });

  it("keeps the boulevard clear and stacks on the ground", () => {
    const slots = buildContainerYard({ columnsPerSide: 4, rows: 26 });
    expect(slots.length).toBeGreaterThan(200);
    for (const slot of slots) {
      expect(Math.abs(slot.x)).toBeGreaterThanOrEqual(5); // street half-width
      expect(slot.y).toBeGreaterThan(0);
      expect(slot.colorIndex).toBeGreaterThanOrEqual(0);
      expect(slot.colorIndex).toBeLessThan(5);
    }
  });

  it("uses fewer containers on compact screens", () => {
    const compact = buildContainerYard({ columnsPerSide: 2, rows: 18 }).length;
    const full = buildContainerYard({ columnsPerSide: 4, rows: 26 }).length;
    expect(compact).toBeLessThan(full / 2);
  });
});
