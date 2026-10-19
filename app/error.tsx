"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { reportClientError } from "./lib/client-logger";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    reportClientError("client.render_error", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-5 pt-24 sm:px-8">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-error">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-error" />
        Runtime error (logged)
      </p>
      <h1 className="display mt-6 text-[clamp(2.75rem,8vw,5.5rem)]">Something went wrong.</h1>
      <p className="mt-4 text-lg text-fg-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-8 w-fit rounded-ui bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
