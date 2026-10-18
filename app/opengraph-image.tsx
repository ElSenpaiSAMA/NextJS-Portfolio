import { ImageResponse } from "next/og";
import { PIPELINE } from "./data/console";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read CSS variables: these mirror the console palette in globals.css.
const C = { console: "#0a0f1a", panel: "#0f1726", line: "#1f2b40", fg: "#dbe4f0", muted: "#93a3ba", amber: "#ffb547", cyan: "#5cc8ff", green: "#4ade80" };

/** Generated at build time: the social preview card, as a terminal window. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 56, background: C.console, fontFamily: "monospace" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: `2px solid ${C.line}`,
            borderRadius: 16,
            background: C.panel,
            padding: "48px 56px",
            color: C.fg,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: C.muted }}>
            <span style={{ color: C.amber }}>$</span>
            <span style={{ marginLeft: 16 }}>whoami</span>
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 20 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 44, color: C.amber, marginTop: 12 }}>{profile.role}</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 24, color: C.muted, marginTop: "auto" }}>
            {PIPELINE.stages.map((stage) => (
              <span key={stage} style={{ display: "flex", alignItems: "flex-start", marginRight: 28, marginTop: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: 6, background: C.green, marginRight: 10, marginTop: 9 }} />
                {stage}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: C.cyan, marginTop: 20 }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
