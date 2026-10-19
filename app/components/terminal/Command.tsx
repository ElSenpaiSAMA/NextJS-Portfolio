import type { ReactNode } from "react";
import type { Stage } from "../../data/pipeline";
import { Prompt } from "./Prompt";
import { TypedCommand } from "./TypedCommand";

interface CommandProps {
  stage: Stage;
  /**
   * The section title as a `# Title` h2. Pass `false` when the output renders
   * its own heading with id `${stage.id}-heading` (the neofetch h1).
   */
  heading?: boolean;
  children: ReactNode;
}

/**
 * One section of the session: the prompt with its command (which types itself
 * when the reader gets here), the section title, then the command's output.
 * `data-stage` is what the pipeline tracker measures.
 */
export function Command({ stage, heading = true, children }: CommandProps) {
  const headingId = `${stage.id}-heading`;
  return (
    <section id={stage.id} aria-labelledby={headingId} data-stage={stage.id} className="relative scroll-mt-12 py-14 sm:py-16">
      <p className="text-sm sm:text-base" data-testid={`prompt-${stage.id}`}>
        <Prompt />
        {/* A break opportunity: long commands drop under the prompt on phones. */}
        <wbr />
        <TypedCommand stageId={stage.id} command={stage.command} />
      </p>
      {heading && (
        <h2 id={headingId} data-rise className="display mt-8 text-[clamp(2rem,5vw,3.25rem)]">
          <span aria-hidden="true" className="text-fg-subtle">
            #{" "}
          </span>
          {stage.title}
        </h2>
      )}
      {children}
    </section>
  );
}
