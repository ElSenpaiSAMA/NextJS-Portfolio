"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, NAV_ITEMS } from "../../lib/site";

/** Client only for usePathname: marks the current page with aria-current. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-5 sm:gap-7">
      {NAV_ITEMS.map(({ href, label }) => {
        const active = isActivePath(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`text-sm transition-colors hover:text-fg ${active ? "text-fg underline decoration-accent decoration-1 underline-offset-8" : "text-muted"}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
