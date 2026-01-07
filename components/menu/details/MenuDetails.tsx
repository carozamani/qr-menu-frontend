"use client";

import Image from "next/image";
import Typography from "@/components/Typography";

interface MenuDetailsProps {
  title: string;
  description?: string;
  price?: string | number;
  image_url?: string;
}

export default function MenuDetails({
  title,
  description,
  image_url,
  price,
}: MenuDetailsProps) {
  const imageSrc = image_url?.trim() ? image_url : "/placeholder.png";

  return (
    <div className="px-4 pb-12">
      {/* تصویر */}
      <div className="pt-8 flex justify-center">
        <div
          className="relative w-80 h-80 rounded-full overflow-hidden border-4"
          style={{
            backgroundColor: "var(--bg-surface-2)",
            borderColor: "var(--color-border-default)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      {/* محتوا */}
      <div className="mt-8 text-left">
        {/* عنوان */}
        <Typography
          variant="display"
          className="text-[var(--color-primary)] mb-4"
        >
          {title}
        </Typography>

        {/* توضیحات */}
        {description && (
          <Typography
            variant="body"
            className="text-[var(--color-primary)]/70 leading-relaxed mb-8"
          >
            {description}
          </Typography>
        )}

        {/* قیمت */}
        {price != null && (
          <div className="border-t pt-4" style={{ borderColor: "var(--color-border-light)" }}>
            <Typography variant="caption" className="text-[var(--color-text-muted)]">
              Total Price
            </Typography>
            <Typography
              variant="h2"
              className="mt-1 text-[var(--color-primary)]"
            >
              ₺ {price}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
