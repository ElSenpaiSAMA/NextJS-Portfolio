import { describe, expect, it } from "vitest";
import { CODE_RAMP, GLYPH_RAMP, glyphIndex, gridFor, luma, scrambleFrame } from "./ascii";

describe("ascii mapping", () => {
  it("maps black to the empty glyph and white to the densest", () => {
    expect(GLYPH_RAMP[glyphIndex(luma(0, 0, 0), GLYPH_RAMP.length)]).toBe(" ");
    expect(GLYPH_RAMP[glyphIndex(luma(255, 255, 255), GLYPH_RAMP.length)]).toBe("@");
  });

  it("stays inside the ramp for any brightness and contrast", () => {
    for (const b of [-1, 0, 0.3, 0.5, 0.99, 1, 2]) {
      for (const c of [0.5, 1, 1.8, 4]) {
        const i = glyphIndex(b, CODE_RAMP.length, c);
        expect(i).toBeGreaterThanOrEqual(0);
        expect(i).toBeLessThan(CODE_RAMP.length);
      }
    }
  });

  it("contrast pushes mid-tones apart (dark footage keeps detail)", () => {
    expect(glyphIndex(0.6, 10, 2)).toBeGreaterThan(glyphIndex(0.6, 10, 1));
    expect(glyphIndex(0.4, 10, 2)).toBeLessThan(glyphIndex(0.4, 10, 1));
  });

  it("covers a box with whole cells", () => {
    expect(gridFor(1440, 900, 12)).toEqual({ cols: 120, rows: 47 });
    expect(gridFor(1, 1, 12)).toEqual({ cols: 1, rows: 1 });
  });
});

describe("scrambleFrame", () => {
  const fixed = () => 0;

  it("is fully decoded at progress 1 and keeps spaces at 0", () => {
    expect(scrambleFrame("Matias Speroni", 1, fixed)).toBe("Matias Speroni");
    const start = scrambleFrame("Matias Speroni", 0, fixed);
    expect(start).toHaveLength("Matias Speroni".length);
    expect(start[6]).toBe(" ");
    expect(start).not.toContain("M");
  });

  it("settles characters from left to right", () => {
    expect(scrambleFrame("abcd", 0.5, fixed).slice(0, 2)).toBe("ab");
  });
});
