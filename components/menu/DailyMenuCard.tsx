"use client";

import React from "react";
import Image from "next/image";
import BottomSheet from "../layout/BottomSheet";
import MenuDetails from "./MenuDetails";
import { useDailyMenuCard } from "@/hooks/menu/useDailyMenuCard";

interface DailyMenuCardProps {
  title: string;
  description?: string;
  image_url?: string;
  price?: string | number;
  discountText?: string;
  onClick?: () => void;
}

export default function DailyMenuCard({
  title,
  description,
  image_url,
  price,
  discountText = "",
  onClick,
}: DailyMenuCardProps) {
  const { isSheetOpen, handleClick, handleClose } = useDailyMenuCard(onClick);

  const imageSrc = image_url && image_url.trim() !== "" ? image_url : "/placeholder.png";

  return (
    <>
      {/* کارت دیلی منو */}
      <div
        onClick={handleClick}
        className="
          relative w-full h-[210px] flex items-center justify-between
          rounded-[20px] px-6 md:px-8 py-4 cursor-pointer
          transition-all duration-200 text-white shadow-lg
          bg-gradient-to-br from-[#FF8C42] to-[#FFB897]
        "
      >
        <div className="flex flex-col gap-2 max-w-[60%]">
          <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
            {title}
          </h3>

          {description && (
            <p className="text-sm md:text-base font-medium text-white/80 line-clamp-2">
              {description}
            </p>
          )}

          {price !== undefined && price !== null && (
            <span className="text-xs md:text-sm font-semibold text-white/90">
              ₺ {price}
            </span>
          )}

          {discountText && (
            <span className="text-xs md:text-sm font-medium text-yellow-100">
              {discountText}
            </span>
          )}
        </div>

        <div className="w-44 h-44 md:w-28 md:h-28 relative rounded-full overflow-hidden">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      {/* BottomSheet */}
      <BottomSheet open={isSheetOpen} onClose={handleClose}>
        <MenuDetails
          title={title}
          description={description}
          image_url={imageSrc}
          price={price}
        />
      </BottomSheet>
    </>
  );
}
