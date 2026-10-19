import Image from "next/image";
import type { StackItem } from "../../data/types";

/** A technology chip: brand logo (when there is one) + name. */
export function TechTag({ item, name }: { item?: StackItem; name?: string }) {
  const label = name ?? item?.name ?? "";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium">
      {item?.logo && (
        <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-sm bg-fg/95 p-px">
          <Image src={item.logo} alt="" width={12} height={12} unoptimized />
        </span>
      )}
      {label}
    </span>
  );
}
