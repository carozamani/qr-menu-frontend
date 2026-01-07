"use client";

import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuCard from "./cards/MenuCard";
import Typography from "@/components/ui/Typography";

export default function MenuList() {
  const { items, loading } = useMenuItems();

  if (loading)
    return (
      <Typography
        variant="body"
        align="center"
        className="mt-16 text-center text-[#4B2C5E]/70"
      >
        در حال بارگذاری...
      </Typography>
    );

  if (items.length === 0) {
    return (
      <Typography
        variant="bodyMuted"
        align="center"
        className="mt-16"
      >
        هیچ آیتمی در منو یافت نشد.
      </Typography>
    );
  }

  return (
    <div
      className="
        flex flex-row overflow-x-auto
        gap-10
        px-8 pt-28 pb-16
        scroll-smooth
        scrollbar-hide
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
