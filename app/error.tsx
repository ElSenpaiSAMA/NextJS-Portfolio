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
      <p aria-hidden="true" className="font-mono text-sm text-error">
        Unhandled runtime error (logged)
      </p>
      <h1 className="display mt-6 text-[clamp(2.75rem,8vw,6rem)]">Something went wrong.</h1>
      <p className="mt-4 text-lg text-fg-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-8 w-fit rounded-full bg-accent px-6 py-3 font-mono text-sm text-ink hover:bg-fg"
      >
        Try again
      </button>
    </div>
  );
}
