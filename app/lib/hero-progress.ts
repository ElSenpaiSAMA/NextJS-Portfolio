/**
 * Scroll progress of the hero (0 → 1), written by the GSAP ScrollTrigger in
 * Hero.tsx and read every frame by the 3D camera rig. A plain mutable object
 * on purpose: per-frame values must not go through React state.
 */
export const heroProgress = { current: 0 };

/** Deterministic PRNG (mulberry32): same city on every load and in tests. */
export function seededRandom(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ContainerSlot {
  x: number;
  y: number;
  z: number;
  /** Rotated 90° (container lies across the street instead of along it). */
  across: boolean;
  colorIndex: number;
}

/**
 * Lays out the container-stack skyline on both sides of a boulevard that
 * runs along -Z. Pure function so the layout is unit-testable.
 */
export function buildContainerYard(options: { columnsPerSide: number; rows: number; seed?: number }): ContainerSlot[] {
  const random = seededRandom(options.seed ?? 7);
  const slots: ContainerSlot[] = [];
  const STREET_HALF_WIDTH = 5;
  const COLUMN_GAP = 7.5;
  const ROW_GAP = 8;
  const CONTAINER_HEIGHT = 2.6;

  for (let row = 0; row < options.rows; row++) {
    const z = 25 - row * ROW_GAP;
    for (let side = -1; side <= 1; side += 2) {
      for (let col = 0; col < options.columnsPerSide; col++) {
        // Stacks get taller further from the street: a skyline, not a wall.
        const maxHeight = 2 + col * 2;
        const height = 1 + Math.floor(random() * maxHeight);
        const x = side * (STREET_HALF_WIDTH + col * COLUMN_GAP + random() * 1.5);
        const across = random() > 0.65;
        for (let level = 0; level < height; level++) {
          slots.push({
            x,
            y: CONTAINER_HEIGHT / 2 + level * CONTAINER_HEIGHT,
            z: z + (random() - 0.5) * 2,
            across,
            colorIndex: Math.floor(random() * 5),
          });
        }
      }
    }
  }
  return slots;
}
