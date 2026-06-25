"use client";

import { useRef } from "react";
import { Float, Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "../../store/sceneStore";

export function HeroStation() {
  const ringRef = useRef<THREE.Mesh>(null);
  const setActive = useSceneStore((s) => s.setActive);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.18;
      ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Decorative rotating ring */}
      <mesh ref={ringRef} position={[0, 4.5, -3]}>
        <torusGeometry args={[3.5, 0.018, 4, 120]} />
        <meshStandardMaterial color="#3344cc" emissive="#2233aa" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Second thin ring */}
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.2}>
        <mesh position={[2, 3, -2]} rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[1.2, 0.012, 4, 80]} />
          <meshStandardMaterial color="#6655ff" emissive="#4433cc" emissiveIntensity={1} roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>

      {/* Name — 3D text */}
      <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.25}>
        <Text
          position={[0, 4.2, 0]}
          fontSize={1.05}
          color="#f0ede8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
          maxWidth={12}
        >
          Matias Speroni
        </Text>
      </Float>

      {/* Role */}
      <Text
        position={[0, 2.85, 0]}
        fontSize={0.38}
        color="#7a7a9a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        BACKEND & FULLSTACK DEVELOPER
      </Text>

      {/* HTML panel with intro + CTAs */}
      <Html
        position={[0, 0.8, 0]}
        center
        transform
        distanceFactor={9}
        zIndexRange={[1, 2]}
      >
        <div style={{
          width: "520px",
          color: "#c0bdc8",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          userSelect: "none",
        }}>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#8888aa", marginBottom: "28px", maxWidth: "380px", margin: "0 auto 28px" }}>
            I build production software end to end — from .NET and React
            to data pipelines and AI tools.
          </p>

          <p style={{ fontSize: "12px", color: "#55556a", marginBottom: "32px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Currently at&nbsp;<span style={{ color: "#a0a0cc" }}>Imagine</span>&nbsp;·&nbsp;
            Building&nbsp;<span style={{ color: "#a0a0cc" }}>Mira</span>&nbsp;·&nbsp;
            <span style={{ color: "#a0a0cc" }}>Barcelona</span>
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => setActive("projects")}
              style={{
                padding: "10px 24px",
                background: "#f0ede8",
                color: "#05050f",
                border: "none",
                borderRadius: "2px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              View projects →
            </button>
            <button
              onClick={() => setActive("contact")}
              style={{
                padding: "10px 24px",
                background: "transparent",
                color: "#a0a0cc",
                border: "1px solid #2a2a4a",
                borderRadius: "2px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </Html>

      {/* Available dot strip */}
      <Html position={[0, -0.9, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5B7F58", display: "inline-block", boxShadow: "0 0 6px #5B7F58" }} />
          <span style={{ fontSize: "12px", color: "#5B7F58", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Available for work
          </span>
        </div>
      </Html>
    </group>
  );
}
