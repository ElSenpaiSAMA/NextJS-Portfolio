"use client";

import { projects } from "../../data/projects";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

export function ProjectsContent() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      padding: "72px 7% 28px",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
          <h2 style={{
            fontFamily: F, fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 400,
            color: "#F0EDE8", letterSpacing: "-0.03em", margin: 0, lineHeight: 1,
          }}>
            Projects
          </h2>
          <div style={{
            flex: 1, height: "1px",
            background: "linear-gradient(to right, rgba(168,100,46,0.6), transparent)",
          }} />
        </div>
        <p style={{
          fontFamily: S, fontSize: "11px", color: "#4A4640",
          letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "6px",
        }}>
          Selected work
        </p>
      </div>

      {/* 3×2 grid — image-first cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "8px",
        flex: 1,
        minHeight: 0,
      }}>
        {projects.map((p) => (
          <article
            key={p.id}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "3px",
              minHeight: 0,
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
              if (img) img.style.transform = "scale(1.06)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {/* Background image */}
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            ) : (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #0e0d14 0%, #1a1228 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: F, fontSize: "52px", color: "rgba(168,100,46,0.15)",
                  letterSpacing: "-0.02em",
                }}>{p.title[0]}</span>
              </div>
            )}

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(5,5,10,0.97) 0%, rgba(5,5,10,0.55) 40%, rgba(5,5,10,0.12) 100%)",
            }} />

            {/* Amber border glow on hover */}
            <div style={{
              position: "absolute", inset: 0,
              boxShadow: "inset 0 0 0 1px rgba(168,100,46,0.18)",
              borderRadius: "3px",
              pointerEvents: "none",
            }} />

            {/* WIP badge */}
            {p.inDevelopment && (
              <div style={{
                position: "absolute", top: "10px", right: "10px",
                background: "rgba(5,5,10,0.75)",
                border: "1px solid rgba(168,100,46,0.4)",
                borderRadius: "2px",
                padding: "2px 7px",
              }}>
                <span style={{
                  fontFamily: S, fontSize: "8px", color: "#A8642E",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>WIP</span>
              </div>
            )}

            {/* Content overlay — bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "10px 12px 12px",
            }}>
              <h3 style={{
                fontFamily: F, fontSize: "16px", color: "#F0EDE8",
                fontWeight: 400, letterSpacing: "-0.01em", margin: "0 0 3px",
                lineHeight: 1.2,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: S, fontSize: "10px", color: "#6A6460",
                lineHeight: 1.5, margin: "0 0 8px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {p.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                {p.tech.slice(0, 2).map((t) => (
                  <span key={t} style={{
                    fontFamily: S, fontSize: "8px", color: "#5A5650",
                    border: "1px solid rgba(168,100,46,0.15)",
                    borderRadius: "2px", padding: "1px 5px",
                    textTransform: "uppercase", letterSpacing: "0.04em",
                  }}>{t}</span>
                ))}
              </div>

              {/* Link buttons */}
              <div style={{ display: "flex", gap: "6px" }}>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: S, fontSize: "10px", fontWeight: 500,
                      color: "#C8C4BC",
                      textDecoration: "none",
                      padding: "4px 10px",
                      border: "1px solid rgba(168,100,46,0.3)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                    }}
                  >
                    GitHub →
                  </a>
                )}
                {p.siteLink && (
                  <a
                    href={p.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: S, fontSize: "10px", fontWeight: 500,
                      color: "#F0EDE8",
                      textDecoration: "none",
                      padding: "4px 10px",
                      background: "#A8642E",
                      borderRadius: "2px",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                      boxShadow: "0 0 10px rgba(168,100,46,0.35)",
                    }}
                  >
                    View site →
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
