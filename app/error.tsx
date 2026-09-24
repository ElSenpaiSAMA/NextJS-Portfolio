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
    <main id="main" className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-24">
      <p className="font-mono text-sm text-accent">error</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Something went wrong.</h1>
      <p className="mt-3 text-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 w-fit rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent"
      >
        Try again
      </button>
    </main>
  );
}
