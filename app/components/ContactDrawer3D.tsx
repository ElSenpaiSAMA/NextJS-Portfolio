"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const CONTACT_LINKS = [
  { label: "Email",    value: "mnicolas03sp@gmail.com",         href: "mailto:mnicolas03sp@gmail.com",              external: false },
  { label: "GitHub",   value: "github.com/ElSenpaiSAMA",        href: "https://github.com/ElSenpaiSAMA",            external: true  },
  { label: "LinkedIn", value: "linkedin.com/in/matias-speroni", href: "https://www.linkedin.com/in/matias-speroni", external: true  },
];

const INPUT: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(168,100,46,0.22)",
  borderRadius: "2px",
  color: "#C8C4BC",
  fontFamily: S,
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

export function ContactDrawer3D() {
  const [open, setOpen] = useState(false);
  const [state, handleSubmit] = useForm("mrbzwjdp");
  const pillRef  = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const [pillH, setPillH] = useState(46);

  useEffect(() => {
    if (pillRef.current) setPillH(pillRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => firstRef.current?.focus(), 420);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-drawer", handler);
    return () => window.removeEventListener("open-contact-drawer", handler);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(5, 5, 10, 0.6)",
          backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 50,
          transform: open ? "translateY(0)" : `translateY(calc(100% - ${pillH}px))`,
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Pill trigger */}
        <div ref={pillRef} style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 24px",
              background: "#0e0d14",
              border: "1px solid rgba(168,100,46,0.35)",
              borderBottom: "none",
              borderRadius: "12px 12px 0 0",
              cursor: "pointer",
              fontFamily: S,
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: "#F0EDE8",
              userSelect: "none",
              lineHeight: "1.2",
              boxShadow: "0 -4px 20px rgba(168,100,46,0.15)",
            }}
          >
            <span style={{
              display: "inline-block",
              transition: "transform 0.35s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              fontSize: "11px",
              color: "#A8642E",
            }}>↑</span>
            {open ? "Close" : "Get in touch"}
          </button>
        </div>

        {/* Panel */}
        <div style={{
          visibility: open ? "visible" : "hidden",
          transition: open ? "visibility 0s" : "visibility 0s linear 0.42s",
        }}>
          <div style={{
            background: "rgba(10, 9, 16, 0.96)",
            borderTop: "1px solid rgba(168,100,46,0.25)",
            boxShadow: "0 -12px 60px rgba(5,5,10,0.8)",
            backdropFilter: "blur(20px)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}>
            <div style={{
              maxHeight: "52vh",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}>
              <div style={{
                maxWidth: "720px",
                margin: "0 auto",
                padding: "32px 28px 40px",
                display: "flex",
                gap: "48px",
                alignItems: "flex-start",
              }}>
                {/* LEFT — links */}
                <div style={{ flexShrink: 0, width: "180px" }}>
                  <p style={{ fontFamily: S, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", color: "#4A4640", marginBottom: "14px" }}>
                    Find me at
                  </p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {CONTACT_LINKS.map(({ label, value, href, external }, i) => (
                      <a
                        key={label}
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        style={{
                          display: "flex", flexDirection: "column",
                          padding: "10px 0",
                          borderTop: "1px solid rgba(168,100,46,0.12)",
                          borderBottom: i === CONTACT_LINKS.length - 1 ? "1px solid rgba(168,100,46,0.12)" : "none",
                          textDecoration: "none", gap: "3px",
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                      >
                        <span style={{ fontFamily: S, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#A8642E" }}>{label}</span>
                        <span style={{ fontFamily: S, fontSize: "12px", color: "#6A6460", wordBreak: "break-all" }}>{value}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT — form */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ fontFamily: F, fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em", color: "#F0EDE8", marginBottom: "4px" }}>
                    Send a message
                  </h2>
                  <p style={{ fontFamily: S, fontSize: "13px", color: "#5A5650", marginBottom: "22px" }}>
                    Open to backend and fullstack opportunities.
                  </p>

                  <div style={{ position: "relative" }}>
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex", flexDirection: "column", gap: "12px",
                        opacity: state.succeeded ? 0 : 1,
                        pointerEvents: state.succeeded ? "none" : "auto",
                        transition: "opacity 0.35s ease",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div>
                          <label style={{ fontFamily: S, display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#5A5650", marginBottom: "5px" }}>Name</label>
                          <input ref={firstRef} type="text" name="name" required disabled={state.submitting} placeholder="Your name" style={INPUT} />
                          <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                        </div>
                        <div>
                          <label style={{ fontFamily: S, display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#5A5650", marginBottom: "5px" }}>Email</label>
                          <input type="email" name="email" required disabled={state.submitting} placeholder="you@example.com" style={INPUT} />
                          <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontFamily: S, display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#5A5650", marginBottom: "5px" }}>Message</label>
                        <textarea name="message" required rows={3} disabled={state.submitting} placeholder="What would you like to talk about?" style={{ ...INPUT, resize: "none" }} />
                        <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                      </div>

                      <button
                        type="submit"
                        disabled={state.submitting}
                        style={{
                          alignSelf: "flex-start",
                          padding: "10px 24px",
                          background: "#A8642E",
                          color: "#F0EDE8",
                          border: "none",
                          borderRadius: "2px",
                          fontFamily: S,
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          opacity: state.submitting ? 0.6 : 1,
                          letterSpacing: "0.01em",
                          boxShadow: "0 0 16px rgba(168,100,46,0.35)",
                        }}
                      >
                        {state.submitting ? "Sending…" : "Send message"}
                      </button>
                    </form>

                    {state.succeeded && (
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ width: "32px", height: "1px", background: "#A8642E", marginBottom: "18px", opacity: 0.5 }} />
                        <p style={{ fontFamily: F, fontStyle: "italic", fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em", color: "#F0EDE8", marginBottom: "8px" }}>
                          Message sent.
                        </p>
                        <p style={{ fontFamily: S, fontSize: "13px", color: "#5A5650", lineHeight: 1.5 }}>
                          Thanks for reaching out —<br />I&apos;ll get back to you soon.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
