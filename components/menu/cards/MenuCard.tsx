"use client";

import Image from "next/image";
import clsx from "clsx";
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
  const imageSrc = item.image_url?.trim() || "/placeholder.png";
  const imgSize = 120;
  const showDescription = description !== false && !!item.description;

  // تقسیم متن فقط برای افقی
  const descriptionLines = isHorizontal && showDescription
    ? ((): string[] => {
        const text = description ?? item.description ?? "";
        const lines: string[] = [];
        const maxChars = 45;
        for (let i = 0; i < text.length; i += maxChars) {
          lines.push(text.slice(i, i + maxChars));
        }
        return lines;
      })()
    : [];

  // کلاس‌ها و استایل container
  const containerClasses = clsx(
    "relative transition-all border rounded-[var(--radius-lg)] active:scale-[0.98] duration-300 ease-out",
    "border-[var(--color-border-light)] bg-[var(--bg-surface-2)]",
    isHorizontal
      ? "flex flex-row items-center w-[350px] p-4 h-[130px]"
      : "flex flex-col items-center w-[140px] p-1 h-[200px]"
  );

  // کلاس content
  const contentClasses = clsx(
    "flex flex-col justify-between flex-1 z-10",
    isHorizontal ? "text-left pr-[60px]" : "text-center pt-[100px]"
  );

  // استایل تصویر
  const imageWrapperStyles: React.CSSProperties = isHorizontal
    ? {
        width: imgSize,
        height: imgSize,
        position: "absolute",
        right: -imgSize / 3,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
      }
    : {
        width: imgSize,
        height: imgSize,
        position: "absolute",
        top: -imgSize / 3,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
      };

  return (
    <div
      onClick={onClick}
      className={containerClasses}
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
      }}
    >
      {/* محتوا */}
      <div className={contentClasses}>
        {/* عنوان */}
        <Typography
          variant="h2"
          className="text-[var(--color-primary)] leading-tight"
        >
          {item.title}
        </Typography>

        {/* توضیحات فقط در حالت افقی */}
        {isHorizontal && descriptionLines.length > 0 && (
          <div className="mt-1 space-y-1">
            {descriptionLines.map((line, idx) => (
              <Typography
                key={idx}
                variant="bodyMuted"
                className="text-[var(--color-primary)]/65 leading-snug"
              >
                {line}
              </Typography>
            ))}
          </div>
        )}

        {/* قیمت */}
        <div className={clsx("flex items-center gap-1 mt-2", isHorizontal ? "" : "justify-center")}>
          <Typography
            variant="label"
            className={isHorizontal ? "text-[var(--color-secondary)]" : "text-[var(--color-secondary)]/80"}
          >
            ₺
          </Typography>
          <Typography
            variant="h2"
            className={isHorizontal ? "text-[var(--color-primary)]" : "text-[var(--color-primary)] font-semibold"}
          >
            {item.price.toLocaleString()}
          </Typography>
        </div>
      </div>

      {/* تصویر */}
      <div
        style={imageWrapperStyles}
        className="rounded-full overflow-hidden shadow-[var(--shadow-md)]"
      >
        <Image
          src={imageSrc}
          alt={item.title}
          width={imgSize}
          height={imgSize}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
