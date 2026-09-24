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
          background: "#f8f5f0",
          color: "#1f1b16",
        }}
      >
        <div style={{ display: "flex", width: 64, height: 4, background: "#9c4a24" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: "-0.03em", fontFamily: "serif" }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#5c544a", marginTop: 16 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6f665a" }}>
          CI/CD · Automation · Containers · Observability — {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
