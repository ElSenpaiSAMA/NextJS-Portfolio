"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { reportClientError } from "./lib/client-logger";

/** Last-resort boundary: replaces the root layout, so it renders its own <html>. */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    reportClientError("client.global_error", error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.25rem", maxWidth: "36rem", margin: "0 auto" }}>
        <h1>Something went wrong.</h1>
        <p>The error has been logged.</p>
        <button type="button" onClick={() => unstable_retry()}>
          Try again
        </button>
      </body>
    </html>
  );
}
