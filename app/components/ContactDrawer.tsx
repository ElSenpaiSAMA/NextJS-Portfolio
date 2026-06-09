"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "mnicolas03sp@gmail.com",
    href: "mailto:mnicolas03sp@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/ElSenpaiSAMA",
    href: "https://github.com/ElSenpaiSAMA",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/matias-speroni",
    href: "https://www.linkedin.com/in/matias-speroni",
    external: true,
  },
];

export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [formspreeState, handleFormspreeSubmit] = useForm("mrbzwjdp");
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillH, setPillH] = useState(44);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pillRef.current) setPillH(pillRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 420);
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

  const inputCls = "w-full px-3 py-2.5 text-sm bg-white border border-hairline outline-none transition-colors duration-150 focus:border-ink";

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(27, 26, 23, 0.15)",
          backdropFilter: "blur(2px)",
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
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: open ? "translateY(0)" : `translateY(calc(100% - ${pillH}px))`,
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Pill */}
        <div ref={pillRef} style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 22px",
              background: "#1B1A17",
              color: "#FBFAF7",
              border: "none",
              borderRadius: "16px 16px 0 0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.01em",
              boxShadow: "0 -4px 16px rgba(27, 26, 23, 0.14)",
              userSelect: "none",
              lineHeight: "1.2",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.35s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                fontSize: "11px",
              }}
            >
              ↑
            </span>
            {open ? "Close" : "Want to get in touch?"}
          </button>
        </div>

        {/* Panel */}
        <div
          style={{
            visibility: open ? "visible" : "hidden",
            transition: open ? "visibility 0s" : "visibility 0s linear 0.42s",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderTop: "1px solid #E7E4DC",
              boxShadow: "0 -8px 40px rgba(27, 26, 23, 0.08)",
              // Extend bg above to cover elastic scroll bounce
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* Scrollable area — overscroll-behavior contains the bounce */}
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                overscrollBehavior: "contain",
                // Extra bg so elastic bounce above content shows white, not transparent
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  maxWidth: "700px",
                  margin: "0 auto",
                  padding: "32px 28px 40px",
                  display: "flex",
                  gap: "48px",
                  alignItems: "flex-start",
                }}
              >
                {/* LEFT — contact links */}
                <div style={{ flexShrink: 0, width: "180px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#9C988E",
                      marginBottom: "16px",
                    }}
                  >
                    Find me at
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {CONTACT_LINKS.map(({ label, value, href, external }, i) => (
                      <a
                        key={label}
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px 0",
                          borderTop: i === 0 ? "1px solid #E7E4DC" : "1px solid #E7E4DC",
                          borderBottom:
                            i === CONTACT_LINKS.length - 1 ? "1px solid #E7E4DC" : "none",
                          textDecoration: "none",
                          gap: "2px",
                          transition: "opacity 0.15s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#9C988E",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#1B1A17",
                            fontFamily: "var(--font-sans)",
                            wordBreak: "break-all",
                          }}
                        >
                          {value}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT — form */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "22px",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      color: "#1B1A17",
                      marginBottom: "4px",
                    }}
                  >
                    Send a message
                  </h2>
                  <p style={{ fontSize: "13px", color: "#6E6A62", marginBottom: "22px" }}>
                    Open to backend and fullstack opportunities.
                  </p>

                  {/* Wrapper keeps fixed dimensions regardless of state */}
                  <div style={{ position: "relative" }}>
                    {/* Form — fades out on success but stays in DOM to hold the height */}
                    <form
                      onSubmit={handleFormspreeSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        opacity: formspreeState.succeeded ? 0 : 1,
                        pointerEvents: formspreeState.succeeded ? "none" : "auto",
                        transition: "opacity 0.35s ease",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div>
                          <label htmlFor="drawer-name" style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                            Name
                          </label>
                          <input
                            ref={firstFieldRef}
                            type="text"
                            id="drawer-name"
                            name="name"
                            required
                            disabled={formspreeState.submitting}
                            placeholder="Your name"
                            className={inputCls}
                            style={{ borderRadius: "2px", color: "#1B1A17" }}
                          />
                          <ValidationError prefix="Name" field="name" errors={formspreeState.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                        </div>
                        <div>
                          <label htmlFor="drawer-email" style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                            Email
                          </label>
                          <input
                            type="email"
                            id="drawer-email"
                            name="email"
                            required
                            disabled={formspreeState.submitting}
                            placeholder="you@example.com"
                            className={inputCls}
                            style={{ borderRadius: "2px", color: "#1B1A17" }}
                          />
                          <ValidationError prefix="Email" field="email" errors={formspreeState.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="drawer-message" style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                          Message
                        </label>
                        <textarea
                          id="drawer-message"
                          name="message"
                          required
                          rows={3}
                          disabled={formspreeState.submitting}
                          placeholder="What would you like to talk about?"
                          className={inputCls}
                          style={{ borderRadius: "2px", color: "#1B1A17", resize: "none" }}
                        />
                        <ValidationError prefix="Message" field="message" errors={formspreeState.errors} style={{ color: "#A8642E", fontSize: "11px", display: "block", marginTop: "3px" }} />
                      </div>

                      <button
                        type="submit"
                        disabled={formspreeState.submitting}
                        className="btn-primary"
                        style={{ alignSelf: "flex-start", opacity: formspreeState.submitting ? 0.6 : 1 }}
                      >
                        {formspreeState.submitting ? "Sending…" : "Send message"}
                      </button>
                    </form>

                    {/* Success overlay — same space, fades in on top */}
                    {formspreeState.succeeded && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          opacity: formspreeState.succeeded ? 1 : 0,
                          transition: "opacity 0.35s ease",
                        }}
                      >
                        <div style={{ width: "32px", height: "1px", background: "#1B1A17", marginBottom: "18px" }} />
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontSize: "22px",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            color: "#1B1A17",
                            marginBottom: "8px",
                          }}
                        >
                          Message sent.
                        </p>
                        <p style={{ fontSize: "13px", color: "#6E6A62", lineHeight: 1.5 }}>
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
