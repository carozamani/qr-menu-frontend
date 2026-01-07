// src/hooks/useDailyMenuCard.ts
import { useState } from "react";

export const useDailyMenuCard = (onClick?: () => void) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = () => {
    setIsSheetOpen(true);
    onClick && onClick();
  };

  const handleClose = () => setIsSheetOpen(false);

  return { isSheetOpen, handleClick, handleClose };
};
