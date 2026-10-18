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
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-40 font-mono sm:px-8">
      <p aria-hidden="true" className="text-sm text-red">
        error: render failed (logged)
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg sm:text-5xl">Something went wrong.</h1>
      <p className="mt-3 font-sans text-fg-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-console hover:bg-fg"
      >
        Try again
      </button>
    </div>
  );
}
