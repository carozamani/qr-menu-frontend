"use client";

import Image from "next/image";

import { useDailyMenuCard } from "@/hooks/menu/useDailyMenuCard";
import BottomSheet from "../layout/BottomSheet";
import MenuDetails from "./details/MenuDetails";
import Typography from "../Typography";


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

  const imageSrc =
    image_url && image_url.trim() !== "" ? image_url : "/placeholder.png";

  return (
    <>
      {/* کارت دیلی منو */}
      <div
        onClick={handleClick}
        className="
          relative w-full h-[210px] flex items-center justify-between
          rounded-[20px] px-6
           shadow-lg
          bg-gradient-to-br from-[#FF8C42] to-[#FFB897]
        "
      >
        <div className="flex flex-col gap-2 max-w-[60%]">
          {/* Title */}
          <Typography
            variant="h1"
            className="text-white line-clamp-2"
          >
            {title}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="bodyMuted"
              className="text-white/80 line-clamp-2"
            >
              {description}
            </Typography>
          )}

          {/* Price */}
          {price !== undefined && price !== null && (
            <Typography
              variant="caption"
              className="text-white/90"
            >
              ₺ {price}
            </Typography>
          )}

          {/* Discount */}
          {discountText && (
            <Typography
              variant="caption"
              className="text-yellow-100 font-medium"
            >
              {discountText}
            </Typography>
          )}
        </div>

        <div className="w-44 h-44 relative rounded-full overflow-hidden shrink-0">
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
