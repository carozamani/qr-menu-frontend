"use client";
import React, { useRef, useState, useEffect } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = 5;

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 500);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - scrollRef.current!.offsetLeft;
      const walk = x - startX.current;
      if (Math.abs(walk) > dragThreshold) isDragging.current = true;
      scrollRef.current!.scrollLeft = scrollLeft.current - walk;
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

  const handleClick = (id: string, e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      return;
    }
    setActiveFilter(id);
  };

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
