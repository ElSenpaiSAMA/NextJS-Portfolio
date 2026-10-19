import { ImageResponse } from "next/og";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read CSS variables: these mirror the tokens in globals.css.
const C = { bg: "#060708", surface: "#0d0f12", line: "#23272e", fg: "#eef0f2", muted: "#a6abb6", accent: "#5b8cff", ok: "#4ade80" };

/** Generated at build time: the social card — black, a blue glow, the name underlined, and the companion's first line. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: `radial-gradient(900px 500px at 0% 0%, rgba(91,140,255,0.22), ${C.bg} 60%)`,
          color: C.fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: C.ok, letterSpacing: "0.12em" }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.ok, marginRight: 14 }} />
          {profile.availability.toUpperCase()} · {profile.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 118, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, marginTop: 28 }}>{profile.name}</div>
        <div style={{ display: "flex", width: 380, height: 8, borderRadius: 4, background: C.accent, marginTop: 14 }} />
        <div style={{ display: "flex", fontSize: 40, color: C.muted, marginTop: 30 }}>{profile.role}</div>
      </div>
    ),
    size,
  );
}
