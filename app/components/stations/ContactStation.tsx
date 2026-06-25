"use client";

import { Float, Text, Html } from "@react-three/drei";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("mrbzwjdp");

  return (
    <div style={{ width: "360px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{
        background: "rgba(10,10,28,0.9)",
        border: "1px solid rgba(80,80,160,0.25)",
        borderRadius: "4px",
        padding: "28px",
        backdropFilter: "blur(16px)",
        position: "relative",
      }}>
        {state.succeeded ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ fontSize: "26px", color: "#d8d5e8", marginBottom: "8px", fontStyle: "italic" }}>Message sent.</p>
            <p style={{ fontSize: "13px", color: "#6a6882" }}>I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Name</label>
              <input
                name="name"
                type="text"
                required
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(80,80,160,0.3)", borderRadius: "2px", padding: "9px 12px", color: "#d0cde0", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Email</label>
              <input
                name="email"
                type="email"
                required
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(80,80,160,0.3)", borderRadius: "2px", padding: "9px 12px", color: "#d0cde0", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
              />
              <ValidationError field="email" prefix="Email" errors={state.errors} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Message</label>
              <textarea
                name="message"
                required
                rows={4}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(80,80,160,0.3)", borderRadius: "2px", padding: "9px 12px", color: "#d0cde0", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }}
              />
              <ValidationError field="message" prefix="Message" errors={state.errors} />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              style={{ width: "100%", padding: "11px", background: "#f0ede8", color: "#05050f", border: "none", borderRadius: "2px", fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.02em" }}
            >
              {state.submitting ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ContactStation() {
  return (
    <group position={[96, 0, 0]}>
      <Float speed={0.7} floatIntensity={0.2} rotationIntensity={0.03}>
        <Text
          position={[0, 5.2, 0]}
          fontSize={0.9}
          color="#f0ede8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          Contact
        </Text>
      </Float>

      <mesh position={[0, 4.55, 0]}>
        <boxGeometry args={[4, 0.012, 0.012]} />
        <meshStandardMaterial color="#3344cc" emissive="#2233aa" emissiveIntensity={1} />
      </mesh>

      {/* Form */}
      <Html position={[-7.5, 2.2, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <ContactForm />
      </Html>

      {/* Social links */}
      <Html position={[7.5, 2.2, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "300px", fontFamily: "system-ui, sans-serif" }}>
          <p style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Find me on</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Email", value: "mnicolas03sp@gmail.com", href: "mailto:mnicolas03sp@gmail.com" },
              { label: "GitHub", value: "github.com/ElSenpaiSAMA", href: "https://github.com/ElSenpaiSAMA" },
              { label: "LinkedIn", value: "linkedin.com/in/matias-speroni", href: "https://linkedin.com/in/matias-speroni" },
            ].map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "rgba(10,10,28,0.85)",
                  border: "1px solid rgba(80,80,160,0.2)",
                  borderRadius: "4px",
                  padding: "14px 16px",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{label}</p>
                <p style={{ fontSize: "12px", color: "#9090c0" }}>{value}</p>
              </a>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
