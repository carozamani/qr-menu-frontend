"use client";

import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuCard from "./cards/MenuCard";
import Typography from "@/components/Typography";

export default function MenuList() {
  const { items, loading } = useMenuItems();

  if (loading)
    return (
      <Typography
        variant="body"
        align="center"
        className="mt-[var(--space-6)] text-center text-[var(--color-text-muted)]"
      >
        در حال بارگذاری...
      </Typography>
    );

  if (items.length === 0) {
    return (
      <Typography
        variant="bodyMuted"
        align="center"
        className="mt-[var(--space-6)] text-[var(--color-text-muted)]"
      >
       Menüde öğe yok.
      </Typography>
    );
  }

  return (
    <div
      className="
        flex flex-row overflow-x-auto
        gap-[var(--space-6)]
        px-[var(--space-6)] pt-[var(--space-6)] pb-[var(--space-6)]
        scroll-smooth
        no-scrollbar
      "
    >
      {items.map((item) => (
        <div key={item.id} className="flex-shrink-0 px-1">
          <MenuCard item={item} />
        </div>
      ))}
      <div className="flex-shrink-0 w-12" />
    </div>
  );
}
