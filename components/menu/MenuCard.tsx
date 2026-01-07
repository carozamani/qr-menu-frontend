"use client";

import Image from "next/image";
import { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
  variant?: "vertical" | "horizontal";
  description?: string | false;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MenuCard({
  item,
  variant = "vertical",
  description,
  onClick,
}: MenuCardProps) {
  const isHorizontal = variant === "horizontal";
  const imageSrc =
    item.image_url && item.image_url.trim() !== ""
      ? item.image_url
      : "/placeholder.png";

  const imgSize = 145;

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer relative
        transition-all duration-300 ease-out
        bg-white/95
        flex rounded-[16px]
        border border-white/50
        shadow-[0_10px_25px_rgba(75,44,94,0.18)]
        hover:shadow-[0_14px_35px_rgba(75,44,94,0.22)]
        active:scale-[0.98]
        ${isHorizontal
          ? "w-full h-[130px] flex-row-reverse pr-28 pl-6 py-4 mt-6 mb-2"
          : "w-[145px] h-[200px] flex-col pt-32 pb-6 px-5 mt-20"}
      `}
      style={{
        direction: "ltr",
        textAlign: "left",
        backdropFilter: "blur(80px)",
        WebkitBackdropFilter: "blur(80px)",
      }}
    >
      {/* تصویر */}
      <div
        className={`
          absolute z-10 rounded-full overflow-hidden bg-white
          transition-transform duration-300 ease-out
          shadow-[0_16px_32px_rgba(75,44,94,0.25)]
          hover:scale-[1.03]
          ${isHorizontal
            ? `right-[-25px] top-1/2 -translate-y-1/2 w-[${imgSize}px] h-[${imgSize}px]`
            : `top-[-55px] left-1/2 -translate-x-1/2 w-[${imgSize}px] h-[${imgSize}px]`}
        `}
      >
        <Image
          src={imageSrc}
          alt={item.title}
          width={imgSize}
          height={imgSize}
          className="object-cover"
        />
      </div>

      {/* محتوا */}
      <div
        className={`flex flex-col w-full h-full justify-between overflow-hidden ${
          isHorizontal ? "items-start" : ""
        }`}
      >
        <div className="flex flex-col gap-1.5 overflow-hidden">
          <h3 className="text-sm md:text-base font-black text-[#4B2C5E] leading-tight line-clamp-1">
            {item.title}
          </h3>

          {isHorizontal && description !== false && (
            <p className="text-[10px] md:text-xs text-[#4B2C5E]/65 leading-snug font-medium line-clamp-2">
              {description ?? item.description}
            </p>
          )}
        </div>

        {/* قیمت */}
        <div className="flex w-full items-center border-t border-[#4B2C5E]/10 pt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-[#D2993B]">₺</span>
            <p className="font-black text-base text-[#4B2C5E]">
              {item.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
