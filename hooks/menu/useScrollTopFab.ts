// src/hooks/useScrollTopFab.ts
import { useEffect, useState } from "react";

export function useScrollTopFab(secondCategoryRef: React.RefObject<HTMLDivElement | null>) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!secondCategoryRef.current) return;

      const top = secondCategoryRef.current.getBoundingClientRect().top;
      setShowScrollTop(top < 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // برای بار اول

    return () => window.removeEventListener("scroll", handleScroll);
  }, [secondCategoryRef]);

  return showScrollTop;
}
