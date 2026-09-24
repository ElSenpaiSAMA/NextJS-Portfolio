/**
 * Contact form domain: client-side validation and submission to Formspree.
 * Framework-free so it can be unit tested with an injected fetch.
 */

export const CONTACT_FIELDS = ["name", "email", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export const MESSAGE_MIN_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please write at least ${MESSAGE_MIN_LENGTH} characters.`;
  }
  return errors;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; status: number | null; message: string; fieldErrors: ContactFieldErrors };

interface FormspreeErrorBody {
  errors?: { field?: string; message?: string }[];
}

export const GENERIC_CONTACT_ERROR = "Your message could not be sent. Please try again or email me directly.";

export function formspreeEndpoint(formId: string): string {
  return `https://formspree.io/f/${formId}`;
}

function isContactField(field: string | undefined): field is ContactField {
  return (CONTACT_FIELDS as readonly string[]).includes(field ?? "");
}

export async function submitContact(
  formId: string,
  data: FormData,
  fetchImpl: typeof fetch = fetch,
): Promise<ContactResult> {
  let response: Response;
  try {
    response = await fetchImpl(formspreeEndpoint(formId), {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
  } catch {
    return { ok: false, status: null, message: GENERIC_CONTACT_ERROR, fieldErrors: {} };
  }

  if (response.ok) return { ok: true };

  const fieldErrors: ContactFieldErrors = {};
  let message = GENERIC_CONTACT_ERROR;
  try {
    const body = (await response.json()) as FormspreeErrorBody;
    for (const err of body.errors ?? []) {
      if (isContactField(err.field) && err.message) fieldErrors[err.field] = err.message;
      else if (err.message) message = err.message;
    }
  } catch {
    /* Non-JSON error body: keep the generic message. */
  }
  return { ok: false, status: response.status, message, fieldErrors };
}
