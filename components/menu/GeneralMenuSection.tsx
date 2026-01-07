"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types/menu";
import MenuCard from "./MenuCard";
import MenuDetails from "./MenuDetails";
import BottomSheet from "../layout/BottomSheet";

interface GeneralMenuSectionProps {
  items: MenuItem[];
  categoryTitle: string;
}

const GeneralMenuSection = ({
  items,
  categoryTitle,
}: GeneralMenuSectionProps) => {
  const activeItems = items.filter((item) => item.is_active);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <div className="w-full overflow-visible text-left">
        {/* عنوان بخش */}
        <div className="px-2 mb-6 overflow-visible">
          <h2
            className="
              text-xl font-black text-[#4B2C5E]
              flex items-center gap-3
              transition-all duration-300
            "
          >
            <span
              className="
                w-1.5 h-8 bg-[#D2993B]
                rounded-[10px]
                shadow-[0_4px_10px_rgba(210,153,59,0.35)]
              "
            />
            {categoryTitle}
          </h2>
        </div>

        {/* گرید کارت‌ها */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
            gap-y-10 gap-x-12
            justify-items-center sm:justify-items-start
            px-4
          "
        >
          {activeItems.length > 0 ? (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="
                  flex justify-center
                  w-full max-w-[320px]
                  overflow-visible
                "
              >
                <MenuCard
                  item={item}
                  variant="horizontal"
                  onClick={() => setSelectedItem(item)}
                />
              </div>
            ))
          ) : (
            <div
              className="
                col-span-full py-20 w-full text-center
                bg-[#4B2C5E]/5
                rounded-[10px]
              "
            >
              <p className="text-[#4B2C5E]/60 italic font-medium">
                Bu kategoride henüz aktif ürün bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BottomSheet */}
      <BottomSheet
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      >
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
