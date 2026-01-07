// src/hooks/useFeaturedSection.ts
import { useState, useRef, useEffect } from "react";
import { MenuItem } from "@/types/menu";

export const useFeaturedSection = (items: MenuItem[]) => {
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

  return {
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
  };
};
