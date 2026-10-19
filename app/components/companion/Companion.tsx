"use client";

import { useEffect, useRef, useState } from "react";
import { CompanionPanel, type CompanionData } from "./CompanionPanel";

/**
 * Desktop (≥ 1024px): a sticky column beside the content.
 * Phones/tablets: a floating "Ask Matias" button that opens the same panel in
 * a native <dialog> (focus trap, Esc to close, backdrop click closes).
 */
export function Companion({ data }: { data: CompanionData }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const firstName = data.name.split(" ")[0];

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <>
      <aside aria-label={`${firstName}'s companion`} className="sticky top-24 hidden h-[calc(100svh-7.5rem)] lg:block" data-testid="companion">
        <CompanionPanel data={data} idPrefix="desk" />
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-accent-strong px-4 py-3 text-sm font-semibold text-white shadow-[var(--glow)] lg:hidden"
      >
        <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-white" />
        Ask {firstName}
      </button>
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-label={`${firstName}'s companion`}
        className="m-0 mt-auto h-[82svh] max-h-none w-full max-w-none bg-transparent p-3 backdrop:bg-black/70 lg:hidden"
      >
        {open && (
          <div className="flex h-full flex-col gap-2">
            <button type="button" onClick={() => setOpen(false)} className="self-end rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-fg-muted">
              Close
            </button>
            <div className="min-h-0 flex-1">
              <CompanionPanel data={data} idPrefix="sheet" />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
