"use client";

import { useMenuItems } from "@/hooks/menu/useMenuItems";
import MenuCard from "./cards/MenuCard";


export default function MenuList() {
  const { items, loading } = useMenuItems();

  if (loading) return <p className="mt-16 text-center">در حال بارگذاری...</p>;
  if (items.length === 0) {
    return (
      <p className="mt-16 text-center text-sm font-medium text-[#4B2C5E]/50">
        هیچ آیتمی در منو یافت نشد.
      </p>
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
