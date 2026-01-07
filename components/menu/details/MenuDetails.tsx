"use client";

import Image from "next/image";

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
        <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      {/* محتوا */}
      <div className="mt-8 text-left">
        <h2 className="text-3xl font-black text-[#4B2C5E] mb-4">{title}</h2>

        {description && (
          <p className="text-[#4B2C5E]/70 leading-relaxed mb-8">{description}</p>
        )}

        {price != null && (
          <div className="border-t border-[#4B2C5E]/10 pt-4">
            <span className="text-sm font-bold text-[#4B2C5E]/50">Total Price</span>
            <div className="mt-1 text-3xl font-black text-[#4B2C5E]">₺ {price}</div>
          </div>
        )}
      </div>
    </div>
  );
}
