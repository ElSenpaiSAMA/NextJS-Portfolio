import { PROMPT } from "../../data/shell";

/** `matias@speroni:~$` in the usual colours. Decorative — the command next to it carries the meaning. */
export function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span aria-hidden="true" className="select-none whitespace-nowrap">
      <span className="font-bold text-ok">
        {PROMPT.user}@{PROMPT.host}
      </span>
      <span className="text-fg-subtle">:</span>
      <span className="font-bold text-accent-text">{path}</span>
      <span className="text-fg-subtle">$&nbsp;</span>
    </span>
  );
}
