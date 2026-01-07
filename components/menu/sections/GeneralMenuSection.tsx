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
        <div className="px-2 mb-6 overflow-visible flex items-center gap-3">
          <span
            className="w-1.5 h-8 rounded-[var(--radius-md)]"
            style={{
              backgroundColor: "var(--color-secondary)",
              boxShadow: "var(--shadow-md)",
            }}
          />
          <Typography variant="h1" className="text-[var(--color-primary)]">
            {categoryTitle}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-12 justify-items-center sm:justify-items-start px-4">
          {activeItems.length > 0 ? (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-center w-full max-w-[320px] overflow-visible"
              >
                <MenuCard
                  item={item}
                  variant="horizontal"
                  onClick={() => openItem(item)}
                />
              </div>
            ))
          ) : (
            <div
              className="col-span-full py-20 w-full text-center"
              style={{
                backgroundColor: "var(--bg-surface-3)",
                borderRadius: "var(--radius-md)",
              }}
            >
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
