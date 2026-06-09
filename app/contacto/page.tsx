"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "mnicolas03sp@gmail.com",
    href: "mailto:mnicolas03sp@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/ElSenpaiSAMA",
    href: "https://github.com/ElSenpaiSAMA",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/matias-speroni",
    href: "https://linkedin.com/in/matias-speroni",
  },
];

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-4 mb-3">
        <span
          className="font-serif text-sm"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-accent)",
            letterSpacing: "-0.01em",
          }}
        >
          {number}
        </span>
        <h1
          className="font-serif text-3xl sm:text-4xl font-normal"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
      </div>
      <div className="hairline" />
    </div>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent("Portfolio contact");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:mnicolas03sp@gmail.com?subject=${subject}&body=${body}`;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full px-3 py-2.5 text-sm bg-surface border transition-colors duration-150 outline-none focus:border-ink ${
      errors[field] ? "border-accent" : "border-hairline"
    }`;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <SectionHeader number="01" title="Contact" />

      <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
        Open to backend and fullstack opportunities — let&apos;s talk.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-6">
          {CONTACT_LINKS.map(({ label, value, href }) => (
            <div key={label}>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "var(--color-faint)" }}
              >
                {label}
              </p>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-150 hover:text-accent"
                style={{ color: "var(--color-ink)" }}
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs uppercase tracking-wider mb-1.5"
              style={{ color: "var(--color-faint)" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className={inputClass("name")}
              style={{ borderRadius: "var(--radius-sm)", color: "var(--color-ink)" }}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider mb-1.5"
              style={{ color: "var(--color-faint)" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className={inputClass("email")}
              style={{ borderRadius: "var(--radius-sm)", color: "var(--color-ink)" }}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-wider mb-1.5"
              style={{ color: "var(--color-faint)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className={inputClass("message")}
              style={{ borderRadius: "var(--radius-sm)", color: "var(--color-ink)", resize: "none" }}
              placeholder="What would you like to talk about?"
            />
            {errors.message && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
