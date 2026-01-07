// src/hooks/useFilterChips.ts
import { useRef, useState, useEffect } from "react";

interface UseFilterChipsProps {
  onFilterChange: (id: string) => void;
}

export const useFilterChips = ({ onFilterChange }: UseFilterChipsProps) => {
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

  const handleClick = (id: string, e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      return;
    }
    onFilterChange(id);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return {
    scrollRef,
    isScrolling,
    handleScroll,
    handleMouseDown,
    handleClick,
  };
};
