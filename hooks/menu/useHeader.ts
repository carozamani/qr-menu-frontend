// src/hooks/useHeader.ts
import { useState, useCallback } from "react";

export const useHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  return { isSearchOpen, toggleSearch };
};
