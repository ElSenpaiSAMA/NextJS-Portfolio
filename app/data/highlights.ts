/**
 * Copy for the product-page sections that sit between the hero and the CV
 * sections: the hero tagline, the highlights bento and the Build/Ship/Run story.
 * (The word-by-word statement reuses profile.intro.)
 * Every claim comes from the CV (see experience.ts) — no invented numbers.
 */

/** Shown over the hero footage once the name has cleared (desktop scroll). */
export const HERO_TAGLINE = ["Ships the software.", "And the pipelines behind it."] as const;

export interface Highlight {
  /** Big gradient figure at the top of the tile (a number or a short term from the CV). */
  figure: string;
  /** The headline of the tile. */
  title: string;
  /** One supporting sentence. */
  body: string;
  /** Wide tiles span two columns on desktop. */
  wide?: boolean;
}

/** "Get the highlights." bento. The pipeline tile is rendered separately from PIPELINE. */
export const HIGHLIGHTS: Highlight[] = [
  {
    figure: "CI/CD",
    title: "Pipelines that ship on every push.",
    body: "GitHub Actions builds and publishes Docker images, deployed automatically to a self-hosted Coolify hub.",
    wide: true,
  },
  {
    figure: "< 6 months",
    title: "Intern to developer.",
    body: "The only promotion on the team that year, learning C# and Sitecore on real production codebases.",
  },
  {
    figure: "dev ≠ prod",
    title: "Never mixed.",
    body: "A separate database and environment for every app.",
  },
  {
    figure: "Zero Trust",
    title: "Secure by default.",
    body: "Access to the deployment hub runs through Pomerium.",
  },
  {
    figure: "3+",
    title: "Client projects at once.",
    body: "C# and .NET integrations on Sitecore, delivered across sprints with no production incidents.",
  },
  {
    figure: "~20",
    title: "AI marketing tools, one data layer.",
    body: "Integrations with Meta, TikTok, Google Ads, GA4, Shopify and Merchant Center, turned into automated reports.",
    wide: true,
  },
];

/** The CI that ships this very site — the real jobs in .github/workflows/ci.yml, in order. */
export const PIPELINE = {
  command: "git push origin main",
  stages: ["lint", "typecheck", "unit tests", "build", "e2e (playwright + axe)", "lighthouse ci", "deploy to vercel"],
} as const;

/** Build / Ship / Run: captions that take turns over the circuit-board footage. */
export const STORY = [
  { title: "Build.", body: "Every push runs through GitHub Actions and comes out as a Docker image." },
  { title: "Ship.", body: "Images deploy on their own to a self-hosted Coolify hub. No hand-run releases." },
  { title: "Run.", body: "Dev and production stay isolated, and access goes through Zero Trust." },
] as const;
