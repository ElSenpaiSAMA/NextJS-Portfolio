import { ImageResponse } from "next/og";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time: the social preview card for links on LinkedIn, Slack, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          color: "#0f172a",
          borderTop: "16px solid #1e3a8a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 12,
            background: "#1e3a8a",
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          MS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em" }}>{profile.name}</div>
          <div style={{ fontSize: 42, color: "#1e3a8a", marginTop: 12 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#475569" }}>
          CI/CD · Docker · Linux · .NET · Python — {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
