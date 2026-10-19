/**
 * Copy for the terminal itself: the boot screen, the prompt, the neofetch
 * logo and the interactive shell's help. What the commands *print* is built
 * from the real content in lib/shell.ts — nothing here makes claims.
 */

export const PROMPT = { user: "matias", host: "speroni", home: "/home/matias" } as const;

/** Boot screen lines, printed one after another before "Welcome". */
export const BOOT_LINES = [
  "Mounted /home/matias.",
  "Started Docker Application Container Engine.",
  "Reached target Network is Online.",
  "Started portfolio.service.",
];

/** Monogram for `neofetch` (figlet "standard"). */
export const LOGO = [" __  __  ____  ", "|  \\/  |/ ___| ", "| |\\/| |\\___ \\ ", "| |  | | ___) |", "|_|  |_||____/ "];

/** Shown under the prompt before anything is typed. */
export const SHELL_HINT = "This shell works. Type 'help', or try 'ls', 'cat about.md', 'cd projects'.";

/** `help`: every command the shell understands, in the order it lists them. */
export const SHELL_COMMANDS: { name: string; usage: string; does: string }[] = [
  { name: "help", usage: "help", does: "list these commands" },
  { name: "ls", usage: "ls [dir]", does: "list files (try 'ls projects')" },
  { name: "cat", usage: "cat <file>", does: "print a file: about.md, stack.yaml, projects/<name>" },
  { name: "cd", usage: "cd <section>", does: "jump to stack, projects, experience, about or contact" },
  { name: "open", usage: "open <project>", does: "open a project's live site or code" },
  { name: "whoami", usage: "whoami", does: "who you're talking to" },
  { name: "neofetch", usage: "neofetch", does: "system summary" },
  { name: "git", usage: "git log", does: "work history" },
  { name: "contact", usage: "contact", does: "email, phone and profiles" },
  { name: "cv", usage: "cv", does: "download my CV (PDF)" },
  { name: "github", usage: "github", does: "open my GitHub" },
  { name: "linkedin", usage: "linkedin", does: "open my LinkedIn" },
  { name: "make", usage: "make deploy", does: "the last step: get in touch" },
  { name: "history", usage: "history", does: "what you've typed" },
  { name: "clear", usage: "clear", does: "clear the screen (or Ctrl+L)" },
];
