"use client";

import { useEffect, useState } from "react";
import { MOTION_QUERY, useMediaQuery } from "../../lib/motion";

/**
 * Types `text` out character by character (restarting whenever it changes),
 * with a blinking caret while typing. Visual only: the full text goes to the
 * live region next to it, so screen readers hear it once, not letter by
 * letter. Reduced motion: the whole text at once.
 */
export function Typewriter({ text, cps = 55 }: { text: string; cps?: number }) {
  const motion = useMediaQuery(MOTION_QUERY);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!motion) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= text.length) window.clearInterval(id);
    }, 1000 / cps);
    return () => {
      window.clearInterval(id);
      setShown(0);
    };
  }, [text, cps, motion]);

  const visible = motion ? text.slice(0, shown) : text;
  return (
    <>
      <span aria-hidden="true">
        {visible}
        {motion && shown < text.length && <span className="caret" />}
      </span>
      <span className="sr-only" aria-live="polite">
        {text}
      </span>
    </>
  );
}
