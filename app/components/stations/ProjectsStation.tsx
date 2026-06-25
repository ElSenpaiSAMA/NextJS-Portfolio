"use client";

import { Float, Html } from "@react-three/drei";
import { projects } from "../../data/projects";

const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS  = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(18, 15, 11, 0.88)",
  border: "1px solid rgba(168, 100, 46, 0.15)",
  borderRadius: "3px",
  backdropFilter: "blur(14px)",
};

export function ProjectsStation() {
  return (
    <group position={[32, 0, 0]}>

      {/* Section heading */}
      <Float speed={0.6} floatIntensity={0.18} rotationIntensity={0.02}>
        <Html position={[0, 5.3, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "64px",
            fontWeight: 400,
            color: "#f0ede8",
            letterSpacing: "-0.03em",
            margin: 0,
            whiteSpace: "nowrap",
          }}>
            Projects
          </h2>
        </Html>
      </Float>

      {/* Hairline under heading */}
      <mesh position={[0, 4.52, 0]}>
        <boxGeometry args={[5.5, 0.01, 0.01]} />
        <meshStandardMaterial color="#6a3a12" emissive="#A8642E" emissiveIntensity={0.8} />
      </mesh>

      {/* Cards grid */}
      <Html position={[0, 2.3, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{
          width: "760px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
          fontFamily: SANS,
        }}>
          {projects.map((p) => (
            <div key={p.id} style={PANEL}>
              {/* Screenshot */}
              {p.image && (
                <div style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  borderRadius: "2px 2px 0 0",
                  background: "#100e0c",
                  borderBottom: "1px solid rgba(168,100,46,0.1)",
                }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                </div>
              )}

              <div style={{ padding: "13px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#e8e4dc", letterSpacing: "-0.01em", margin: 0 }}>
                    {p.title}
                  </p>
                  {p.inDevelopment && (
                    <span style={{ fontSize: "9px", color: "#6E6A62", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      WIP
                    </span>
                  )}
                </div>

                <p style={{ fontSize: "11px", color: "#6E6A62", lineHeight: 1.55, marginBottom: "10px" }}>
                  {p.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} style={{
                      fontSize: "9px",
                      color: "#9C988E",
                      border: "1px solid rgba(168,100,46,0.2)",
                      borderRadius: "2px",
                      padding: "2px 5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "7px" }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: "10px",
                      color: "#9C988E",
                      textDecoration: "none",
                      border: "1px solid rgba(168,100,46,0.2)",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      fontFamily: SANS,
                    }}>
                      GitHub →
                    </a>
                  )}
                  {p.siteLink && (
                    <a href={p.siteLink} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: "10px",
                      color: "#f0ede8",
                      textDecoration: "none",
                      background: "rgba(168,100,46,0.2)",
                      border: "1px solid rgba(168,100,46,0.35)",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      fontFamily: SANS,
                    }}>
                      View →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Html>
    </group>
  );
}
