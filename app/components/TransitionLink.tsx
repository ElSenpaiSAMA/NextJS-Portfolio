"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_ORDER = ["/", "/sobre-mi", "/proyectos"];

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: Props) {
  const pathname = usePathname();

  function setDirection() {
    const fromIdx = PAGE_ORDER.indexOf(pathname);
    const toIdx = PAGE_ORDER.indexOf(href);
    const dir = toIdx >= 0 && fromIdx >= 0 && toIdx < fromIdx ? "back" : "fwd";
    document.documentElement.dataset.navDir = dir;
  }

  return (
    <Link href={href} onClick={setDirection} className={className}>
      {children}
    </Link>
  );
}
