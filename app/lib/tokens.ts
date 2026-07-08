/**
 * Design tokens — TypeScript mirror of the values declared in `app/globals.css`
 * (`@theme` + `:root`). Consumed where CSS variables can't reach: three.js
 * materials/lights (hex strings) and `motion` transitions (easing arrays).
 *
 * Keep this file and `globals.css` in sync — neither derives from the other.
 */

export const tokens = {
  colors: {
    /* Backgrounds */
    bg: "#05050a",
    bgAlt: "#050508",
    bgElevated: "#0e0d14",

    /* Text scale — from primary to nearly invisible */
    textPrimary: "#F0EDE8",
    textSecondary: "#8A8680",
    textTertiary: "#6A6460",
    textMuted: "#5A5650",
    textFaint: "#4A4640",
    textGhost: "#3A3830",

    /* Brand accents — *Rgb variants are "R, G, B" triplets for rgba() */
    accent: "#A8642E",
    accentRgb: "168, 100, 46",
    available: "#5B7F58",
    availableRgb: "91, 127, 88",

    /* 3D scene palette (lights, particles, fog) */
    sceneAmber: "#ffaa44",
    sceneAmberDim: "#6B3D18",
    sceneBlue: "#4488ff",
    sceneBlueDim: "#2A5FA8",
    scenePurple: "#6040A0",
    scenePurpleDim: "#2A1848",
    sceneNavy: "#162248",
    sceneAmbient: "#1a1228",
    sceneParticle: "#c8c0b8",
  },

  glass: {
    bg: "rgba(14, 13, 20, 0.6)",
    border: "rgba(168, 100, 46, 0.18)",
    blur: "20px",
  },

  grain: {
    opacity: 0.035,
  },

  /* Each curve in both forms: CSS string and numeric array for `motion` */
  easing: {
    outExpo: {
      css: "cubic-bezier(0.16, 1, 0.3, 1)",
      array: [0.16, 1, 0.3, 1] as const,
    },
    outCirc: {
      css: "cubic-bezier(0.76, 0, 0.24, 1)",
      array: [0.76, 0, 0.24, 1] as const,
    },
  },
} as const;

export type Tokens = typeof tokens;
