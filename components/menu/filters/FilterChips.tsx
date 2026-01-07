"use client";

import { useFilterChips } from "@/hooks/menu/useFilterChips";
import Typography from "@/components/Typography";

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
                flex-shrink-0 whitespace-nowrap px-6 py-3 rounded-2xl
                transition-all duration-300 ease-in-out
                ${isActive
                  ? "bg-gradient-to-r from-[#6D3B84] via-[#4B2C5E] to-[#8B57A4] border border-transparent shadow-[0_4px_15px_rgba(75,44,94,0.35)] scale-105"
                  : "bg-white/10 border border-[#4B2C5E]/30 shadow-[0_2px_8px_rgba(75,44,94,0.15)] hover:bg-[#4B2C5E]/15"
                }
              `}
            >
              <Typography
                variant="label"
                className={`text-sm font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#6F4C7D]"
                }`}
              >
                {f.label}
              </Typography>
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
