/**
 * Pure helpers for the ASCII renderer (components/fx/AsciiCanvas). Nothing here
 * touches the DOM, so the mapping from pixels to glyphs is unit-tested.
 */

/** From empty to dense: each cell shows the glyph whose "ink" matches its brightness. */
export const GLYPH_RAMP = " .:-=+*#%@" as const;

/** Code-flavoured ramp used by the hero: braces and operators read as source code. */
export const CODE_RAMP = " .,:;-=+<>/{}[]()$#@" as const;

/** Perceived brightness (Rec. 709 luma) of an sRGB pixel, 0–1. */
export function luma(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Index into a ramp for a brightness. `contrast` > 1 stretches the mid-tones,
 * which keeps dark footage (a server room) from collapsing into blank cells.
 */
export function glyphIndex(brightness: number, rampLength: number, contrast = 1): number {
  const stretched = Math.min(1, Math.max(0, (brightness - 0.5) * contrast + 0.5));
  return Math.min(rampLength - 1, Math.floor(stretched * rampLength));
}

/** Grid size that covers a box with square-ish monospace cells. */
export function gridFor(width: number, height: number, cell: number): { cols: number; rows: number } {
  return { cols: Math.max(1, Math.ceil(width / cell)), rows: Math.max(1, Math.ceil(height / (cell * 1.6))) };
}

/** Characters a scrambling heading cycles through before settling. */
export const SCRAMBLE_CHARSET = "!<>-_\\/[]{}=+*^?#$%&01";

/**
 * One frame of the decode effect: characters before `progress` (0–1) are
 * final, the rest are random from the charset. Spaces stay spaces so words
 * keep their shape while they decode.
 */
export function scrambleFrame(text: string, progress: number, random: () => number = Math.random): string {
  const settled = Math.floor(text.length * Math.min(1, Math.max(0, progress)));
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += i < settled || ch === " " ? ch : SCRAMBLE_CHARSET[Math.floor(random() * SCRAMBLE_CHARSET.length)];
  }
  return out;
}
