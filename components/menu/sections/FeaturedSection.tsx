"use client";

import React from "react";
import { MenuItem } from "@/types/menu";

import { useFeaturedSection } from "@/hooks/menu/useFeaturedSection";
import FilterChips from "../filters/FilterChips";
import MenuCard from "../cards/MenuCard";
import BottomSheet from "@/components/layout/BottomSheet";
import MenuDetails from "../details/MenuDetails";
import Typography from "@/components/Typography";

interface FeaturedSectionProps {
  items: MenuItem[];
}

const FeaturedSection = ({ items }: FeaturedSectionProps) => {
  const {
    activeFilter,
    setActiveFilter,
    isScrolling,
    scrollContainerRef,
    handleScroll,
    handleMouseDown,
    filteredItems,
    selectedItem,
    setSelectedItem,
    handleCardClick,
  } = useFeaturedSection(items);

  if (items.length === 0) return null;

  return (
    <>
      <div className="mt-12 w-full text-left">
        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {filteredItems.length > 0 ? (
          <div className="relative w-full group">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              className={`flex gap-6 scroll-smooth snap-x snap-mandatory
                px-4 -mx-4 md:-mx-12 md:px-12 pb-1
                transition-all duration-500
                ${isScrolling ? "featured-scroll-active" : "featured-scroll-idle"}
              `}
            >
              {filteredItems.map((item) => (
                <div key={item.id} className="snap-center shrink-0">
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
          <div
            className="mx-4 p-10 text-center"
            style={{
              backgroundColor: "var(--bg-surface-3)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <Typography
              variant="bodyMuted"
              className="text-[var(--color-text-muted)] italic font-medium"
            >
              Bu filtreye uygun öne çıkan ürün bulunamadı.
            </Typography>
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
