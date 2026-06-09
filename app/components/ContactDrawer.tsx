"use client";

import { useState, useEffect, useRef } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", message: "" };

export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus first field when drawer opens
  useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 420);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const sub = encodeURIComponent("Portfolio contact");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:mnicolas03sp@gmail.com?subject=${sub}&body=${body}`;
  }

  const inputBase = "w-full px-3 py-2.5 text-sm bg-paper border outline-none transition-colors duration-150";
  const field = (f: keyof FormState) =>
    `${inputBase} ${errors[f] ? "border-accent" : "border-hairline"} focus:border-ink`;

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
        aria-label="Contact form"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: open ? "translateY(0)" : "translateY(calc(100% - 52px))",
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Pill trigger — always visible at the bottom */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 28px",
              background: "#1B1A17",
              color: "#FBFAF7",
              border: "none",
              borderRadius: "20px 20px 0 0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.01em",
              boxShadow: "0 -4px 20px rgba(27, 26, 23, 0.12)",
              userSelect: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.35s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                fontSize: "12px",
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
            background: "#FFFFFF",
            borderTop: "1px solid #E7E4DC",
            boxShadow: "0 -8px 40px rgba(27, 26, 23, 0.1)",
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: "560px", margin: "0 auto", padding: "36px 24px 40px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "24px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#1B1A17",
                marginBottom: "8px",
              }}
            >
              Get in touch
            </h2>
            <p style={{ fontSize: "13px", color: "#6E6A62", marginBottom: "28px" }}>
              Open to backend and fullstack opportunities — let&apos;s talk.
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* Name */}
                <div>
                  <label htmlFor="drawer-name" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "6px" }}>
                    Name
                  </label>
                  <input
                    ref={firstFieldRef}
                    type="text" id="drawer-name" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className={field("name")}
                    style={{ borderRadius: "2px", color: "#1B1A17" }}
                  />
                  {errors.name && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="drawer-email" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "6px" }}>
                    Email
                  </label>
                  <input
                    type="email" id="drawer-email" name="email"
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className={field("email")}
                    style={{ borderRadius: "2px", color: "#1B1A17" }}
                  />
                  {errors.email && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.email}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="drawer-message" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "6px" }}>
                  Message
                </label>
                <textarea
                  id="drawer-message" name="message"
                  value={form.message} onChange={handleChange}
                  rows={3} placeholder="What would you like to talk about?"
                  className={field("message")}
                  style={{ borderRadius: "2px", color: "#1B1A17", resize: "none" }}
                />
                {errors.message && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.message}</p>}
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
