"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

// Ordered page list — determines "forward" vs "backward" direction
const PAGE_ORDER = ["/", "/sobre-mi", "/proyectos"];

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (href === pathname) return;

      const fromIdx = PAGE_ORDER.indexOf(pathname);
      const toIdx = PAGE_ORDER.indexOf(href);
      // Unknown routes default to forward
      const dir = toIdx >= 0 && fromIdx >= 0 && toIdx < fromIdx ? "back" : "fwd";

      if (!("startViewTransition" in document)) {
        router.push(href);
        return;
      }

      document.documentElement.dataset.navDir = dir;
      (document as Document & { startViewTransition: (cb: () => void) => { finished: Promise<void> } })
        .startViewTransition(() => { router.push(href); })
        .finished.finally(() => {
          delete document.documentElement.dataset.navDir;
        });
    },
    [href, pathname, router]
  );

  return (
    <a href={href} onClick={navigate} className={className}>
      {children}
    </a>
  );
}
