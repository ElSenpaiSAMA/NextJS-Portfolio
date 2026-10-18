import { ImageResponse } from "next/og";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time: the social preview card, in the site's dusk palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #160b2e 0%, #3d1a5b 55%, #ff4f8b 88%, #ff7849 100%)",
          color: "#f5e6dd",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 44, marginTop: 24 }}>{profile.role}</div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 16, color: "#160b2e" }}>
          CI/CD, Docker, Linux, .NET and Python, {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
