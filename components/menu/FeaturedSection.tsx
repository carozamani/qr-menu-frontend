"use client";

import React, { useState, useRef, useEffect } from "react";
import { MenuItem } from "@/types/menu";
import MenuCard from "./MenuCard";
import FilterChips from "./FilterChips";
import BottomSheet from "../layout/BottomSheet";
import MenuDetails from "./MenuDetails";

interface FeaturedSectionProps {
  items: MenuItem[];
}

const FeaturedSection = ({ items }: FeaturedSectionProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // drag desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = 5;

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - scrollContainerRef.current!.offsetLeft;
      const walk = x - startX.current;
      if (Math.abs(walk) > dragThreshold) isDragging.current = true;
      scrollContainerRef.current!.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  if (items.length === 0) return null;

  const filteredItems = items.filter((item) => {
    switch (activeFilter) {
      case "chef":
        return item.is_chef_suggested;
      case "best":
        return item.is_best_seller;
      case "discount":
        return item.has_discount;
      case "daily":
        return item.is_daily_special;
      default:
        return true;
    }
  });

  const handleCardClick = (item: MenuItem, e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      return;
    }
    setSelectedItem(item);
  };

  return (
    <>
      <div className="mt-12 w-full  text-left">
        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {filteredItems.length > 0 ? (
          <div className="relative w-full  group">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              className={`
                flex gap-6 
                scroll-smooth snap-x snap-mandatory
                px-4 -mx-4 md:-mx-12 md:px-12 pb-1
                transition-all duration-500
                ${isScrolling ? "featured-scroll-active" : "featured-scroll-idle"}
              `}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="snap-center shrink-0 "
                >
                  <MenuCard
                    item={item}
                    variant="vertical"
                    description={item.description ?? undefined}
                    onClick={(e) => handleCardClick(item, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-4 p-10 text-center bg-[#4B2C5E]/5 rounded-[10px] text-[#4B2C5E]/60 italic font-medium">
            Bu filtreye uygun öne çıkan ürün bulunamadı.
          </div>
        )}

        {/* Scrollbar styles */}
        <style jsx global>{`
          .featured-scroll-idle::-webkit-scrollbar {
            height: 5px;
          }
          .featured-scroll-idle::-webkit-scrollbar-thumb {
            background: transparent;
          }

          .featured-scroll-active::-webkit-scrollbar {
            height: 5px;
          }
          .featured-scroll-active::-webkit-scrollbar-track {
            background: transparent;
            margin: 0 40px;
          }
          .featured-scroll-active::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 10px;
          }

          .featured-scroll-idle {
            scrollbar-width: none;
          }
          .featured-scroll-active {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
          }
        `}</style>
      </div>

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

export default FeaturedSection;
