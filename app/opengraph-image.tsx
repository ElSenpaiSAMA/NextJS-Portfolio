import { ImageResponse } from "next/og";
import { PIPELINE } from "./data/ship";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read CSS variables: these mirror the default (light) tokens in globals.css.
const C = { bg: "#fbfbfa", surface: "#ffffff", line: "#e2e2dd", fg: "#111113", muted: "#56565c", accent: "#2f5bff", ok: "#15803d" };

/** Generated at build time: the social card — name and role beside a finished deploy of the real pipeline. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: "64px 72px", background: C.bg, color: C.fg }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 38, color: C.accent, marginTop: 20 }}>{profile.role}</div>
          <div style={{ display: "flex", fontSize: 24, color: C.muted, marginTop: 20 }}>{profile.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 400, background: C.surface, border: `2px solid ${C.line}`, borderRadius: 18, padding: 28, fontSize: 24 }}>
          {PIPELINE.stages.map((stage) => (
            <div key={stage} style={{ display: "flex", alignItems: "center", marginTop: 8, color: C.fg }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: C.ok, marginRight: 14 }} />
              {stage}
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 20, color: C.ok, fontWeight: 700 }}>Deployed to production</div>
        </div>
      </div>
    ),
    size,
  );
}
