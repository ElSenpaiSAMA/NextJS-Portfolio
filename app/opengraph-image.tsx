import { ImageResponse } from "next/og";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read CSS variables: these mirror the tokens in globals.css.
const C = { ink: "#07080b", fg: "#ecebe6", subtle: "#858998", accent: "#5b8cff", pink: "#ff8cc3", violet: "#b69cff", line: "#252a36" };
const RAMP = " .,:;-=+<>/{}[]()$#@";

/** Generated at build time: the social card — the name over a band of code glyphs, like the hero. */
export default function OpengraphImage() {
  // A deterministic wave of glyphs (the hero renders real footage; here, a pattern).
  const rows = Array.from({ length: 9 }, (_, y) =>
    Array.from({ length: 64 }, (_, x) => RAMP[Math.floor(((Math.sin(x / 5 + y / 2) + Math.cos(y / 3 - x / 9) + 2) / 4) * (RAMP.length - 1))]).join(""),
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", background: C.ink, color: C.fg }}>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "monospace", fontSize: 18, lineHeight: 1.2, color: C.accent, opacity: 0.55 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
              {row}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: C.subtle, fontFamily: "monospace" }}>~/matias/portfolio</div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, marginTop: 12 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 40, color: C.accent, marginTop: 16, fontFamily: "monospace" }}>
            {"<"}
            {profile.role}
            {" />"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
