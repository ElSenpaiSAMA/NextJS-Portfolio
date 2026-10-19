"use client";

import { useState } from "react";

/** Copies a value to the clipboard and confirms it for a moment ("Copied"). */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* Clipboard blocked: the address is visible right next to the button. */
        }
      }}
      className="rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-fg-subtle"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : label}</span>
    </button>
  );
}
