"use client";

import { Float, Text, Html } from "@react-three/drei";
import { projects } from "../../data/projects";

export function ProjectsStation() {
  return (
    <group position={[32, 0, 0]}>
      {/* Heading */}
      <Float speed={0.7} floatIntensity={0.2} rotationIntensity={0.03}>
        <Text
          position={[0, 5.2, 0]}
          fontSize={0.9}
          color="#f0ede8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          Projects
        </Text>
      </Float>

      {/* Decorative line geometry */}
      <mesh position={[0, 4.55, 0]}>
        <boxGeometry args={[6, 0.012, 0.012]} />
        <meshStandardMaterial color="#3344cc" emissive="#2233aa" emissiveIntensity={1} />
      </mesh>

      {/* Project cards grid via Html */}
      <Html
        position={[0, 2.4, 0]}
        center
        transform
        distanceFactor={9}
        zIndexRange={[1, 2]}
      >
        <div style={{
          width: "760px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "14px",
          fontFamily: "system-ui, sans-serif",
        }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(10,10,28,0.85)",
                border: "1px solid rgba(80,80,160,0.25)",
                borderRadius: "4px",
                padding: "16px",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Image thumbnail */}
              {p.image && (
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: "2px", marginBottom: "10px", background: "#0a0a1e" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
                </div>
              )}

              <p style={{ fontSize: "14px", fontWeight: 600, color: "#d8d5e8", marginBottom: "4px", letterSpacing: "-0.01em" }}>{p.title}</p>
              {p.inDevelopment && (
                <span style={{ fontSize: "9px", color: "#6666aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>In development</span>
              )}
              <p style={{ fontSize: "11px", color: "#6a6882", lineHeight: 1.5, marginBottom: "10px" }}>{p.description}</p>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} style={{ fontSize: "9px", color: "#5555aa", border: "1px solid rgba(80,80,160,0.3)", borderRadius: "2px", padding: "2px 5px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "8px" }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "10px", color: "#8888cc", textDecoration: "none", border: "1px solid rgba(80,80,160,0.3)", padding: "3px 8px", borderRadius: "2px" }}>
                    GitHub →
                  </a>
                )}
                {p.siteLink && (
                  <a href={p.siteLink} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "10px", color: "#c8c5d8", textDecoration: "none", background: "rgba(80,80,160,0.25)", padding: "3px 8px", borderRadius: "2px" }}>
                    View →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Html>
    </group>
  );
}
