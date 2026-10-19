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
    <div className="mx-auto flex min-h-[80svh] max-w-[980px] flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
      <h1 className="headline text-[clamp(2.5rem,7vw,4.5rem)]">Something went wrong.</h1>
      <p className="mt-4 text-xl text-mute-dark">The error has been logged. You can retry or reload the page.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-8 rounded-full bg-blue px-6 py-2.5 text-[17px] text-white hover:bg-[#0077ed]"
      >
        Try again
      </button>
    </div>
  );
}
