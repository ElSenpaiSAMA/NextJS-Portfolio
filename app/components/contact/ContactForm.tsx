"use client";

import { useState, type FormEvent } from "react";
import { clientLogger } from "../../lib/client-logger";
import {
  submitContact,
  validateContact,
  type ContactField,
  type ContactFieldErrors,
  type ContactValues,
} from "../../lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELDS: { name: ContactField; label: string; type: "text" | "email" | "textarea"; autoComplete?: string }[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message", type: "textarea" },
];

const INPUT_CLASS =
  "mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2.5 text-fg placeholder:text-subtle focus:border-accent aria-[invalid=true]:border-warn";

function readValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

export function ContactForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const errors = validateContact(readValues(form));
    setFieldErrors(errors);
    setFormError(null);
    if (Object.keys(errors).length > 0) {
      clientLogger.info("contact.validation_failed", { fields: Object.keys(errors) });
      return;
    }

    setStatus("submitting");
    clientLogger.info("contact.submit");
    const result = await submitContact(formId, new FormData(form));

    if (result.ok) {
      clientLogger.info("contact.success");
      form.reset();
      setStatus("success");
      return;
    }

    clientLogger.error("contact.failure", { status: result.status, fields: Object.keys(result.fieldErrors) });
    setFieldErrors(result.fieldErrors);
    setFormError(result.message);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="border-l-2 border-ok py-2 pl-5">
        <p className="font-serif text-xl">Message sent.</p>
        <p className="mt-1 text-sm text-muted">Thanks — I will get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-accent hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={formError ? "contact-form-error" : undefined} className="space-y-5">
      {FIELDS.map(({ name, label, type, autoComplete }) => {
        const error = fieldErrors[name];
        const errorId = `contact-${name}-error`;
        const common = {
          id: `contact-${name}`,
          name,
          required: true,
          disabled: submitting,
          autoComplete,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          className: INPUT_CLASS,
        };
        return (
          <div key={name}>
            <label htmlFor={common.id} className="label">
              {label}
            </label>
            {type === "textarea" ? <textarea {...common} rows={5} /> : <input {...common} type={type} />}
            {error && (
              <p id={errorId} className="mt-1 text-sm text-warn">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: Formspree drops submissions that fill it. Hidden from people and AT. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {formError && (
        <p id="contact-form-error" role="alert" className="text-sm text-warn">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
