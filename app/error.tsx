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
    <div className="pb-12 pt-16 sm:pt-24">
      <p className="label mb-4">Error</p>
      <h1 className="font-serif text-4xl tracking-tight">Something went wrong.</h1>
      <p className="mt-4 text-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-8 rounded-sm bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg"
      >
        Try again
      </button>
    </div>
  );
}
