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
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-40 sm:px-8">
      <h1 className="display ink-sunset w-fit text-[clamp(3rem,10vw,7rem)]">Something went wrong.</h1>
      <p className="mt-3 text-haze-muted">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 rounded-full bg-haze px-5 py-2.5 text-sm font-semibold text-night hover:bg-sunset"
      >
        Try again
      </button>
    </div>
  );
}
