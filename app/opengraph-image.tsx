import { ImageResponse } from "next/og";
import { profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time: the social preview card, product-launch style (black, centred, gradient role). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: "-0.04em" }}>{profile.name}</div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginTop: 12,
            backgroundImage: "linear-gradient(90deg, #64d2ff 0%, #2997ff 45%, #a78bfa 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1a6", marginTop: 36 }}>
          CI/CD, Docker, Linux, .NET and Python. {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
