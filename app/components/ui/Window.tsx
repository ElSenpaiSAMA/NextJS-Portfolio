import type { ReactNode } from "react";

interface WindowProps {
  /** Shown in the title bar, e.g. a file path. */
  title: ReactNode;
  /** Extra content on the right of the title bar (status, badges). */
  aside?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

/** A terminal / editor window: title bar with a path, then the body. */
export function Window({ title, aside, className = "", bodyClassName = "", children }: WindowProps) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line bg-panel shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel-bar px-4 py-2.5 font-mono text-xs text-fg-subtle">
        <span className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="truncate">{title}</span>
        </span>
        {aside}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
