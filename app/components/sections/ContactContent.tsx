"use client";

import { useForm, ValidationError } from "@formspree/react";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(10, 8, 5, 0.82)",
  border: "1px solid rgba(168, 100, 46, 0.14)",
  borderRadius: "3px",
  backdropFilter: "blur(14px)",
};

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(168,100,46,0.2)",
  borderRadius: "2px",
  padding: "9px 12px",
  color: "#c8c4bc",
  fontFamily: S,
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

function ContactForm() {
  const [state, handleSubmit] = useForm("mrbzwjdp");

  return (
    <div style={{ ...PANEL, padding: "26px" }}>
      {state.succeeded ? (
        <div style={{ padding: "20px 0", textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: "28px", fontStyle: "italic", color: "#f0ede8", marginBottom: "8px" }}>Message sent.</p>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#6E6A62" }}>I'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontFamily: S, fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Name</label>
            <input name="name" type="text" required style={INPUT} />
          </div>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontFamily: S, fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Email</label>
            <input name="email" type="email" required style={INPUT} />
            <ValidationError field="email" prefix="Email" errors={state.errors} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontFamily: S, fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Message</label>
            <textarea name="message" required rows={4} style={{ ...INPUT, resize: "none" }} />
            <ValidationError field="message" prefix="Message" errors={state.errors} />
          </div>
          <button type="submit" disabled={state.submitting} style={{
            width: "100%", padding: "11px",
            background: "#f0ede8", color: "#1B1A17",
            border: "none", borderRadius: "2px",
            fontFamily: S, fontSize: "13px", fontWeight: 500,
            cursor: "pointer", letterSpacing: "0.01em",
          }}>
            {state.submitting ? "Sending…" : "Send message →"}
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactContent() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      padding: "80px 8% 24px",
      overflowY: "auto",
    }}>
      <div style={{ marginBottom: "24px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 400, color: "#f0ede8", letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1 }}>Contact</h2>
        <div style={{ width: "40px", height: "1px", background: "#A8642E", opacity: 0.6 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "800px", flexShrink: 0 }}>
        <ContactForm />

        <div>
          <p style={{ fontFamily: S, fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Find me on</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Email",    value: "mnicolas03sp@gmail.com",         href: "mailto:mnicolas03sp@gmail.com" },
              { label: "GitHub",   value: "github.com/ElSenpaiSAMA",        href: "https://github.com/ElSenpaiSAMA" },
              { label: "LinkedIn", value: "linkedin.com/in/matias-speroni", href: "https://linkedin.com/in/matias-speroni" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ ...PANEL, display: "block", padding: "13px 16px", textDecoration: "none" }}>
                <p style={{ fontFamily: S, fontSize: "10px", color: "#A8642E", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "3px" }}>{label}</p>
                <p style={{ fontFamily: S, fontSize: "12px", color: "#9C988E", margin: 0 }}>{value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
