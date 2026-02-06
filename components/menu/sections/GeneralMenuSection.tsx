"use client";

import React from "react";
import { MenuItem } from "@/types/menu";

import { useGeneralMenu } from "@/hooks/menu/useGeneralMenu";
import MenuCard from "../cards/MenuCard";
import BottomSheet from "@/components/layout/BottomSheet";
import MenuDetails from "../details/MenuDetails";
import Typography from "@/components/Typography";

interface GeneralMenuSectionProps {
  items: MenuItem[];
  categoryTitle: string;
}

const GeneralMenuSection = ({ items, categoryTitle }: GeneralMenuSectionProps) => {
  const { activeItems, selectedItem, openItem, closeItem } = useGeneralMenu(items);

  return (
    <>
      <div className="w-full overflow-visible text-left">
        {/* عنوان دسته‌بندی */}
        <div className="mb-6 flex items-center gap-3">
          <span
            className="w-1.5 h-8 rounded-lg shadow-md"
            style={{ backgroundColor: "var(--color-secondary)" }}
          />
          <Typography
            variant="h1"
            className="text-[var(--color-primary)] text-lg sm:text-xl font-semibold"
          >
            {categoryTitle}
          </Typography>
        </div>

        {/* لیست کارت‌ها به صورت ستونی */}
        <div className="flex flex-col gap-4 px-2 sm:px-4">
          {activeItems.length > 0 ? (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-md mx-auto"
              >
                <MenuCard
                  item={item}
                  variant="horizontal"
                  onClick={() => openItem(item)}
                />
              </div>
            ))
          ) : (
            <div className="py-16 px-4 w-full text-center bg-[var(--bg-surface-3)] rounded-lg">
              <Typography
                variant="bodyMuted"
                className="text-[var(--color-text-muted)] italic font-medium"
              >
                Bu kategoride henüz aktif ürün bulunmuyor.
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* پنل جزئیات محصول */}
      <BottomSheet open={!!selectedItem} onClose={closeItem}>
        {selectedItem && (
          <MenuDetails
            title={selectedItem.title}
            description={selectedItem.description}
            image_url={selectedItem.image_url}
            price={selectedItem.price}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default GeneralMenuSection;
