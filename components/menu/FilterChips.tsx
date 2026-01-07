"use client";

import { useFilterChips } from "@/hooks/menu/useFilterChips";

export const FILTERS = [
  { id: "all", label: "Hepsi" },
  { id: "chef", label: "Şefin Önerisi" },
  { id: "best", label: "En Çok Satanlar" },
  { id: "discount", label: "İndirimli" },
];

interface FilterChipsProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
}

export default function FilterChips({ activeFilter, setActiveFilter }: FilterChipsProps) {
  const { scrollRef, isScrolling, handleScroll, handleMouseDown, handleClick } = useFilterChips({
    onFilterChange: setActiveFilter,
  });

  return (
    <div
      className="relative touch-pan-x -mx-4 px-4 overflow-visible cursor-grab active:cursor-grabbing"
      ref={scrollRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="inline-flex gap-4 min-w-max pb-4">
        {FILTERS.map(f => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={(e) => handleClick(f.id, e)}
              className={`
                flex-shrink-0 whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold
                transition-all duration-300 ease-in-out
                ${isActive
                  ? "bg-gradient-to-r from-[#6D3B84] via-[#4B2C5E] to-[#8B57A4] text-white border border-transparent shadow-[0_4px_15px_rgba(75,44,94,0.35)] scale-105"
                  : "bg-white/10 text-[#6F4C7D] border border-[#4B2C5E]/30 shadow-[0_2px_8px_rgba(75,44,94,0.15)] hover:bg-[#4B2C5E]/15"
                }
              `}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: rgba(75, 44, 94, ${isScrolling ? 0.8 : 0});
          border-radius: 3px;
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
}
