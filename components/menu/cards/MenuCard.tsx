"use client";

import Image from "next/image";
import { MenuItem } from "@/types/menu";
import Typography from "@/components/Typography";

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
      className={`cursor-pointer relative transition-all duration-300 ease-out
        flex rounded-[var(--radius-lg)]
        border border-[var(--color-border-default)]
        shadow-[var(--shadow-lg)]
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
        backgroundColor: "var(--bg-surface-2)",
      }}
    >
      {/* تصویر */}
      <div
        className={`absolute z-10 rounded-full overflow-hidden
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
          {/* عنوان */}
          <Typography
            variant="h2"
            className="text-[var(--color-primary)] leading-tight line-clamp-1"
          >
            {item.title}
          </Typography>

          {/* توضیح */}
          {isHorizontal && description !== false && (
            <Typography
              variant="bodyMuted"
              className="text-[var(--color-primary)]/65 leading-snug line-clamp-2"
            >
              {description ?? item.description}
            </Typography>
          )}
        </div>

        {/* قیمت */}
        <div
          className="flex w-full items-center border-t border-[var(--color-border-light)] pt-2"
        >
          <div className="flex items-center gap-1">
            <Typography variant="label" className="text-[var(--color-secondary)]">
              ₺
            </Typography>
            <Typography variant="h2" className="text-[var(--color-primary)]">
              {item.price.toLocaleString()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
