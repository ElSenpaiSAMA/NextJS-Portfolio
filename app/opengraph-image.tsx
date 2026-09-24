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
          padding: "72px",
          background: "#0b0b0c",
          color: "#ededec",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#2dd4bf", fontFamily: "monospace" }}>
          $ whoami
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em" }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#a8a29e", marginTop: 12 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8f8a85", fontFamily: "monospace" }}>
          CI/CD · GitHub Actions · Docker · Observability · Barcelona
        </div>
      </div>
    ),
    size,
  );
}
